import Link from "next/link";
import { Sparkles, Trophy, ShieldCheck, ArrowRight, BrainCircuit, ExternalLink } from "lucide-react";
import JuryDemoScenarios from "@/components/JuryDemoScenarios";

export default function DemoPage() {
  return (
    <div className="min-h-screen py-10 bg-mesh-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-cyan-950/40 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>SANGYAN 2026 Jury Evaluation Suite</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Vimarsh.AI Interactive Evaluation Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Experience the world's first investor-protection platform combining Multimodal Vision-Language Models with Dual-Process Cognitive Socratic Intervention.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/30 text-xs space-y-2">
              <div className="font-semibold text-white">Evaluation Scorecard Mapping:</div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div>• Investor Resilience (30%)</div>
                <div>• Bharat-First Usability (25%)</div>
                <div>• Guardrail Compliance (15%)</div>
                <div>• Technical Execution (15%)</div>
              </div>
              <Link
                href="/dashboard"
                className="mt-2 text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 text-[11px]"
              >
                <span>Switch to Full Dashboard</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Dual-Process Cognitive Theory Explainer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-5 border border-rose-500/30 bg-rose-950/10 space-y-2">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Traditional Scam Detectors (Why They Fail)
            </div>
            <h3 className="font-bold text-white text-sm">System 1 Impulsive Bias</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When victims see passive warnings ("Warning: Scam Link"), confirmation bias and greed/FOMO lead them to rationalize: <em>"This person made 5x profit; the warning is just a false positive."</em> Funds are lost before logic engages.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 bg-cyan-950/10 space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Vimarsh.AI Signature Mechanism
            </div>
            <h3 className="font-bold text-white text-sm">System 2 Socratic Deliberation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vimarsh asks a penetrative question: <em>"The SEBI registration belongs to a mutual fund in Mumbai, but they are asking for personal UPI payments. Why?"</em> This forces metacognition, breaking the emotional trance.
            </p>
          </div>
        </div>

        {/* Main Jury Demo Engine */}
        <JuryDemoScenarios />
      </div>
    </div>
  );
}
