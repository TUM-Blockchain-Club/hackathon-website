import type { ContentSection } from "@/types/content";
import { siteConfig } from "@/content/site";

export const homeContent = {
  eyebrow: `${siteConfig.venue} // ${siteConfig.dateLabel}`,
  headline: "Where blockchain meets AI, and ideas become reality overnight.",
  subhead:
    "An in-person hackathon in Munich, hosted by the team behind Europe's largest student-led Web3 event.",
  primaryCta: {
    label: "Apply",
    href: siteConfig.applicationUrl,
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
