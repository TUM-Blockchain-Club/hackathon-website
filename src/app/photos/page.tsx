import type { Metadata } from "next";

import { PhotoGallery } from "@/components/sections/photo-gallery";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Photos from the TUM Blockchain & AI Hackathon 2026. Browse the Polaroid highlights and open the full photo album.",
  alternates: { canonical: "/photos" },
};

export default function PhotosPage() {
  return (
    <div className="min-h-svh pt-24 sm:pt-28">
      <h1 className="sr-only">Hackathon photos</h1>
      <PhotoGallery />
    </div>
  );
}
