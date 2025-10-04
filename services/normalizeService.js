import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { buildNormalizePrompt } from "../utils/promptUtils.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function normalizeTests(tests_raw) {
  try {
    const prompt = buildNormalizePrompt(tests_raw);
    const result = await model.generateContent(prompt);

    // Gemini returns plain text → parse it
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini normalizeTests error:", error);
    return { tests: [] };
  }
}
