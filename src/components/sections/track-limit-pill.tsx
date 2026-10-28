"use client";

import { useHasStarted } from "@/lib/use-now";

/**
 * "Choose up to 3 tracks" strip above the prize tracks. Its "How to submit"
 * link stays greyed out until hacking starts, like the guide tab itself.
 */
export function TrackLimitPill({
  label,
  href,
  startIso,
}: {
  label: string;
  href: string;
  startIso: string;
}) {
  const unlocked = useHasStarted(startIso);
  const pill =
    "inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 rounded-[9999px] border border-tbc-yellow/30 bg-tbc-yellow/10 px-4 py-1.5 text-center text-xs font-semibold text-tbc-yellow backdrop-blur-sm sm:text-sm";

  if (!unlocked) {
    return (
      <div className={pill}>
        <span>{label}</span>
        <span className="text-white/35">How to submit →</span>
      </div>
    );
  }

  return (
    <a
      href={href}
      className={`group ${pill} transition-colors hover:border-tbc-yellow/60`}
    >
      <span>{label}</span>
      <span className="text-white/80 transition-colors group-hover:text-white">
        How to submit →
      </span>
    </a>
  );
}
