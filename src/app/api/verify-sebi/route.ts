import { NextRequest, NextResponse } from "next/server";
import { verifySebiIdentity } from "@/lib/verification/sebiMatcher";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const paymentVpa = searchParams.get("paymentVpa") || undefined;

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'query' is required." },
      { status: 400 }
    );
  }

  const result = verifySebiIdentity(query, paymentVpa);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, paymentVpa } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Field 'query' is required." },
        { status: 400 }
      );
    }

    const result = verifySebiIdentity(String(query), paymentVpa ? String(paymentVpa) : undefined);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to process verification query." },
      { status: 500 }
    );
  }
}
