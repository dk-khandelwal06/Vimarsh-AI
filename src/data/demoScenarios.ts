import { FraudAnalysisResult } from "@/types";

export interface DemoScenarioItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  difficulty: string;
  type: 'text' | 'image';
  rawInput: string;
  imagePreviewUrl?: string;
  senderLabel: string;
  expectedResult: FraudAnalysisResult;
}

export const DEMO_SCENARIOS: DemoScenarioItem[] = [
  {
    id: "scenario-guaranteed-roi",
    title: "Guaranteed Daily Returns & WhatsApp FOMO",
    category: "High-Pressure Investment Scam",
    badge: "Most Common in Tier-2/3",
    difficulty: "High Risk",
    type: "text",
    senderLabel: "Unknown Admin (+91 98290 XXXXX) via 'VIP Stock Masters' Group",
    rawInput: `🚨 URGENT VIP CALL: Join Alpha Wealth Elite Club! Guaranteed 10% daily return on special institutional block trade. Last 2 VIP slots closing in 10 minutes. Minimum deposit ₹25,000. Transfer immediately via UPI to direct fund manager: amit.verma99@okhdfcbank to claim guaranteed allocation! Hurry, don't miss out on guaranteed profits!`,
    expectedResult: {
      id: "demo-result-1",
      timestamp: "2026-10-04T17:00:00Z",
      inputType: "text",
      inputSummary: "WhatsApp message promising 10% daily guaranteed returns with a 10-minute deadline and payment to personal UPI ID amit.verma99@okhdfcbank.",
      riskScore: 96,
      riskLevel: "HIGH",
      riskExplanation: "The message exhibits severe multiple manipulation indicators: explicit promises of guaranteed returns (expressly prohibited by SEBI), artificial time urgency ('10 minutes') designed to induce System 1 cognitive panic, and routing investor capital to a personal UPI handle.",
      claims: {
        promisedReturns: "10% daily return",
        guaranteedClaim: true,
        timePressure: true,
        urgencyDetails: "Last 2 slots closing in 10 minutes",
        paymentRecipient: "amit.verma99@okhdfcbank",
        isPersonalAccount: true,
        withdrawalFeeDemanded: false,
      },
      indicators: [
        {
          id: "IND-01",
          name: "Illegal Guaranteed Return Promise",
          category: "FINANCIAL",
          severity: "HIGH",
          description: "SEBI regulations strictly forbid any registered market intermediary from offering or promising guaranteed or assured returns.",
          evidenceSnippet: "Guaranteed 10% daily return on special institutional block trade"
        },
        {
          id: "IND-02",
          name: "Artificial Urgency & FOMO Exploitation",
          category: "PSYCHOLOGICAL",
          severity: "HIGH",
          description: "Imposing an arbitrary 10-minute deadline forces cognitive overload, preventing independent fact-checking.",
          evidenceSnippet: "Last 2 VIP slots closing in 10 minutes... Hurry, don't miss out"
        },
        {
          id: "IND-03",
          name: "Personal UPI Account Routing",
          category: "IDENTITY",
          severity: "HIGH",
          description: "Capital is directed to an individual's personal UPI handle (amit.verma99@okhdfcbank) rather than a verified corporate escrow/clearing account.",
          evidenceSnippet: "Transfer immediately via UPI to direct fund manager: amit.verma99@okhdfcbank"
        }
      ],
      socratic: {
        primaryQuestion: "Why is this person guaranteeing an impossible 10% daily return while pressuring you to transfer money within 10 minutes to an individual's personal UPI ID?",
        secondaryQuestion: "If someone genuinely possessed an algorithm or strategy making 10% profit every single day (over 3,000% annual compound), why would they desperately recruit strangers in a WhatsApp group for ₹25,000?",
        cognitiveTarget: "Deconstructing FOMO & Recognizing Personal Account Exploitation",
        metacognitiveInsight: "Notice how the 10-minute timer makes you feel panicked about missing out. That emotional rush is engineered to bypass your logical evaluation.",
        safeNextSteps: [
          "Do not send any funds or confirm payment details.",
          "Check whether the individual appears on SEBI's official registered intermediaries portal.",
          "Report the phone number to the National Cyber Crime Portal (1930 / cybercrime.gov.in)."
        ]
      },
      unverifiedAspects: [
        "No SEBI registration number or corporate disclosure was provided in the message.",
        "The claimed 'institutional block trade' cannot be verified on recognized stock exchanges (NSE/BSE)."
      ],
      safeActionGuidance: [
        "Block and report the sender on WhatsApp.",
        "Never transfer investment funds to personal bank accounts or UPI handles.",
        "Consult a certified, SEBI-registered Investment Adviser before committing capital."
      ],
      officialResources: {
        cybercrimeHelpline: "1930",
        cybercrimePortal: "https://cybercrime.gov.in/",
        sebiScoresUrl: "https://scores.sebi.gov.in/",
        smartOdrUrl: "https://smartodr.in/"
      },
      language: "en",
      isSimulated: true,
    }
  },
  {
    id: "scenario-fake-trading-screenshot",
    title: "Fabricated Trading App & Fictitious Withdrawal Fee",
    category: "Pig Butchering (Sha Zhu Pan) & Fake APK",
    badge: "Multimodal Vision Analysis",
    difficulty: "High Risk",
    type: "image",
    senderLabel: "Telegram 'VIP Institutional Wealth' Channel Screenshot",
    rawInput: `[Extracted from Image via VLM]:
Platform: 'NEXUS PRO WEALTH TERMINAL'
Portfolio Balance: ₹2,48,500.00
Unrealized Profit: +₹1,98,500 (+397%)
Status: WITHDRAWAL ON HOLD ⚠️
Notification: 'Dear Member, your withdrawal of ₹2,48,500 has been paused by the tax audit clearance department. To release your payout, kindly deposit 15% statutory clearing tax (₹37,275) to designated officer UPI: verification.officer9@icici within 4 hours. Failure will result in portfolio forfeiture.'`,
    expectedResult: {
      id: "demo-result-2",
      timestamp: "2026-10-04T17:00:00Z",
      inputType: "image",
      inputSummary: "Synthesized trading application screenshot displaying inflated ₹2,48,500 profits with a frozen withdrawal demanding an upfront ₹37,275 'release tax' to an individual UPI address.",
      riskScore: 98,
      riskLevel: "HIGH",
      riskExplanation: "Classic Sha Zhu Pan (Pig Butchering) advance-fee fraud pattern. Legitimate registered brokerages NEVER ask clients to deposit extra personal money via UPI to 'release' capital or pay capital gains taxes; taxes are either deducted at source (TDS) or settled directly with the Income Tax Department.",
      claims: {
        promisedReturns: "+397% profit (₹1,98,500)",
        guaranteedClaim: true,
        timePressure: true,
        urgencyDetails: "Pay within 4 hours or portfolio forfeited",
        paymentRecipient: "verification.officer9@icici",
        isPersonalAccount: true,
        withdrawalFeeDemanded: true,
        withdrawalFeeAmount: "₹37,275 (15% clearing tax)",
      },
      indicators: [
        {
          id: "IND-04",
          name: "Advance Withdrawal / Release Fee Trap",
          category: "FINANCIAL",
          severity: "HIGH",
          description: "Demanding upfront money to 'release' existing profits is the hallmark of fraudulent trading applications.",
          evidenceSnippet: "To release your payout, kindly deposit 15% statutory clearing tax (₹37,275)"
        },
        {
          id: "IND-05",
          name: "Fictitious Tax Collection Mechanism",
          category: "PROCEDURAL",
          severity: "HIGH",
          description: "Brokers do not collect capital gains taxes into personal UPI accounts. Indian tax laws require direct Challan payment or formal TDS certificates.",
          evidenceSnippet: "deposit to designated officer UPI: verification.officer9@icici"
        },
        {
          id: "IND-06",
          name: "Fabricated Terminal UI & Forfeiture Threat",
          category: "PSYCHOLOGICAL",
          severity: "HIGH",
          description: "Threatening forfeiture of the investor's balance induces panic, forcing compliance before rational consultation.",
          evidenceSnippet: "Failure will result in portfolio forfeiture within 4 hours"
        }
      ],
      socratic: {
        primaryQuestion: "If this platform is holding ₹2,48,500 of your money, why would a genuine financial institution ask you to pay extra cash from your pocket rather than deducting legitimate charges directly from your account balance?",
        secondaryQuestion: "Why would Indian government taxes ever be collected via a private ICICI UPI address instead of an official NSDL/Income Tax Challan?",
        cognitiveTarget: "Breaking the Sunk-Cost Fallacy & Revealing the Release-Fee Trap",
        metacognitiveInsight: "Scammers exploit your fear of losing the profits shown on the screen. The numbers on the screen are entirely fabricated to entice you into paying real cash.",
        safeNextSteps: [
          "DO NOT send the ₹37,275 release fee. Paying it will NOT release your funds; scammers will demand another fee.",
          "Save unedited screenshots of all chats, transaction history, and UPI handles.",
          "Immediately contact your bank's fraud desk to freeze transactions and call the 1930 cyber helpline."
        ]
      },
      unverifiedAspects: [
        "'Nexus Pro Wealth Terminal' is not an authorized exchange member of NSE, BSE, or MCX.",
        "The UPI address belongs to an individual, not an institutional clearing corporation."
      ],
      safeActionGuidance: [
        "Stop all contact with the platform administrators immediately.",
        "File a complaint on cybercrime.gov.in under 'Investment Scam / Advance Fee Fraud'.",
        "Never sideload trading APKs from Telegram or unknown web links."
      ],
      officialResources: {
        cybercrimeHelpline: "1930",
        cybercrimePortal: "https://cybercrime.gov.in/",
        sebiScoresUrl: "https://scores.sebi.gov.in/",
        smartOdrUrl: "https://smartodr.in/"
      },
      language: "en",
      isSimulated: true,
    }
  },
  {
    id: "scenario-cloned-sebi-identity",
    title: "Cloned SEBI Intermediary Identity & Personal VPA Mismatch",
    category: "Regulatory Impersonation",
    badge: "Registry Cross-Referencing",
    difficulty: "High Risk",
    type: "text",
    senderLabel: "SMS / WhatsApp from 'SEBI Certified Research Desk'",
    rawInput: `SEBI Advisory Alert: AURA WEALTH RESEARCH ADVISORS LLP (SEBI Registration No. INA000012345) invites retail investors to our exclusive HNI High-Growth Portfolio. Guaranteed 45% return per month managed by top fund managers. To activate your registered demat pool, transfer ₹50,000 to our Chief Investment Officer: suresh.aura@paytm. Authorized under SEBI/CIR/2026/04.`,
    expectedResult: {
      id: "demo-result-3",
      timestamp: "2026-10-04T17:00:00Z",
      inputType: "text",
      inputSummary: "Message impersonating registered entity AURA WEALTH RESEARCH ADVISORS LLP (INA000012345), promising 45% monthly return and requesting ₹50,000 to personal UPI suresh.aura@paytm.",
      riskScore: 94,
      riskLevel: "HIGH",
      riskExplanation: "Identity Cloning Attack. While INA000012345 is a genuine SEBI registration belonging to Aura Wealth in Mumbai, scammers have cloned the public corporate name while substituting their own personal Paytm UPI address (suresh.aura@paytm) and making illegal guaranteed return promises.",
      claims: {
        promisedReturns: "45% return per month",
        guaranteedClaim: true,
        timePressure: false,
        paymentRecipient: "suresh.aura@paytm",
        isPersonalAccount: true,
        claimedRegistrationNumber: "INA000012345",
        allegedEntityName: "AURA WEALTH RESEARCH ADVISORS LLP",
        withdrawalFeeDemanded: false,
      },
      indicators: [
        {
          id: "IND-07",
          name: "Intermediary Identity Impersonation",
          category: "IDENTITY",
          severity: "HIGH",
          description: "Scammers frequently harvest valid registration numbers from SEBI's public website to lend an aura of credibility to fraudulent payment schemes.",
          evidenceSnippet: "AURA WEALTH RESEARCH ADVISORS LLP (SEBI Registration No. INA000012345)"
        },
        {
          id: "IND-08",
          name: "Payment Destination Mismatch (Personal vs Corporate)",
          category: "IDENTITY",
          severity: "HIGH",
          description: "Registered Investment Advisers only operate corporate banking accounts (aurawealth@hdfcbank). Personal UPI handles (suresh.aura@paytm) are a definitive indicator of an impersonator.",
          evidenceSnippet: "transfer ₹50,000 to our Chief Investment Officer: suresh.aura@paytm"
        },
        {
          id: "IND-09",
          name: "Unlawful Guaranteed Return Scheme",
          category: "FINANCIAL",
          severity: "HIGH",
          description: "SEBI PR No. 27/2025 specifically warns that registered entities are strictly prohibited from promising fixed or guaranteed returns.",
          evidenceSnippet: "Guaranteed 45% return per month managed by top fund managers"
        }
      ],
      socratic: {
        primaryQuestion: "The SEBI registration number INA000012345 belongs to an established advisory firm in Mumbai, but this message instructs you to pay an individual's personal Paytm UPI address. Why would a regulated corporate entity collect client funds into a personal account?",
        secondaryQuestion: "If SEBI rules strictly forbid even legitimate registered advisers from promising guaranteed returns, why is this communication promising a guaranteed 45% return under the name of SEBI?",
        cognitiveTarget: "Distinguishing Official Regulatory Registration from Impersonator Misuse",
        metacognitiveInsight: "Having a valid SEBI number cited in a message does not mean the message came from that company. Scammers copy-paste real registration numbers to disguise personal fraud.",
        safeNextSteps: [
          "Do not send money to suresh.aura@paytm.",
          "Visit SEBI's official portal (sebi.gov.in) to look up Aura Wealth's genuine contact email and landline.",
          "Contact the official compliance officer listed on SEBI's portal to confirm whether they sent this message."
        ]
      },
      unverifiedAspects: [
        "The identity of the sender has not been authenticated against the registered entity's official domain.",
        "The claimed SEBI circular reference is fictitious."
      ],
      safeActionGuidance: [
        "Always cross-reference the payment account name with the registered corporate entity name.",
        "File an impersonation report with the genuine entity and on SEBI SCORES 2.0.",
        "Remember: A legitimate advisor will never accept fees or investments into personal UPI handles."
      ],
      officialResources: {
        cybercrimeHelpline: "1930",
        cybercrimePortal: "https://cybercrime.gov.in/",
        sebiScoresUrl: "https://scores.sebi.gov.in/",
        smartOdrUrl: "https://smartodr.in/"
      },
      language: "en",
      isSimulated: true,
    }
  },
  {
    id: "scenario-malicious-apk",
    title: "Sideloaded Trading APK & Remote Access Danger",
    category: "Android Malware & Sideloading",
    badge: "Malware Vector",
    difficulty: "Medium",
    type: "text",
    senderLabel: "Telegram 'Zero Loss Trading Gurus' Channel",
    rawInput: `EXCLUSIVE: Download our private NSE Institutional Direct Terminal APK: http://fast-nse-trade.apk (Not on Play Store because Google policies block high-speed algorithmic zero-tax trading). Install and enable 'Unknown Sources' to receive ₹10,000 trial margin immediately. Our algorithm auto-executes high frequency trades!`,
    expectedResult: {
      id: "demo-result-4",
      timestamp: "2026-10-04T17:00:00Z",
      inputType: "text",
      inputSummary: "Telegram message urging users to sideload an unauthorized APK ('http://fast-nse-trade.apk') with false justification that Play Store blocks zero-tax algorithms.",
      riskScore: 92,
      riskLevel: "HIGH",
      riskExplanation: "Severe malware distribution risk. Urging users to bypass Android security protections and sideload untrusted APKs is a well-documented vector for financial trojans, accessibility service abuse, and OTP interception.",
      claims: {
        guaranteedClaim: true,
        timePressure: false,
        isPersonalAccount: false,
        withdrawalFeeDemanded: false,
        suspiciousLinkOrApk: "http://fast-nse-trade.apk"
      },
      indicators: [
        {
          id: "IND-10",
          name: "Sideloaded Untrusted APK Vector",
          category: "PROCEDURAL",
          severity: "HIGH",
          description: "Legitimate brokers only distribute apps through Google Play Protect or Apple App Store. Sideloaded APKs can contain screen overlays and OTP-stealing trojans.",
          evidenceSnippet: "Download our private NSE Institutional Direct Terminal APK: http://fast-nse-trade.apk"
        },
        {
          id: "IND-11",
          name: "Deceptive Security Bypass Request",
          category: "PSYCHOLOGICAL",
          severity: "HIGH",
          description: "Falsely rationalizing why the app is absent from official stores to convince the victim to lower device security shields.",
          evidenceSnippet: "Not on Play Store because Google policies block high-speed algorithmic zero-tax trading"
        }
      ],
      socratic: {
        primaryQuestion: "If all SEBI-registered brokers in India must comply with strict cybersecurity and official app store standards, why would a genuine financial service ask you to bypass your phone's security to install an unverified APK?",
        secondaryQuestion: "If this application requests permission to read your screen or accessibility services, what would stop it from reading your bank OTPs?",
        cognitiveTarget: "Recognizing Technical Vulnerability and Sideloading Risks",
        metacognitiveInsight: "Ask yourself: Is the promise of free margin worth giving complete control of your smartphone and bank OTPs to an anonymous internet group?",
        safeNextSteps: [
          "Do NOT click or download the APK.",
          "If already downloaded, do not install or immediately uninstall it without granting accessibility permissions.",
          "Trade only through registered brokers listed on nseindia.com or bseindia.com."
        ]
      },
      unverifiedAspects: [
        "The APK host is an unverified HTTP domain without cryptographic code signing from any recognized exchange.",
      ],
      safeActionGuidance: [
        "Keep Google Play Protect enabled on your Android device.",
        "Never grant Accessibility or SMS permissions to unofficial apps."
      ],
      officialResources: {
        cybercrimeHelpline: "1930",
        cybercrimePortal: "https://cybercrime.gov.in/",
        sebiScoresUrl: "https://scores.sebi.gov.in/",
        smartOdrUrl: "https://smartodr.in/"
      },
      language: "en",
      isSimulated: true,
    }
  },
  {
    id: "scenario-clean-awareness",
    title: "Official Investor Awareness Advisory (Clean Baseline)",
    category: "Legitimate Communication",
    badge: "Low Risk Control",
    difficulty: "Easy",
    type: "text",
    senderLabel: "National Stock Exchange (NSE) Official SMS Alert",
    rawInput: `NSE Investor Alert: Do not trade based on unsolicited tips via SMS, Telegram or WhatsApp. Verify registered stock brokers and analysts on www.nseindia.com before dealing. SEBI registered entities never promise assured returns. Protect your hard-earned wealth. Report cyber financial crime to helpline 1930.`,
    expectedResult: {
      id: "demo-result-5",
      timestamp: "2026-10-04T17:00:00Z",
      inputType: "text",
      inputSummary: "Official investor advisory reminding investors to verify intermediaries on nseindia.com and noting that registered entities never promise assured returns.",
      riskScore: 5,
      riskLevel: "LOW",
      riskExplanation: "This communication is consistent with standard, official investor education guidelines. It contains no payment requests, no guaranteed return claims, no urgency triggers, and directs users to official regulatory resources.",
      claims: {
        guaranteedClaim: false,
        timePressure: false,
        isPersonalAccount: false,
        withdrawalFeeDemanded: false,
      },
      indicators: [],
      socratic: {
        primaryQuestion: "How does this advisory's advice to independently verify through official portals compare with messages that push you to make immediate payments?",
        secondaryQuestion: "Notice how this message requests zero money and asks you to consult official sources?",
        cognitiveTarget: "Reinforcing Healthy Investor Vigilance and Regulatory Habits",
        metacognitiveInsight: "Notice the difference: Legitimate advisories encourage slow, independent verification. Fraudulent messages always push for quick, impulsive action.",
        safeNextSteps: [
          "Bookmark the official regulatory websites (sebi.gov.in, nseindia.com).",
          "Share legitimate safety advisories with friends and family members."
        ]
      },
      unverifiedAspects: [],
      safeActionGuidance: [
        "Continue practicing sound financial hygiene.",
        "Always cross-reference market claims on recognized exchanges."
      ],
      officialResources: {
        cybercrimeHelpline: "1930",
        cybercrimePortal: "https://cybercrime.gov.in/",
        sebiScoresUrl: "https://scores.sebi.gov.in/",
        smartOdrUrl: "https://smartodr.in/"
      },
      language: "en",
      isSimulated: true,
    }
  }
];
