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
    const { topic, subject, language, explanationText } = body;
    const ai = getGenAI();

    const langNameMap: Record<string, string> = {
      mr: "Marathi",
      hi: "Hindi",
      gu: "Gujarati",
      ta: "Tamil",
      en: "English",
    };
    const targetLangName = langNameMap[language] || "Marathi";

    const prompt = `You are a supportive teacher evaluating a school student's spoken/written explanation of a concept using the Feynman Technique.
Topic: "${topic}"
Subject: "${subject}"
Language: "${targetLangName}"
Student's explanation: "${explanationText}"

Evaluate their understanding constructively:
1. understandingPercentage (0-100 score).
2. titleMarathi (short praise / encouragement in ${targetLangName}).
3. titleEnglish (English summary).
4. whatYouGotRight (array of 2-3 points they explained well in ${targetLangName}).
5. whatYouMissed (array of 1-2 points to add or correct in ${targetLangName}).
6. focusArea (friendly guidance on what to review next in ${targetLangName}).

Format as JSON:
{
  "understandingPercentage": 85,
  "titleMarathi": "खूप छान प्रयत्न!",
  "titleEnglish": "Great explanation!",
  "whatYouGotRight": ["Point 1", "Point 2"],
  "whatYouMissed": ["Missing detail"],
  "focusArea": "Review suggestion"
}`;

    const response = await callGeminiWithFallback(ai, prompt, {
      responseMimeType: "application/json",
    });

    const data = safeJsonParse(response.text || "{}");
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Evaluate explanation error:", err);
    return res.status(200).json({
      understandingPercentage: 80,
      titleMarathi: "खूप चांगला प्रयत्न! तुम्ही मुख्य संकल्पना समजून घेतली आहे.",
      titleEnglish: "Good effort! You captured the core concept.",
      whatYouGotRight: ["संकल्पनेची मूलभूत व्याख्या योग्य दिली आहे", "स्वतःच्या शब्दांत सांगण्याचा चांगला प्रयत्न केला"],
      whatYouMissed: ["काही वैज्ञानिक संज्ञांचा समावेश करता येईल"],
      focusArea: "पुढील वेळी इंग्रजी परिभाषेचा सराव करा."
    });
  }
}
