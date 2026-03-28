export type AccountType = "checking" | "savings" | "credit" | "invest" | "swap";

export interface AccountCard {
  type: AccountType;
  symbol: string;
  title: string;
  description: string;
  command: string;
  protocol: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  duration: string;
  description: string;
  command?: string;
}

export interface ComparisonRow {
  feature: string;
  coinbase: string | boolean;
  auton: string | boolean;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}
