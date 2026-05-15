import type { GlossaryEntry } from "@/lib/glossary";

export const x402: GlossaryEntry = {
  slug: "x402",
  term: "x402",
  shortDef:
    "An open HTTP standard that lets a server respond with status 402 “Payment Required” and a machine-readable instruction set so an AI agent can pay and retry the request automatically.",
  aliases: ["HTTP 402", "x402 protocol", "x402 payments"],
  category: "protocol",
  keywords: [
    "x402",
    "x402 protocol",
    "HTTP 402",
    "pay-per-request API",
    "machine-payable API",
    "x402 Solana",
    "agent payments",
    "402 Payment Required",
  ],
  seeAlso: ["machine-payments-protocol", "agentic-banking", "agent-wallet"],
  blocks: [
    {
      type: "p",
      text: "**x402** is an open HTTP standard that revives the long-dormant `402 Payment Required` status code so that any HTTP endpoint can charge for individual requests. When a client (typically an AI agent) hits a paid endpoint, the server replies with a `402` response containing a machine-readable payment instruction — currency, amount, recipient, accepted chains, payment reference. The client pays, retries the request with proof of payment, and gets the response.",
    },
    {
      type: "h2",
      id: "why-it-matters",
      text: "Why it matters for AI agents",
    },
    {
      type: "p",
      text: "Traditional API monetization assumes a human creates an account, gets an API key, and pays monthly. AI agents don’t fit that model — they discover endpoints at runtime, transact in micro-amounts, and shouldn’t share a single API key across an entire fleet of agents. x402 collapses signup, billing, and authentication into one round-trip per call.",
    },
    {
      type: "ul",
      items: [
        "**No accounts, no API keys.** The payment itself is the authorization.",
        "**Per-request pricing.** Charge fractions of a cent for a single LLM completion or data lookup.",
        "**Chain-agnostic.** A server can accept USDC on Solana, USDC on Base, or any other rail it lists in the 402 response.",
        "**Agent-native.** Designed to be parsed by software, not humans.",
      ],
    },
    {
      type: "h2",
      id: "how-it-relates-to-solobank",
      text: "How it relates to Solobank",
    },
    {
      type: "p",
      text: "Solobank’s [Machine Payments Protocol](/glossary/machine-payments-protocol) is the Solana implementation of the x402 pattern. When a Solobank-equipped agent hits an MPP-protected endpoint, the SDK handles the 402 negotiation, signs a USDC transfer, and retries — typically in under a second. From the agent’s code, paying for an API call looks like any other `fetch()`.",
    },
    {
      type: "code",
      lang: "ts",
      content: `import { Solobank } from "@solobank/sdk";
const agent = await Solobank.create();
const result = await agent.pay({
  url: "https://api.example.com/llm",
  body: { prompt: "..." },
  maxPrice: 0.01,
});`,
    },
  ],
};
