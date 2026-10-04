"use client";

import { useState } from "react";
import { MessageSquareHeart, Send, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { SocraticMessage } from "@/types";

interface SocraticDialogueBoxProps {
  originalContext: string;
  primaryQuestion: string;
  secondaryQuestion?: string;
  language?: "en" | "hi" | "hinglish";
}

export default function SocraticDialogueBox({
  originalContext,
  primaryQuestion,
  secondaryQuestion,
  language = "en",
}: SocraticDialogueBoxProps) {
  const [messages, setMessages] = useState<SocraticMessage[]>([
    {
      id: "initial-q",
      role: "assistant",
      text: primaryQuestion,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSocraticQuestion: true,
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || loading) return;

    const userText = userInput.trim();
    setUserInput("");
    setHasInteracted(true);

    const userMsg: SocraticMessage = {
      id: "user-" + Date.now(),
      role: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/socratic-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalContext,
          socraticQuestion: primaryQuestion,
          userReply: userText,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
          language,
        }),
      });

      const data = await res.json();
      const assistantMsg: SocraticMessage = {
        id: "asst-" + Date.now(),
        role: "assistant",
        text: data.reply || "Consider checking the official registration on sebi.gov.in before taking action.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "assistant",
          text: "Remember: Under SEBI regulations, no registered intermediary can guarantee returns or ask for funds to personal UPI accounts. Pausing to verify on sebi.gov.in is the safest step.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuickAnswers = [
    "I was excited about the high profit.",
    "The person claimed they are SEBI certified.",
    "They said only 2 slots are left so I should hurry.",
    "I see your point, personal UPI sounds suspicious."
  ];

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950/80 p-5 shadow-xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center">
            <MessageSquareHeart className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <span>Interactive Socratic Reflection</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h4>
            <p className="text-[11px] text-slate-400">
              Engage your deliberate System 2 reasoning by examining the evidence
            </p>
          </div>
        </div>
        {hasInteracted && (
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Metacognitive Shift Active
          </span>
        )}
      </div>

      {/* Conversation stream */}
      <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none shadow-md"
                  : msg.isSocraticQuestion
                  ? "bg-slate-900/90 border border-cyan-500/40 text-cyan-100 rounded-tl-none shadow-lg glow-cyan"
                  : "bg-slate-850 border border-slate-700/60 text-slate-200 rounded-tl-none shadow-sm"
              }`}
            >
              {msg.isSocraticQuestion && (
                <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1">
                  <span>Vimarsh Socratic Inquirer</span>
                </div>
              )}
              <p className="whitespace-pre-line text-[12.5px] font-medium">{msg.text}</p>
              <div
                className={`text-[9px] mt-1.5 text-right ${
                  msg.role === "user" ? "text-indigo-200" : "text-slate-400"
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-850 border border-slate-700/60 rounded-2xl rounded-tl-none p-3 flex items-center gap-2 text-xs text-slate-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>Vimarsh is deliberating with your response...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Suggestion Pills */}
      {!hasInteracted && (
        <div className="mb-3">
          <p className="text-[10px] text-slate-400 mb-1.5">Quick responses to try:</p>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuickAnswers.map((ans) => (
              <button
                key={ans}
                type="button"
                onClick={() => {
                  setUserInput(ans);
                }}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-indigo-900/40 text-slate-300 hover:text-white border border-slate-700/50 hover:border-indigo-500/40 transition-all text-left"
              >
                "{ans}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Response Input Form */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your response to the Socratic question..."
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/70 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          disabled={!userInput.trim() || loading}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
        >
          <span>Reflect</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
