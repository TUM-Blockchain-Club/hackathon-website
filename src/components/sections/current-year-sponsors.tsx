import type { Sponsor } from "@/types/content";

import {
  SponsorCard,
  type SponsorCardSize,
} from "@/components/sections/rolling-sponsors";

type CurrentYearSponsorsProps = {
  sponsors: Sponsor[];
  /** Small divider caption, used to separate sponsor groups from each other. */
  label?: string;
  size?: SponsorCardSize;
};

export function CurrentYearSponsors({
  sponsors,
  label,
  size = "default",
}: CurrentYearSponsorsProps) {
  return (
    <div className="py-4">
      {label ? (
        <div className="mb-5 flex items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
            {label}
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
        </div>
      ) : null}
      <div className="flex flex-wrap justify-center gap-6">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.name} logo={sponsor} size={size} />
        ))}
      </div>
    </div>
  );
}
