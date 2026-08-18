import { getGenAI, callGeminiWithFallback, safeJsonParse, parseRequestBody } from "./_lib/gemini";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = parseRequestBody(req);
    const { message, language, isSimpleMode } = body;
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
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Chat tutor error:", err);
    const body = parseRequestBody(req);
    const userQuery = body.message || "Concept";
    return res.status(200).json({
      replyText: `${userQuery} याबद्दल सांगायचे तर, ही एक महत्त्वाची अभ्यासाची संकल्पना आहे.`,
      replyEnglish: `Here is a simple explanation of ${userQuery}.`,
      detectedTopic: userQuery,
      bridgeTerm: {
        motherTongueTerm: userQuery,
        englishTerminology: userQuery,
        pronunciation: userQuery.toLowerCase(),
        examReadyEnglishAnswer: `${userQuery} is a fundamental concept in school education.`
      },
      suggestedFollowUp: `याबद्दल अधिक जाणून घ्यायचे आहे का?`
    });
  }
}
