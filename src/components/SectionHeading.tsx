"use client";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      <h2 className="text-subhead text-white font-display">{title}</h2>
      {subtitle && <p className="mt-3 text-white/40 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
