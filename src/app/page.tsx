"use client";

import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import PlanetImage from "@/components/PlanetImage";
import PlanetShowcase from "@/components/PlanetShowcase";
import { destinations, packages } from "@/data/destinations";

const planets = destinations.filter((d) => d.type === "PLANET");

export default function HomePage() {
  return (
    <div>
      {/* ───── 1. HERO: FULL-SCREEN CINEMATIC ───── */}
      <section className="section-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/astranaut%20background%20main%20bg%20of%20website.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-space-black/90 via-space-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-space-black/30" />

        <div className="absolute bottom-[5%] right-[5%] w-[clamp(200px,35vw,500px)] animate-float pointer-events-none z-10">
          <img src="/images/astranuat.png" alt="" className="w-full drop-shadow-2xl" />
        </div>

        <div className="relative z-10 section-container w-full pt-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass-light border border-accent-cyan/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-accent-cyan text-sm font-mono tracking-wider">NEXT LAUNCH: Q3 2026</span>
            </div>

            <h1 className="text-hero text-white font-display leading-none mb-6">
              Beyond the
              <br />
              <span className="text-gradient">Blue Marble</span>
            </h1>

            <p className="text-lg text-white/40 max-w-2xl mb-12 leading-relaxed">
              The definitive gateway to multi-planetary voyage planning. Explore distant worlds,
              configure AI-driven itineraries, and secure your place among the stars.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/solar-system" className="btn-primary text-base px-10 py-5">
                <span>Explore the Solar System</span>
              </Link>
              <Link href="/ai-mission-planner" className="btn-secondary text-base px-10 py-5">
                AI Trip Planner &rarr;
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 mt-16">
              {planets.slice(0, 5).map((p) => (
                <Link
                  key={p.node_id}
                  href={`/planet/${p.node_id}`}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-light hover:bg-white/5 transition-all border border-white/5 hover:border-accent-blue/20"
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-white/40 group-hover:text-white text-sm font-medium transition-colors">{p.name}</span>
                </Link>
              ))}
              <Link href="/destinations" className="px-4 py-2.5 rounded-2xl text-white/30 hover:text-white text-sm transition-colors">
                +{planets.length - 5} more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 2. STATS BAR: HORIZONTAL METRIC ROW ───── */}
      <section className="relative py-24">
        <div className="section-container">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {[
              { value: "10", label: "Destinations", sub: "Planets" },
              { value: "17", label: "Moons", sub: "Satellites" },
              { value: "99.9", label: "Safety Rate", sub: "Certified" },
              { value: "500+", label: "Voyages", sub: "Completed" },
              { value: "8K", label: "Media Assets", sub: "Ultra-HD" },
            ].map((stat, i) => (
              <div key={stat.label} className={`text-center ${i > 0 ? "pl-8 lg:pl-16 border-l border-white/5" : ""}`}>
                <p className="text-5xl lg:text-6xl font-display font-bold text-gradient mb-1">
                  {stat.value}
                </p>
                <p className="text-white/40 text-sm">{stat.label}</p>
                <p className="text-white/20 text-xs font-mono">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 3. PLANET SHOWCASE: CINEMATIC ZOOM VIEWER ───── */}
      <PlanetShowcase />

      {/* ───── 4. LEFT-IMAGE / RIGHT-CONTENT: FEATURED PLANET DEEP-DIVE ───── */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-radial from-space-darker/40 via-transparent to-transparent" />
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-accent-blue/10 via-transparent to-transparent animate-pulse-glow rounded-full" />
              <img
                src="/images/mars.png"
                alt="Mars"
                className="w-full max-w-lg mx-auto animate-float-slow drop-shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 max-w-[200px]">
                <p className="text-white/30 text-xs font-mono">FEATURED</p>
                <p className="text-white font-bold text-lg">Mars</p>
                <p className="text-accent-cyan text-sm font-mono">180 days &middot; 3.71 m/s&sup2;</p>
              </div>
            </div>
            <div>
              <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase">Destination Deep-Dive</span>
              <h2 className="text-display-2 text-white font-display mt-4 mb-6">
                The Red Planet
                <br />
                <span className="text-gradient">Awaits</span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed mb-8">
                From the towering Olympus Mons to the vast Valles Marineris, Mars offers unparalleled
                adventure. Olympus Dome Estates provide pressurized luxury with panoramic views of
                rust-colored landscapes and Martian sunsets.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { val: "180d", lab: "Transit" },
                  { val: "3.71", lab: "Gravity m/s²" },
                  { val: "97.8%", lab: "Safety" },
                ].map((m) => (
                  <div key={m.lab} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-white font-bold text-xl font-mono">{m.val}</p>
                    <p className="text-white/30 text-xs mt-1">{m.lab}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Link href="/planet/mars" className="btn-primary">
                  <span>Explore Mars</span>
                </Link>
                <Link href="/booking?destination=mars" className="btn-secondary">
                  Book Voyage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 4. HORIZONTAL SCROLL: FLEET SHOWCASE ───── */}
      <section className="relative py-32 overflow-hidden">
        <div className="section-container mb-16">
          <span className="text-accent-purple text-sm font-mono tracking-[0.3em] uppercase">The Fleet</span>
          <h2 className="text-display-2 text-white font-display mt-4">Choose Your Vessel</h2>
        </div>
        <div className="flex overflow-x-auto gap-8 px-6 lg:px-8 pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {[
            { name: "NX-1 Aurora", type: "Orbital Cruiser", range: "Earth — Mars", cap: "24", bg: "/images/Space Dock  Mission Control Background.png", ship: "/images/spaceship/spacecraft.png" },
            { name: "NX-2 Stardust", type: "Deep Space Carrier", range: "Jupiter — Saturn", cap: "12", bg: "/images/Jupiter Orbit Background.png", ship: "/images/spaceship/spacecraft (2).png" },
            { name: "NX-3 Pioneer", type: "Exploration Vessel", range: "Kuiper Belt", cap: "8", bg: "/images/Saturn Rings Background.png", ship: "/images/spaceship/spacecraft (3).png" },
            { name: "NX-4 Horizon", type: "Lunar Shuttle", range: "Earth — Moon", cap: "40", bg: "/images/Moon Surface Background.png", ship: "/images/spaceship/spacecraft (4).png" },
          ].map((ship) => (
            <div
              key={ship.name}
              className="relative min-w-[400px] lg:min-w-[500px] h-[500px] rounded-3xl overflow-hidden flex-shrink-0 snap-center group"
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${ship.bg})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-space-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                <img src={ship.ship} alt={ship.name} className="w-64 h-64 object-contain drop-shadow-2xl" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-space-black/90 via-space-black/20 to-transparent" />
              <div className="relative z-10 p-10 flex flex-col justify-end h-full">
                <span className="text-accent-cyan text-xs font-mono tracking-[0.15em] uppercase">{ship.type}</span>
                <h3 className="text-4xl font-display font-bold text-white mt-2 mb-3">{ship.name}</h3>
                <div className="flex gap-6 text-white/50 text-sm">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {ship.range}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {ship.cap} guests
                  </span>
                </div>
                <Link href="/packages" className="mt-6 inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                  View packages &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── 5. SPLIT-SCREEN: AI PLANNER | TRAINING ───── */}
      <section className="relative py-32">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden min-h-[500px]">
            {/* Left half: AI Planner */}
            <div className="relative p-12 lg:p-16 flex flex-col justify-center min-h-[400px]"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(34,211,238,0.05))" }}>
              <div className="w-14 h-14 rounded-2xl bg-accent-blue/20 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-accent-cyan text-xs font-mono tracking-[0.2em] uppercase">AI-Powered</span>
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mt-3 mb-4">NovaX Navigator</h3>
              <p className="text-white/40 leading-relaxed max-w-md mb-8">
                Describe your dream voyage in plain English. Our AI synthesizes orbital mechanics,
                accommodation availability, and training requirements into an instant itinerary.
              </p>
              <Link href="/ai-mission-planner" className="btn-primary self-start">
                <span>Try the Navigator</span>
              </Link>
            </div>

            {/* Right half: Training */}
            <div className="relative p-12 lg:p-16 flex flex-col justify-center min-h-[400px]"
              style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(59,130,246,0.05))" }}>
              <div className="w-14 h-14 rounded-2xl bg-accent-purple/20 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-accent-purple text-xs font-mono tracking-[0.2em] uppercase">Certification</span>
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mt-3 mb-4">Astronaut Training</h3>
              <p className="text-white/40 leading-relaxed max-w-md mb-8">
                Three progressive modules: Physiological Adaptation, Systems Operations, and
                Emergency Evacuation. Full medical clearance and centrifuge certification included.
              </p>
              <Link href="/training" className="btn-secondary self-start">
                Begin Training &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 6. ASYMMETRIC BENTO GRID: DESTINATIONS + STATS ───── */}
      <section className="relative py-32">
        <div className="section-container">
          <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase block text-center">Explore</span>
          <h2 className="text-display-2 text-white font-display text-center mt-4 mb-16">
            Worlds Beyond
          </h2>

          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 auto-rows-[200px]">
            {[
              { id: "mercury", name: "Mercury", color: "#A0522D", span: "col-span-2 row-span-2" },
              { id: "venus", name: "Venus", color: "#E8A317", span: "col-span-1 row-span-1" },
              { id: "earth", name: "Earth", color: "#4B7BE5", span: "col-span-1 row-span-2" },
              { id: "moon", name: "Moon", color: "#C0C0C0", span: "col-span-1 row-span-1" },
              { id: "jupiter", name: "Jupiter", color: "#D4A574", span: "col-span-2 row-span-1" },
              { id: "saturn", name: "Saturn", color: "#E8D5A3", span: "col-span-2 row-span-1" },
              { id: "uranus", name: "Uranus", color: "#7EC8E3", span: "col-span-1 row-span-1" },
              { id: "neptune", name: "Neptune", color: "#3355FF", span: "col-span-1 row-span-1" },
              { id: "pluto", name: "Pluto", color: "#CD853F", span: "col-span-2 row-span-1" },
            ].map((p) => (
              <Link
                key={p.name}
                href={`/planet/${p.name.toLowerCase()}`}
                className={`${p.span} relative rounded-3xl overflow-hidden group`}
              >
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                  <PlanetImage planetId={p.id} size={p.span.includes("col-span-2") ? 300 : 200} showShadow={false} animate />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at center, ${p.color}40 0%, transparent 70%)` }} />
                <div className="relative z-10 p-5 flex flex-col justify-end h-full">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-white font-semibold text-sm">{p.name}</span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Stat overlay cells */}
            <div className="col-span-1 row-span-1 glass rounded-3xl p-5 flex flex-col justify-center items-center text-center">
              <p className="text-2xl font-display font-bold text-gradient">99.9%</p>
              <p className="text-white/30 text-xs mt-1">Safety</p>
            </div>
            <div className="col-span-1 row-span-1 glass rounded-3xl p-5 flex flex-col justify-center items-center text-center">
              <p className="text-2xl font-display font-bold text-gradient">17</p>
              <p className="text-white/30 text-xs mt-1">Moons</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/destinations" className="btn-secondary">
              View All Destinations &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ───── 7. TIMELINE: YOUR JOURNEY ───── */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-darker/20 to-transparent" />
        <div className="section-container relative z-10">
          <span className="text-stellar-gold text-sm font-mono tracking-[0.3em] uppercase block text-center">Process</span>
          <h2 className="text-display-2 text-white font-display text-center mt-4 mb-20">
            Your Journey to the Stars
          </h2>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/40 via-accent-purple/40 to-stellar-gold/40" />

            {[
              { num: "01", title: "Choose Your Destiny", desc: "Browse our interactive Solar System Explorer. Tap any planet or moon to discover its unique character, scientific metrics, and luxury accommodations.", color: "from-accent-blue to-accent-cyan" },
              { num: "02", title: "Configure Your Mission", desc: "Use the AI Navigator to plan your itinerary. Our intelligent system optimizes your route, duration, and experiences based on your preferences and physiology.", color: "from-accent-cyan to-accent-purple" },
              { num: "03", title: "Complete Training", desc: "Enroll in our three-module astronaut certification program. Medical clearance, centrifuge runs, zero-G simulation, and emergency protocols.", color: "from-accent-purple to-accent-blue" },
              { num: "04", title: "Launch & Explore", desc: "Board your vessel at the NovaX Orbital Terminal. Real-time mission tracking, biometric monitoring, and 24/7 concierge service throughout your voyage.", color: "from-accent-blue to-stellar-gold" },
            ].map((step, i) => (
              <div key={step.num} className="relative pl-20 pb-20 last:pb-0">
                <div className={`absolute left-5 w-7 h-7 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-xs font-bold text-white shadow-lg`}
                  style={{ transform: "translateX(-50%)" }}>
                  <span className="text-[10px]">{step.num}</span>
                </div>
                <div className="glass rounded-3xl p-8 hover:translate-x-2 transition-transform duration-500">
                  <span className="text-gradient text-sm font-mono">{step.num}</span>
                  <h3 className="text-2xl font-display font-bold text-white mt-2 mb-3">{step.title}</h3>
                  <p className="text-white/40 leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 8. TESTIMONIAL SHOWCASE: LARGE PULL QUOTE + GRID ───── */}
      <section className="relative py-32">
        <div className="section-container">
          <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase block text-center">Testimonials</span>
          <h2 className="text-display-2 text-white font-display text-center mt-4 mb-16">
            Voices from the <span className="text-gradient">Frontier</span>
          </h2>

          {/* Featured large testimonial */}
          <div className="relative mb-8 p-12 lg:p-16 rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(167,139,250,0.05))" }}>
            <div className="absolute top-0 right-0 text-[200px] font-display font-bold text-white/5 leading-none select-none pointer-events-none">
              &ldquo;
            </div>
            <div className="relative z-10 max-w-3xl">
              <p className="text-2xl lg:text-3xl text-white/80 font-display leading-relaxed italic">
                &ldquo;The Overview Effect is real. NovaX made what I thought was a decade-away dream
                into a tangible, bookable experience. The AI planner alone is worth the trip.&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-premium flex items-center justify-center text-white font-bold text-lg">AV</div>
                <div>
                  <p className="text-white font-semibold">Alistair Vance</p>
                  <p className="text-white/30 text-sm">Venture Capitalist &middot; Sovereign Explorer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Smaller testimonials grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { quote: "The scientific accuracy gives me confidence. The training pipeline is rigorous and safety metrics are transparent.", name: "Dr. Elena Rostova", title: "Tech Founder & Philanthropist", initials: "ER" },
              { quote: "Nothing compares to the Cassini Rings Resort. NovaX has set a new standard for premium travel.", name: "Marcus Chen", title: "Luxury Travel Curator", initials: "MC" },
            ].map((t) => (
              <div key={t.name} className="glass rounded-3xl p-8 flex flex-col justify-between">
                <p className="text-white/50 text-sm leading-relaxed italic mb-8">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-premium flex items-center justify-center text-white font-bold text-sm">{t.initials}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/30 text-xs">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 9. CTA: FULL-SCREEN CINEMATIC ───── */}
      <section className="relative py-40">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/images/deep sea of space.png)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/60 to-space-black" />
        <div className="relative z-10 section-container text-center">
          <span className="text-accent-purple text-sm font-mono tracking-[0.3em] uppercase">Begin</span>
          <h2 className="text-display-2 text-white font-display mt-4 mb-6">
            Ready to Leave <span className="text-gradient">Orbit</span>?
          </h2>
          <p className="text-white/30 text-lg max-w-2xl mx-auto mb-12">
            Your journey begins with a single click. Configure your mission, secure your training,
            and join the vanguard of interplanetary civilization.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="btn-gold text-lg px-12 py-6">
              Initialize Your Voyage
            </Link>
            <Link href="/contact" className="btn-secondary text-lg px-12 py-6">
              Speak to Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
