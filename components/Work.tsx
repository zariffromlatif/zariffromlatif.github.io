import { projects, type Project } from "@/content/projects";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionLabel";

function ProjectLinks({ links }: { links: Project["links"] }) {
  const entries = (
    [
      ["live", links.live, "Live ↗"],
      ["repo", links.repo, "Code ↗"],
      ["paper", links.paper, "Paper ↗"],
    ] as const
  ).filter(([, href]) => href);

  if (entries.length === 0) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
      {entries.map(([key, href, label]) => (
        <a
          key={key}
          href={href as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          {label}
        </a>
      ))}
    </div>
  );
}

function FeaturedCard({ project, n }: { project: Project; n: number }) {
  return (
    <Reveal delay={n * 0.05}>
      <article className="group relative grid gap-6 border-t border-base-200/60 py-10 md:grid-cols-12">
        <div className="font-mono text-sm text-ink-faint md:col-span-1">
          {String(n + 1).padStart(2, "0")}
        </div>
        <div className="md:col-span-7">
          <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {project.category}
          </div>
          <h3 className="font-serif text-2xl font-light text-ink transition-colors group-hover:text-accent-soft sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-xl text-pretty leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <ProjectLinks links={project.links} />
        </div>
        <div className="md:col-span-4 md:text-right">
          {project.metric && (
            <div className="font-serif text-2xl font-light text-gradient">
              {project.metric}
            </div>
          )}
          <div className="mt-1 font-mono text-xs text-ink-faint">
            {project.year}
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 md:justify-end">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded border border-base-200 px-2 py-0.5 font-mono text-[10px] text-ink-muted"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <SectionShell id="work" index="03" label="Selected Work">
      <Reveal>
        <p className="mb-6 max-w-2xl font-serif text-2xl font-light leading-snug text-ink sm:text-3xl">
          A selection of systems I&apos;ve designed, shipped, and researched.
        </p>
      </Reveal>

      <div>
        {featured.map((p, i) => (
          <FeaturedCard key={p.title} project={p} n={i} />
        ))}
      </div>

      {rest.length > 0 && (
        <Reveal>
          <div className="mt-16">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              More
            </h3>
            <ul className="divide-y divide-base-200/60">
              {rest.map((p) => (
                <li
                  key={p.title}
                  className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <span className="text-ink">{p.title}</span>
                    <span className="ml-3 font-mono text-xs text-ink-faint">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-5">
                    <ProjectLinks links={p.links} />
                    <span className="font-mono text-xs text-ink-faint">
                      {p.year}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </SectionShell>
  );
}
