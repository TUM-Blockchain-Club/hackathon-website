# AGENTS.md

## Project Overview

This is the TUM Blockchain & AI Hackathon website, built with Next.js App Router, React, TypeScript, Tailwind CSS, and local fonts. App routes live under `src/app`, shared layout components live under `src/components/layout`, UI primitives live under `src/components/ui`, and site copy/content lives under `src/content`.

## Tooling

- Use `pnpm` for Node.js commands.
- Use `pnpm dev` for local development.
- Use `pnpm build` to verify production builds.
- Use `pnpm lint`, `pnpm typecheck`, and `pnpm format` before handoff when practical.

## Conventions

- Keep route-level code in `src/app`.
- Keep reusable components under `src/components`.
- Use `next/script` for third-party scripts in App Router layouts.
- Document notable setup or integration changes in Markdown under `docs/`.
