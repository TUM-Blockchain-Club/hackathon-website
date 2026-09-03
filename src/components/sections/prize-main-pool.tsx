import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { prizeContent } from "@/content/prizes";
import { cn } from "@/lib/utils";
import type { PrizeTrack } from "@/types/content";

type PrizeMainPoolProps = {
  className?: string;
  compact?: boolean;
  constrained?: boolean;
  showFaqLink?: boolean;
  showDetailsLink?: boolean;
  showPills?: boolean;
  variant?: "boxed" | "ambient";
  tracks?: PrizeTrack[];
};

export function PrizeMainPool({
  className,
  constrained = true,
  showFaqLink = false,
  showDetailsLink = true,
  showPills = true,
  variant = "boxed",
  tracks = [],
}: PrizeMainPoolProps) {
  if (variant === "ambient") {
    return (
      <div
        className={cn(
          "relative isolate mx-auto flex w-full max-w-4xl flex-col items-center justify-center py-4 text-center sm:py-6",
          className,
        )}
      >
        {/* Soft background ambient glow that fades smoothly into transparency */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="h-[360px] w-[750px] max-w-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,193,16,0.22)_0%,rgba(244,67,54,0.16)_40%,rgba(111,61,226,0.12)_65%,transparent_85%)] blur-3xl opacity-90" />
        </div>

        {/* Big Prize Amount & Subtitle */}
        <h1 className="font-display text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] sm:text-6xl md:text-7xl">
          {prizeContent.mainPoolAmount}
        </h1>
        <p className="mt-1.5 text-base font-medium text-white/80 drop-shadow-sm sm:text-lg md:text-xl">
          {prizeContent.mainPoolSubhead ?? "Available in prizes"}
        </p>

        {/* Optional Pills */}
        {showPills && tracks.length > 0 ? (
          <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            {tracks.map((track) => {
              const markSrc = track.sponsorMarkSrc ?? track.sponsorLogoSrc;

              return (
                <Link
                  key={track.slug}
                  href={`/prizes#${track.slug}`}
                  className="group inline-flex items-center gap-3.5 rounded-[9999px] border border-white/15 bg-white/[0.06] py-2.5 pl-3 pr-5 backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {markSrc ? (
                    <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[9999px] bg-white shadow-sm transition-transform group-hover:scale-105">
                      <Image
                        src={markSrc}
                        alt={`${track.sponsor} logo`}
                        fill
                        sizes="40px"
                        className="object-contain p-2"
                      />
                    </span>
                  ) : (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[9999px] bg-white font-mono text-xs font-bold text-black">
                      {track.sponsor[0]}
                    </span>
                  )}
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-sm font-bold tracking-tight text-white">
                      {track.sponsor}
                    </span>
                    <span className="text-xs font-semibold text-white/70">
                      {track.amount ?? prizeContent.trackAmountFallback}
                    </span>
                  </div>
                </Link>
              );
            })}

            {showDetailsLink ? (
              <Link
                href="/prizes"
                className="inline-flex items-center justify-center gap-2 rounded-[9999px] bg-white px-6 py-3 text-sm font-bold text-black shadow-lg transition-all hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ color: "#000000" }}
              >
                <span>See prize details</span>
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(constrained ? "mx-auto max-w-5xl" : "w-full", className)}
    >
      <div className="surface-panel prize-pool-field overflow-hidden">
        <div className="flex flex-col items-center justify-center p-8 text-center sm:p-10 md:p-14">
          {/* Big Prize Amount & Subtitle */}
          <h2 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            {prizeContent.mainPoolAmount}
          </h2>
          <p className="mt-2 text-lg font-medium text-white/70 sm:text-xl md:text-2xl">
            {prizeContent.mainPoolSubhead ?? "Available in prizes"}
          </p>

          {/* Pill Row: Track chips + CTA button */}
          {showPills && tracks.length > 0 ? (
            <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              {tracks.map((track) => {
                const markSrc = track.sponsorMarkSrc ?? track.sponsorLogoSrc;

                return (
                  <Link
                    key={track.slug}
                    href={`/prizes#${track.slug}`}
                    className="group inline-flex items-center gap-3.5 rounded-[9999px] border border-white/15 bg-white/[0.06] py-2.5 pl-3 pr-5 backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {markSrc ? (
                      <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[9999px] bg-white shadow-sm transition-transform group-hover:scale-105">
                        <Image
                          src={markSrc}
                          alt={`${track.sponsor} logo`}
                          fill
                          sizes="40px"
                          className="object-contain p-2"
                        />
                      </span>
                    ) : (
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-[9999px] bg-white font-mono text-xs font-bold text-black">
                        {track.sponsor[0]}
                      </span>
                    )}
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-sm font-bold tracking-tight text-white">
                        {track.sponsor}
                      </span>
                      <span className="text-xs font-semibold text-white/70">
                        {track.amount ?? prizeContent.trackAmountFallback}
                      </span>
                    </div>
                  </Link>
                );
              })}

              {showDetailsLink ? (
                <Link
                  href="/prizes"
                  className="inline-flex items-center justify-center gap-2 rounded-[9999px] bg-white px-6 py-3 text-sm font-bold text-black shadow-lg transition-all hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ color: "#000000" }}
                >
                  <span>See prize details</span>
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {showFaqLink ? (
        <div className="mt-8 flex justify-center">
          <Link
            href="/faq#judging-prizes"
            className={buttonVariants({ variant: "outline" })}
          >
            Judging FAQ
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
