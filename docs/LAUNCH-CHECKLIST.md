# Before connecting justtellorbit.com

## Credentials and approvals

- [ ] GitHub access: connect GitHub so `Orbit-Website` can be created and pushed
- [ ] Approve and create the Supabase project (free tier); run `supabase/schema.sql`
- [ ] Approve the hosting plan (check whether Vercel Hobby's non-commercial terms fit, or use Pro)
- [ ] Production env vars: `STORAGE_DRIVER=supabase`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EXPORT_TOKEN`, `RATE_LIMIT_SALT`, `NEXT_PUBLIC_SITE_URL`
- [ ] DNS change for justtellorbit.com (approval needed)

## Brand assets

- [ ] Transparent SVG/PNG of the horizontal logo for light backgrounds (the "Inverse" or "Flat" variants on the brand sheet), so the header no longer needs the dark tile
- [ ] Official purple hex values to confirm the derived `#7b35e8` (see `docs/BRAND.md`)
- [ ] Satoshi WOFF2 files and license in `public/fonts/`
- [ ] Optional: a designed 1200×630 social card to replace the generated one

## Content to confirm

- [ ] Beta vs longer-term labels in `src/content/capabilities.ts` (`docs/DECISIONS.md`)
- [ ] All copy, especially How it works and the commitments that you approve consequential actions
- [ ] Contact mailbox `hello@justtellorbit.com` exists
- [ ] Social profile URLs, once accounts exist (`src/lib/site.ts`)
- [ ] Privacy notice reviewed for the places you'll collect sign-ups from; retention periods are placeholders
- [ ] Careers "Before you get in touch" wording checked against local rules on unpaid work
- [ ] Terms page, if and when the product needs one (`features.terms`)

## Engineering

- [ ] `npm install`, commit `package-lock.json`, switch CI to `npm ci`
- [ ] `npm run check && npm run build` green in CI
- [ ] End-to-end on the Vercel preview URL: sign up, duplicate, careers form, CSV export
- [ ] Safari, Firefox and screen-reader pass; Lighthouse on the preview
- [ ] Choose an email provider; add double opt-in and unsubscribe before sending anything

## Deliberately not built

Beta invite flow, referral system, blog/updates, launch video pages, product docs. The data
model and the flags in `src/lib/site.ts` leave room for each.
