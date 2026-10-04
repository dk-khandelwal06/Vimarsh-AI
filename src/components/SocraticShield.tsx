"use client";

import { useState, useRef } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Upload,
  FileText,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  PhoneCall,
  Lock,
  Layers,
  Zap,
} from "lucide-react";
import { FraudAnalysisResult, RiskLevel } from "@/types";
import { DEMO_SCENARIOS } from "@/data/demoScenarios";
import { saveAnalysisToHistory } from "@/lib/store";
import SocraticDialogueBox from "./SocraticDialogueBox";

interface SocraticShieldProps {
  initialResult?: FraudAnalysisResult | null;
  language?: "en" | "hi" | "hinglish";
}

export default function SocraticShield({ initialResult = null, language = "en" }: SocraticShieldProps) {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  const [inputText, setInputText] = useState("");
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(1);
  const [analysisResult, setAnalysisResult] = useState<FraudAnalysisResult | null>(initialResult);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (PNG, JPG, JPEG, WEBP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 10MB limit. Please upload a compressed screenshot.");
      return;
    }

    setImageFileName(file.name);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const runAnalysis = async (customPayload?: { text?: string; imageBase64?: string }) => {
    const textToSend = customPayload?.text !== undefined ? customPayload.text : (activeTab === "text" ? inputText : "");
    const imgToSend = customPayload?.imageBase64 !== undefined ? customPayload.imageBase64 : (activeTab === "image" ? selectedImageBase64 : undefined);

    if (!textToSend && !imgToSend) {
      setErrorMsg("Please enter a suspicious message or upload a screenshot to analyze.");
      return;
    }

    setErrorMsg(null);
    setLoading(true);
    setLoadingStep(1);

    // Dynamic progression visualizer
    const stepTimer1 = setTimeout(() => setLoadingStep(2), 500);
    const stepTimer2 = setTimeout(() => setLoadingStep(3), 1100);
    const stepTimer3 = setTimeout(() => setLoadingStep(4), 1800);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToSend,
          imageBase64: imgToSend,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze content");
      }

      setAnalysisResult(data);
      saveAnalysisToHistory(data);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred during analysis.");
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setLoading(false);
      setLoadingStep(1);
    }
  };

  const handleApplyPreset = (scenarioId: string) => {
    const scenario = DEMO_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;

    if (scenario.type === "text") {
      setActiveTab("text");
      setInputText(scenario.rawInput);
      setSelectedImageBase64(null);
      runAnalysis({ text: scenario.rawInput });
    } else {
      setActiveTab("image");
      // Use synthesized text payload for the demo image scenario
      setInputText(scenario.rawInput);
      runAnalysis({ text: scenario.rawInput });
    }
  };

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case "HIGH":
        return {
          bg: "bg-rose-500/10",
          border: "border-rose-500/30",
          text: "text-rose-400",
          badge: "bg-rose-600 text-white",
          glow: "glow-danger",
        };
      case "CAUTION":
        return {
          bg: "bg-amber-500/10",
          border: "border-amber-500/30",
          text: "text-amber-400",
          badge: "bg-amber-500 text-slate-950",
          glow: "",
        };
      case "LOW":
        return {
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/30",
          text: "text-emerald-400",
          badge: "bg-emerald-600 text-white",
          glow: "",
        };
      default:
        return {
          bg: "bg-slate-800/40",
          border: "border-slate-700",
          text: "text-slate-400",
          badge: "bg-slate-700 text-white",
          glow: "",
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Configuration Card */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-400" />
              <span>Socratic Fraud Shield Interceptor</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Submit suspicious investment tips, WhatsApp texts, or fake trading app screenshots
            </p>
          </div>

          {/* Input Type Switcher */}
          <div className="flex p-1 bg-slate-900/90 border border-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setActiveTab("text")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "text"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Paste Text</span>
            </button>
            <button
              onClick={() => setActiveTab("image")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "image"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Upload Screenshot</span>
            </button>
          </div>
        </div>

        {/* Input Areas */}
        <div className="pt-4 space-y-4">
          {activeTab === "text" ? (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Suspicious Financial Message or Ad:
              </label>
              <textarea
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste the suspicious WhatsApp tip, Telegram group invite, or guaranteed return offer here (e.g. 'Guaranteed 10% daily return, transfer to personal UPI...')"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700/70 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-sans leading-relaxed"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Upload Financial Screenshot (P&L statement, fake trading app, SEBI certificate):
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {selectedImageBase64 ? (
                <div className="relative rounded-xl border border-indigo-500/40 p-4 bg-slate-950/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedImageBase64}
                      alt="Uploaded Screenshot"
                      className="w-16 h-16 object-cover rounded-lg border border-slate-700"
                    />
                    <div>
                      <p className="text-xs font-medium text-white truncate max-w-[200px] sm:max-w-md">
                        {imageFileName || "Screenshot ready for Gemini Vision"}
                      </p>
                      <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Ready for Optical Character Extraction
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedImageBase64(null);
                      setImageFileName("");
                    }}
                    className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 rounded bg-slate-800 border border-slate-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-indigo-500/60 bg-slate-950/40 hover:bg-slate-900/40 rounded-xl p-6 text-center cursor-pointer transition-all"
                >
                  <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-200 font-medium">
                    Click to browse or drag and drop screenshot
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Supports PNG, JPG, JPEG, WEBP (Max 10MB). Processed securely via Gemini Vision.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Quick Demo Preset Pills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Quick-load synthetic demonstration scenarios:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {DEMO_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleApplyPreset(scenario.id)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-indigo-900/40 text-slate-300 hover:text-white border border-slate-700/60 hover:border-indigo-500/50 transition-all text-left flex items-center gap-1.5"
                >
                  <span>{scenario.title}</span>
                  <span className="text-[9px] px-1 rounded bg-slate-900 text-cyan-300">
                    {scenario.difficulty}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Error message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>DPDP 2023 Compliant: Zero persistence. Processed ephemerally in RAM.</span>
            </div>

            <button
              onClick={() => runAnalysis()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-600/25 disabled:opacity-50 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                  <span>Interrogating Evidence...</span>
                </>
              ) : (
                <>
                  <span>Activate Socratic Shield</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Pipeline State Visualizer */}
        {loading && (
          <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                Dual-Process Cognitive Pipeline Active
              </span>
              <span className="text-cyan-400 font-mono text-[11px]">Step {loadingStep} of 4</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(loadingStep / 4) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400">
              <div className={loadingStep >= 1 ? "text-cyan-300 font-medium" : ""}>
                1. Text/OCR Parsing
              </div>
              <div className={loadingStep >= 2 ? "text-cyan-300 font-medium" : ""}>
                2. Claim Extraction
              </div>
              <div className={loadingStep >= 3 ? "text-cyan-300 font-medium" : ""}>
                3. SEBI Registry Check
              </div>
              <div className={loadingStep >= 4 ? "text-cyan-300 font-medium" : ""}>
                4. Socratic Generation
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Result Output */}
      {analysisResult && (
        <div className="space-y-6 animate-fadeIn">
          {/* Risk Score & Overview Card */}
          {(() => {
            const colors = getRiskColor(analysisResult.riskLevel);
            return (
              <div
                className={`glass-panel rounded-2xl p-5 sm:p-6 border ${colors.border} ${colors.bg} relative overflow-hidden ${colors.glow}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-5 border-b border-slate-800/80">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${colors.badge}`}>
                        {analysisResult.riskLevel === "HIGH"
                          ? "High Observed Risk"
                          : analysisResult.riskLevel === "CAUTION"
                          ? "Caution Advised"
                          : "Low Observed Risk"}
                      </span>
                      {analysisResult.isSimulated && (
                        <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                          Heuristic Fallback Engine
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Transparent Cognitive Risk Assessment
                    </h3>
                    <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                      {analysisResult.riskExplanation}
                    </p>
                  </div>

                  {/* Score Meter */}
                  <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                        Observable Threat
                      </div>
                      <div className={`text-2xl font-display font-extrabold ${colors.text}`}>
                        {analysisResult.riskScore}
                        <span className="text-xs text-slate-500 font-normal">/100</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
                      <div
                        className={`absolute inset-0 rounded-full border-4 ${
                          analysisResult.riskLevel === "HIGH"
                            ? "border-rose-500"
                            : analysisResult.riskLevel === "CAUTION"
                            ? "border-amber-400"
                            : "border-emerald-400"
                        }`}
                        style={{
                          clipPath: `polygon(0 0, 100% 0, 100% ${analysisResult.riskScore}%, 0 ${analysisResult.riskScore}%)`,
                        }}
                      />
                      {analysisResult.riskLevel === "HIGH" ? (
                        <ShieldAlert className="w-5 h-5 text-rose-400" />
                      ) : (
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Extracted Claim Badges */}
                <div className="pt-4">
                  <h4 className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mb-2">
                    Extracted Behavioral & Financial Claims:
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {analysisResult.claims.promisedReturns && (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300">
                        Promised Return: <strong>{analysisResult.claims.promisedReturns}</strong>
                      </span>
                    )}
                    {analysisResult.claims.guaranteedClaim && (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300">
                        Prohibited Guaranteed Claim (SEBI PR 27/2025)
                      </span>
                    )}
                    {analysisResult.claims.timePressure && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
                        Urgency / FOMO: {analysisResult.claims.urgencyDetails || "Short deadline"}
                      </span>
                    )}
                    {analysisResult.claims.paymentRecipient && (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300">
                        Recipient: <strong>{analysisResult.claims.paymentRecipient}</strong> (Personal Account)
                      </span>
                    )}
                    {analysisResult.claims.claimedRegistrationNumber && (
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                        Claimed SEBI: {analysisResult.claims.claimedRegistrationNumber}
                      </span>
                    )}
                    {analysisResult.claims.withdrawalFeeDemanded && (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300">
                        Advance Withdrawal Fee / Tax Extortion
                      </span>
                    )}
                    {analysisResult.claims.suspiciousLinkOrApk && (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300">
                        Sideloading Link: {analysisResult.claims.suspiciousLinkOrApk}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Observable Warning Indicators Grid */}
          <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Observable Deception Indicators ({analysisResult.indicators.length})</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                Rule & VLM Threat Pattern Analysis
              </span>
            </div>

            {analysisResult.indicators.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysisResult.indicators.map((ind) => (
                  <div
                    key={ind.id}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200 text-xs">{ind.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        {ind.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {ind.description}
                    </p>
                    {ind.evidenceSnippet && (
                      <div className="p-2 rounded bg-slate-950/80 border border-slate-850 text-[11px] text-amber-200/90 font-mono">
                        "{ind.evidenceSnippet}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                No acute deception indicators identified. Communication appears consistent with standard investor education guidelines.
              </div>
            )}
          </div>

          {/* THE SIGNATURE INNOVATION: Socratic Dialogue Engine */}
          <SocraticDialogueBox
            originalContext={analysisResult.inputSummary}
            primaryQuestion={analysisResult.socratic.primaryQuestion}
            secondaryQuestion={analysisResult.socratic.secondaryQuestion}
            language={language}
          />

          {/* Evidence vs Unverified Facts & Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Safe Next Steps */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Recommended Safe Actions
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {analysisResult.socratic.safeNextSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Reporting Actions */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4" /> Official Indian Reporting Channels
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  <span>National Cyber Crime Helpline:</span>
                  <span className="font-mono font-bold text-sm">Dial 1930</span>
                </div>
                <a
                  href="https://cybercrime.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
                >
                  <span>Report on cybercrime.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                </a>
                <a
                  href="https://scores.sebi.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
                >
                  <span>SEBI SCORES 2.0 (Regulated Grievance)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Reset / Clear Analysis */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                setAnalysisResult(null);
                setInputText("");
                setSelectedImageBase64(null);
              }}
              className="text-xs text-slate-400 hover:text-white px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              Clear Current Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
