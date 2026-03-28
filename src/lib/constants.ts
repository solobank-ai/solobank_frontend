import type { AccountCard, ComparisonRow, HowItWorksStep, NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Accounts", href: "#accounts" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Docs", href: "/docs" },
  {
    label: "GitHub",
    href: "https://github.com/decentrathon/frontend",
    external: true,
  },
];

export const ACCOUNTS: AccountCard[] = [
  {
    type: "checking",
    symbol: "⟳",
    title: "Checking",
    description:
      "Send and receive USDC. Gas fees handled automatically — your agent never gets stuck.",
    command: "auton send 10 USDC to 9pFr...2kLx",
    protocol: "SPL Token transfers",
  },
  {
    type: "savings",
    symbol: "◈",
    title: "Savings",
    description:
      "Earn 4–8% APY automatically. Deposits routed to the best yield protocol.",
    command: "auton save 80 USDC",
    protocol: "Kamino / Marginfi",
  },
  {
    type: "credit",
    symbol: "◎",
    title: "Credit",
    description:
      "Borrow against your savings without selling. Repay on your schedule.",
    command: "auton borrow 20 USDC",
    protocol: "Kamino collateralized loans",
  },
  {
    type: "invest",
    symbol: "◆",
    title: "Invest",
    description:
      "Buy, sell, and earn yield. Dollar-cost averaging and strategies built in.",
    command: "auton invest strategy buy layer1 200",
    protocol: "Jupiter + Meteora strategies",
  },
  {
    type: "swap",
    symbol: "⇌",
    title: "Swap",
    description:
      "Swap between stablecoins and crypto at the best available rate.",
    command: "auton swap 5 USDC SOL",
    protocol: "Jupiter best route",
  },
];

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    step: 1,
    title: "Install",
    duration: "30s",
    description:
      "One command. Wallet, MCP server, and safeguards — all set up and guided.",
    command: "npm i -g @auton/cli && auton init",
  },
  {
    step: 2,
    title: "Fund",
    duration: "1 min",
    description:
      "Send USDC to your wallet address. Gas and routing are handled automatically.",
  },
  {
    step: 3,
    title: "Let it work",
    duration: "∞",
    description:
      'Restart your AI platform and ask: "What\'s my auton balance?" — your agent is live.',
  },
];

export const COMPARISON_DATA: ComparisonRow[] = [
  { feature: "Chain", coinbase: "Base", auton: "Solana" },
  { feature: "Send / Receive", coinbase: true, auton: true },
  { feature: "Savings account", coinbase: false, auton: "Earn 4–8% APY" },
  { feature: "Credit line", coinbase: false, auton: "Borrow against savings" },
  {
    feature: "Token swap",
    coinbase: "Base tokens",
    auton: "Stables + SOL, BTC, ETH, GOLD",
  },
  {
    feature: "Investment account",
    coinbase: false,
    auton: "Buy/sell + strategies + DCA",
  },
  { feature: "Yield on investments", coinbase: false, auton: "Earn while holding" },
  {
    feature: "Pay-per-use APIs",
    coinbase: "Limited",
    auton: "41 services, 90 endpoints",
  },
  { feature: "MCP integration", coinbase: false, auton: "35 tools + 20 prompts" },
  { feature: "AI Financial Advisor", coinbase: false, auton: "MCP server" },
  {
    feature: "Agent safeguards",
    coinbase: false,
    auton: "Per-tx + daily limits",
  },
];

export const TERMINAL_LINES: string[] = [
  "$ auton init",
  "Wallet created: 7xKp...3mNq",
  "MCP server configured",
  "Safeguards: $100/tx · $500/day",
  "",
  "$ auton balance",
  "Checking:  $68.91 USDC",
  "Savings:   $80.00 USDC  (4.21% APY)",
  "Credit:    -$20.00 USDC",
  "Invest:    $5.02 SOL    (+0.4%)",
  "Total:     $133.93",
  "",
  "$ auton send 10 USDC to 9pFr...2kLx",
  "✓ Sent 10.00 USDC → 9pFr...2kLx",
  "  TX: 4vGh...8mKp  confirmed (420ms)",
  "",
  "$ auton save 80 USDC",
  "✓ Deposited 80.00 USDC to Kamino",
  "  Current APY: 4.21%",
];
