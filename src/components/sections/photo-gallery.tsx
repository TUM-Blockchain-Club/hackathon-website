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
              className="group inline-flex min-h-14 max-w-full items-center justify-center gap-4 border border-tbc-yellow bg-tbc-yellow px-7 py-4 font-display text-base font-bold shadow-[0_8px_36px_-12px_rgba(255,193,16,0.55)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#ffd34d] hover:shadow-[0_10px_44px_-10px_rgba(255,193,16,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none"
              style={{ color: "#000000" }}
            >
              View full photo album
              <ArrowUpRight
                size={20}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
