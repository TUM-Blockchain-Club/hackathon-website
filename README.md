# TUM Blockchain & AI Hackathon Website

Official website for the TUM Blockchain & AI Hackathon.

Repository: https://github.com/TUM-Blockchain-Club/hackathon-website

## Local Development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000.

## Validation

```bash
pnpm test
pnpm typecheck
pnpm build
pnpm lint
```

`pnpm format` checks Prettier formatting across the repo.

## Deployment

The project is a Next.js app intended for Vercel deployment. Vercel should detect the framework automatically.

Expected commands:

```bash
pnpm install --frozen-lockfile
pnpm build
```

Production metadata is configured for `https://hackathon.tum-blockchain.com`.
