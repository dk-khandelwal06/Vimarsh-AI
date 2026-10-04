import { FraudAnalysisResult } from "@/types";

const HISTORY_STORAGE_KEY = "vimarsh_demo_history_v1";
const THEME_STORAGE_KEY = "vimarsh_theme_v1";
const LANG_STORAGE_KEY = "vimarsh_lang_v1";
const LAB_SCORE_KEY = "vimarsh_lab_score_v1";

export function getStoredAnalyses(): FraudAnalysisResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveAnalysisToHistory(result: FraudAnalysisResult): void {
  if (typeof window === "undefined") return;
  try {
    const history = getStoredAnalyses();
    // Keep max 20 analyses in session
    const updated = [result, ...history.filter(h => h.id !== result.id)].slice(0, 20);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to store analysis in session history", e);
  }
}

export function clearSessionHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear session history", e);
  }
}

export function getStoredTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    return t === "light" ? "light" : "dark"; // Default is dark
  } catch {
    return "dark";
  }
}

export function setStoredTheme(theme: "dark" | "light"): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {}
}

export function getStoredLanguage(): "en" | "hi" | "hinglish" {
  if (typeof window === "undefined") return "en";
  try {
    const lang = localStorage.getItem(LANG_STORAGE_KEY);
    if (lang === "hi" || lang === "hinglish") return lang;
    return "en";
  } catch {
    return "en";
  }
}

export function setStoredLanguage(lang: "en" | "hi" | "hinglish"): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (e) {}
}

export function getStoredLabScore(): { completed: string[]; totalScore: number } {
  if (typeof window === "undefined") return { completed: [], totalScore: 0 };
  try {
    const raw = localStorage.getItem(LAB_SCORE_KEY);
    return raw ? JSON.parse(raw) : { completed: [], totalScore: 0 };
  } catch {
    return { completed: [], totalScore: 0 };
  }
}

export function saveLabCompletion(scenarioId: string, scoreGained: number): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredLabScore();
    if (!current.completed.includes(scenarioId)) {
      current.completed.push(scenarioId);
      current.totalScore += scoreGained;
      localStorage.setItem(LAB_SCORE_KEY, JSON.stringify(current));
    }
  } catch (e) {}
}
