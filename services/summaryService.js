import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { buildSummaryPrompt } from "../utils/promptUtils.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateSummary(tests) {
  try {
    const prompt = buildSummaryPrompt(tests);
    const result = await model.generateContent(prompt);

    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini generateSummary error:", error);
    return { summary: "", explanations: [] };
  }
}
