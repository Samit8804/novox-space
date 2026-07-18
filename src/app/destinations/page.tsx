"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { destinations } from "@/data/destinations";

export default function DestinationsPage() {
  const [filter, setFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [featured, setFeatured] = useState(destinations[3]);

  const types = ["ALL", "PLANET", "MOON"];
  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "name-asc", label: "Name A-Z" },
    { value: "name-desc", label: "Name Z-A" },
    { value: "duration", label: "Duration" },
    { value: "difficulty", label: "Difficulty" },
  ];

  const filtered = useMemo(() => {
    let result = destinations.filter((d) => {
      const matchesType = filter === "ALL" || d.type === filter;
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch && d.node_id !== featured.node_id;
    });
    switch (sortBy) {
      case "name-asc": result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "name-desc": result.sort((a, b) => b.name.localeCompare(a.name)); break;
      case "duration": result.sort((a, b) => a.metrics.travel_duration_days - b.metrics.travel_duration_days); break;
      case "difficulty": result.sort((a, b) => a.metrics.difficulty_level - b.metrics.difficulty_level); break;
    }
    return result;
  }, [filter, search, sortBy, featured]);

  const cardStyles = [
    { span: "lg:col-span-2 lg:row-span-1", treat: "landscape" },
    { span: "lg:col-span-1 lg:row-span-2", treat: "portrait" },
    { span: "lg:col-span-1 lg:row-span-1", treat: "square" },
    { span: "lg:col-span-1 lg:row-span-1", treat: "square-alt" },
    { span: "lg:col-span-2 lg:row-span-1", treat: "landscape-alt" },
    { span: "lg:col-span-1 lg:row-span-1", treat: "square" },
    { span: "lg:col-span-1 lg:row-span-2", treat: "portrait-alt" },
    { span: "lg:col-span-1 lg:row-span-1", treat: "square" },
    { span: "lg:col-span-2 lg:row-span-1", treat: "landscape" },
  ];

  const getCardBorder = (treat: string, color: string) => {
    const borders: Record<string, string> = {
      landscape: `border-l-4`,
      portrait: `border-t-4`,
      "square": `border`,
      "square-alt": `border-2`,
      "landscape-alt": `border-b-4`,
      "portrait-alt": `border-r-4`,
    };
    return borders[treat] || "border";
  };

  const getCardBg = (treat: string, color: string) => {
    const bgs: Record<string, string> = {
      landscape: `bg-gradient-to-br from-[${color}10] to-transparent`,
      portrait: `bg-[${color}08]`,
      "square": "bg-space-darker/40",
      "square-alt": "bg-space-dark/40",
      "landscape-alt": `bg-gradient-to-r from-[${color}08] to-transparent`,
      "portrait-alt": `bg-gradient-to-t from-[${color}10] to-transparent`,
    };
    return bgs[treat] || "bg-space-darker/30";
  };

  return (
    <div>
      <section className="relative pt-32 pb-24 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url(/images/deep sea of space.png)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-space-black via-space-black/80 to-space-darker" />
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass-light border border-accent-cyan/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-accent-cyan text-sm font-mono tracking-wider">SOLAR SYSTEM</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-4">
              <span className="text-gradient">Destinations</span>
            </h1>
            <p className="text-lg text-white/40 max-w-2xl leading-relaxed">
              Every world in the Solar System, curated for your next voyage. From the scorching plains of Mercury to the frozen reaches of Pluto.
            </p>
          </div>
        </div>
      </section>

      <section className="relative -mt-16 z-20 pb-8">
        <div className="section-container">
          <Link
            href={`/${featured.type === "MOON" ? "moon" : "planet"}/${featured.node_id}`}
            className="group relative block rounded-3xl overflow-hidden min-h-[420px] lg:min-h-[500px]"
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${featured.bgImage})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-space-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple" />
            <div className="relative z-10 p-8 lg:p-14 flex flex-col justify-end h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: featured.color }} />
                <span className="text-accent-cyan text-xs font-mono tracking-[0.2em] uppercase">{featured.type}</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-3">{featured.name}</h2>
              <p className="text-white/50 max-w-xl leading-relaxed mb-6 line-clamp-2">{featured.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/30 text-xs font-mono">TRANSIT</span>
                  <span className="text-white font-mono text-sm">{featured.metrics.travel_duration_days}d</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/30 text-xs font-mono">GRAVITY</span>
                  <span className="text-white font-mono text-sm">{featured.metrics.gravity_m_s2} m/s²</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/30 text-xs font-mono">SAFETY</span>
                  <span className="text-white font-mono text-sm">{featured.metrics.safety_rating}%</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/30 text-xs font-mono">DIFFICULTY</span>
                  <span className="text-stellar-gold font-mono text-sm">{"★".repeat(featured.metrics.difficulty_level)}{"☆".repeat(5 - featured.metrics.difficulty_level)}</span>
                </div>
              </div>
            </div>
            <div className="absolute top-6 right-6 glass rounded-2xl px-4 py-3">
              <p className="text-white/30 text-xs font-mono">FEATURED</p>
              <p className="text-white font-bold text-lg">{featured.name}</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="relative py-16 lg:py-20">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-4 mb-10">
            <div className="flex-1">
              <div className="glass rounded-2xl px-5 py-3.5 flex items-center gap-3">
                <svg className="w-5 h-5 text-white/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-white w-full outline-none placeholder:text-white/30 text-sm"
                  aria-label="Search destinations"
                />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="glass rounded-xl px-3 py-3.5 flex items-center gap-2">
                <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h6M3 12h12M3 17h18" />
                </svg>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-white/70 text-sm outline-none font-mono cursor-pointer"
                  aria-label="Sort destinations"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-space-dark text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-5 py-3.5 rounded-xl text-sm font-medium transition-all ${
                    filter === t
                      ? "bg-accent-cyan text-space-black font-bold"
                      : "glass text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                  aria-pressed={filter === t}
                >
                  {t === "ALL" ? "All" : t === "PLANET" ? "Planets" : "Moons"}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/30 text-lg">No destinations found</p>
              <button onClick={() => { setSearch(""); setFilter("ALL"); }} className="mt-4 text-accent-cyan text-sm font-mono hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[280px]">
              {filtered.map((dest, i) => {
                const cs = cardStyles[i % cardStyles.length];
                return (
                  <Link
                    key={dest.node_id}
                    href={`/${dest.type === "MOON" ? "moon" : "planet"}/${dest.node_id}`}
                    className={`${cs.span} group relative rounded-3xl overflow-hidden ${getCardBorder(cs.treat, dest.color)}`}
                    style={{ borderColor: cs.treat === "border" || cs.treat === "border-2" ? "rgba(255,255,255,0.06)" : `${dest.color}40` }}
                  >
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${dest.color}08, transparent)` }} />
                    <div className="absolute inset-0 bg-cover bg-center opacity-20 transition-all duration-500 group-hover:opacity-40 group-hover:scale-110"
                      style={{ backgroundImage: `url(${dest.bgImage})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/30 to-transparent" />
                    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle, ${dest.color}, transparent 70%)` }} />
                    {cs.treat.includes("portrait") && (
                      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-accent-cyan to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}
                    {cs.treat.includes("landscape") && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}
                    <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dest.color }} />
                        <span className="text-white/30 text-xs font-mono tracking-wide uppercase">{dest.type}</span>
                      </div>
                      <h3 className={`font-display font-bold text-white group-hover:text-gradient transition-all ${
                        cs.treat === "portrait" || cs.treat === "portrait-alt" ? "text-2xl" : "text-xl"
                      }`}>{dest.name}</h3>
                      <p className="text-white/40 text-sm mt-1 line-clamp-2">{dest.description}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs font-mono text-white/30">
                        <span>{dest.metrics.travel_duration_days}d transit</span>
                        <span>&middot;</span>
                        <span>{dest.metrics.gravity_m_s2} m/s²</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="relative py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url(/images/deep sea of space.png)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/60 to-space-black" />
        <div className="section-container relative z-10 text-center">
          <h2 className="text-display-2 text-white font-display mb-6">
            Not Sure Where to <span className="text-gradient">Go</span>?
          </h2>
          <p className="text-white/30 text-lg max-w-2xl mx-auto mb-10">
            Let our AI Trip Planner design the perfect interplanetary itinerary based on your preferences, budget, and training level.
          </p>
          <Link href="/ai-mission-planner" className="btn-primary text-lg px-12 py-6">
            <span>Launch AI Navigator</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
