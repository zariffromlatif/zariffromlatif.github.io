import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Near-black editorial base
        base: {
          DEFAULT: "#0A0A0B",
          50: "#16161A",
          100: "#1C1C21",
          200: "#26262D",
        },
        ink: {
          DEFAULT: "#EDEDF0",
          muted: "#A1A1AA",
          faint: "#71717A",
        },
        // Single restrained accent — electric indigo
        accent: {
          DEFAULT: "#6D73FF",
          soft: "#8B90FF",
          glow: "#4F46E5",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        content: "72rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
