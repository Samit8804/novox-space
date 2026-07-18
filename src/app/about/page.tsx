"use client";

import Link from "next/link";

const fleet = [
  { name: "NX-1 Aurora", type: "Orbital Cruiser", capacity: "24 guests", range: "Earth — Mars", bg: "/images/Space Dock  Mission Control Background.png", ship: "/images/spaceship/spacecraft.png" },
  { name: "NX-2 Stardust", type: "Deep Space Carrier", capacity: "12 guests", range: "Jupiter — Saturn", bg: "/images/Jupiter Orbit Background.png", ship: "/images/spaceship/spacecraft (2).png" },
  { name: "NX-3 Pioneer", type: "Exploration Vessel", capacity: "8 guests", range: "Kuiper Belt", bg: "/images/Saturn Rings Background.png", ship: "/images/spaceship/spacecraft (3).png" },
  { name: "NX-4 Horizon", type: "Lunar Shuttle", capacity: "40 guests", range: "Earth — Moon", bg: "/images/Moon Surface Background.png", ship: "/images/spaceship/spacecraft (4).png" },
];

const milestones = [
  { year: "2024", title: "Foundation", desc: "NovaX conceived by a team of astrophysicists and luxury hospitality visionaries." },
  { year: "2025", title: "Platform Alpha", desc: "First interactive solar system model deployed with real-time orbital mechanics." },
  { year: "2026", title: "AI Integration", desc: "Launch of the AI Trip Planner — neural itinerary optimization for deep space voyages." },
  { year: "2027", title: "Full-Scale Launch", desc: "Public booking opens for all 10 planetary destinations across the Solar System." },
  { year: "2028", title: "Lunar Operations", desc: "Artemis Regolith Villas fully operational; weekly Earth-Moon shuttles commence." },
  { year: "2030", title: "Beyond the Belt", desc: "Jupiter and Saturn expeditions become routine with the Amalthea and Cassini hubs." },
];

const stats = [
  { value: "10", label: "Destinations", suffix: "Planets" },
  { value: "17", label: "Moons", suffix: "Satellites" },
  { value: "99.9", label: "Safety Rate", suffix: "%" },
  { value: "500+", label: "Voyages", suffix: "Completed" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="section-full">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/images/deep sea of space.png)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-space-black/90 via-space-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-space-black/30" />
        <div className="relative z-10 section-container w-full pt-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass-light border border-accent-cyan/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-accent-cyan text-sm font-mono tracking-wider">EST. 2024</span>
            </div>
            <h1 className="text-hero text-white font-display leading-none mb-6">
              Engineering the
              <br />
              <span className="text-gradient">Future of Space</span>
            </h1>
            <p className="text-lg text-white/40 max-w-2xl mb-12 leading-relaxed">
              NovaX Space Tourism was founded to democratize access to off-world destinations.
              We bridge rigorous astrophysics with ultra-luxury hospitality, creating the definitive
              gateway for human civilization&apos;s expansion into the Solar System.
            </p>
            <Link href="/solar-system" className="btn-primary text-base px-10 py-5">
              <span>Explore Our Universe</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-accent-purple/5 to-transparent" />
        <div className="section-container relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase">Mission</span>
            <blockquote className="mt-8">
              <p className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight">
                &ldquo;To establish the definitive digital gateway for human civilization&rsquo;s expansion
                into the Solar System.&rdquo;
              </p>
              <footer className="mt-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-2xl font-bold mx-auto mb-4">N</div>
                <p className="text-white/60 text-lg font-medium">NovaX Core Team</p>
                <p className="text-white/30 text-sm font-mono mt-1">Est. 2024 &middot; Mission Statement</p>
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
      </section>

      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-darker/20 to-transparent" />
        <div className="section-container relative z-10">
          <div className="text-center mb-20">
            <span className="text-accent-purple text-sm font-mono tracking-[0.3em] uppercase">The Fleet</span>
            <h2 className="text-display-2 text-white font-display mt-4">
              Your Vessel <span className="text-gradient">Awaits</span>
            </h2>
            <p className="text-white/30 text-lg max-w-2xl mx-auto mt-4">
              Our interplanetary transport vessels set the standard for luxury space travel.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
            {fleet.map((ship) => (
              <div
                key={ship.name}
                className="group relative overflow-hidden rounded-3xl min-h-[480px] transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateY(-12px)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${ship.bg})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-space-black/40 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                  <img src={ship.ship} alt={ship.name} className="w-56 h-56 object-contain drop-shadow-2xl" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-space-black/90 via-space-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                  <span className="text-accent-cyan text-xs font-mono tracking-[0.15em] uppercase">{ship.type}</span>
                  <h3 className="text-3xl font-display font-bold text-white mt-2 mb-3">{ship.name}</h3>
                  <div className="flex items-center gap-4 text-white/40 text-sm">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {ship.range}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {ship.capacity}
                    </span>
                  </div>
                  <Link href="/packages" className="mt-5 inline-flex items-center gap-2 text-white/50 hover:text-accent-cyan text-sm transition-colors">
                    View packages &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-darker/10 to-transparent" />
        <div className="section-container relative z-10">
          <div className="text-center mb-20">
            <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase">Timeline</span>
            <h2 className="text-display-2 text-white font-display mt-4">
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-white/30 text-lg max-w-2xl mx-auto mt-4">
              From concept to the cosmos — the milestones that shaped NovaX.
            </p>
          </div>
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-purple opacity-20 -translate-x-1/2 hidden lg:block" />
            <div className="space-y-16">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={m.year} className="relative lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                    {isLeft ? (
                      <>
                        <div className="text-right pr-8 lg:pr-16">
                          <div className="inline-block">
                            <span className="text-accent-cyan text-sm font-mono tracking-wider bg-space-darker/50 px-4 py-1.5 rounded-full border border-accent-cyan/10">{m.year}</span>
                            <h3 className="text-3xl font-display font-bold text-white mt-3 mb-3">{m.title}</h3>
                            <p className="text-white/50 leading-relaxed max-w-md ml-auto">{m.desc}</p>
                          </div>
                        </div>
                        <div className="hidden lg:flex justify-center">
                          <div className="w-5 h-5 rounded-full bg-space-dark border-2 border-accent-blue flex items-center justify-center relative">
                            <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                            <div className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-blue/20 animate-ping" style={{ animationDuration: "3s" }} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="hidden lg:flex justify-center">
                          <div className="w-5 h-5 rounded-full bg-space-dark border-2 border-accent-purple flex items-center justify-center relative">
                            <div className="w-2 h-2 rounded-full bg-accent-purple" />
                            <div className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-purple/20 animate-ping" style={{ animationDuration: "3s" }} />
                          </div>
                        </div>
                        <div className="text-left pl-8 lg:pl-16">
                          <div className="inline-block">
                            <span className="text-accent-purple text-sm font-mono tracking-wider bg-space-darker/50 px-4 py-1.5 rounded-full border border-accent-purple/10">{m.year}</span>
                            <h3 className="text-3xl font-display font-bold text-white mt-3 mb-3">{m.title}</h3>
                            <p className="text-white/50 leading-relaxed max-w-md">{m.desc}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex lg:hidden justify-center mt-8">
              <div className="w-5 h-5 rounded-full bg-space-dark border-2 border-accent-cyan" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(167,139,250,0.04))" }} />
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent-blue text-sm font-mono tracking-[0.3em] uppercase">By the Numbers</span>
              <h2 className="text-display-2 text-white font-display mt-4 mb-12">
                Our <span className="text-gradient">Reach</span>
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <p className="text-4xl font-display font-bold text-gradient mb-1">
                      {stat.value}
                      <span className="text-white/20 text-2xl ml-1">{stat.suffix}</span>
                    </p>
                    <p className="text-white/30 text-sm font-mono">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative p-10 lg:p-14 rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(34,211,238,0.05))" }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-accent-blue/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">Join the Vanguard</h3>
                <p className="text-white/40 leading-relaxed mb-8">
                  Your journey begins with a single click. Configure your mission, secure your training,
                  and join the vanguard of interplanetary civilization.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/booking" className="btn-gold px-10 py-5">
                    Initialize Your Voyage
                  </Link>
                  <Link href="/contact" className="btn-secondary px-10 py-5">
                    Speak to Concierge
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
