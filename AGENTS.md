# AGENTS.md — Pueblo Libre campaign site

Guidance for AI agents working in this repository.

## What this is

Next.js (T3-style) public site for Micky Ruiz’s Pueblo Libre 2027–2030 campaign. Deployed on Vercel from `tp00012x/projecto-municipal`.

## Commands

```bash
pnpm install          # deps (respects minimumReleaseAge in pnpm-workspace.yaml)
pnpm dev              # local server
pnpm build            # production build (works without DATABASE_URL)
pnpm check            # eslint + tsc
pnpm db:push          # only when DATABASE_URL is set
```

## Layout

```
src/app/           # routes + CampaignSite
src/components/    # UI sections
src/data/          # site.ts + propuestas.json  ← content
src/server/        # tRPC, auth, drizzle
src/trpc/          # client/server helpers
public/gallery/    # photos
public/videos/     # web-optimized hero clip only
```

## Rules

Project Cursor rules live in `.cursor/rules/`. Follow them — especially:

- systematic fixes (no hacks)
- optional DB/auth for deploy
- no auto-merge
- Miki collaboration (non-coder)

Human-friendly Git guide for Miki: `docs/PARA-MIKI.md`.

Content requests should start as GitHub Issues (`.github/ISSUE_TEMPLATE/`). Use the Spanish PR template. Never merge without confirmation. Point non-coders at the Vercel Preview URL on the PR.
