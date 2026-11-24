export const site = {
  name: "Orbit",
  tagline: "Just Tell Orbit.",
  domain: "justtellorbit.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://justtellorbit.com").replace(/\/$/, ""),
  description:
    "Just Tell Orbit. A personal AI built to do more than answer: it researches, plans, organizes, creates and takes action across your life and work, with your approval when it matters. Join the private beta waitlist.",
  /** One-line description used in the footer. */
  short: "A personal AI built to do more than answer: it researches, plans and takes action, with your approval.",
  /**
   * Public contact address. Leave empty until the mailbox exists and is
   * monitored: the footer hides Contact and the privacy page says contact
   * details are coming, rather than showing an address nobody reads.
   */
  contactEmail: "",
} as const;

export const productNav = [
  { href: "/capabilities", label: "Capabilities", note: "What Orbit is being built to do" },
  { href: "/how-it-works", label: "How it works", note: "Tell, plan, approve, done" },
] as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
] as const;

/**
 * Social profiles. Only verified, active URLs belong here: an entry with an
 * empty url is not shown anywhere on the site.
 */
export const social: { label: "X" | "LinkedIn" | "Instagram" | "YouTube"; url: string }[] = [
  { label: "X", url: "" },
  { label: "LinkedIn", url: "" },
  { label: "Instagram", url: "" },
  { label: "YouTube", url: "" },
];

/** Launch features with a place in the structure but deliberately not built yet. */
export const features = {
  updates: false, // /updates: blog, announcements, launch videos
  docs: false, // /docs: product documentation
  terms: false, // /terms: when the product has terms of service
  trust: false, // /trust: only once real safeguards can be described accurately
  betaInvites: false, // /invite/[code]: uses waitlist_signups.invite_status
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
