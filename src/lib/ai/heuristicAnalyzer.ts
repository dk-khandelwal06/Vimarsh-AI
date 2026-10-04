import { FraudAnalysisResult, ObservableIndicator, ExtractedClaims, RiskLevel } from "@/types";
import { checkPersonalVpa } from "../verification/sebiMatcher";

export function analyzeTextHeuristically(text: string, language: 'en' | 'hi' | 'hinglish' = 'en'): FraudAnalysisResult {
  const lower = text.toLowerCase();
  const indicators: ObservableIndicator[] = [];
  let score = 5; // Baseline low risk

  // 1. Guaranteed / Assured return claims
  const guaranteedRegex = /(guaranteed|assured|100%\s*profit|\b\d+%\s*daily|\b\d+%\s*per\s*month|zero\s*loss|pakka\s*profit|surakshit\s*munafa|10x|5x|double\s*your\s*money)/i;
  const guaranteedMatch = text.match(guaranteedRegex);
  if (guaranteedMatch) {
    score += 35;
    indicators.push({
      id: "HEUR-01",
      name: "Guaranteed or Unrealistic Return Claim",
      category: "FINANCIAL",
      severity: "HIGH",
      description: "SEBI regulations strictly prohibit any registered entity from promising or guaranteeing fixed returns on securities or stock market investments.",
      evidenceSnippet: guaranteedMatch[0]
    });
  }

  // 2. High urgency / FOMO
  const urgencyRegex = /(closing\s*in\s*\d+\s*(mins|minutes|hours)|urgent|hurry|last\s*\d+\s*slots?|act\s*now|immediate(ly)?|abhi\s*karein|jaldi\s*karein|offer\s*ends)/i;
  const urgencyMatch = text.match(urgencyRegex);
  if (urgencyMatch) {
    score += 25;
    indicators.push({
      id: "HEUR-02",
      name: "Artificial Time Pressure (Cognitive Panic Induction)",
      category: "PSYCHOLOGICAL",
      severity: "HIGH",
      description: "Scammers engineer short deadlines to force System 1 emotional panic, preventing rational fact-checking.",
      evidenceSnippet: urgencyMatch[0]
    });
  }

  // 3. Payment to Personal UPI handle
  const upiRegex = /([a-zA-Z0-9.\-_]+@(okhdfcbank|okaxis|oksbi|okicici|paytm|ybl|ibl|axl|upi))/i;
  const upiMatch = text.match(upiRegex);
  let recipientVpa = upiMatch ? upiMatch[0] : undefined;
  let isPersonalVpa = false;

  if (recipientVpa) {
    const vpaCheck = checkPersonalVpa(recipientVpa);
    if (vpaCheck.isPersonal) {
      isPersonalVpa = true;
      score += 30;
      indicators.push({
        id: "HEUR-03",
        name: "Personal Account / Individual UPI Transfer Route",
        category: "IDENTITY",
        severity: "HIGH",
        description: "Investor capital is being directed to an individual's personal UPI account instead of an authorized SEBI clearing or corporate escrow account.",
        evidenceSnippet: recipientVpa
      });
    }
  }

  // 4. Withdrawal / Release Fee / Advance Tax Trap
  const feeRegex = /(release\s*fee|clearing\s*tax|unfreeze|unlock\s*(funds|profit|balance)|withdrawal\s*(fee|on\s*hold|paused|pending)|deposit\s*\d+%\s*tax)/i;
  const feeMatch = text.match(feeRegex);
  if (feeMatch) {
    score += 35;
    indicators.push({
      id: "HEUR-04",
      name: "Advance-Fee / Fictitious Withdrawal Clearance Trap",
      category: "FINANCIAL",
      severity: "HIGH",
      description: "Demanding upfront money to 'release' purported profits is characteristic of Sha Zhu Pan (Pig Butchering) scam platforms.",
      evidenceSnippet: feeMatch[0]
    });
  }

  // 5. Sideloading Malicious APK
  const apkRegex = /(\.apk|unknown\s*sources|sideload|download\s*terminal|not\s*on\s*play\s*store)/i;
  const apkMatch = text.match(apkRegex);
  if (apkMatch) {
    score += 30;
    indicators.push({
      id: "HEUR-05",
      name: "Untrusted Android APK Sideloading Vector",
      category: "PROCEDURAL",
      severity: "HIGH",
      description: "Instructing users to install APKs outside official app stores exposes devices to banking trojans, SMS theft, and screen overlay attacks.",
      evidenceSnippet: apkMatch[0]
    });
  }

  // 6. Extracted SEBI registration pattern
  const sebiRegRegex = /\b(IN[AHZF][A-Z0-9]{8,10})\b/i;
  const sebiMatch = text.match(sebiRegRegex);
  const claimedRegNumber = sebiMatch ? sebiMatch[0].toUpperCase() : undefined;

  if (claimedRegNumber && isPersonalVpa) {
    score += 20;
    indicators.push({
      id: "HEUR-06",
      name: "SEBI Registration vs Payment Destination Mismatch",
      category: "IDENTITY",
      severity: "HIGH",
      description: `A SEBI registration number (${claimedRegNumber}) is claimed, yet payment is requested to a personal UPI handle. Registered entities operate corporate bank accounts.`,
      evidenceSnippet: `${claimedRegNumber} -> ${recipientVpa}`
    });
  }

  // Bound score
  score = Math.min(score, 99);
  if (indicators.length === 0) {
    // If no negative indicators detected
    score = Math.max(5, Math.min(score, 20));
  }

  let riskLevel: RiskLevel = 'LOW';
  if (score >= 70) riskLevel = 'HIGH';
  else if (score >= 40) riskLevel = 'CAUTION';
  else riskLevel = 'LOW';

  // Construct Claims
  const claims: ExtractedClaims = {
    promisedReturns: guaranteedMatch ? guaranteedMatch[0] : undefined,
    guaranteedClaim: !!guaranteedMatch,
    timePressure: !!urgencyMatch,
    urgencyDetails: urgencyMatch ? urgencyMatch[0] : undefined,
    paymentRecipient: recipientVpa,
    isPersonalAccount: isPersonalVpa,
    claimedRegistrationNumber: claimedRegNumber,
    withdrawalFeeDemanded: !!feeMatch,
    suspiciousLinkOrApk: apkMatch ? apkMatch[0] : undefined
  };

  // Generate Socratic questions based on dominant indicators
  let primaryQuestion = "Before you take action, ask yourself: Can this claim be independently verified through official exchange or regulatory channels?";
  let secondaryQuestion = "Why would a legitimate investment opportunity need to create rush or panic?";
  let metacognitive = "Notice your emotional reaction right now. Are you feeling FOMO or excitement? That feeling is deliberately targeted by high-pressure tactics.";

  if (isPersonalVpa && claimedRegNumber) {
    primaryQuestion = `The message references SEBI registration ${claimedRegNumber}, but asks you to send funds to an individual UPI address (${recipientVpa}). Why would an authorized regulatory firm collect investor funds through an individual's personal UPI account?`;
    secondaryQuestion = "Could a scammer simply copy a real company's registration number from a public directory while pocketing the funds into their own account?";
    metacognitive = "Having a registration number printed on a message does not authenticate the sender. Always cross-verify on sebi.gov.in.";
  } else if (feeMatch) {
    primaryQuestion = "If the platform already holds your accumulated profits, why would they demand fresh money out of your pocket rather than deducting legitimate charges directly from your account balance?";
    secondaryQuestion = "Why would statutory government taxes ever be payable to an individual UPI handle instead of an official income tax challan?";
    metacognitive = "Scammers exploit your desire to protect paper profits. Paying an advance fee never releases the funds—it only causes additional financial loss.";
  } else if (guaranteedMatch && urgencyMatch) {
    primaryQuestion = `Why is this sender promising an assured return (${guaranteedMatch[0]}) while urging you to act within minutes before you have time to consult an independent financial advisor?`;
    secondaryQuestion = "If this opportunity produced guaranteed risk-free profits, why would they need to solicit random individuals on social messaging apps?";
    metacognitive = "Urgency is a psychological lever designed to shut down analytical thinking. Taking 24 hours to pause and verify protects your capital.";
  } else if (apkMatch) {
    primaryQuestion = "If all legitimate Indian stock brokers are required to follow strict security audits on official app stores, why would a genuine service ask you to bypass your phone's security to sideload an APK?";
    secondaryQuestion = "What permissions might this unofficial app request once installed on your phone?";
    metacognitive = "Allowing 'Install from Unknown Sources' gives an app potential access to your SMS, OTPs, and screen.";
  } else if (riskLevel === 'LOW') {
    primaryQuestion = "Does this communication provide transparent educational information without pressuring you for money or credentials?";
    secondaryQuestion = "How does this compare to messages offering guaranteed wealth?";
    metacognitive = "Legitimate financial entities encourage patient research and never promise guaranteed returns.";
  }

  // Hindi localization if requested
  if (language === 'hi') {
    if (guaranteedMatch && urgencyMatch) {
      primaryQuestion = `यह व्यक्ति गारंटीड रिटर्न (${guaranteedMatch[0]}) का वादा करते हुए आपको बिना किसी स्वतंत्र जांच के तुरंत पैसे भेजने का दबाव क्यों बना रहा है?`;
      secondaryQuestion = "अगर कोई स्कीम वाकई में बिना किसी जोखिम के इतना मुनाफा दे सकती है, तो वे अनजान लोगों को व्हाट्सऐप पर पैसे क्यों मांग रहे हैं?";
    } else if (feeMatch) {
      primaryQuestion = "अगर उस खाते में आपका पैसा पहले से मौजूद है, तो वे सीधे उसी बैलेंस से शुल्क काटने के बजाय आपकी जेब से नए पैसे क्यों मांग रहे हैं?";
    }
  }

  return {
    id: "analysis-" + Date.now(),
    timestamp: new Date().toISOString(),
    inputType: "text",
    inputSummary: text.length > 120 ? text.substring(0, 117) + "..." : text,
    riskScore: score,
    riskLevel,
    riskExplanation: indicators.length > 0 
      ? `Identified ${indicators.length} observable manipulation indicator(s), including ${indicators.map(i => i.name).join(", ")}. These patterns strongly correlate with known digital investment scams.`
      : "No observable high-risk deception patterns detected in the submitted text. However, always exercise independent diligence.",
    claims,
    indicators,
    socratic: {
      primaryQuestion,
      secondaryQuestion,
      cognitiveTarget: "System 1 to System 2 Deliberation Shift",
      metacognitiveInsight: metacognitive,
      safeNextSteps: [
        "Do not transfer any money or provide OTPs/passwords.",
        "Verify credentials independently on the official SEBI portal (sebi.gov.in).",
        "If you suspect fraud, call the National Cyber Crime Helpline at 1930."
      ]
    },
    unverifiedAspects: [
      "Sender identity cannot be cryptographically verified from raw text.",
      "Any claimed company registrations must be cross-checked on official portals."
    ],
    safeActionGuidance: [
      "Never authorize UPI transfers to personal names for corporate investments.",
      "Legitimate brokers never collect capital gains tax via personal UPI handles.",
      "Report suspicious accounts directly to cybercrime.gov.in."
    ],
    officialResources: {
      cybercrimeHelpline: "1930",
      cybercrimePortal: "https://cybercrime.gov.in/",
      sebiScoresUrl: "https://scores.sebi.gov.in/",
      smartOdrUrl: "https://smartodr.in/"
    },
    language,
    isSimulated: true
  };
}
