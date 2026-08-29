import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/content/blogs";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Writing & Thoughts",
  description:
    "Essays, research notes, and engineering write-ups on AI, formal methods, and software engineering.",
};

export default function BlogIndexPage() {
  return (
    <div className="relative z-10 min-h-screen px-6 py-16 sm:px-10 lg:px-24">
      {/* Top navigation */}
      <div className="mx-auto mb-16 flex w-full max-w-4xl items-center justify-between border-b border-base-200/60 pb-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-ink"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          <span>{profile.name}</span>
          <span className="text-ink-faint">/ Home</span>
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Writing
        </span>
      </div>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-4xl">
        <Reveal>
          <div className="mb-14">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              <span className="text-accent">07</span>
              <span className="h-px w-8 bg-base-200" aria-hidden />
              <span>Articles & Notes</span>
            </div>
            <h1 className="font-serif text-4xl font-light tracking-tightest text-ink sm:text-6xl">
              Writing &amp; Research Notes
            </h1>
            <p className="mt-4 max-w-2xl text-pretty font-serif text-xl font-light text-ink-muted sm:text-2xl">
              Essays on formal verification, mechanistic interpretability,
              autonomous DevSecOps, and software reliability.
            </p>
          </div>
        </Reveal>

        {/* Post list */}
        <div className="divide-y divide-base-200/60 border-t border-base-200/60">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <article className="group relative py-10 transition-colors">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="flex items-center gap-4 font-mono text-xs text-ink-faint">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-base-200 bg-base-50/50 px-2 py-0.5 font-mono text-[10px] text-ink-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="mt-4 font-serif text-2xl font-light text-ink transition-colors group-hover:text-accent-soft sm:text-3xl">
                  <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-ink-muted">
                  {post.summary}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-accent transition-transform group-hover:translate-x-1">
                  <span>Read article</span>
                  <span>→</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </main>
    </div>
  );
}
