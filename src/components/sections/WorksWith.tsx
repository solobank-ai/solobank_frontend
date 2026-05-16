"use client";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Agents / frameworks Solobank works with                            */
/*                                                                     */
/*  Each entry maps to a real integration path:                        */
/*    - MCP-native runtimes use @solobank/mcp out of the box           */
/*    - SDK-native frameworks use @solobank/sdk                        */
/*  The strip is read first as a credibility signal — "you can drop    */
/*  this in next to the agent stack you already have."                 */
/* ------------------------------------------------------------------ */

interface Compat {
  name: string;
  mark: string;          // 1–2 char monogram
  via: "MCP" | "SDK";    // integration path
}

const ITEMS: Compat[] = [
  { name: "Claude",       mark: "C",  via: "MCP" },
  { name: "Cursor",       mark: "C",  via: "MCP" },
  { name: "Windsurf",     mark: "W",  via: "MCP" },
  { name: "Zed",          mark: "Z",  via: "MCP" },
  { name: "LangChain",    mark: "🦜", via: "SDK" },
  { name: "CrewAI",       mark: "Cr", via: "SDK" },
  { name: "LlamaIndex",   mark: "Li", via: "SDK" },
  { name: "Vercel AI",    mark: "▲",  via: "SDK" },
];

export function WorksWith(): React.ReactElement {
  return (
    <section
      aria-labelledby="works-with-title"
      className="py-16 md:py-20 border-y border-border/60 bg-surface/30"
    >
      <div className="max-w-7xl mx-auto px-6">
        <p
          id="works-with-title"
          className="text-center text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-dim mb-10"
        >
          Works with the agents you already run
        </p>

        {/* Horizontal scroll on mobile, even flex on md+ */}
        <ul
          className={cn(
            "flex items-center gap-x-10 gap-y-6 flex-nowrap overflow-x-auto",
            "md:flex-wrap md:justify-center md:overflow-visible",
            // Hide scrollbar but keep horizontal scrolling
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "px-1",
          )}
        >
          {ITEMS.map((item) => (
            <li
              key={item.name}
              className="flex items-center gap-3 flex-shrink-0 text-muted hover:text-foreground transition-colors group"
              title={`${item.name} — via ${item.via}`}
            >
              <span
                className={cn(
                  "inline-flex items-center justify-center",
                  "w-8 h-8 rounded-full border border-border",
                  "bg-background/40 text-xs font-semibold",
                  "text-dim group-hover:text-foreground group-hover:border-border-hover",
                  "transition-colors",
                )}
                aria-hidden="true"
              >
                {item.mark}
              </span>
              <span className="text-base md:text-lg font-medium tracking-tight whitespace-nowrap">
                {item.name}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-xs text-dim">
          MCP-native for Claude, Cursor, Windsurf, Zed — and SDK-compatible
          with every other agent runtime.
        </p>
      </div>
    </section>
  );
}
