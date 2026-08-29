// TODO: Replace with your real publications. This single file drives the
// Research section. Mark a few standouts with `selected: true`.
//
// Author convention: put your own name exactly as `profile.name` (or a short
// form) so it can be bolded automatically in the Research component.

export type Publication = {
  authors: string[];
  title: string;
  // Venue, e.g. "NeurIPS 2025", "Proceedings of ...", "arXiv preprint"
  venue: string;
  year: string;
  links: {
    paper?: string;
    code?: string;
    arxiv?: string;
  };
  // Optional one-line note, e.g. "Spotlight", "Under review"
  note?: string;
  // Optional honor, e.g. "Best Paper Award"
  award?: string;
  selected?: boolean;
};

// The name to bold within author lists. Keep in sync with content/profile.ts.
export const selfAuthor = "Md. Zarif Latif";

export const publications: Publication[] = [
  {
    authors: ["Md. Zarif Latif", "Kazi Tasfin Mahmud"],
    title:
      "VeriPatch: A Verification-Gated Neuro-Symbolic Framework for Secure Program Repair",
    venue: "ACM Transactions on Software Engineering and Methodology (TOSEM)",
    year: "2026",
    links: { paper: "", arxiv: "", code: "" },
    note: "Under Review · ACM TOSEM (CORE A*)",
    award: "ACM Artifact Badges Candidate",
    selected: true,
  },
  {
    authors: ["Md. Zarif Latif"],
    title:
      "Prescriptive Graph Bandits: Safe Causal Policy Learning via Counterfactual Graph Neural Networks and Distributional Offline Reinforcement Learning",
    venue: "Knowledge-Based Systems (Elsevier, JCR Q1)",
    year: "2026",
    links: { paper: "", arxiv: "", code: "" },
    note: "Working Paper · Target: KBS (Q1)",
    selected: true,
  },
  {
    authors: ["Md. Zarif Latif", "Tasneem Tuhfa"],
    title:
      "Lightweight Explainable Static Malware Detection with Temporal Generalization and Adversarial Robustness",
    venue:
      "Journal of Information Security and Applications (Elsevier JISA)",
    year: "2026",
    links: { paper: "", arxiv: "", code: "" },
    note: "Working Paper · Ready for Submission",
    selected: true,
  },
  {
    authors: ["Md. Zarif Latif"],
    title:
      "The Tokenization Ceiling: Why Induction Heads Fail for Bengali Despite Being Language-Agnostic at the Token Level",
    venue:
      "Transactions of the Association for Computational Linguistics (TACL)",
    year: "2026",
    links: { paper: "", arxiv: "", code: "" },
    note: "Working Paper · In Preparation for TACL",
    selected: true,
  },
];
