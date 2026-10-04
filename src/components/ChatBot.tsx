"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquareHeart, Send, Loader2, Copy, Check, RotateCcw, Sparkles, ShieldCheck } from "lucide-react";
import { ChatMessage } from "@/types";

interface ChatBotProps {
  language?: "en" | "hi" | "hinglish";
}

export default function ChatBot({ language = "en" }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "vimarsh",
      text:
        language === "hi"
          ? "नमस्ते! मैं 'विमर्श' हूँ—आपका डिजिटल वित्तीय सुरक्षा साथी। आप मुझसे किसी भी संदिग्ध व्हाट्सऐप मैसेज, स्टॉक टिप्स, SEBI वेरिफिकेशन, या 1930 साइबर हेल्पलाइन के बारे में पूछ सकते हैं।\n\n(ध्यान दें: मैं कोई स्टॉक टिप्स या निवेश सलाह नहीं देता।)"
          : "Hello! I am Vimarsh, your investor protection and cognitive fraud shield assistant. Ask me anything about suspicious investment tips, verifying SEBI advisors, advance fee scams, or reporting to helpline 1930.\n\n*Strict safety mandate: I never provide stock tips, investment advice, or financial price predictions.*",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input.trim();
    if (!textToSend || loading) return;

    setInput("");
    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
          language,
        }),
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: "vimarsh-" + Date.now(),
        sender: "vimarsh",
        text: data.reply || "Always verify market claims independently on sebi.gov.in.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "vimarsh",
          text: "I am having trouble reaching the server right now. In the meantime, remember: Never transfer money to an individual UPI account, and call 1930 immediately if you suspect fraud.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const samplePrompts = [
    "Someone on WhatsApp is guaranteeing 10% daily return. Is it safe?",
    "How do I verify if an advisor is genuinely registered with SEBI?",
    "A platform wants a ₹15,000 tax release fee to withdraw my profit.",
    "What is Bharatiya Nyaya Sanhita Section 318 about financial fraud?",
    "How does the 1930 cyber fraud helpline and CFCFRMS freeze funds?",
  ];

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col h-[650px] overflow-hidden shadow-2xl relative">
      {/* Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white">
            <MessageSquareHeart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
              <span>Ask Vimarsh</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Cognitive Guide
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Responsible AI assistant for investor protection & scam inquiries
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: "welcome-" + Date.now(),
                sender: "vimarsh",
                text: "Conversation refreshed. How can I help protect your investments today?",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ])
          }
          className="text-xs text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1"
          title="Reset Conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed group relative ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none shadow-md"
                  : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  {msg.sender === "user" ? (
                    "You"
                  ) : (
                    <>
                      <ShieldCheck className="w-3 h-3 text-cyan-400" />
                      <span>Vimarsh Shield</span>
                    </>
                  )}
                </span>
                {msg.sender === "vimarsh" && (
                  <button
                    onClick={() => copyText(msg.id, msg.text)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white transition-opacity p-0.5"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
              <p className="whitespace-pre-line text-[12.5px] font-medium">{msg.text}</p>
              <div
                className={`text-[9px] mt-2 text-right ${
                  msg.sender === "user" ? "text-indigo-200" : "text-slate-500"
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2 text-xs text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Vimarsh is checking regulatory and safety references...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      <div className="p-2.5 bg-slate-950/70 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] whitespace-nowrap px-3 py-1 rounded-full bg-slate-900 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/40 text-slate-400 hover:text-slate-200 transition-all flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about financial scams, SEBI rules, or reporting..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white shadow-md transition-all flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
