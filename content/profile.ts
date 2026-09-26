// TODO: Replace all placeholder values with your real details.
// This single file drives the hero, about, contact, and SEO metadata.

export type RoleItem = {
  label: string;
  company?: string;
  href?: string;
};

export const profile = {
  name: "Zarif Latif",
  // Shown as a rotating set of identities in the hero
  roles: [
    { label: "Founder @", company: "Railo", href: "https://www.railo.dev" },
    { label: "Software Engineer" },
    { label: "AI Researcher" },
  ] as RoleItem[],
  // One-line positioning statement — your "tagline"
  tagline: "I build intelligent systems — from research to production.",
  // 2-3 sentence editorial bio for the About section
  bio: [
    "I’m a software engineer and AI researcher working at the intersection of artificial intelligence, software engineering, cybersecurity, and formal methods. My research spans machine learning, language models, mechanistic interpretability, adversarially robust security, reinforcement learning, program analysis, automated program repair, and SMT-based verification. I’m particularly interested in building intelligent systems that are not only capable, but reliable, secure, explainable, and verifiable.",
    "I’m the founder and technical builder of **Railo**, an autonomous DevSecOps system that explores how AI, AST-level program transformation, and formal verification can be combined to automate software security remediation safely. I enjoy taking difficult research problems from first principles and turning them into working systems, and my long-term goal is to advance trustworthy autonomous software by bridging the gap between what AI can generate and what we can rigorously verify.",
  ],
  location: "Dhaka, Bangladesh",
  education: "BSc in Computer Science — BRAC University",
  email: "zarif.latif.biz@gmail.com",
  availability: "Open to select opportunities",
  // Social / professional links — leave a field empty ("") to hide it
  socials: {
    github: "https://github.com/zariffromlatif",
    linkedin: "https://linkedin.com/in/zariflatif",
    twitter: "https://x.com/zariffromlatif",
    googleScholar: "",
    huggingface: "",
  },
  resumeUrl: "/resume.pdf",
} as const;

export type Profile = typeof profile;
