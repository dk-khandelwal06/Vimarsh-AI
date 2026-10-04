import { verifySebiIdentity, checkPersonalVpa } from "../src/lib/verification/sebiMatcher.js";
import { analyzeTextHeuristically } from "../src/lib/ai/heuristicAnalyzer.js";

console.log("=== VIMARSH.AI AUTOMATED VERIFICATION SUITE ===");

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failed++;
  }
}

// Test 1: SEBI Matcher Valid ID
const r1 = verifySebiIdentity("INA000012345");
assert(r1.found === true, "Valid SEBI ID INA000012345 is identified in registry");
assert(r1.entity?.entityName.includes("AURA WEALTH"), "Entity name matched Aura Wealth");

// Test 2: Personal VPA Check
const vpaCheck1 = checkPersonalVpa("suresh.aura@paytm");
assert(vpaCheck1.isPersonal === true, "Identified personal UPI handle: suresh.aura@paytm");

const vpaCheck2 = checkPersonalVpa("aurawealth@hdfcbank");
assert(vpaCheck2.isPersonal === false, "Corporate VPA recognized: aurawealth@hdfcbank");

// Test 3: Identity Mismatch Detection
const r3 = verifySebiIdentity("INA000012345", "suresh.aura@paytm");
assert(r3.isPersonalVpaSuspicion === true, "Flagged personal UPI mismatch for registered firm");

// Test 4: Guaranteed Return Heuristic Detection
const t1 = analyzeTextHeuristically("Guaranteed 10% daily return on stock tips. Transfer to amit@okhdfcbank right now closing in 10 mins!");
assert(t1.riskLevel === "HIGH", "Flagged guaranteed return + urgency as HIGH risk");
assert(t1.claims.guaranteedClaim === true, "Extracted guaranteed return claim");
assert(t1.claims.timePressure === true, "Extracted urgency claim");

// Test 5: Withdrawal Fee Detection
const t2 = analyzeTextHeuristically("Your withdrawal of 50000 is on hold. Pay release fee of 5000 to unfreeze account.");
assert(t2.claims.withdrawalFeeDemanded === true, "Detected advance withdrawal fee extortion");

// Test 6: Clean Baseline
const t3 = analyzeTextHeuristically("NSE Investor alert: Verify registered stock brokers on nseindia.com before dealing. No registered entity guarantees returns.");
assert(t3.riskLevel === "LOW", "Clean regulatory advisory recognized as LOW risk");

console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
