import type { NavItem, SocialLink } from "@/types/content";

export const FALLBACK_TEXT = "To be announced soon.";

export const siteConfig = {
  name: "TUM Blockchain & AI Hackathon",
  shortName: "TUM Blockchain Hackathon",
  parentEvent: "TUM Blockchain Conference + Hackathon 26",
  description:
    "An in-person blockchain and AI hackathon in Munich, hosted by TUM Blockchain Club as part of TBC 26.",
  url: "https://hackathon.tum-blockchain.com",
  domain: "hackathon.tum-blockchain.com",
  dateLabel: "30-31 October 2026",
  venue: "House of Communication, Munich",
  footerLine:
    "TUM Blockchain & AI Hackathon // House of Communication, Munich // 30-31 October 2026",
  applicationUrl: "https://tum.devfolio.co",
  devfolioHackathonSlug: "tum",
  telegramUrl: "https://t.me/+mY6aLKS8OnlhZjJk",
  conferenceUrl: "https://conference.tum-blockchain.com/",
  clubUrl: "https://www.tum-blockchain.com",
  imprintUrl: "https://www.tum-blockchain.com/imprint",
  privacyPolicyUrl:
    "https://drive.google.com/file/d/1TcXdGF5jARyVKreqJ4ht3Q2ICGOEuyPt/view",
  contactEmail: "hackathon@tum-blockchain.com",
  sponsorEmail: "sponsors@tum-blockchain.com",
  sponsorFormUrl: "https://tally.so/r/vGzv6g",
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Prizes", href: "/prizes" },
  { label: "Schedule", href: "/schedule" },
  { label: "Speakers & Judges", href: "/speakers-and-judges" },
  { label: "FAQ", href: "/faq" },
  { label: "Conference", href: siteConfig.conferenceUrl, external: true },
];

export const footerLinks: NavItem[] = [
  {
    label: "TUM Blockchain Conference",
    href: siteConfig.conferenceUrl,
    external: true,
  },
  { label: "TUM Blockchain Club", href: siteConfig.clubUrl, external: true },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/tumblockchain/",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/tum-blockchain-club/",
    icon: "linkedin",
  },
  {
    label: "X",
    href: "https://x.com/tbc_munich",
    icon: "x",
  },
  {
    label: "Telegram",
    href: siteConfig.telegramUrl,
    icon: "telegram",
  },
];
