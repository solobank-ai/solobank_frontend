"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Terminal } from "@/components/ui/Terminal";
import { GridSpotlight } from "@/components/ui/GridSpotlight";
import { ACCOUNTS, TERMINAL_LINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Hero(): React.ReactElement {
  const handleScroll = (id: string): void => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <GridSpotlight className="min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(153,69,255,0.12)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Badge */}
        <Badge variant="purple">Built on Solana</Badge>

        {/* Headline */}
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          A bank account
          <br />
          <span className="gradient-text">
            for AI agents.
          </span>
        </h1>

        {/* Subline */}
        <p className="mt-6 text-muted text-lg md:text-xl max-w-2xl">
          Five accounts. Earn, borrow, invest, swap, pay — autonomously.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link href="/docs">
            <Button variant="primary" size="lg">
              Get started <ArrowRight size={16} />
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleScroll("#how-it-works")}
          >
            How it works
          </Button>
        </div>

        {/* Account pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          {ACCOUNTS.map((account) => (
            <button
              key={account.type}
              onClick={() => handleScroll("#accounts")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface",
                "text-sm text-muted hover:text-foreground hover:border-border-hover transition-all cursor-pointer"
              )}
            >
              <span>{account.symbol}</span>
              <span>{account.title}</span>
            </button>
          ))}
        </div>

        {/* Terminal */}
        <div className="mt-14 w-full max-w-2xl shadow-[0_0_80px_rgba(153,69,255,0.1)]">
          <Terminal lines={TERMINAL_LINES} />
        </div>
      </div>
    </GridSpotlight>
  );
}
