import type { Metadata } from "next";
import { DemosPage } from "@/components/demos/DemosPage";
import { BreadcrumbsJsonLd } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Live Demos — AI Agent Banking on Solana",
  description:
    "Interactive demos of Solobank AI agent banking — real CLI commands, MCP tools, and live output. Watch an AI agent open a wallet, earn yield, and pay for APIs in seconds.",
  keywords: [
    "Solobank demo",
    "AI agent demo",
    "MCP tools demo",
    "Solana wallet demo",
    "agent banking demo",
  ],
  alternates: { canonical: "/demos" },
  openGraph: {
    title: "Solobank Live Demos — AI Agent Banking on Solana",
    description:
      "Interactive demos: CLI commands, MCP tools and live output for AI agents on Solana.",
    url: "/demos",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Demos", path: "/demos" },
        ]}
      />
      <DemosPage />
    </>
  );
}
