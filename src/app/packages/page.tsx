"use client";

import Link from "next/link";
import { packages } from "@/data/destinations";

const tierConfig = {
  CRUISE: { label: "Orbital Cruise", color: "text-accent-cyan", bg: "bg-accent-cyan/10", border: "border-accent-cyan/20", icon: "🛸" },
  DEEP_SPACE: { label: "Deep Space", color: "text-accent-purple", bg: "bg-accent-purple/10", border: "border-accent-purple/20", icon: "🚀" },
  SURFACE: { label: "Surface Expedition", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", icon: "🪐" },
};

export default function PackagesPage() {
  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url(/images/Saturn Rings Background.png)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-space-black/80 via-space-darker/40 to-space-dark" />
        <div className="relative z-10 text-center section-container pt-36">
          <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase mb-4 block">Premium Voyages</span>
          <h1 className="text-display-2 font-display font-bold text-white mb-4">Space Packages</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">Choose your adventure tier — from orbital cruises to full surface expeditions</p>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="section-container space-y-32">
          {packages.map((pkg, idx) => {
            const config = tierConfig[pkg.tier];
            const isLeft = idx % 2 === 0;
            return (
              <div key={pkg.id} className="relative">
                <div className="absolute -inset-8 rounded-3xl opacity-20" style={{ backgroundImage: `url(${pkg.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className={`relative flex flex-col ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}>
                  <div className="flex-1 w-full">
                    <div className="relative h-80 lg:h-[28rem] rounded-3xl overflow-hidden">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-space-dark/60 via-transparent to-transparent" />
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <span className={`inline-flex items-center gap-2 text-xs px-4 py-1.5 rounded-full font-mono border mb-4 ${config.color} ${config.bg} ${config.border}`}>
                      <span>{config.icon}</span>
                      <span>{config.label}</span>
                    </span>
                    <h2 className="text-4xl font-bold text-white mb-2 font-display">{pkg.name}</h2>
                    <p className="text-white/40 text-lg italic mb-4">&ldquo;{pkg.tagline}&rdquo;</p>
                    <p className="text-white/50 leading-relaxed mb-6">{pkg.description}</p>
                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="glass rounded-2xl px-5 py-3 text-center">
                        <span className="text-accent-cyan text-2xl font-bold font-display block">{pkg.duration_days}</span>
                        <span className="text-white/40 text-xs font-mono">Days</span>
                      </div>
                      <div className="glass rounded-2xl px-5 py-3 text-center">
                        <span className="text-accent-purple text-2xl font-bold font-display block">{pkg.destinations.length}</span>
                        <span className="text-white/40 text-xs font-mono">Destinations</span>
                      </div>
                      <div className="glass rounded-2xl px-5 py-3 text-center">
                        <span className="text-amber-400 text-2xl font-bold font-display block">{pkg.price_credits.toLocaleString()}</span>
                        <span className="text-white/40 text-xs font-mono">Credits</span>
                      </div>
                    </div>
                    <Link href={`/booking?package=${pkg.id}`} className="btn-primary inline-flex">
                      Select Package
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
