import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { profile } from "@/content/profile";
import { Background } from "@/components/Background";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";

const roleNames = profile.roles.map((r) =>
  r.company ? `${r.label} ${r.company}` : r.label
);
const title = `${profile.name} — ${roleNames.join(" · ")}`;
const description = profile.tagline;
const url = "https://zariffromlatif.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    profile.name,
    ...roleNames,
    "AI Researcher",
    "Machine Learning",
    "Formal Methods",
    "DevSecOps",
    "Portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: profile.socials.twitter || undefined,
  },
  robots: { index: true, follow: true },
};

// Structured data so the site reads as a real person to search engines.
function personJsonLd() {
  const sameAs = Object.values(profile.socials).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    description: profile.tagline,
    email: `mailto:${profile.email}`,
    jobTitle: roleNames.join(", "),
    url,
    sameAs,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-base font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <Background />
        <CommandPalette />
        {children}
        <Footer />
      </body>
    </html>
  );
}
