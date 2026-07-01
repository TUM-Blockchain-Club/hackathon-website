import type { Sponsor } from "@/types/content";

import { SponsorCard } from "@/components/sections/rolling-sponsors";

type CurrentYearSponsorsProps = {
  sponsors: Sponsor[];
};

export function CurrentYearSponsors({ sponsors }: CurrentYearSponsorsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-6 py-4">
      {sponsors.map((sponsor) => (
        <SponsorCard key={sponsor.name} logo={sponsor} />
      ))}
    </div>
  );
}
