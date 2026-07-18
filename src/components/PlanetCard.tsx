"use client";

import Link from "next/link";
import { Destination } from "@/types";
import GlassCard from "./GlassCard";

interface PlanetCardProps {
  destination: Destination;
}

export default function PlanetCard({ destination }: PlanetCardProps) {
  return (
    <Link href={`/planet/${destination.node_id}`}>
      <GlassCard hover className="group p-0 overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse at center, ${destination.color} 0%, transparent 70%)`,
            }}
          />
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">{destination.name}</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50 font-mono border border-white/10">
              {destination.metrics.travel_duration_days}d
            </span>
          </div>
          <p className="text-sm text-white/50 line-clamp-2 mb-3">{destination.description}</p>
          <div className="flex items-center gap-3 text-telemetry">
            <span className="text-plasma-cyan font-mono">{destination.metrics.gravity_m_s2} m/s²</span>
            <span className="text-white/20">|</span>
            <span className="text-stellar-gold font-mono">
              {"★".repeat(destination.metrics.difficulty_level)}
              {"☆".repeat(5 - destination.metrics.difficulty_level)}
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
