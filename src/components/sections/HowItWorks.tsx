"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  HowItWorks — interactive progress track                            */
/*                                                                     */
/*  Three steps along a horizontal track. Clicking a marker swaps in   */
/*  the matching panel below (title + description + sample command).   */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    n: 1,
    duration: "30s",
    title: "Install",
    description:
      "One command. Wallet, MCP server, and safeguards — all set up and guided.",
    command: "npx -y @solobank/cli@latest init",
    output: [
      { line: "Wallet created:", val: " 7xKp...3mNq" },
      { line: "MCP server configured", val: "" },
      { line: "Safeguards:", val: " $100/tx · $500/day" },
    ],
  },
  {
    n: 2,
    duration: "1 min",
    title: "Fund",
    description:
      "Send USDC to your wallet address. Gas and routing are handled automatically.",
    command: "solobank balance",
    output: [
      { line: "SOL:", val: "   0.05" },
      { line: "USDC:", val: "  148.91" },
    ],
  },
  {
    n: 3,
    duration: "∞",
    title: "Let it work",
    description:
      'Restart your AI platform and ask: "What\'s my solobank balance?" — your agent is live.',
    command: "agent.ask('what can you do with my money?')",
    output: [
      { line: "→ I can send, earn, borrow, swap.", val: "" },
      { line: "→ Current yield:", val: " 6.8% APY" },
    ],
  },
];

export function HowItWorks(): React.ReactElement {
  const [active, setActive] = useState(0);
  // `STEPS[active]` is non-null by construction, but
  // `noUncheckedIndexedAccess` widens it to `T | undefined`.
  const s = STEPS[active] ?? STEPS[0]!;

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            How it works
          </h2>
          <p className="mt-3 text-muted text-lg">
            Up and running in under two minutes.
          </p>
        </div>

        {/* track */}
        <div className="relative mb-10">
          <div className="absolute top-[10px] left-0 right-0 h-px bg-border" />
          <div
            className="absolute top-[10px] left-0 h-px bg-solana-green transition-all duration-500"
            style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
          />
          <div className="relative flex justify-between">
            {STEPS.map((step, i) => {
              const isActive = i <= active;
              return (
                <button
                  key={step.n}
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-3 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-solana-green/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  aria-label={`Step ${step.n}: ${step.title}`}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 transition-colors ${
                      isActive
                        ? "bg-solana-green border-solana-green"
                        : "bg-background border-border group-hover:border-muted"
                    }`}
                  />
                  <span
                    className={`text-xs tracking-widest uppercase transition-colors ${
                      i === active
                        ? "text-foreground"
                        : "text-dim group-hover:text-muted"
                    }`}
                  >
                    {step.duration} · {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* active panel */}
        <div className="bg-surface/60 border border-border rounded-xl p-6 md:p-8">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-4xl font-bold text-solana-green tabular-nums">
              {String(s.n).padStart(2, "0")}
            </span>
            <h3 className="text-2xl font-semibold">{s.title}</h3>
          </div>
          <p className="text-muted mb-5 leading-relaxed">{s.description}</p>
          <div className="font-mono text-[13px] bg-background/60 border border-border rounded-lg p-4">
            <div className="text-foreground">
              <span className="text-dim">$ </span>
              {s.command}
            </div>
            {s.output.map((o, i) => (
              <div key={i} className="text-muted mt-1">
                <span className="text-dim">{o.line}</span>
                <span className="text-foreground">{o.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
