import type { BlogPost } from "@/lib/blog";

export const solobankVsMeow: BlogPost = {
  slug: "solobank-vs-meow",
  title: "Solobank vs Meow: AI Agent Banking Compared (2026)",
  description:
    "A side-by-side comparison of Solobank and Meow Technologies — the two leading bank-account products for AI agents. Custody, rails, KYC, geography, and which one to choose.",
  excerpt:
    "Solobank and Meow both pitch themselves as “the bank account for AI agents,” but they make opposite architectural bets. Here’s a clean, honest comparison — and which one fits your agents.",
  date: "2026-05-15",
  readingMinutes: 8,
  ogImage: "/og.png",
  tags: ["Comparison", "AI Agents", "Banking"],
  keywords: [
    "solobank vs meow",
    "meow vs solobank",
    "meow technologies review",
    "ai agent banking comparison",
    "meow alternative",
    "non-custodial vs custodial agent banking",
    "bank account for ai agents",
  ],
  blocks: [
    {
      type: "p",
      text: "**[Solobank](/) and [Meow Technologies](https://www.meow.com)** are the two products most often named when builders ask “how do I give my AI agent a bank account?” They sound similar on the homepage and target the same buyer — a developer or small team running autonomous agents that need to send and receive money. Under the hood they make opposite architectural bets. This piece is a clean, honest comparison so you can pick the right one (or both).",
    },

    { type: "h2", id: "tldr", text: "TL;DR" },
    {
      type: "ul",
      items: [
        "**Pick Meow** if your agent pays U.S. fiat bills (SaaS, vendors, payroll), needs an FDIC-insured business checking account, or already has a U.S. business entity behind it.",
        "**Pick Solobank** if your agent transacts on-chain, pays per-request APIs, settles with other agents, lives outside the U.S., or you don’t want a third party able to freeze the account.",
        "**Pick both** if you run a production agent at any real scale — fiat in via Meow, agent-to-agent and machine-payable APIs via Solobank, with a treasury function moving funds between them.",
      ],
    },

    { type: "h2", id: "what-each-one-is", text: "What each one actually is" },

    { type: "h3", id: "meow", text: "Meow Technologies" },
    {
      type: "p",
      text: "Meow is a **custodial** U.S. business banking product positioned for AI agents. The legal account holder is a U.S. legal entity (LLC or C-Corp) that you, the human, control. Meow holds the funds, issues cards, runs ACH and wire rails, and exposes an API the agent calls. Spending guardrails — per-day caps, recipient allowlists, approval flows — live in Meow’s policy layer. Works with Claude, Cursor, ChatGPT and other agent runtimes through Meow’s SDK and connectors.",
    },

    { type: "h3", id: "solobank", text: "Solobank" },
    {
      type: "p",
      text: "Solobank is a **non-custodial** agent banking product on Solana. The agent holds its own [Solana keypair](/glossary/agent-wallet); Solobank never holds funds or keys. Five typed accounts (Savings, Checking, Credit, Invest, Swap) are exposed on top of the same wallet, denominated in USDC. Payments to other agents and to [MPP-protected](/glossary/machine-payments-protocol) APIs settle in under a second. An [MCP server](/glossary/mcp-server) ships out of the box so Claude/Cursor/Windsurf agents can use the account with zero glue code.",
    },

    { type: "h2", id: "feature-by-feature", text: "Feature-by-feature" },

    { type: "h3", id: "custody", text: "Custody" },
    {
      type: "p",
      text: "**Meow:** custodial — the institution holds the funds and can freeze the account.<br/>**Solobank:** [non-custodial](/glossary/non-custodial-wallet) — only the agent’s keypair can move funds; nobody, including the Solobank team, can freeze it.",
    },

    { type: "h3", id: "kyc", text: "KYC and account opening" },
    {
      type: "p",
      text: "**Meow:** real business KYC on the U.S. legal entity behind the agent. Typically 1–3 days.<br/>**Solobank:** no KYC. Generate keypair, fund with USDC, start transacting. Minutes.",
    },

    { type: "h3", id: "geography", text: "Geography" },
    {
      type: "p",
      text: "**Meow:** U.S. only (operator must have a U.S. entity).<br/>**Solobank:** global by default. Anywhere Solana is reachable.",
    },

    { type: "h3", id: "rails", text: "Payment rails" },
    {
      type: "p",
      text: "**Meow:** ACH, wire, virtual and physical cards, invoicing.<br/>**Solobank:** USDC on Solana, [x402](/glossary/x402) / Machine Payments Protocol, Jupiter swaps, Kamino + marginfi lending. No fiat rails directly — use a custodial on-ramp.",
    },

    { type: "h3", id: "settlement", text: "Settlement time" },
    {
      type: "p",
      text: "**Meow:** seconds to days depending on rail (instant on internal, ACH 1–3 days, wire same-day).<br/>**Solobank:** sub-second on every payment (Solana finality).",
    },

    { type: "h3", id: "guardrails", text: "Guardrails" },
    {
      type: "p",
      text: "**Meow:** enforced server-side by Meow — per-tx caps, daily limits, allowlists, approval flows.<br/>**Solobank:** enforced in the wallet’s policy layer — `maxAmountPerTx`, `maxDailySend`, emergency lock, allowlists. Same surface, different trust model.",
    },

    { type: "h3", id: "insurance", text: "Insurance" },
    {
      type: "p",
      text: "**Meow:** FDIC insurance via the partner bank (limits apply).<br/>**Solobank:** none. Funds are on-chain. Mitigated by keeping operating balance small and sweeping excess to cold storage.",
    },

    { type: "h3", id: "ai-agent-integration", text: "AI agent integration" },
    {
      type: "p",
      text: "**Meow:** SDK and direct integrations with Claude, Cursor, ChatGPT. Web dashboard for human review.<br/>**Solobank:** `@solobank/sdk` (TypeScript), `@solobank/cli`, and `@solobank/mcp` (Model Context Protocol stdio server) — works with every MCP-compatible runtime out of the box.",
    },

    { type: "h3", id: "pricing", text: "Pricing" },
    {
      type: "p",
      text: "**Meow:** business banking pricing — see meow.com for current plans.<br/>**Solobank:** free SDK, CLI, and MCP server. You pay Solana network fees (fractions of a cent per transaction) and your own RPC if you outgrow the public endpoint.",
    },

    { type: "h2", id: "when-to-choose-which", text: "When to choose which" },

    { type: "h3", id: "choose-meow", text: "Choose Meow when" },
    {
      type: "ul",
      items: [
        "Your agent pays human-issued invoices in U.S. fiat.",
        "You need a card to give to a sub-agent or a SaaS subscription.",
        "Your accounting requires FDIC-insured accounts.",
        "Your operator entity is U.S.-incorporated and KYC isn’t a blocker.",
      ],
    },

    { type: "h3", id: "choose-solobank", text: "Choose Solobank when" },
    {
      type: "ul",
      items: [
        "Your agent transacts on-chain or with other agents.",
        "Your agent consumes pay-per-request APIs (x402 / MPP endpoints).",
        "You operate outside the U.S. or your agent has no human operator entity.",
        "You can’t tolerate any third party being able to halt your agent.",
        "You want yield on idle balance and instant swap routing baked in.",
      ],
    },

    { type: "h3", id: "use-both", text: "Use both when" },
    {
      type: "p",
      text: "Most production agents at scale end up running both. The pattern: keep a Meow account for fiat-facing work (paying vendors, receiving customer invoices), a Solobank wallet for agent-to-agent and machine-payable APIs, and a small treasury function (a few cron jobs or a dedicated agent) moving funds between them based on policy. The two products aren’t direct substitutes — they cover the two halves of the agent economy.",
    },

    { type: "h2", id: "faq", text: "FAQ" },
    {
      type: "faq",
      q: "Can a Meow agent use Solobank for on-chain payments?",
      a: "Yes. The two products don’t conflict. Run them as separate accounts and bridge USDC between them when needed.",
    },
    {
      type: "faq",
      q: "Is Solobank a Meow alternative for U.S. businesses?",
      a: "Only partly. Solobank doesn’t issue cards, doesn’t run ACH or wire, and isn’t FDIC-insured. If you need any of those, you need a custodial fiat product — Meow or equivalent. Solobank covers the on-chain and agent-to-agent half.",
    },
    {
      type: "faq",
      q: "Can I open a Solobank account without a U.S. entity?",
      a: "Yes — Solobank is non-custodial and has no KYC. Anywhere Solana is reachable, you can run it.",
    },
    {
      type: "faq",
      q: "Which one is safer if my agent gets prompt-injected?",
      a: "Both products keep guardrails (caps, allowlists, approval thresholds) at the infrastructure layer, not in the prompt — so a prompt-injected agent can’t exceed its budget. The difference is failure mode: a Meow account can be frozen by the institution if compromise is detected; a Solobank wallet can have its policy tightened or be locked via emergency lock, but funds in the live wallet can be drained if keys leak. Production setups mitigate this by keeping the live balance small.",
    },

    { type: "h2", id: "the-bigger-picture", text: "The bigger picture" },
    {
      type: "p",
      text: "Both teams are betting on the same future — that AI agents will own balance sheets and transact under their own identity — but from different starting points. Meow extends the regulated U.S. banking stack into agent-readiness. Solobank treats agent commerce as a Solana-native problem and builds the stablecoin / MPP / MCP layer first. The two roadmaps will keep converging on features (cards on Solobank, on-chain rails on Meow), but the underlying custody model is a fixed point that determines who the right buyer is.",
    },
    {
      type: "p",
      text: "For a fuller picture of the category, see our [guide to bank accounts for AI agents](/blog/bank-account-for-ai-agents).",
    },
  ],
};
