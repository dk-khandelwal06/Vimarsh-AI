export type RiskLevel = 'LOW' | 'CAUTION' | 'HIGH' | 'UNABLE_TO_ASSESS';

export interface ObservableIndicator {
  id: string;
  name: string;
  category: 'FINANCIAL' | 'PSYCHOLOGICAL' | 'IDENTITY' | 'PROCEDURAL';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  evidenceSnippet?: string;
}

export interface ExtractedClaims {
  promisedReturns?: string;
  guaranteedClaim: boolean;
  timePressure: boolean;
  urgencyDetails?: string;
  paymentRecipient?: string;
  isPersonalAccount: boolean;
  claimedRegistrationNumber?: string;
  allegedEntityName?: string;
  withdrawalFeeDemanded: boolean;
  withdrawalFeeAmount?: string;
  suspiciousLinkOrApk?: string;
}

export interface SocraticIntervention {
  primaryQuestion: string;
  secondaryQuestion?: string;
  cognitiveTarget: string; // e.g. "Interrupting FOMO / Dissecting Assured Return Claim"
  metacognitiveInsight: string;
  safeNextSteps: string[];
}

export interface FraudAnalysisResult {
  id: string;
  timestamp: string;
  inputType: 'text' | 'image';
  inputSummary: string;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  riskExplanation: string;
  claims: ExtractedClaims;
  indicators: ObservableIndicator[];
  socratic: SocraticIntervention;
  verifiedFacts?: string[];
  unverifiedAspects: string[];
  safeActionGuidance: string[];
  officialResources: {
    cybercrimeHelpline: string;
    cybercrimePortal: string;
    sebiScoresUrl: string;
    smartOdrUrl: string;
  };
  language: 'en' | 'hi' | 'hinglish';
  isSimulated?: boolean;
}

export interface SocraticMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  timestamp: string;
  isSocraticQuestion?: boolean;
}

export interface SebiEntity {
  registrationNumber: string;
  entityName: string;
  category: 'Research Analyst' | 'Investment Adviser' | 'Stock Broker' | 'Mutual Fund';
  city: string;
  state: string;
  officialDomain: string;
  corporateVpaPattern: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
  registeredSince: string;
}

export interface VerificationCheckResult {
  query: string;
  searchedType: 'REGISTRATION_NUMBER' | 'ENTITY_NAME';
  found: boolean;
  entity?: SebiEntity;
  isExactMatch: boolean;
  inputPaymentVpa?: string;
  isPersonalVpaSuspicion: boolean;
  vpaAlertMessage?: string;
  discrepancies: string[];
  verificationGuidance: string;
  officialSearchUrl: string;
}

export interface AwarenessScenario {
  id: string;
  title: string;
  tag: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  context: string;
  senderName: string;
  messageBody: string;
  claimedImage?: string;
  indicatorsPresent: {
    id: string;
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  socraticLesson: string;
  legalReference: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'vimarsh';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}
