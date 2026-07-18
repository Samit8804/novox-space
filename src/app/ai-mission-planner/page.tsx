"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import StarField from "@/components/StarField";
import {
  PLANETS, MISSION_TYPES, CREW_CONFIGS, SPACECRAFT, EQUIPMENT_LIST,
  TIMELINE_PHASES, STEPS, calculateMission, generateAIRecommendation,
  calculateReadiness, type PlanetData, type Spacecraft, type MissionType,
  type CrewConfig, type MissionCalculations, type AIRecommendation,
  type ReadinessScore,
} from "@/data/mission-planner-data";

const PLANET_COLORS: Record<string, string> = {
  mercury: "#A0522D", venus: "#E8A317", moon: "#C0C0C0", mars: "#E07040",
  jupiter: "#D4A574", saturn: "#E8D5A3", uranus: "#7EC8E3", neptune: "#3355FF", pluto: "#CD853F",
};

function CircularProgress({ value, label, color, size = 100 }: { value: number; label: string; color: string; size?: number }) {
  const r = size * 0.35; const cx = size / 2; const cy = size / 2;
  const circ = 2 * Math.PI * r; const offset = circ - (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <span className="absolute text-xl font-bold font-display text-white" style={{ marginTop: -size * 0.05 }}>{value}%</span>
      <span className="text-[10px] font-mono text-white/40 mt-1">{label}</span>
    </div>
  );
}

function ProgressRing({ value, color }: { value: number; color: string }) {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="absolute inset-0" width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle cx="32" cy="32" r="28" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={175.93} strokeDashoffset={175.93 - (value / 100) * 175.93}
          style={{ transition: "stroke-dashoffset 1s ease" }} className="transform -rotate-90 origin-center" />
      </svg>
      <span className="text-xs font-bold text-white">{Math.round(value)}%</span>
    </div>
  );
}

function LivePreviewPanel({ dest, ship, calc }: { dest: PlanetData | null; ship: Spacecraft | null; calc: MissionCalculations | null }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!calc) return;
    const interval = setInterval(() => { setProgress((p) => (p + 0.5) % 100); }, 100);
    return () => clearInterval(interval);
  }, [calc]);

  if (!dest || !calc) return null;
  const maxDist = 40; const pct = Math.min(1, dest.distanceAU / maxDist);
  const gap = 280; const shipX = 60 + pct * gap;
  const commDelayLabel = calc.communicationDelay > 1440 ? `${(calc.communicationDelay / 1440).toFixed(1)} days` : calc.communicationDelay > 60 ? `${(calc.communicationDelay / 60).toFixed(1)} hrs` : `${calc.communicationDelay} min`;

  return (
    <div className="rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] p-5 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[10px] font-mono text-cyan-400/70 tracking-widest uppercase">Live Simulation Preview</span>
      </div>
      <svg viewBox="0 0 340 120" className="w-full h-auto">
        <defs>
          <linearGradient id="trail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(34,211,238,0.4)" /><stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
        </defs>
        <line x1="60" y1="60" x2={60 + gap} y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="60" y1="60" x2={shipX} y2="60" stroke="url(#trail)" strokeWidth="2" />
        <circle cx="60" cy="60" r="8" fill="#4B7BE5" stroke="rgba(75,123,229,0.3)" strokeWidth="4">
          <animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite" />
        </circle>
        <text x="60" y="82" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">Earth</text>
        <circle cx={60 + gap} cy="60" r="6" fill={dest.color} stroke={`${dest.color}40`} strokeWidth="3" />
        <text x={60 + gap} y="82" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">{dest.name}</text>
        <circle cx={shipX} cy="60" r="3" fill="#fff" filter="url(#glow)">
          <animate attributeName="cx" values={`${60 + pct * gap * 0.2};${60 + pct * gap * 0.8};${60 + pct * gap * 0.2}`} dur="8s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="grid grid-cols-3 gap-3 mt-3">
        {[
          { label: "Travel Time", value: `${calc.travelTimeDays} days`, clr: "text-cyan-300" },
          { label: "Distance", value: `${dest.distanceAU.toFixed(1)} AU`, clr: "text-amber-400" },
          { label: "Comm Delay", value: commDelayLabel, clr: "text-emerald-400" },
        ].map((m) => (
          <div key={m.label} className="text-center">
            <p className="text-[10px] font-mono text-white/30">{m.label}</p>
            <p className={`text-xs font-bold font-display ${m.clr}`}>{m.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-[10px] font-mono text-white/30 mb-1">
          <span>Mission Progress</span><span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

function CountdownOverlay({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(10);
  const [phase, setPhase] = useState<"countdown" | "launch" | "done">("countdown");

  useEffect(() => {
    if (count > 0 && phase === "countdown") {
      const t = setTimeout(() => setCount((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
    if (count === 0 && phase === "countdown") {
      setPhase("launch");
      setTimeout(() => setPhase("done"), 2000);
      setTimeout(() => onComplete(), 3000);
    }
  }, [count, phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-2xl">
      {phase === "countdown" ? (
        <div className="text-center">
          <p className="text-white/30 font-mono text-sm tracking-[0.3em] uppercase mb-4">Mission Launch in</p>
          <p className="text-8xl font-display font-bold text-white tabular-nums" style={{ textShadow: "0 0 60px rgba(34,211,238,0.4)" }}>
            {count}
          </p>
          <div className="flex gap-1.5 justify-center mt-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i < 10 - count ? "bg-cyan-400" : "bg-white/10"}`} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-9xl mb-4 animate-bounce" style={{ animationDuration: "0.5s" }}>🚀</p>
          <p className="text-white/70 text-xl font-display font-bold">Launch Initiated!</p>
          <p className="text-white/30 text-sm font-mono mt-2">Preparing for {phase === "launch" ? "transit..." : ""}</p>
          <div className="mt-6 w-48 h-1 rounded-full bg-white/[0.06] mx-auto overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" style={{ width: "100%" }} />
          </div>
        </div>
      )}
    </div>
  );
}

function DifficultyBadge({ level }: { level: string }) {
  const colors: Record<string, string> = { Low: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20", High: "text-orange-400 bg-orange-400/10 border-orange-400/20", Extreme: "text-red-400 bg-red-400/10 border-red-400/20" };
  return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${colors[level] || colors.Medium}`}>{level}</span>;
}

export default function MissionPlannerPage() {
  const [step, setStep] = useState(0);
  const [dest, setDest] = useState<PlanetData | null>(null);
  const [mission, setMission] = useState<MissionType | null>(null);
  const [crew, setCrew] = useState<CrewConfig | null>(null);
  const [ship, setShip] = useState<Spacecraft | null>(null);
  const [equipment, setEquipment] = useState<Set<string>>(new Set(EQUIPMENT_LIST.filter((e) => e.mandatory).map((e) => e.id)));
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownDone, setCountdownDone] = useState(false);

  const calc = useMemo(() => {
    if (!dest || !ship || !crew || !mission) return null;
    return calculateMission(dest, ship, crew, mission);
  }, [dest, ship, crew, mission]);

  const aiRec = useMemo(() => {
    if (!dest || !mission || !calc) return null;
    return generateAIRecommendation(dest, mission, calc);
  }, [dest, mission, calc]);

  const readiness = useMemo(() => {
    if (!calc) return null;
    return calculateReadiness(calc, aiRec, equipment.size, EQUIPMENT_LIST.length);
  }, [calc, aiRec, equipment]);

  const toggleEquipment = useCallback((id: string) => {
    setEquipment((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const canProceed = () => {
    if (step === 0 && dest) return true;
    if (step === 1 && mission) return true;
    if (step === 2 && crew) return true;
    if (step === 3 && ship) return true;
    if (step === 4) return true;
    if (step === 5) return true;
    if (step === 6) return true;
    if (step === 7) return true;
    if (step === 8) return true;
    if (step === 9) return true;
    if (step === 10) return true;
    return false;
  };

  const handleLaunch = () => {
    setShowCountdown(true);
    setCountdownDone(false);
  };

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-white">Choose Your Destination</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PLANETS.map((p) => {
              const sel = dest?.id === p.id; const pc = PLANET_COLORS[p.id] || "#fff";
              return (
                <button key={p.id} onClick={() => setDest(p)}
                  className={`relative rounded-xl overflow-hidden border transition-all duration-300 text-left ${sel ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]"}`}
                  style={{ borderColor: sel ? `${pc}60` : "rgba(255,255,255,0.06)", background: sel ? `${pc}12` : "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ background: `radial-gradient(circle, ${pc}40, ${pc}10)`, boxShadow: sel ? `0 0 20px ${pc}30` : "none" }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{p.name}</p>
                      <p className="text-[10px] font-mono text-white/40">{p.distanceAU.toFixed(1)} AU — {p.distanceKm.toLocaleString()} km</p>
                    </div>
                    {sel && <span className="text-[10px] text-cyan-400 font-mono">Selected</span>}
                  </div>
                </button>
              );
            })}
          </div>
          {dest && (
            <div className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] p-4 mt-2">
              <p className="text-white/60 text-sm leading-relaxed">{dest.description}</p>
            </div>
          )}
        </div>
      );

      case 1: return (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-white">Select Mission Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MISSION_TYPES.map((m) => {
              const sel = mission?.id === m.id;
              return (
                <button key={m.id} onClick={() => setMission(m)}
                  className={`rounded-xl p-4 border text-left transition-all duration-300 ${sel ? "border-cyan-400/40 bg-cyan-400/8" : "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12]"}`}>
                  <p className="text-2xl mb-1">{m.icon}</p>
                  <p className="text-sm font-semibold text-white">{m.label}</p>
                  <p className="text-[11px] text-white/40 mt-1">{m.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] font-mono text-white/30">Difficulty: {Array(m.difficulty).fill("◆").join("")}{Array(5 - m.difficulty).fill("◇").join("")}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );

      case 2: return (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-white">Configure Crew</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CREW_CONFIGS.map((c) => {
              const sel = crew?.id === c.id;
              return (
                <button key={c.id} onClick={() => setCrew(c)}
                  className={`rounded-xl p-4 border text-center transition-all duration-300 ${sel ? "border-emerald-400/40 bg-emerald-400/8" : "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12]"}`}>
                  <p className="text-2xl mb-1">{c.icon}</p>
                  <p className="text-sm font-semibold text-white">{c.label}</p>
                  <p className="text-[11px] text-white/40 mt-1">Crew: {c.minCrew}{c.maxCrew > c.minCrew ? `–${c.maxCrew}` : ""}</p>
                  <p className="text-[10px] text-white/30 mt-1">{c.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      );

      case 3: return (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-white">Select Spacecraft</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SPACECRAFT.map((s) => {
              const sel = ship?.id === s.id;
              return (
                <button key={s.id} onClick={() => setShip(s)}
                  className={`rounded-xl p-4 border text-left transition-all duration-300 ${sel ? "scale-[1.02]" : "hover:scale-[1.01]"}`}
                  style={{ borderColor: sel ? `${s.color}60` : "rgba(255,255,255,0.06)", background: sel ? `${s.color}10` : "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{s.icon}</span>
                    <div><p className="text-sm font-semibold text-white">{s.name}</p><p className="text-[10px] font-mono text-white/40">{s.maxSpeedLabel}</p></div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-mono">
                    <span className="text-white/30">Range: <span className="text-white/50">{s.rangeAU} AU</span></span>
                    <span className="text-white/30">Capacity: <span className="text-white/50">{s.passengerCapacity}</span></span>
                    <span className="text-white/30">Safety: <span className="text-white/50">{s.safetyRating}/5</span></span>
                    <span className="text-white/30">Gravity: <span className="text-white/50">{s.artificialGravity ? "Yes" : "No"}</span></span>
                  </div>
                  <p className="text-[10px] text-white/30 mt-1.5">{s.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      );

      case 4: return (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-white">Mission Calculator</h2>
          {calc ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { label: "Distance", value: `${calc.distanceAU.toFixed(2)} AU`, clr: "text-blue-300" },
                  { label: "Travel Time", value: `${calc.travelTimeDays} days`, clr: "text-cyan-300" },
                  { label: "Fuel Required", value: `${calc.fuelRequired.toLocaleString()} kg`, clr: "text-amber-300" },
                  { label: "Energy", value: `${calc.energyConsumption.toLocaleString()} GJ`, clr: "text-orange-300" },
                  { label: "Crew Size", value: `${calc.crewCount} members`, clr: "text-emerald-300" },
                  { label: "Oxygen", value: `${calc.oxygenRequired.toLocaleString()} kg`, clr: "text-cyan-300" },
                  { label: "Food", value: `${calc.foodRequired.toLocaleString()} kg`, clr: "text-amber-300" },
                  { label: "Water", value: `${calc.waterRequired.toLocaleString()} L`, clr: "text-blue-300" },
                  { label: "Cargo", value: `${calc.cargoWeight.toLocaleString()} kg`, clr: "text-purple-300" },
                  { label: "Comm Delay", value: calc.communicationDelay > 1440 ? `${(calc.communicationDelay / 1440).toFixed(1)} days` : `${calc.communicationDelay} min`, clr: "text-emerald-300" },
                  { label: "Difficulty", value: calc.missionDifficulty, clr: "text-red-300" },
                  { label: "Cost", value: `${calc.estimatedCost.toLocaleString()} SC`, clr: "text-amber-300" },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                    <p className="text-[10px] font-mono text-white/30 mb-1">{m.label}</p>
                    <p className={`text-xs font-bold font-display ${m.clr}`}>{m.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-blue-400/70 tracking-wider uppercase">Mission Cost Breakdown</span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Transport", pct: 45, clr: "bg-blue-500" },
                    { label: "Life Support", pct: 20, clr: "bg-emerald-500" },
                    { label: "Equipment", pct: 15, clr: "bg-amber-500" },
                    { label: "Fuel", pct: 12, clr: "bg-orange-500" },
                    { label: "Crew Operations", pct: 8, clr: "bg-purple-500" },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-white/40 w-20">{b.label}</span>
                      <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className={`h-full rounded-full ${b.clr} transition-all duration-700`} style={{ width: `${b.pct}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-white/30 w-8 text-right">{b.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-white/30 text-sm">Select destination, spacecraft, and crew to see calculations.</p>
          )}
        </div>
      );

      case 5: return (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-white">AI Mission Recommendation</h2>
          {aiRec ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Best Spacecraft", value: aiRec.bestSpacecraft, icon: "🚀", clr: "text-cyan-300" },
                  { label: "Launch Window", value: aiRec.launchWindow, icon: "📅", clr: "text-amber-300" },
                  { label: "Recommended Habitat", value: aiRec.recommendedHabitat, icon: "🏠", clr: "text-emerald-300" },
                  { label: "Crew Size", value: aiRec.crewSize, icon: "👥", clr: "text-blue-300" },
                ].map((r) => (
                  <div key={r.label} className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-4 flex items-center gap-3">
                    <span className="text-xl">{r.icon}</span>
                    <div><p className="text-[10px] font-mono text-white/30">{r.label}</p><p className={`text-xs font-semibold ${r.clr}`}>{r.value}</p></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-4">
                  <p className="text-[10px] font-mono text-amber-400/70 tracking-wider uppercase mb-2">Required Training</p>
                  <div className="flex flex-wrap gap-1.5">
                    {aiRec.requiredTraining.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-400/80 text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-4">
                  <p className="text-[10px] font-mono text-red-400/70 tracking-wider uppercase mb-2">Possible Risks</p>
                  <div className="flex flex-wrap gap-1.5">
                    {aiRec.possibleRisks.map((r) => (
                      <span key={r} className="px-2 py-0.5 rounded-md bg-red-400/10 border border-red-400/20 text-red-400/80 text-[10px]">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/30">Radiation Level</span>
                  <span className={`text-xs font-semibold ${aiRec.radiationLevel === "Low" ? "text-emerald-400" : aiRec.radiationLevel === "Moderate" ? "text-amber-400" : aiRec.radiationLevel === "High" ? "text-orange-400" : "text-red-400"}`}>{aiRec.radiationLevel}</span>
                </div>
                <div className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/30">Gravity Adaptation</span>
                  <span className={`text-xs font-semibold ${aiRec.gravityAdaptation.includes("Difficult") ? "text-orange-400" : "text-emerald-400"}`}>{aiRec.gravityAdaptation}</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-white/30 text-sm">Complete mission configuration to get AI recommendations.</p>
          )}
        </div>
      );

      case 6: return (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-white">Equipment Checklist</h2>
          <p className="text-white/30 text-xs font-mono">Mandatory items are pre-selected. {EQUIPMENT_LIST.length - equipment.size} remaining to check.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {EQUIPMENT_LIST.map((e) => {
              const checked = equipment.has(e.id);
              return (
                <button key={e.id} onClick={() => toggleEquipment(e.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${checked ? "border-emerald-400/30 bg-emerald-400/8" : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"}`}>
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${checked ? "border-emerald-400 bg-emerald-400" : "border-white/20"}`}>
                    {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className={`text-xs ${checked ? "text-white/80" : "text-white/40"}`}>{e.label}</span>
                  {e.mandatory && <span className="text-[9px] font-mono text-amber-400/60 ml-auto">Required</span>}
                </button>
              );
            })}
          </div>
        </div>
      );

      case 7: return (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-white">Mission Timeline</h2>
          {calc && (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/40 via-blue-500/20 to-transparent" />
              <div className="space-y-0">
                {TIMELINE_PHASES.map((t, i) => (
                  <div key={t.id} className="relative flex items-start gap-4 pb-6 last:pb-0">
                    <div className="relative z-10 w-8 h-8 rounded-full bg-space-black border-2 flex items-center justify-center"
                      style={{ borderColor: i < 3 ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.1)" }}>
                      <span className="text-xs">{t.icon}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm font-semibold text-white">{t.label}</p>
                      <p className="text-[10px] font-mono text-white/30">{t.duration}</p>
                    </div>
                    {i < TIMELINE_PHASES.length - 1 && (
                      <svg className="absolute left-[13px] top-8 w-[14px] h-3 text-white/10" viewBox="0 0 14 12" fill="none">
                        <path d="M7 12L0 0h14L7 12z" fill="currentColor" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );

      case 8: return (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-white">Environmental Information</h2>
          {dest ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { label: "Temperature", value: `${dest.temperatureMin} to ${dest.temperatureMax}` },
                { label: "Gravity", value: `${dest.gravity} ${dest.gravityUnit}` },
                { label: "Atmosphere", value: dest.atmosphere },
                { label: "Radiation", value: dest.radiation, clr: dest.radiation === "Low" ? "text-emerald-400" : dest.radiation === "Moderate" ? "text-amber-400" : "text-red-400" },
                { label: "Wind Speed", value: dest.wind },
                { label: "Day Length", value: dest.dayLength },
                { label: "Escape Velocity", value: dest.escapeVelocity },
                { label: "Terrain", value: dest.terrain },
              ].map((e) => (
                <div key={e.label} className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <p className="text-[10px] font-mono text-white/30 mb-1">{e.label}</p>
                  <p className={`text-xs font-semibold ${e.clr || "text-white/70"}`}>{e.value}</p>
                </div>
              ))}
            </div>
          ) : <p className="text-white/30 text-sm">Select a destination first.</p>}
        </div>
      );

      case 9: return (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-white">Mission Readiness Score</h2>
          {readiness ? (
            <>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10 py-4">
                <CircularProgress value={readiness.missionSuccess} label="Success Probability" color="#34D399" size={110} />
                <div className="relative">
                  <CircularProgress value={readiness.missionRisk} label="Mission Risk" color="#F87171" size={110} />
                </div>
                <CircularProgress value={readiness.crewReadiness} label="Crew Readiness" color="#60A5FA" size={110} />
                <CircularProgress value={readiness.equipmentReadiness} label="Equipment Readiness" color="#FBBF24" size={110} />
              </div>
              <div className="rounded-xl backdrop-blur-2xl bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-emerald-500/5 border border-white/[0.08] p-5 text-center">
                <p className="text-[10px] font-mono text-white/30 tracking-wider uppercase mb-2">Overall Mission Rating</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-5xl font-display font-bold text-white">{readiness.overall}%</span>
                  <div className="w-32 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-1000"
                      style={{ width: `${readiness.overall}%` }} />
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-2">
                  {readiness.overall >= 80 ? "Mission is highly viable. Proceed with confidence." :
                   readiness.overall >= 60 ? "Mission is feasible. Consider additional preparation." :
                   "Mission carries significant risk. Review recommendations."}
                </p>
              </div>
            </>
          ) : <p className="text-white/30 text-sm">Complete mission setup to calculate readiness.</p>}
        </div>
      );

      case 10: return (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-white">Final Mission Summary</h2>
          {dest && mission && ship && crew && calc && aiRec && readiness ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Destination", value: dest.name, clr: "text-white" },
                  { label: "Mission Type", value: mission.label, clr: "text-cyan-300" },
                  { label: "Spacecraft", value: ship.name, clr: "text-amber-300" },
                  { label: "Crew", value: `${crew.label} (${calc.crewCount})`, clr: "text-emerald-300" },
                  { label: "Travel Distance", value: `${calc.distanceAU.toFixed(2)} AU`, clr: "text-blue-300" },
                  { label: "Duration", value: `${calc.travelTimeDays} days`, clr: "text-cyan-300" },
                  { label: "Fuel Needed", value: `${calc.fuelRequired.toLocaleString()} kg`, clr: "text-orange-300" },
                  { label: "Cost", value: `${calc.estimatedCost.toLocaleString()} SC`, clr: "text-amber-300" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                    <p className="text-[10px] font-mono text-white/30">{s.label}</p>
                    <p className={`text-sm font-semibold font-display ${s.clr}`}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-white/30">Difficulty</span>
                    <DifficultyBadge level={calc.missionDifficulty} />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-white/30">Recommended Habitat</span>
                    <span className="text-xs text-emerald-300">{aiRec.recommendedHabitat}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/30">Equipment</span>
                    <span className="text-xs text-white/60">{equipment.size}/{EQUIPMENT_LIST.length} items</span>
                  </div>
                </div>
                <div className="rounded-xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-4 text-center flex flex-col items-center justify-center">
                  <p className="text-[10px] font-mono text-white/30 mb-1">Readiness Score</p>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="absolute inset-0" width="64" height="64" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#34D399" strokeWidth="4" strokeLinecap="round"
                        strokeDasharray={175.93} strokeDashoffset={175.93 - (readiness.overall / 100) * 175.93}
                        style={{ transition: "stroke-dashoffset 1s ease" }} className="transform -rotate-90 origin-center" />
                    </svg>
                    <span className="text-xl font-bold font-display text-white">{readiness.overall}%</span>
                  </div>
                </div>
              </div>
            </div>
          ) : <p className="text-white/30 text-sm">Complete all previous steps first.</p>}
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-space-black relative">
      <StarField />
      {showCountdown && <CountdownOverlay onComplete={() => { setShowCountdown(false); setCountdownDone(true); }} />}

      <div className="relative z-10 pt-24 pb-16">
        <div className="text-center section-container mb-8">
          <span className="text-cyan-400 text-xs font-mono tracking-[0.3em] uppercase block mb-3">Mission Control Interface v2.0</span>
          <h1 className="text-display-2 font-display font-bold text-white mb-3 leading-none">
            <span className="text-gradient">AI</span> Mission Planner
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Design your interplanetary mission with AI-powered calculations and real-time simulation
          </p>
        </div>

        <div className="section-container grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] p-4 lg:sticky lg:top-28">
              <p className="text-[10px] font-mono text-cyan-400/60 tracking-wider uppercase mb-4">Mission Steps</p>
              <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {STEPS.map((s, i) => (
                  <button key={s} onClick={() => setStep(i)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all whitespace-nowrap lg:whitespace-normal ${step === i ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20" : "text-white/30 hover:text-white/50 hover:bg-white/[0.03] border border-transparent"}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono flex-shrink-0 ${step === i ? "bg-cyan-400 text-space-black font-bold" : "bg-white/[0.06] text-white/40"}`}>{i + 1}</span>
                    <span className="text-[11px] hidden lg:inline">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] p-5 min-h-[300px]">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-400/60">STEP {step + 1} / {STEPS.length}</span>
                  <span className="text-white/30 text-[10px] font-mono">—</span>
                  <span className="text-white/50 text-xs font-mono">{STEPS[step]}</span>
                </div>
                {calc && (
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-emerald-400/60">Live</span>
                  </div>
                )}
              </div>
              {renderStep()}
            </div>
            <div className="flex items-center justify-between gap-3">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 border-white/[0.08] text-white/50 hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed">
                ← Previous
              </button>
              {step < STEPS.length - 1 ? (
                <button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} disabled={!canProceed()}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 hover:bg-cyan-400/20 disabled:opacity-30 disabled:cursor-not-allowed">
                  Next →
                </button>
              ) : (
                <button onClick={handleLaunch}
                  className="px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-xl hover:scale-[1.02] active:scale-95">
                  🚀 Start Mission Simulation
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-4">
              <LivePreviewPanel dest={dest} ship={ship} calc={calc} />
              {dest && (
                <div className="rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] p-4">
                  <p className="text-[10px] font-mono text-white/30 mb-3">Quick Stats</p>
                  <div className="space-y-2.5">
                    {[
                      { label: "Destination", value: dest?.name || "—" },
                      { label: "Mission", value: mission?.label || "—" },
                      { label: "Crew", value: crew ? `${crew.label}` : "—" },
                      { label: "Ship", value: ship?.name || "—" },
                    ].map((s) => (
                      <div key={s.label} className="flex justify-between text-[11px]">
                        <span className="text-white/30">{s.label}</span>
                        <span className="text-white/60 font-medium">{s.value}</span>
                      </div>
                    ))}
                  </div>
                  {readiness && (
                    <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                      <span className="text-[11px] text-white/30">Readiness</span>
                      <ProgressRing value={readiness.overall} color="#34D399" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
