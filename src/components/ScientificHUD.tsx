"use client";

import { DestinationMetrics } from "@/types";
import GlassCard from "./GlassCard";

interface ScientificHUDProps {
  metrics: DestinationMetrics;
}

const metricLabels: Record<keyof DestinationMetrics, string> = {
  travel_duration_days: "Travel Duration",
  difficulty_level: "Difficulty",
  safety_rating: "Safety",
  gravity_m_s2: "Gravity",
  avg_temperature_k: "Avg Temp",
  atmospheric_composition: "Atmosphere",
};

export default function ScientificHUD({ metrics }: ScientificHUDProps) {
  return (
    <GlassCard className="w-full">
      <h3 className="text-telemetry text-white/50 uppercase tracking-widest mb-4 font-mono">
        Scientific Telemetry
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-telemetry text-white/40 font-mono">{metricLabels.travel_duration_days}</p>
          <p className="text-lg font-semibold text-plasma-cyan font-mono telemetry-glow">
            {metrics.travel_duration_days.toLocaleString()} <span className="text-xs text-white/40">days</span>
          </p>
        </div>
        <div>
          <p className="text-telemetry text-white/40 font-mono">{metricLabels.difficulty_level}</p>
          <p className="text-lg font-semibold font-mono">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={i < metrics.difficulty_level ? "text-stellar-gold" : "text-white/20"}>
                &#9733;
              </span>
            ))}
          </p>
        </div>
        <div>
          <p className="text-telemetry text-white/40 font-mono">{metricLabels.safety_rating}</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-plasma-cyan to-stellar-gold"
                style={{ width: `${metrics.safety_rating}%` }}
              />
            </div>
            <span className="text-sm font-mono text-plasma-cyan">{metrics.safety_rating}%</span>
          </div>
        </div>
        <div>
          <p className="text-telemetry text-white/40 font-mono">{metricLabels.gravity_m_s2}</p>
          <p className="text-lg font-semibold text-plasma-cyan font-mono telemetry-glow">
            {metrics.gravity_m_s2} <span className="text-xs text-white/40">m/s²</span>
          </p>
        </div>
        <div>
          <p className="text-telemetry text-white/40 font-mono">{metricLabels.avg_temperature_k}</p>
          <p className="text-lg font-semibold text-plasma-cyan font-mono telemetry-glow">
            {metrics.avg_temperature_k} <span className="text-xs text-white/40">K</span>
          </p>
        </div>
        <div>
          <p className="text-telemetry text-white/40 font-mono">{metricLabels.atmospheric_composition}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {metrics.atmospheric_composition.map((gas) => (
              <span key={gas} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/60 font-mono border border-white/10">
                {gas}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
