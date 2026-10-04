import { SEBI_REFERENCE_DATABASE, OFFICIAL_REGULATORY_LINKS } from "@/data/sebiDatabase";
import { VerificationCheckResult, SebiEntity } from "@/types";

export function checkPersonalVpa(vpa?: string): { isPersonal: boolean; reason?: string } {
  if (!vpa || !vpa.includes("@")) return { isPersonal: false };

  const lower = vpa.toLowerCase().trim();
  // Typical personal UPI handles vs institutional handles
  const personalProviders = ["@okhdfcbank", "@okaxis", "@oksbi", "@okicici", "@paytm", "@ybl", "@ibl", "@axl"];
  const isPersonalProvider = personalProviders.some(p => lower.endsWith(p));

  // Check if prefix looks like a personal name (e.g. rahul.sharma, amit99, suresh)
  const prefix = lower.split("@")[0];
  const hasDotName = /^[a-z]+\.[a-z0-9]+$/.test(prefix);
  const hasNumbers = /\d{2,}$/.test(prefix);

  if (isPersonalProvider || hasDotName || hasNumbers) {
    return {
      isPersonal: true,
      reason: `The VPA '${vpa}' appears to be an individual's personal UPI account rather than an authorized corporate/escrow account.`,
    };
  }

  return { isPersonal: false };
}

export function verifySebiIdentity(
  query: string,
  paymentVpa?: string
): VerificationCheckResult {
  const cleanQuery = query.trim().toUpperCase();
  const isRegNumber = /^[A-Z]{3}\d{8,12}$/i.test(cleanQuery.replace(/\s+/g, ""));

  let matched: SebiEntity | undefined;
  let discrepancies: string[] = [];

  if (isRegNumber) {
    const normalizedReg = cleanQuery.replace(/\s+/g, "");
    matched = SEBI_REFERENCE_DATABASE.find(
      (e) => e.registrationNumber.toUpperCase() === normalizedReg
    );
  } else {
    // Search by entity name
    matched = SEBI_REFERENCE_DATABASE.find((e) =>
      e.entityName.toUpperCase().includes(cleanQuery) ||
      cleanQuery.includes(e.entityName.toUpperCase()) ||
      (e.officialDomain && cleanQuery.includes(e.officialDomain.toUpperCase()))
    );
  }

  const vpaCheck = checkPersonalVpa(paymentVpa);
  let isPersonalVpaSuspicion = vpaCheck.isPersonal;

  if (matched && paymentVpa) {
    const lowerVpa = paymentVpa.toLowerCase();
    const expectedCorporate = matched.corporateVpaPattern.toLowerCase();
    if (!lowerVpa.includes(matched.entityName.toLowerCase().split(" ")[0].toLowerCase()) &&
        !lowerVpa.includes(expectedCorporate.split("@")[0])) {
      discrepancies.push(
        `PAYMENT MISMATCH: The entity is registered as '${matched.entityName}', but payment is requested to '${paymentVpa}'. Regulated firms never collect funds through unrelated or personal UPI accounts.`
      );
      isPersonalVpaSuspicion = true;
    }
  }

  if (matched) {
    if (matched.status !== "ACTIVE") {
      discrepancies.push(`STATUS WARNING: Entity registration is currently marked as ${matched.status}.`);
    }
  } else {
    discrepancies.push(
      `NOT FOUND IN REFERENCE REGISTRY: No active SEBI registration matched '${query}'. Please check the spelling or search SEBI's live public directory.`
    );
  }

  const guidance = matched
    ? `IMPORTANT SAFETY NOTICE: A matching registration record was found for ${matched.entityName} (${matched.registrationNumber}). However, a valid registration number alone DOES NOT prove the message or sender is legitimate. Scammers frequently clone genuine corporate identities from public records. Always confirm through the official domain (${matched.officialDomain}) and never remit funds to an individual UPI handle.`
    : `UNREGISTERED CLAIM ADVISORY: The claimed identity could not be verified in the reference directory. Anyone offering stock recommendations, portfolio management, or research analysis must hold a valid SEBI registration. Always independently cross-verify on sebi.gov.in before transferring any money.`;

  return {
    query,
    searchedType: isRegNumber ? "REGISTRATION_NUMBER" : "ENTITY_NAME",
    found: !!matched,
    entity: matched,
    isExactMatch: !!matched,
    inputPaymentVpa: paymentVpa,
    isPersonalVpaSuspicion,
    vpaAlertMessage: vpaCheck.reason,
    discrepancies,
    verificationGuidance: guidance,
    officialSearchUrl: OFFICIAL_REGULATORY_LINKS.sebiIntermediariesList,
  };
}
