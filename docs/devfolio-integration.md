# Devfolio Integration

The homepage uses the official Devfolio apply SDK for the hero call to action:

```tsx
<Script
  defer
  async
  src="https://apply.devfolio.co/v2/sdk.js"
  strategy="afterInteractive"
/>
```

The page keeps this SDK placeholder for Devfolio verification:

```html
<div
  class="apply-button"
  data-hackathon-slug="tum"
  data-button-theme="light"
  style="height: 44px; width: 312px"
></div>
```

The top navigation keeps a plain `Apply` link to `https://tum.devfolio.co`.
The hero renders a visible `Apply with Devfolio` link to the same application URL
and styles it to match Devfolio's official light button because Devfolio can keep
the iframe button in a disabled initial state until verification is complete.

Devfolio gates the SDK iframe by the configured website URL, so the official
button may render as an empty reserved area on `localhost` or while the
hackathon is still under review. Verify the live button on the configured
production domain, `https://hackathon.tum-blockchain.com`, after the hackathon
and sponsor logo are accepted in Devfolio.

The sponsor marquee includes the Devfolio logo with `alt="DEVFOLIO LOGO"`, which is required by Devfolio's website verification.
