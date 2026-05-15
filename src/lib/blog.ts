/* ------------------------------------------------------------------ */
/*  Blog content model + registry                                      */
/* ------------------------------------------------------------------ */

export type InlineText = string;

export type Block =
  | { type: "p"; text: InlineText }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: InlineText[] }
  | { type: "ol"; items: InlineText[] }
  | { type: "code"; lang?: string; content: string }
  | { type: "hr" }
  | { type: "faq"; q: string; a: InlineText };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;             // ISO "YYYY-MM-DD"
  updated?: string;
  readingMinutes: number;
  keywords: string[];
  ogImage?: string;
  tags: string[];
  blocks: Block[];
}

import { bankAccountForAiAgents } from "./blog/posts/bank-account-for-ai-agents";
import { solobankVsMeow } from "./blog/posts/solobank-vs-meow";

export const POSTS: BlogPost[] = [bankAccountForAiAgents, solobankVsMeow];

const POST_BY_SLUG = new Map(POSTS.map((p) => [p.slug, p]));

export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return POST_BY_SLUG.get(slug);
}

export function getAdjacentPosts(slug: string): { prev?: BlogPost; next?: BlogPost } {
  const ordered = getAllPosts();
  const idx = ordered.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx + 1 < ordered.length ? ordered[idx + 1] : undefined,
    next: idx - 1 >= 0 ? ordered[idx - 1] : undefined,
  };
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function extractFaqs(post: BlogPost): Array<{ q: string; a: string }> {
  return post.blocks
    .filter((b): b is Extract<Block, { type: "faq" }> => b.type === "faq")
    .map((b) => ({ q: b.q, a: b.a }));
}
