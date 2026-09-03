import type { PrizeTrack } from "@/types/content";

export const prizeContent = {
  title: "Prize Tracks",
  description:
    "A €4,000 prize pool, split across premium partner tracks. Track briefs, prize breakdowns, and judging criteria are announced soon.",
  fallback: "Prize tracks announced soon.",
  trackAmountFallback: "Prize amount announced soon.",
  trackDescriptionFallback: "Track brief announced soon.",
  trackIdeasFallback: "Example ideas announced soon.",
  trackRequirementsFallback: "Track-specific requirements announced soon.",
  mainPoolDescription:
    "The total prize pool is split across our premium partner tracks.",
  mainPoolAmount: "€4,000",
  mainPoolSubhead: "Available in prizes",
  mainPoolNote: undefined,
  comingSoonLabel: "Track details coming soon",
  defaultRequirements: [
    "A working demo of your project.",
    "A public source code repository.",
    "A short demo video, with max length announced soon.",
    "A README describing what you built and how to run it.",
    "Project must be built during the hackathon. Pre-existing projects are not eligible unless meaningfully extended during the event.",
  ],
};

export const prizeTracks: PrizeTrack[] = [
  {
    slug: "bsv-blockchain",
    sponsor: "BSV Blockchain",
    trackName: "BSV Blockchain Track",
    sponsorLogoSrc: "/sponsors/bsv_blockchain_logo.png",
    sponsorLogoPadding: "p-1",
    sponsorMarkSrc: "/sponsors/bsv_icon.png",
    sponsorHref: "https://bsvblockchain.org/",
    about:
      "BSV Blockchain supports the growth of the BSV network, a scalable public blockchain built for high-throughput data and micropayment applications.",
    rightMark: "BSV",
    amount: "€4,000",
    status: "coming-soon",
  },
];
