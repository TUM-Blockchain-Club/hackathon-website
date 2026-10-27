# Prize Tracks

The `/prizes` page follows ETHGlobal's prizes tab: a list on the left, the selected entry on the right. The first entry is **How to submit**, the guide to submitting on Devfolio. After it comes one entry per track.

## Where the content lives

Everything is data in `src/content/prizes.ts`; the component (`src/components/sections/prize-tracks.tsx`) only renders it.

- `prizeContent.submission`: the How to submit guide. It holds the deadline (`deadline` for display, `deadlineIso` for the countdown), steps, the requirements every project needs, the Saturday judging timeline, rules and contact links.
- `prizeTracks`: one entry per track. Each section of a track panel shows only when its field is set:
  - `about`, `trackName`, `tagline`, `amount`, `sponsorHref`, `sponsorXHref`
  - `prizes` (1st/2nd/3rd split) and `prizeNote` (a caveat, or the text shown while the split is pending)
  - `description` (paragraphs separated by a blank line), `ideas` and `quickStart` (the "Get started" steps). Example ideas are starting points, not extra requirements.
  - `requirements` (what qualifies) and `submission` (track-specific items). The `submission` items also appear in the "Extra items per track" list in the How to submit guide.
  - `judgingGuidance`: a short paragraph shown as "What judges look for". It describes what judges value without fixed percentages or point scores.
  - `resources` (grouped links), `workshop`, `judges`, `support`, `supportNote`
- A track with `status: "coming-soon"` and no brief shows the "Prize details coming soon" placeholder.
- A pooled track (one with `companies`, like the TUM Blockchain Track) shows the partner card directly under Prize, and its `selectionCriteria` as "How winners are chosen".

## Panel layout

Each track panel keeps the main facts visible and folds the rest away:

- Workshop first, right under the header, then About.
- Prize card, then the first paragraph of `description` clamped to three lines with **Read more**.
- Qualification requirements in a highlighted box.
- Collapsed rows for What to submit, What judges look for, How to win and Example ideas.
- Get started (numbered), then Links and resources: the coding-agent prompt on top, then one card per resource group.
- Judges (with photos or initials) and Support.

## Rules for editing

- Judges are published by **name and role only**. Phone numbers and Telegram handles stay in the internal judges sheet.
- A resource whose link is not published yet gets `pending: true` and no `href`; it renders as "Link coming soon". Add the `href` and remove `pending` once the link exists.
- Link BSV's `bsv-blockchain/ts-stack` monorepo. The older `ts-sdk` and `wallet-toolbox` repos are archived; a content test fails if they are linked.
- Deep links work with the hash: `/prizes#api3`, `/prizes#bsv-association`, `/prizes#how-to-submit`.
- Keep qualification requirements and submission items explicit. Judging guidance does not replace them. API3's tamper test stays a pass/fail requirement.

## Generated per track

`prizeTracks` adds two things to every track when the module loads:

- A "Hackathon help and announcements" link to the hackathon Telegram group under Support (unless the track already links it), and a default `supportNote`.
- `agentContext` (only for tracks with `resources`): a short prompt for a coding agent, built by `src/lib/track-context.ts`. It links the track and the How to submit rules, plus the first published link from up to four resource groups. Put each group's main onboarding link first. It shows as "Context for your coding agent" under Links and resources.

The How to submit panel also has a copyable checklist built from the global requirements and each partner track's `submission` items.
