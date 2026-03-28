import type { AccountCard, NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Accounts", href: "#accounts" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Docs", href: "/docs" },
  {
    label: "GitHub",
    href: "https://github.com/decentrathon/",
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
    command: "banka send 10 9pFr...2kLx",
    protocol: "SPL Token transfers",
  },
  {
    type: "savings",
    symbol: "◈",
    title: "Savings",
    description:
      "Earn 4–8% APY automatically. Deposits routed to the best yield protocol.",
    command: "banka lend 80 USDC",
    protocol: "Kamino / marginfi",
  },
  {
    type: "credit",
    symbol: "◎",
    title: "Credit",
    description:
      "Borrow against your savings without selling. Repay on your schedule.",
    command: "banka borrow 20 USDC",
    protocol: "Kamino / marginfi",
  },
  {
    type: "invest",
    symbol: "◆",
    title: "Invest",
    description:
      "Buy, sell, and earn yield. Dollar-cost averaging and strategies built in.",
    command: "banka swap 200 USDC SOL",
    protocol: "Jupiter best route",
  },
  {
    type: "swap",
    symbol: "⇌",
    title: "Swap",
    description:
      "Swap between stablecoins and crypto at the best available rate.",
    command: "banka swap 5 USDC SOL",
    protocol: "Jupiter best route",
  },
];


export const TERMINAL_LINES: string[] = [
  "$ banka init",
  "Wallet created: 7xKp...3mNq",
  "MCP server configured",
  "Safeguards: $100/tx · $500/day",
  "",
  "$ banka balance",
  "SOL:   0.05 SOL",
  "USDC:  $148.91 USDC",
  "",
  "$ banka send 10 9pFr...2kLx",
  "✓ Sent 10.00 USDC → 9pFr...2kLx",
  "  TX: 4vGh...8mKp  confirmed (420ms)",
  "",
  "$ banka lend 80 USDC",
  "✓ Deposited 80.00 USDC to Kamino",
  "  APY: 4.21%",
];
