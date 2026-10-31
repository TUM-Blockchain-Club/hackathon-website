export type TrackWinner = {
  /** Winning team or individual display name for this track and placement. */
  team: string;
  project: string;
  /**
   * Exact https://devfolio.co/... project or profile URL supplied for this winner.
   * Optional: omit until provided; never guess a URL from the display name.
   * Makes the team and project text clickable only after results are published.
   */
  devfolioUrl?: string;
};

export type WinnerResults = {
  published: boolean;
  tracks: Record<string, Partial<Record<string, TrackWinner>>>;
};

// Add results under each track using "1st", "2nd", and "3rd" as keys.
// Set published to true only when the results are ready to be announced.
// Missing places remain locked, even after publication. See docs/track-winners.md.
// For each supplied winner, edit tracks[trackSlug][place], for example:
// "cardano": {
//   "1st": { team: "Team or person name", project: "Project name",
//            devfolioUrl: "https://devfolio.co/projects/supplied-project-slug" },
// },
// Match the sponsor/track and placement explicitly. Each entry owns its own link;
// if a project wins multiple tracks, add its supplied URL to each matching entry.
// Adding a URL does NOT authorize changing published: keep false until told to reveal.
export const winnerResults: WinnerResults = {
  published: false,
  tracks: {
    "bsv-association": {},
    cardano: {},
    api3: {},
    "tum-blockchain-club": {},
  },
};
