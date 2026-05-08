import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LocaleWrapper } from "@/components/providers/LocaleWrapper";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Solobank — A Bank Account for AI Agents on Solana",
    template: "%s | Solobank",
  },
  description:
    "Solobank gives every AI agent a self-custodied Solana wallet with five accounts: earn yield, borrow, invest, swap, and pay autonomously via the Machine Payments Protocol (MPP).",
  applicationName: SITE_NAME,
  keywords: [
    "Solobank",
    "AI agents",
    "agentic finance",
    "autonomous agents",
    "Solana",
    "Solana wallet for AI",
    "Machine Payments Protocol",
    "MPP",
    "x402",
    "USDC payments",
    "agent payments",
    "DeFi for AI",
    "MCP server",
    "Model Context Protocol",
    "stablecoin payments",
    "agent banking",
    "pay-per-request API",
  ],
  authors: [{ name: "Solobank", url: SITE_URL }],
  creator: "Solobank",
  publisher: "Solobank",
  category: "finance",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Solobank — A Bank Account for AI Agents on Solana",
    description:
      "Five accounts. Earn, borrow, invest, swap, pay — autonomously. Built on Solana with the Machine Payments Protocol.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solobank — A Bank Account for AI Agents on Solana",
    description:
      "Five accounts. Earn, borrow, invest, swap, pay — autonomously. Built on Solana.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen font-sans">
        <JsonLd />
        <ThemeProvider>
          <LocaleWrapper>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LocaleWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
