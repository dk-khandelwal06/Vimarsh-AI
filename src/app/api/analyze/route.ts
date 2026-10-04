import { NextRequest, NextResponse } from "next/server";
import { analyzeFinancialContent } from "@/lib/ai/gemini";
import { verifySebiIdentity } from "@/lib/verification/sebiMatcher";

export const maxDuration = 30; // Max execution duration for Vercel serverless

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, imageBase64, mimeType, language = "en" } = body;

    if (!text && !imageBase64) {
      return NextResponse.json(
        { error: "Please provide either suspicious message text or an image payload." },
        { status: 400 }
      );
    }

    // Sanitize text if present
    const sanitizedText = text ? String(text).slice(0, 5000) : undefined;

    // Check image size (limit to ~10MB)
    if (imageBase64 && imageBase64.length > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image payload exceeds maximum allowed size of 10MB." },
        { status: 413 }
      );
    }

    const result = await analyzeFinancialContent({
      text: sanitizedText,
      imageBase64,
      mimeType,
      language,
    });

    // Cross-reference any extracted registration number
    if (result.claims?.claimedRegistrationNumber) {
      const sebiCheck = verifySebiIdentity(
        result.claims.claimedRegistrationNumber,
        result.claims.paymentRecipient
      );
      if (sebiCheck.found && sebiCheck.entity) {
        result.verifiedFacts = [
          `Verified entity '${sebiCheck.entity.entityName}' found in SEBI reference registry under number ${sebiCheck.entity.registrationNumber} (${sebiCheck.entity.category}, ${sebiCheck.entity.city}).`,
          ...sebiCheck.discrepancies,
        ];
      } else {
        result.unverifiedAspects.push(
          `Claimed registration '${result.claims.claimedRegistrationNumber}' was not found in the verified SEBI reference directory.`
        );
      }
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API /api/analyze error:", error);
    return NextResponse.json(
      {
        error: "Failed to analyze suspicious content. Please try again or use a predefined demo scenario.",
        details: error?.message || "Unknown server error",
      },
      { status: 500 }
    );
  }
}
