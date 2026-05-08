import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs — CLI, SDK & MCP Server for AI Agents on Solana",
  description:
    "Quickstart guide for the Solobank CLI, TypeScript SDK and MCP server. Give your AI agent a Solana wallet, fund it, earn yield, and pay for APIs in USDC — in under a minute.",
  keywords: [
    "Solobank docs",
    "Solana CLI",
    "AI agent SDK",
    "MCP server",
    "Model Context Protocol",
    "x402 payments",
    "agent quickstart",
  ],
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Solobank Docs — CLI, SDK & MCP Server",
    description:
      "Quickstart for the Solobank CLI, TypeScript SDK and MCP server. Wallets and payments for AI agents on Solana.",
    url: "/docs",
    type: "article",
  },
  twitter: {
    title: "Solobank Docs — CLI, SDK & MCP Server",
    description:
      "Quickstart for the Solobank CLI, TypeScript SDK and MCP server.",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <>{children}</>;
}
