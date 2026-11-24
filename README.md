# Orbit Website

The public website and private beta waitlist for **Orbit**. *Just Tell Orbit.*
Target domain: `justtellorbit.com`.

This is a standalone project. It does not depend on, import from, or call the Orbit
application or its production API.

## Stack

- Next.js (App Router) · TypeScript · Tailwind CSS v4
- Zod for server-side validation
- Storage: local JSON Lines files for development, Supabase (Postgres) for any hosted
  deployment — both behind one small interface in `src/lib/storage/`

## Quick start

```bash
npm install
cp .env.example .env.local      # defaults work for local dev
npm run dev                     # http://localhost:3000
```

With the default `STORAGE_DRIVER=file`, sign-ups are written to `./data/*.jsonl`
(git-ignored).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` | TypeScript, no emit |
| `npm run lint` | ESLint (Next.js rules) |
| `npm test` | Unit and API tests (`node:test` via tsx) |
| `npm run check` | typecheck + lint + test |
| `npm run export:waitlist` | Print the waitlist as CSV using the configured storage |
| `npm run export:interest` | Same, for careers interest |

After the first `npm install`, commit `package-lock.json` and switch CI to `npm ci`.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Homepage: hero, example requests, beyond answers, domains, closing call to action |
| `/capabilities` | Every domain, with early-focus vs longer-term examples |
| `/how-it-works` | Four steps: tell, plan, approve, follow the outcome |
| `/about` | Mission and why one Orbit |
| `/careers` | Opportunity, problems, philosophy, areas, transparency, interest form |
| `/early-access` | Dedicated waitlist page |
| `/privacy` | Privacy notice (draft, needs review) |

## Project layout

```
src/
  app/                       One folder per route, plus:
    api/waitlist/route.ts    POST: join the waitlist
    api/interest/route.ts    POST: careers interest
    api/admin/export/route.ts GET: token-protected CSV/JSON export
    opengraph-image.tsx      Social card built from the supplied app icon
    favicon.ico, icon.png, apple-icon.png   From the supplied app icon
    globals.css              Design tokens (colors, type scale) and base styles
  components/
    ui.tsx                   Container, Section, Heading, PageIntro, ButtonLink, Tag
    Logo.tsx                 Official logo, app icon and ring icon
    RotatingRequest.tsx      Hero example requests
    SiteHeader.tsx           Header with accessible mobile menu
    SiteFooter.tsx, ClosingCta.tsx
    forms/                   WaitlistForm, InterestForm, field parts
  content/capabilities.ts    All capability/domain copy and beta labels
  lib/                       site config, validation, submissions, storage, export
brand-source/                Original logo files, untouched
public/brand/                Logo assets extracted from the brand sheet (docs/BRAND.md)
public/fonts/fonts/          Satoshi (only the variable files are loaded)
supabase/schema.sql          Tables, unique indexes, row-level security
tests/                       Validation and API tests
docs/                        Brand, decisions, deployment, testing, launch checklist
```

## How the waitlist works

1. The form validates in the browser for fast feedback; the server re-validates
   everything with Zod and is the authority.
2. The server checks the request `Origin`, applies a per-IP rate limit (8 per 10 minutes,
   IP hashed with `RATE_LIMIT_SALT`, never stored), caps body size at 16 KB, and silently
   discards submissions that fill the hidden honeypot field or arrive faster than a person
   could type.
3. Emails are trimmed and lower-cased. A unique index on `lower(email)` (Supabase) or an
   in-process lock plus lookup (file driver) prevents duplicates. A repeat sign-up gets a
   "you're already on the list" state (see `docs/DECISIONS.md` for the trade-off).
4. Each record stores the consent wording version and time, the page it came from
   (`source`), any `utm_*` values, and a `ref` code if present — the hook for a future
   referral system. `invite_status` is groundwork for beta invitations.
5. No sign-up count is displayed anywhere.

Admin export:

```bash
curl -H "Authorization: Bearer $ADMIN_EXPORT_TOKEN" \
  "https://justtellorbit.com/api/admin/export?collection=waitlist&format=csv" -o waitlist.csv
```

The endpoint returns 404 unless `ADMIN_EXPORT_TOKEN` is set to at least 32 characters,
accepts the token only in the header, and responds with `Cache-Control: no-store`.

## Adding launch features later

`src/lib/site.ts` has flags for `updates`, `docs`, `terms`, `betaInvites` and `referrals`. Build the
route, then flip the flag; the sitemap reads from the same config. Suggested homes:
`src/app/updates/` (blog, announcements, launch videos), `src/app/docs/`,
`src/app/invite/[code]/`.

See [docs/BRAND.md](docs/BRAND.md), [docs/DECISIONS.md](docs/DECISIONS.md),
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) and [docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md).
