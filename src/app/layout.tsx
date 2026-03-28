import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auton — A Bank Account for AI Agents",
  description:
    "Five accounts. Earn, borrow, invest, swap, pay — autonomously. Built on Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
