import type { GlossaryEntry } from "@/lib/glossary";

export const agenticBanking: GlossaryEntry = {
  slug: "agentic-banking",
  term: "Agentic banking",
  shortDef:
    "A category of financial products built so AI agents — not humans — can open accounts, hold funds, and move money under programmatic spending rules.",
  aliases: ["AI agent banking", "banking for AI agents"],
  category: "concept",
  keywords: [
    "agentic banking",
    "AI agent banking",
    "bank account for AI agents",
    "agent finance",
    "autonomous agent banking",
    "Anchorage agentic banking",
    "Meow agent banking",
  ],
  seeAlso: ["agent-wallet", "non-custodial-wallet", "machine-payments-protocol"],
  blocks: [
    {
      type: "p",
      text: "**Agentic banking** describes financial accounts and infrastructure designed for software agents instead of human customers. The agent has its own balance, its own spending rules, and a programmatic interface (SDK, API, or [MCP server](/glossary/mcp-server)) that lets it move money inside a tool loop without a human signing each transaction.",
    },
    {
      type: "h2",
      id: "what-makes-an-account-agentic",
      text: "What makes an account “agentic”",
    },
    {
      type: "ul",
      items: [
        "**Programmatic spend** — an API or protocol the agent calls, not a web dashboard.",
        "**Identity** — the account is tied to the agent (or its operator) and produces an audit trail attributable to that agent.",
        "**Guardrails** — per-transaction caps, daily limits, allowlists, and out-of-band approval thresholds enforced at the infrastructure layer, not in the prompt.",
        "**Multiple typed accounts** — operating funds, reserves, credit, investments, separated like a small business.",
        "**Agent-friendly rails** — stablecoins, [x402](/glossary/x402), Machine Payments Protocol, plus optional fiat (ACH, wire, cards).",
      ],
    },
    {
      type: "h2",
      id: "two-camps",
      text: "Custodial and non-custodial camps",
    },
    {
      type: "p",
      text: "Agentic banking products split into two architectures. **Custodial** providers (Meow Technologies, Anchorage Agentic Banking, Oracle’s platform) open real bank accounts on behalf of a legal entity behind the agent — full fiat rails, FDIC insurance, KYC required. **Non-custodial** providers (such as Solobank on Solana) give the agent its own self-custodied wallet exposed as multiple accounts — instant setup, no KYC, global by default, denominated in stablecoins. Production agents often run both.",
    },
    {
      type: "p",
      text: "For a deeper read, see our guide: [What Is a Bank Account for AI Agents?](/blog/bank-account-for-ai-agents).",
    },
  ],
};
