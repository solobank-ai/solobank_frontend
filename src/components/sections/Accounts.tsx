import { Badge } from "@/components/ui/Badge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";

interface AccountCardData {
  type: string;
  title: string;
  description: string;
  command: string;
  hero?: { label: string; value: string };
  stats?: { label: string; value: string }[];
  tags?: string[];
}

const ACCOUNT_CARDS: AccountCardData[] = [
  {
    type: "checking",
    title: "CHECKING",
    description:
      "Send and receive USDC. Gas fees handled automatically via SPL Token transfers.",
    command: "banka send 10 9pFr...2kLx",
    hero: { label: "AVAILABLE", value: "2,401.00" },
  },
  {
    type: "savings",
    title: "SAVINGS",
    description:
      "Earn 4–8% APY automatically. Deposits routed to the best yield protocol via Kamino / marginfi.",
    command: "banka lend 80 USDC",
    hero: { label: "APY", value: "8.2%" },
    stats: [
      { label: "LOCKED", value: "0.00" },
      { label: "LIQUID", value: "4,102.42" },
    ],
  },
  {
    type: "credit",
    title: "CREDIT",
    description: "Borrow against your savings without selling. Repay on your schedule.",
    command: "banka borrow 20 USDC",
    stats: [
      { label: "UTILIZATION", value: "25%" },
      { label: "LIMIT", value: "5,000" },
    ],
  },
  {
    type: "invest",
    title: "INVEST",
    description:
      "Buy, sell, and earn yield. Swap and hold via Jupiter best route.",
    command: "banka swap 200 USDC SOL",
    tags: ["JUPITER", "BEST ROUTE"],
  },
  {
    type: "swap",
    title: "SWAP",
    description:
      "Swap between stablecoins and crypto at the best available rate via Jupiter.",
    command: "banka swap 5 USDC SOL",
    stats: [
      { label: "SLIPPAGE", value: "0.1%" },
    ],
  },
];

function CardIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    checking: "⟳",
    savings: "✦",
    credit: "◈",
    invest: "◆",
    swap: "⇌",
  };
  return (
    <span className="gradient-text text-base font-bold">
      {icons[type] ?? "●"}
    </span>
  );
}

export function Accounts(): React.ReactElement {
  const featured = ACCOUNT_CARDS.slice(0, 2);
  const rest = ACCOUNT_CARDS.slice(2);

  return (
    <section id="accounts" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Five accounts,{" "}
            <span className="gradient-text">one agent</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Everything your agent needs to manage money — autonomously and
            non-custodially.
          </p>
        </div>

        {/* Featured cards — Checking & Savings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featured.map((card, i) => (
            <AnimateIn key={card.type} delay={i * 80}>
              <div className="card-gradient-border group hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(153,69,255,0.08)] transition-all duration-200 h-full">
                <div className="card-inner p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <CardIcon type={card.type} />
                      <span className="text-xs font-bold tracking-widest text-foreground uppercase">
                        {card.title}
                      </span>
                    </div>
                    {card.hero && (
                      <div className="text-right">
                        <div className="text-[10px] tracking-widest text-dim uppercase">
                          {card.hero.label}
                        </div>
                        <div className="text-3xl font-bold text-solana-green leading-tight">
                          {card.hero.value}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted text-sm leading-relaxed mb-5">
                    {card.description}
                  </p>

                  {/* CLI command */}
                  <div className="bg-background/60 rounded-lg px-4 py-3 font-mono text-xs text-solana-green overflow-x-auto whitespace-nowrap mb-4">
                    $ {card.command} <span className="animate-pulse">_</span>
                  </div>

                  {/* Stats row */}
                  {card.stats && (
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      {card.stats.map((stat) => (
                        <div key={stat.label}>
                          <span className="text-[10px] tracking-widest text-dim uppercase">
                            {stat.label}:
                          </span>{" "}
                          <span className="text-xs font-medium text-muted">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Bottom row — Credit, Invest, Swap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rest.map((card, i) => (
            <AnimateIn key={card.type} delay={(i + 2) * 80}>
              <div className="card-gradient-border group hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(153,69,255,0.08)] transition-all duration-200 h-full">
                <div className="card-inner p-5">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <CardIcon type={card.type} />
                    <span className="text-xs font-bold tracking-widest text-foreground uppercase">
                      {card.title}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {card.description}
                  </p>

                  {/* CLI command */}
                  <div className="bg-background/60 rounded-lg px-4 py-3 font-mono text-xs text-solana-green overflow-x-auto whitespace-nowrap mb-3">
                    $ {card.command}
                  </div>

                  {/* Stats or tags */}
                  {card.stats && (
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      {card.stats.map((stat) => (
                        <div key={stat.label}>
                          <span className="text-[10px] tracking-widest text-dim uppercase">
                            {stat.label}:
                          </span>{" "}
                          <span className="text-xs font-medium text-muted">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {card.tags && (
                    <div className="flex items-center gap-2 pt-3 border-t border-border">
                      {card.tags.map((tag) => (
                        <Badge key={tag} variant="accent">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
