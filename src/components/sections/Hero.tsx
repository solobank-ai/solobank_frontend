"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Terminal } from "@/components/ui/Terminal";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";

const INSTALL_CMD = "npx -y @solobank/cli@latest init";

// Phrases the particle headline cycles through. Keep each short enough to
// render legibly at the canvas size we give it (~8–12 chars per line).
const HEADLINE_PHRASES = [
  "A bank account\nfor AI agents",
  "Earn · Borrow\nInvest · Pay",
  "Built on\nSolana",
];

export function Hero(): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-16 xl:pt-32 xl:pb-20 min-h-[640px] xl:min-h-[720px] flex items-center">
      {/* Three.js dotted surface — primary atmospheric layer.
          Pinned to viewport height so the Three.js camera aspect ratio
          tracks the window, not the (possibly taller) section. */}
      <DottedSurface className="absolute inset-x-0 top-0 h-screen" />

      {/* Particle text effect headline — rasterised as a full-section
          backdrop layer. The canvas spans the entire hero so scatter
          particles can fly across the whole screen, but `maxFontSize`
          hard-caps the rasterised letters at ~90 px so the visible
          headline text stays the same size as before. A radial CSS
          mask feathers the canvas edges into the surrounding atmosphere.
          This element is absolutely positioned so it does NOT affect
          the flex layout below. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 85% at center, black 45%, transparent 95%)",
          maskImage:
            "radial-gradient(ellipse 90% 85% at center, black 45%, transparent 95%)",
        }}
      >
        <ParticleTextEffect words={HEADLINE_PHRASES} maxFontSize={90} />
      </div>

      {/* Radial glow — centered on wide screens, biased left on xl+ */}
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col xl:flex-row xl:items-center gap-10 xl:gap-16">
          {/* ── Left column: CTA + install (headline is a full-hero
              particle backdrop above, not part of this flex row) ─── */}
          <div className="flex-1 min-w-0 flex flex-col items-center xl:items-start text-center xl:text-left">
            <div className="flex flex-col items-center xl:items-start gap-6">
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

          {/* ── Right column (xl+): Terminal ────────────────────────────── */}
          <div className="flex-1 min-w-0 w-full max-w-xl xl:max-w-[560px] mx-auto xl:mx-0 h-[420px] md:h-[460px] xl:h-[520px] shadow-[0_0_120px_rgba(153,69,255,0.18)]">
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
