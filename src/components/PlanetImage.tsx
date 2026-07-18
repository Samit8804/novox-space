"use client";

import { useRef, useEffect, useState, useMemo } from "react";

type PlanetId = "mercury" | "venus" | "earth" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune" | "pluto" | "moon";

const PLANET_CONFIGS: Record<string, {
  base: [number, number, number]; radius: number; glowColor: string;
  bandColor?: [number, number, number]; bandCount?: number;
  spotColor?: [number, number, number]; spotPos?: [number, number]; spotSize?: number;
  rings?: { inner: number; outer: number; color: string; opacity: number; tilt: number };
}> = {
  mercury: { base: [168, 92, 55], radius: 0.35, glowColor: "rgba(168,92,55,0.3)" },
  venus:   { base: [232, 163, 23], radius: 0.55, glowColor: "rgba(232,163,23,0.3)", bandColor: [200, 140, 30], bandCount: 6 },
  earth:   { base: [75, 123, 229], radius: 0.58, glowColor: "rgba(75,123,229,0.35)", bandColor: [100, 180, 100], bandCount: 4 },
  mars:    { base: [224, 112, 64], radius: 0.45, glowColor: "rgba(224,112,64,0.3)" },
  jupiter: { base: [212, 165, 116], radius: 1.0, glowColor: "rgba(212,165,116,0.3)", bandColor: [180, 130, 80], bandCount: 18, spotColor: [210, 90, 60], spotPos: [0.65, 0.55], spotSize: 0.14 },
  saturn:  { base: [232, 213, 163], radius: 0.85, glowColor: "rgba(232,213,163,0.3)", bandColor: [200, 180, 140], bandCount: 12, rings: { inner: 1.3, outer: 2.6, color: "rgba(200,180,140,0.6)", opacity: 0.55, tilt: 0.4 } },
  uranus:  { base: [126, 200, 227], radius: 0.65, glowColor: "rgba(126,200,227,0.3)", bandColor: [100, 180, 210], bandCount: 8, rings: { inner: 1.4, outer: 2.0, color: "rgba(100,180,210,0.3)", opacity: 0.25, tilt: 1.5 } },
  neptune: { base: [51, 85, 255], radius: 0.6, glowColor: "rgba(51,85,255,0.35)", bandColor: [40, 70, 220], bandCount: 10, spotColor: [80, 130, 255], spotPos: [0.4, 0.45], spotSize: 0.08 },
  pluto:   { base: [205, 133, 63], radius: 0.2, glowColor: "rgba(205,133,63,0.25)" },
  moon:    { base: [180, 177, 173], radius: 0.25, glowColor: "rgba(180,177,173,0.2)" },
};

function drawPlanet(
  ctx: CanvasRenderingContext2D,
  id: string,
  cx: number, cy: number,
  size: number,
  time: number,
  rotation: number,
) {
  const cfg = PLANET_CONFIGS[id];
  if (!cfg) return;

  const r = size * cfg.radius;

  ctx.save();

  if (cfg.rings) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(cfg.rings.tilt);
    ctx.scale(1, 0.35);

    const ri = size * cfg.rings.inner;
    const ro = size * cfg.rings.outer;

    for (let i = 0; i < 6; i++) {
      const frac = i / 6;
      const ringR = ri + (ro - ri) * frac;
      const w = (ro - ri) / 6 * 0.9;
      ctx.beginPath();
      ctx.arc(0, 0, ringR + w / 2, 0, Math.PI * 2);
      ctx.fillStyle = cfg.rings.color.replace("0.6", String(0.5 - frac * 0.25)).replace("0.3", String(0.25 - frac * 0.12));
      ctx.fill();
    }
    ctx.restore();
  }

  const grad = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, r * 0.05, cx, cy, r);
  const [br, bg, bb] = cfg.base;
  const highlight = 40;

  grad.addColorStop(0, `rgb(${Math.min(255, br + highlight)},${Math.min(255, bg + highlight)},${Math.min(255, bb + highlight)})`);
  grad.addColorStop(0.3, `rgb(${br},${bg},${bb})`);
  grad.addColorStop(0.7, `rgb(${Math.max(0, br - 20)},${Math.max(0, bg - 20)},${Math.max(0, bb - 20)})`);
  grad.addColorStop(1, `rgb(${Math.max(0, br - 40)},${Math.max(0, bg - 40)},${Math.max(0, bb - 40)})`);

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  if (cfg.bandColor && cfg.bandCount) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    for (let i = 0; i < cfg.bandCount; i++) {
      const yOff = -r + (i / cfg.bandCount) * r * 2;
      const bandW = r / cfg.bandCount * 1.2;
      const bandAlpha = 0.15 + Math.sin(i * 1.5) * 0.1 + 0.1;
      ctx.fillStyle = `rgba(${cfg.bandColor[0]},${cfg.bandColor[1]},${cfg.bandColor[2]},${bandAlpha})`;
      ctx.fillRect(cx - r, cy + yOff, r * 2, bandW);
    }
    ctx.restore();
  }

  if (cfg.spotColor && cfg.spotPos && cfg.spotSize) {
    const sx = cx + (cfg.spotPos[0] - 0.5) * r * 2;
    const sy = cy + (cfg.spotPos[1] - 0.5) * r * 2;
    const sr = r * cfg.spotSize;
    const spotGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
    spotGrad.addColorStop(0, `rgba(${cfg.spotColor[0]},${cfg.spotColor[1]},${cfg.spotColor[2]},0.8)`);
    spotGrad.addColorStop(0.5, `rgba(${cfg.spotColor[0]},${cfg.spotColor[1]},${cfg.spotColor[2]},0.4)`);
    spotGrad.addColorStop(1, `rgba(${cfg.spotColor[0]},${cfg.spotColor[1]},${cfg.spotColor[2]},0)`);
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fillStyle = spotGrad;
    ctx.fill();
  }

  const limbGrad = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r);
  limbGrad.addColorStop(0, "rgba(0,0,0,0)");
  limbGrad.addColorStop(1, "rgba(0,0,0,0.35)");
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = limbGrad;
  ctx.fill();

  const shadowGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.4, cx - r * 0.3, cy - r * 0.3, r * 0.9);
  shadowGrad.addColorStop(0, "rgba(0,0,0,0)");
  shadowGrad.addColorStop(0.5, "rgba(0,0,0,0.15)");
  shadowGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.beginPath();
  ctx.arc(cx - r * 0.3, cy - r * 0.3, r * 0.9, 0, Math.PI * 2);
  ctx.fillStyle = shadowGrad;
  ctx.fill();

  ctx.restore();

  if (cfg.rings) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(cfg.rings.tilt);
    ctx.scale(1, 0.35);

    const ri = size * cfg.rings.inner;
    const ro = size * cfg.rings.outer;

    ctx.beginPath();
    ctx.arc(0, 0, ri, 0, Math.PI * 2);
    ctx.closePath();
    ctx.moveTo(ro, 0);
    ctx.arc(0, 0, ro, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = cfg.rings.color.replace(" opacity", "");
    ctx.fill();

    ctx.restore();
  }
}

interface PlanetImageProps {
  planetId: string;
  size?: number;
  showGlow?: boolean;
  showShadow?: boolean;
  animate?: boolean;
  className?: string;
}

export default function PlanetImage({
  planetId,
  size = 120,
  showGlow = true,
  showShadow = true,
  animate = true,
  className = "",
}: PlanetImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTime = useRef(Date.now());

  const dpr = useMemo(() => (typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    observerRef.current = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observerRef.current?.disconnect(); } },
      { rootMargin: "200px" },
    );
    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cfg = PLANET_CONFIGS[planetId];
    if (!cfg) return;

    let useProcedural = false;

    const img = new Image();
    img.crossOrigin = "anonymous";
    const cacheBust = ["saturn", "uranus", "neptune"].includes(planetId) ? "?v=2" : "";
    const pngPath = `/images/${planetId}.png${cacheBust}`;
    img.src = pngPath;

    console.log(`Loading Planet: ${planetId}  ${pngPath}`);

    img.onload = () => {
      useProcedural = false;
    };

    img.onerror = () => {
      console.warn(`Missing planet image: ${pngPath} — using procedural fallback`);
      useProcedural = true;
    };

    let floatPhase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = showShadow ? size / 2 - 2 : size / 2;

      if (animate) {
        floatPhase += 0.015;
      }

      const floatY = animate ? Math.sin(floatPhase) * 3 : 0;
      const rotation = animate ? (Date.now() - startTime.current) / 8000 : 0;

      if (showGlow && cfg.glowColor) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy + floatY, size * cfg.radius * 1.8, 0, Math.PI * 2);
        ctx.clip();
        const glowGrad = ctx.createRadialGradient(cx, cy + floatY, size * cfg.radius * 0.2, cx, cy + floatY, size * cfg.radius * 2);
        glowGrad.addColorStop(0, cfg.glowColor);
        glowGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, size, size);
        ctx.restore();
      }

      if (showShadow) {
        const shadowGrad = ctx.createRadialGradient(cx, size - 8, 2, cx, size - 8, size * cfg.radius * 0.6);
        shadowGrad.addColorStop(0, "rgba(0,0,0,0.25)");
        shadowGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.ellipse(cx, size - 8, size * cfg.radius * 0.6, 6, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.save();
      ctx.translate(cx, cy + floatY);
      ctx.rotate(rotation);

      const radius = size * 0.45;

      if (!useProcedural && img.complete && img.naturalWidth > 0) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, -radius, -radius, radius * 2, radius * 2);
      } else {
        drawPlanet(ctx, planetId, 0, 0, size * 0.45, Date.now() / 1000, rotation);
      }

      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [visible, size, planetId, showGlow, showShadow, animate, dpr]);

  return (
    <div ref={containerRef} className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size, background: "transparent" }}>
      <canvas ref={canvasRef} style={{ width: size, height: size, imageRendering: "auto", background: "transparent" }} />
    </div>
  );
}
