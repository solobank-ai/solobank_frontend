import type { GlossaryEntry } from "@/lib/glossary";

export const nonCustodialWallet: GlossaryEntry = {
  slug: "non-custodial-wallet",
  term: "Non-custodial wallet",
  shortDef:
    "A wallet whose private key is controlled solely by its owner; no third party can freeze, seize, or move the funds.",
  aliases: ["self-custodied wallet", "self-custody wallet"],
  category: "concept",
  keywords: [
    "non-custodial wallet",
    "self-custodied wallet",
    "self-custody",
    "non-custodial AI agent",
    "non-custodial Solana wallet",
    "non-custodial banking",
  ],
  seeAlso: ["agent-wallet", "agentic-banking", "machine-payments-protocol"],
  blocks: [
    {
      type: "p",
      text: "A **non-custodial wallet** is a cryptocurrency wallet in which the private key never leaves the owner’s control. There is no exchange, fintech, or bank that can freeze the account or seize the funds — the trade-off is that key management (backup, rotation, secure storage) becomes the owner’s responsibility.",
    },
    {
      type: "h2",
      id: "custodial-vs-non-custodial",
      text: "Custodial vs. non-custodial, in plain English",
    },
    {
      type: "ul",
      items: [
        "**Custodial** — a third party holds the key. You log in with a username and password. The third party can freeze, reverse, or block transactions. Example: a centralized exchange or a fintech bank account.",
        "**Non-custodial** — you hold the key. You sign every transaction yourself. No one can intervene. Example: a Solana wallet stored on disk or in an HSM.",
      ],
    },
    {
      type: "h2",
      id: "why-it-matters-for-agents",
      text: "Why it matters for AI agents",
    },
    {
      type: "p",
      text: "An [AI agent](/glossary/agent-wallet) with a non-custodial wallet can transact globally, instantly, and without KYC — critical when its counterparties are other agents that don’t have legal identity. The downside is that key compromise is final. Production agent setups mitigate this by keeping only operating funds in the live wallet, sweeping excess to cold storage, and enforcing per-transaction caps at the infrastructure layer.",
    },
    {
      type: "h2",
      id: "how-solobank-uses-it",
      text: "How Solobank uses it",
    },
    {
      type: "p",
      text: "Solobank is non-custodial by default: each agent gets its own Solana keypair stored in `~/.config/solobank/id.json` (or wherever the operator points it). Solobank as a service never holds funds or keys. The five accounts (Savings, Checking, Credit, Invest, Swap) are on-chain positions controlled by that keypair, not balances on a Solobank server.",
    },
  ],
};
