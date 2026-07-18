"use client";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  gradient?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = false,
  onClick,
  gradient = false,
}: GlassCardProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={`${gradient ? "gradient-border" : ""} ${
        hover ? "glass-card" : "glass rounded-3xl"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
