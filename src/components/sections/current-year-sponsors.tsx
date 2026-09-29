import type { Sponsor } from "@/types/content";
import { cn } from "@/lib/utils";
import {
  SponsorCard,
  type SponsorCardSize,
} from "@/components/sections/rolling-sponsors";

type CurrentYearSponsorsProps = {
  sponsors: Sponsor[];
  /** Caption / title displayed above the sponsor group */
  label?: string;
  /** Color theme of the label: "white" (default, e.g. PREMIUM) | "yellow" (e.g. STANDARD) | "muted" */
  labelColor?: "white" | "yellow" | "gold" | "muted";
  size?: SponsorCardSize;
  variant?: "default" | "glow";
};

export function CurrentYearSponsors({
  sponsors,
  label,
  labelColor = "white",
  size = "large",
  variant = "glow",
}: CurrentYearSponsorsProps) {
  return (
    <div className="py-1">
      {label ? (
        <div className="mb-2 sm:mb-2.5 flex justify-center">
          <p
            className={cn(
              "font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em]",
              labelColor === "yellow" || labelColor === "gold"
                ? "text-tbc-yellow"
                : labelColor === "muted"
                  ? "text-white/50"
                  : "text-white",
            )}
          >
            {label}
          </p>
        </div>
      ) : null}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {sponsors.map((sponsor) => (
          <SponsorCard
            key={sponsor.name}
            logo={sponsor}
            size={size}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
