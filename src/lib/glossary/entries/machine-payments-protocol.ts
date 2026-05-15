import type { GlossaryEntry } from "@/lib/glossary";

export const machinePaymentsProtocol: GlossaryEntry = {
  slug: "machine-payments-protocol",
  term: "Machine Payments Protocol",
  shortDef:
    "An open protocol on Solana that lets HTTP servers charge per request in USDC and lets AI agents pay and verify those requests in under a second.",
  aliases: ["MPP", "Machine Payments Protocol (MPP)"],
  category: "protocol",
  keywords: [
    "machine payments protocol",
    "MPP",
    "MPP Solana",
    "agent-payable API",
    "USDC API payments",
    "pay-per-request Solana",
    "x402 Solana",
    "agent commerce protocol",
  ],
  seeAlso: ["x402", "agentic-banking", "non-custodial-wallet"],
  blocks: [
    {
      type: "p",
      text: "**The Machine Payments Protocol (MPP)** is an open specification for charging HTTP endpoints in stablecoins on Solana. It plugs into the [x402](/glossary/x402) standard: a server returns a `402 Payment Required` response describing the price, the recipient address, and a payment reference; the client pays in USDC on Solana, retries with the transaction signature, and the server verifies on-chain before responding.",
    },
    {
      type: "h2",
      id: "design-goals",
      text: "Design goals",
    },
    {
      type: "ul",
      items: [
        "**Sub-second settlement.** USDC on Solana confirms in well under a second, so paying per API call is not a bottleneck.",
        "**Sub-cent fees.** Network fees stay negligible even on micro-payments.",
        "**No accounts or API keys.** The on-chain payment is the authorization — agents and servers don’t exchange credentials.",
        "**Replay-safe.** Each transaction signature is consumed atomically by the server (e.g. Redis `SETNX`) so a single payment can’t unlock the endpoint twice.",
        "**Open spec.** Any server or client can implement MPP without permission or licensing.",
      ],
    },
    {
      type: "h2",
      id: "how-it-relates-to-solobank",
      text: "How it relates to Solobank",
    },
    {
      type: "p",
      text: "Solobank implements both sides of MPP. The SDK ships a client that handles the 402 → pay → retry loop automatically and a server middleware that verifies on-chain payments and atomically consumes the signature. Solobank’s [agent wallet](/glossary/agent-wallet) signs the payment, the [MCP server](/glossary/mcp-server) exposes it as a tool, and any HTTP endpoint can accept payments with about five lines of code.",
    },
  ],
};
