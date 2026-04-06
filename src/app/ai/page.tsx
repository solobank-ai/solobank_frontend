"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant" | "tool";
  content: string;
  toolName?: string;
}

export default function AiPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  async function send(text?: string) {
    const msg = text || input.trim();
    if (!msg || isStreaming) return;

    setInput("");
    setIsStreaming(true);

    setMessages((prev) => [...prev, { role: "user", content: msg }]);

    let assistantText = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "..." }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: msg }),
      });

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));

            if (event.type === "text") {
              assistantText = event.data.content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantText };
                return updated;
              });
            } else if (event.type === "tool_call") {
              setMessages((prev) => [
                ...prev.slice(0, -1),
                { role: "tool", content: JSON.stringify(event.data.args, null, 2), toolName: event.data.name },
                { role: "assistant", content: "..." },
              ]);
            } else if (event.type === "tool_result") {
              // Tool result handled, LLM will respond next
            } else if (event.type === "done") {
              setSessionId(event.data.sessionId);
            } else if (event.type === "error") {
              assistantText = `Error: ${event.data.message}`;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantText };
                return updated;
              });
            }
          } catch {
            // ignore parse errors
          }
        }
      }

      if (!assistantText) {
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[updated.length - 1]?.content === "...") {
            updated[updated.length - 1] = { role: "assistant", content: "No response" };
          }
          return updated;
        });
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: `Connection error: ${err instanceof Error ? err.message : "Unknown"}`,
        };
        return updated;
      });
    }

    setIsStreaming(false);
  }

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0b]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e22]">
        <div className="text-lg font-bold">
          <span className="gradient-text">Solobank</span>
          <span className="text-[#71717a] ml-2 text-sm font-normal">AI</span>
        </div>
        <a href="/" className="text-[#71717a] text-sm hover:text-white transition-colors">
          ← Back
        </a>
      </div>

      {/* Chat */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-[#52525b] text-lg mb-2">Ask anything about your finances</p>
            <p className="text-[#3f3f46] text-sm">Balance, send, swap, lend, borrow, pay for APIs</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user"
                ? "ml-auto bg-[#1e1e22] text-[#e4e4e7]"
                : msg.role === "tool"
                  ? "bg-[#0d1117] border border-[#14F19530] font-mono text-xs text-[#14F195] rounded-lg"
                  : "bg-[#14141a] border border-[#1e1e22] text-[#e4e4e7]"
            }`}
          >
            {msg.role === "tool" && (
              <div className="text-[#9945FF] font-semibold mb-1 text-xs">
                ⚡ {msg.toolName}
              </div>
            )}
            {msg.content === "..." ? (
              <span className="inline-block w-2 h-2 bg-[#14F195] rounded-full animate-pulse" />
            ) : (
              msg.content
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 md:px-6 pb-6 pt-4 border-t border-[#1e1e22]">
        <div className="flex items-center bg-[#14141a] border border-[#27272a] rounded-xl p-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isStreaming && send()}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent border-none outline-none text-[#e4e4e7] px-4 py-3 text-sm placeholder-[#52525b]"
            disabled={isStreaming}
          />
          <button
            onClick={() => send()}
            disabled={isStreaming || !input.trim()}
            className="bg-[#14F195] text-[#0a0a0b] rounded-lg w-9 h-9 flex items-center justify-center text-base font-bold disabled:opacity-30 hover:bg-[#0fd682] transition-colors"
          >
            ↑
          </button>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap justify-center">
          {["Check my balance", "Show lending rates for USDC", "What can you do?"].map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={isStreaming}
              className="bg-[#14141a] text-[#a1a1aa] border border-[#27272a] rounded-full px-3 py-1.5 text-xs font-mono uppercase tracking-wide hover:border-[#14F195] hover:text-[#14F195] transition-colors disabled:opacity-30"
            >
              {q.length > 20 ? q.slice(0, 20) + "…" : q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
