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
    const { question, language, isSimpleMode } = body;
    const ai = getGenAI();

    const langNameMap: Record<string, string> = {
      mr: "Marathi",
      hi: "Hindi",
      gu: "Gujarati",
      ta: "Tamil",
      en: "English",
    };
    const targetLangName = langNameMap[language] || "Marathi";

    const prompt = `You are Synexa AI Doubt Solver for school students.
Student's question: "${question}"
Target Language: "${targetLangName}" (language code: "${language || 'mr'}")
Is Simple Mode: ${isSimpleMode ? 'YES' : 'NO'}.

Provide a step-by-step clear explanation in ${targetLangName} along with Mother Tongue -> English bridge terminology.
Return JSON with this structure:
{
  "identifiedSubject": "Science | Math | Social Studies | Language",
  "topicName": "Topic Name",
  "solutionMotherTongue": "Step-by-step solution in ${targetLangName}",
  "bridge": {
    "conceptEnglish": "Concept in English",
    "motherTongueTerm": "Term in ${targetLangName}",
    "motherTongueExplanation": "Short explanation in ${targetLangName}",
    "englishTerminology": "English term",
    "pronunciation": "Phonics guide",
    "examReadyEnglishAnswer": "1-sentence exam-ready English answer"
  },
  "practiceQuestion": "1 quick practice question in ${targetLangName}"
}`;

    const response = await callGeminiWithFallback(ai, prompt, {
      responseMimeType: "application/json",
    });

    const data = safeJsonParse(response.text || "{}");
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Doubt solver error:", err);
    const body = parseRequestBody(req);
    const q = body.question || "Topic";
    return res.status(200).json({
      identifiedSubject: "Science",
      topicName: q,
      solutionMotherTongue: `या प्रश्नाचे उत्तर समजून घेण्यासाठी: ${q} ही एक महत्त्वाची संकल्पना आहे.`,
      bridge: {
        conceptEnglish: q,
        motherTongueTerm: q,
        motherTongueExplanation: "सोप्या भाषेत व्याख्या",
        englishTerminology: q,
        pronunciation: q.toLowerCase(),
        examReadyEnglishAnswer: `${q} is an essential academic principle in school curriculum.`
      },
      practiceQuestion: "या नियमाचे रोजच्या जीवनातील एक उदाहरण सांगा."
    });
  }
}
