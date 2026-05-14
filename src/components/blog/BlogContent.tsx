import Link from "next/link";
import type { Block } from "@/lib/blog";

/* ------------------------------------------------------------------ */
/*  Inline markdown parser                                             */
/*  Supports **bold**, *italic*, `inline code`, [text](url)            */
/* ------------------------------------------------------------------ */

type InlineNode =
  | { kind: "text"; value: string }
  | { kind: "bold"; children: InlineNode[] }
  | { kind: "italic"; children: InlineNode[] }
  | { kind: "code"; value: string }
  | { kind: "link"; href: string; children: InlineNode[] };

function parseInline(input: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let i = 0;
  let buf = "";
  const flush = (): void => {
    if (buf) {
      nodes.push({ kind: "text", value: buf });
      buf = "";
    }
  };

  while (i < input.length) {
    const c = input[i];

    // Inline code: `...`
    if (c === "`") {
      const end = input.indexOf("`", i + 1);
      if (end !== -1) {
        flush();
        nodes.push({ kind: "code", value: input.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    // Bold: **...**
    if (c === "*" && input[i + 1] === "*") {
      const end = input.indexOf("**", i + 2);
      if (end !== -1) {
        flush();
        nodes.push({ kind: "bold", children: parseInline(input.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    }

    // Italic: *...*  (single asterisk, not part of **)
    if (c === "*" && input[i + 1] !== "*") {
      const end = input.indexOf("*", i + 1);
      if (end !== -1 && input[end + 1] !== "*") {
        flush();
        nodes.push({ kind: "italic", children: parseInline(input.slice(i + 1, end)) });
        i = end + 1;
        continue;
      }
    }

    // Link: [text](url)
    if (c === "[") {
      const closeText = input.indexOf("]", i + 1);
      if (closeText !== -1 && input[closeText + 1] === "(") {
        const closeHref = input.indexOf(")", closeText + 2);
        if (closeHref !== -1) {
          flush();
          nodes.push({
            kind: "link",
            href: input.slice(closeText + 2, closeHref),
            children: parseInline(input.slice(i + 1, closeText)),
          });
          i = closeHref + 1;
          continue;
        }
      }
    }

    buf += c;
    i += 1;
  }
  flush();
  return nodes;
}

function renderInline(nodes: InlineNode[], keyPrefix = ""): React.ReactNode {
  return nodes.map((n, idx) => {
    const k = `${keyPrefix}-${idx}`;
    switch (n.kind) {
      case "text":
        return <span key={k}>{n.value}</span>;
      case "bold":
        return (
          <strong key={k} className="font-semibold text-foreground">
            {renderInline(n.children, k)}
          </strong>
        );
      case "italic":
        return (
          <em key={k} className="italic">
            {renderInline(n.children, k)}
          </em>
        );
      case "code":
        return (
          <code
            key={k}
            className="font-mono text-[0.875em] text-solana-green bg-surface/60 border border-border rounded px-1.5 py-0.5"
          >
            {n.value}
          </code>
        );
      case "link": {
        const isExternal = /^https?:\/\//.test(n.href);
        if (isExternal) {
          return (
            <a
              key={k}
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-solana-green hover:underline"
            >
              {renderInline(n.children, k)}
            </a>
          );
        }
        return (
          <Link key={k} href={n.href} className="text-solana-green hover:underline">
            {renderInline(n.children, k)}
          </Link>
        );
      }
    }
  });
}

function Inline({ text }: { text: string }): React.ReactNode {
  return renderInline(parseInline(text));
}

/* ------------------------------------------------------------------ */
/*  Block renderer                                                     */
/* ------------------------------------------------------------------ */

export function BlogContent({ blocks }: { blocks: Block[] }): React.ReactElement {
  return (
    <div className="space-y-6 text-muted leading-relaxed">
      {blocks.map((block, idx) => {
        const key = `block-${idx}`;
        switch (block.type) {
          case "p":
            return (
              <p key={key} className="text-[15px] md:text-base">
                <Inline text={block.text} />
              </p>
            );

          case "h2":
            return (
              <h2
                key={key}
                id={block.id}
                className="scroll-mt-24 text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-12 mb-2"
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={key}
                id={block.id}
                className="scroll-mt-24 text-lg md:text-xl font-bold text-foreground mt-8 mb-1"
              >
                {block.text}
              </h3>
            );

          case "ul":
            return (
              <ul key={key} className="list-disc pl-6 space-y-2 text-[15px] md:text-base">
                {block.items.map((item, i) => (
                  <li key={`${key}-i-${i}`}>
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={key} className="list-decimal pl-6 space-y-2 text-[15px] md:text-base">
                {block.items.map((item, i) => (
                  <li key={`${key}-i-${i}`}>
                    <Inline text={item} />
                  </li>
                ))}
              </ol>
            );

          case "code":
            return (
              <pre
                key={key}
                className="bg-background/60 border border-border rounded-lg px-4 py-3 font-mono text-xs text-solana-green overflow-x-auto whitespace-pre-wrap break-words"
              >
                <code>{block.content}</code>
              </pre>
            );

          case "hr":
            return <hr key={key} className="border-border my-8" />;

          case "faq":
            return (
              <div
                key={key}
                className="bg-surface border border-border rounded-xl p-5"
              >
                <p className="font-semibold text-foreground mb-2">{block.q}</p>
                <p className="text-[15px] text-muted">
                  <Inline text={block.a} />
                </p>
              </div>
            );
        }
      })}
    </div>
  );
}
