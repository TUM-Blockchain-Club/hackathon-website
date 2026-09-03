import type { Metadata } from "next";

import { SectionShell } from "@/components/primitives/section-shell";
import { PrizeMainPool } from "@/components/sections/prize-main-pool";
import { PrizeTracks } from "@/components/sections/prize-tracks";
import { prizeContent, prizeTracks } from "@/content/prizes";

export const metadata: Metadata = {
  title: prizeContent.title,
  description: prizeContent.description,
};

export default function PrizesPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28">
      {/* Smooth centered ambient glow in the middle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center overflow-hidden pt-8"
      >
        <div className="h-[480px] w-[720px] max-w-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,193,16,0.22)_0%,rgba(244,67,54,0.15)_35%,rgba(111,61,226,0.09)_65%,transparent_85%)] blur-[85px]" />
      </div>

      <div className="site-container">
        {/* Top total prize header: number + title with smooth ambient aura */}
        <PrizeMainPool
          variant="ambient"
          showPills={false}
          showDetailsLink={false}
          tracks={prizeTracks}
        />

        {/* Tabbed Prize Tracks fitting comfortably in the screen */}
        <div className="mt-4 sm:mt-6">
          <PrizeTracks tracks={prizeTracks} />
        </div>
      </div>
    </div>
  );
}
