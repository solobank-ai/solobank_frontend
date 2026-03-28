"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Copy, Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_SECTIONS = [
  { id: "quickstart", label: "Quickstart" },
  { id: "cli", label: "CLI" },
  { id: "sdk", label: "SDK" },
  { id: "mcp", label: "MCP Server" },
  { id: "payments", label: "Payments" },
  { id: "env", label: "Environment" },
];

const CLI_COMMANDS = [
  {
    command: "banka init",
    flags: "--force",
    description: "Generate a new Solana Ed25519 keypair and save it to ~/.config/banka/id.json.",
    example: "banka init",
  },
  {
    command: "banka address",
    flags: "",
    description: "Print the wallet's base58 public key.",
    example: "banka address",
  },
  {
    command: "banka balance",
    flags: "",
    description: "Show SOL and USDC balances for the current wallet.",
    example: "banka balance",
  },
  {
    command: "banka send",
    flags: "--asset <SOL|USDC>",
    description: "Transfer SOL or USDC to any Solana address. Defaults to USDC.",
    example: "banka send 10 9pFr...2kLx",
  },
  {
    command: "banka pay",
    flags: "--method --data --max-price",
    description: "Pay an MPP-protected HTTP endpoint. Handles 402 negotiation automatically.",
    example: "banka pay https://api.example.com/data",
  },
  {
    command: "banka swap-quote",
    flags: "--slippage-bps <50>",
    description: "Get a Jupiter swap quote without executing.",
    example: "banka swap-quote 5 USDC SOL",
  },
  {
    command: "banka swap",
    flags: "--slippage-bps <50>",
    description: "Execute a token swap via Jupiter best route.",
    example: "banka swap 5 USDC SOL",
  },
  {
    command: "banka lend-rates",
    flags: "--protocol <auto|kamino|marginfi>",
    description: "List current lending APYs across Kamino and marginfi.",
    example: "banka lend-rates USDC",
  },
  {
    command: "banka lend",
    flags: "--protocol",
    description: "Deposit to the best lending venue. Auto-routes to highest APY.",
    example: "banka lend 80 USDC",
  },
  {
    command: "banka borrow",
    flags: "--protocol --market --bank --reserve",
    description: "Borrow against deposited collateral.",
    example: "banka borrow 20 USDC",
  },
  {
    command: "banka withdraw",
    flags: "--protocol --all",
    description: "Withdraw from a lending position. Use --all for full withdrawal.",
    example: "banka withdraw 50 USDC",
  },
  {
    command: "banka repay",
    flags: "--protocol --all",
    description: "Repay an outstanding borrow position.",
    example: "banka repay 20 USDC",
  },
  {
    command: "banka rebalance",
    flags: "--target-protocol --min-apy-delta",
    description: "Move funds from one lending venue to a higher-APY venue.",
    example: "banka rebalance 80 USDC",
  },
  {
    command: "banka mcp",
    flags: "",
    description: "Print MCP stdio configuration JSON for Claude / Cursor integration.",
    example: "banka mcp",
  },
];

const SDK_METHODS = [
  {
    category: "Wallet",
    methods: [
      { name: "Banka.init(options?)", returns: "Promise<{address, keypairPath, rpcUrl}>", description: "Generate a new keypair and save to disk." },
      { name: "Banka.create(options?)", returns: "Promise<Banka>", description: "Load existing wallet or create if createIfMissing: true." },
      { name: "Banka.fromSecretKey(key, options?)", returns: "Banka", description: "Instantiate from raw secret key (Uint8Array, base64, or JSON array)." },
      { name: ".getAddress()", returns: "string", description: "Returns the wallet's base58 public key." },
      { name: ".getBalance()", returns: "Promise<BalanceSnapshot>", description: "SOL + USDC balances with raw bigint values." },
    ],
  },
  {
    category: "Transfers",
    methods: [
      { name: ".send(options)", returns: "Promise<SendResult>", description: "Transfer SOL or USDC. Options: { amount, to, asset?, dryRun? }." },
      { name: ".pay(options)", returns: "Promise<PayResult>", description: "Pay an MPP-protected endpoint. Options: { url, method?, body?, maxPrice? }." },
    ],
  },
  {
    category: "Swaps",
    methods: [
      { name: ".getSwapQuote(options)", returns: "Promise<SwapQuoteResult>", description: "Get Jupiter quote. Options: { fromAsset, toAsset, amount, slippageBps? }." },
      { name: ".swap(options)", returns: "Promise<SwapExecutionResult>", description: "Execute Jupiter swap with the same options as getSwapQuote." },
    ],
  },
  {
    category: "Lending",
    methods: [
      { name: ".getLendingRates(options)", returns: "Promise<LendingRate[]>", description: "APYs across Kamino + marginfi. Options: { asset, protocol? }." },
      { name: ".lend(options)", returns: "Promise<LendResult>", description: "Deposit to best venue. Options: { asset, amount, protocol?, dryRun? }." },
      { name: ".borrow(options)", returns: "Promise<LendingActionResult>", description: "Borrow from a lending protocol." },
      { name: ".withdraw(options)", returns: "Promise<LendingActionResult>", description: "Withdraw from position. Use withdrawAll: true for full exit." },
      { name: ".repay(options)", returns: "Promise<LendingActionResult>", description: "Repay a borrow. Use repayAll: true to clear debt." },
      { name: ".rebalance(options)", returns: "Promise<RebalanceResult>", description: "Move funds to higher-APY venue if delta exceeds minApyDelta." },
    ],
  },
];

const MCP_TOOLS = [
  {
    tool: "banka_address",
    params: "none",
    description: "Returns the current Solana wallet address.",
  },
  {
    tool: "banka_balance",
    params: "none",
    description: "Returns wallet balance snapshot — SOL + USDC with raw values.",
  },
  {
    tool: "banka_send",
    params: "to, amount, asset?, dryRun?",
    description: "Send SOL or SPL tokens to any Solana address.",
  },
  {
    tool: "banka_pay",
    params: "url, method?, body?, maxPrice?, headers?",
    description: "Pay an MPP-protected HTTP endpoint. Handles 402 negotiation.",
  },
];

const ENV_VARS = [
  { name: "BANKA_CONFIG_DIR", default: "~/.config/banka", description: "Wallet config directory." },
  { name: "BANKA_RPC_URL", default: "mainnet-beta RPC", description: "Solana RPC endpoint." },
  { name: "BANKA_JUP_BASE_URL", default: "https://lite-api.jup.ag", description: "Jupiter API base URL." },
  { name: "BANKA_JUP_API_KEY", default: "none", description: "Jupiter Pro API key for higher rate limits." },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function CodeBlock({ children, copyable = true }: { children: string; copyable?: boolean }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    void navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="relative group bg-background/60 border border-border rounded-lg px-4 py-3 font-mono text-xs text-solana-green overflow-x-auto whitespace-pre-wrap break-words">
      {children}
      {copyable && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-md border border-border text-dim hover:text-foreground hover:border-border-hover transition-all opacity-0 group-hover:opacity-100"
          aria-label="Copy"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      )}
    </div>
  );
}

function SectionAnchor({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DocsPage(): React.ReactElement {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-48 flex-shrink-0">
          <nav className="sticky top-28 space-y-1">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block text-sm text-muted hover:text-foreground transition-colors py-1.5"
              >
                {s.label}
              </a>
            ))}
            <div className="border-t border-border mt-4 pt-4">
              <a
                href="https://github.com/decentrathon/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
              >
                GitHub <ExternalLink size={12} />
              </a>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Documentation
            </h1>
            <p className="mt-4 text-muted text-lg max-w-2xl">
              Complete reference for the Banka SDK, CLI, and MCP server — everything you need to give AI agents a bank account on Solana.
            </p>
          </div>

          {/* Architecture */}
          <div className="mb-16 bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-sm font-bold tracking-widest text-dim uppercase mb-4">Architecture</h3>
            <div className="font-mono text-xs text-muted leading-loose">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-solana-purple">@banka/mcp</span>
                <span className="text-dim">&rarr;</span>
                <span className="text-solana-purple">@banka/cli</span>
                <span className="text-dim">&rarr;</span>
                <span className="text-solana-green">@banka/sdk</span>
                <span className="text-dim">&rarr;</span>
                <span className="text-solana-green">banka</span>
                <span className="text-dim">&rarr;</span>
                <span className="text-muted">mppx</span>
              </div>
              <div className="mt-3 text-dim">
                SDK integrates: Solana web3.js &middot; SPL Token &middot; Jupiter &middot; Kamino &middot; marginfi
              </div>
            </div>
          </div>

          {/* ── Quickstart ── */}
          <SectionAnchor id="quickstart">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2 gradient-text">Quickstart</h2>
              <p className="text-muted text-sm mb-6">Up and running in 30 seconds.</p>

              <div className="space-y-3">
                <CodeBlock>npm i -g @banka/cli</CodeBlock>
                <CodeBlock>banka init</CodeBlock>
                <CodeBlock>banka balance</CodeBlock>
              </div>

              <div className="mt-6 bg-surface border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold mb-3">Using with Claude / Cursor</h4>
                <p className="text-sm text-muted mb-3">Add to your MCP config:</p>
                <CodeBlock>{`{
  "mcpServers": {
    "banka": {
      "command": "npx",
      "args": ["-y", "@banka/mcp"]
    }
  }
}`}</CodeBlock>
              </div>

              <div className="mt-6 bg-surface border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold mb-3">Using as a library</h4>
                <CodeBlock>npm i @banka/sdk</CodeBlock>
                <div className="mt-3">
                  <CodeBlock>{`import { Banka } from "@banka/sdk";

const agent = await Banka.create();
const balance = await agent.getBalance();
await agent.send({ amount: 10, to: "9pFr...2kLx" });
await agent.lend({ asset: "USDC", amount: 80 });`}</CodeBlock>
                </div>
              </div>
            </div>
          </SectionAnchor>

          {/* ── CLI Reference ── */}
          <SectionAnchor id="cli">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2 gradient-text">CLI Reference</h2>
              <p className="text-muted text-sm mb-6">
                <code className="text-solana-green">@banka/cli</code> — command-line interface wrapping the SDK. Binary: <code className="text-solana-green">banka</code>.
              </p>

              <div className="space-y-3">
                {CLI_COMMANDS.map((cmd) => (
                  <div
                    key={cmd.command}
                    className="bg-surface border border-border rounded-xl p-4 hover:border-border-hover transition-colors"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <code className="font-mono text-sm font-bold text-foreground">
                        {cmd.command}
                      </code>
                      {cmd.flags && (
                        <span className="text-xs text-dim font-mono">{cmd.flags}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-3">
                      {cmd.description}
                    </p>
                    <CodeBlock>{`$ ${cmd.example}`}</CodeBlock>
                  </div>
                ))}
              </div>
            </div>
          </SectionAnchor>

          {/* ── SDK Reference ── */}
          <SectionAnchor id="sdk">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2 gradient-text">SDK Reference</h2>
              <p className="text-muted text-sm mb-6">
                <code className="text-solana-green">@banka/sdk</code> — full TypeScript SDK for agent banking. Exports: <code className="text-dim">&quot;.&quot;</code>, <code className="text-dim">&quot;./browser&quot;</code>, <code className="text-dim">&quot;./adapters&quot;</code>, <code className="text-dim">&quot;./descriptors&quot;</code>.
              </p>

              {SDK_METHODS.map((group) => (
                <div key={group.category} className="mb-8">
                  <h3 className="text-lg font-bold mb-4 gradient-text">
                    {group.category}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 pr-4 text-muted font-medium whitespace-nowrap">Method</th>
                          <th className="text-left py-3 pr-4 text-muted font-medium whitespace-nowrap">Returns</th>
                          <th className="text-left py-3 text-muted font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.methods.map((m) => (
                          <tr key={m.name} className="border-b border-border/50">
                            <td className="py-3 pr-4 font-mono text-xs text-solana-green whitespace-nowrap">
                              {m.name}
                            </td>
                            <td className="py-3 pr-4 font-mono text-xs text-dim whitespace-nowrap">
                              {m.returns}
                            </td>
                            <td className="py-3 text-muted text-xs">
                              {m.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {/* Key types */}
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4 gradient-text">Key Types</h3>
                <CodeBlock>{`interface BalanceSnapshot {
  address: string;
  sol: number; solRaw: bigint;
  usdc: number; usdcRaw: bigint;
}

interface SendOptions {
  amount: number;
  to: string;
  asset?: "SOL" | "USDC" | "USDT" | "JUP";
  dryRun?: boolean;
}

interface SwapQuoteOptions {
  fromAsset: string;
  toAsset: string;
  amount: number;
  slippageBps?: number;  // default 50
}

interface LendOptions {
  asset: string;
  amount: number;
  protocol?: "auto" | "kamino" | "marginfi";
  dryRun?: boolean;
}

interface RebalanceResult {
  status: "rebalanced" | "skipped";
  from: LendingRate;
  to: LendingRate;
  apyDelta: number;
}`}</CodeBlock>
              </div>

              {/* Browser export */}
              <div className="mt-8 bg-surface border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold mb-3">Browser Client</h4>
                <p className="text-sm text-muted mb-3">
                  Lightweight MPP client for wallet-adapter integration:
                </p>
                <CodeBlock>{`import { createBrowserClient } from "@banka/sdk/browser";

const client = createBrowserClient({
  connection,
  signer: walletAdapter,
});

const response = await client.pay({ url, maxPrice: 0.01 });`}</CodeBlock>
              </div>
            </div>
          </SectionAnchor>

          {/* ── MCP Server ── */}
          <SectionAnchor id="mcp">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2 gradient-text">MCP Server</h2>
              <p className="text-muted text-sm mb-6">
                <code className="text-solana-green">@banka/mcp</code> — Model Context Protocol server for Claude, Cursor, and other MCP-compatible AI platforms.
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 gradient-text">Tools</h3>
                <div className="space-y-3">
                  {MCP_TOOLS.map((t) => (
                    <div
                      key={t.tool}
                      className="bg-surface border border-border rounded-xl p-4 hover:border-border-hover transition-colors"
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <code className="font-mono text-sm font-bold text-foreground">
                          {t.tool}
                        </code>
                        <span className="text-xs text-dim font-mono">
                          {t.params}
                        </span>
                      </div>
                      <p className="text-sm text-muted">{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold mb-3">Programmatic Usage</h4>
                <CodeBlock>{`import { startMcpServer, createMcpServer } from "@banka/mcp";

// Start with stdio transport:
await startMcpServer({ rpcUrl: "https://..." });

// Or get server instance for custom transport:
const server = await createMcpServer({ agent: myAgent });`}</CodeBlock>
              </div>

              <div className="mt-4 bg-surface border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold mb-3">Docker</h4>
                <p className="text-sm text-muted mb-3">Run as a containerized MCP server:</p>
                <CodeBlock>{`docker build -t banka-mcp packages/mcp
docker run -it banka-mcp --rpc-url https://...`}</CodeBlock>
              </div>
            </div>
          </SectionAnchor>

          {/* ── Payments (banka core) ── */}
          <SectionAnchor id="payments">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2 gradient-text">Payments (banka core)</h2>
              <p className="text-muted text-sm mb-6">
                <code className="text-solana-green">banka</code> — Solana USDC payment method for the Machine Payments Protocol (MPP). Handles 402 negotiation, multi-account transfers, and on-chain verification.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-surface border border-border rounded-xl p-5">
                  <h4 className="text-sm font-bold mb-3">Client (payer)</h4>
                  <CodeBlock>{`import { solanaClient } from "banka/client";

const handler = solanaClient({
  connection,
  signer,
  commitment: "confirmed",
});`}</CodeBlock>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                  <h4 className="text-sm font-bold mb-3">Server (verifier)</h4>
                  <CodeBlock>{`import { solanaServer } from "banka/server";

const handler = solanaServer({
  recipient: "Abcd...wxyz",
  rpcUrl: "https://...",
});`}</CodeBlock>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 gradient-text">Utility Functions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 pr-4 text-muted font-medium">Function</th>
                        <th className="text-left py-3 text-muted font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["fetchTokenAccounts(conn, owner, mint)", "Fetch SPL token accounts sorted by balance"],
                        ["buildTransferPlan(accounts, amount)", "Greedy multi-account spend plan"],
                        ["sumReceivedTokenAmount(pre, post, mint, owner)", "Compute token delta for verification"],
                        ["parseAmountToRaw(amount, decimals)", 'Convert decimal string to bigint (e.g. "1.50" \u2192 1500000n)'],
                      ].map(([fn, desc]) => (
                        <tr key={fn} className="border-b border-border/50">
                          <td className="py-3 pr-4 font-mono text-xs text-solana-green whitespace-nowrap">{fn}</td>
                          <td className="py-3 text-muted text-xs">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 bg-surface border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold mb-3">Constants</h4>
                <div className="font-mono text-xs space-y-1">
                  <div><span className="text-muted">SOLANA_USDC_MINT:</span> <span className="text-solana-green">EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v</span></div>
                  <div><span className="text-muted">USDC_DECIMALS:</span> <span className="text-solana-green">6</span></div>
                </div>
              </div>
            </div>
          </SectionAnchor>

          {/* ── Environment Variables ── */}
          <SectionAnchor id="env">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2 gradient-text">Environment Variables</h2>
              <p className="text-muted text-sm mb-6">
                Optional configuration via environment variables.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 text-muted font-medium">Variable</th>
                      <th className="text-left py-3 pr-4 text-muted font-medium">Default</th>
                      <th className="text-left py-3 text-muted font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ENV_VARS.map((v) => (
                      <tr key={v.name} className="border-b border-border/50">
                        <td className="py-3 pr-4 font-mono text-xs text-solana-green whitespace-nowrap">{v.name}</td>
                        <td className="py-3 pr-4 font-mono text-xs text-dim whitespace-nowrap">{v.default}</td>
                        <td className="py-3 text-muted text-xs">{v.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </SectionAnchor>

          {/* CTA */}
          <div className="mt-8 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} /> Back to home
            </Link>
            <a
              href="https://github.com/decentrathon/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-solana-green hover:brightness-110 transition-all"
            >
              View on GitHub <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
