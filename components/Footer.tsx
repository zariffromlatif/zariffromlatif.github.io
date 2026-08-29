import { profile } from "@/content/profile";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-base-200/60 px-6 py-10 sm:px-10 lg:pl-40 lg:pr-16">
      <div className="mx-auto flex w-full max-w-content flex-col items-start justify-between gap-4 font-mono text-xs text-ink-faint sm:flex-row sm:items-center">
        <span>
          © {year} {profile.name}
        </span>
        <span className="hidden sm:inline">
          Built with Next.js · Press{" "}
          <kbd className="rounded border border-base-200 px-1.5 py-0.5 text-ink-muted">
            ⌘K
          </kbd>{" "}
          to navigate
        </span>
        <div className="flex items-center gap-6">
          <a
            href="/blog"
            className="text-ink-muted transition-colors hover:text-accent"
          >
            Writing ↗
          </a>
          <a
            href="#index"
            className="transition-colors hover:text-ink"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
