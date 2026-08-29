import { skills } from "@/content/skills";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionLabel";

export function Skills() {
  return (
    <SectionShell id="stack" index="05" label="Stack">
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.06}>
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {group.label}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-pretty text-ink-muted transition-colors hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
