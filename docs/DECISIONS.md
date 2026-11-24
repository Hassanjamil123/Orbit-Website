# Decisions to confirm

## Beta vs longer-term labels

`src/content/capabilities.ts` labels each capability and example as **Early focus** (private
beta) or **Longer term**. No roadmap was supplied, so one rule was applied: helping you
*decide* (research, planning, drafting) is early; *acting for you* (booking, buying,
submitting, sending) is later. Founders should correct this file before launch. It's the
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

## Social links

No social profile URLs were provided. The footer names X, LinkedIn, Instagram and YouTube as
coming soon, without links. Add URLs in `src/lib/site.ts` and they appear as links.
