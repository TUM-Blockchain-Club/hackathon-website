"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Hackathon starts October 30, 2026 at 09:00 AM Munich time (CET / UTC+1)
const DEFAULT_TARGET_DATE = "2026-10-30T09:00:00+01:00";

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

function calculateTimeRemaining(targetIso: string): TimeRemaining {
  const target = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0 || isNaN(target)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isComplete: false };
}

type CountdownBannerProps = {
  targetDate?: string;
  eyebrow?: string;
  title?: string;
  className?: string;
};

export function CountdownBanner({
  targetDate = DEFAULT_TARGET_DATE,
  eyebrow = "COUNTDOWN TO",
  title = "TUM Blockchain Hackathon",
  className,
}: CountdownBannerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <section
      aria-label="Hackathon Countdown"
      className={cn(
        "relative isolate overflow-hidden border-y border-white/10 bg-black py-8 md:py-10",
        className,
      )}
    >
      {/* Background accents matching TBC branding */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-[var(--tbc-yellow)] opacity-10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-[var(--tbc-purple)] opacity-15 blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row md:items-center lg:gap-12">
        {/* Left Side: Eyebrow + Event Title */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[var(--tbc-yellow)]">
            {eyebrow}
          </p>
          <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>

        {/* Right Side: 4 Countdown Digits */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 md:gap-8 lg:gap-10">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex min-w-[62px] flex-col items-center sm:min-w-[76px] md:min-w-[90px] lg:min-w-[104px]"
            >
              <div className="relative flex items-center justify-center">
                <span
                  suppressHydrationWarning
                  className="countdown-3d-num block select-none text-center font-display text-3xl font-black leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-7xl tabular-nums"
                >
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="mt-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 sm:text-xs">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
