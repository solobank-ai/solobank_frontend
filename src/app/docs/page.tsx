import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CLI_COMMANDS = [
  {
    command: "auton init",
    description:
      "Initialize a new Auton wallet with MCP server and per-tx safeguards.",
    example: "auton init",
  },
  {
    command: "auton balance",
    description:
      "Check balances across all five accounts — checking, savings, credit, invest, swap.",
    example: "auton balance",
  },
  {
    command: "auton send",
    description: "Send USDC to any Solana address. Gas handled automatically.",
    example: "auton send 10 USDC to 9pFr...2kLx",
  },
  {
    command: "auton save",
    description:
      "Deposit USDC to savings. Routed to best yield (Kamino / Marginfi, 4–8% APY).",
    example: "auton save 80 USDC",
  },
  {
    command: "auton borrow",
    description:
      "Borrow against savings via Kamino collateralized loans. No selling required.",
    example: "auton borrow 20 USDC",
  },
  {
    command: "auton swap",
    description: "Swap tokens via Jupiter best route.",
    example: "auton swap 5 USDC SOL",
  },
];

export default function DocsPage(): React.ReactElement {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Documentation
          </h1>
          <p className="mt-4 text-muted text-lg">
            Auton CLI reference and quickstart guide.
          </p>
        </div>

        {/* Install */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Quickstart</h2>
          <div className="bg-surface border border-border rounded-xl px-5 py-4 font-mono text-sm text-solana-green">
            $ npm i -g @auton/cli && auton init
          </div>
        </div>

        {/* CLI reference */}
        <div>
          <h2 className="text-xl font-bold mb-6">CLI Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CLI_COMMANDS.map((cmd) => (
              <div
                key={cmd.command}
                className="bg-surface border border-border rounded-xl p-5 hover:border-border-hover transition-colors"
              >
                <div className="font-mono text-xs text-solana-green mb-3 bg-background/60 rounded-lg px-3 py-2">
                  $ {cmd.example}
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  {cmd.command}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {cmd.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted mb-4">Ready to get started?</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-solana-green hover:brightness-110 transition-all"
          >
            Back to home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
