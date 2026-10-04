import Link from "next/link";
import { ShieldCheck, ExternalLink, Github, Linkedin, Mail, AlertTriangle, Scale, Lock, HeartHandshake } from "lucide-react";
import { TEAM_MEMBERS, HACKATHON_METADATA } from "@/data/teamData";
import { OFFICIAL_REGULATORY_LINKS } from "@/data/sebiDatabase";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Hackathon Context */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="font-display font-bold text-base text-white tracking-tight">
                Vimarsh.AI
              </span>
              <span className="text-[10px] text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                विमर्श
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Interrupting Fraud with Intelligent Deliberation. An AI-powered cognitive fraud shield designed for Indian retail investors, neutralizing social engineering through Automated Socratic Questioning.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] space-y-1">
              <div className="font-semibold text-slate-200">
                {HACKATHON_METADATA.name}
              </div>
              <div className="text-slate-400">
                Organised by <span className="text-indigo-400 font-medium">{HACKATHON_METADATA.organizer}</span>
              </div>
              <div className="text-slate-400">
                In collaboration with <span className="text-cyan-400 font-medium">{HACKATHON_METADATA.collaborators}</span>
              </div>
              <div className="text-indigo-300 font-mono text-[10px]">
                {HACKATHON_METADATA.track}
              </div>
            </div>
          </div>

          {/* Column 2: Team Details */}
          <div className="space-y-4">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-indigo-400" />
              Team Members
            </h4>
            <div className="space-y-3">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.name} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-200 text-xs">{member.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {member.institute}
                    {member.degree && <span className="block text-slate-500">{member.degree}</span>}
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-cyan-400 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-slate-400 hover:text-indigo-400 transition-colors"
                      title="Email Contact"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Official Reporting & Redressal Links */}
          <div className="space-y-4">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              Official Indian Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={OFFICIAL_REGULATORY_LINKS.nationalCybercrime}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 hover:bg-slate-850 border border-slate-850 hover:border-slate-700 transition-colors text-slate-300"
                >
                  <span>National Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <div className="flex items-center justify-between p-2 rounded-lg bg-rose-950/20 border border-rose-900/30 text-rose-300">
                  <span>National Cyber Helpline</span>
                  <span className="font-mono font-bold text-rose-400 text-xs">Dial 1930</span>
                </div>
              </li>
              <li>
                <a
                  href={OFFICIAL_REGULATORY_LINKS.sebiScores}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 hover:bg-slate-850 border border-slate-850 hover:border-slate-700 transition-colors text-slate-300"
                >
                  <span>SEBI SCORES 2.0 (Grievance)</span>
                  <ExternalLink className="w-3 h-3 text-indigo-400" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_REGULATORY_LINKS.smartOdr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 hover:bg-slate-850 border border-slate-850 hover:border-slate-700 transition-colors text-slate-300"
                >
                  <span>SMART ODR Portal (Arbitration)</span>
                  <ExternalLink className="w-3 h-3 text-indigo-400" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_REGULATORY_LINKS.sebiIntermediariesList}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 hover:bg-slate-850 border border-slate-850 hover:border-slate-700 transition-colors text-slate-300"
                >
                  <span>SEBI Recognized Intermediaries</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust, Safety & Legal Guardrails */}
          <div className="space-y-4">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Safety & DPDP Policy
            </h4>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] space-y-2 text-slate-400">
              <p>
                <strong className="text-slate-200">Zero Retention Policy:</strong> In compliance with the Digital Personal Data Protection (DPDP) Act 2023, submitted texts and images are processed ephemerally in RAM and never stored in persistent databases.
              </p>
              <p>
                <strong className="text-slate-200">Guardrail Mandate:</strong> Vimarsh.AI strictly avoids providing stock tips, financial advisory, investment recommendations, or price predictions.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
              <span>
                <strong>Disclaimer:</strong> Vimarsh.AI is an academic prototype developed for the SANGYAN 2026 Hackathon. It is not an official SEBI, NSDL, or Government of India agency.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2">
            <span>© 2026 Vimarsh.AI. All rights reserved.</span>
            <span>•</span>
            <span>IIT Jodhpur Student Team</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/onboarding" className="hover:text-slate-200">Privacy & Settings</Link>
            <span>•</span>
            <Link href="/dashboard?tab=emergency" className="hover:text-rose-400">Cyber Helpline 1930</Link>
            <span>•</span>
            <Link href="/demo" className="text-cyan-400 hover:text-cyan-300 font-medium">Jury Evaluation Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
