"use client";

import { useSyncExternalStore } from "react";

function subscribeToMinuteTick(onTick: () => void) {
  const id = window.setInterval(onTick, 30_000);
  return () => window.clearInterval(id);
}

/**
 * Announces when hacking begins, then switches to the submission deadline
 * once the hackathon has started.
 */
export function DeadlinePill({
  href,
  startLabel,
  startIso,
  deadline,
}: {
  href: string;
  startLabel: string;
  startIso: string;
  deadline: string;
}) {
  const started = useSyncExternalStore(
    subscribeToMinuteTick,
    () => Date.now() >= Date.parse(startIso),
    // The page is prerendered before the event, so render the start first.
    () => false,
  );

  return (
    <a
      href={href}
      className="group inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 rounded-[9999px] border border-tbc-yellow/30 bg-tbc-yellow/10 px-4 py-1.5 text-center text-xs font-semibold text-tbc-yellow backdrop-blur-sm transition-colors hover:border-tbc-yellow/60 sm:text-sm"
    >
      <span>
        {started
          ? `Submissions close ${deadline}`
          : `Hackathon begins ${startLabel}`}
      </span>
      <span className="text-white/80 transition-colors group-hover:text-white">
        How to submit →
      </span>
    </a>
  );
}
