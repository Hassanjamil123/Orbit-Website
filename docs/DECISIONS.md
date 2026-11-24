# Decisions to confirm

## Private beta positioning

The site now says the private beta includes research, planning, drafting **and real actions
where a service is supported**, with approval for anything consequential. In
`src/content/capabilities.ts`, simple approved actions (booking a chosen flight, placing an
order, arranging an appointment, sending replies, adding calendar events) are labelled
**Private beta**. Deeper automation (monitoring, automatic rebooking, submitting
applications, coding tasks, recurring operations) is labelled **Coming later**.

**Founders must confirm** which actions and services the beta will really support. Every
"Private beta" label is a public promise. Change a label in that one file if it's wrong.

## Hero visual

The brief asked for astronauts in space. No image generator was available, and photos of real
astronauts weren't used (they show identifiable people and need licensing). The visual in
`src/components/HeroSpace.tsx` combines the official glowing ring asset with SVG-drawn,
backlit astronaut silhouettes and a star field. For launch, consider commissioning a
rendered illustration or 3D scene in the same composition. The component is a single drop-in
replacement point.

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

Desktop: three columns. Logo on the left; Product (menu with Capabilities and How it works),
About and Careers centred; Join the Waitlist on the right. Buttons are squared (6px corners)
across the site: primary purple, secondary white with purple text and border. Mobile: logo, Join waitlist, and a menu button listing all four pages.
