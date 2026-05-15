import type { GlossaryEntry } from "@/lib/glossary";

export const agentWallet: GlossaryEntry = {
  slug: "agent-wallet",
  term: "Agent wallet",
  shortDef:
    "A cryptocurrency wallet whose private key is held by — or scoped to — an AI agent, so the agent can sign payments and on-chain actions inside its own tool loop.",
  aliases: ["AI agent wallet", "autonomous agent wallet"],
  category: "infrastructure",
  keywords: [
    "agent wallet",
    "AI agent wallet",
    "Solana agent wallet",
    "autonomous agent wallet",
    "wallet for AI agents",
    "non-custodial agent wallet",
    "agent keypair",
  ],
  seeAlso: ["non-custodial-wallet", "agentic-banking", "mcp-server"],
  blocks: [
    {
      type: "p",
      text: "An **agent wallet** is a cryptocurrency wallet whose key material the AI agent — not a human operator — uses to sign transactions. The wallet may be fully self-custodied by the agent process, scoped via a smart-account session key, or held in a confidential compute environment the agent can reach. In every case the defining property is the same: the agent transacts under its own identity, not a human’s.",
    },
    {
      type: "h2",
      id: "why-not-a-shared-wallet",
      text: "Why not share a wallet with the operator?",
    },
    {
      type: "ul",
      items: [
        "**Attribution.** A separate wallet means every transaction is provably the agent’s, simplifying accounting, audits, and incident response.",
        "**Blast radius.** A compromised agent can’t drain the operator’s personal funds — only its own balance.",
        "**Multi-agent operations.** Each agent gets its own ledger so you can track profitability, set per-agent limits, and revoke one without touching the others.",
        "**Programmability.** A dedicated wallet can carry policy (per-tx caps, allowlists, daily limits) that doesn’t apply to the operator’s wallet.",
      ],
    },
    {
      type: "h2",
      id: "how-it-relates-to-solobank",
      text: "How Solobank implements it",
    },
    {
      type: "p",
      text: "Solobank generates a Solana Ed25519 keypair for each agent and exposes five typed accounts (Savings, Checking, Credit, Invest, Swap) on top of it. The agent reaches the wallet through the [MCP server](/glossary/mcp-server), the CLI, or the SDK directly. Spending limits, allowlists, and an emergency lock live in the wallet’s policy layer, not in the prompt — so a prompt-injected agent still can’t exceed its budget.",
    },
    {
      type: "code",
      lang: "bash",
      content: `npx -y @solobank/cli@latest init
# wallet saved to ~/.config/solobank/id.json`,
    },
  ],
};
