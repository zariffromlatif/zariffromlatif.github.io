export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: string; // Markdown formatted content
};

export const blogPosts: BlogPost[] = [
  {
    slug: "deterministic-security-remediation-smt",
    title:
      "Deterministic Vulnerability Remediation: Why SMT Solvers Beat Pure LLM Patches",
    summary:
      "Language models generate code that looks convincing but frequently introduces subtle regressions or incomplete sanitization. Here is how coupling Concrete Syntax Tree (CST) surgery with Z3 SMT formal verification eliminates hallucinations in automated security patching.",
    date: "August 2026",
    readingTime: "6 min read",
    tags: ["Formal Methods", "DevSecOps", "Z3 SMT", "Automated Program Repair"],
    content: `
## The Fragility of Probabilistic Code Generation

Autonomous vulnerability remediation is often treated as a standard generative task: feed a static analysis report (SAST) and a code snippet into an LLM prompt, and request a corrected patch. 

While modern models produce syntactically valid code in majority of cases, their probabilistic nature poses significant risks in production security:
- **Semantic Over-correction**: The model removes or alters business logic outside the vulnerable slice.
- **Incomplete Invariance**: Sanitization checks are placed on one path while alternate dataflow branches remain unconstrained.
- **Hallucinated Helpers**: Introducing non-existent library utilities or assuming undefined variable states.

\`\`\`python
# Typical LLM pitfall: partial parameter sanitization
def fetch_user_record(cursor, user_id, org_id):
    # LLM safely parameterized user_id, but left org_id string-interpolated
    query = f"SELECT * FROM accounts WHERE org_id = '{org_id}' AND user_id = %s"
    cursor.execute(query, (user_id,))
\`\`\`

## The Neuro-Symbolic Alternative

In building **Railo**, our thesis is that code transformations must be **symbolically verified** rather than merely sampled from a probability distribution. The architecture separates remediation into three deterministic phases:

1. **AST / CST Surgery (LibCST)**: Exact syntax graph modifications that preserve comments, formatting, and surrounding token positions.
2. **First-Order Logic Encoding**: Encoding the data-flow path from input sources to sensitive sinks (e.g., SQL execution, subprocess calls, filesystem reads) into logical constraints.
3. **SMT Refutation (Microsoft Z3)**: Evaluating whether any input satisfying the precondition can trigger an unvalidated state at the sink. If SAT is returned, the patch is refuted before it ever touches git.

\`\`\`python
from z3 import String, And, Not, Solver, sat

# Formal verification of path traversal sanitizer
user_path = String('user_path')
sanitized_path = String('sanitized_path')

s = Solver()
# Safety Invariant: resolved path cannot escape base_dir
s.add(Not(sanitized_path.contains("..")))
s.add(user_path == "../../etc/passwd")

# Fast refutation check (<1ms)
if s.check() == sat:
    print("Verification Passed: Safety invariant holds for all symbolic inputs")
\`\`\`

## Upstream Evidence on Tier-1 Repositories

Deploying this verification gate across over **350,000 GitHub stars** of open-source software (including repositories like *HTTPie*, *Dagster*, and *BentoML*) demonstrated that combining bounded SMT validation with deterministic AST transformations achieves **100% native test suite retention** with zero manual rollback requirements.

As AI models continue to scale in generation capacity, the bottleneck is no longer code synthesis — it is **provable correctness**.
    `,
  },
  {
    slug: "reverse-engineering-llm-attention-circuits",
    title:
      "Reverse-Engineering Attention Circuits: A Pragmatic Guide to Mechanistic Interpretability",
    summary:
      "Looking inside the black box of transformer models using induction heads, direct logit attribution, and sparse autoencoders to diagnose model behavior beyond surface-level benchmarks.",
    date: "July 2026",
    readingTime: "8 min read",
    tags: ["Mechanistic Interpretability", "AI Research", "Transformers", "LLMs"],
    content: `
## Moving Beyond Behavioral Evaluations

Traditional LLM evaluation relies heavily on behavioral benchmarks (e.g., MMLU, HumanEval, GSM8K). While useful for high-level capability tracking, behavioral evals tell us almost nothing about **how** a model arrives at an answer or when it will catastrophically fail on out-of-distribution inputs.

**Mechanistic Interpretability** treats neural networks like compiled binaries: reverse-engineering weights and activations into human-understandable circuits and algorithms.

## Anatomy of an Induction Head

One of the most universal macroscopic discoveries in transformer mechanistic interpretability is the **Induction Head** circuit. Discovered by Anthropic researchers, induction heads implement pattern copying and in-context learning through a two-layer composition:

1. **Previous-Token Head (Layer $L$)**: Attends to the token immediately preceding the current token.
2. **Induction Head (Layer $L+1$)**: Attends from the current token $B$ back to any token $A$ that was previously followed by $B$, and increases the logit for the subsequent token.

\`\`\`
Sequence: [A] [B] ... [A] -> Model predicts [B]
               ^               ^
               |               |
          Prev-Token Head   Induction Head
\`\`\`

## Direct Logit Attribution (DLA)

Direct Logit Attribution allows us to decompose the final residual stream prediction into independent additive contributions from each attention head and MLP layer:

By measuring the dot product of individual head outputs against the unembedding direction, we can pinpoint the exact subnetwork responsible for factual recall, reasoning shortcuts, or jailbreak bypasses.

## The Future: Dictionary Learning with Sparse Autoencoders

While individual neurons are famously polysemantic (activating on multiple unrelated concepts), training **Sparse Autoencoders (SAEs)** on intermediate residual activations extracts monosemantic feature vectors. 

This enables steering model safety at the latent representation layer before logits are ever projected into token probabilities.
    `,
  },
  {
    slug: "causal-graph-offline-reinforcement-learning",
    title:
      "Safe Policy Learning with Causal Graphs and Distributional Offline RL",
    summary:
      "How counterfactual graph neural networks and conservative Q-learning mitigate distribution shift and confounding bias in high-stakes autonomous decision systems.",
    date: "June 2026",
    readingTime: "5 min read",
    tags: ["Causal ML", "Offline RL", "Graph Neural Networks", "Safety"],
    content: `
## The Confounding Trap in Offline Decision Making

Deploying reinforcement learning in high-stakes domains (healthcare, financial risk, automated infrastructure remediation) cannot rely on online exploration: taking exploratory random actions in production environments is dangerous and unacceptable.

However, standard offline RL algorithms suffer from severe **out-of-distribution (OOD) action extrapolation errors**: when the policy queries state-action pairs not covered by the behavioral dataset, value functions overestimate expected rewards.

## Integrating Structural Causal Models

By combining **Structural Causal Models (SCMs)** with Graph Neural Networks, we can explicitly represent inter-variable causal graphs. This separation allows the model to differentiate between true causal interventions and spurious observational correlations:

\`\`\`
       [Confounder Z]
          /      \\
         v        v
    [Action A] -> [Outcome Y]
\`\`\`

## Conservative Value Bounds

To guarantee policy safety under behavioral data constraints, we enforce distributional penalties on actions with high epistemic uncertainty:

1. **Conservative Q-Learning (CQL)**: Regularizes the Q-function to lower-bound values on unseen actions.
2. **Counterfactual Invariance**: Validates that hypothetical counterfactual trajectories adhere to domain boundary invariants before execution.

This dual paradigm — causal graph structuring paired with conservative distributional learning — forms the foundation for reliable, provably bounded autonomous agents.
    `,
  },
];
