"use client";

import Image from "next/image";
import type { Sponsor } from "@/types/content";
import { cn } from "@/lib/utils";

export type SponsorCardSize = "large" | "default" | "compact";

const marqueeSizeClasses: Record<SponsorCardSize, string> = {
  large: "w-64 h-32 md:w-[360px] md:h-[176px] p-4 md:p-6 rounded-xl",
  default: "w-48 h-20 md:w-[240px] md:h-[96px] p-3 md:p-4 rounded-xl",
  compact: "w-36 h-14 md:w-[168px] md:h-[64px] p-2.5 md:p-3 rounded-lg",
};

const glowSizeClasses: Record<SponsorCardSize, string> = {
  large:
    "w-[260px] h-[95px] sm:w-[320px] sm:h-[110px] md:w-[380px] md:h-[125px] p-3 sm:p-4 md:p-5 rounded-[16px] md:rounded-[20px]",
  default:
    "w-[220px] h-[80px] sm:w-[270px] sm:h-[95px] md:w-[310px] md:h-[105px] p-2.5 sm:p-3 md:p-4 rounded-[14px] md:rounded-[18px]",
  compact:
    "w-[180px] h-[60px] sm:w-[220px] sm:h-[70px] md:w-[250px] md:h-[80px] p-2 sm:p-2.5 md:p-3 rounded-[12px] md:rounded-[16px]",
};

/** Keeps Next.js from downloading a thumbnail for a card it renders large. */
const sponsorCardSizeHints: Record<SponsorCardSize, string> = {
  large: "(min-width: 768px) 380px, 260px",
  default: "(min-width: 768px) 310px, 220px",
  compact: "(min-width: 768px) 250px, 180px",
};

export function SponsorCard({
  logo,
  size = "default",
  variant = "default",
}: {
  logo: Sponsor;
  size?: SponsorCardSize;
  variant?: "default" | "glow";
}) {
  const isGlow = variant === "glow";

  const cardContent = (
    <div
      className={cn(
        "group relative flex-shrink-0 bg-white flex items-center justify-center transition-all duration-300",
        isGlow
          ? cn(
              glowSizeClasses[size],
              "shadow-[0_0_50px_rgba(255,255,255,0.16)] hover:shadow-[0_0_65px_rgba(255,255,255,0.28)] hover:scale-[1.02]",
            )
          : cn(
              marqueeSizeClasses[size],
              "shadow-sm border border-black/5 hover:scale-[1.03] hover:shadow-md",
            ),
      )}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {logo.logoSrc ? (
          <Image
            src={logo.logoSrc}
            alt={logo.logoAlt ?? `${logo.name} logo`}
            fill
            className={cn(
              "object-contain transition-all duration-300",
              logo.logoPadding || (isGlow ? "p-4 sm:p-6" : "p-1"),
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
        className={cn(
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-tbc-yellow block flex-shrink-0",
          isGlow ? "rounded-[20px] md:rounded-[24px]" : "rounded-xl",
        )}
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
