"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Sparkles, Globe, Sun, Moon, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { setStoredLanguage, setStoredTheme, getStoredTheme } from "@/lib/store";

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<"en" | "hi" | "hinglish">("en");
  const [selectedTheme, setSelectedTheme] = useState<"dark" | "light">("dark");
  const [agreedPrivacy, setAgreedPrivacy] = useState(true);

  const handleStart = () => {
    setStoredLanguage(selectedLang);
    setStoredTheme(selectedTheme);
    if (selectedTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-mesh-dark px-4 sm:px-6">
      <div className="max-w-xl w-full glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 mx-auto flex items-center justify-center text-white shadow-lg">
            <ShieldCheck className="w-6 h-6 text-cyan-300" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">
            Welcome to Vimarsh.AI
          </h1>
          <p className="text-xs text-slate-400">
            Configure your preferences to enter the Socratic Fraud Shield prototype
          </p>
        </div>

        {/* Step 1: Language */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            1. Select Language Preference
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "en", label: "English", desc: "Default" },
              { id: "hi", label: "हिन्दी", desc: "Hindi" },
              { id: "hinglish", label: "Hinglish", desc: "Conversational" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedLang(item.id as any)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedLang === item.id
                    ? "bg-indigo-600 border-cyan-400 text-white shadow-md"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-xs font-bold">{item.label}</div>
                <div className="text-[10px] text-slate-300/80">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Theme */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            2. Interface Theme
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedTheme("dark")}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                selectedTheme === "dark"
                  ? "bg-indigo-600 border-cyan-400 text-white shadow-md"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Moon className="w-4 h-4 text-cyan-300" />
              <span className="text-xs font-medium">Dark Mode (Default)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedTheme("light")}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                selectedTheme === "light"
                  ? "bg-indigo-600 border-cyan-400 text-white shadow-md"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-medium">Light Mode</span>
            </button>
          </div>
        </div>

        {/* Step 3: Privacy & DPDP Notice */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>Digital Personal Data Protection (DPDP) Act 2023 Notice</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Vimarsh.AI operates under a strict <strong>Zero-Retention Policy</strong>. User-forwarded screenshots, texts, and queries are evaluated in ephemeral memory for the duration of the API call and immediately discarded. No credentials or passwords are collected.
          </p>
          <label className="flex items-center gap-2 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedPrivacy}
              onChange={(e) => setAgreedPrivacy(e.target.checked)}
              className="rounded border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span className="text-[11px] text-slate-300">
              I understand this is an investor protection research prototype (SANGYAN 2026).
            </span>
          </label>
        </div>

        {/* Launch Actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleStart}
            disabled={!agreedPrivacy}
            className="w-full py-3 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 disabled:opacity-40 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <span>Continue as Guest Investor</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center">
            <Link
              href="/demo"
              className="text-[11px] text-cyan-400 hover:underline"
            >
              Or jump straight to SANGYAN Jury Evaluation Mode →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
