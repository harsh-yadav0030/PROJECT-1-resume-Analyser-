import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({

  technicalQuestions: z.array(
    z.object({
      question: z
        .string()
        .description(
          "The technical question can be asked in the interview"
        ),

      intention: z
        .string()
        .description(
          "The intention of interviewer behind asking this question"
        ),

      answer: z
        .string()
        .description(
          "How to answer this question, what points to cover, what approach to take etc."
        ),
    })
  ).description("Technical questions that can be asked in interview along with their intentions and how to answer them "),

  behavioralQuestions: z.array(
    z.object({
      question: z
        .string()
        .description(
          "The technical question can be asked in the interview"
        ),

      intention: z
        .string()
        .description(
          "The intention of interviewer behind asking this question"
        ),

      answer: z
        .string()
        .description(
          "How to answer this question, what points to cover, what approach to take etc."
        ),
    })).description("Behavioral questions that can be asked in interview along with their intentions and how to answer them "),

  skillGaps:z.array(z.object({
       skill:z.string().desx
  }))  

});
  

const generateInterviewReport= async({resume , selfDescription, jobDescription})=>{
   
};

 async function invokeGeminiAI(){ 
  const response = await ai.models.generateContent({
    model:"gemini-2.5-flash",
    contents:"Hello Gemini : Explain What is Interview ?"
  });
  console.log(response.text)
}
export {invokeGeminiAI};