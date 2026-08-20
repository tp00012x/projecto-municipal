# Pueblo Libre para todos

Campaign site for **Pueblo Libre 2027–2030**, built with the [T3 Stack](https://create.t3.gg/) and ready for **Vercel**.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- tRPC
- Drizzle ORM + Postgres
- NextAuth.js (optional Discord provider)

## Quick start

```bash
pnpm install
cp .env.example .env
# Start local Postgres (Docker) or point DATABASE_URL at Neon
./start-database.sh
pnpm db:push
pnpm dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Project shape

- `src/app` — routes, layout, campaign page
- `src/components` — site UI
- `src/data` — proposals + site copy
- `src/server/api` — tRPC routers (comments, etc.)
- `src/server/db` — Drizzle schema
- `public` — images and static assets

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Set install command to `pnpm install` (Vercel detects `packageManager`).
4. Optional (comments / auth later): Postgres (`DATABASE_URL`), `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`.
5. The public site builds without a database. When you add Neon, run:

```bash
DATABASE_URL="your-neon-url" pnpm db:push
```

## For Miki (no coding)

- Guide: **[docs/PARA-MIKI.md](./docs/PARA-MIKI.md)**
- SEO ops (Search Console / dominio): **[docs/SEO.md](./docs/SEO.md)**
- Request changes via Issues: https://github.com/tp00012x/projecto-municipal/issues/new/choose
- Anthony setup (branch protection / permissions): **[.github/branch-protection.md](./.github/branch-protection.md)**

## For AI agents

See **[AGENTS.md](./AGENTS.md)** and `.cursor/rules/`.

## Useful commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Local development |
| `pnpm build` | Production build |
| `pnpm db:push` | Push schema to Postgres |
| `pnpm db:studio` | Browse data in Drizzle Studio |
