import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

export function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "synexa-app",
      },
    },
  });
}

export async function callGeminiWithFallback(ai: GoogleGenAI, contents: any, config?: any) {
  const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.1-flash-lite-preview", "gemini-3.7-flash"];
  let lastErr = null;
  for (const modelName of candidateModels) {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout with ${modelName}`)), 9500)
      );
      const generatePromise = ai.models.generateContent({
        model: modelName,
        contents,
        config,
      });
      const res: any = await Promise.race([generatePromise, timeoutPromise]);
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

export function extractJsonSubstring(str: string): string | null {
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

export function safeJsonParse(text: string, fallback: any = {}) {
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
    return fallback;
  }
}

export function parseRequestBody(req: any) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}
