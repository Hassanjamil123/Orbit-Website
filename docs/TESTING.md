# Testing notes: Assignment 002

## Environment limits

The build sandbox had no package-registry access, so `next`, `@types/react` and the Tailwind
PostCSS plugin could not be installed. As a result:

- **`next build` has not been run.** It must pass in CI or locally before any deploy.
- TypeScript was checked with loose stand-in types for React and Next. That pass came back clean,
  but it doesn't check React prop types. `npm run typecheck` still has to be run with the real packages.
- ESLint was not run.

To test the real code anyway, a throwaway harness (not committed) bundled the real pages and
components with esbuild, compiled `globals.css` with Tailwind v4's compiler, served
server-rendered pages with client hydration, and routed `/api/*` to the real handlers with
the file storage driver. Browser tests used Playwright with Chromium.

## Automated tests (`npm test`)

22 tests, all passing:

- Email normalization and rejection of malformed addresses
- Consent must be literally `true`; careers needs both the terms acknowledgement and consent
- Attribution values limited to safe slugs; `javascript:` links rejected
- Valid sign-up persisted with timestamp, consent version, source, UTM and referral fields
- Duplicate (case/whitespace variants) writes no second row and returns `status: "duplicate"`
- 10 concurrent identical sign-ups produce exactly one row
- Invalid email / missing consent → 422 with field errors
- Honeypot and too-fast submissions → fake success, nothing stored
- Cross-origin POST → 403; malformed, non-JSON and >16 KB bodies → 400
- Rate limit → 429 with `Retry-After`; other clients unaffected
- Storage failure → 503 with no internal detail leaked
- Admin export: 404 without a strong token; 401 for a wrong token or a token in the query
  string; CSV with formula cells neutralized; JSON variant
- Supabase driver: unique violation mapped to duplicate; correct REST URL and headers

## Browser tests (Playwright, Chromium): 32 checks, all passing

Viewports: desktop 1440×900, tablet 820×1180, mobile 390×844.

| Check | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| No horizontal overflow on all 7 pages | ✓ | ✓ | ✓ |
| No script errors | ✓ | ✓ | ✓ |
| Empty submit: inline error, `aria-invalid`, focus to email | ✓ | ✓ | ✓ |
| Missing consent error | ✓ | ✓ | ✓ |
| Success state, focus moves to it (`role="status"`) | ✓ | ✓ | ✓ |
| Duplicate state on `/early-access` (case-changed email) | ✓ | ✓ | ✓ |
| Mobile menu: opens with `aria-expanded`, Escape closes, link navigates | n/a | n/a (desktop nav from 768px) | ✓ |
| Careers form: validation and stored submission | ✓ | ✓ | ✓ |

Also:

- Loading state (`aria-busy`, "Joining…") and server error state (`role="alert"`) shown
- Every internal link and in-page anchor on all pages returns 200 and resolves
- First Tab focuses "Skip to content"; Tab reaches the hero email field
- Cross-origin POST → 403; export without a token → 404
- 6 sign-ups (3 new, 3 duplicates) produced exactly 3 rows, each with source and referral code

The only console error is the expected 404 for the Satoshi font files, which aren't added yet.

## Not yet tested

- Real `next build`/`next start`, `next/image` optimization, and the generated social card
- Safari (desktop and iOS) and Firefox
- Screen readers (VoiceOver, NVDA)
- Lighthouse/Core Web Vitals on a real deployment
- Layout with Satoshi loaded (line breaks were tuned on the system fallback)
- Supabase against a real project
