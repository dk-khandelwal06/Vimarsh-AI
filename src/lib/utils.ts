import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

/**
 * DPDP Act 2023 Compliance Helper:
 * Automatically masks recognizable 10-digit phone numbers and bank account numbers
 * in client-displayed text to preserve privacy during demonstrations.
 */
export function maskSensitiveData(text: string): string {
  if (!text) return "";
  // Mask 10-digit Indian mobile numbers (+91 optional), keeping first 4 and last 2
  const phoneRegex = /(\+?91[\-\s]?)?([6-9]\d{2})\d{4}(\d{2})/g;
  let masked = text.replace(phoneRegex, "$1$2-XXXX-$3");

  // Mask long bank account digits (>8 digits)
  const bankRegex = /\b(\d{4})\d{4,8}(\d{4})\b/g;
  masked = masked.replace(bankRegex, "$1-XXXX-$2");

  return masked;
}
