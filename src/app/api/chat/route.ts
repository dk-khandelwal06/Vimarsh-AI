import { NextRequest, NextResponse } from "next/server";
import { askVimarshAssistant } from "@/lib/ai/gemini";

export const maxDuration = 25;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history, language = "en" } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const reply = await askVimarshAssistant({
      message: String(message).slice(0, 1500),
      history: Array.isArray(history) ? history : [],
      language,
    });

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("API /api/chat error:", error);
    return NextResponse.json(
      {
        reply: "I am having trouble connecting to the AI service right now. Please remember: Never transfer money to personal UPI accounts for stock tips, and report any suspicious communication to 1930.",
      },
      { status: 200 }
    );
  }
}
