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
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-black">SOLOBANK</span>
          <span className="text-[10px] font-medium text-gray-400 border border-gray-300 rounded px-1.5 py-0.5 uppercase">beta</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 font-mono">Aa78c...SaNT</span>
          <button className="text-gray-400 hover:text-gray-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          </button>
        </div>
      </div>

      {/* Balance */}
      <div className="text-center py-4">
        <div className="text-5xl font-bold text-black">$0.00</div>
        <div className="text-sm text-gray-400 mt-1">available $0 <span className="text-xs">▼</span></div>
      </div>

      {/* Chat area */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-6">
        <div className="max-w-2xl mx-auto space-y-4 py-6">
          {messages.length === 0 && (
            <div className="flex items-center justify-center pt-20">
              <p className="text-gray-400 text-base">Good morning</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`${msg.role === "user" ? "flex justify-end" : ""}`}>
              <div
                className={`max-w-[80%] text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl"
                    : msg.role === "tool"
                      ? "bg-gray-50 border border-gray-200 font-mono text-xs text-gray-600 px-3 py-2 rounded-lg"
                      : "text-gray-800 px-1 py-2"
                }`}
              >
                {msg.role === "tool" && (
                  <div className="text-gray-400 font-semibold mb-1 text-[11px] uppercase tracking-wide">
                    {msg.toolName}
                  </div>
                )}
                {msg.content === "..." ? (
                  <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="px-6 pb-8 pt-4">
        <div className="max-w-2xl mx-auto">
          {/* Input box */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
            <button className="text-gray-400 mr-3 hover:text-gray-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isStreaming && send()}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent border-none outline-none text-gray-800 text-sm placeholder-gray-400"
              disabled={isStreaming}
            />
            <button
              onClick={() => send()}
              disabled={isStreaming || !input.trim()}
              className="text-gray-400 hover:text-gray-600 disabled:opacity-20 ml-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
            </button>
          </div>

          {/* What can I do */}
          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={() => send("What can you do?")}
              disabled={isStreaming}
              className="text-sm font-mono text-gray-500 hover:text-gray-800 disabled:opacity-30 flex items-center gap-1.5"
            >
              <span>✨</span> WHAT CAN I DO?
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 mt-3 justify-center flex-wrap">
            {[
              { label: "BALANCE", prompt: "Check my balance" },
              { label: "SEND", prompt: "I want to send USDC" },
              { label: "SWAP", prompt: "Swap SOL to USDC" },
              { label: "LEND", prompt: "Show me the best lending rates for USDC" },
              { label: "PAY", prompt: "What APIs can I pay for?" },
            ].map(({ label, prompt }) => (
              <button
                key={label}
                onClick={() => send(prompt)}
                disabled={isStreaming}
                className="text-xs font-mono text-gray-500 border border-gray-200 rounded-full px-4 py-1.5 hover:border-gray-400 hover:text-gray-800 transition-colors disabled:opacity-30 uppercase tracking-wide"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
