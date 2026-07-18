"use client";

const accentStyles: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "rgba(59,130,246,0.1)", text: "#3B82F6", border: "rgba(59,130,246,0.2)" },
  cyan: { bg: "rgba(34,211,238,0.1)", text: "#22D3EE", border: "rgba(34,211,238,0.2)" },
  purple: { bg: "rgba(167,139,250,0.1)", text: "#A78BFA", border: "rgba(167,139,250,0.2)" },
  gold: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B", border: "rgba(245,158,11,0.2)" },
  emerald: { bg: "rgba(52,211,153,0.1)", text: "#34D399", border: "rgba(52,211,153,0.2)" },
  pink: { bg: "rgba(236,72,153,0.1)", text: "#EC4899", border: "rgba(236,72,153,0.2)" },
  orange: { bg: "rgba(251,146,60,0.1)", text: "#FB923C", border: "rgba(251,146,60,0.2)" },
  red: { bg: "rgba(239,68,68,0.1)", text: "#EF4444", border: "rgba(239,68,68,0.2)" },
  white: { bg: "rgba(255,255,255,0.05)", text: "#F8FAFC", border: "rgba(255,255,255,0.1)" },
};

interface PlanetInfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description?: string;
  accent?: keyof typeof accentStyles;
}

export default function PlanetInfoCard({
  icon,
  label,
  value,
  description,
  accent = "blue",
}: PlanetInfoCardProps) {
  const s = accentStyles[accent] || accentStyles.blue;
  return (
    <div
      className="glass rounded-3xl p-6 hover:scale-[1.02] transition-all duration-500 group"
      style={{ borderColor: s.border }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        style={{ background: s.bg }}
      >
        <div style={{ color: s.text }}>{icon}</div>
      </div>
      <p className="text-white/30 text-xs font-mono tracking-wider uppercase mb-1">{label}</p>
      <p className="text-xl font-bold text-white font-display mb-1" style={{ color: s.text }}>
        {value}
      </p>
      {description && <p className="text-white/40 text-sm leading-relaxed">{description}</p>}
    </div>
  );
}
