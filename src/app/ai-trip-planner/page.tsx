"use client";

import { useState } from "react";

const promptSuggestions = [
  "Plan a 30-day family cruise to Europa",
  "I want to see Saturn's rings up close",
  "Luxury honeymoon on Mars",
  "Deep space expedition for 6 months",
];

export default function AITripPlannerPage() {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (prompt: string) => {
    const text = prompt || input;
    if (!text.trim()) return;

    setConversation((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1500));

    const responses: Record<string, string> = {
      "Plan a 30-day family cruise to Europa":
        "**Itinerary: Europa Family Cruise**\n\n**Duration:** 30 days\n**Accommodation:** Europa Ice Habitats (Ultra-Luxury)\n**Training Required:**\n- Physiological Adaptation (40h)\n- Systems Operations (60h)\n\n**Total Estimated Cost:** 2,400,000 credits\n**Deposit Required:** 480,000 credits\n\nRecommended add-on: Deep Radiation Shield Module.",
      "I want to see Saturn's rings up close":
        "**Itinerary: Saturn Rings Expedition**\n\n**Duration:** 14 days (orbital)\n**Accommodation:** Cassini Rings Resort\n**Route:** Earth → Saturn (3.2 yr transit via cryo)\n\n**Highlights:**\n- Ring-plane navigation\n- Titan hydrocarbon lake flyby\n- Enceladus cryovolcanic observation\n\n**Estimated Cost:** 4,200,000 credits",
      "Luxury honeymoon on Mars":
        "**Itinerary: Martian Honeymoon**\n\n**Duration:** 45 days\n**Accommodation:** Olympus Dome Estates (Premier Suite)\n**Activities:**\n- Olympus Mons summit view\n- Valles Marineris canyon tour\n- Low-gravity couple's spa\n\n**Estimated Cost:** 3,800,000 credits",
      "Deep space expedition for 6 months":
        "**Itinerary: Deep Space Expedition**\n\n**Route:** Earth → Jupiter → Saturn\n**Duration:** 180 days\n**Vessel:** NX-2 Stardust\n**Training:** Full certification track required\n\n**Estimated Cost:** 6,500,000 credits\n\nIncludes: All meals, medical staff, EVA suit rental.",
    };

    const response = responses[text] || `**Your Voyage Profile:**\n\nI've analyzed your request for "${text}". Based on current orbital mechanics and availability, I recommend scheduling a consultation with our concierge team for a personalized itinerary.\n\n**Suggested Destinations:**\n- Mars (180 days transit)\n- Lunar Orbital (3 days transit)\n\nWould you like me to refine this search?`;

    setConversation((prev) => [...prev, { role: "ai", text: response }]);
    setLoading(false);
  };

  return (
    <div className="page-enter min-h-screen relative flex flex-col">
      <div className="fixed inset-0 bg-cover bg-center opacity-[0.07]" style={{ backgroundImage: "url(/images/deep sea of space.png)" }} />
      <div className="fixed inset-0 bg-gradient-to-b from-space-black/80 via-space-darker/60 to-space-black" />
      <div className="relative z-10 flex flex-col flex-1 max-w-4xl mx-auto w-full px-6 lg:px-8 pt-16 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-display-2 font-display font-bold text-white mb-2">
            NovaX <span className="text-gradient">Navigator</span>
          </h1>
          <p className="text-white/30 text-sm">Your AI travel concierge. Describe your dream voyage.</p>
        </div>

        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
          <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3 mb-6">
            <svg className="w-5 h-5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(input)}
              placeholder="Describe your ideal space voyage..."
              className="flex-1 bg-transparent text-white outline-none placeholder:text-white/20 text-sm"
            />
            <button
              onClick={() => handleSubmit(input)}
              disabled={loading || !input.trim()}
              className="btn-primary px-5 py-1.5 rounded-full text-xs font-semibold disabled:opacity-50 transition-all shrink-0"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>

          {conversation.length === 0 && (
            <div className="grid grid-cols-2 gap-3 mb-8">
              {promptSuggestions.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSubmit(prompt)}
                  className="glass rounded-xl px-5 py-4 text-left text-xs text-white/40 hover:text-white/80 hover:border-accent-cyan/20 transition-all border border-transparent"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar" style={{ maxHeight: "55vh" }}>
            {conversation.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-xl px-5 py-4 ${
                  msg.role === "user"
                    ? "bg-accent-blue/10 border border-accent-blue/20"
                    : "glass border border-white/5"
                }`}>
                  {msg.role === "ai" ? (
                    <div className="text-white/70 text-xs leading-relaxed whitespace-pre-line">
                      {msg.text.split("\n").map((line, j) => (
                        <p key={j} className={line.startsWith("**") && line.endsWith("**") ? "text-white font-semibold mt-2 first:mt-0 text-sm" : ""}>
                          {line.replace(/\*\*/g, "")}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white text-sm">{msg.text}</p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass rounded-xl px-5 py-4 border border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-cyan animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <span className="w-2 h-2 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-6 right-6 w-20 opacity-10 pointer-events-none">
          <img src="/images/astranuat.png" alt="Navigator" className="w-full" />
        </div>
      </div>
    </div>
  );
}
