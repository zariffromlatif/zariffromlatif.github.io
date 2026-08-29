// Fonts loaded via next/font/google, exposing the three CSS variables that
// tailwind.config.ts already references (--font-serif, --font-sans, --font-mono).
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

// Distinctive display serif for headlines
export const serif = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Clean neutral sans for body copy and UI
export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Mono for labels, chips, and metadata
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Convenience: all three variable class names joined
export const fontVariables = `${serif.variable} ${sans.variable} ${mono.variable}`;
