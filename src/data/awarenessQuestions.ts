import { AwarenessScenario } from "@/types";

export const AWARENESS_SCENARIOS: AwarenessScenario[] = [
  {
    id: "lab-1",
    title: "The 'Secret IPO Quota' Telegram Message",
    tag: "Primary Market Scam",
    difficulty: "Easy",
    context: "You receive an unsolicited message from a contact named 'Kunal - Elite Institutional Desk' in a stock market Telegram group.",
    senderName: "Kunal - Institutional Allocation (+91 91234 XXXXX)",
    messageBody: "Sir/Madam, we have 500 shares of exclusive Institutional Anchor Quota for upcoming Mega IPO at 50% discount to issue price! Only 3 lots left for retail friends. Transfer ₹45,000 to accounts manager UPI: kunal.anchor@okaxis right now before cutoff at 4:30 PM. 100% allotment guaranteed!",
    indicatorsPresent: [
      {
        id: "ind-1",
        label: "Guaranteed 100% IPO Allotment Claim",
        isCorrect: true,
        explanation: "IPO allotments are strictly regulated by SEBI and executed via ASBA (Application Supported by Blocked Amount). No third party can guarantee quota allotment."
      },
      {
        id: "ind-2",
        label: "Discount to Official Issue Price",
        isCorrect: true,
        explanation: "Institutional allocations cannot be legally resold at a 50% discount to retail individuals on messaging apps."
      },
      {
        id: "ind-3",
        label: "Personal UPI Transfer Request",
        isCorrect: true,
        explanation: "Legitimate IPO applications NEVER ask you to transfer funds to a private UPI handle. Funds are only blocked in your own bank account via ASBA."
      },
      {
        id: "ind-4",
        label: "Time Cutoff Pressure (4:30 PM)",
        isCorrect: true,
        explanation: "Arbitrary short deadlines are engineered to induce FOMO panic and bypass your rational verification checks."
      }
    ],
    socraticLesson: "Why would an institutional fund manager allocate valuable anchor quota to random strangers on Telegram, and why would payments go to a private UPI rather than your own ASBA bank mandate?",
    legalReference: "SEBI ICDR Regulations mandate ASBA for all retail IPO bids; direct third-party cash or UPI transfers are illegal."
  },
  {
    id: "lab-2",
    title: "The 'Tax Release Fee' for Frozen Profits",
    tag: "Pig Butchering / Sha Zhu Pan",
    difficulty: "Medium",
    context: "After joining an online forex/crypto group, your dashboard displays a balance of ₹3,80,000. When you click Withdraw, this popup appears:",
    senderName: "Global Wealth Terminal System Alert",
    messageBody: "WITHDRAWAL SUSPENDED: Tax Compliance Requirement. As per Indian Income Tax guidelines, foreign earnings require a 20% advance release clearance fee (₹76,000). Please remit ₹76,000 to nodal clearing account UPI: clearing.officer.deputy@sbi to receive your funds within 15 minutes. Warning: Deductions from existing balance are strictly prohibited by cyber security rules.",
    indicatorsPresent: [
      {
        id: "ind-5",
        label: "Demanding Fresh Upfront Money to Release Existing Funds",
        isCorrect: true,
        explanation: "This is the classic advance-fee extortion pattern. Once you pay the ₹76,000, scammers will invent 'currency conversion fees' or 'anti-money laundering fees' to demand even more."
      },
      {
        id: "ind-6",
        label: "Refusal to Deduct Fees Directly from Account Balance",
        isCorrect: true,
        explanation: "Real brokerages and banks deduct applicable brokerage, STT, and TDS directly from the portfolio cash balance. They never demand additional out-of-pocket cash."
      },
      {
        id: "ind-7",
        label: "Fake Regulatory & Tax Justification",
        isCorrect: true,
        explanation: "Income Tax in India is paid directly to the Government via official Challan (TIN-NSDL) or deducted at source (TDS). No government tax is payable to an individual UPI address."
      }
    ],
    socraticLesson: "If the platform really holds ₹3,80,000 of your money, why can't they simply deduct the ₹76,000 from that balance and wire you the remaining ₹3,04,000?",
    legalReference: "Bharatiya Nyaya Sanhita (BNS) Section 318 (Cheating and dishonestly inducing delivery of property)."
  },
  {
    id: "lab-3",
    title: "The 'Cloned SEBI Research Analyst' Call",
    tag: "Intermediary Impersonation",
    difficulty: "Advanced",
    context: "A caller sends a WhatsApp profile featuring SEBI logo and a valid registration certificate for 'Bharat Equities Research Analysts Pvt Ltd'.",
    senderName: "Bharat Equities Official Support",
    messageBody: "Respected Investor, this is Bharat Equities (SEBI Reg: INH000008890). We are starting a special Navratri Jackpot Option Trading pool. Minimum investment ₹20,000. We will trade in your name with 98% accuracy and guarantee 5x return in 3 days. Send fee of ₹20,000 to our regional coordinator UPI: suresh.analyst@okhdfcbank. See attached SEBI certificate.",
    indicatorsPresent: [
      {
        id: "ind-8",
        label: "Guaranteed 5x Return / 98% Accuracy",
        isCorrect: true,
        explanation: "SEBI Circular PR No. 27/2025 forbids registered analysts from promising performance guarantees or assured multiples."
      },
      {
        id: "ind-9",
        label: "Personal UPI Mismatch for Corporate Entity",
        isCorrect: true,
        explanation: "Bharat Equities is a registered corporate private limited company. Their official banking handle is bharatresearch@icici, not suresh.analyst@okhdfcbank."
      },
      {
        id: "ind-10",
        label: "Misuse of SEBI Logo & Real Registration Number",
        isCorrect: true,
        explanation: "Scammers clone legitimate public numbers (INH000008890) from sebi.gov.in. A valid number alone does not verify the identity of the WhatsApp sender."
      }
    ],
    socraticLesson: "Even though the registration number belongs to a real company in Bangalore, why does the recipient UPI handle bear the name of an individual, and why are they promising returns that SEBI strictly makes illegal?",
    legalReference: "SEBI (Research Analysts) Regulations, 2014 & SEBI Circular PR No. 27/2025."
  }
];
