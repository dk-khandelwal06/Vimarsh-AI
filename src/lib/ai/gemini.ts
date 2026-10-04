import { FraudAnalysisResult } from "@/types";
import { SYSTEM_FRAUD_ANALYZER_PROMPT, SOCRATIC_DIALOGUE_PROMPT, ASK_VIMARSH_PROMPT } from "./prompts";
import { analyzeTextHeuristically } from "./heuristicAnalyzer";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

interface AnalyzeParams {
  text?: string;
  imageBase64?: string;
  mimeType?: string;
  language?: 'en' | 'hi' | 'hinglish';
}

export async function analyzeFinancialContent(params: AnalyzeParams): Promise<FraudAnalysisResult> {
  const { text, imageBase64, mimeType = "image/jpeg", language = "en" } = params;

  if (!GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not configured. Using deterministic heuristic fallback.");
    return analyzeTextHeuristically(text || "Uploaded image verification", language);
  }

  try {
    const parts: any[] = [];

    // System instruction injected into prompt
    let userPromptText = `${SYSTEM_FRAUD_ANALYZER_PROMPT}\n\n`;
    userPromptText += `Language preference: ${language}.\n`;

    if (text) {
      userPromptText += `\nUSER SUBMITTED TEXT:\n\"\"\"${text}\"\"\"\n`;
    }

    if (imageBase64) {
      userPromptText += `\nUSER SUBMITTED SCREENSHOT/IMAGE. Extract all visible text, numbers, P&L statements, watermarks, stamps, and payment details from the image and analyze for observable manipulation indicators.\n`;
      // Clean base64 prefix if present
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, "");
      parts.push({
        inlineData: {
          mimeType,
          data: cleanBase64,
        },
      });
    }

    parts.push({ text: userPromptText });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
        },
      }),
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Gemini API Error (${res.status}):`, errorText);
      // Fallback seamlessly to heuristic analyzer so UX never breaks
      const fallback = analyzeTextHeuristically(text || "Uploaded image analysis", language);
      fallback.isSimulated = true;
      fallback.unverifiedAspects.push(`External AI API returned ${res.status}; heuristic engine engaged.`);
      return fallback;
    }

    const data = await res.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      throw new Error("Empty candidate text from Gemini response");
    }

    // Clean JSON markdown wrappers if present
    const cleanedJson = rawContent
      .replace(/^```json\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleanedJson);

    return {
      id: "analysis-" + Date.now(),
      timestamp: new Date().toISOString(),
      inputType: imageBase64 ? "image" : "text",
      inputSummary: text
        ? text.length > 130
          ? text.substring(0, 127) + "..."
          : text
        : "Uploaded screenshot analyzed via Gemini Vision",
      riskScore: typeof parsed.riskScore === "number" ? parsed.riskScore : 75,
      riskLevel: parsed.riskLevel || "CAUTION",
      riskExplanation: parsed.riskExplanation || "Analyzed observable indicators.",
      claims: parsed.claims || {
        guaranteedClaim: false,
        timePressure: false,
        isPersonalAccount: false,
        withdrawalFeeDemanded: false,
      },
      indicators: Array.isArray(parsed.indicators) ? parsed.indicators : [],
      socratic: parsed.socratic || {
        primaryQuestion: "Why is this financial communication asking you to act before you have independently verified its claims?",
        cognitiveTarget: "Deliberate System 2 Reflection",
        metacognitiveInsight: "Pausing to verify protects your capital.",
        safeNextSteps: [
          "Check sebi.gov.in for registered intermediaries.",
          "Do not send money to individual UPI accounts.",
        ],
      },
      unverifiedAspects: Array.isArray(parsed.unverifiedAspects) ? parsed.unverifiedAspects : [],
      safeActionGuidance: Array.isArray(parsed.safeActionGuidance) ? parsed.safeActionGuidance : [
        "Never transfer investment funds to personal bank accounts.",
        "Report fraud to helpline 1930."
      ],
      officialResources: {
        cybercrimeHelpline: "1930",
        cybercrimePortal: "https://cybercrime.gov.in/",
        sebiScoresUrl: "https://scores.sebi.gov.in/",
        smartOdrUrl: "https://smartodr.in/",
      },
      language,
      isSimulated: false,
    };
  } catch (err: any) {
    console.error("Gemini analysis error, engaging heuristic fallback:", err.message);
    const fallback = analyzeTextHeuristically(text || "Uploaded image verification", language);
    fallback.isSimulated = true;
    fallback.unverifiedAspects.push(`External AI inference was unavailable (${err.message}); heuristic baseline displayed.`);
    return fallback;
  }
}

export async function continueSocraticDialogue(params: {
  originalContext: string;
  socraticQuestion: string;
  userReply: string;
  history?: { role: string; text: string }[];
  language?: 'en' | 'hi' | 'hinglish';
}): Promise<string> {
  const { originalContext, socraticQuestion, userReply, history = [], language = "en" } = params;

  if (!GEMINI_API_KEY) {
    return generateDeterministicSocraticFollowup(userReply, language);
  }

  try {
    const prompt = `${SOCRATIC_DIALOGUE_PROMPT}
Language: ${language}

ORIGINAL SUSPICIOUS COMMUNICATION:
"""${originalContext}"""

PRIMARY SOCRATIC QUESTION ASKED:
"${socraticQuestion}"

USER'S REPLY:
"${userReply}"

PREVIOUS TURNS:
${history.map((h) => `${h.role}: ${h.text}`).join("\n")}

Generate your compassionate, thought-provoking Socratic follow-up response (max 120 words).`;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 500,
        },
      }),
    });

    if (!res.ok) {
      return generateDeterministicSocraticFollowup(userReply, language);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || generateDeterministicSocraticFollowup(userReply, language);
  } catch (err) {
    return generateDeterministicSocraticFollowup(userReply, language);
  }
}

function generateDeterministicSocraticFollowup(userReply: string, language: string): string {
  if (language === 'hi') {
    return `आपकी बात समझ आती है। लेकिन याद रखें: SEBI के नियमों के अनुसार कोई भी रजिस्टर्ड ब्रोकर या सलाहकार कभी भी पर्सनल UPI पर पैसे नहीं मांगता और न ही फिक्स्ड मुनाफे की गारंटी देता है। क्या आप एक बार sebi.gov.in पर जाकर उनकी आधिकारिक लिस्ट चेक करना चाहेंगे?`;
  }
  return `That is a thoughtful point. However, consider this: under SEBI regulations, even genuine licensed investment advisors are strictly prohibited from guaranteeing returns or asking clients to transfer funds to personal UPI handles. If this sender is completely confident in their strategy, why would they risk regulatory penalties by operating through an unverified personal account? Pausing to verify on sebi.gov.in or calling 1930 takes only 5 minutes and could save your entire life savings.`;
}

export async function askVimarshAssistant(params: {
  message: string;
  history?: { sender: string; text: string }[];
  language?: 'en' | 'hi' | 'hinglish';
}): Promise<string> {
  const { message, history = [], language = "en" } = params;

  if (!GEMINI_API_KEY) {
    return `[Demo Mode] As an investor protection assistant, I recommend checking whether any stock advisor is registered on sebi.gov.in. Never share OTPs or send money to individual UPI accounts. For digital fraud emergencies, immediately call national helpline 1930 or visit cybercrime.gov.in.`;
  }

  try {
    const prompt = `${ASK_VIMARSH_PROMPT}
Language: ${language}

Chat History:
${history.map((h) => `${h.sender}: ${h.text}`).join("\n")}

User Query:
"${message}"

Respond helpfully, safely, and concisely (under 180 words).`;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 600,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Thank you for asking. Please exercise caution with unsolicited investment tips and report suspicious activity to 1930.";
  } catch (err: any) {
    return `I am here to help you stay safe from financial fraud. If you've encountered an offer promising guaranteed returns or asking for payment to a personal UPI ID, treat it with extreme caution. Under SEBI regulations, no registered entity can guarantee stock market returns. You can independently verify any intermediary at sebi.gov.in or report cyber fraud at 1930.`;
  }
}
