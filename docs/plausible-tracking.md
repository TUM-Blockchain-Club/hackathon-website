# Plausible Tracking

The production site `hackathon.tum-blockchain.com` loads the self-hosted Plausible tracker from the shared TBC Plausible instance:

```tsx
<Script
  defer
  data-domain="hackathon.tum-blockchain.com"
  src="https://plausible.rbg.tum-blockchain.com/js/script.js"
  strategy="afterInteractive"
/>
```

The script is installed in `src/app/layout.tsx` so it is present across the App Router tree.

Verify locally after a build by inspecting rendered HTML or by checking the deployed page source for `plausible.rbg.tum-blockchain.com/js/script.js`.
