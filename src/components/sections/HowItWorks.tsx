import { Download, Wallet, Rocket } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";

const STEPS = [
  {
    step: 1,
    icon: Download,
    title: "Install",
    duration: "30s",
    description:
      "One command. Wallet, MCP server, and safeguards — all set up and guided.",
    command: "npm i -g @banka/cli && banka init",
  },
  {
    step: 2,
    icon: Wallet,
    title: "Fund",
    duration: "1 min",
    description:
      "Send USDC to your wallet address. Gas and routing are handled automatically.",
  },
  {
    step: 3,
    icon: Rocket,
    title: "Let it work",
    duration: "∞",
    description:
      'Restart your AI platform and ask: "What\'s my banka balance?" — your agent is live.',
  },
];

export function HowItWorks(): React.ReactElement {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-surface/30 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-muted text-lg">
            Up and running in under two minutes.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — desktop only, behind circles */}
          <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-solana-purple/20 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {STEPS.map((step, i) => (
              <AnimateIn key={step.step} delay={i * 150}>
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-full bg-[#111116] border border-[rgba(153,69,255,0.2)] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(153,69,255,0.15)] to-[rgba(20,241,149,0.08)]" />
                      <step.icon size={32} className="text-solana-green relative z-10" />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-solana-green text-background text-sm font-bold flex items-center justify-center shadow-[0_0_16px_rgba(20,241,149,0.4)]">
                      {step.step}
                    </div>
                  </div>

                  {/* Duration badge */}
                  <span className="text-xs text-dim tracking-widest uppercase mb-3">
                    {step.duration}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>

                  {/* Description */}
                  <p className="text-muted text-sm leading-relaxed max-w-[280px]">
                    {step.description}
                  </p>

                  {/* Command */}
                  {step.command && (
                    <div className="mt-5 bg-background rounded-lg px-4 py-3 font-mono text-xs text-solana-green border border-border w-full max-w-[300px]">
                      $ {step.command}
                    </div>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
