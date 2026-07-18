"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { destinations } from "@/data/destinations";

const planets = destinations.filter((d) => d.type === "PLANET" && d.node_id !== "earth");

export default function PlanetShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scale, setScale] = useState(0.6);
  const [direction, setDirection] = useState<"in" | "out">("in");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const animRef = useRef<ReturnType<typeof requestAnimationFrame>>();

  const planet = planets[activeIndex];

  useEffect(() => {
    let startTime = performance.now();
    const duration = 4000;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      if (p < 0.4) {
        setDirection("in");
        setScale(0.6 + (p / 0.4) * 0.4);
      } else if (p < 0.8) {
        setDirection("out");
        setScale(1.0 - ((p - 0.4) / 0.4) * 0.15);
      } else {
        setScale(0.85);
      }

      if (p < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setActiveIndex((prev) => (prev + 1) % planets.length);
        setScale(0.6);
        setDirection("in");
        setProgress(0);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activeIndex]);

  const glowIntensity = direction === "in"
    ? 0.1 + (progress / 0.4) * 0.25
    : 0.35 - ((progress - 0.4) / 0.4) * 0.15;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-space-black">
      {/* Subtle star particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `star ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Background gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${planet.color}15 0%, transparent 60%)`,
        }}
      />

      {/* Orbital ring decoration */}
      <div
        className="absolute w-[60vw] h-[60vw] max-w-3xl max-h-3xl rounded-full border border-white/5 animate-spin-slow pointer-events-none"
        style={{ animationDuration: "120s" }}
      />
      <div
        className="absolute w-[40vw] h-[40vw] max-w-2xl max-h-2xl rounded-full border border-white/[0.03] animate-spin-slow pointer-events-none"
        style={{ animationDuration: "90s", animationDirection: "reverse" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          {/* Planet display */}
          <div className="relative flex items-center justify-center h-[50vh] lg:h-[70vh]">
            <div
              className="absolute rounded-full transition-all duration-700"
              style={{
                width: `${40 + glowIntensity * 40}%`,
                height: `${40 + glowIntensity * 40}%`,
                background: `radial-gradient(ellipse at center, ${planet.color}${Math.round(glowIntensity * 30).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
                filter: "blur(60px)",
                transform: `scale(${scale})`,
              }}
            />

            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-75 ease-linear"
              style={{
                transform: `scale(${scale})`,
              }}
            >
              <img
                src={planet.image}
                alt={planet.name}
                className="w-full h-full object-contain drop-shadow-2xl select-none pointer-events-none"
                style={{
                  filter: `drop-shadow(0 0 ${40 + glowIntensity * 80}px ${planet.color}${Math.round(glowIntensity * 40).toString(16).padStart(2, "0")})`,
                  animation: "planetShowcaseFloat 6s ease-in-out infinite",
                }}
              />
            </div>

            {/* Progress indicator ring */}
            <svg className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
              <circle
                cx="18" cy="18" r="16" fill="none"
                stroke={planet.color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={`${progress * 100} 100`}
                style={{ transition: "stroke-dasharray 0.1s linear" }}
              />
            </svg>
          </div>

          {/* Planet info */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light border border-white/5 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: planet.color }} />
              <span className="text-white/40 text-xs font-mono tracking-wider">DESTINATION</span>
            </div>

            <h2
              className="text-6xl lg:text-8xl font-display font-bold transition-colors duration-700"
              style={{ color: planet.color }}
            >
              {planet.name}
            </h2>

            <p className="text-white/30 mt-6 leading-relaxed max-w-md mx-auto lg:mx-0">
              {planet.description}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8">
              <div className="text-center">
                <p className="text-lg font-bold font-mono" style={{ color: planet.color }}>{planet.metrics.travel_duration_days.toLocaleString()}</p>
                <p className="text-white/20 text-xs font-mono">Days Transit</p>
              </div>
              <div className="w-px h-10 bg-white/10 self-center" />
              <div className="text-center">
                <p className="text-lg font-bold font-mono" style={{ color: planet.color }}>{planet.metrics.gravity_m_s2}</p>
                <p className="text-white/20 text-xs font-mono">m/s² Gravity</p>
              </div>
              <div className="w-px h-10 bg-white/10 self-center" />
              <div className="text-center">
                <p className="text-lg font-bold font-mono" style={{ color: planet.color }}>{planet.metrics.safety_rating}%</p>
                <p className="text-white/20 text-xs font-mono">Safety</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-10">
              <Link
                href={`/planet/${planet.node_id}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-500 hover:scale-105"
                style={{
                  background: `${planet.color}20`,
                  color: planet.color,
                  border: `1px solid ${planet.color}40`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${planet.color}30`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${planet.color}20`; }}
              >
                Explore {planet.name}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href={`/booking?destination=${planet.node_id}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm glass-light hover:bg-white/5 transition-all border border-white/5 hover:border-white/20"
              >
                Book Now
              </Link>
            </div>

            {/* Planet navigation dots */}
            <div className="flex justify-center lg:justify-start gap-3 mt-12">
              {planets.map((p, i) => (
                <button
                  key={p.node_id}
                  onClick={() => {
                    if (animRef.current) cancelAnimationFrame(animRef.current);
                    setActiveIndex(i);
                    setScale(0.6);
                    setDirection("in");
                    setProgress(0);
                  }}
                  className="group relative"
                  aria-label={p.name}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                      i === activeIndex ? "ring-2 ring-offset-2 ring-offset-space-black" : ""
                    }`}
                    style={{
                      backgroundColor: i === activeIndex ? p.color : "rgba(255,255,255,0.15)",
                      "--tw-ring-color": i === activeIndex ? p.color : "transparent",
                      transform: i === activeIndex ? "scale(1.3)" : "scale(1)",
                    } as React.CSSProperties}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes planetShowcaseFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  );
}
