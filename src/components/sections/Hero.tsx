"use client";

import { useEffect, useState } from "react";
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
  // Anchor the particle text to a different spot on xl+ vs narrow viewports
  // so it never overlaps with the stacked CTA/install on mobile nor with
  // the side-by-side flex row on desktop.
  const [isXl, setIsXl] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const update = (): void => setIsXl(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // On xl+ anchor the headline at the horizontal centre of the left half
  // of the viewport and in the upper third vertically. The CTA + install
  // pill live in the same left half, horizontally centred and vertically
  // pinned to the middle — that gives a symmetric "text above, CTA below"
  // stack on the left that mirrors the Terminal on the right.
  // On narrow viewports everything stacks top-to-bottom, so we lift the
  // headline as high as we can without clipping it under the nav bar.
  const textAnchor = isXl ? { x: 0.3, y: 0.28 } : { x: 0.5, y: 0.1 };
  const textAlign: "left" | "center" = "center";

  return (
    <section className="relative overflow-hidden pt-28 pb-16 xl:pt-32 xl:pb-20 min-h-[640px] xl:min-h-[720px] flex items-center">
      {/* Three.js dotted surface — primary atmospheric layer.
          Pinned to viewport height so the Three.js camera aspect ratio
          tracks the window, not the (possibly taller) section. */}
      <DottedSurface className="absolute inset-x-0 top-0 h-screen" />

      {/* Particle text effect headline — rasterised as a full-section
          backdrop layer. The canvas spans the entire hero so scatter
          particles can fly across the whole screen, but `maxFontSize`
          hard-caps the rasterised letters at ~80 px so the visible
          headline text stays readable. `textAnchor` positions the
          letters at the horizontal centre of the left half on xl+ so
          they line up with the CTA + install pill below (which are
          also centred in the left column) and the Terminal on the
          right — giving a symmetric composition.
          This element is absolutely positioned so it does NOT affect
          the flex layout. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 90% at center, black 50%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 95% 90% at center, black 50%, transparent 100%)",
        }}
      >
        <ParticleTextEffect
          words={HEADLINE_PHRASES}
          maxFontSize={80}
          textAnchor={textAnchor}
          textAlign={textAlign}
        />
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
          {/* ── Left column: CTA + install, horizontally centred in the
              column on every breakpoint so the block sits symmetrically
              under the particle headline above. ─────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col items-center text-center">
            <div className="flex flex-col items-center gap-6">
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

          {/* ── Right column (xl+): Terminal, centred in its half ────── */}
          <div className="flex-1 min-w-0 w-full max-w-xl xl:max-w-[560px] mx-auto h-[420px] md:h-[460px] xl:h-[520px] shadow-[0_0_120px_rgba(153,69,255,0.18)]">
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
