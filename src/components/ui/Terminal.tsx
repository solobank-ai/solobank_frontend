"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  lines: string[];
  className?: string;
}

export function Terminal({ lines, className }: TerminalProps): React.ReactElement {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isTyping) return;
    if (currentLineIndex >= lines.length) {
      // All lines done — pause 3s then replay
      timeoutRef.current = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentText("");
      }, 3000);
      return;
    }

    const line = lines[currentLineIndex] ?? "";

    if (line === "") {
      // Empty line — short pause then advance
      timeoutRef.current = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, ""]);
        setCurrentLineIndex((i) => i + 1);
        setCurrentText("");
      }, 200);
      return;
    }

    // Type character by character
    let charIndex = 0;
    intervalRef.current = setInterval(() => {
      charIndex++;
      setCurrentText(line.slice(0, charIndex));
      if (charIndex >= line.length) {
        clearInterval(intervalRef.current!);
        // Pause between lines
        timeoutRef.current = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, line]);
          setCurrentLineIndex((i) => i + 1);
          setCurrentText("");
        }, 180);
      }
    }, 28);

    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutRef.current!);
    };
  }, [currentLineIndex, isTyping, lines]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  const isCommand = (line: string): boolean => line.startsWith("$");
  const isConfirmed = (line: string): boolean => line.startsWith("✓");

  return (
    <div
      className={cn(
        "bg-[#0D0D0F] border border-border rounded-2xl overflow-hidden",
        className
      )}
    >
      {/* Title bar */}
      <div className="h-10 flex items-center px-4 border-b border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-xs text-dim font-mono mx-auto">auton — terminal</span>
      </div>

      {/* Content */}
      <div className="font-mono text-[13px] p-6 min-h-[300px] leading-relaxed">
        {displayedLines.map((line, i) => (
          <div key={i} className={cn(
            "whitespace-pre",
            isCommand(line) && "text-foreground",
            isConfirmed(line) && "text-solana-green",
            !isCommand(line) && !isConfirmed(line) && line !== "" && "text-muted"
          )}>
            {line === "" ? "\u00A0" : line}
          </div>
        ))}

        {/* Currently typing line */}
        {currentLineIndex < lines.length && (
          <div className={cn(
            "whitespace-pre",
            isCommand(currentText) && "text-foreground",
            isConfirmed(currentText) && "text-solana-green",
            !isCommand(currentText) && !isConfirmed(currentText) && "text-muted"
          )}>
            {currentText}
            <span className="animate-pulse text-solana-green">█</span>
          </div>
        )}
      </div>
    </div>
  );
}
