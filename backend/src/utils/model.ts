import { config } from "@/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: config.geminiApiKey,
});
