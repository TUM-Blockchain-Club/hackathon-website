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

export type TrackCompanyPrize = {
  place?: string;
  title: string;
  amount: string;
  description?: string;
};

/** A partner that funds part of a pooled track without running its own. */
export type TrackCompany = {
  name: string;
  role?: string;
  /** Falls back to a monogram tile when the partner has no logo yet. */
  logoSrc?: string;
  /** Square mark for small spots; falls back to logoSrc. */
  markSrc?: string;
  /** The mark is a full tile with its own background; skip the white frame. */
  markFullBleed?: boolean;
  logoAlt?: string;
  href: string;
  /** Headline value, e.g. "€16,000"; amountNote says what it is. */
  amount: string;
  amountNote?: string;
  description?: string;
  prizes?: TrackCompanyPrize[];
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
  howToWin?: string[];
  companies?: TrackCompany[];
  /** Shared by every partner in a pooled track; shown below the partners. */
  selectionCriteria?: string[];
  requirements?: string[];
  /** "coming-soon" renders the track brief, ideas, and breakdown as pending. */
  status?: "confirmed" | "coming-soon";
};

export type ScheduleSessionType =
  | "Milestone"
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

export type ScheduleSpeaker = {
  name: string;
  role?: string;
  imageSrc?: string;
  /** Render imageSrc as a contained logo instead of a cropped portrait. */
  logo?: boolean;
  /** Not confirmed yet: shows a neutral person icon instead of initials. */
  placeholder?: boolean;
};

export type ScheduleSession = {
  /** 24h "HH:MM" in the event timezone (see scheduleContent.utcOffset). */
  startTime: string;
  endTime?: string;
  title: string;
  /** Secondary text after the title, rendered smaller and dimmer. */
  titleSuffix?: string;
  type: ScheduleSessionType;
  note: string;
  location?: string;
  speakers?: ScheduleSpeaker[];
  sponsor?: string;
  /** Partner mark drawn faintly behind the card, cut off at the right edge. */
  sponsorLogoSrc?: string;
  /**
   * Time not confirmed yet: shown as "TBA". startTime/endTime still decide
   * where the session sits in the day.
   */
  timeTba?: boolean;
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
