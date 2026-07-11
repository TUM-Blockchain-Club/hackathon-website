# Devfolio Integration

The homepage loads the official Devfolio apply SDK:

```tsx
<Script
  defer
  async
  src="https://apply.devfolio.co/v2/sdk.js"
  strategy="afterInteractive"
/>
```

The hero and top navigation use a normal `Apply` link to
`https://tum.devfolio.co`. A button-only homepage application section sits above
the footer and renders the **official** Devfolio button via the SDK marker:

```html
<div
  class="apply-button"
  data-hackathon-slug="tum"
  data-button-theme="light"
  style="height: 44px; width: 312px"
></div>
```

The marker is rendered visibly (not hidden) so the SDK can populate it with the
real Devfolio button. Beneath it sits a plain `Apply on Devfolio` text link —
a deliberately secondary fallback, not a recreation of the button — so
applicants can still reach Devfolio while the official button is blank.

Devfolio gates the SDK iframe by the configured website URL, so the official
button renders as an empty reserved area on `localhost` or while the hackathon
is still under review. This is expected: verify the live button on the
configured production domain, `https://hackathon.tum-blockchain.com`, after the
hackathon and sponsor logo are accepted in Devfolio.

The static "This Year's Sponsors" section includes the Devfolio logo with
`alt="DEVFOLIO LOGO"`, which is required by Devfolio's website verification.
