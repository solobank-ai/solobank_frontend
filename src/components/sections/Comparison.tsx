import {
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

/* ------------------------------------------------------------------ */
/*  Hero cards — large, with visual flair                              */
/* ------------------------------------------------------------------ */

function HeroSend() {
  return (
    <AnimateIn delay={0} className="h-full">
      <div className="group relative rounded-2xl border border-border bg-surface/40 p-8 h-full overflow-hidden hover:border-[rgba(20,241,149,0.3)] transition-all duration-300">
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[radial-gradient(circle,rgba(20,241,149,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[rgba(20,241,149,0.1)] flex items-center justify-center mb-5">
            <Send size={24} className="text-solana-green" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Send & Receive</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">
            Transfer SOL and USDC to any Solana address. Gas fees handled automatically — your agent never gets stuck.
          </p>

          {/* Mini terminal */}
          <div className="bg-background/60 rounded-lg px-4 py-3 font-mono text-xs border border-border">
            <span className="text-dim">$</span>{" "}
            <span className="text-foreground">solobank send</span>{" "}
            <span className="text-solana-green">10</span>{" "}
            <span className="text-solana-purple">9pFr...2kLx</span>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}

function HeroEarn() {
  return (
    <AnimateIn delay={80} className="h-full">
      <div className="group relative rounded-2xl border border-border bg-surface/40 p-8 h-full overflow-hidden hover:border-[rgba(153,69,255,0.3)] transition-all duration-300">
        {/* Decorative glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[radial-gradient(circle,rgba(153,69,255,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[rgba(153,69,255,0.1)] flex items-center justify-center mb-5">
            <PiggyBank size={24} className="text-solana-purple" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Earn 4–8% APY</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">
            Deposits auto-routed to the best yield venue across Kamino and marginfi. Rebalances when rates shift.
          </p>

          {/* APY bars */}
          <div className="space-y-2">
            {[
              { label: "Kamino", value: "6.2%", width: "75%" },
              { label: "marginfi", value: "8.1%", width: "95%" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-3">
                <span className="text-xs text-dim w-16 font-mono">{p.label}</span>
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-solana-purple to-solana-green"
                    style={{ width: p.width }}
                  />
                </div>
                <span className="text-xs font-mono text-solana-green w-10 text-right">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}

function HeroMCP() {
  return (
    <AnimateIn delay={160} className="h-full">
      <div className="group relative rounded-2xl border border-border bg-surface/40 p-8 h-full overflow-hidden hover:border-[rgba(20,241,149,0.3)] transition-all duration-300">
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[radial-gradient(circle,rgba(20,241,149,0.06)_0%,transparent_70%)]" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[rgba(20,241,149,0.1)] flex items-center justify-center mb-5">
            <Cpu size={24} className="text-solana-green" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">4 MCP Tools</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">
            Plug into Claude, Cursor, or any MCP-compatible AI platform. One JSON config — your agent has a bank account.
          </p>

          {/* Tool list */}
          <div className="grid grid-cols-2 gap-2">
            {["solobank_address", "solobank_balance", "solobank_send", "solobank_pay"].map((tool) => (
              <div key={tool} className="bg-background/60 rounded-lg px-3 py-2 font-mono text-xs text-solana-green border border-border">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}

/* ------------------------------------------------------------------ */
/*  Compact feature card                                               */
/* ------------------------------------------------------------------ */

interface CompactFeature {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  accent: "purple" | "green";
}

const COMPACT_FEATURES: CompactFeature[] = [
  { icon: CreditCard, title: "Borrow on demand", description: "Credit against savings — no selling required.", accent: "green" },
  { icon: ArrowLeftRight, title: "Jupiter swaps", description: "Any SPL token, best route, always.", accent: "purple" },
  { icon: TrendingUp, title: "Auto rebalance", description: "Moves funds to higher-APY venues.", accent: "green" },
  { icon: Zap, title: "MPP protocol", description: "Pay-per-use APIs via 402 negotiation.", accent: "purple" },
  { icon: Shield, title: "Agent safeguards", description: "Per-tx and daily spending limits.", accent: "green" },
  { icon: Layers, title: "DeFi protocols", description: "Kamino + marginfi + Jupiter built in.", accent: "purple" },
  { icon: Monitor, title: "Browser client", description: "Run in-browser with @solobank/sdk.", accent: "green" },
];

function CompactCard({ feat, index, stretch }: { feat: CompactFeature; index: number; stretch?: boolean }) {
  return (
    <AnimateIn delay={(index + 3) * 60} className={stretch ? "flex-1" : undefined}>
      <div className={`group flex items-start gap-4 rounded-xl border border-border bg-surface/30 p-4 hover:border-[rgba(153,69,255,0.2)] hover:bg-surface/50 transition-all duration-300 ${stretch ? "h-full" : ""}`}>
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
            feat.accent === "purple"
              ? "bg-[rgba(153,69,255,0.1)] text-solana-purple"
              : "bg-[rgba(20,241,149,0.1)] text-solana-green"
          }`}
        >
          <feat.icon size={16} />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-foreground">{feat.title}</h4>
          <p className="text-xs text-muted mt-0.5">{feat.description}</p>
        </div>
      </div>
    </AnimateIn>
  );
}

/* ------------------------------------------------------------------ */
/*  Bento layout                                                       */
/* ------------------------------------------------------------------ */

export function Comparison(): React.ReactElement {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Everything an agent needs
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Full-stack DeFi, one SDK. No wrappers, no glue code.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Row 1: Two hero cards — equal width */}
          <div className="md:col-span-1 lg:col-span-1">
            <HeroSend />
          </div>
          <div className="md:col-span-1 lg:col-span-2">
            <HeroEarn />
          </div>

          {/* Row 2: MCP wide card */}
          <div className="lg:col-span-2">
            <HeroMCP />
          </div>

          {/* Row 2 side: stacked compact cards — stretch to match MCP height */}
          <div className="flex flex-col gap-3">
            {COMPACT_FEATURES.slice(0, 3).map((feat, i) => (
              <CompactCard key={feat.title} feat={feat} index={i} stretch />
            ))}
          </div>

          {/* Row 3: remaining compact cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {COMPACT_FEATURES.slice(3).map((feat, i) => (
              <CompactCard key={feat.title} feat={feat} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
