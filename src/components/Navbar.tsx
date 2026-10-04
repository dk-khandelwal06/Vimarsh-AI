"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, ShieldAlert, Sparkles, Menu, X, BookOpen, SearchCheck, MessageSquareHeart, LifeBuoy } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Socratic Shield", href: "/dashboard", icon: ShieldCheck },
    { name: "Verify Identity", href: "/dashboard?tab=verify", icon: SearchCheck },
    { name: "Ask Vimarsh", href: "/dashboard?tab=chat", icon: MessageSquareHeart },
    { name: "Scam Lab", href: "/dashboard?tab=lab", icon: BookOpen },
    { name: "Emergency (1930)", href: "/dashboard?tab=emergency", icon: LifeBuoy },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg group-hover:shadow-indigo-500/30 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Vimarsh.AI
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  विमर्श
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                The Socratic Fraud Shield
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "text-cyan-400 bg-indigo-500/10 border border-cyan-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Tools & Demo Link */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSelector />
            <ThemeToggle />

            {/* Jury Demo CTA Button */}
            <Link
              href="/demo"
              className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-md shadow-indigo-600/30 hover:shadow-cyan-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span>Jury Demo</span>
              <span className="text-[9px] bg-slate-950/40 text-cyan-200 px-1.5 py-0.2 rounded-full border border-cyan-400/30">
                SANGYAN 2026
              </span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800/50 border border-slate-700/50"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <LanguageSelector />
            <Link
              href="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-white bg-indigo-600"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Jury Demo
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-900"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
