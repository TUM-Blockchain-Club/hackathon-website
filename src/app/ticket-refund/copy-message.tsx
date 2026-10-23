"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

type CopyState = "idle" | "copied" | "manual";

const LABELS: Record<CopyState, string> = {
  idle: "Copy text",
  copied: "Copied",
  manual: "Press Ctrl/Cmd+C",
};

export function CopyMessage({ text }: { text: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const textRef = useRef<HTMLParagraphElement>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetRef.current), []);

  const show = (next: CopyState) => {
    setState(next);
    clearTimeout(resetRef.current);
    resetRef.current = setTimeout(() => setState("idle"), 2000);
  };

  // Without clipboard access, select the text so the visitor can copy it.
  const selectText = () => {
    const node = textRef.current;
    const selection = window.getSelection();
    if (!node || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    show("manual");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      show("copied");
    } catch {
      selectText();
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
      <p
        ref={textRef}
        className="min-w-0 flex-1 select-all break-words border border-tbc-yellow/30 bg-tbc-yellow/[0.06] px-4 py-3 font-mono text-sm leading-relaxed text-white md:text-base"
      >
        {text}
      </p>
      <button
        type="button"
        onClick={copy}
        className={buttonVariants({
          variant: "secondary",
          className: "h-auto min-h-11 shrink-0 sm:min-w-36",
        })}
      >
        {state === "copied" ? (
          <Check aria-hidden="true" size={16} />
        ) : (
          <Copy aria-hidden="true" size={16} />
        )}
        <span aria-live="polite">{LABELS[state]}</span>
      </button>
    </div>
  );
}
