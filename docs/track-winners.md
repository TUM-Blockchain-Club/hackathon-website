# Track winners

The landing page's `#winners` section sits immediately above the 2026 sponsors.
It reuses the prize pool's gradient, grid and square panels. Sponsor names,
track names and prize splits come from `src/content/prizes.ts`.
The TUM Blockchain Track uses Adevar Labs' USD audit credits, not euro cash prizes.

## Add and publish results

Edit `src/content/winners.ts`. Each track accepts `1st`, `2nd` and `3rd` entries:

```ts
"bsv-association": {
  "1st": { team: "Winning team", project: "Project name" },
  "2nd": { team: "Second team", project: "Project name" },
  "3rd": { team: "Third team", project: "Project name" },
},
```

The track keys are `bsv-association`, `cardano`, `api3`, and `tum-blockchain-club`.
Leave `published: false` until the announcement is approved. The server component
does not render result names while locked; there is no timed or visitor-operated
unlock. This switch controls the website display, not visibility of source code
in the public repository.

Set `published: true` and rebuild/deploy to publish. Entries with a missing or
blank team or project remain locked, so results can be released gradually.
Set the flag back to `false` and rebuild/deploy to lock all website results again.
