"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import StarField from "@/components/StarField";

type Destination = {
  id: string; name: string; dist: string; distNum: number; time: string; color: string;
  gravity: string; temperature: string; atmosphere: string; terrain: string;
  risks: string[]; facts: string[]; image: string;
};

const DESTINATIONS: Destination[] = [
  { id: "moon", name: "The Moon", dist: "384,400 km", distNum: 384400, time: "3 days", color: "#C0C0C0",
    gravity: "0.16 g", temperature: "-173°C to 127°C", atmosphere: "None (exosphere)", terrain: "Regolith, craters, maria",
    risks: ["Low gravity causes muscle atrophy", "No atmosphere means zero pressure protection", "Extreme temperature swings", "Fine regolith dust contaminates equipment"],
    facts: ["Only 12 humans have ever walked on the Moon", "A day on the Moon lasts 27 Earth days", "The Moon is drifting 3.8 cm away from Earth each year"],
    image: "/images/Moon Surface Background.png" },
  { id: "mars", name: "Mars", dist: "78.3M km", distNum: 78300000, time: "7 months", color: "#E07040",
    gravity: "0.38 g", temperature: "-87°C to -5°C", atmosphere: "95% CO₂, 0.006 atm", terrain: "Volcanoes, canyons, polar ice caps",
    risks: ["Thin atmosphere offers little radiation protection", "Global dust storms can last months", "Low gravity causes bone density loss", "No liquid water on surface"],
    facts: ["Olympus Mons is 2.5x taller than Everest", "Valles Marineris is the largest canyon in the solar system", "Mars has seasons like Earth due to similar axial tilt"],
    image: "/images/Mars Surface Background.png" },
  { id: "venus", name: "Venus", dist: "41.4M km", distNum: 41400000, time: "5 months", color: "#E8A317",
    gravity: "0.91 g", temperature: "462°C (constant)", atmosphere: "96% CO₂, 90 atm", terrain: "Volcanic plains, mountains",
    risks: ["Surface temperature melts lead", "Atmospheric pressure crushes submarines", "Sulfuric acid rain", "Runaway greenhouse effect"],
    facts: ["Venus rotates backwards (sunrise in the west)", "A day on Venus is longer than its year", "Venus is the hottest planet despite not being closest to the Sun"],
    image: "/images/Inner Solar System Background (Mercury & Venus).png" },
  { id: "jupiter", name: "Jupiter", dist: "628M km", distNum: 628000000, time: "3 years", color: "#D4A574",
    gravity: "2.53 g", temperature: "-145°C to -108°C", atmosphere: "90% H₂, 10% He", terrain: "Gas giant — no solid surface",
    risks: ["Extreme radiation belts (1000x lethal)", "No solid surface to land on", "Immense gravity crushes spacecraft", "Powerful magnetic field disrupts electronics"],
    facts: ["The Great Red Spot is a storm larger than Earth", "Jupiter has 95 known moons", "Jupiter's magnetic field is 20,000x stronger than Earth's"],
    image: "/images/Jupiter Orbit Background.png" },
  { id: "saturn", name: "Saturn", dist: "1.28B km", distNum: 1280000000, time: "6 years", color: "#E8D5A3",
    gravity: "1.07 g", temperature: "-178°C to -139°C", atmosphere: "96% H₂, 3% He", terrain: "Gas giant — no solid surface",
    risks: ["Extreme cold below -170°C", "No solid surface for landing", "Ammonia clouds are toxic", "Ring debris poses collision risk"],
    facts: ["Saturn's rings span 282,000 km but are only 10m thick", "Saturn is the least dense planet — it would float in water", "Winds on Saturn reach 1,800 km/h"],
    image: "/images/Saturn Rings Background.png" },
];

function TelemetryBar({ label, value, unit, trend }: { label: string; value: string | number; unit?: string; trend?: "up" | "down" | "stable" }) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
      <p className="text-[9px] font-mono text-white/30 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-1.5 mt-1">
        <span className="text-sm font-bold font-display text-white tabular-nums">{value}</span>
        {unit && <span className="text-[10px] font-mono text-white/30">{unit}</span>}
        {trend && (
          <span className={`text-[10px] ${trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-white/30"}`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </span>
        )}
      </div>
    </div>
  );
}

function Gauge({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="text-center">
      <div className="relative w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-1">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: color }} />
      </div>
      <p className="text-[9px] font-mono text-white/30">{label}: {value}/{max}</p>
    </div>
  );
}

export default function MissionSimulator() {
  const [phase, setPhase] = useState<"prelaunch" | "countdown" | "launch" | "inflight" | "arrived">("prelaunch");
  const [count, setCount] = useState(10);
  const [altitude, setAltitude] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [oxygen, setOxygen] = useState(100);
  const [fuel, setFuel] = useState(100);
  const [distance, setDistance] = useState(0);
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTime = useRef(0);

  useEffect(() => {
    if (phase === "countdown" && count > 0) {
      const t = setTimeout(() => setCount((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
    if (phase === "countdown" && count === 0) {
      setPhase("launch");
      startTime.current = Date.now();
    }
  }, [phase, count]);

  useEffect(() => {
    if (phase !== "launch" && phase !== "inflight") return;
    if (phase === "launch") setPhase("inflight");
    if (phase === "inflight") return;
  }, [phase]);

  useEffect(() => {
    if (phase !== "inflight") return;
    const maxDist = destination.distNum;
    const steps = 120;
    const step = Math.max(1, Math.round(maxDist / steps));
    const interval = setInterval(() => {
      setAltitude((a) => Math.min(a + Math.random() * 200 + 50, 400000));
      setSpeed((s) => Math.min(s + Math.random() * 0.5, 28));
      setOxygen((o) => Math.max(o - Math.random() * 0.02, 80));
      setFuel((f) => Math.max(f - Math.random() * 0.03, 30));
      setDistance((d) => {
        const next = d + step;
        if (next >= maxDist) {
          clearInterval(interval);
          setPhase("arrived");
          return maxDist;
        }
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [phase, destination]);

  useEffect(() => {
    if (!canvasRef.current || phase !== "inflight") return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let stars: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < 200; i++) stars.push({ x: Math.random() * 400 - 200, y: Math.random() * 400 - 200, z: Math.random() * 400 });

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.z -= 5;
        if (s.z < 1) { s.x = Math.random() * 400 - 200; s.y = Math.random() * 400 - 200; s.z = 400; }
        const sx = (s.x / s.z) * 200 + 200;
        const sy = (s.y / s.z) * 200 + 200;
        const r = Math.max(0.5, 3 - s.z / 200);
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.2, 1 - s.z / 400)})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase]);

  const distPct = (() => {
    return destination.distNum > 0 ? Math.min(100, (distance / destination.distNum) * 100) : 0;
  })();

  return (
    <div className="min-h-screen bg-space-black relative overflow-hidden">
      <StarField />
      {phase === "countdown" && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-2xl">
          <div className="text-center">
            <p className="text-white/30 font-mono text-sm tracking-[0.3em] uppercase mb-6">Launch Countdown</p>
            <p className="text-9xl font-display font-bold text-white tabular-nums" style={{ textShadow: "0 0 80px rgba(34,211,238,0.3)" }}>{count}</p>
            <div className="flex gap-2 justify-center mt-8">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < 10 - count ? "bg-cyan-400" : "bg-white/10"}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 pt-28 pb-16">
        <div className="text-center section-container mb-8">
          <span className="text-cyan-400 text-xs font-mono tracking-[0.3em] uppercase block mb-3">Flight Control</span>
          <h1 className="text-display-2 font-display font-bold text-white mb-3 leading-none">
            <span className="text-gradient">Mission</span> Simulator
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Real-time spaceflight telemetry and mission control simulation</p>
        </div>

        <div className="section-container">
          {phase === "prelaunch" && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] p-5">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-3">Select Destination</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DESTINATIONS.map((d) => (
                    <button key={d.id} onClick={() => setDestination(d)}
                      className={`p-3 rounded-xl border text-left transition-all ${destination.id === d.id ? "border-cyan-400/40 bg-cyan-400/8" : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"}`}>
                      <p className="text-sm font-semibold text-white">{d.name}</p>
                      <p className="text-[10px] font-mono text-white/30">{d.dist} · {d.time}</p>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setPhase("countdown")}
                className="w-full py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                🚀 Begin Launch Sequence
              </button>
            </div>
          )}

          {(phase === "launch" || phase === "inflight") && (
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div className="rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400/70 tracking-wider uppercase">Flight Telemetry</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <TelemetryBar label="Altitude" value={altitude.toFixed(0)} unit="km" trend="up" />
                    <TelemetryBar label="Velocity" value={speed.toFixed(1)} unit="km/s" trend="up" />
                    <TelemetryBar label="O₂ Level" value={oxygen.toFixed(1)} unit="%" trend={oxygen > 90 ? "stable" : "down"} />
                    <TelemetryBar label="Fuel" value={fuel.toFixed(1)} unit="%" trend="down" />
                  </div>
                </div>

                <div className="rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-cyan-400/70 tracking-wider uppercase">Mission Progress</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-white/30 mb-1">
                        <span>Distance to {destination.name}</span><span>{Math.round(distPct)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500" style={{ width: `${distPct}%` }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <Gauge label="Oxygen" value={Math.round(oxygen)} max={100} color="#34D399" />
                      <Gauge label="Fuel" value={Math.round(fuel)} max={100} color="#FBBF24" />
                      <Gauge label="Velocity" value={Math.round(speed)} max={30} color="#60A5FA" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-purple-400/70 tracking-wider uppercase">System Status</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {[
                      ["Life Support", oxygen > 85 ? "Nominal" : "Caution", oxygen > 85 ? "text-emerald-400" : "text-amber-400"],
                      ["Propulsion", fuel > 50 ? "Online" : "Low", fuel > 50 ? "text-emerald-400" : "text-amber-400"],
                      ["Navigation", "Active", "text-emerald-400"],
                      ["Comms", distance < 100000 ? "Strong" : "Degraded", distance < 100000 ? "text-emerald-400" : "text-amber-400"],
                    ].map(([sys, status, clr]) => (
                      <div key={sys as string} className="flex items-center justify-between rounded-lg bg-white/[0.02] border border-white/[0.04] px-3 py-2">
                        <span className="text-white/40">{sys as string}</span>
                        <span className={`font-mono text-[10px] ${clr as string}`}>{status as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] p-4">
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-3">Starfield View</p>
                  <canvas ref={canvasRef} width={400} height={300} className="w-full rounded-xl bg-black/40" style={{ aspectRatio: "4/3" }} />
                </div>
                <div className="rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] p-4">
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-3">Mission Data</p>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between"><span className="text-white/30">Destination</span><span className="text-white/60">{destination.name}</span></div>
                    <div className="flex justify-between"><span className="text-white/30">Distance</span><span className="text-white/60">{destination.dist}</span></div>
                    <div className="flex justify-between"><span className="text-white/30">Type</span><span className="text-white/60">Simulation</span></div>
                    <div className="flex justify-between"><span className="text-white/30">Phase</span><span className="text-cyan-300 capitalize">{phase}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {phase === "arrived" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs font-mono mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  MISSION COMPLETE — DESTINATION REACHED
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Welcome to {destination.name}</h2>
                <p className="text-white/30 text-sm">Journey complete: {destination.dist} in {destination.time}</p>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-48">
                <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: destination.color, boxShadow: `0 0 12px ${destination.color}` }} />
                  <span className="text-white font-bold text-lg font-display">{destination.name}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Gravity", value: destination.gravity },
                  { label: "Temperature", value: destination.temperature },
                  { label: "Atmosphere", value: destination.atmosphere },
                  { label: "Terrain", value: destination.terrain },
                ].map((e) => (
                  <div key={e.label} className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                    <p className="text-[9px] font-mono text-white/30 uppercase">{e.label}</p>
                    <p className="text-xs font-semibold text-white/80 mt-1">{e.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl backdrop-blur-2xl bg-red-400/[0.03] border border-red-400/10 p-4">
                  <p className="text-[10px] font-mono text-red-400/70 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span>⚠</span> Risks & Challenges
                  </p>
                  <ul className="space-y-1.5">
                    {destination.risks.map((r, i) => (
                      <li key={i} className="text-[11px] text-red-300/60 flex items-start gap-2">
                        <span className="text-red-400/40 mt-0.5">•</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl backdrop-blur-2xl bg-blue-400/[0.03] border border-blue-400/10 p-4">
                  <p className="text-[10px] font-mono text-blue-400/70 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span>✦</span> Did You Know?
                  </p>
                  <ul className="space-y-1.5">
                    {destination.facts.map((f, i) => (
                      <li key={i} className="text-[11px] text-blue-300/60 flex items-start gap-2">
                        <span className="text-blue-400/40 mt-0.5">✦</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button onClick={() => { setPhase("prelaunch"); setDistance(0); setAltitude(0); setSpeed(0); setOxygen(100); setFuel(100); }}
                  className="px-6 py-3 rounded-xl text-sm font-semibold bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 hover:bg-cyan-400/20 transition-all">
                  🔄 Start New Mission
                </button>
                <Link href="/ai-mission-planner"
                  className="px-6 py-3 rounded-xl text-sm font-semibold bg-white/[0.05] text-white/60 hover:bg-white/[0.09] border border-white/[0.08] transition-all">
                  📋 Plan Detailed Mission
                </Link>
                <Link href={`/destinations?filter=${destination.id === "moon" ? "MOON" : destination.id === "mars" ? "PLANET" : destination.id}`}
                  className="px-6 py-3 rounded-xl text-sm font-semibold bg-white/[0.05] text-white/60 hover:bg-white/[0.09] border border-white/[0.08] transition-all">
                  🌍 Explore {destination.name}
                </Link>
              </div>
            </div>
          )}

          {phase === "prelaunch" && (
            <div className="text-center mt-8">
              <p className="text-white/20 text-xs font-mono">
                Use the Mission Planner to design a full mission first &rarr;{" "}
                <Link href="/ai-mission-planner" className="text-cyan-400/70 hover:text-cyan-300 underline">AI Mission Planner</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
