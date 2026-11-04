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
          <div className="flex justify-center border-t border-white/10 pt-5">
            <a
              href={photoAlbum.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-3 border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-tbc-yellow hover:text-tbc-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              View full photo album
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
