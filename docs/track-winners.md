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

## Add a winner's Devfolio link

In `src/content/winners.ts`, add `devfolioUrl` to the matching track and placement:

```ts
cardano: {
  "1st": {
    team: "Winning team or person",
    project: "Project name",
    devfolioUrl: "https://devfolio.co/projects/supplied-project-slug",
  },
},
```

Use the exact project or profile URL supplied for that winner. Do not infer links
from names. Match the track key and `1st`, `2nd`, or `3rd` placement; if the same
project wins multiple tracks, populate each applicable entry. Leave the field
out when no link is supplied. Never put winner URLs in the sponsor's `sponsorHref`
or the hackathon application URL.

Adding names or URLs does not authorize publishing: leave `published: false`
until explicitly instructed to reveal results. While locked, the rendered page
is unchanged and contains no winner names or Devfolio destinations. Once published,
a complete winner's team/person and project text link to their `devfolioUrl` in
the same tab. Entries without a valid HTTPS Devfolio URL remain plain text.
No extra button, icon, or placeholder is added.
