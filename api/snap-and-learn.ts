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
    const { topicTitle, imageBase64, mode = "step_by_step", language = "mr", isSimpleMode = false } = body;
    const ai = getGenAI();

    const langNameMap: Record<string, string> = {
      mr: "Marathi",
      hi: "Hindi",
      gu: "Gujarati",
      ta: "Tamil",
      en: "English",
    };
    const targetLangName = langNameMap[language] || "Marathi";

    const promptText = `Analyze this textbook diagram or topic for a school student.
Topic/Diagram: "${topicTitle || 'School textbook diagram'}"
Target Language: "${targetLangName}"
Explanation Mode: "${mode}" (simple, step_by_step, real_life_analogy, story_format, exam_ready)
Is Simple Mode: ${isSimpleMode ? 'YES' : 'NO'}.

Format as JSON:
{
  "title": "Title in ${targetLangName}",
  "motherTongueExplanation": "Clear, engaging explanation in ${targetLangName}",
  "bridge": {
    "conceptEnglish": "Topic Name in English",
    "motherTongueTerm": "Term in ${targetLangName}",
    "motherTongueExplanation": "1-sentence summary",
    "englishTerminology": "English Term",
    "pronunciation": "Phonics",
    "examReadyEnglishAnswer": "1-sentence exam-ready English answer"
  },
  "keyHighlights": ["3 key bullet points in ${targetLangName}"]
}`;

    const contents: any[] = [];
    if (imageBase64) {
      const match = imageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (match) {
        contents.push({
          inlineData: {
            mimeType: match[1],
            data: match[2],
          },
        });
      }
    }
    contents.push(promptText);

    const response = await callGeminiWithFallback(ai, contents, {
      responseMimeType: "application/json",
    });

    const data = safeJsonParse(response.text || "{}");
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Snap and learn error:", err);
    const body = parseRequestBody(req);
    const title = body.topicTitle || "Textbook Topic";
    return res.status(200).json({
      title: `${title} - संकल्पना स्पष्टीकरण`,
      motherTongueExplanation: `${title} हा आकृतीतील मुख्य घटक आहे ज्याचे कार्य आणि रचना अतिशय महत्त्वाची आहे.`,
      bridge: {
        conceptEnglish: title,
        motherTongueTerm: title,
        motherTongueExplanation: "सोपे स्पष्टीकरण",
        englishTerminology: title,
        pronunciation: title.toLowerCase(),
        examReadyEnglishAnswer: `${title} illustrates key conceptual relationships.`
      },
      keyHighlights: [
        "आकृतीतील मुख्य भाग समजून घ्या",
        "प्रत्येक भागाचे कार्य लक्षात ठेवा",
        "इंग्रजी परिभाषेचा सराव करा"
      ]
    });
  }
}
