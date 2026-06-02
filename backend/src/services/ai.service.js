import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

 async function invokeGeminiAI(){ 
  const response = await ai.models.generateContent({
    model:"gemini-2.5-flash",
    contents:"Hello Gemini : Explain What is Interview ?"
  });
  console.log(response.text)
}
export {invokeGeminiAI};