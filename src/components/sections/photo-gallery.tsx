import { ArrowUpRight } from "lucide-react";

import { ThankYouBanner } from "@/components/sections/countdown-banner";
import { SectionShell } from "@/components/primitives/section-shell";
import PolaroidLineCarousel from "@/components/ui/polaroid-line-carousel";
import { hackathonPhotos, photoAlbum } from "@/content/photos";

export function PhotoGallery() {
  return (
    <div id="photos" className="scroll-mt-28">
      <ThankYouBanner />
      <SectionShell>
        <div className="relative">
          <PolaroidLineCarousel
            slides={hackathonPhotos}
            initialIndex={2}
            background="transparent"
            ariaLabel="Hackathon photo highlights"
          />
          <a
            href={photoAlbum.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View all photos in the full album"
            title="View all photos"
            className="absolute bottom-0 right-0 flex size-11 items-center justify-center text-white/50 transition-colors hover:text-tbc-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>
      </SectionShell>
    </div>
  );
}
