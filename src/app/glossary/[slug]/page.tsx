import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BreadcrumbsJsonLd } from "@/components/seo/Breadcrumbs";
import { BlogContent } from "@/components/blog/BlogContent";
import { getAllGlossary, getGlossaryEntry } from "@/lib/glossary";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllGlossary().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);
  if (!entry) return {};

  const url = `/glossary/${entry.slug}`;
  const title = `${entry.term} — What it means and why it matters`;

  return {
    title,
    description: entry.shortDef,
    keywords: entry.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: entry.shortDef,
      url,
      type: "article",
    },
    twitter: {
      title,
      description: entry.shortDef,
    },
  };
}

export default async function GlossaryEntryPage({
  params,
}: RouteParams): Promise<React.ReactElement> {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);
  if (!entry) notFound();

  const url = `${SITE_URL}/glossary/${entry.slug}`;
  const seeAlsoEntries = entry.seeAlso
    .map((s) => getGlossaryEntry(s))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const definedTermLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: entry.term,
    alternateName: entry.aliases,
    description: entry.shortDef,
    inDefinedTermSet: `${SITE_URL}/glossary`,
    url,
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.term,
    description: entry.shortDef,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en",
    keywords: entry.keywords.join(", "),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Glossary", path: "/glossary" },
          { name: entry.term, path: `/glossary/${entry.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <article className="max-w-3xl mx-auto px-6">
        <Link
          href="/glossary"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Glossary
        </Link>

        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-dim mb-3">
            {entry.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{entry.term}</h1>
          {entry.aliases && entry.aliases.length > 0 && (
            <p className="mt-2 text-sm text-dim">
              Also known as: {entry.aliases.join(", ")}
            </p>
          )}
          <p className="mt-5 text-muted text-lg leading-relaxed">{entry.shortDef}</p>
        </header>

        <BlogContent blocks={entry.blocks} />

        {seeAlsoEntries.length > 0 && (
          <section className="mt-14 pt-8 border-t border-border">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-dim mb-4">
              See also
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {seeAlsoEntries.map((e) => (
                <li key={e.slug}>
                  <Link
                    href={`/glossary/${e.slug}`}
                    className="block bg-surface border border-border rounded-xl p-4 hover:border-border-hover transition-colors group"
                  >
                    <span className="text-sm font-semibold text-foreground group-hover:text-solana-green transition-colors">
                      {e.term}
                    </span>
                    <p className="text-xs text-muted mt-1 line-clamp-2">{e.shortDef}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10 bg-surface border border-border rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-foreground mb-2">
            Give your AI agent a bank account on Solana
          </h3>
          <p className="text-muted text-sm mb-4">
            Five accounts, MCP server out of the box, sub-second USDC payments.
          </p>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-sm text-solana-green hover:underline"
          >
            Read the docs <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </div>
  );
}
