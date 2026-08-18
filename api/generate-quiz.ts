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
    const { topic, language, isSimpleMode } = body;
    const ai = getGenAI();

    const langNameMap: Record<string, string> = {
      mr: "Marathi",
      hi: "Hindi",
      gu: "Gujarati",
      ta: "Tamil",
      en: "English",
    };
    const targetLangName = langNameMap[language] || "Marathi";

    const prompt = `Generate a 3-question conceptual multiple-choice quiz for school students on the topic: "${topic || 'General Science'}".
Target Language: "${targetLangName}" (language code: "${language || 'mr'}")
Is Simple Mode: ${isSimpleMode ? 'YES - easy basic level' : 'NO - standard school level'}.

CRITICAL: Return a valid JSON array of exactly 3 questions:
[
  {
    "id": "gq1",
    "topic": "${topic || 'General Science'}",
    "questionNumber": 1,
    "totalQuestions": 3,
    "questionMarathi": "Question in ${targetLangName}",
    "questionEnglish": "Question in English",
    "options": [
      { "key": "A", "labelMarathi": "Option A in ${targetLangName}", "labelEnglish": "Option A in English" },
      { "key": "B", "labelMarathi": "Option B in ${targetLangName}", "labelEnglish": "Option B in English" },
      { "key": "C", "labelMarathi": "Option C in ${targetLangName}", "labelEnglish": "Option C in English" },
      { "key": "D", "labelMarathi": "Option D in ${targetLangName}", "labelEnglish": "Option D in English" }
    ],
    "correctKey": "A",
    "explanationMarathi": "Why this answer is correct in ${targetLangName}",
    "explanationEnglish": "Why this answer is correct in English"
  }
]`;

    const response = await callGeminiWithFallback(ai, prompt, {
      responseMimeType: "application/json",
    });

    const parsed = safeJsonParse(response.text || "[]", []);
    const list = Array.isArray(parsed) ? parsed : (parsed.questions || []);
    return res.status(200).json(list);
  } catch (err: any) {
    console.error("Generate quiz error:", err);
    const body = parseRequestBody(req);
    const t = body.topic || "Science";
    return res.status(200).json([
      {
        id: "gq1",
        topic: t,
        questionNumber: 1,
        totalQuestions: 3,
        questionMarathi: `${t} या संकल्पनेचे मुख्य वैशिष्ट्य कोणते?`,
        questionEnglish: `What is the primary characteristic of ${t}?`,
        options: [
          { key: "A", labelMarathi: "हे निसर्गातील महत्त्वाचे तत्त्व आहे", labelEnglish: "It is an important natural principle" },
          { key: "B", labelMarathi: "हे केवळ प्रयोगापुरते मर्यादित आहे", labelEnglish: "It is only limited to experiments" },
          { key: "C", labelMarathi: "याचा कोणताही परिणाम होत नाही", labelEnglish: "It has no impact" },
          { key: "D", labelMarathi: "वरीलपैकी काहीही नाही", labelEnglish: "None of the above" }
        ],
        correctKey: "A",
        explanationMarathi: `${t} हे वैज्ञानिक आणि दैनंदिन जीवनातील मूलभूत तत्त्व आहे.`,
        explanationEnglish: `${t} represents a foundational principle in school education.`
      }
    ]);
  }
}
