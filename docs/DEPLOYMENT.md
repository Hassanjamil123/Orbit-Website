# Deployment

Nothing in this guide has been run against a live account yet. Every step that creates
an account, uses a paid tier, or touches DNS needs approval first.

## Recommended setup (free tiers)

| Piece | Service | Notes |
| --- | --- | --- |
| Hosting | Vercel (Hobby) or any Node 20+ host | Hobby is for non-commercial use; check whether Vercel Pro is required for a company site before launch. |
| Storage | Supabase (Free) | Free projects pause after a period of inactivity; check current limits before relying on it. |

Any host that runs `next start` works. The file driver is fine on a single long-running
server with a persistent disk, but **not** on Vercel or other serverless hosts.

## 1. Storage (Supabase)

1. Create a Supabase project (needs approval: new account/infrastructure).
2. Open the SQL editor and run `supabase/schema.sql`.
3. From Project settings → API, copy the project URL and the `service_role` key.
   The service role key bypasses row-level security: it must only ever be set as a
   server-side environment variable. Never prefix it with `NEXT_PUBLIC_`.

## 2. Hosting (Vercel)

1. Push this repository to GitHub as `Orbit-Website`.
2. Import it in Vercel. Framework preset: Next.js. No build settings to change.
3. Set environment variables for Production (and Preview, with a separate Supabase
   project if you want previews isolated from real data):

   | Variable | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://justtellorbit.com` (Preview: leave unset or use the preview URL) |
   | `STORAGE_DRIVER` | `supabase` |
   | `SUPABASE_URL` | from step 1 |
   | `SUPABASE_SERVICE_ROLE_KEY` | from step 1 |
   | `ADMIN_EXPORT_TOKEN` | `openssl rand -hex 32` |
   | `RATE_LIMIT_SALT` | `openssl rand -hex 32` |

4. Deploy. Test on the `*.vercel.app` URL before touching DNS:
   - Join the waitlist, then join again with the same address in different case.
   - Export: `curl -H "Authorization: Bearer $TOKEN" "$URL/api/admin/export?format=csv"`
     should show exactly one row.
   - Submit the careers form.

If storage is misconfigured, the forms show "Sign-ups are paused for a moment" (HTTP 503)
and the server logs say why.

## 3. Domain (needs approval)

1. In Vercel → Domains, add `justtellorbit.com` and `www.justtellorbit.com`; redirect
   `www` to the apex (or the reverse — pick one).
2. Add the DNS records Vercel shows at the registrar.
3. Confirm HTTPS works, then confirm the form posts from the real domain (the server
   checks that `Origin` matches `NEXT_PUBLIC_SITE_URL` or the request host).

## Rate limiting at scale

The built-in limiter is in-memory, so on serverless hosting each instance counts
separately. That's enough for launch alongside the honeypot, timing check and duplicate
prevention. If abuse shows up, the next steps, in order:

1. Turn on the host's firewall/bot protection for `/api/*`.
2. Add Cloudflare Turnstile (free) to both forms and verify the token in `submissions.ts`.
3. Move the limiter's counters to a shared store (for example Upstash Redis).

## Self-hosting instead

```bash
npm ci && npm run build
STORAGE_DRIVER=file DATA_DIR=/var/lib/orbit-website NODE_ENV=production npm start
```

Put it behind a reverse proxy that sets `X-Forwarded-For` and terminates TLS, and back
up `DATA_DIR`.
