// Single source of truth for the page's sections — consumed by the page,
// the side index Nav, and the ⌘K command palette so they never drift.
export type Section = {
  id: string;
  index: string; // "01", "02", ...
  label: string;
};

export const sections: Section[] = [
  { id: "index", index: "01", label: "Index" },
  { id: "about", index: "02", label: "About" },
  { id: "work", index: "03", label: "Selected Work" },
  { id: "research", index: "04", label: "Research" },
  { id: "stack", index: "05", label: "Stack" },
  { id: "contact", index: "06", label: "Contact" },
];
