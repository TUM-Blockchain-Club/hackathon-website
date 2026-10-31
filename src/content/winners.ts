export type TrackWinner = {
  team: string;
  project: string;
};

export type WinnerResults = {
  published: boolean;
  tracks: Record<string, Partial<Record<string, TrackWinner>>>;
};

// Add results under each track using "1st", "2nd", and "3rd" as keys.
// Set published to true only when the results are ready to be announced.
// Missing places remain locked, even after publication. See docs/track-winners.md.
export const winnerResults: WinnerResults = {
  published: false,
  tracks: {
    "bsv-association": {},
    cardano: {},
    api3: {},
    "tum-blockchain-club": {},
  },
};
