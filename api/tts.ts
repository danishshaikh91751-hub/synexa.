import { getGenAI, parseRequestBody } from "./_lib/gemini";

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
    const { text, language = "mr" } = body;
    const ai = getGenAI();

    const langNameMap: Record<string, string> = {
      mr: "Marathi",
      hi: "Hindi",
      gu: "Gujarati",
      ta: "Tamil",
      en: "English",
    };
    const targetLangName = langNameMap[language] || "Marathi";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Read the following educational text clearly and naturally for a school student in ${targetLangName}: "${text}"`,
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: "Kore",
              },
            },
          },
        },
      });

      const audioPart = response.candidates?.[0]?.content?.parts?.find(
        (part: any) => part.inlineData && part.inlineData.mimeType?.startsWith("audio/")
      );

      if (audioPart && audioPart.inlineData) {
        return res.status(200).json({
          audioBase64: `data:${audioPart.inlineData.mimeType};base64,${audioPart.inlineData.data}`,
          mimeType: audioPart.inlineData.mimeType,
        });
      }
    } catch (ttsErr) {
      console.log("TTS audio generation notice:", ttsErr);
    }

    return res.status(200).json({
      audioBase64: null,
      fallbackText: text,
      message: "Browser SpeechSynthesis fallback available",
    });
  } catch (err: any) {
    console.error("TTS error:", err);
    return res.status(200).json({
      audioBase64: null,
      fallbackText: req.body?.text || "",
    });
  }
}
