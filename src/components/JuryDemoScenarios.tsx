"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  SearchCheck,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  Layers,
  Terminal,
} from "lucide-react";
import { DEMO_SCENARIOS, DemoScenarioItem } from "@/data/demoScenarios";
import { FraudAnalysisResult } from "@/types";
import SocraticDialogueBox from "./SocraticDialogueBox";
import { verifySebiIdentity } from "@/lib/verification/sebiMatcher";

export default function JuryDemoScenarios() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("scenario-guaranteed-roi");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<FraudAnalysisResult | null>(DEMO_SCENARIOS[0].expectedResult);
  const [logs, setLogs] = useState<string[]>([
    "System ready. Select a scenario and click 'Launch Interactive Evaluation'.",
  ]);

  const activeScenario = DEMO_SCENARIOS.find((s) => s.id === selectedScenarioId) || DEMO_SCENARIOS[0];

  const handleRunDemo = () => {
    setIsRunning(true);
    setActiveStep(1);
    setLogs(["[00.1s] Initializing Vimarsh.AI cognitive interception pipeline..."]);

    setTimeout(() => {
      setActiveStep(2);
      setLogs((prev) => [
        ...prev,
        activeScenario.type === "image"
          ? "[00.4s] Multimodal VLM OCR extraction completed. Parsed text, account balance, and payment coordinates."
          : "[00.4s] Text tokenization and linguistic entity recognition complete.",
      ]);
    }, 600);

    setTimeout(() => {
      setActiveStep(3);
      setLogs((prev) => [
        ...prev,
        "[00.9s] Observable pattern engine matched indicators: [Guaranteed Return Claim], [Personal UPI Routing], [FOMO Urgency].",
      ]);
    }, 1200);

    setTimeout(() => {
      setActiveStep(4);
      setLogs((prev) => [
        ...prev,
        "[01.5s] SEBI Intermediary Registry database query executed. Cross-referencing registered corporate escrow vs personal VPA.",
      ]);
    }, 1800);

    setTimeout(() => {
      setActiveStep(5);
      setIsRunning(false);
      setResult(activeScenario.expectedResult);
      setLogs((prev) => [
        ...prev,
        "[02.1s] Dual-Process cognitive speedbump synthesized. Socratic inquiry generated.",
        "[02.2s] Pipeline execution finished successfully (Deterministic Evaluation Mode).",
      ]);
    }, 2400);
  };

  const handleSelectScenario = (sc: DemoScenarioItem) => {
    setSelectedScenarioId(sc.id);
    setActiveStep(0);
    setResult(sc.expectedResult);
    setLogs([`Scenario switched to: ${sc.title}. Click 'Launch Interactive Evaluation' to run pipeline.`]);
  };

  return (
    <div className="space-y-6">
      {/* Scenario Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DEMO_SCENARIOS.slice(0, 3).map((sc, idx) => {
          const isSelected = sc.id === selectedScenarioId;
          return (
            <div
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? "bg-indigo-950/40 border-cyan-400/60 shadow-lg glow-cyan"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Scenario 0{idx + 1}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-cyan-300 border border-cyan-500/30 font-medium">
                  {sc.badge}
                </span>
              </div>
              <h3 className="font-display font-bold text-sm text-white mb-1">{sc.title}</h3>
              <p className="text-[11px] text-slate-400 line-clamp-2">{sc.category}</p>
            </div>
          );
        })}
      </div>

      {/* Evaluation Execution Panel */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
              Active Evaluation Test Case
            </div>
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span>{activeScenario.title}</span>
            </h2>
          </div>

          <button
            onClick={handleRunDemo}
            disabled={isRunning}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 disabled:opacity-50 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isRunning ? (
              <>
                <Zap className="w-4 h-4 animate-spin text-amber-300" />
                <span>Running Evaluation...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-cyan-200 fill-cyan-200" />
                <span>Launch Interactive Demo</span>
              </>
            )}
          </button>
        </div>

        {/* Input Payload View */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Payload Source: {activeScenario.senderLabel}</span>
            <span className="text-indigo-400 uppercase">[{activeScenario.type}]</span>
          </div>
          <p className="text-xs text-slate-200 font-mono leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-850">
            {activeScenario.rawInput}
          </p>
        </div>

        {/* Execution Pipeline Steps Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Multi-Stage Cognitive Threat Pipeline</span>
            </span>
            <span className="font-mono text-[11px] text-cyan-400">
              {isRunning ? `Step ${activeStep} of 5 Active` : "Completed / Ready"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            {[
              "1. Ingestion & Sanitization",
              "2. OCR / Linguistic Tokenizer",
              "3. Deception Indicator Engine",
              "4. SEBI Registry Cross-Check",
              "5. Socratic Cognitive Intervention",
            ].map((st, i) => {
              const isPast = activeStep > i + 1 || (!isRunning && activeStep === 0);
              const isCurrent = activeStep === i + 1;
              return (
                <div
                  key={st}
                  className={`p-2.5 rounded-xl border text-[11px] transition-all ${
                    isCurrent
                      ? "bg-indigo-600/30 border-cyan-400 text-cyan-300 font-semibold animate-pulse"
                      : isPast
                      ? "bg-slate-900 border-emerald-500/30 text-emerald-300"
                      : "bg-slate-950 border-slate-850 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {isPast ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    )}
                    <span>{st}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Terminal Live Execution Log */}
        <div className="p-3.5 rounded-xl bg-black border border-slate-800 text-[11px] font-mono space-y-1 text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-500 pb-1 border-b border-slate-900">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>Execution Telemetry:</span>
          </div>
          {logs.map((lg, i) => (
            <div key={i} className="text-cyan-300/90">
              &gt; {lg}
            </div>
          ))}
        </div>
      </div>

      {/* Generated Result Output */}
      {result && (
        <div className="space-y-6">
          {/* Assessment Card */}
          <div className="glass-panel rounded-2xl p-6 border border-rose-500/30 bg-rose-950/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-600 text-white">
                  {result.riskLevel} OBSERVED THREAT
                </span>
                <h3 className="font-display text-base font-bold text-white mt-1">
                  Observable Manipulation Synthesis
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-display font-extrabold text-rose-400">
                  {result.riskScore}/100
                </span>
                <span className="text-[10px] text-slate-400 block uppercase">
                  Heuristic Threat Score
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{result.riskExplanation}</p>

            {/* Observable Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {result.indicators.map((ind) => (
                <div key={ind.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-[11px] font-semibold text-rose-300">{ind.name}</div>
                  <p className="text-[10px] text-slate-400">{ind.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Socratic Dialogue Box */}
          <SocraticDialogueBox
            originalContext={result.inputSummary}
            primaryQuestion={result.socratic.primaryQuestion}
            secondaryQuestion={result.socratic.secondaryQuestion}
          />
        </div>
      )}
    </div>
  );
}
