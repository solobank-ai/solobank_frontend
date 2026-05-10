"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Terminal } from "@/components/ui/Terminal";
import { useTranslation } from "@/lib/i18n/context";

const INSTALL_CMD = "npx -y @solobank/cli@latest init";

export function Hero(): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="relative overflow-hidden pt-28 pb-16 xl:pt-32 xl:pb-20 min-h-[640px] xl:min-h-[720px]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at center, transparent 40%, rgba(13,13,15,0.8) 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100vh",
        backgroundPosition: "center top",
      }}
    >
      {/* Pure-CSS perspective dotted plane (replaces Three.js DottedSurface).
          GPU-composited animation, zero JS cost on any device. */}
      <div className="dotted-plane" aria-hidden="true" />
      <div className="dotted-plane-tint" aria-hidden="true" />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[900px] max-w-[90vw] max-h-[90vh] rounded-full blur-[60px] bg-[radial-gradient(ellipse_at_center,rgba(153,69,255,0.22)_0%,rgba(20,241,149,0.08)_35%,transparent_65%)]"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col xl:flex-row xl:items-center gap-10 xl:gap-16">
          {/* Left column: headline + CTA + install command */}
          <div className="flex-1 min-w-0 flex flex-col items-center text-center">
            <h1 className="font-bold tracking-tight leading-[1.1] text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
              <span className="gradient-text-animated">A bank account</span>
              <br />
              <span className="text-foreground">for AI agents</span>
            </h1>
            {/* Long-form description for screen readers / SEO. */}
            <p className="sr-only">
              Solobank — a bank account for AI agents on Solana. Earn, borrow,
              invest, swap, and pay autonomously via the Machine Payments
              Protocol.
            </p>
            <div className="mt-8 flex flex-col items-center gap-6">
              <Link href="/docs">
                <Button variant="primary" size="lg">
                  {t.hero.cta} <ArrowRight size={16} />
                </Button>
              </Link>

              <div className="flex items-center gap-3 bg-surface/60 backdrop-blur-md border border-border rounded-full px-5 py-2.5 font-mono text-sm shadow-[0_0_40px_rgba(153,69,255,0.08)]">
                <span className="text-dim">$</span>
                <span className="text-foreground">{INSTALL_CMD}</span>
                <button
                  onClick={handleCopy}
                  className="text-muted hover:text-solana-green transition-colors ml-1"
                  aria-label="Copy install command"
                >
                  {copied ? (
                    <Check size={14} className="text-solana-green" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right column (xl+): Terminal — fixed 520px height across all
              breakpoints so the typing animation can't reflow the layout. */}
          <div className="xl:flex-1 min-w-0 w-full max-w-xl xl:max-w-[560px] mx-auto h-[520px] max-h-[520px] overflow-hidden shadow-[0_0_120px_rgba(153,69,255,0.18)]">
            <Terminal
              lines={t.terminal as unknown as string[]}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
