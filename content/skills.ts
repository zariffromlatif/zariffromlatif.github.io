// TODO: Adjust skill groups to match your real expertise.

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "AI & Machine Learning",
    items: [
      "PyTorch & Transformers",
      "LLMs & Alignment (RLHF)",
      "Mechanistic Interpretability",
      "Adversarial Robustness",
      "Model Evaluation & Red-Teaming",
      "Sparse Autoencoders (SAEs)",
      "RAG & Neural Retrieval",
    ],
  },
  {
    label: "Security & Formal Methods",
    items: [
      "Automated Program Repair (APR)",
      "AST Analysis & Rewriting",
      "SMT Verification (Z3)",
      "Static Analysis & SAST",
      "Autonomous DevSecOps",
      "Vulnerability Remediation",
      "Adversarial AI Defense",
    ],
  },
  {
    label: "Languages",
    items: [
      "Python",
      "TypeScript",
      "Rust",
      "C / C++",
      "Go",
      "SQL",
      "Bash / Shell",
    ],
  },
  {
    label: "Systems & Infrastructure",
    items: [
      "Distributed Systems",
      "Docker & Kubernetes",
      "Next.js / React & Tailwind",
      "FastAPI & Microservices",
      "PostgreSQL & Redis",
      "Linux Systems & Toolchains",
      "CI/CD & Cloud (AWS / GCP)",
    ],
  },
];

// Research interests — surfaced near the publications and about sections
export const researchInterests: string[] = [
  "Mechanistic Interpretability",
  "Adversarial Robustness & AI Safety",
  "Formal Verification & SMT Solvers",
  "Automated Program Repair (APR)",
  "AST Program Synthesis & Transformation",
  "Neurosymbolic AI Systems",
];
