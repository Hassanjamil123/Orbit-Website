/*
 * Form wording and options shared by client components and server validation.
 * Kept free of dependencies so it adds nothing to the browser bundle.
 */

/** Bump when consent wording changes, so every record shows which text the person agreed to. */
export const WAITLIST_CONSENT_VERSION = "2026-11-waitlist-v2";
export const INTEREST_CONSENT_VERSION = "2026-11-interest-v1";

export const WAITLIST_CONSENT_TEXT =
  "Email me about the Orbit private beta and launch updates. I can unsubscribe at any time.";

export const INTEREST_TERMS_TEXT =
  "I understand Orbit is bootstrapped, there are no salaried roles open right now, and any arrangement would be agreed in writing before work begins.";

export const INTEREST_CONSENT_TEXT =
  "Orbit may store what I've shared here to review my interest and contact me about it.";

export const ROLE_AREAS = [
  { value: "ai-agents", label: "AI and agent engineering" },
  { value: "software", label: "Software engineering" },
  { value: "design", label: "Product design" },
  { value: "research", label: "Research" },
  { value: "creative", label: "Creative production" },
  { value: "growth", label: "Growth and marketing" },
  { value: "other", label: "Something else" },
] as const;

export const AVAILABILITY = [
  { value: "few-hours", label: "A few hours a week" },
  { value: "part-time", label: "Part-time" },
  { value: "full-time", label: "Full-time, if the arrangement works" },
  { value: "exploring", label: "Just exploring for now" },
] as const;
