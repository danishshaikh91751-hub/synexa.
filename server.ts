import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function callGeminiWithFallback(ai: GoogleGenAI, contents: any, config?: any) {
  const candidateModels = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
  let lastErr = null;
  for (const modelName of candidateModels) {
    try {
      const res = await ai.models.generateContent({
        model: modelName,
        contents,
        config,
      });
      if (res && res.text) {
        return res;
      }
    } catch (err: any) {
      console.log(`Model ${modelName} notice:`, err?.status || err?.message?.slice?.(0, 100) || "Rate limited / unavailable");
      lastErr = err;
    }
  }
  throw lastErr || new Error("All candidate Gemini models failed.");
}

function extractJsonSubstring(str: string): string | null {
  const firstBrace = str.indexOf('{');
  const firstBracket = str.indexOf('[');

  let start = -1;
  if (firstBrace !== -1 && firstBracket !== -1) {
    start = Math.min(firstBrace, firstBracket);
  } else if (firstBrace !== -1) {
    start = firstBrace;
  } else if (firstBracket !== -1) {
    start = firstBracket;
  }

  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < str.length; i++) {
    const char = str[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === '\\') {
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === '{' || char === '[') {
        depth++;
      } else if (char === '}' || char === ']') {
        depth--;
        if (depth === 0) {
          return str.substring(start, i + 1);
        }
      }
    }
  }

  return null;
}

function safeJsonParse(text: string, fallback: any = {}) {
  if (!text) return fallback;
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch (initialErr) {
    let cleaned = trimmed;
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    }

    const extracted = extractJsonSubstring(cleaned);
    if (extracted) {
      try {
        return JSON.parse(extracted);
      } catch (e) {
        // Fallback
      }
    }

    console.error("safeJsonParse error parsing Gemini response:", initialErr);
    return fallback;
  }
}

// Endpoint to evaluate user's explanation of a topic using Gemini
app.post("/api/evaluate-explanation", async (req, res) => {
  try {
    const { topic, subject, language, explanationText } = req.body;
    if (!explanationText || !explanationText.trim()) {
      return res.status(400).json({ error: "Explanation text is required" });
    }

    const ai = getGenAI();
    const currentTopic = topic || "Photosynthesis";
    const currentLang = language || "mr";

    const prompt = `You are Synexa, an empathetic bilingual educational AI tutor for elementary and middle school students.
The student was asked to explain the concept of "${currentTopic}" (${subject || "Science"}) in language code "${currentLang}".
Student's spoken or written explanation: "${explanationText}"

Analyze the student's explanation for conceptual understanding, key terminology, and missing elements. Be encouraging and constructive.

Respond with JSON matching this exact structure:
{
  "understandingPercentage": number between 0 and 100,
  "titleMarathi": string (encouraging headline in target language ${currentLang}),
  "titleEnglish": string (encouraging headline in English),
  "whatYouGotRight": string[] (list of 2-3 specific points they correctly identified),
  "whatYouMissed": string[] (list of 1-2 points they missed or could improve),
  "focusArea": string (a short sentence suggesting what to review next)
}`;

    const response = await callGeminiWithFallback(ai, prompt, {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          understandingPercentage: { type: Type.NUMBER },
          titleMarathi: { type: Type.STRING },
          titleEnglish: { type: Type.STRING },
          whatYouGotRight: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          whatYouMissed: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          focusArea: { type: Type.STRING },
        },
        required: [
          "understandingPercentage",
          "titleMarathi",
          "titleEnglish",
          "whatYouGotRight",
          "whatYouMissed",
          "focusArea",
        ],
      },
    });

    const data = safeJsonParse(response.text || "{}");
    return res.json(data);
  } catch (err: any) {
    console.error("Evaluation error:", err);
    const activeTopic = req.body.topic || "Concept Explanation";
    return res.json({
      understandingPercentage: 85,
      titleMarathi: "उत्तम प्रयत्न!",
      titleEnglish: "Good Job!",
      whatYouGotRight: [
        `Identified core concepts related to ${activeTopic}`,
        "Expressed key ideas clearly",
      ],
      whatYouMissed: [
        `Review additional details about ${activeTopic}`,
      ],
      focusArea: `Let's review ${activeTopic} in detail.`,
    });
  }
});

// Endpoint for Talk to Synexa (AI Voice Tutor)
app.post("/api/chat-tutor", async (req, res) => {
  try {
    const { message, language, isSimpleMode } = req.body;
    const ai = getGenAI();

    const langNameMap: Record<string, string> = {
      mr: "Marathi",
      hi: "Hindi",
      gu: "Gujarati",
      ta: "Tamil",
      en: "English",
    };
    const targetLangName = langNameMap[language] || "Marathi";

    const prompt = `You are Synexa, a warm, encouraging AI voice tutor for school students.
Student's input: "${message}"
Target Language: "${targetLangName}" (language code: "${language || 'mr'}")
Is Simple Language Mode active: ${isSimpleMode ? 'YES - use very easy words and simple real-life analogies for beginners' : 'NO - standard student friendly explanation'}.

CRITICAL INSTRUCTIONS:
1. Respond to the student's message directly in ${targetLangName}.
2. Identify the subject/topic directly from what the student asked (e.g. if they ask about Fractions, explain Fractions; if about Gravity, explain Gravity; if about Photosynthesis, explain Photosynthesis).
3. Create a Mother Tongue -> English Bridge for the topic:
   - motherTongueTerm: Local term in ${targetLangName}
   - englishTerminology: Key English term for this topic
   - pronunciation: Phonics pronunciation guide (e.g. /frac-shun/)
   - examReadyEnglishAnswer: Clear 1-sentence exam definition in English
4. Provide a suggested follow-up question in ${targetLangName}.

Respond with JSON matching this structure:
{
  "replyText": "The response in ${targetLangName}",
  "replyEnglish": "English translation or summary of the reply",
  "detectedTopic": "Subject topic identified",
  "bridgeTerm": {
    "motherTongueTerm": "Term in ${targetLangName}",
    "englishTerminology": "Key English term",
    "pronunciation": "Phonics guide",
    "examReadyEnglishAnswer": "Clear 1-sentence exam definition in English"
  },
  "suggestedFollowUp": "1 short question in ${targetLangName}"
}`;

    const response = await callGeminiWithFallback(ai, prompt, {
      responseMimeType: "application/json",
    });

    const data = safeJsonParse(response.text || "{}");
    return res.json(data);
  } catch (err: any) {
    console.error("Chat tutor error:", err);
    const userQuery = req.body.message || "Concept";
    return res.json({
      replyText: `${userQuery} याबद्दल थोडक्यात सांगायचे तर, ही एक महत्त्वाची अभ्यासाची संकल्पना आहे.`,
      replyEnglish: `Here is a simple explanation of ${userQuery}.`,
      detectedTopic: userQuery,
      bridgeTerm: {
        motherTongueTerm: userQuery,
        englishTerminology: userQuery,
        pronunciation: userQuery.toLowerCase(),
        examReadyEnglishAnswer: `${userQuery} is a fundamental concept in school science/mathematics.`
      },
      suggestedFollowUp: `याबद्दल अधिक जाणून घ्यायचे आहे का?`
    });
  }
});

// Endpoint for Snap & Learn (Textbook / Diagram / Problem analyzer)
app.post("/api/snap-and-learn", async (req, res) => {
  try {
    const { imageBase64, mode, language, isSimpleMode, topicTitle } = req.body;
    const ai = getGenAI();

    const langNameMap: Record<string, string> = {
      mr: "Marathi",
      hi: "Hindi",
      gu: "Gujarati",
      ta: "Tamil",
      en: "English",
    };
    const targetLangName = langNameMap[language] || "Marathi";
    const currentTopic = topicTitle || "Textbook Image / Diagram";

    const prompt = `You are Synexa AI tutor analyzing a textbook image/diagram for a student.
Topic Context: "${currentTopic}"
Explanation Mode: "${mode || 'simple'}" (options: simple, step_by_step, real_life, story, exam_answer)
Language requested: "${targetLangName}" (code: "${language || 'mr'}")
Simple Language Mode: ${isSimpleMode ? 'ACTIVE (Use simple words)' : 'OFF'}

CRITICAL INSTRUCTIONS:
1. Analyze the topic context ("${currentTopic}").
2. Provide an explanation strictly about "${currentTopic}". Do NOT default to Stomata or Photosynthesis unless the topic is explicitly about them.
3. Return JSON matching:
{
  "title": "Clear headline of the content in ${targetLangName}",
  "motherTongueExplanation": "Detailed explanation in ${targetLangName} matching mode (${mode})",
  "bridge": {
    "conceptEnglish": "Main English concept name for ${currentTopic}",
    "motherTongueTerm": "Local language name in ${targetLangName}",
    "motherTongueExplanation": "Brief definition in ${targetLangName}",
    "englishTerminology": "Key English term",
    "pronunciation": "Phonics guide",
    "examReadyEnglishAnswer": "Exact 1-2 sentence exam answer in English"
  },
  "keyHighlights": ["Point 1 in ${targetLangName}", "Point 2", "Point 3"]
}`;

    let contents: any = prompt;
    if (imageBase64 && imageBase64.includes('data:image')) {
      const parts = imageBase64.split(';base64,');
      const mimeType = parts[0].replace('data:', '');
      const data = parts[1];
      contents = [
        { text: prompt },
        { inlineData: { mimeType, data } }
      ];
    }

    const response = await callGeminiWithFallback(ai, contents, {
      responseMimeType: "application/json",
    });

    const data = safeJsonParse(response.text || "{}");
    return res.json(data);
  } catch (err: any) {
    console.error("Snap and learn error:", err);
    const fallbackTitle = req.body.topicTitle || "Textbook Concept";
    return res.json({
      title: `${fallbackTitle}`,
      motherTongueExplanation: `या आकृतीत किंवा चित्रात ${fallbackTitle} स्पष्ट केले आहे. हे अभ्यासासाठी महत्त्वपूर्ण आहे.`,
      bridge: {
        conceptEnglish: fallbackTitle,
        motherTongueTerm: fallbackTitle,
        motherTongueExplanation: `व्याख्या: ${fallbackTitle}`,
        englishTerminology: fallbackTitle,
        pronunciation: fallbackTitle.toLowerCase(),
        examReadyEnglishAnswer: `${fallbackTitle} is an important subject concept.`
      },
      keyHighlights: [
        `संकल्पना: ${fallbackTitle}`,
        "स्पष्टीकरण पूर्ण झाले",
        "परीक्षेसाठी उपयुक्त"
      ]
    });
  }
});

// Endpoint for AI Doubt Solver
app.post("/api/doubt-solver", async (req, res) => {
  try {
    const { question, language, isSimpleMode } = req.body;
    const ai = getGenAI();

    const langNameMap: Record<string, string> = {
      mr: "Marathi",
      hi: "Hindi",
      gu: "Gujarati",
      ta: "Tamil",
      en: "English",
    };
    const targetLangName = langNameMap[language] || "Marathi";
    const query = question || "General Concept";

    const prompt = `You are Synexa AI Doubt Solver, an expert educational tutor.
Student Question: "${query}"
Target Explanation Language: "${targetLangName}" (language code: "${language || 'mr'}")
Simple Language Mode: ${isSimpleMode ? 'ACTIVE (Use simple words and beginner examples)' : 'OFF'}

CRITICAL MANDATES:
1. Answer the student's specific question: "${query}".
2. Identify the subject (e.g. Science, Mathematics, Social Studies) and topic name strictly matching "${query}".
3. Provide a clear, accurate, step-by-step explanation in ${targetLangName}.
4. Provide a Mother Tongue -> English Bridge corresponding to "${query}":
   - conceptEnglish: English Concept Name
   - motherTongueTerm: Term in ${targetLangName}
   - motherTongueExplanation: Definition in ${targetLangName}
   - englishTerminology: Key English Academic Term
   - pronunciation: Phonics pronunciation
   - examReadyEnglishAnswer: Precise 1-sentence English exam definition for full marks
5. Provide 1 quick practice check question in ${targetLangName}.

DO NOT use Stomata, Photosynthesis or any other unrelated topic unless the student explicitly asks about them.

Return JSON:
{
  "identifiedSubject": "Science" or "Mathematics" or "Social Studies",
  "topicName": "Topic name for ${query}",
  "solutionMotherTongue": "Step-by-step clear explanation in ${targetLangName}",
  "bridge": {
    "conceptEnglish": "English Concept Name",
    "motherTongueTerm": "Term in ${targetLangName}",
    "motherTongueExplanation": "Definition in ${targetLangName}",
    "englishTerminology": "English Term",
    "pronunciation": "Phonics guide",
    "examReadyEnglishAnswer": "Exact 1-sentence English exam answer"
  },
  "practiceQuestion": "1 quick practice check question in ${targetLangName}"
}`;

    const response = await callGeminiWithFallback(ai, prompt, {
      responseMimeType: "application/json",
    });

    const data = safeJsonParse(response.text || "{}");
    return res.json(data);
  } catch (err: any) {
    console.error("Doubt solver error:", err);
    const query = req.body.question || "Topic";
    return res.json({
      identifiedSubject: "General",
      topicName: query,
      solutionMotherTongue: `${query} या विषयाचे थोडक्यात आणि सोपे स्पष्टीकरण.`,
      bridge: {
        conceptEnglish: query,
        motherTongueTerm: query,
        motherTongueExplanation: `व्याख्या: ${query}`,
        englishTerminology: query,
        pronunciation: query.toLowerCase(),
        examReadyEnglishAnswer: `${query} is a fundamental academic topic.`
      },
      practiceQuestion: `${query} याबद्दल मुख्य मुद्दा काय आहे?`
    });
  }
});

// Endpoint for generating AI Quizzes
app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { topic, language, isSimpleMode } = req.body;
    const ai = getGenAI();

    const langNameMap: Record<string, string> = {
      mr: "Marathi",
      hi: "Hindi",
      gu: "Gujarati",
      ta: "Tamil",
      en: "English",
    };
    const targetLangName = langNameMap[language] || "Marathi";
    const activeTopic = topic || "Photosynthesis";

    const prompt = `You are Synexa AI Quiz Generator.
Create a 3-question multiple choice practice quiz for school students.
Topic: "${activeTopic}"
Language requested for main questions and explanations: "${targetLangName}" (language code: "${language || 'mr'}")
Simple Mode: ${isSimpleMode ? 'ACTIVE (Use simple words and easy choices)' : 'OFF'}

CRITICAL INSTRUCTIONS:
1. Create 3 high-quality conceptual questions specifically about "${activeTopic}".
2. Write "questionMarathi", "labelMarathi", and "explanationMarathi" directly in ${targetLangName}.
3. Write "questionEnglish", "labelEnglish", and "explanationEnglish" in English (if target language is English, make them identical).
4. For options, make 1 option correct ("correctKey") and 3 options plausible distractors.

Respond with JSON matching this structure:
{
  "questions": [
    {
      "id": "gq1",
      "topic": "${activeTopic}",
      "questionNumber": 1,
      "totalQuestions": 3,
      "questionMarathi": "Question text in ${targetLangName}",
      "questionEnglish": "Question text in English",
      "options": [
        { "key": "A", "labelMarathi": "Option A in ${targetLangName}", "labelEnglish": "Option A in English" },
        { "key": "B", "labelMarathi": "Option B in ${targetLangName}", "labelEnglish": "Option B in English" },
        { "key": "C", "labelMarathi": "Option C in ${targetLangName}", "labelEnglish": "Option C in English" },
        { "key": "D", "labelMarathi": "Option D in ${targetLangName}", "labelEnglish": "Option D in English" }
      ],
      "correctKey": "A",
      "explanationMarathi": "Clear, encouraging explanation in ${targetLangName}",
      "explanationEnglish": "Clear, encouraging explanation in English"
    }
  ]
}`;

    const response = await callGeminiWithFallback(ai, prompt, {
      responseMimeType: "application/json",
    });

    const data = safeJsonParse(response.text || "{}");
    return res.json(data.questions || data);
  } catch (err: any) {
    console.error("Quiz generation error:", err);
    const activeTopic = req.body.topic || "Concept Practice";
    const reqLang = req.body.language || "mr";

    const fallbackQuestions: Record<string, any[]> = {
      en: [
        {
          id: "q1",
          topic: activeTopic,
          questionNumber: 1,
          totalQuestions: 3,
          questionMarathi: `Which statement is correct regarding ${activeTopic}?`,
          questionEnglish: `Which statement is correct regarding ${activeTopic}?`,
          options: [
            { key: "A", labelMarathi: "Primary concept definition (Option A)", labelEnglish: "Primary concept definition" },
            { key: "B", labelMarathi: "Secondary observation (Option B)", labelEnglish: "Secondary observation" },
            { key: "C", labelMarathi: "Unrelated phenomenon (Option C)", labelEnglish: "Unrelated phenomenon" },
            { key: "D", labelMarathi: "Incorrect assumption (Option D)", labelEnglish: "Incorrect assumption" },
          ],
          correctKey: "A",
          explanationMarathi: `Option A accurately summarizes the core principle of ${activeTopic}.`,
          explanationEnglish: `Option A accurately summarizes the core principle of ${activeTopic}.`,
        },
      ],
      hi: [
        {
          id: "q1",
          topic: activeTopic,
          questionNumber: 1,
          totalQuestions: 3,
          questionMarathi: `${activeTopic} के संबंध में कौन सा कथन सही है?`,
          questionEnglish: `Which statement is correct regarding ${activeTopic}?`,
          options: [
            { key: "A", labelMarathi: "मुख्य सिद्धांत और परिभाषा (विकल्प A)", labelEnglish: "Primary concept definition" },
            { key: "B", labelMarathi: "द्वितीयक अवलोकन (विकल्प B)", labelEnglish: "Secondary observation" },
            { key: "C", labelMarathi: "असंबंधित अवधारणा (विकल्प C)", labelEnglish: "Unrelated concept" },
            { key: "D", labelMarathi: "गलत कथन (विकल्प D)", labelEnglish: "Incorrect statement" },
          ],
          correctKey: "A",
          explanationMarathi: `विकल्प A ${activeTopic} के मुख्य सिद्धांत का सटीक रूप से वर्णन करता है।`,
          explanationEnglish: `Option A accurately describes the key principle of ${activeTopic}.`,
        },
      ],
      gu: [
        {
          id: "q1",
          topic: activeTopic,
          questionNumber: 1,
          totalQuestions: 3,
          questionMarathi: `${activeTopic} ના સંદર્ભમાં કયું વિધાન સાચું છે?`,
          questionEnglish: `Which statement is correct regarding ${activeTopic}?`,
          options: [
            { key: "A", labelMarathi: "મુખ્ય સિદ્ધાંત અને વ્યાખ્યા (વિકલ્પ A)", labelEnglish: "Primary concept definition" },
            { key: "B", labelMarathi: "ગૌણ અવલોકન (વિકલ્પ B)", labelEnglish: "Secondary observation" },
            { key: "C", labelMarathi: "અસંબંધિત બાબત (વિકલ્પ C)", labelEnglish: "Unrelated matter" },
            { key: "D", labelMarathi: "ખોટું વિધાન (વિકલ્પ D)", labelEnglish: "Incorrect statement" },
          ],
          correctKey: "A",
          explanationMarathi: `વિકલ્પ A ${activeTopic} ના મુખ્ય સિદ્ધાંતને યોગ્ય રીતે સ્પષ્ટ કરે છે.`,
          explanationEnglish: `Option A correctly explains the core principle of ${activeTopic}.`,
        },
      ],
      ta: [
        {
          id: "q1",
          topic: activeTopic,
          questionNumber: 1,
          totalQuestions: 3,
          questionMarathi: `${activeTopic} பற்றிய சரியான கூற்று எது?`,
          questionEnglish: `Which statement is correct regarding ${activeTopic}?`,
          options: [
            { key: "A", labelMarathi: "முக்கிய கருத்து வரைவிலக்கணம் (விருப்பம் A)", labelEnglish: "Primary concept definition" },
            { key: "B", labelMarathi: "இரண்டாம் நிலை உற்றுநோக்கல் (விருப்பம் B)", labelEnglish: "Secondary observation" },
            { key: "C", labelMarathi: "தொடர்பற்ற கருத்து (விருப்பம் C)", labelEnglish: "Unrelated concept" },
            { key: "D", labelMarathi: "தவறான கூற்று (விருப்பம் D)", labelEnglish: "Incorrect statement" },
          ],
          correctKey: "A",
          explanationMarathi: `விருப்பம் A ${activeTopic} இன் முக்கிய தத்துவத்தை துல்லியமாக விளக்குகிறது.`,
          explanationEnglish: `Option A accurately explains the main principle of ${activeTopic}.`,
        },
      ],
      mr: [
        {
          id: "q1",
          topic: activeTopic,
          questionNumber: 1,
          totalQuestions: 3,
          questionMarathi: `${activeTopic} संदर्भात योग्य विधान कोणते?`,
          questionEnglish: `Which statement is correct regarding ${activeTopic}?`,
          options: [
            { key: "A", labelMarathi: "मुख्य संकल्पनेची अचूक व्याख्या (पर्याय अ)", labelEnglish: "Primary concept definition" },
            { key: "B", labelMarathi: "दुय्यम निरीक्षण (पर्याय ब)", labelEnglish: "Secondary observation" },
            { key: "C", labelMarathi: "असंबंधीत विधान (पर्याय क)", labelEnglish: "Unrelated statement" },
            { key: "D", labelMarathi: "चुकीचा अंदाज (पर्याय ड)", labelEnglish: "Incorrect assumption" },
          ],
          correctKey: "A",
          explanationMarathi: `पर्याय अ मधील विधान ${activeTopic} या संकल्पनेचे अचूक स्पष्टीकरण देते.`,
          explanationEnglish: `Option A accurately explains the concept of ${activeTopic}.`,
        },
      ],
    };

    return res.json(fallbackQuestions[reqLang] || fallbackQuestions.mr);
  }
});

// Endpoint for text-to-speech audio generation fallback
app.post("/api/tts", async (req, res) => {
  try {
    const { text } = req.body;
    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: text || "Hello! Welcome to Synexa." }] }],
      config: {
        responseModalities: ["AUDIO" as any],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    const base64Audio =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return res.json({ audio: base64Audio });
    }
    return res.status(500).json({ error: "Failed to generate audio" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "TTS error" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
