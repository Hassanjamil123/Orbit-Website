export const site = {
  name: "Orbit",
  tagline: "Just Tell Orbit.",
  domain: "justtellorbit.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://justtellorbit.com").replace(/\/$/, ""),
  description:
    "Orbit is the personal AI being built to go beyond answers and help you get things done across your life and work. Just Tell Orbit. Join the private beta waitlist.",
  // TODO before launch: confirm these mailboxes exist.
  contactEmail: "hello@justtellorbit.com",
} as const;

export const nav = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
] as const;

/**
 * Social profiles. Leave url empty until an account exists and is verified;
 * the footer lists empty ones as "coming soon" without a link.
 */
export const social: { label: string; url: string }[] = [
  { label: "X", url: "" },
  { label: "LinkedIn", url: "" },
  { label: "Instagram", url: "" },
  { label: "YouTube", url: "" },
];

/**
 * Launch features that have a place in the structure but are deliberately not
 * built yet. Flip a flag when the route exists; the sitemap reads from here.
 */
export const features = {
  updates: false, // /updates — blog, announcements, launch videos
  docs: false, // /docs — product documentation
  terms: false, // /terms — add when the product has terms of service
  betaInvites: false, // /invite/[code] — uses waitlist_signups.invite_status
  referrals: false, // ?ref=CODE is already captured into waitlist_signups.referred_by
} as const;

export const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/capabilities", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/early-access", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
] as const;
