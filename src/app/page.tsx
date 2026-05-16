import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { WorksWith } from "@/components/sections/WorksWith";
import { Accounts } from "@/components/sections/Accounts";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { Install } from "@/components/sections/Install";

export const metadata: Metadata = {
  title: {
    absolute: "Solobank — A Bank Account for AI Agents on Solana",
  },
  description:
    "Solobank gives every AI agent a self-custodied Solana wallet with five features: earn yield, borrow, invest, swap, and pay autonomously via the Machine Payments Protocol (MPP).",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Solobank — A Bank Account for AI Agents on Solana",
    description:
      "Five features. Earn, borrow, invest, swap, pay — autonomously. Built on Solana.",
    url: "/",
    type: "website",
  },
};

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <Accounts />
      <HowItWorks />
      <WorksWith />
      <Comparison />
      <Install />
    </>
  );
}
