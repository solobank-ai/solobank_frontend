"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Terminal } from "@/components/ui/Terminal";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { cn } from "@/lib/utils";
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Three.js dotted surface — primary atmospheric layer.
          Pinned to viewport height so the Three.js camera aspect ratio
          tracks the window, not the (possibly taller) section. */}
      <DottedSurface className="absolute inset-x-0 top-0 h-screen" />

      {/* Radial glow on top of the surface — anchors the eye to the center */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "size-[900px] max-w-[90vw] max-h-[90vh]",
          "rounded-full blur-[60px]",
          "bg-[radial-gradient(ellipse_at_center,rgba(153,69,255,0.22)_0%,rgba(20,241,149,0.08)_35%,transparent_65%)]",
        )}
      />

      {/* Soft vignette fade to keep the edges readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(13,13,15,0.8)_100%)]"
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Badge */}
        <Badge variant="purple">{t.hero.badge}</Badge>

        {/* Headline */}
        <h1 className="mt-8 text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.05]">
          {t.hero.headline1}
          <br />
          <span className="gradient-text drop-shadow-[0_0_40px_rgba(153,69,255,0.25)]">
            {t.hero.headline2}
          </span>
        </h1>

        {/* Subline */}
        <p className="mt-6 text-muted text-lg md:text-xl max-w-2xl">
          {t.hero.subline}
        </p>

        {/* Single CTA */}
        <div className="mt-8">
          <Link href="/docs">
            <Button variant="primary" size="lg">
              {t.hero.cta} <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        {/* Install command */}
        <div className="mt-6 flex items-center gap-3 bg-surface/60 backdrop-blur-md border border-border rounded-full px-5 py-2.5 font-mono text-sm shadow-[0_0_40px_rgba(153,69,255,0.08)]">
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

        {/* Terminal */}
        <div className="mt-12 w-full max-w-xl h-[480px] shadow-[0_0_120px_rgba(153,69,255,0.18)]">
          <Terminal lines={t.terminal as unknown as string[]} className="h-full" />
        </div>
      </div>
    </section>
  );
}
