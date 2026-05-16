"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Agents / frameworks Solobank works with                            */
/*                                                                     */
/*  Each entry maps to a real integration path:                        */
/*    - MCP-native runtimes use @solobank/mcp out of the box           */
/*    - SDK-native frameworks use @solobank/sdk                        */
/*  The strip is read first as a credibility signal — "you can drop    */
/*  this in next to the agent stack you already have."                 */
/*                                                                     */
/*  Brand marks are inlined as SVG paths from simple-icons (CC0).      */
/* ------------------------------------------------------------------ */

interface Compat {
  name: string;
  icon: ReactNode;
  via: "MCP" | "SDK";
}

// All paths are 24x24 viewBox. Brand colors are the official hex from
// simple-icons; the ring also picks them up on hover via currentColor.
const BrandSvg = ({ d, label, color }: { d: string; label: string; color: string }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8"
    role="img"
    aria-label={label}
    style={{ color }}
  >
    <path d={d} fill="currentColor" />
  </svg>
);

const ICONS = {
  claude:
    "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z",
  cursor:
    "M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23",
  windsurf:
    "M23.55 5.067c-1.2038-.002-2.1806.973-2.1806 2.1765v4.8676c0 .972-.8035 1.7594-1.7597 1.7594-.568 0-1.1352-.286-1.4718-.7659l-4.9713-7.1003c-.4125-.5896-1.0837-.941-1.8103-.941-1.1334 0-2.1533.9635-2.1533 2.153v4.8957c0 .972-.7969 1.7594-1.7596 1.7594-.57 0-1.1363-.286-1.4728-.7658L.4076 5.1598C.2822 4.9798 0 5.0688 0 5.2882v4.2452c0 .2147.0656.4228.1884.599l5.4748 7.8183c.3234.462.8006.8052 1.3509.9298 1.3771.313 2.6446-.747 2.6446-2.0977v-4.893c0-.972.7875-1.7593 1.7596-1.7593h.003a1.798 1.798 0 0 1 1.4718.7658l4.9723 7.0994c.4135.5905 1.05.941 1.8093.941 1.1587 0 2.1515-.9645 2.1515-2.153v-4.8948c0-.972.7875-1.7594 1.7596-1.7594h.194a.22.22 0 0 0 .2204-.2202v-4.622a.22.22 0 0 0-.2203-.2203Z",
  zed:
    "M2.25 1.5a.75.75 0 0 0-.75.75v16.5H0V2.25A2.25 2.25 0 0 1 2.25 0h20.095c1.002 0 1.504 1.212.795 1.92L10.764 14.298h3.486V12.75h1.5v1.922a1.125 1.125 0 0 1-1.125 1.125H9.264l-2.578 2.578h11.689V9h1.5v9.375a1.5 1.5 0 0 1-1.5 1.5H5.185L2.562 22.5H21.75a.75.75 0 0 0 .75-.75V5.25H24v16.5A2.25 2.25 0 0 1 21.75 24H1.655C.653 24 .151 22.788.86 22.08L13.19 9.75H9.75v1.5h-1.5V9.375A1.125 1.125 0 0 1 9.375 8.25h5.314l2.625-2.625H5.625V15h-1.5V5.625a1.5 1.5 0 0 1 1.5-1.5h13.19L21.438 1.5z",
  langchain:
    "M13.796 0a6.93 6.93 0 0 0-4.91 2.019L5.451 5.455l3.273 3.27 3.432-3.432a2.284 2.284 0 0 1 3.277 0 2.28 2.28 0 0 1 0 3.275L12 12.001l3.273 3.273 3.433-3.435c2.692-2.692 2.692-7.127 0-9.82A6.92 6.92 0 0 0 13.796 0m-5.07 8.728-3.433 3.434c-2.692 2.693-2.692 7.126 0 9.819A6.92 6.92 0 0 0 10.203 24a6.93 6.93 0 0 0 4.911-2.02l3.432-3.432-3.271-3.272-3.433 3.433a2.284 2.284 0 0 1-3.277 0 2.28 2.28 0 0 1 0-3.276L12 12z",
  crewai:
    "M12.482.18C7.161 1.319 1.478 9.069 1.426 15.372c-.051 5.527 3.1 8.68 8.68 8.627 6.716-.05 14.259-6.87 12.09-10.9-.672-1.292-1.396-1.344-2.687-.207-1.602 1.395-1.654.31-.207-2.893 1.757-3.98 1.705-5.322-.31-7.544C17.03.388 14.962-.388 12.482.181Zm5.322 2.068c2.273 2.015 2.376 4.236.465 8.42-1.395 3.1-2.17 3.515-3.824 1.86-1.24-1.24-1.343-3.46-.258-6.044 1.137-2.635.982-3.1-.568-1.653-3.72 3.358-6.458 9.765-5.424 12.503.464 1.189.825 1.395 2.737 1.395 2.79 0 6.303-1.705 7.957-3.926 1.756-2.274 2.79-2.274 2.79-.052 0 3.875-6.459 8.627-11.625 8.627-6.251 0-9.351-4.752-7.491-11.47.878-2.995 4.443-7.904 7.077-9.66 3.255-2.17 5.684-2.17 8.164 0z",
  vercel: "m12 1.608 12 20.784H0Z",
} as const;

// Brand hex from simple-icons. Cursor and Vercel are monochrome brands —
// rendered white so they read on the dark surface.
const ITEMS: Compat[] = [
  { name: "Claude",     icon: <BrandSvg d={ICONS.claude}    label="Claude"    color="#D97757" />, via: "MCP" },
  { name: "Cursor",     icon: <BrandSvg d={ICONS.cursor}    label="Cursor"    color="#FFFFFF" />, via: "MCP" },
  { name: "Windsurf",   icon: <BrandSvg d={ICONS.windsurf}  label="Windsurf"  color="#09B6A2" />, via: "MCP" },
  { name: "Zed",        icon: <BrandSvg d={ICONS.zed}       label="Zed"       color="#084CCD" />, via: "MCP" },
  { name: "LangChain",  icon: <BrandSvg d={ICONS.langchain} label="LangChain" color="#FFFFFF" />, via: "SDK" },
  { name: "CrewAI",     icon: <BrandSvg d={ICONS.crewai}    label="CrewAI"    color="#FF5A50" />, via: "SDK" },
  { name: "LlamaIndex", icon: <span aria-label="LlamaIndex" className="text-3xl leading-none">🦙</span>, via: "SDK" },
  { name: "Vercel AI",  icon: <BrandSvg d={ICONS.vercel}    label="Vercel"    color="#FFFFFF" />, via: "SDK" },
];

export function WorksWith(): React.ReactElement {
  return (
    <section
      aria-labelledby="works-with-title"
      className="py-8 md:py-10 border-y border-border/60 bg-surface/30"
    >
      <div className="w-full px-8">
        <p
          id="works-with-title"
          className="text-center text-sm md:text-base font-medium tracking-[0.2em] uppercase text-dim mb-6"
        >
          Works with the agents you already run
        </p>

        {/* Infinite marquee — duplicate the list so translateX(-50%) loops seamlessly */}
        <div className="marquee-mask overflow-hidden">
          <ul className="marquee-track items-center" aria-label="Compatible agent runtimes">
            {[...ITEMS, ...ITEMS].map((item, i) => (
              <li
                key={`${item.name}-${i}`}
                className="flex items-center gap-4 flex-shrink-0 text-muted hover:text-foreground transition-colors group px-8"
                title={`${item.name} — via ${item.via}`}
                aria-hidden={i >= ITEMS.length ? "true" : undefined}
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center",
                    "w-14 h-14 rounded-full border border-border",
                    "bg-background/40",
                    "group-hover:border-border-hover",
                    "transition-colors",
                  )}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span className="text-2xl md:text-3xl font-medium tracking-tight whitespace-nowrap">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-sm md:text-base text-dim">
          MCP-native for Claude, Cursor, Windsurf, Zed — and SDK-compatible
          with every other agent runtime.
        </p>
      </div>
    </section>
  );
}
