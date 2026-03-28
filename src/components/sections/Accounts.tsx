import { Badge } from "@/components/ui/Badge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ACCOUNTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Accounts(): React.ReactElement {
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

        {/* Cards — width on AnimateIn so flex calc works */}
        <div className="flex flex-wrap justify-center gap-6">
          {ACCOUNTS.map((account, i) => (
            <AnimateIn
              key={account.type}
              delay={i * 80}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
            >
              <div
                className={cn(
                  "group h-full",
                  "bg-surface border border-border rounded-2xl p-6",
                  "hover:border-border-hover hover:shadow-[0_0_30px_rgba(20,241,149,0.05)]",
                  "hover:scale-[1.01] transition-all duration-200"
                )}
              >
                {/* Badge + symbol */}
                <div className="flex items-center justify-between">
                  <Badge variant="accent">{account.title}</Badge>
                  <span className="text-2xl text-muted">{account.symbol}</span>
                </div>

                {/* Description */}
                <p className="mt-4 text-muted text-sm leading-relaxed">
                  {account.description}
                </p>

                {/* CLI command */}
                <div className="mt-4 bg-background/60 rounded-lg px-4 py-3 font-mono text-xs text-solana-green overflow-x-auto whitespace-nowrap">
                  $ {account.command}
                </div>

                {/* Protocol */}
                <p className="mt-3 text-xs text-dim">via {account.protocol}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
