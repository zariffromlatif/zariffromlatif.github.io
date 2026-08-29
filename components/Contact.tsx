import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionLabel";

const SOCIAL_LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "Twitter / X",
  googleScholar: "Google Scholar",
  huggingface: "Hugging Face",
};

export function Contact() {
  const socials = (Object.entries(profile.socials) as [string, string][]).filter(
    ([, href]) => href
  );

  return (
    <SectionShell id="contact" index="06" label="Contact">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <Reveal>
            <h3 className="font-serif text-4xl font-light leading-tight tracking-tightest text-ink sm:text-6xl">
              Let&apos;s build something
              <br />
              <span className="italic text-gradient">worth doing.</span>
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex items-center gap-3 font-mono text-lg text-ink-muted transition-colors hover:text-accent sm:text-xl"
            >
              {profile.email}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>

        <div className="md:col-span-4 md:pl-6">
          <Reveal delay={0.15}>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Elsewhere
            </h4>
            <ul className="space-y-3">
              {socials.map(([key, href]) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-ink"
                  >
                    <span className="text-accent">↗</span>
                    {SOCIAL_LABELS[key] ?? key}
                  </a>
                </li>
              ))}
              {profile.resumeUrl && (
                <li>
                  <a
                    href={profile.resumeUrl}
                    className="group inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-ink"
                  >
                    <span className="text-accent">↗</span>
                    Résumé
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
