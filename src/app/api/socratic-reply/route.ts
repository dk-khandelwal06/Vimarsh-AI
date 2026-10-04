import { NextRequest, NextResponse } from "next/server";
import { continueSocraticDialogue } from "@/lib/ai/gemini";

export const maxDuration = 25;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { originalContext, socraticQuestion, userReply, history, language = "en" } = body;

    if (!userReply) {
      return NextResponse.json(
        { error: "userReply is required." },
        { status: 400 }
      );
    }

    const reply = await continueSocraticDialogue({
      originalContext: originalContext || "Suspicious financial communication",
      socraticQuestion: socraticQuestion || "Why do you think this opportunity is pressuring you?",
      userReply: String(userReply).slice(0, 1000),
      history: Array.isArray(history) ? history : [],
      language,
    });

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("API /api/socratic-reply error:", error);
    return NextResponse.json(
      {
        reply: "Remember: Under SEBI regulations, no registered intermediary can guarantee returns or ask for funds to personal UPI accounts. Please check sebi.gov.in before proceeding.",
      },
      { status: 200 }
    );
  }
}
