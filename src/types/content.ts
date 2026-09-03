export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type SocialLink = NavItem & {
  icon: "instagram" | "linkedin" | "x" | "telegram";
};

export type ResourceLink = NavItem & {
  primary?: boolean;
  disabled?: boolean;
};

export type ContentSection = {
  id: string;
  title: string;
  description: string;
};

export type SponsorTier =
  | "Platinum"
  | "Gold"
  | "Silver"
  | "Community"
  | "Partner";

export type Sponsor = {
  name: string;
  tier: SponsorTier;
  href: string;
  logoSrc?: string;
  logoAlt?: string;
  logoTreatment?: "dark-mark";
  logoScale?: number;
  logoPadding?: string;
};

export type PrizeTrack = {
  /** Anchor id used to jump from the summary cards to the detail section. */
  slug: string;
  sponsor: string;
  trackName: string;
  sponsorLogoSrc?: string;
  sponsorLogoScale?: number;
  sponsorLogoPadding?: string;
  /** Square mark for tight spots (summary chips); falls back to the wordmark. */
  sponsorMarkSrc?: string;
  sponsorHref?: string;
  /** Short primer on the partner itself, shown above the track brief. */
  about?: string;
  amount?: string;
  rightMark?: string;
  description?: string;
  ideas?: string[];
  requirements?: string[];
  /** "coming-soon" renders the track brief, ideas, and breakdown as pending. */
  status?: "confirmed" | "coming-soon";
};

export type ScheduleSessionType =
  | "Ceremony"
  | "Workshop"
  | "Mentoring"
  | "Meal"
  | "Deadline"
  | "Judging"
  | "Pitch"
  | "Keynote"
  | "Networking"
  | "Talk"
  | "Registration"
  | "Other";

export type ScheduleSession = {
  time: string;
  title: string;
  type: ScheduleSessionType;
  note: string;
  location?: string;
  speaker?: string;
  startTime?: string;
  endTime?: string;
  gridStart?: number;
  gridEnd?: number;
  sponsor?: string;
};

export type ScheduleDay = {
  label: string;
  date: string;
  sessions: ScheduleSession[];
};

export type Person = {
  id: string;
  name: string;
  category: "Judge" | "Mentor" | "Speaker" | "Workshop Lead";
  role: string;
  company?: string;
  topic?: string;
  imageSrc?: string;
  thumbnailSrc?: string;
  publicCleared: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
  status: "confirmed" | "partial-tbd" | "tbd";
};

export type FaqGroup = {
  slug: string;
  code: string;
  title: string;
  items: FaqItem[];
};

export type PersonContent = {
  title: string;
  description: string;
  fallback: string;
};
