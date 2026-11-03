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
  // Announced at the Winners & Closing Ceremony on 31 October 2026.
  published: true,
  tracks: {
    "bsv-association": {
      "1st": {
        team: "Dar el eeers",
        project: "Hedgy",
        devfolioUrl: "https://devfolio.co/projects/hedgy-91c5",
      },
      "2nd": {
        team: "Beste Informatiker EuW",
        project: "Quorum",
        devfolioUrl: "https://devfolio.co/projects/quorum-53d2",
      },
      "3rd": {
        team: "spritz",
        project: "mercaTUM",
        devfolioUrl: "https://devfolio.co/projects/mercatum-2a92",
      },
    },
    cardano: {
      "1st": {
        team: "Kiko Devs",
        project: "Kiko",
        devfolioUrl: "https://devfolio.co/projects/kiko-38f0",
      },
      "2nd": {
        team: "Los Curiosos",
        project: "Shelfie",
        devfolioUrl: "https://devfolio.co/projects/shelfie-7cfa",
      },
      "3rd": {
        team: "LMUblock",
        project: "AiTelier",
        devfolioUrl: "https://devfolio.co/projects/aitlier-d8a3",
      },
    },
    api3: {
      "1st": {
        team: "Vibeathon",
        project: "CreatorPay",
        devfolioUrl: "https://devfolio.co/projects/creatorpay-83fb",
      },
      "2nd": {
        team: "Power puff boys",
        project: "SupplierPulse",
        devfolioUrl: "https://devfolio.co/projects/supplierpulse-a820",
      },
      "3rd": {
        // Solo entry without a Devfolio team name.
        team: "Max Glatzel",
        project: "DisasterDAO",
        devfolioUrl: "https://devfolio.co/projects/disasterdao-e213",
      },
    },
    "tum-blockchain-club": {
      "1st": {
        team: "BitcoinMiners",
        project: "AfterLife",
        devfolioUrl: "https://devfolio.co/projects/afterlife-943e",
      },
      "2nd": {
        team: "Les Léopards de l'Atlas",
        project: "AgentTresor",
        devfolioUrl: "https://devfolio.co/projects/agenttresor-27bc",
      },
      "3rd": {
        team: "Vibeathon",
        project: "CreatorPay",
        devfolioUrl: "https://devfolio.co/projects/creatorpay-83fb",
      },
    },
  },
};
