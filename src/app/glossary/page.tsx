import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BreadcrumbsJsonLd } from "@/components/seo/Breadcrumbs";
import { getAllGlossary } from "@/lib/glossary";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Glossary — Key Terms for AI Agent Banking, Payments, and Wallets",
  description:
    "Definitions of the core terms behind banking and payments for AI agents — x402, Machine Payments Protocol, agentic banking, agent wallet, non-custodial wallet, MCP server, and more.",
  keywords: [
    "AI agent glossary",
    "agentic banking glossary",
    "x402",
    "Machine Payments Protocol",
    "agent wallet",
    "non-custodial wallet",
    "MCP server",
    "agentic finance terms",
  ],
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "Solobank Glossary — AI Agent Banking & Payments",
    description:
      "Definitions of the core terms behind banking and payments for AI agents.",
    url: "/glossary",
    type: "website",
  },
};

export default function GlossaryIndex(): React.ReactElement {
  const entries = getAllGlossary();

  const definedTermSetLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Solobank Glossary",
    url: `${SITE_URL}/glossary`,
    hasDefinedTerm: entries.map((e) => ({
      "@type": "DefinedTerm",
      name: e.term,
      description: e.shortDef,
      url: `${SITE_URL}/glossary/${e.slug}`,
      inDefinedTermSet: `${SITE_URL}/glossary`,
    })),
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Glossary", path: "/glossary" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetLd) }}
      />

      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Glossary</h1>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            The core terms behind banking and payments for AI agents — short,
            opinionated definitions you can link to.
          </p>
        </header>

        <ul className="space-y-3">
          {entries.map((e) => (
            <li key={e.slug}>
              <Link
                href={`/glossary/${e.slug}`}
                className="block bg-surface border border-border rounded-2xl p-5 hover:border-border-hover transition-colors group"
              >
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h2 className="text-lg font-bold text-foreground group-hover:text-solana-green transition-colors">
                    {e.term}
                  </h2>
                  {e.aliases && e.aliases.length > 0 && (
                    <span className="text-xs text-dim">
                      ({e.aliases.join(", ")})
                    </span>
                  )}
                </div>
                <p className="text-[15px] text-muted leading-relaxed">{e.shortDef}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-solana-green opacity-0 group-hover:opacity-100 transition-opacity">
                  Read definition <ArrowRight size={12} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
