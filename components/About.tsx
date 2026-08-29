import { profile } from "@/content/profile";
import { researchInterests } from "@/content/skills";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionLabel";

function renderFormattedBio(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      if (inner.toLowerCase() === "railo") {
        return (
          <a
            key={i}
            href="https://www.railo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent"
          >
            {inner}
          </a>
        );
      }
      return (
        <strong key={i} className="font-medium text-ink">
          {inner}
        </strong>
      );
    }
    return part;
  });
}

export function About() {
  return (
    <SectionShell id="about" index="02" label="About">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <Reveal>
            <div className="space-y-6 text-balance font-serif text-xl font-light leading-relaxed text-ink-muted sm:text-2xl">
              {profile.bio.map((para, idx) => (
                <p key={idx} className={idx === 0 ? "text-ink" : undefined}>
                  {renderFormattedBio(para)}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <aside className="md:col-span-4 md:pl-6">
          <Reveal delay={0.1}>
            <dl className="space-y-6 font-mono text-xs">
              <div>
                <dt className="uppercase tracking-[0.2em] text-ink-faint">
                  Location
                </dt>
                <dd className="mt-1.5 text-sm text-ink">{profile.location}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.2em] text-ink-faint">
                  Status
                </dt>
                <dd className="mt-1.5 text-sm text-ink">
                  {profile.availability}
                </dd>
              </div>
              <div>
                <dt className="mb-2.5 uppercase tracking-[0.2em] text-ink-faint">
                  Research interests
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {researchInterests.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[11px] text-accent-soft"
                    >
                      {r}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </aside>
      </div>
    </SectionShell>
  );
}
