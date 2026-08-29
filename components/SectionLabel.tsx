import { Reveal } from "./Reveal";

type SectionLabelProps = {
  /** "02" */
  index: string;
  /** "About" */
  label: string;
};

// The mono "02 — ABOUT" eyebrow that opens every section, for visual rhythm.
export function SectionLabel({ index, label }: SectionLabelProps) {
  return (
    <Reveal>
      <div className="mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-base-200" aria-hidden />
        <span>{label}</span>
      </div>
    </Reveal>
  );
}

// Consistent outer wrapper: full-height-ish section, shared horizontal padding,
// anchor id, and an accessible label association.
export function SectionShell({
  id,
  index,
  label,
  children,
}: {
  id: string;
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-20 border-t border-base-200/60 px-6 py-24 sm:px-10 md:py-32 lg:pl-40 lg:pr-16"
    >
      <div className="mx-auto w-full max-w-content">
        <SectionLabel index={index} label={label} />
        <h2 id={`${id}-heading`} className="sr-only">
          {label}
        </h2>
        {children}
      </div>
    </section>
  );
}
