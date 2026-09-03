"use client";

import Image from "next/image";
import type { Sponsor } from "@/types/content";
import { cn } from "@/lib/utils";

export type SponsorCardSize = "large" | "default" | "compact";

const sponsorCardSizeClasses: Record<SponsorCardSize, string> = {
  large: "w-64 h-32 md:w-[360px] md:h-[176px] p-4 md:p-6",
  default: "w-48 h-20 md:w-[240px] md:h-[96px] p-3 md:p-4",
  compact: "w-36 h-14 md:w-[168px] md:h-[64px] p-2.5 md:p-3",
};

/** Keeps Next.js from downloading a thumbnail for a card it renders large. */
const sponsorCardSizeHints: Record<SponsorCardSize, string> = {
  large: "(min-width: 768px) 360px, 256px",
  default: "(min-width: 768px) 240px, 192px",
  compact: "(min-width: 768px) 168px, 144px",
};

export function SponsorCard({
  logo,
  size = "default",
}: {
  logo: Sponsor;
  size?: SponsorCardSize;
}) {
  const cardContent = (
    <div
      className={cn(
        "group relative flex-shrink-0 bg-white rounded-xl shadow-sm border border-black/5 flex items-center justify-center transition-all duration-300 hover:scale-[1.03] hover:shadow-md",
        sponsorCardSizeClasses[size],
      )}
    >
      <div className="relative w-full h-full">
        {logo.logoSrc ? (
          <Image
            src={logo.logoSrc}
            alt={logo.logoAlt ?? `${logo.name} logo`}
            fill
            className={cn(
              "object-contain transition-all duration-300",
              logo.logoPadding || "p-1",
            )}
            style={{
              transform: logo.logoScale
                ? `scale(${logo.logoScale})`
                : undefined,
            }}
            sizes={sponsorCardSizeHints[size]}
          />
        ) : (
          <span className="text-black font-mono text-xs font-semibold uppercase tracking-wider text-center block truncate px-2">
            {logo.name}
          </span>
        )}
      </div>
    </div>
  );

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${logo.name} official website`}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-tbc-yellow rounded-xl block flex-shrink-0"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

function MarqueeRow({
  items,
  direction,
  size,
  keyPrefix,
}: {
  items: Sponsor[];
  direction: "left" | "right";
  size: SponsorCardSize;
  keyPrefix: string;
}) {
  return (
    <div className="w-full overflow-hidden py-1">
      <div
        className={cn(
          "flex gap-6 w-max hover:[animation-play-state:paused] active:[animation-play-state:paused]",
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right",
        )}
      >
        {/* Render first pass */}
        {items.map((logo, index) => (
          <SponsorCard
            key={`${keyPrefix}-1-${logo.name}-${index}`}
            logo={logo}
            size={size}
          />
        ))}
        {/* Render duplicate pass for seamless looping */}
        {items.map((logo, index) => (
          <SponsorCard
            key={`${keyPrefix}-2-${logo.name}-${index}`}
            logo={logo}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}

interface RollingSponsorsProps {
  sponsors: Sponsor[];
  /**
   * "default" renders two full-size rolling rows (the hero treatment).
   * "compact" collapses everything into a single, smaller rolling strip —
   * used for past-edition sponsors so this year's list stays the highlight.
   */
  variant?: "default" | "compact";
}

export function RollingSponsors({
  sponsors,
  variant = "default",
}: RollingSponsorsProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "relative w-screen left-1/2 -translate-x-1/2 overflow-hidden flex flex-col select-none",
        isCompact ? "py-2 gap-0" : "py-4 gap-6",
      )}
    >
      {/* Left Fade Overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 md:w-44 bg-gradient-to-r from-black via-black/30 to-transparent" />

      {/* Right Fade Overlay */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 md:w-44 bg-gradient-to-l from-black via-black/30 to-transparent" />

      {isCompact ? (
        <MarqueeRow
          items={sponsors}
          direction="left"
          size="compact"
          keyPrefix="compact"
        />
      ) : (
        <>
          <MarqueeRow
            items={sponsors.slice(0, Math.ceil(sponsors.length / 2))}
            direction="left"
            size="default"
            keyPrefix="row1"
          />
          <MarqueeRow
            items={sponsors.slice(Math.ceil(sponsors.length / 2))}
            direction="right"
            size="default"
            keyPrefix="row2"
          />
        </>
      )}
    </div>
  );
}
