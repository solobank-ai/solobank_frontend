"use client";

/* ------------------------------------------------------------------ */
/*  HowItWorks — design exploration                                   */
/*                                                                     */
/*  Four self-contained variants for the /preview/how-it-works route. */
/*  Pick one, then it replaces the live HowItWorks component.         */
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

/* ============ A. Terminal timeline ============ */
export function HowItWorksA(): React.ReactElement {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How it works</h2>
          <p className="mt-3 text-muted text-lg">Up and running in under two minutes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="relative bg-surface/60 border border-border rounded-xl overflow-hidden font-mono text-[13px]"
            >
              {/* terminal chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-background/40">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-dim text-[11px] tracking-wide">
                  step {String(s.n).padStart(2, "0")} · {s.duration}
                </span>
              </div>

              <div className="p-5">
                <div className="text-solana-green/80 mb-1"># {s.title}</div>
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
                <p className="mt-4 text-muted font-sans text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ B. Compact rows / stepper ============ */
export function HowItWorksB(): React.ReactElement {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How it works</h2>
          <p className="mt-2 text-muted">Up and running in under two minutes.</p>
        </div>

        <ol className="divide-y divide-border border border-border rounded-xl bg-surface/40">
          {STEPS.map((s) => (
            <li key={s.n} className="flex items-start gap-6 px-6 py-5">
              <div className="flex-shrink-0 flex flex-col items-center w-16">
                <span className="text-3xl font-bold text-solana-green tabular-nums">
                  {String(s.n).padStart(2, "0")}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-dim mt-1">
                  {s.duration}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-muted text-sm mt-1 leading-relaxed">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============ C. Progress track + active panel ============ */
import { useState } from "react";

export function HowItWorksC(): React.ReactElement {
  const [active, setActive] = useState(0);
  const s = STEPS[active];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How it works</h2>
          <p className="mt-3 text-muted text-lg">Up and running in under two minutes.</p>
        </div>

        {/* track */}
        <div className="relative mb-10">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-0 h-px bg-solana-green -translate-y-1/2 transition-all duration-500"
            style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
          />
          <div className="relative flex justify-between">
            {STEPS.map((step, i) => {
              const isActive = i <= active;
              return (
                <button
                  key={step.n}
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-3 group"
                  aria-label={`Step ${step.n}: ${step.title}`}
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
                      i === active ? "text-foreground" : "text-dim"
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

/* ============ D. Asymmetric split (sticky step) ============ */
export function HowItWorksD(): React.ReactElement {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How it works</h2>
          <p className="mt-3 text-muted text-lg">Up and running in under two minutes.</p>
        </div>

        <div className="space-y-16">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
            >
              <div className="md:col-span-5">
                <div className="text-[11px] tracking-[0.25em] uppercase text-dim mb-3">
                  Step {String(s.n).padStart(2, "0")} · {s.duration}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  {s.title}
                </h3>
                <p className="text-muted leading-relaxed">{s.description}</p>
              </div>
              <div className="md:col-span-7">
                <div className="font-mono text-[13px] bg-surface/60 border border-border rounded-lg overflow-hidden">
                  <div className="px-4 py-2 border-b border-border bg-background/40 text-dim text-[11px]">
                    solobank — terminal
                  </div>
                  <div className="p-4">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
