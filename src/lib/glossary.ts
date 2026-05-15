import type { Block } from "@/lib/blog";

export interface GlossaryEntry {
  slug: string;
  term: string;            // canonical display form, e.g. "Machine Payments Protocol"
  shortDef: string;        // one-sentence definition shown in index + meta description
  aliases?: string[];      // alternate spellings / acronyms ("MPP")
  category: "protocol" | "concept" | "infrastructure";
  keywords: string[];
  seeAlso: string[];       // other glossary slugs
  blocks: Block[];
}

import { x402 } from "./glossary/entries/x402";
import { machinePaymentsProtocol } from "./glossary/entries/machine-payments-protocol";
import { agenticBanking } from "./glossary/entries/agentic-banking";
import { agentWallet } from "./glossary/entries/agent-wallet";
import { nonCustodialWallet } from "./glossary/entries/non-custodial-wallet";
import { mcpServer } from "./glossary/entries/mcp-server";

export const GLOSSARY: GlossaryEntry[] = [
  x402,
  machinePaymentsProtocol,
  agenticBanking,
  agentWallet,
  nonCustodialWallet,
  mcpServer,
];

const BY_SLUG = new Map(GLOSSARY.map((g) => [g.slug, g]));

export function getAllGlossary(): GlossaryEntry[] {
  return [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
}

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return BY_SLUG.get(slug);
}
