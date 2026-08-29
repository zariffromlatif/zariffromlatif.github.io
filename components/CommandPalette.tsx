"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sections } from "@/content/sections";
import { profile } from "@/content/profile";

type Command = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

// ⌘K / Ctrl-K palette: jump to a section, open the resume, or hit a social link.
// Focus-trapped, arrow-navigable, Esc to close.
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  const go = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      close();
    },
    [close]
  );

  const openExternal = useCallback(
    (href: string) => {
      window.open(href, "_blank", "noopener,noreferrer");
      close();
    },
    [close]
  );

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = sections.map((s) => ({
      id: `nav-${s.id}`,
      label: `Go to ${s.label}`,
      hint: s.index,
      run: () => go(s.id),
    }));

    nav.push({
      id: "nav-blog",
      label: "Go to Writing & Research Notes",
      hint: "07",
      run: () => {
        window.location.href = "/blog";
        close();
      },
    });

    const links: Command[] = [];
    if (profile.resumeUrl) {
      links.push({
        id: "resume",
        label: "Open résumé",
        hint: "PDF",
        run: () => openExternal(profile.resumeUrl),
      });
    }
    if (profile.email) {
      links.push({
        id: "email",
        label: "Copy email",
        hint: profile.email,
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          close();
        },
      });
    }
    (Object.entries(profile.socials) as [string, string][])
      .filter(([, href]) => href)
      .forEach(([key, href]) => {
        links.push({
          id: `social-${key}`,
          label: `Open ${key.replace(/^\w/, (c) => c.toUpperCase())}`,
          hint: "↗",
          run: () => openExternal(href),
        });
      });

    return [...nav, ...links];
  }, [go, openExternal, close]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  // Global hotkey
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus input on open; reset cursor when filter changes
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[cursor]?.run();
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <button
        aria-label="Close command palette"
        className="absolute inset-0 cursor-default bg-base/70 backdrop-blur-sm"
        onClick={close}
      />

      <div className="animate-fade-in relative w-full max-w-lg overflow-hidden rounded-xl border border-base-200 bg-base-50/95 shadow-2xl shadow-black/50">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onListKey}
          placeholder="Jump to a section, open a link…"
          className="w-full border-b border-base-200 bg-transparent px-5 py-4 font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none"
        />
        <ul ref={listRef} className="max-h-72 overflow-y-auto py-2" role="listbox">
          {filtered.length === 0 && (
            <li className="px-5 py-6 text-center text-sm text-ink-faint">
              No matches
            </li>
          )}
          {filtered.map((c, i) => (
            <li key={c.id} role="option" aria-selected={i === cursor}>
              <button
                onMouseEnter={() => setCursor(i)}
                onClick={() => c.run()}
                className={`flex w-full items-center justify-between gap-4 px-5 py-2.5 text-left text-sm transition-colors ${
                  i === cursor
                    ? "bg-accent/10 text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <span>{c.label}</span>
                <span className="font-mono text-xs text-ink-faint">{c.hint}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-base-200 px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
          <span>↑↓ navigate · ↵ select</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
