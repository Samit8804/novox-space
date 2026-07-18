import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "space": {
          black: "#050816",
          darker: "#081221",
          dark: "#0D1328",
          light: "#1A2340",
        },
        "nebula": {
          blue: "#1E3A8A",
          purple: "#6D28D9",
          cyan: "#06B6D4",
        },
        "accent": {
          blue: "#3B82F6",
          cyan: "#22D3EE",
          purple: "#A78BFA",
          white: "#F8FAFC",
        },
        "plasma": {
          cyan: "#22D3EE",
        },
        "stellar": {
          gold: "#F59E0B",
        },
        "telemetry": "#14B8A6",
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "sans-serif"],
        body: ["Inter", "Satoshi", "sans-serif"],
        mono: ["JetBrains Mono", "Space Mono", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(3.5rem, 10vw, 8rem)", { lineHeight: "1", fontWeight: "700" }],
        "display-2": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.1", fontWeight: "700" }],
        "display-3": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.2", fontWeight: "600" }],
        "heading": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.3", fontWeight: "600" }],
        "body": ["1rem", { lineHeight: "1.7", fontWeight: "400" }],
        "small": ["0.875rem", { lineHeight: "1.5", fontWeight: "500" }],
        "caption": ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      backdropBlur: {
        "premium": "32px",
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "glow-blue": "0 0 30px rgba(59, 130, 246, 0.3)",
        "glow-cyan": "0 0 30px rgba(34, 211, 238, 0.3)",
        "glow-purple": "0 0 30px rgba(167, 139, 250, 0.3)",
        "card": "0 20px 60px rgba(0, 0, 0, 0.5)",
        "elevated": "0 30px 80px rgba(0, 0, 0, 0.6)",
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "float": "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "drift": "drift 20s linear infinite",
        "spin-slow": "spin 60s linear infinite",
        "meteor": "meteor 8s linear infinite",
        "star": "star 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.2s ease-out",
        "fade-slide-down": "fadeSlideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in": "slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(2deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        meteor: {
          "0%": { transform: "translateX(0) translateY(0)", opacity: "1" },
          "100%": { transform: "translateX(-500px) translateY(500px)", opacity: "0" },
        },
        star: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeSlideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-premium": "linear-gradient(135deg, #3B82F6, #06B6D4, #A78BFA)",
        "gradient-gold": "linear-gradient(135deg, #F59E0B, #FCD34D)",
        "gradient-dark": "linear-gradient(180deg, #050816 0%, #081221 50%, #0D1328 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
