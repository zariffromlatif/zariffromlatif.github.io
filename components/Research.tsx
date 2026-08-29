import {
  publications,
  selfAuthor,
  type Publication,
} from "@/content/publications";
import { researchInterests } from "@/content/skills";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionLabel";

function Authors({ authors }: { authors: string[] }) {
  return (
    <span className="text-ink-muted">
      {authors.map((a, i) => {
        const isSelf =
          a === selfAuthor ||
          a.toLowerCase().includes("zarif") ||
          a.toLowerCase().includes("latif");
        return (
          <span key={i}>
            <span className={isSelf ? "font-medium text-ink" : undefined}>
              {a}
            </span>
            {i < authors.length - 1 ? ", " : ""}
          </span>
        );
      })}
    </span>
  );
}

function PubLinks({ links }: { links: Publication["links"] }) {
  const entries = (
    [
      ["paper", links.paper, "PDF"],
      ["arxiv", links.arxiv, "arXiv"],
      ["code", links.code, "Code"],
    ] as const
  ).filter(([, href]) => href);

  if (entries.length === 0) return null;
  return (
    <span className="ml-1 inline-flex gap-3 font-mono text-xs">
      {entries.map(([key, href, label]) => (
        <a
          key={key}
          href={href as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-soft underline-offset-4 hover:underline"
        >
          [{label}]
        </a>
      ))}
    </span>
  );
}

function PubEntry({ pub, n }: { pub: Publication; n: number }) {
  return (
    <Reveal delay={n * 0.04}>
      <article className="grid gap-3 border-t border-base-200/60 py-7 md:grid-cols-12">
        <div className="font-mono text-xs text-ink-faint md:col-span-2">
          {pub.year}
          {pub.note && (
            <span className="ml-2 rounded bg-accent/10 px-1.5 py-0.5 text-[10px] text-accent-soft md:ml-0 md:mt-2 md:block md:w-fit">
              {pub.note}
            </span>
          )}
        </div>
        <div className="md:col-span-10">
          <h3 className="text-pretty font-serif text-lg font-light leading-snug text-ink">
            {pub.title}
          </h3>
          <p className="mt-1.5 text-sm">
            <Authors authors={pub.authors} />
          </p>
          <p className="mt-1 text-sm">
            <span className="italic text-ink-muted">{pub.venue}</span>
            <PubLinks links={pub.links} />
          </p>
          {pub.award && (
            <p className="mt-2 font-mono text-xs text-accent">★ {pub.award}</p>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function Research() {
  const selected = publications.filter((p) => p.selected);
  const rest = publications.filter((p) => !p.selected);
  const ordered = [...selected, ...rest];

  return (
    <SectionShell id="research" index="04" label="Research">
      <Reveal>
        <p className="mb-4 max-w-2xl font-serif text-2xl font-light leading-snug text-ink sm:text-3xl">
          Peer-reviewed and in-progress work in machine learning.
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mb-10 max-w-2xl text-pretty leading-relaxed text-ink-muted">
          My research centers on {researchInterests.slice(0, -1).join(", ")}
          {researchInterests.length > 1 ? ", and " : ""}
          {researchInterests[researchInterests.length - 1]?.toLowerCase()}.
        </p>
      </Reveal>

      <div>
        {ordered.map((p, i) => (
          <PubEntry key={p.title} pub={p} n={i} />
        ))}
      </div>
    </SectionShell>
  );
}
