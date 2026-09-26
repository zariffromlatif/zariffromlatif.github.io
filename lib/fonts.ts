// Fonts self-hosted via next/font/local — exposes the three CSS variables that
// tailwind.config.ts references (--font-serif, --font-sans, --font-mono).
//
// Self-hosted deliberately: next/font/google fetches from Google at build time,
// so a Google CSS-format change or a CI network hiccup fails the build and takes
// the site down. Local files make the build hermetic.
import localFont from "next/font/local";

// Distinctive display serif for headlines
export const serif = localFont({
  src: [
    {
      path: "../app/fonts/Fraunces-normal.woff2",
      style: "normal",
      weight: "300 600",
    },
    {
      path: "../app/fonts/Fraunces-italic.woff2",
      style: "italic",
      weight: "300 600",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

// Clean neutral sans for body copy and UI
export const sans = localFont({
  src: [
    { path: "../app/fonts/Inter.woff2", style: "normal", weight: "400 700" },
  ],
  variable: "--font-sans",
  display: "swap",
});

// Mono for labels, chips, and metadata
export const mono = localFont({
  src: [
    {
      path: "../app/fonts/JetBrainsMono-400.woff2",
      style: "normal",
      weight: "400 500",
    },
  ],
  variable: "--font-mono",
  display: "swap",
});

// Convenience: all three variable class names joined
export const fontVariables = `${serif.variable} ${sans.variable} ${mono.variable}`;
