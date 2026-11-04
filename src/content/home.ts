import type { ContentSection } from "@/types/content";
import { siteConfig } from "@/content/site";
import { photoAlbum } from "@/content/photos";

export const homeContent = {
  date: "October 30 – 31, 2026",
  location: "House of Communication, Munich",
  partnerInquiry: {
    label: "Interested in partnering? Reach out to us →",
    href: siteConfig.sponsorFormUrl,
  },
  eyebrow: `${siteConfig.venue} // ${siteConfig.dateLabel}`,
  headline: "Thanks for hacking with us",
  subhead:
    "Relive the hackathon. Browse and download your photos from the full album.",
  primaryCta: {
    label: "View all photos",
    href: photoAlbum.url,
    external: true,
  },
  secondaryCta: {
    label: "View Prizes",
    href: "/prizes",
  },
  prizeFallback: "Prize pool announced soon",
  sponsorFallback: "Partners announced soon",
};

export const homeSections: ContentSection[] = [
  {
    id: "sponsors",
    title: "Sponsors & Partners",
    description:
      "Full sponsor wall by tier with inquiry CTA once real partners are confirmed.",
  },
  {
    id: "prize-highlight",
    title: "Prize highlight",
    description: "Prize pool and track teaser with no invented amounts.",
  },
  {
    id: "speakers-judges",
    title: "Speakers & Judges",
    description:
      "Featured public-cleared people preview, or a fallback while empty.",
  },
  {
    id: "timeline",
    title: "Timeline",
    description:
      "Condensed two-day milestone list with confirmed anchors only.",
  },
  {
    id: "reasons",
    title: "Reasons to Join",
    description:
      "Builder-focused reasons to join after higher-priority conversion sections.",
  },
  {
    id: "final-cta",
    title: "Final CTA",
    description: "Bottom Apply to Hack conversion block.",
  },
];
