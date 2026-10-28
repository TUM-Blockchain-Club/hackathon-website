# Prize Tracks

The `/prizes` page follows ETHGlobal's prizes tab: a list on the left, the selected entry on the right. The first entry is **How to submit**, the guide to submitting on Devfolio. After it comes one entry per track.

## Where the content lives

Everything is data in `src/content/prizes.ts`; the component (`src/components/sections/prize-tracks.tsx`) only renders it.

- `prizeContent.submission`: the How to submit guide. It holds the deadline (`deadline` for display, no time zone since everyone is on site in Munich; `deadlineIso` for the countdown), `hackingStartsIso`, steps, the requirements every project needs, the Saturday judging timeline and contact links.
- **Locked until hacking starts.** Before `hackingStartsIso` (Fri 30 Oct, 09:00) the How to submit tab is disabled and greyed out with `lockedLabel`, a `#how-to-submit` link does not open it, and the "How to submit →" part of the pill above the tracks is greyed out. Once hacking starts, everything unlocks in the browser without a redeploy, and a large countdown to the deadline appears at the top of the guide. The check runs client-side (`src/lib/use-now.ts`) because the page is prebuilt.
- `prizeTracks`: one entry per track. Each section of a track panel shows only when its field is set:
  - `about` (the company in two sentences), `trackName`, `tagline`, `amount`, `sponsorHref` (track headers show the website chip only, no X handle)
  - `prizes` (1st/2nd/3rd split) and `prizeNote` (a caveat, or the text shown while the split is pending)
  - `description` (the problem statement, paragraphs separated by a blank line), `ideas` and `quickStart` (the "Get started" steps). Example ideas are starting points, not extra requirements.
  - `requirements` (what qualifies) and `submission` (track-specific items). Every team submits the same three things (`prizeContent.submission.requirements`: a 2.5-minute demo video, a detailed description, a public repository); each track's What to submit row shows those under "Every team" and its own `submission` items under "For this track". Word track items the same way everywhere: evidence first, then "In the demo video: …" and "In the description: …". Don't repeat the repository or video there.
  - `judgingGuidance`: a short paragraph shown as "What judges look for". It describes what judges value without fixed percentages or point scores.
  - `resources` (grouped links), `workshop`, `judges`, `support` (partner-specific contacts only; see below)
- A track with `status: "coming-soon"` and no brief shows the "Prize details coming soon" placeholder.
- A pooled track (one with `companies`, like the TUM Blockchain Track) shows the partner card directly under Prize, and its `selectionCriteria` as "How winners are chosen".

## Panel layout

Each track panel keeps the main facts visible and folds the rest away:

- Workshop first, right under the header.
- About: the two-sentence company intro, then the problem statement (`description`), clamped to three lines with **Read more**.
- Prize card.
- Qualification requirements in a highlighted box.
- Collapsed rows for What to submit, What judges look for and Example ideas. Partner tracks share the same rows.
- Get started (numbered), then Links and resources: the coding-agent prompt on top, then one card per resource group.
- Judges (with photos or initials) and Support. Support rows show titles only.

## Rules for editing

- Judges are published by **name and role only**. Phone numbers and Telegram handles stay in the internal judges sheet.
- A resource whose link is not published yet gets `pending: true` and no `href`; it renders as "Link coming soon". Add the `href` and remove `pending` once the link exists.
- Link BSV's `bsv-blockchain/ts-stack` monorepo. The older `ts-sdk` and `wallet-toolbox` repos are archived; a content test fails if they are linked.
- Deep links work with the hash: `/prizes#api3`, `/prizes#bsv-association`, `/prizes#how-to-submit`.
- Keep qualification requirements and submission items explicit. Judging guidance does not replace them. API3's tamper test stays a pass/fail requirement.

## Generated per track

`prizeTracks` adds two things to every track when the module loads:

- The same last two Support entries on every partner track (the pooled TUM Blockchain Track has no Support section): "Support on Telegram during hackathon" (the hackathon Telegram group) and "Mentors on site" (person icon). Put only partner-specific contacts in a track's own `support`, such as "DM Axel on Telegram" or Masumi's 1:1 sessions.
- `agentContext` (only for tracks with `resources`): the partner's own prompt from `src/content/agent-contexts.ts` (BSV, Cardano, API3), or otherwise a short generic prompt for a coding agent, built by `src/lib/track-context.ts`. It links the track and the How to submit rules, plus the first published link from up to four resource groups. Put each group's main onboarding link first. It shows as "Context for your coding agent" under Links and resources.

The How to submit panel also has a copyable checklist built from the global requirements and each partner track's `submission` items.

## Resource lists

- Each partner's first group is **Start here**, and its first link is the main document. Only that link has a `note`; every other link is just its name.
- Link setup guides rather than raw endpoints (for example API3's MCP setup page, not the MCP URL itself).
- AI tooling is the last group. Partner agent files (Masumi's agent-guide.md, API3's llms.txt) live in the coding-agent prompt instead of the link list.
