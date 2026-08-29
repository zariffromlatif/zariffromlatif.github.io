// TODO: Replace with your real projects. Mark your best 2-3 as `featured: true`.

export type Project = {
  title: string;
  // Short category label, e.g. "LLM Infrastructure", "Research", "Open Source"
  category: string;
  description: string;
  // Tech / methods used
  stack: string[];
  // Optional links — leave "" to hide
  links: {
    live?: string;
    repo?: string;
    paper?: string;
  };
  // Optional headline metric, e.g. "2.3x faster inference"
  metric?: string;
  year: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Railo — Autonomous DevSecOps & Security Remediation",
    category: "DevSecOps & Formal Methods",
    description:
      "A deterministic vulnerability remediation compiler that detects backend security flaws, synthesizes zero-regression code patches via CST surgery and Microsoft Z3 SMT verification, and opens merge-ready Fix PRs on GitHub without LLM hallucinations. Landed upstream security fixes on tier-1 repositories including HTTPie (34k★), Dagster (16k★), BentoML (8.8k★), and DeepEval (5k★).",
    stack: [
      "Python",
      "LibCST",
      "Microsoft Z3",
      "Semgrep",
      "TypeScript",
      "FastMCP",
      "Docker",
      "PostgreSQL",
    ],
    links: { live: "https://railo.dev" },
    metric: "350k+ ★ Audited · <1ms Proofs",
    year: "2025 – Present",
    featured: true,
  },
  {
    title: "Aetherius — Deterministic Downside-Risk Engine",
    category: "Quantitative Risk & NLP",
    description:
      "Open-source quantitative risk intelligence pipeline that screens concentrated public-equity books against real-time SEC EDGAR filings and global financial news feeds using deterministic scoring taxonomies. Backtested with 100% recall across SVB-2023, Wirecard-2020, and FTX-2022 with a median lead time of 2.48 days and 0 false positives.",
    stack: [
      "Python 3.12",
      "SEC EDGAR API",
      "GDELT DOC 2.0",
      "FastAPI",
      "Pytest (Hypothesis)",
      "Docker",
    ],
    links: {
      repo: "https://github.com/zariffromlatif/Aetherius",
      paper:
        "https://github.com/zariffromlatif/Aetherius/blob/main/docs/working_paper/detection_timing_backtest_2026-07.md",
    },
    metric: "100% Recall · 2.48d Lead Time",
    year: "2026",
    featured: true,
  },
  {
    title: "SignalForge — Generative Engine Optimization (GEO)",
    category: "AI Engineering & Multi-Agent",
    description:
      "An open-source Generative Engine Optimization (GEO) and AI Share-of-Voice measurement framework. Measures how AI answer engines (ChatGPT, Claude, Perplexity) rank and cite B2B brands, and deploys autonomous multi-platform earned-media squads to seed LLM training and RAG retrieval pipelines.",
    stack: [
      "Python 3.11",
      "FastAPI",
      "React (Vite)",
      "PostgreSQL",
      "Llama 3.1",
      "Ollama",
      "Groq",
      "Docker",
    ],
    links: {
      repo: "https://github.com/zariffromlatif/SignalForge",
    },
    metric: "0% → 40%+ AI Citation Rate",
    year: "2025",
    featured: true,
  },
];
