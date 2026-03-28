import {
  Globe,
  Send,
  PiggyBank,
  CreditCard,
  ArrowLeftRight,
  TrendingUp,
  Zap,
  Cpu,
  Shield,
  Layers,
  Monitor,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";

const FEATURES = [
  {
    icon: Globe,
    title: "Solana-native",
    description: "Built on Solana for sub-second finality and near-zero fees.",
    accent: "purple" as const,
  },
  {
    icon: Send,
    title: "Send & Receive",
    description: "Transfer SOL and USDC to any address. Gas handled automatically.",
    accent: "green" as const,
  },
  {
    icon: PiggyBank,
    title: "Earn 4–8% APY",
    description: "Deposits auto-routed to the best yield via Kamino and marginfi.",
    accent: "purple" as const,
  },
  {
    icon: CreditCard,
    title: "Borrow on demand",
    description: "Credit against your savings — no selling, repay on your schedule.",
    accent: "green" as const,
  },
  {
    icon: ArrowLeftRight,
    title: "Jupiter swaps",
    description: "SOL, USDC, USDT, JUP and any SPL token. Best route, always.",
    accent: "purple" as const,
  },
  {
    icon: TrendingUp,
    title: "Auto rebalance",
    description: "Yield optimizer moves funds to higher-APY venues automatically.",
    accent: "green" as const,
  },
  {
    icon: Zap,
    title: "MPP protocol (402)",
    description: "Pay-per-use APIs via Machine Payments Protocol. One line of code.",
    accent: "purple" as const,
  },
  {
    icon: Cpu,
    title: "4 MCP tools",
    description: "Plug into Claude, Cursor, or any MCP-compatible AI platform.",
    accent: "green" as const,
  },
  {
    icon: Shield,
    title: "Agent safeguards",
    description: "Per-transaction and daily spending limits. You stay in control.",
    accent: "purple" as const,
  },
  {
    icon: Layers,
    title: "DeFi protocols",
    description: "Kamino, marginfi, and Jupiter integrated out of the box.",
    accent: "green" as const,
  },
  {
    icon: Monitor,
    title: "Browser client",
    description: "Run in the browser with @banka/sdk/browser. No server needed.",
    accent: "purple" as const,
  },
];

export function Comparison(): React.ReactElement {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Everything an agent needs
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Full-stack DeFi, one SDK. No wrappers, no glue code.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feat, i) => (
            <AnimateIn key={feat.title} delay={i * 60}>
              <div className="group relative rounded-2xl border border-border bg-surface/40 p-6 hover:border-[rgba(153,69,255,0.3)] hover:bg-surface/70 transition-all duration-300 h-full">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    feat.accent === "purple"
                      ? "bg-[rgba(153,69,255,0.1)] text-solana-purple"
                      : "bg-[rgba(20,241,149,0.1)] text-solana-green"
                  }`}
                >
                  <feat.icon size={20} />
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
