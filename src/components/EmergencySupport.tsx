"use client";

import { LifeBuoy, PhoneCall, ShieldAlert, AlertTriangle, ExternalLink, Clock, FileCheck, ArrowRight, Ban, CheckCircle } from "lucide-react";
import { OFFICIAL_REGULATORY_LINKS } from "@/data/sebiDatabase";

export default function EmergencySupport() {
  const steps = [
    {
      num: "01",
      title: "Immediate Communication Cutoff",
      icon: Ban,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
      description: "Stop all interaction immediately. Do not confront the fraudster, do not threaten police action, and above all, DO NOT send additional money to 'unfreeze' or 'release' previous funds.",
    },
    {
      num: "02",
      title: "Activate Bank Freeze (Golden Hour)",
      icon: Clock,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      description: "Call your bank's emergency cyber fraud number immediately to place a lien on the recipient mule account before the money traverses to Layer-2 and Layer-3 crypto/mule layers.",
    },
    {
      num: "03",
      title: "Dial National Cyber Helpline 1930",
      icon: PhoneCall,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
      description: "Contact 1930 (operated by the Indian Cyber Crime Coordination Centre - I4C). Provide the transaction UTR number, your bank account details, and the receiving UPI VPA.",
    },
    {
      num: "04",
      title: "File on National Cyber Crime Portal",
      icon: ShieldAlert,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
      description: "Submit a formal incident report on cybercrime.gov.in under 'Financial Fraud'. Preserve the generated complaint acknowledgement number for your bank's chargeback desk.",
    },
    {
      num: "05",
      title: "Preserve Uncut Digital Evidence",
      icon: FileCheck,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      description: "Export unedited WhatsApp/Telegram chat history, transaction receipts, bank debit SMS, and screenshots showing the recipient UPI handles and claimed SEBI certificates.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-rose-500/30 bg-rose-950/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
              <LifeBuoy className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Suspected Fraud Crisis Support</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              Stay Calm. Take Immediate Protective Action.
            </h2>
            <p className="text-xs text-rose-200/80 max-w-2xl leading-relaxed">
              If you have already sent money to an unverified individual or trading app, acting quickly within the initial hours significantly improves the likelihood of freezing the beneficiary account.
            </p>
          </div>

          {/* Quick Helpline Box */}
          <div className="flex-shrink-0 bg-slate-950/80 p-5 rounded-2xl border border-rose-500/40 text-center sm:text-right space-y-1 shadow-lg">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              National Cyber Helpline
            </span>
            <a
              href="tel:1930"
              className="font-mono text-3xl font-extrabold text-rose-400 hover:text-rose-300 transition-colors block"
            >
              1930
            </a>
            <span className="text-[11px] text-slate-400 block">Toll-free • Available 24x7</span>
          </div>
        </div>
      </div>

      {/* Action Steps */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          Critical 5-Step Action Protocol
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${st.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500">{st.num}</span>
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm">{st.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{st.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Portals Grid */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span>Official Dispute Redressal & Crime Portals</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <a
            href={OFFICIAL_REGULATORY_LINKS.nationalCybercrime}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 space-y-2 group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                cybercrime.gov.in
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Official Ministry of Home Affairs Citizen Financial Cyber Fraud Reporting System (CFCFRMS).
            </p>
          </a>

          <a
            href={OFFICIAL_REGULATORY_LINKS.sebiScores}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 space-y-2 group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                SEBI SCORES 2.0
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Formal investor complaints against SEBI-registered brokers, research analysts, and depositories.
            </p>
          </a>

          <a
            href={OFFICIAL_REGULATORY_LINKS.smartOdr}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 space-y-2 group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-purple-400 transition-colors">
                SMART ODR Portal
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Online Dispute Resolution platform for mediation and arbitration in the Indian securities market.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
