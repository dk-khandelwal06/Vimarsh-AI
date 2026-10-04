"use client";

import { useEffect, useState } from "react";
import { BarChart3, ShieldAlert, CheckCircle2, Trash2, ArrowUpRight, Clock, AlertTriangle } from "lucide-react";
import { FraudAnalysisResult } from "@/types";
import { getStoredAnalyses, clearSessionHistory } from "@/lib/store";
import { formatDate } from "@/lib/utils";

interface SessionAnalyticsProps {
  onSelectAnalysis?: (analysis: FraudAnalysisResult) => void;
}

export default function SessionAnalytics({ onSelectAnalysis }: SessionAnalyticsProps) {
  const [history, setHistory] = useState<FraudAnalysisResult[]>([]);

  useEffect(() => {
    setHistory(getStoredAnalyses());
  }, []);

  const handleClear = () => {
    clearSessionHistory();
    setHistory([]);
  };

  const highRiskCount = history.filter((h) => h.riskLevel === "HIGH").length;
  const cautionCount = history.filter((h) => h.riskLevel === "CAUTION").length;
  const lowRiskCount = history.filter((h) => h.riskLevel === "LOW").length;

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
            Session Analyses
          </div>
          <div className="text-3xl font-display font-bold text-white">
            {history.length}
          </div>
          <p className="text-[10px] text-slate-500">Live test runs in current browser session</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-rose-500/30 bg-rose-950/10 space-y-2">
          <div className="text-[11px] text-rose-300 uppercase tracking-wider font-medium flex items-center justify-between">
            <span>High Observed Risk</span>
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-3xl font-display font-bold text-rose-400">
            {highRiskCount}
          </div>
          <p className="text-[10px] text-rose-300/70">Severe deception indicators flagged</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 bg-amber-950/10 space-y-2">
          <div className="text-[11px] text-amber-300 uppercase tracking-wider font-medium flex items-center justify-between">
            <span>Caution Advised</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-3xl font-display font-bold text-amber-400">
            {cautionCount}
          </div>
          <p className="text-[10px] text-amber-300/70">Ambiguous claims requiring verification</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30 bg-emerald-950/10 space-y-2">
          <div className="text-[11px] text-emerald-300 uppercase tracking-wider font-medium flex items-center justify-between">
            <span>Low Risk / Clear</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-3xl font-display font-bold text-emerald-400">
            {lowRiskCount}
          </div>
          <p className="text-[10px] text-emerald-300/70">Educational or verified advisories</p>
        </div>
      </div>

      {/* Recent History Table */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="font-semibold text-white text-sm">
              Session Demonstration History ({history.length})
            </h3>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/30 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History (DPDP Act)</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No analyses recorded yet in this session. Analyze a message or test a demo scenario from the Socratic Shield.
          </div>
        ) : (
          <div className="divide-y divide-slate-850 overflow-hidden">
            {history.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-4 hover:bg-slate-900/40 px-2 rounded-xl transition-colors cursor-pointer"
                onClick={() => onSelectAnalysis && onSelectAnalysis(item)}
              >
                <div className="space-y-1 max-w-[70%]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.riskLevel === "HIGH"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : item.riskLevel === "CAUTION"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {item.riskLevel}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {formatDate(item.timestamp)}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      [{item.inputType}]
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 truncate font-medium">
                    {item.inputSummary}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-white">
                      {item.riskScore}/100
                    </div>
                    <div className="text-[10px] text-slate-400">Score</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
