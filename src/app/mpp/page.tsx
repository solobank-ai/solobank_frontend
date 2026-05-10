import type { Metadata } from "next";
import { MppPage } from "@/components/mpp/MppPage";
import { BreadcrumbsJsonLd } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "MPP — Machine Payments Protocol for AI Agents on Solana",
  description:
    "Accept USDC payments on any API with 5 lines of code. AI agents pay per request on Solana — sub-second settlement, sub-cent fees, no API keys.",
  keywords: [
    "Machine Payments Protocol",
    "MPP",
    "x402 Solana",
    "USDC payments API",
    "AI agent payments",
    "monetize API",
    "pay-per-call API",
    "agent commerce",
  ],
  alternates: { canonical: "/mpp" },
  openGraph: {
    title: "MPP — Machine Payments Protocol for AI Agents on Solana",
    description:
      "Accept USDC payments on any API with 5 lines of code. Sub-second settlement on Solana.",
    url: "/mpp",
    type: "website",
  },
};

export default function Page(): React.ReactElement {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "MPP", path: "/mpp" },
        ]}
      />
      <MppPage />
    </>
  );
}
