import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the API with the key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured. Please add GEMINI_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Strict system prompt to keep the AI focused, calm, and on-topic
    const systemPrompt = `You are a calm, helpful guide for first-time voters. You speak without superiority, as an equal. 
Your tone should be natural, human, short-sentenced, and conversational. 
You MUST ONLY provide information related to elections, voting, and the registration process. 
If asked anything unrelated to voting or civics, politely decline and steer the conversation back to voting. 
Keep your answers relatively brief (1-3 short paragraphs max).`;

    const prompt = `${systemPrompt}\n\nUser: ${message}\nAI Guide:`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: "Failed to communicate with AI." },
      { status: 500 }
    );
  }
}
