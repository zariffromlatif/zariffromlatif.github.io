"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { profile } from "@/content/profile";

const roles = profile.roles;

export function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section
      id="index"
      aria-labelledby="index-heading"
      className="relative flex min-h-screen items-center px-6 pt-24 sm:px-10 lg:pl-40 lg:pr-16"
    >
      <div className="mx-auto w-full max-w-content">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint"
        >
          <span className="text-accent">01</span>
          <span className="h-px w-8 bg-base-200" aria-hidden />
          <span>Index</span>
        </motion.div>

        <motion.h1
          id="index-heading"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-light leading-[0.95] tracking-tightest text-ink sm:text-7xl lg:text-8xl"
        >
          {profile.name}
        </motion.h1>

        {/* Rotating role line */}
        <div className="mt-6 flex h-8 items-center font-mono text-sm uppercase tracking-[0.18em] sm:text-base">
          <span className="mr-3 text-accent">▹</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={i}
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center"
            >
              {roles[i].href && roles[i].company ? (
                <span className="inline-flex items-center">
                  <span className="mr-2 text-ink">{roles[i].label}</span>
                  <a
                    href={roles[i].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent-soft hover:decoration-accent"
                  >
                    {roles[i].company}
                  </a>
                </span>
              ) : (
                <span className="text-ink">{roles[i].label}</span>
              )}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-xl text-balance font-serif text-2xl font-light italic leading-snug text-ink-muted sm:text-3xl"
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-glow"
          >
            Get in touch
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full border border-base-200 px-6 py-3 text-sm text-ink-muted transition-colors hover:border-ink-faint hover:text-ink"
            >
              Résumé
            </a>
          )}
          {profile.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-base-200 px-6 py-3 text-sm text-ink-muted transition-colors hover:border-ink-faint hover:text-ink"
            >
              GitHub
            </a>
          )}
          <a
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-6 py-3 text-sm text-accent-soft transition-colors hover:border-accent hover:bg-accent/10 hover:text-white"
          >
            Writing ↗
          </a>

          {profile.availability && (
            <span className="inline-flex items-center gap-2 px-2 py-3 text-sm text-ink-faint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </span>
          )}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint sm:block">
        Scroll
      </div>
    </section>
  );
}
