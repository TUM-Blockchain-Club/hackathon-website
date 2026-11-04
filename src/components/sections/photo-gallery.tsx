import { ArrowUpRight } from "lucide-react";

import { ThankYouBanner } from "@/components/sections/countdown-banner";
import { SectionShell } from "@/components/primitives/section-shell";
import { buttonVariants } from "@/components/ui/button";
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
              className={buttonVariants({
                variant: "default",
                size: "default",
              })}
            >
              View full photo album
              <ArrowUpRight size={16} aria-hidden="true" className="shrink-0" />
            </a>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
