import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Accounts", href: "#accounts" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Docs", href: "/docs" },
  ],
  Gateway: [
    { label: "Services", href: "/services" },
    { label: "Stats", href: "/stats" },
  ],
  Resources: [
    {
      label: "GitHub",
      href: "https://github.com/decentrathon/",
      external: true,
    },
    { label: "npm", href: "https://npmjs.com", external: true },
  ],
  Legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Security", href: "/security" },
  ],
};

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-lg font-bold gradient-text">Solobank</span>
          <span className="text-dim text-sm">·</span>
          <span className="text-dim text-sm">Built on Solana</span>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-sm font-medium text-foreground mb-4">
                {category}
              </p>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted hover:text-foreground transition-colors inline-flex items-center gap-1 py-1"
                      >
                        {link.label}
                        <ArrowUpRight size={12} className="opacity-50" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted hover:text-foreground transition-colors block py-1"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-dim">
            © 2025 Solobank. Open source. Non-custodial.
          </p>
          <p className="text-xs text-dim">Built on Solana</p>
        </div>
      </div>
    </footer>
  );
}
