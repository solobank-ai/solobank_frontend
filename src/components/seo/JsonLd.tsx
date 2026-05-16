import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  GITHUB_URL,
  NPM_URL,
} from "@/lib/seo";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    "Solobank is a Solana-native bank account for AI agents — five features that let agents earn, borrow, invest, swap, and pay autonomously.",
  sameAs: [GITHUB_URL, NPM_URL],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_TAGLINE,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Cross-platform (CLI, SDK, MCP server)",
  url: SITE_URL,
  description:
    "Self-custodied Solana wallet and Machine Payments Protocol gateway for AI agents. CLI, TypeScript SDK and MCP server included.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

export function JsonLd(): React.ReactElement {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, softwareApplication],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
