"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content/sections";

// Fixed vertical "index" rail on desktop; a slim top progress bar on mobile.
// Active section is tracked with IntersectionObserver.
export function Nav() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry most in view near the top.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: vertical index rail */}
      <nav
        aria-label="Section navigation"
        className="fixed left-0 top-0 z-30 hidden h-screen w-32 flex-col justify-center gap-1 pl-6 lg:flex"
      >
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={isActive ? "true" : undefined}
              className="group flex items-center gap-3 py-1.5 font-mono text-xs tracking-wide outline-none"
            >
              <span
                className={`transition-colors ${
                  isActive ? "text-accent" : "text-ink-faint"
                }`}
              >
                {s.index}
              </span>
              <span
                className={`h-px transition-all duration-300 ${
                  isActive
                    ? "w-6 bg-accent"
                    : "w-3 bg-base-200 group-hover:w-5 group-hover:bg-ink-faint"
                }`}
                aria-hidden
              />
              <span
                className={`transition-colors ${
                  isActive
                    ? "text-ink"
                    : "text-ink-faint group-hover:text-ink-muted"
                }`}
              >
                {s.label}
              </span>
            </a>
          );
        })}
        <a
          href="/blog"
          className="group mt-2 flex items-center gap-3 border-t border-base-200/40 pt-3 py-1.5 font-mono text-xs tracking-wide outline-none"
        >
          <span className="text-accent">07</span>
          <span
            className="h-px w-3 bg-base-200 transition-all duration-300 group-hover:w-5 group-hover:bg-accent"
            aria-hidden
          />
          <span className="text-ink-muted transition-colors group-hover:text-ink">
            Writing ↗
          </span>
        </a>
      </nav>

      {/* Mobile: top bar with ⌘K hint */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-base-200/60 bg-base/80 px-5 py-3 backdrop-blur lg:hidden">
        <a href="#index" className="font-mono text-xs tracking-widest text-ink-muted">
          {sections.find((s) => s.id === active)?.index ?? "01"}
          <span className="mx-2 text-accent">/</span>
          {sections.find((s) => s.id === active)?.label ?? "Index"}
        </a>
        <div className="flex items-center gap-4">
          <a
            href="/blog"
            className="font-mono text-xs text-accent transition-colors hover:text-accent-soft"
          >
            Writing ↗
          </a>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            ⌘K
          </span>
        </div>
      </div>
    </>
  );
}
