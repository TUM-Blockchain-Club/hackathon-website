"use client";

import Image from "next/image";
import type { Sponsor } from "@/types/content";
import { cn } from "@/lib/utils";

function SponsorCard({
  logo,
}: {
  logo: Sponsor;
}) {
  const cardContent = (
    <div className="group relative w-48 h-20 md:w-[240px] md:h-[96px] flex-shrink-0 bg-white rounded-xl shadow-sm border border-black/5 flex items-center justify-center p-3 md:p-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-md">
      <div className="relative w-full h-full">
        {logo.logoSrc ? (
          <Image
            src={logo.logoSrc}
            alt={`${logo.name} logo`}
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
            sizes="(min-width: 768px) 208px, 168px"
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

interface RollingSponsorsProps {
  sponsors: Sponsor[];
}

export function RollingSponsors({ sponsors }: RollingSponsorsProps) {
  const midIndex = Math.ceil(sponsors.length / 2);
  const row1 = sponsors.slice(0, midIndex);
  const row2 = sponsors.slice(midIndex);

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-4 flex flex-col gap-6 select-none">
      {/* Left Fade Overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 md:w-44 bg-gradient-to-r from-black via-black/30 to-transparent" />

      {/* Right Fade Overlay */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 md:w-44 bg-gradient-to-l from-black via-black/30 to-transparent" />

      {/* Top Row: Scroll Left */}
      <div className="w-full overflow-hidden py-1">
        <div className="flex gap-6 w-max animate-marquee-left hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {/* Render first pass */}
          {row1.map((logo, index) => (
            <SponsorCard key={`row1-1-${logo.name}-${index}`} logo={logo} />
          ))}
          {/* Render duplicate pass for seamless looping */}
          {row1.map((logo, index) => (
            <SponsorCard key={`row1-2-${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
      </div>

      {/* Bottom Row: Scroll Right */}
      <div className="w-full overflow-hidden py-1">
        <div className="flex gap-6 w-max animate-marquee-right hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {/* Render first pass */}
          {row2.map((logo, index) => (
            <SponsorCard key={`row2-1-${logo.name}-${index}`} logo={logo} />
          ))}
          {/* Render duplicate pass for seamless looping */}
          {row2.map((logo, index) => (
            <SponsorCard key={`row2-2-${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}
