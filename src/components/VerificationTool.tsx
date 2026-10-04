"use client";

import { useState } from "react";
import { SearchCheck, AlertCircle, CheckCircle2, ShieldAlert, ExternalLink, Building2, UserX, AlertTriangle, ArrowRight } from "lucide-react";
import { VerificationCheckResult } from "@/types";
import { OFFICIAL_REGULATORY_LINKS } from "@/data/sebiDatabase";

export default function VerificationTool() {
  const [query, setQuery] = useState("");
  const [paymentVpa, setPaymentVpa] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationCheckResult | null>(null);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    try {
      const res = await fetch("/api/verify-sebi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), paymentVpa: paymentVpa.trim() || undefined }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sampleQueries = [
    { label: "Aura Wealth (INA000012345)", q: "INA000012345", vpa: "suresh.aura@paytm" },
    { label: "Bharat Equities (INH000008890)", q: "INH000008890", vpa: "bharatresearch@icici" },
    { label: "Zerodha Broking (INZ000031633)", q: "INZ000031633", vpa: "rahul.crypto@okhdfcbank" },
    { label: "Fake Unregistered Number", q: "INA999999999", vpa: "vip.profits@oksbi" },
  ];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-3">
            <SearchCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Regulatory Cross-Referencing Engine</span>
          </div>
          <h2 className="font-display text-xl font-bold text-white">
            SEBI Regulatory Identity & VPA Verification
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Cross-reference alleged registration numbers and recipient UPI IDs against our verified SEBI reference directory. Detect corporate identity cloning and unauthorized personal accounts.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Claimed SEBI Registration No. or Firm Name:
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. INA000012345 or Aura Wealth"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Recipient Payment UPI VPA (Optional, to detect mismatch):
              </label>
              <input
                type="text"
                value={paymentVpa}
                onChange={(e) => setPaymentVpa(e.target.value)}
                placeholder="e.g. suresh.aura@paytm or zerodha.holdings@hdfcbank"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Sample quick pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-500">Test Scenarios:</span>
            {sampleQueries.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setQuery(item.q);
                  setPaymentVpa(item.vpa);
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 shadow-md transition-all"
            >
              <span>Verify Against SEBI Registry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Result Card */}
      {result && (
        <div className="space-y-4 animate-fadeIn">
          <div
            className={`glass-panel rounded-2xl p-6 border ${
              result.found
                ? result.isPersonalVpaSuspicion
                  ? "border-amber-500/40 bg-amber-950/10"
                  : "border-emerald-500/30 bg-emerald-950/10"
                : "border-rose-500/30 bg-rose-950/10"
            }`}
          >
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    result.found
                      ? result.isPersonalVpaSuspicion
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/20 text-rose-400"
                  }`}
                >
                  {result.found ? (
                    result.isPersonalVpaSuspicion ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )
                  ) : (
                    <UserX className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base">
                    {result.found
                      ? result.isPersonalVpaSuspicion
                        ? "Registered Entity Found, but Critical Payment Warning Detected"
                        : "Verified Active SEBI Registration Found"
                      : "Unregistered Entity Claim - No Registry Match"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Query: <span className="font-mono text-cyan-300">"{result.query}"</span>
                  </p>
                </div>
              </div>

              <a
                href={result.officialSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <span>SEBI Public Intermediary Directory</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Matched Details */}
            {result.entity && (
              <div className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                    Registered Name
                  </span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {result.entity.entityName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                    Registration No. & Category
                  </span>
                  <span className="font-mono font-bold text-indigo-300 mt-0.5 block">
                    {result.entity.registrationNumber} ({result.entity.category})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                    Official Domain
                  </span>
                  <a
                    href={`https://${result.entity.officialDomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline mt-0.5 block"
                  >
                    {result.entity.officialDomain}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                    Authorized Corporate VPA
                  </span>
                  <span className="font-mono text-emerald-400 mt-0.5 block">
                    {result.entity.corporateVpaPattern}
                  </span>
                </div>
              </div>
            )}

            {/* Impersonation & Personal VPA Alert */}
            {result.isPersonalVpaSuspicion && (
              <div className="my-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>IDENTITY CLONING / MISMATCH WARNING</span>
                </div>
                <p className="leading-relaxed">
                  {result.vpaAlertMessage ||
                    "Payment is being directed to a personal or unrelated UPI ID. Scammers routinely quote genuine SEBI registration numbers to deceive victims, but route payments into personal accounts."}
                </p>
                {result.discrepancies.map((d, i) => (
                  <p key={i} className="text-amber-100 font-mono text-[11px] bg-slate-950/60 p-2 rounded">
                    • {d}
                  </p>
                ))}
              </div>
            )}

            {/* Guidance Box */}
            <div className="pt-4 space-y-2">
              <h4 className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Socratic Identity Guidance:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                {result.verificationGuidance}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
