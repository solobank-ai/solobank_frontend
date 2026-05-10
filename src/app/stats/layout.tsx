import type { Metadata } from "next";
import { BreadcrumbsJsonLd } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Stats — Live Machine Payments on Solana",
  description:
    "Live throughput, request volume and revenue from the Solobank Machine Payments Protocol gateway. Watch AI agents pay for APIs in USDC on Solana in real time.",
  keywords: [
    "MPP stats",
    "Solana payments stats",
    "agent payments",
    "x402 dashboard",
    "USDC volume",
  ],
  alternates: { canonical: "/stats" },
  openGraph: {
    title: "Solobank Stats — Live Agent Payments on Solana",
    description:
      "Live throughput and revenue from agents paying for APIs via the Solobank MPP gateway.",
    url: "/stats",
    type: "website",
  },
  twitter: {
    title: "Solobank Stats — Live Agent Payments on Solana",
    description:
      "Live throughput and revenue from agents paying for APIs via the Solobank MPP gateway.",
  },
};

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Stats", path: "/stats" },
        ]}
      />
      {children}
    </>
  );
}
