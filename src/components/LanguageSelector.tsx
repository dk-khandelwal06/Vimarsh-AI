"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { getStoredLanguage, setStoredLanguage } from "@/lib/store";

interface LanguageSelectorProps {
  onLanguageChange?: (lang: "en" | "hi" | "hinglish") => void;
  className?: string;
}

export default function LanguageSelector({ onLanguageChange, className = "" }: LanguageSelectorProps) {
  const [lang, setLang] = useState<"en" | "hi" | "hinglish">("en");

  useEffect(() => {
    const saved = getStoredLanguage();
    setLang(saved);
  }, []);

  const handleChange = (newLang: "en" | "hi" | "hinglish") => {
    setLang(newLang);
    setStoredLanguage(newLang);
    if (onLanguageChange) onLanguageChange(newLang);
    // Dispatch custom event for app-wide sync
    window.dispatchEvent(new CustomEvent("vimarsh_lang_change", { detail: newLang }));
  };

  return (
    <div className={`flex items-center gap-1 p-1 bg-slate-900/60 dark:bg-slate-900/80 border border-slate-700/60 rounded-xl text-xs ${className}`}>
      <div className="pl-2 pr-1 text-slate-400 flex items-center gap-1">
        <Globe className="w-3.5 h-3.5 text-cyanAccent-400" />
      </div>
      <button
        type="button"
        onClick={() => handleChange("en")}
        className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
          lang === "en"
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => handleChange("hi")}
        className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
          lang === "hi"
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        हिन्दी
      </button>
      <button
        type="button"
        onClick={() => handleChange("hinglish")}
        className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
          lang === "hinglish"
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        Hinglish
      </button>
    </div>
  );
}
