# Prize Tracks

The `/prizes` page follows ETHGlobal's prizes tab: a list on the left, the selected entry on the right. The first entry is **How to submit**, the guide to submitting on Devfolio. After it comes one entry per track.

## Where the content lives

Everything is data in `src/content/prizes.ts`; the component (`src/components/sections/prize-tracks.tsx`) only renders it.

- `prizeContent.submission`: the How to submit guide. It holds the deadline (`deadline` for display, `deadlineIso` for the countdown), steps, the requirements every project needs, the Saturday judging timeline, rules and contact links.
- `prizeTracks`: one entry per track. Each section of a track panel shows only when its field is set:
  - `about`, `trackName`, `tagline`, `amount`, `sponsorHref`, `sponsorXHref`
  - `prizes` (1st/2nd/3rd split) and `prizeNote` (a caveat, or the text shown while the split is pending)
  - `description` (paragraphs separated by a blank line) and `ideas`
  - `requirements` (what qualifies) and `submission` (track-specific items). The `submission` items also appear in the "Extra items per track" list in the How to submit guide.
  - `judgingCriteria` and `judgingNote`
  - `resources` (grouped links), `notes`, `workshop`, `judges`, `support`
- A track with `status: "coming-soon"` and no brief shows the "Prize details coming soon" placeholder.
- A pooled track (one with `companies`, like the TUM Blockchain Track) shows partner cards and `selectionCriteria` instead of a prize split.

## Rules for editing

- Judges are published by **name and role only**. Phone numbers and Telegram handles stay in the internal judges sheet.
- A resource whose link is not published yet gets `pending: true` and no `href`; it renders as "Link coming soon". Add the `href` and remove `pending` once the link exists.
- Link BSV's `bsv-blockchain/ts-stack` monorepo. The older `ts-sdk` and `wallet-toolbox` repos are archived; a content test fails if they are linked.
- Deep links work with the hash: `/prizes#api3`, `/prizes#bsv-association`, `/prizes#how-to-submit`.
