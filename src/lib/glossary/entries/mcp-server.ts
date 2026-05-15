import type { GlossaryEntry } from "@/lib/glossary";

export const mcpServer: GlossaryEntry = {
  slug: "mcp-server",
  term: "MCP server",
  shortDef:
    "A server that exposes tools, resources, and prompts to AI agents over the Model Context Protocol (MCP) — Anthropic’s open standard for connecting LLMs to external systems.",
  aliases: ["Model Context Protocol server", "MCP"],
  category: "infrastructure",
  keywords: [
    "MCP server",
    "Model Context Protocol",
    "Anthropic MCP",
    "Claude MCP",
    "Cursor MCP",
    "MCP tools",
    "MCP integration",
    "Solana MCP server",
  ],
  seeAlso: ["agent-wallet", "machine-payments-protocol", "agentic-banking"],
  blocks: [
    {
      type: "p",
      text: "An **MCP server** implements the Model Context Protocol — an open standard introduced by Anthropic — to expose a typed set of tools and resources that any MCP-compatible AI agent (Claude, Cursor, Windsurf, Zed, custom agents) can discover and invoke. The agent calls the server over stdio or HTTP/SSE; the server runs the tool and returns a structured result.",
    },
    {
      type: "h2",
      id: "why-mcp-matters",
      text: "Why MCP matters",
    },
    {
      type: "ul",
      items: [
        "**One protocol, many agents.** A single MCP server works with every compatible client — no per-vendor integration.",
        "**Typed tools.** Each tool has a JSON schema for inputs and outputs, so the agent picks the right one and supplies valid arguments.",
        "**Local trust.** stdio-mode servers run in the agent’s process boundary, so credentials and key material never leave the user’s machine.",
        "**Composable.** Multiple servers can run side-by-side, each contributing tools to the same agent.",
      ],
    },
    {
      type: "h2",
      id: "how-solobank-uses-mcp",
      text: "How Solobank uses MCP",
    },
    {
      type: "p",
      text: "Solobank ships `@solobank/mcp` — a stdio MCP server that exposes the [agent wallet](/glossary/agent-wallet) as 14 typed tools (`solobank_balance`, `solobank_send`, `solobank_pay`, `solobank_swap`, `solobank_lend`, and so on). Drop it into your Claude or Cursor config and the agent can read balances, pay [MPP-protected](/glossary/machine-payments-protocol) endpoints, and earn yield without any glue code.",
    },
    {
      type: "code",
      lang: "json",
      content: `{
  "mcpServers": {
    "solobank": {
      "command": "npx",
      "args": ["-y", "@solobank/mcp"]
    }
  }
}`,
    },
  ],
};
