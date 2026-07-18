"use client";

import { useState } from "react";

const tiers = [
  { name: "Standard Inquiry", response: "72 hours", desc: "General questions about packages and destinations", badge: "STD" },
  { name: "Priority Concierge", response: "24 hours", desc: "Dedicated agent for booking configuration", badge: "PRI" },
  { name: "Executive Teleport", response: "Instant", desc: "Direct line to the NovaX executive team", badge: "EXE" },
];

export default function ContactPage() {
  const [tier, setTier] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSent(true);
    }
  };

  const tierColors = ["text-accent-cyan", "text-accent-blue", "text-accent-purple"];
  const tierBg = ["bg-accent-cyan/10", "bg-accent-blue/10", "bg-accent-purple/10"];

  return (
    <div className="page-enter">
      <div className="min-h-screen relative">
        <div
          className="fixed inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url(/images/Space Dock  Mission Control Background.png)" }}
        />
        <div className="fixed inset-0 bg-gradient-to-b from-space-black/80 via-space-black/50 to-space-black" />
        <div className="relative z-10 section-container mx-auto px-6 lg:px-8 pt-32 pb-24">
          <div className="flex flex-col items-center mb-12">
            <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase mb-2">Get in Touch</span>
            <h1 className="text-display-2 font-display font-bold text-white">Contact</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 mb-12 max-w-5xl mx-auto">
            {tiers.map((t, i) => (
              <div
                key={t.name}
                onClick={() => setTier(i)}
                className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  tier === i ? `ring-2 ${tierColors[i].replace("text", "ring")}/50 scale-[1.02]` : "hover:scale-[1.01]"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${tierBg[i]} flex items-center justify-center mb-3`}>
                  <span className={`text-xs font-mono font-bold ${tierColors[i]}`}>{t.badge}</span>
                </div>
                <h3 className="text-white font-semibold mb-1">{t.name}</h3>
                <p className={`text-sm font-mono mb-2 ${tierColors[i]}`}>Response: {t.response}</p>
                <p className="text-white/40 text-sm">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3">
              {sent ? (
                <div className="glass rounded-3xl p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent-cyan/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent</h3>
                  <p className="text-white/40">A NovaX concierge will respond within the selected tier timeframe.</p>
                  <button
                    onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }}
                    className="btn-secondary text-sm px-6 py-3 mt-6"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <div className="glass rounded-3xl p-8">
                  <h3 className="text-white font-semibold text-lg mb-6">Send us a message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-5 mb-6">
                      <div>
                        <label className="block text-sm text-white/40 mb-2 font-mono">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-accent-cyan/50 transition-colors placeholder:text-white/20"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2 font-mono">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-accent-cyan/50 transition-colors placeholder:text-white/20"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2 font-mono">Message</label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={5}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-accent-cyan/50 transition-colors placeholder:text-white/20 resize-none"
                          placeholder="Tell us about your voyage vision..."
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!name || !email || !message}
                      className="btn-gold w-full py-4 rounded-full font-bold disabled:opacity-30 transition-all"
                    >
                      Send Inquiry
                    </button>
                  </form>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="glass rounded-3xl p-6">
                <h3 className="text-white font-semibold mb-4">Contact Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-white/30 text-xs font-mono uppercase tracking-wider">Operations Center</p>
                    <p className="text-white/60 text-sm">NovaX Spaceport, Kennedy Orbital Complex, FL</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-xs font-mono uppercase tracking-wider">Communications</p>
                    <p className="text-white/60 text-sm">comms@novax.space</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-xs font-mono uppercase tracking-wider">Response Time</p>
                    <p className="text-white/60 text-sm">Typically within {tiers[tier].response.toLowerCase()}</p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-3xl p-6">
                <h3 className="text-white font-semibold mb-3">Selected Tier</h3>
                <div className={`text-lg font-display font-bold ${tierColors[tier]}`}>{tiers[tier].name}</div>
                <p className="text-white/40 text-sm mt-1">Response: {tiers[tier].response}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
