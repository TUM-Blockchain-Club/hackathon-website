"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";

export function CopyText({
  text,
  label = "Copy context",
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={copy}
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        {label}
      </button>
      <p role="status" className="min-h-4 text-xs text-white/60">
        {status === "copied"
          ? "Copied."
          : status === "error"
            ? "Copy failed. Select the text below and copy it."
            : "Review the context before you share it with your coding agent."}
      </p>
      <textarea
        aria-label={
          label === "Copy checklist"
            ? "Submission checklist"
            : "Coding agent context"
        }
        readOnly
        value={text}
        rows={9}
        className="w-full resize-y border border-white/15 bg-black p-3 font-mono text-xs leading-relaxed text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-tbc-yellow"
      />
    </div>
  );
}
