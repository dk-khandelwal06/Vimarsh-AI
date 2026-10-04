"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { getStoredTheme, setStoredTheme } from "@/lib/store";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getStoredTheme();
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (t: "dark" | "light") => {
    if (t === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setStoredTheme(next);
    applyTheme(next);
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-slate-700/50 bg-slate-800/40" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
      className="p-2 rounded-xl border border-slate-700/50 dark:border-slate-700/60 bg-slate-800/40 dark:bg-slate-850/60 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all shadow-sm flex items-center justify-center"
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400 animate-pulse-slow" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600" />
      )}
    </button>
  );
}
