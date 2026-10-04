"use client";

import { useState } from "react";
import { Send, CheckCheck, ShieldCheck, Sparkles, MessageCircle, AlertTriangle } from "lucide-react";

export default function WhatsAppSimulator() {
  const [lang, setLang] = useState<"en" | "hinglish">("hinglish");
  const [chatStep, setChatStep] = useState<number>(2); // 1: forwarded msg, 2: vimarsh socratic reply, 3: user reply, 4: vimarsh guidance
  const [userText, setUserText] = useState("");

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userText.trim()) return;
    setChatStep(4);
  };

  return (
    <div className="max-w-md mx-auto rounded-3xl border-4 border-slate-800 bg-[#0B141A] text-slate-150 shadow-2xl overflow-hidden font-sans">
      {/* Phone status bar simulation */}
      <div className="bg-[#1F2C34] px-4 py-2 flex items-center justify-between text-[11px] text-slate-300 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-[#111B21] rounded-full flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="font-semibold text-white flex items-center gap-1">
              <span>Vimarsh.AI Shield</span>
              <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-[10px] text-emerald-400">Verified Cognitive Interceptor</div>
          </div>
        </div>

        {/* Language switch */}
        <div className="flex bg-[#111B21] rounded-lg p-0.5 border border-slate-700 text-[10px]">
          <button
            onClick={() => setLang("en")}
            className={`px-2 py-0.5 rounded ${lang === "en" ? "bg-indigo-600 text-white" : "text-slate-400"}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("hinglish")}
            className={`px-2 py-0.5 rounded ${lang === "hinglish" ? "bg-indigo-600 text-white" : "text-slate-400"}`}
          >
            Hinglish
          </button>
        </div>
      </div>

      {/* WhatsApp chat canvas */}
      <div className="p-4 space-y-3 min-h-[380px] max-h-[420px] overflow-y-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] bg-[#0B141A]/95">
        {/* Timestamp */}
        <div className="text-center">
          <span className="text-[10px] bg-[#182229] text-slate-400 px-2.5 py-0.5 rounded-md">
            Today
          </span>
        </div>

        {/* User forwarded message */}
        <div className="flex justify-end">
          <div className="max-w-[85%] bg-[#005C4B] text-slate-100 rounded-xl rounded-tr-none p-3 text-xs shadow-md space-y-1">
            <div className="text-[10px] text-emerald-300 italic flex items-center gap-1 font-sans">
              <MessageCircle className="w-2.5 h-2.5" /> Forwarded
            </div>
            <p className="font-sans text-[11.5px] leading-relaxed">
              🚨 <em>"URGENT: Join VIP Wealth Club! Guaranteed 10% daily return. Transfer ₹25,000 immediately to personal UPI: amit.verma99@okhdfcbank to confirm spot!"</em>
            </p>
            <div className="text-[9px] text-emerald-200 text-right flex items-center justify-end gap-1">
              <span>04:15 PM</span>
              <CheckCheck className="w-3 h-3 text-cyan-300" />
            </div>
          </div>
        </div>

        {/* Vimarsh Socratic Intervention */}
        <div className="flex justify-start">
          <div className="max-w-[88%] bg-[#202C33] text-slate-100 rounded-xl rounded-tl-none p-3.5 text-xs shadow-md space-y-2 border border-cyan-500/20">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Vimarsh Socratic Shield
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                High Risk
              </span>
            </div>

            {lang === "hinglish" ? (
              <p className="font-sans text-[12px] text-slate-200 leading-relaxed">
                रुको और सोचो! 🛑<br />
                <span className="text-cyan-300 font-semibold">
                  "यह व्यक्ति आपको 10% रोज़ाना के नामुमकिन मुनाफे की गारंटी दे रहा है, और पैसे एक अनजान पर्सनल UPI (amit.verma99@okhdfcbank) पर तुरंत भेजने का दबाव क्यों बना रहा है?"
                </span>
                <br /><br />
                <span className="text-[11px] text-slate-400 block">
                  💡 अगर किसी के पास ऐसा सीक्रेट तरीका होता, तो क्या वो अनजान व्हाट्सऐप ग्रुप में ₹25,000 मांगता? SEBI के नियमों के मुताबिक कोई भी रजिस्टर्ड सलाहकार फिक्स्ड रिटर्न का वादा नहीं कर सकता।
                </span>
              </p>
            ) : (
              <p className="font-sans text-[12px] text-slate-200 leading-relaxed">
                Pause before you act! 🛑<br />
                <span className="text-cyan-300 font-semibold">
                  "Why is this sender promising an impossible 10% daily return while urgently demanding payment to an individual's personal UPI handle (amit.verma99@okhdfcbank)?"
                </span>
                <br /><br />
                <span className="text-[11px] text-slate-400 block">
                  💡 SEBI PR No. 27/2025 forbids guaranteed returns. Notice how the urgency is engineered to bypass your logical scrutiny.
                </span>
              </p>
            )}

            <div className="text-[9px] text-slate-400 text-right">04:15 PM</div>
          </div>
        </div>

        {/* Follow up dialogue step */}
        {chatStep >= 4 && (
          <>
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#005C4B] text-slate-100 rounded-xl rounded-tr-none p-2.5 text-xs">
                <p className="text-[11.5px]">{userText}</p>
                <div className="text-[9px] text-emerald-200 text-right">04:16 PM</div>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[88%] bg-[#202C33] text-slate-100 rounded-xl rounded-tl-none p-3 text-xs border border-emerald-500/30">
                <p className="text-[11.5px] leading-relaxed text-emerald-200">
                  {lang === "hinglish"
                    ? "शाबाश! आपने सही सवाल उठाया। उस ग्रुप को तुरंत म्यूट या रिपोर्ट करें। कभी भी पर्सनल बैंक या UPI में निवेश के पैसे न डालें। सहायता के लिए राष्ट्रीय हेल्पलाइन 1930 डायल करें।"
                    : "Great critical reflection! Block that group immediately. Regulated firms never take funds to personal UPI accounts. For cyber financial emergencies, dial 1930."}
                </p>
                <div className="text-[9px] text-slate-400 text-right">04:16 PM</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Input bar */}
      <div className="p-2.5 bg-[#1F2C34] flex items-center gap-2">
        <form onSubmit={handleSendReply} className="flex-1 flex gap-2">
          <input
            type="text"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder={lang === "hinglish" ? "जवाब लिखें (उदा. मुझे समझ आ गया)..." : "Reply to Vimarsh..."}
            className="flex-1 bg-[#2A3942] rounded-full px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center text-white"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
