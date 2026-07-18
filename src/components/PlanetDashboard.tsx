"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import type { Destination } from "@/types";
import type { PlanetContent } from "@/data/planetContent";

type DashboardProps = { dest: Destination; content: PlanetContent };

const ACCENT_MAP: Record<string, string> = {
  orange: "from-orange-400 to-amber-300",
  gold: "from-amber-300 to-yellow-200",
  blue: "from-blue-400 to-cyan-300",
  cyan: "from-cyan-400 to-teal-300",
  white: "from-white/70 to-white/30",
};

const TEXT_ACCENT: Record<string, string> = {
  orange: "text-orange-400",
  gold: "text-amber-300",
  blue: "text-blue-400",
  cyan: "text-cyan-400",
  white: "text-white/60",
};

const BORDER_ACCENT: Record<string, string> = {
  orange: "border-orange-500/30 hover:border-orange-400/60",
  gold: "border-amber-500/30 hover:border-amber-400/60",
  blue: "border-blue-500/30 hover:border-blue-400/60",
  cyan: "border-cyan-500/30 hover:border-cyan-400/60",
  white: "border-white/10 hover:border-white/30",
};

const BG_GLOW: Record<string, string> = {
  orange: "bg-orange-500/10",
  gold: "bg-amber-500/10",
  blue: "bg-blue-500/10",
  cyan: "bg-cyan-500/10",
  white: "bg-white/5",
};

const GLOW_COLOR: Record<string, string> = {
  orange: "rgba(251,146,60,0.15)",
  gold: "rgba(245,158,11,0.15)",
  blue: "rgba(59,130,246,0.15)",
  cyan: "rgba(34,211,238,0.15)",
  white: "rgba(255,255,255,0.08)",
};

function GlowIcon({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div className={`w-10 h-10 rounded-xl ${BG_GLOW[accent] || "bg-white/5"} flex items-center justify-center flex-shrink-0`}>
      <span className={`text-lg ${TEXT_ACCENT[accent] || "text-white/60"}`}>{children}</span>
    </div>
  );
}

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className={`h-px flex-1 bg-gradient-to-r ${ACCENT_MAP[accent] || "from-white/20 to-transparent"}`} />
      <span className={`text-xs font-mono tracking-[0.25em] uppercase ${TEXT_ACCENT[accent] || "text-white/40"}`}>{label}</span>
      <div className={`h-px flex-1 bg-gradient-to-l ${ACCENT_MAP[accent] || "from-white/20 to-transparent"}`} />
    </div>
  );
}

function MetricCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent: string }) {
  return (
    <div className={`group relative glass rounded-2xl p-5 border ${BORDER_ACCENT[accent] || "border-white/10 hover:border-white/30"} transition-all duration-500`}>
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${ACCENT_MAP[accent] || "from-white/5 to-transparent"}`} />
      <div className="relative z-10 flex items-start gap-4">
        <GlowIcon accent={accent}>{icon}</GlowIcon>
        <div>
          <p className="text-white/30 text-xs font-mono tracking-wider uppercase">{label}</p>
          <p className={`text-lg font-semibold text-white mt-1 ${TEXT_ACCENT[accent] || ""}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function PlanetDashboard({ dest, content }: DashboardProps) {
  const accent = content.themeAccent || "blue";
  const [inView, setInView] = useState<Record<string, boolean>>({});

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    Object.entries(sectionRefs.current).forEach(([key, el]) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setInView((p) => ({ ...p, [key]: true })); obs.disconnect(); } },
        { rootMargin: "100px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const metersToAU = (km: string) => {
    const num = parseFloat(km.replace(/[^0-9.]/g, ""));
    if (km.includes("billion")) return (num / 149.6).toFixed(1) + " AU";
    if (km.includes("million")) return (num / 149.6).toFixed(2) + " AU";
    return km;
  };

  const { scientificInfo } = content;
  const quickFacts = [
    { icon: "⬤", label: "Diameter", value: scientificInfo.diameter },
    { icon: "⊕", label: "Mass", value: scientificInfo.mass },
    { icon: "↓", label: "Gravity", value: `${dest.metrics.gravity_m_s2} m/s²` },
    { icon: "◴", label: "Day Length", value: scientificInfo.rotationPeriod },
    { icon: "○", label: "Year Length", value: scientificInfo.orbitalPeriod },
    { icon: "🌡", label: "Temperature", value: scientificInfo.surfaceTemperature },
    { icon: "◎", label: "From Sun", value: metersToAU(scientificInfo.distanceFromSun) },
  ];

  const difficultyStars = (level: number) => "★".repeat(level) + "☆".repeat(5 - level);
  const habitability = (temp: string) => {
    const num = parseFloat(temp.replace(/[^0-9.-]/g, ""));
    if (temp.includes("230") || temp.includes("224")) return "Extreme";
    if (num < -100) return "Very Low";
    if (num < 0) return "Low";
    if (num > 200) return "Very Low";
    if (num > 50) return "Low";
    return "Moderate";
  };

  const communicationDelay = (dist: string) => {
    const num = parseFloat(dist.replace(/[^0-9.]/g, ""));
    if (dist.includes("billion")) return `${Math.round(num / 149.6 * 8.3)} min`;
    if (dist.includes("million")) {
      const mins = num / 149.6 * 8.3;
      if (mins < 1) return `${Math.round(mins * 60)} sec`;
      return `${mins.toFixed(1)} min`;
    }
    return "1.3 sec";
  };

  const highlights: { icon: string; text: string }[] = (() => {
    const h = content.interestingFacts.slice(0, 4).map((f) => {
      const match = f.match(/^([^—]+?)(—|:)/);
      const short = f.length > 60 ? f.slice(0, 60) + "..." : f;
      return { icon: "✦", text: short };
    });
    return h;
  })();

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ────────────────────────────────────────────── */}
      {/* HERO */}
      {/* ────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${dest.bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-space-black/70 via-space-black/40 to-space-black/95" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${GLOW_COLOR[accent]}, transparent 70%)`,
          }}
        />

        <div className="relative z-10 section-container w-full pt-36 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-2 text-white/20 text-xs font-mono tracking-[0.2em] mb-6">
                <Link href="/destinations" className="hover:text-white/40 transition-colors">Destinations</Link>
                <span className="text-white/10">/</span>
                <span className={`${TEXT_ACCENT[accent]} font-semibold`}>{dest.name}</span>
              </div>

              <span className={`text-xs font-mono tracking-[0.3em] uppercase ${TEXT_ACCENT[accent]}`}>
                {dest.name === "Moon" ? "EARTH'S SATELLITE" : dest.name === "Pluto" ? "DWARF PLANET" : dest.type === "MOON" ? "NATURAL SATELLITE" : "PLANET"}
              </span>

              <h1 className={`text-7xl lg:text-8xl font-display font-bold text-white mt-4 leading-none ${TEXT_ACCENT[accent]}`}>
                {dest.name}
              </h1>

              <div className="flex items-center gap-4 mt-6 text-sm">
                <span className="flex items-center gap-2 text-white/40">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${ACCENT_MAP[accent]}`} />
                  ID: {dest.node_id.toUpperCase()}
                </span>
                <span className="text-white/10">|</span>
                <span className="text-white/30 font-mono">
                  {difficultyStars(dest.metrics.difficulty_level)}
                </span>
              </div>

              <p className="text-white/50 leading-relaxed mt-8 max-w-xl text-base lg:text-lg">
                {content.overview.split(".").slice(0, 2).join(".")}.
              </p>

              <div className="flex gap-4 mt-10">
                <Link
                  href={`/booking?destination=${dest.node_id}`}
                  className={`relative px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-500 bg-gradient-to-r ${ACCENT_MAP[accent]} text-space-black hover:scale-105 hover:shadow-2xl hover:shadow-${accent}-500/25`}
                >
                  Book Voyage
                </Link>
                <Link
                  href="/ai-mission-planner"
                  className="relative px-8 py-4 rounded-2xl font-semibold text-sm border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-500 backdrop-blur-sm"
                >
                  Mission Planner &rarr;
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-transparent">
                <div
                  className="absolute inset-0 rounded-full blur-[80px] animate-pulse"
                  style={{ background: GLOW_COLOR[accent] }}
                />
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-contain relative z-10 bg-transparent"
                  style={{
                    animation: "planetFloat 8s ease-in-out infinite, rotatePlanet 180s linear infinite",
                  }}
                  onError={(e) => console.error("Failed to load image:", dest.image)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* QUICK FACTS */}
      {/* ────────────────────────────────────────────── */}
      <section className="relative py-24" ref={(el) => { sectionRefs.current["facts"] = el; }}>
        <div className="section-container">
          <SectionHeader label="Quick Facts" accent={accent} />
          {inView["facts"] && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {quickFacts.map((f) => (
                <MetricCard key={f.label} icon={f.icon} label={f.label} value={f.value} accent={accent} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* ATMOSPHERE */}
      {/* ────────────────────────────────────────────── */}
      <section className="relative py-24" ref={(el) => { sectionRefs.current["atmosphere"] = el; }}>
        <div className="section-container">
          <SectionHeader label="Atmosphere" accent={accent} />
          {inView["atmosphere"] && (
            <div className="flex flex-wrap gap-4">
              {dest.metrics.atmospheric_composition.map((gas) => (
                <div
                  key={gas}
                  className={`group relative px-8 py-5 rounded-2xl border ${BORDER_ACCENT[accent]} transition-all duration-500 backdrop-blur-xl bg-white/[0.02]`}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${ACCENT_MAP[accent]}`}
                    style={{ opacity: 0.08 }}
                  />
                  <div className="relative z-10 flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full animate-pulse bg-gradient-to-r ${ACCENT_MAP[accent]}`} />
                    <span className="text-white font-mono text-sm tracking-wide">{gas}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* EXPLORATION STATUS */}
      {/* ────────────────────────────────────────────── */}
      <section className="relative py-24" ref={(el) => { sectionRefs.current["status"] = el; }}>
        <div className="section-container">
          <SectionHeader label="Exploration Status" accent={accent} />
          {inView["status"] && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "🎯", label: "Difficulty", value: difficultyStars(dest.metrics.difficulty_level) },
                { icon: "🌍", label: "Habitability", value: habitability(scientificInfo.surfaceTemperature) },
                { icon: "🚀", label: "Mission Type", value: dest.node_id === "pluto" ? "Flyby" : dest.node_id === "mercury" ? "Orbital" : dest.node_id === "venus" ? "Aerostat" : dest.node_id === "moon" ? "Surface" : dest.node_id === "mars" ? "Surface" : dest.node_id === "jupiter" ? "Orbital" : dest.node_id === "saturn" ? "Orbital" : dest.node_id === "uranus" ? "Orbital" : dest.node_id === "neptune" ? "Orbital" : "Orbital Research" },
                { icon: "📡", label: "Comm Delay", value: communicationDelay(scientificInfo.distanceFromSun) },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`group relative glass rounded-2xl p-6 border ${BORDER_ACCENT[accent]} transition-all duration-500`}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${ACCENT_MAP[accent]}`}
                    style={{ opacity: 0.05 }}
                  />
                  <div className="relative z-10">
                    <GlowIcon accent={accent}>{item.icon}</GlowIcon>
                    <p className="text-white/30 text-xs font-mono tracking-wider uppercase mt-4">{item.label}</p>
                    <p className={`text-xl font-semibold text-white mt-1 ${item.label === "Difficulty" ? TEXT_ACCENT[accent] : ""}`}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* PLANET HIGHLIGHTS */}
      {/* ────────────────────────────────────────────── */}
      {highlights.length > 0 && (
        <section className="relative py-24" ref={(el) => { sectionRefs.current["highlights"] = el; }}>
          <div className="section-container">
            <SectionHeader label="Planet Highlights" accent={accent} />
            {inView["highlights"] && (
              <div className="grid md:grid-cols-2 gap-4">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className={`group relative glass rounded-2xl p-6 border ${BORDER_ACCENT[accent]} transition-all duration-500`}
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${ACCENT_MAP[accent]}`}
                      style={{ opacity: 0.05 }}
                    />
                    <div className="relative z-10 flex items-start gap-4">
                      <span className="text-2xl flex-shrink-0">{h.icon}</span>
                      <p className="text-white/70 text-sm leading-relaxed group-hover:text-white transition-colors duration-500">
                        {h.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────── */}
      {/* MISSION RECOMMENDATION */}
      {/* ────────────────────────────────────────────── */}
      <section className="relative py-24" ref={(el) => { sectionRefs.current["mission"] = el; }}>
        <div className="section-container">
          <SectionHeader label="Mission Recommendation" accent={accent} />
          {inView["mission"] && (
            <div
              className={`relative overflow-hidden rounded-3xl p-10 lg:p-14 border ${BORDER_ACCENT[accent]} transition-all duration-500`}
              style={{
                background: `linear-gradient(135deg, ${GLOW_COLOR[accent]}, rgba(255,255,255,0.02))`,
                backdropFilter: "blur(24px)",
              }}
            >
              <div
                className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[120px]"
                style={{ background: GLOW_COLOR[accent] }}
              />
              <div className="relative z-10">
                <span className={`text-xs font-mono tracking-[0.25em] uppercase ${TEXT_ACCENT[accent]}`}>
                  Recommended Mission
                </span>
                <h3 className={`text-3xl lg:text-4xl font-display font-bold text-white mt-3 ${TEXT_ACCENT[accent]}`}>
                  {content.recommendedPackage || "Deep Space Expedition"}
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                  {[
                    { icon: "⏱", label: "Travel Time", value: `${dest.metrics.travel_duration_days} days` },
                    { icon: "🛸", label: "Spacecraft", value: dest.metrics.travel_duration_days > 1000 ? "NX-3 Pioneer" : dest.metrics.travel_duration_days > 200 ? "NX-2 Stardust" : "NX-4 Horizon" },
                    { icon: "🛡", label: "Shielding", value: dest.metrics.difficulty_level >= 4 ? "Required" : "Standard" },
                    { icon: "👥", label: "Crew Size", value: dest.metrics.difficulty_level >= 4 ? "6-8" : "12-24" },
                  ].map((m) => (
                    <div key={m.label} className="text-center lg:text-left">
                      <p className="text-white/30 text-xs font-mono tracking-wider uppercase">{m.label}</p>
                      <p className="text-white text-lg font-semibold mt-1">{m.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-10">
                  <Link
                    href={`/booking?destination=${dest.node_id}`}
                    className={`px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-500 bg-gradient-to-r ${ACCENT_MAP[accent]} text-space-black hover:scale-105`}
                  >
                    Book This Mission
                  </Link>
                  <Link
                    href="/training"
                    className="px-8 py-4 rounded-2xl font-semibold text-sm border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-500"
                  >
                    View Training
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* SCIENTIFIC FACTS */}
      {/* ────────────────────────────────────────────── */}
      <section className="relative py-24" ref={(el) => { sectionRefs.current["facts-section"] = el; }}>
        <div className="section-container">
          <SectionHeader label="Scientific Facts" accent={accent} />
          {inView["facts-section"] && (
            <div className="grid md:grid-cols-2 gap-4">
              {content.interestingFacts.map((fact, i) => (
                <div
                  key={i}
                  className={`group relative glass rounded-2xl p-6 border ${BORDER_ACCENT[accent]} transition-all duration-500`}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${ACCENT_MAP[accent]}`}
                    style={{ opacity: 0.05 }}
                  />
                  <div className="relative z-10 flex items-start gap-4">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-lg ${BG_GLOW[accent]} flex items-center justify-center text-xs font-mono font-bold ${TEXT_ACCENT[accent]}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-white/60 text-sm leading-relaxed group-hover:text-white transition-colors duration-500">
                      {fact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* MAJOR MOONS */}
      {/* ────────────────────────────────────────────── */}
      {dest.moons && dest.moons.length > 0 && (
        <section className="relative py-24" ref={(el) => { sectionRefs.current["moons"] = el; }}>
          <div className="section-container">
            <SectionHeader label="Major Moons" accent={accent} />
            {inView["moons"] && (
              <div className="flex flex-wrap gap-4">
                {dest.moons.map((moon) => (
                  <Link
                    key={moon}
                    href={`/moon/${moon.toLowerCase()}`}
                    className={`group relative glass rounded-2xl px-8 py-6 border ${BORDER_ACCENT[accent]} transition-all duration-500 min-w-[160px]`}
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${ACCENT_MAP[accent]}`}
                      style={{ opacity: 0.06 }}
                    />
                    <div className="relative z-10 text-center">
                      <span className="text-2xl">🌑</span>
                      <p className="text-white text-sm font-semibold mt-2 group-hover:text-white transition-colors">{moon}</p>
                      <p className="text-white/20 text-xs mt-1 font-mono">Click to explore</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────── */}
      {/* ABOUT / OVERVIEW */}
      {/* ────────────────────────────────────────────── */}
      <section className="relative py-24" ref={(el) => { sectionRefs.current["about"] = el; }}>
        <div className="section-container">
          <SectionHeader label="Planet Overview" accent={accent} />
          {inView["about"] && (
            <div className="max-w-4xl mx-auto">
              <p className="text-white/50 leading-relaxed text-lg">{content.overview}</p>
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div>
                  <h3 className={`text-sm font-mono tracking-[0.2em] uppercase ${TEXT_ACCENT[accent]} mb-4`}>Surface</h3>
                  <p className="text-white/40 leading-relaxed">{content.surface}</p>
                </div>
                <div>
                  <h3 className={`text-sm font-mono tracking-[0.2em] uppercase ${TEXT_ACCENT[accent]} mb-4`}>Climate</h3>
                  <p className="text-white/40 leading-relaxed">{content.climate}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* ACTIVITIES */}
      {/* ────────────────────────────────────────────── */}
      <section className="relative py-24" ref={(el) => { sectionRefs.current["activities"] = el; }}>
        <div className="section-container">
          <SectionHeader label="Experiences" accent={accent} />
          {inView["activities"] && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.activities.map((act, i) => (
                <div
                  key={i}
                  className={`group relative glass rounded-2xl p-6 border ${BORDER_ACCENT[accent]} transition-all duration-500`}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${ACCENT_MAP[accent]}`}
                    style={{ opacity: 0.05 }}
                  />
                  <div className="relative z-10">
                    <span className={`text-xs font-mono ${TEXT_ACCENT[accent]}`}>ACT {String(i + 1).padStart(2, "0")}</span>
                    <p className="text-white/60 text-sm mt-3 leading-relaxed group-hover:text-white transition-colors duration-500">{act}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* CTA */}
      {/* ────────────────────────────────────────────── */}
      <section className="relative py-32">
        <div className="section-container text-center">
          <div className="max-w-2xl mx-auto">
            <span className={`text-xs font-mono tracking-[0.3em] uppercase ${TEXT_ACCENT[accent]}`}>{dest.name}</span>
            <h2 className={`text-5xl lg:text-6xl font-display font-bold mt-4 ${TEXT_ACCENT[accent]}`}>
              Ready to Explore?
            </h2>
            <p className="text-white/30 mt-6 max-w-md mx-auto leading-relaxed">
              Your journey to {dest.name} begins with a single step. Book your voyage today.
            </p>
            <div className="flex gap-4 justify-center mt-10">
              <Link
                href={`/booking?destination=${dest.node_id}`}
                className={`px-10 py-5 rounded-2xl font-semibold transition-all duration-500 bg-gradient-to-r ${ACCENT_MAP[accent]} text-space-black hover:scale-105`}
              >
                Book Voyage
              </Link>
              <Link
                href="/destinations"
                className="px-10 py-5 rounded-2xl font-semibold border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-500"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes planetFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes rotatePlanet {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
