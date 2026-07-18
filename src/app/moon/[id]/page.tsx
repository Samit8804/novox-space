"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import MoonTexture from "@/components/MoonTexture";
import { moonsData, type MoonData } from "@/data/moons";
import { destinations } from "@/data/destinations";

export default function MoonDetailPage() {
  const params = useParams();
  const moon = moonsData.find((m) => m.id === params.id);

  if (!moon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-lg">Moon not found</p>
          <Link href="/moons" className="text-accent-cyan hover:underline mt-4 inline-block">
            Browse all moons
          </Link>
        </div>
      </div>
    );
  }

  const parent = destinations.find((d) => d.node_id === moon.parentPlanet);

  return (
    <div className="page-enter">
      <section className="relative min-h-screen flex items-center overflow-hidden pt-36 pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${parent?.bgImage || "/images/deep sea of space.png"})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-space-black/80 via-space-black/60 to-space-black" />

        <div className="relative z-10 section-container w-full">
          <div className="flex items-center gap-3 text-white/40 text-sm mb-8 font-mono">
            <Link href="/moons" className="hover:text-white transition-colors">Moon Explorer</Link>
            {parent && (
              <>
                <span>/</span>
                <Link href={`/planet/${parent.node_id}`} className="hover:text-white transition-colors">
                  {parent.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-white/70">{moon.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: parent?.color || "#C0C0C0" }} />
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-white">{moon.name}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-accent-purple/20 text-accent-purple">MOON</span>
              </div>

              {parent && (
                <Link
                  href={`/planet/${parent.node_id}`}
                  className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-accent-cyan transition-colors mb-6 font-mono"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Orbiting: {parent.name}
                </Link>
              )}

              <p className="text-white/50 max-w-2xl leading-relaxed mb-4 text-lg">{moon.description}</p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                <span className="text-accent-cyan text-xs font-mono tracking-wider">{moon.knownFor}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {[
                  { label: "Diameter", value: `${moon.diameter.toLocaleString()} km`, color: "text-accent-cyan" },
                  { label: "Gravity", value: `${moon.gravity} m/s²`, color: "text-accent-blue" },
                  { label: "Orbit Period", value: `${moon.orbitalPeriod} days`, color: "text-accent-purple" },
                  { label: "Distance", value: `${(moon.distanceFromPlanet / 1000).toLocaleString()} km`, color: "text-amber-400" },
                  { label: "Temperature", value: `${moon.temperature} K`, color: "text-rose-400" },
                  { label: "Discovered", value: moon.discovery.split(" by")[0], color: "text-emerald-400" },
                ].map((s) => (
                  <div key={s.label} className="glass rounded-2xl p-4 text-center">
                    <p className="text-white/30 text-[10px] font-mono mb-1">{s.label}</p>
                    <p className={`text-sm lg:text-base font-bold font-mono ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 320" style={{ opacity: 0.12 }}>
                  <ellipse cx="160" cy="160" rx="130" ry="124" fill="none" stroke={parent?.color || "#fff"} strokeWidth="0.5" strokeDasharray="4 5" />
                  <ellipse cx="160" cy="160" rx="130" ry="124" fill="none" stroke={parent?.color || "#fff"} strokeWidth="0.3" />
                </svg>
                <MoonTexture
                  moonId={moon.id}
                  moonName={moon.name}
                  imagePath={moon.image}
                  diameter={moon.diameter}
                  parentColor={parent?.color || "#fff"}
                  className="relative z-[2]"
                  size={320}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-24 -mt-8">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {moon.explorationMissions.length > 0 && (
                <GlassCard className="p-8">
                  <h3 className="text-accent-cyan text-xs font-mono tracking-[0.3em] uppercase mb-4">Exploration Missions</h3>
                  <div className="space-y-3">
                    {moon.explorationMissions.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-mono text-white/30 shrink-0">{i + 1}</span>
                        <span className="text-white/50">{m}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {moon.interestingFacts.length > 0 && (
                <GlassCard className="p-8">
                  <h3 className="text-accent-purple text-xs font-mono tracking-[0.3em] uppercase mb-4">Interesting Facts</h3>
                  <ul className="space-y-3">
                    {moon.interestingFacts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                        <span className="text-accent-cyan mt-0.5 shrink-0">✦</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              )}
            </div>

            <GlassCard className="p-8">
              <h3 className="text-amber-400 text-xs font-mono tracking-[0.3em] uppercase mb-3">Discovery</h3>
              <p className="text-white/60 text-sm font-mono">{moon.discovery}</p>
            </GlassCard>

            {moon.activities.length > 0 && (
              <GlassCard className="p-8">
                <h3 className="text-accent-cyan text-xs font-mono tracking-[0.3em] uppercase mb-4">Activities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {moon.activities.map((a) => (
                    <div key={a} className="glass-light rounded-xl px-4 py-3 text-sm text-white/60 text-center">{a}</div>
                  ))}
                </div>
              </GlassCard>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/moons" className="btn-secondary px-4 py-3 text-center text-xs">
                Moon Explorer
              </Link>
              {parent && (
                <Link href={`/planet/${parent.node_id}`} className="btn-secondary px-4 py-3 text-center text-xs">
                  Back to {parent.name}
                </Link>
              )}
              <button className="btn-primary px-4 py-3 text-xs">
                Explore in AR
              </button>
              <span className="btn-secondary px-4 py-3 text-center text-xs relative flex items-center justify-center opacity-60 cursor-not-allowed">
                3D View
                <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[8px] font-mono leading-none">
                  Soon
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
