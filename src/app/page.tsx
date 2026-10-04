import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  MessageSquareCode,
  SearchCheck,
  Layers,
  CheckCircle2,
  Lock,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  AlertTriangle,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import WhatsAppSimulator from "@/components/WhatsAppSimulator";
import { TEAM_MEMBERS, HACKATHON_METADATA } from "@/data/teamData";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Hackathon Banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-cyan-950/60 border-b border-indigo-500/20 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
            SANGYAN 2026
          </span>
          <span className="text-slate-300 hidden sm:inline">
            National Investor Resilience Hackathon • SNTC, IIT (BHU) Varanasi
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-indigo-300 font-medium">Track A: Digital Fraud & Scam Resilience</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-mesh-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                <span>Dual-Process Behavioral Threat Intelligence</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Pause. Question. Verify.{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">
                  Stay Safe.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                An intelligent fraud-resilience assistant that helps you understand suspicious financial messages, recognise psychological manipulation, and make safer investment decisions through{" "}
                <strong className="text-white font-semibold">Automated Socratic Questioning</strong>.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-300" />
                  <span>Analyse a Suspicious Message</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 hover:text-white transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Jury Interactive Demo</span>
                </Link>
              </div>

              {/* Stat Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs">
                <div>
                  <div className="font-display font-extrabold text-xl text-rose-400">72%</div>
                  <div className="text-slate-400 mt-0.5">Victims recover ₹0 post-facto (SPIR)</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-xl text-cyan-400">System 2</div>
                  <div className="text-slate-400 mt-0.5">Cognitive Metacognition</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-xl text-emerald-400">0 Install</div>
                  <div className="text-slate-400 mt-0.5">WhatsApp / Web Native</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual / Interactive Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl p-2 bg-gradient-to-tr from-indigo-500/30 via-slate-800 to-cyan-500/30 shadow-2xl border border-slate-700/60">
                <div className="rounded-[22px] overflow-hidden bg-slate-950 relative">
                  <Image
                    src="/hero-shield.jpg"
                    alt="Vimarsh AI Socratic Deliberation Node"
                    width={700}
                    height={450}
                    priority
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel border border-indigo-500/30">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Signature Innovation
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono">Cognitive Speedbump</span>
                    </div>
                    <p className="text-xs text-slate-200 mt-1.5 italic font-medium leading-relaxed">
                      "Why would a regulated fund manager ask you to send money to an individual's personal UPI ID within 10 minutes?"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Product Preview Section */}
      <section className="py-16 bg-slate-950 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              Live Architecture Demonstration
            </span>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">
              Beyond Binary "Scam / Safe" Warnings
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Traditional warning banners fail because scammers use psychological FOMO to lock victims in an impulsive state. Vimarsh.AI actively breaks the emotional trance.
            </p>
          </div>

          {/* Side by side comparison: WhatsApp simulator vs Analytical breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="text-center mb-3">
                <span className="text-xs font-medium text-slate-400">
                  Zero-Installation Interceptor (Tier-2/3 Accessible)
                </span>
              </div>
              <WhatsAppSimulator />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    How Socratic Deliberation Dissects The Scam
                  </span>
                  <span className="text-[10px] bg-indigo-500/10 text-cyan-300 px-2 py-0.5 rounded border border-indigo-500/20">
                    Dual-Process Intervention
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      1. Observable Manipulation Trigger Extracted
                    </div>
                    <p className="text-xs text-slate-300">
                      The message promised 10% daily returns (prohibited by SEBI) and imposed an artificial 10-minute timer to induce cognitive panic.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                      <SearchCheck className="w-3.5 h-3.5" />
                      2. Payment Coordinate Mismatch
                    </div>
                    <p className="text-xs text-slate-300">
                      Payment requested to personal VPA <code className="text-cyan-300 font-mono">amit.verma99@okhdfcbank</code>. Regulated brokers only collect through corporate escrow accounts.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1">
                    <div className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      3. Socratic Cognitive Speedbump Generated
                    </div>
                    <p className="text-xs text-slate-200 italic font-medium">
                      "If someone had an algorithm yielding 10% profit daily, why would they desperately recruit strangers in WhatsApp for ₹25,000?"
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href="/dashboard"
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                  >
                    <span>Try Analyzing Your Own Content</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/demo"
                    className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1"
                  >
                    <span>View All 3 Jury Test Scenarios</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              The 4-Step Cognitive Shield Architecture
            </span>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">
              From Impulsive Reaction to Informed Deliberation
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Grounding technology in cognitive psychology to disrupt social engineering at the exact moment of manipulation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Share Content",
                desc: "Paste suspicious WhatsApp or Telegram text, or upload screenshots of fake trading apps, manipulated P&Ls, or forged certificates.",
                icon: MessageSquareCode,
              },
              {
                step: "02",
                title: "Multimodal AI Inference",
                desc: "Gemini 3.8 Flash extracts dense text, tabular balances, and claims, cross-referencing against our SEBI Intermediary Registry database.",
                icon: BrainCircuit,
              },
              {
                step: "03",
                title: "Socratic Cognitive Speedbump",
                desc: "Instead of a passive binary label, Vimarsh asks a targeted, non-judgmental question that activates analytical System 2 thinking.",
                icon: Sparkles,
              },
              {
                step: "04",
                title: "Safe Action & Verification",
                desc: "Verify independently on official portals (sebi.gov.in) and access immediate emergency reporting tools (1930 / cybercrime.gov.in).",
                icon: ShieldCheck,
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.step}
                  className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      STEP {card.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-cyan-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-base text-white">{card.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Benefits Section */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              Core Innovations
            </span>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">
              Designed for Bharat's Modern Retail Investor
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Engineered for first-time market participants, Tier-2/3 investors, and elderly citizens navigating aggressive social engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">
                Multimodal Threat Analysis
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Capable of analyzing raw text, unformatted chats, and compressed screenshots from trading apps using state-of-the-art vision models.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <SearchCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">
                Registry Impersonation Check
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Detects when fraudsters copy genuine SEBI registration numbers while substituting their personal UPI accounts to siphon capital.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">
                DPDP 2023 Zero-Retention
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                User communications are processed ephemerally in RAM. No media or sensitive investor data is persistently stored.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Showcase Section */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              SANGYAN 2026 Hackathon Team
            </span>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">
              Developed at IIT Jodhpur
            </h2>
            <p className="text-sm text-slate-400">
              Passionate researchers and developers building public-good technology for investor resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-display font-bold text-lg text-white shadow-lg">
                    {member.avatarText}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">{member.name}</h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-500/20 text-cyan-300 border border-indigo-500/30">
                      {member.role}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-1 border-t border-slate-800 pt-3">
                  <p className="font-medium text-white">{member.institute}</p>
                  {member.degree && <p className="text-slate-400">{member.degree}</p>}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 text-xs transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-cyan-400 border border-slate-800 text-xs transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-indigo-400 border border-slate-800 text-xs transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">
            Trust & Transparency Notice
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Vimarsh.AI is an independent technology prototype created for the SANGYAN 2026 Investor Resilience Hackathon. It is not an official service of SEBI, NSDL, or the Ministry of Home Affairs. Vimarsh.AI strictly avoids providing investment recommendations or stock predictions. Always verify official intermediaries directly at{" "}
            <a
              href="https://www.sebi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              sebi.gov.in
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
