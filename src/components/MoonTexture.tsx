"use client";

import { useRef, useEffect } from "react";

type MoonTextureProps = {
  moonId: string;
  moonName: string;
  imagePath: string;
  diameter: number;
  parentColor: string;
  className?: string;
  size?: number;
};

const MOON_COLORS: Record<string, { surface: string; highlight: string; shadow: string; spot: string }> = {
  luna:     { surface: "#C8C8C8", highlight: "#E8E8E8", shadow: "#808080", spot: "#A0A0A0" },
  phobos:   { surface: "#8B7355", highlight: "#A0896B", shadow: "#5C4A35", spot: "#6B5B45" },
  deimos:   { surface: "#7A6B5A", highlight: "#948473", shadow: "#4A3B2A", spot: "#5C4D3C" },
  io:       { surface: "#E8D44D", highlight: "#F0E060", shadow: "#B8A020", spot: "#D04020" },
  europa:   { surface: "#C8D8E8", highlight: "#E0ECF4", shadow: "#8098B0", spot: "#A0B8D0" },
  ganymede: { surface: "#B0A890", highlight: "#C8C0A8", shadow: "#706858", spot: "#8A8270" },
  callisto: { surface: "#605040", highlight: "#786858", shadow: "#383028", spot: "#4A3A2A" },
  titan:    { surface: "#E0A040", highlight: "#E8B860", shadow: "#A07020", spot: "#C08030" },
  enceladus:{ surface: "#E0E8F0", highlight: "#F0F4F8", shadow: "#A0B0C0", spot: "#C0D0E0" },
  rhea:     { surface: "#C8C0B0", highlight: "#D8D0C0", shadow: "#807868", spot: "#A09888" },
  mimas:    { surface: "#B8B8C0", highlight: "#D0D0D8", shadow: "#787880", spot: "#9898A0" },
  dione:    { surface: "#C0C8D0", highlight: "#D8E0E8", shadow: "#788090", spot: "#98A0B0" },
  iapetus:  { surface: "#3A3028", highlight: "#504840", shadow: "#1A1410", spot: "#8B7B6B" },
  miranda:  { surface: "#A8B0B8", highlight: "#C0C8D0", shadow: "#606870", spot: "#809098" },
  ariel:    { surface: "#B8C8D8", highlight: "#D0E0F0", shadow: "#708090", spot: "#90A0B0" },
  umbriel:  { surface: "#2A2A2A", highlight: "#404040", shadow: "#101010", spot: "#3A3A3A" },
  titania:  { surface: "#B0B8C0", highlight: "#C8D0D8", shadow: "#687078", spot: "#889098" },
  oberon:   { surface: "#A0A8B0", highlight: "#B8C0C8", shadow: "#586068", spot: "#788088" },
  triton:   { surface: "#D0C8B8", highlight: "#E0D8C8", shadow: "#908878", spot: "#B0A898" },
  proteus:  { surface: "#4A4040", highlight: "#605858", shadow: "#282020", spot: "#3A3030" },
  nereid:   { surface: "#686868", highlight: "#808080", shadow: "#383838", spot: "#505050" },
  charon:   { surface: "#888888", highlight: "#A0A0A0", shadow: "#505050", spot: "#6A6A6A" },
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateProceduralMoon(
  ctx: CanvasRenderingContext2D,
  size: number,
  colors: { surface: string; highlight: string; shadow: string; spot: string },
  diameter: number,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const c = canvas.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.42;
  const rng = seededRandom(diameter * 1000);

  const grad = c.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, 0, cx, cy, radius);
  grad.addColorStop(0, colors.highlight);
  grad.addColorStop(0.5, colors.surface);
  grad.addColorStop(1, colors.shadow);
  c.fillStyle = grad;

  c.beginPath();
  c.arc(cx, cy, radius, 0, Math.PI * 2);
  c.fill();

  const craterCount = Math.floor(8 + (diameter / 500) * 3);
  for (let i = 0; i < craterCount; i++) {
    const angle = rng() * Math.PI * 2;
    const dist = rng() * radius * 0.75;
    const craterR = 3 + rng() * radius * 0.18;
    const cx2 = cx + Math.cos(angle) * dist;
    const cy2 = cy + Math.sin(angle) * dist;

    c.beginPath();
    c.arc(cx2, cy2, craterR, 0, Math.PI * 2);
    c.fillStyle = colors.spot;
    c.fill();
    c.beginPath();
    c.arc(cx2, cy2, craterR * 0.7, 0, Math.PI * 2);
    c.fillStyle = colors.shadow;
    c.fill();
    c.beginPath();
    c.arc(cx2, cy2, craterR * 0.3, 0, Math.PI * 2);
    c.fillStyle = colors.shadow;
    c.fill();
  }

  if (diameter > 1000) {
    for (let i = 0; i < 6; i++) {
      const x = rng() * size;
      const y = rng() * size;
      const w = 2 + rng() * 8;
      const h = 1 + rng() * 3;
      if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) < radius) {
        c.fillStyle = `rgba(255,255,255,${0.03 + rng() * 0.05})`;
        c.fillRect(x - w / 2, y - h / 2, w, h);
      }
    }
  }

  if (diameter > 2000) {
    for (let i = 0; i < 4; i++) {
      const x = cx + (rng() - 0.5) * radius * 1.2;
      const y = cy + (rng() - 0.5) * radius * 1.2;
      const r = 5 + rng() * 15;
      if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) < radius) {
        c.beginPath();
        c.arc(x, y, r, 0, Math.PI * 2);
        c.fillStyle = `rgba(0,0,0,${0.05 + rng() * 0.08})`;
        c.fill();
      }
    }
  }

  return canvas;
}

export default function MoonTexture({ moonId, moonName, imagePath, diameter, parentColor, className = "", size = 200 }: MoonTextureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displaySize = size;
    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;
    ctx.scale(dpr, dpr);

    const colors = MOON_COLORS[moonId] || { surface: "#A0A0A0", highlight: "#C0C0C0", shadow: "#606060", spot: "#808080" };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imagePath;

    console.log(`Loading Moon: ${moonName}  ${imagePath}`);

    let useProcedural = false;

    img.onload = () => {
      useProcedural = false;
      anim();
    };

    img.onerror = () => {
      console.warn(`Missing moon image: ${imagePath} — using procedural fallback`);
      useProcedural = true;
      anim();
    };

    let animId: number;
    let frame = 0;

    function anim() {
      const c = ctx!;
      frame++;
      const cx = displaySize / 2;
      const cy = displaySize / 2;
      const radius = displaySize * 0.38;
      const floatY = Math.sin(frame * 0.025) * 4;
      const rotation = frame * 0.003;

      c.clearRect(0, 0, displaySize, displaySize);
      c.save();

      const procCanvas = generateProceduralMoon(c, displaySize, colors, diameter);
      const procTex = new Image();
      procTex.src = procCanvas.toDataURL();

      const glow = c.createRadialGradient(cx, cy + floatY, radius * 0.2, cx, cy + floatY, radius * 1.5);
      glow.addColorStop(0, "rgba(255,255,255,0.15)");
      glow.addColorStop(0.5, "rgba(255,255,255,0.04)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = glow;
      c.fillRect(0, 0, displaySize, displaySize);

      c.translate(cx, cy + floatY);
      c.rotate(rotation);

      c.beginPath();
      c.arc(0, 0, radius, 0, Math.PI * 2);
      c.clip();

      if (useProcedural) {
        c.drawImage(procTex, -radius, -radius, radius * 2, radius * 2);
      } else {
        c.drawImage(img, -radius, -radius, radius * 2, radius * 2);
      }

      c.restore();

      animId = requestAnimationFrame(anim);
    }

    anim();

    return () => cancelAnimationFrame(animId);
  }, [moonId, moonName, imagePath, diameter, size]);

  return <canvas ref={canvasRef} className={className} style={{ width: size, height: size }} />;
}
