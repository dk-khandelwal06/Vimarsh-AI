"use client";

import { useState } from "react";
import { BookOpen, CheckCircle2, XCircle, Award, Sparkles, AlertTriangle, ArrowRight, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { AWARENESS_SCENARIOS } from "@/data/awarenessQuestions";
import { getStoredLabScore, saveLabCompletion } from "@/lib/store";

export default function AwarenessLab() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [selectedIndicators, setSelectedIndicators] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [labState, setLabState] = useState(getStoredLabScore());

  const currentScenario = AWARENESS_SCENARIOS[activeScenarioIdx];

  const toggleIndicator = (id: string) => {
    if (submitted) return;
    setSelectedIndicators((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);

    // Calculate score
    const totalOptions = currentScenario.indicatorsPresent.length;
    let correctPicks = 0;
    currentScenario.indicatorsPresent.forEach((opt) => {
      const picked = !!selectedIndicators[opt.id];
      if (picked === opt.isCorrect) {
        correctPicks++;
      }
    });

    const points = Math.round((correctPicks / totalOptions) * 100);
    saveLabCompletion(currentScenario.id, points);
    setLabState(getStoredLabScore());

    if (points >= 75) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleNext = () => {
    setSelectedIndicators({});
    setSubmitted(false);
    if (activeScenarioIdx < AWARENESS_SCENARIOS.length - 1) {
      setActiveScenarioIdx(activeScenarioIdx + 1);
    } else {
      setActiveScenarioIdx(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-2">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Cognitive Training</span>
          </div>
          <h2 className="font-display text-xl font-bold text-white">
            Fraud Awareness & Metacognition Lab
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Test your ability to spot deceptive manipulation patterns in realistic financial communications.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <Award className="w-5 h-5 text-amber-400" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">
              Completed Scenarios
            </div>
            <div className="text-sm font-bold text-white">
              {labState.completed.length} / {AWARENESS_SCENARIOS.length} Mastery
            </div>
          </div>
        </div>
      </div>

      {/* Main Scenario Workspace */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
        {/* Scenario Progress Selector */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400">
              Scenario {activeScenarioIdx + 1} of {AWARENESS_SCENARIOS.length}:
            </span>
            <span className="text-xs text-white font-semibold">
              {currentScenario.title}
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            {currentScenario.tag}
          </span>
        </div>

        {/* Sender & Message Presentation Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-850">
            <div>
              <span className="font-medium text-slate-300">Context:</span> {currentScenario.context}
            </div>
            <span className="text-[11px] text-amber-400/90 font-mono">
              From: {currentScenario.senderName}
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
            "{currentScenario.messageBody}"
          </div>
        </div>

        {/* Indicator Picking Checklist */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Which observable deception indicators do you identify in this message?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentScenario.indicatorsPresent.map((indicator) => {
              const isSelected = !!selectedIndicators[indicator.id];
              return (
                <div
                  key={indicator.id}
                  onClick={() => toggleIndicator(indicator.id)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    submitted
                      ? indicator.isCorrect
                        ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                        : isSelected
                        ? "bg-rose-950/30 border-rose-500/40 text-rose-200"
                        : "bg-slate-900/40 border-slate-800 text-slate-400"
                      : isSelected
                      ? "bg-indigo-600/20 border-indigo-500/50 text-white"
                      : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-0"
                    />
                    <div className="space-y-1">
                      <span className="font-medium block">{indicator.label}</span>
                      {submitted && (
                        <p className="text-[11px] text-slate-400 leading-normal pt-1 border-t border-slate-800/60 mt-1">
                          {indicator.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Post-submission Socratic & Legal Breakdown */}
        {submitted && (
          <div className="space-y-4 animate-fadeIn">
            {/* Socratic Lesson */}
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>The Socratic Cognitive Takeaway</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                "{currentScenario.socraticLesson}"
              </p>
            </div>

            {/* Legal / Regulatory Reference */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
              <span className="font-semibold text-slate-300 block">
                Statutory Regulatory Standard:
              </span>
              <p>{currentScenario.legalReference}</p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            {submitted ? "Review the explanations above" : "Select all applicable warning indicators"}
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.values(selectedIndicators).filter(Boolean).length === 0}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 transition-all shadow-md"
            >
              Submit Inspection
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 transition-all shadow-md"
            >
              <span>Next Scenario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
