# Decisions to confirm

## Beta vs longer-term labels

`src/content/capabilities.ts` labels each capability and example as **Private beta focus**
or **Future**. No roadmap was supplied, so one rule was applied: helping you *decide*
(research, planning, drafting, remembering context, breaking work into steps) is beta;
*acting for you* (booking, buying, submitting, sending, connected services) is future. Founders should correct this file before launch. It's the
only place these labels live.

## Showing a "you're already on the list" state

The brief asks for a visible duplicate state. That means anyone who types an email address can
learn whether it is on the list. The per-IP rate limit (8 attempts per 10 minutes) keeps this
from being used at scale. If you'd rather not reveal it, make the duplicate branch in
`src/lib/submissions.ts` return the same response as a new sign-up; the database still
prevents the duplicate row.

## No region field

The brief allowed an optional region field "only if genuinely useful". It was left out: it
adds a question, and nothing uses it yet.

## Email confirmations

No email provider is configured, so the site never says an email was sent. The success message
says we'll be in touch. Add double opt-in once a provider is chosen.

## Social links and contact

No verified social URLs or contact address were provided, so none appear on the site. Add them
to `src/lib/site.ts`: social links then appear in a footer Social column, and a contact address
adds Contact to the footer and the privacy page.

## No Trust & Safety page yet

The brief allows one only if it can describe safeguards that actually exist. The product
isn't built yet, so the site describes approvals and control as design principles ("being
built around") rather than as implemented features.

## Header

Desktop: logo, Product (menu with Capabilities and How it works), About, Careers, Join the
waitlist. Mobile: logo, Join waitlist, and a menu button listing all four pages.
