"use client";

import Link from "next/link";
import { moonsData, type MoonData } from "@/data/moons";
import { destinations } from "@/data/destinations";
import MoonTexture from "@/components/MoonTexture";

function OrbitRing({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
      <ellipse cx="100" cy="100" rx="82" ry="78" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="3 4" opacity="0.15" />
      <ellipse cx="100" cy="100" rx="82" ry="78" fill="none" stroke={color} strokeWidth="0.3" opacity="0.08" />
    </svg>
  );
}

function ParentPlanetBadge({ color, name }: { color: string; name: string }) {
  return (
    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/[0.06] z-10">
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
      <span className="text-[10px] text-white/50 font-mono">{name}</span>
    </div>
  );
}

function KnownForBadge({ label }: { label: string }) {
  return (
    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 z-10">
      <span className="text-[10px] text-accent-cyan font-mono tracking-wider">{label}</span>
    </div>
  );
}

function MoonCard({ moon, index }: { moon: MoonData; index: number }) {
  const parent = destinations.find((d) => d.node_id === moon.parentPlanet);
  const parentColor = parent?.color || "#fff";
  const parentName = parent?.name || moon.parentPlanet;
  const delay = `${index * 60}ms`;

  return (
    <Link
      href={`/moon/${moon.id}`}
      className="group relative glass rounded-3xl p-5 transition-all duration-500 hover:border-accent-cyan/25 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-cyan/5 overflow-hidden"
      style={{ animationDelay: delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      <ParentPlanetBadge color={parentColor} name={parentName} />

      <div className="relative pt-6 pb-2">
        <div className="relative flex justify-center">
          <OrbitRing color={parentColor} />
          <MoonTexture
            moonId={moon.id}
            moonName={moon.name}
            imagePath={moon.image}
            diameter={moon.diameter}
            parentColor={parentColor}
            className="relative z-[2]"
            size={160}
          />
        </div>
      </div>

      <KnownForBadge label={moon.knownFor} />

      <div className="mt-4 text-center">
        <h3 className="text-white font-display font-bold text-base group-hover:text-accent-cyan transition-colors">
          {moon.name}
        </h3>
        <p className="text-white/20 text-xs font-mono mt-0.5">
          {moon.diameter.toLocaleString()} km &middot; {moon.gravity} m/s² &middot; {moon.orbitalPeriod}d orbit
        </p>
        <p className="text-white/40 text-xs mt-2 line-clamp-2 leading-relaxed">
          {moon.description}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <span className="flex-1 text-center text-[11px] py-2 rounded-xl bg-white/5 text-white/40 font-mono group-hover:bg-accent-cyan/10 group-hover:text-accent-cyan transition-all cursor-pointer">
          Explore in AR
        </span>
        <span className="flex-1 text-center text-[11px] py-2 rounded-xl bg-white/[0.03] text-white/20 font-mono border border-white/[0.04] relative">
          3D View
          <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[8px] font-mono leading-none">
            Soon
          </span>
        </span>
      </div>
    </Link>
  );
}

const PLANET_ORDER = ["earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];

export default function MoonsPage() {
  const grouped = PLANET_ORDER
    .map((pid) => {
      const planetMoons = moonsData.filter((m) => m.parentPlanet === pid);
      const planet = destinations.find((d) => d.node_id === pid);
      return planetMoons.length > 0 ? { planet, moons: planetMoons } : null;
    })
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-space-black">
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-36 pb-16">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url(/images/deep sea of space.png)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-space-black/80 via-space-black/60 to-space-black" />
        <div className="relative z-10 text-center section-container">
          <span className="text-accent-cyan text-xs font-mono tracking-[0.3em] uppercase block mb-4">Natural Satellites</span>
          <h1 className="text-display-2 font-display font-bold text-white mb-4">
            Moon <span className="text-gradient">Explorer</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            {moonsData.length} unique moons across the solar system — each with its own distinct character and history.
          </p>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="section-container space-y-20">
          {grouped.map((g) => g && (
            <div key={g.planet?.node_id}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: g.planet?.color || "#fff" }} />
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-white">
                  Moons of <span style={{ color: g.planet?.color }}>{g.planet?.name}</span>
                </h2>
                <span className="text-white/20 text-sm font-mono">{g.moons.length} moons</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {g.moons.map((moon, idx) => (
                  <MoonCard key={moon.id} moon={moon} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
