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

The hero uses a normal `Apply` link to `https://tum.devfolio.co`. A button-only
homepage application section sits above the footer and keeps this SDK
placeholder for the official Devfolio button and verification:

```html
<div
  class="apply-button"
  data-hackathon-slug="tum"
  data-button-theme="light"
  style="height: 44px; width: 312px"
></div>
```

The top navigation also keeps a plain `Apply` link to
`https://tum.devfolio.co`.

The page section also renders a visible `Apply with Devfolio` link to
`https://tum.devfolio.co` over the SDK marker, because Devfolio can keep the
iframe button in a disabled initial state until verification is complete.

Devfolio gates the SDK iframe by the configured website URL, so the official
button may render as an empty reserved area on `localhost` or while the
hackathon is still under review. Verify the live button on the configured
production domain, `https://hackathon.tum-blockchain.com`, after the hackathon
and sponsor logo are accepted in Devfolio.

The static "This Year's Sponsors" section includes the Devfolio logo with
`alt="DEVFOLIO LOGO"`, which is required by Devfolio's website verification.
