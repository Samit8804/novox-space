"use client";

import { useState } from "react";

const categories = ["General", "Travel", "Safety", "Booking"];
const categoryMap: Record<string, number[]> = {
  General: [0, 5],
  Travel: [1],
  Safety: [2],
  Booking: [3, 4, 5],
};

const faqs = [
  { q: "How long does a typical Mars voyage take?", a: "One-way transit to Mars takes approximately 180 days using our current propulsion systems. Total expedition packages range from 30 days (orbital) to a full Martian year (687 days)." },
  { q: "What training is required before departure?", a: "All passengers must complete three progressive modules: Physiological Adaptation (40h), Systems Operations (60h), and Emergency Evacuation Protocols (30h). Medical clearance is mandatory." },
  { q: "What safety measures are in place?", a: "Our fleet maintains a 97.8% safety rating. Each vessel is equipped with redundant life support, emergency escape pods, and continuous ground-based telemetry monitoring." },
  { q: "Can I bring family members?", a: "Absolutely. We offer family packages with tailored itineraries. Children aged 12+ are welcome on orbital cruises; surface expeditions have a minimum age of 18." },
  { q: "What payment methods are accepted?", a: "We accept major cryptocurrencies (BTC, ETH, USDC), wire transfers, and select fiat currencies via our escrow system. All transactions are secured by multi-factor authentication." },
  { q: "What is the cancellation policy?", a: "Deposits are 80% refundable up to 90 days before departure. Within 90 days, credits can be applied to future voyages. Premium insurance available." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("General");

  const filtered = faqs.filter(
    (faq, i) =>
      categoryMap[activeCat]?.includes(i) &&
      (faq.q.toLowerCase().includes(search.toLowerCase()) ||
        faq.a.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-enter">
      <div className="min-h-screen relative">
        <div
          className="fixed inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/images/deep sea of space.png)" }}
        />
        <div className="fixed inset-0 bg-gradient-to-b from-space-black/80 via-space-black/50 to-space-black" />
        <div className="relative z-10 section-container mx-auto px-6 lg:px-8 pt-32 pb-24">
          <div className="flex flex-col items-center mb-8">
            <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase mb-2">Knowledge Base</span>
            <h1 className="text-display-2 font-display font-bold text-white">FAQ</h1>
          </div>

          <div className="max-w-2xl mx-auto mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full glass rounded-2xl px-6 py-4 text-white outline-none placeholder:text-white/20 font-mono text-sm"
              aria-label="Search frequently asked questions"
            />
          </div>

          <div className="flex gap-2 justify-center mb-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCat(cat); setOpenIndex(null); }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCat === cat
                    ? "bg-accent-cyan text-[#050816]"
                    : "glass text-white/60 hover:text-white"
                }`}
                aria-pressed={activeCat === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {filtered.map((faq, i) => {
              const realIndex = faqs.indexOf(faq);
              return (
                <div key={realIndex} className={`glass rounded-3xl p-6 transition-all duration-300 ${openIndex === realIndex ? "ring-1 ring-accent-cyan/30" : ""}`}>
                  <button
                    onClick={() => setOpenIndex(openIndex === realIndex ? null : realIndex)}
                    className="w-full flex items-center justify-between text-left"
                    aria-expanded={openIndex === realIndex}
                    aria-controls={`faq-panel-${realIndex}`}
                  >
                    <span className="text-white font-medium pr-4 text-base">{faq.q}</span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openIndex === realIndex
                          ? "bg-accent-cyan/20 text-accent-cyan rotate-45"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${realIndex}`}
                    role="region"
                    aria-hidden={openIndex !== realIndex}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === realIndex ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-4 border-t border-white/5">
                      <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="glass rounded-3xl p-8 text-center">
                <p className="text-white/40">No matching questions found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
