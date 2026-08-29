import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/content/blogs";
import { profile } from "@/content/profile";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: `${post.title} — ${profile.name}`,
      description: post.summary,
      type: "article",
    },
  };
}

function renderContent(raw: string) {
  // Simple clean markdown parser for headings, code blocks, lists, and paragraphs
  const lines = raw.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = "";
  let listBuffer: string[] = [];

  const flushList = (key: number) => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="my-6 space-y-2 pl-6 list-disc text-ink-muted">
          {listBuffer.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {formatInline(item)}
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const formatInline = (text: string) => {
    // Bold, inline code, and link formatting
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="rounded bg-base-100 px-1.5 py-0.5 font-mono text-xs text-accent-soft"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Code block toggle
    if (trimmed.startsWith("```")) {
      flushList(idx);
      if (inCodeBlock) {
        elements.push(
          <div
            key={`code-${idx}`}
            className="my-6 overflow-x-auto rounded-lg border border-base-200 bg-base-50 p-4 font-mono text-xs text-ink-muted"
          >
            {codeLang && (
              <div className="mb-2 text-[10px] uppercase tracking-wider text-ink-faint">
                {codeLang}
              </div>
            )}
            <pre>
              <code>{codeBuffer.join("\n")}</code>
            </pre>
          </div>
        );
        codeBuffer = [];
        inCodeBlock = false;
        codeLang = "";
      } else {
        inCodeBlock = true;
        codeLang = trimmed.replace("```", "").trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // List item
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      listBuffer.push(trimmed.slice(2));
      return;
    } else {
      flushList(idx);
    }

    // Headings
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${idx}`}
          className="mt-12 mb-4 font-serif text-2xl font-light tracking-tight text-ink sm:text-3xl"
        >
          {trimmed.slice(3)}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${idx}`}
          className="mt-8 mb-3 font-serif text-xl font-light text-ink"
        >
          {trimmed.slice(4)}
        </h3>
      );
      return;
    }

    // Paragraph
    if (trimmed.length > 0) {
      elements.push(
        <p
          key={`p-${idx}`}
          className="my-4 text-pretty font-sans text-base font-light leading-relaxed text-ink-muted sm:text-lg"
        >
          {formatInline(trimmed)}
        </p>
      );
    }
  });

  flushList(lines.length);

  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="relative z-10 min-h-screen px-6 py-16 sm:px-10 lg:px-24">
      {/* Top back rail */}
      <div className="mx-auto mb-14 flex w-full max-w-3xl items-center justify-between border-b border-base-200/60 pb-6">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-ink"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          <span>All Writing</span>
        </Link>
        <div className="flex items-center gap-3 font-mono text-xs text-ink-faint">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>

      {/* Article Header */}
      <header className="mx-auto w-full max-w-3xl">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-accent/30 bg-accent/5 px-2.5 py-0.5 font-mono text-xs text-accent-soft"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="font-serif text-3xl font-light leading-tight tracking-tightest text-ink sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-6 font-serif text-xl font-light italic leading-relaxed text-ink-muted">
          {post.summary}
        </p>
        <div className="mt-8 flex items-center gap-3 border-t border-base-200/60 pt-6 font-mono text-xs text-ink-faint">
          <span>By {profile.name}</span>
          <span>·</span>
          <span>Founder @ Railo</span>
        </div>
      </header>

      {/* Article Body */}
      <div className="mx-auto mt-10 w-full max-w-3xl text-ink">
        {renderContent(post.content)}
      </div>

      {/* Article Footer & Back CTA */}
      <footer className="mx-auto mt-20 w-full max-w-3xl border-t border-base-200/60 pt-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="font-serif text-lg font-light text-ink">
              Written by {profile.name}
            </h4>
            <p className="mt-1 font-sans text-sm text-ink-muted">
              Software Engineer &amp; AI Researcher · Founder @{" "}
              <a
                href="https://railo.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4"
              >
                Railo
              </a>
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-base-200 px-5 py-2.5 font-mono text-xs text-ink-muted transition-colors hover:border-ink-faint hover:text-ink"
          >
            ← Back to all essays
          </Link>
        </div>
      </footer>
    </article>
  );
}
