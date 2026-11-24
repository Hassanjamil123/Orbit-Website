# Privacy notice: items to confirm before launch

`src/app/privacy/page.tsx` describes what the code does today. Before the site is public:

1. **Contact address.** Set `site.contactEmail` in `src/lib/site.ts` to a monitored mailbox.
   Until then the page says an address will be published, and the footer hides Contact.
2. **Who is responsible.** Name the legal entity (or person) that controls the data, and its
   country. Most privacy laws require this.
3. **Processors and regions.** The page names Vercel (hosting) and Supabase (database). If you
   choose different services, change the page. Note which region the Supabase project is in.
4. **Jurisdictions.** If you'll accept sign-ups from the EU/UK, the notice should state a legal
   basis (consent for the waitlist; legitimate interests or steps before a contract for
   careers), the right to complain to a regulator, and international transfers.
5. **Retention.** The periods on the page are placeholders: confirm them, and actually delete
   data when they end.
6. **Email provider.** When one is added for beta invites, name it on the page.
7. **Analytics.** The page says there is no tracking. If analytics are added, update it first.

Have someone qualified review the final text for the places you'll collect sign-ups from.
