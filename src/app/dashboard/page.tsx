"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ShieldAlert,
  SearchCheck,
  MessageSquareHeart,
  BookOpen,
  LifeBuoy,
  BarChart3,
  Sparkles,
  Lock,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import SocraticShield from "@/components/SocraticShield";
import VerificationTool from "@/components/VerificationTool";
import ChatBot from "@/components/ChatBot";
import AwarenessLab from "@/components/AwarenessLab";
import EmergencySupport from "@/components/EmergencySupport";
import SessionAnalytics from "@/components/SessionAnalytics";
import { FraudAnalysisResult } from "@/types";
import { getStoredLanguage } from "@/lib/store";

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "shield";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [language, setLanguage] = useState<"en" | "hi" | "hinglish">("en");
  const [selectedAnalysis, setSelectedAnalysis] = useState<FraudAnalysisResult | null>(null);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) setActiveTab(tabFromUrl);

    setLanguage(getStoredLanguage());

    const handleLangChange = (e: any) => {
      if (e.detail) setLanguage(e.detail);
    };
    window.addEventListener("vimarsh_lang_change", handleLangChange);
    return () => window.removeEventListener("vimarsh_lang_change", handleLangChange);
  }, [searchParams]);

  const tabs = [
    { id: "shield", label: "Socratic Shield", icon: ShieldAlert, subtitle: "Analyze Text & Images" },
    { id: "verify", label: "SEBI Identity Check", icon: SearchCheck, subtitle: "Verify Reg & VPA" },
    { id: "chat", label: "Ask Vimarsh", icon: MessageSquareHeart, subtitle: "AI Safety Assistant" },
    { id: "lab", label: "Scam Awareness Lab", icon: BookOpen, subtitle: "Gamified Training" },
    { id: "emergency", label: "Emergency Support", icon: LifeBuoy, subtitle: "1930 & Golden Hour" },
    { id: "analytics", label: "Session History", icon: BarChart3, subtitle: "Local Interaction Log" },
  ];

  return (
    <div className="min-h-screen py-8 bg-mesh-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Welcome Header */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>SANGYAN 2026 Protection Workspace</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white tracking-tight">
              Investor Cognitive Safety Dashboard
            </h1>
            <p className="text-xs text-slate-400 max-w-xl">
              Interrupting financial deception through multimodal VLM threat analysis and Automated Socratic Questioning.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab("shield")}
              className="text-xs px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 transition-all font-medium"
            >
              Analyze Tip
            </button>
            <button
              onClick={() => setActiveTab("verify")}
              className="text-xs px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-500/30 transition-all font-medium"
            >
              Check SEBI No.
            </button>
            <button
              onClick={() => setActiveTab("emergency")}
              className="text-xs px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 transition-all font-medium"
            >
              Helpline 1930
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex overflow-x-auto pb-1 gap-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id !== "shield") setSelectedAnalysis(null);
                }}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-left whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? "bg-indigo-600 text-white border-cyan-400/50 shadow-lg shadow-indigo-600/20"
                    : "glass-card text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-300" : "text-slate-500"}`} />
                <div>
                  <div className="text-xs font-semibold leading-tight">{tab.label}</div>
                  <div
                    className={`text-[10px] leading-tight ${
                      isActive ? "text-indigo-200" : "text-slate-500"
                    }`}
                  >
                    {tab.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tab Workspace */}
        <div className="pt-2">
          {activeTab === "shield" && (
            <SocraticShield initialResult={selectedAnalysis} language={language} />
          )}

          {activeTab === "verify" && <VerificationTool />}

          {activeTab === "chat" && <ChatBot language={language} />}

          {activeTab === "lab" && <AwarenessLab />}

          {activeTab === "emergency" && <EmergencySupport />}

          {activeTab === "analytics" && (
            <SessionAnalytics
              onSelectAnalysis={(analysis) => {
                setSelectedAnalysis(analysis);
                setActiveTab("shield");
              }}
            />
          )}
        </div>

        {/* Privacy & Guardrail Footer Note */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              <strong>DPDP Act 2023 Compliance:</strong> All submitted text and images are evaluated ephemerally in RAM and never stored permanently.
            </span>
          </div>
          <span className="text-slate-500">SANGYAN Track A • IIT (BHU) Varanasi</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-16 flex items-center justify-center bg-slate-950 text-slate-400 text-xs">
          Loading Vimarsh Cognitive Safety Workspace...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
