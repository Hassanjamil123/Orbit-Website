import { z } from "zod";
import { AVAILABILITY, ROLE_AREAS } from "./copy";

export * from "./copy";

const slug = z
  .string()
  .trim()
  .max(64)
  .regex(/^[a-zA-Z0-9._-]*$/, "Invalid attribution value");

/** Normalise an email for storage and duplicate checks. */
export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

// Pragmatic email check: zod's RFC-ish check plus a real TLD and sane length.
export const emailSchema = z
  .string({ required_error: "Enter your email address." })
  .trim()
  .min(1, "Enter your email address.")
  .max(254, "That email address is too long.")
  .email("Enter a valid email address, like name@example.com.")
  .refine((v) => /\.[a-z]{2,}$/i.test(v), "Enter a valid email address, like name@example.com.")
  .transform(normalizeEmail);

const consentTrue = (message: string) =>
  z.literal(true, { errorMap: () => ({ message }) });

/** Anti-spam fields shared by every public form. */
const antiSpam = {
  // Honeypot: real people never see or fill this.
  company_website: z.string().max(200).optional().default(""),
  // Milliseconds since epoch when the form was rendered.
  started_at: z.coerce.number().int().nonnegative().optional(),
};

export const attributionSchema = z
  .object({
    source: slug.default("unknown"),
    utm_source: slug.optional(),
    utm_medium: slug.optional(),
    utm_campaign: slug.optional(),
    ref: slug.optional(),
  })
  .default({});

export const waitlistSchema = z.object({
  email: emailSchema,
  consent: consentTrue("Tick the box to agree to early-access emails."),
  attribution: attributionSchema,
  ...antiSpam,
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;



const roleValues = ROLE_AREAS.map((r) => r.value) as [string, ...string[]];
const availabilityValues = AVAILABILITY.map((a) => a.value) as [string, ...string[]];

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .refine((v) => v === "" || /^https?:\/\/[^\s]+\.[^\s]+$/i.test(v), "Enter a full link starting with https://")
  .optional()
  .default("");

export const interestSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120, "That name is too long."),
  email: emailSchema,
  role_area: z.enum(roleValues, { errorMap: () => ({ message: "Choose the area closest to your work." }) }),
  availability: z.enum(availabilityValues, { errorMap: () => ({ message: "Choose your availability." }) }),
  location: z.string().trim().max(120).optional().default(""),
  link: optionalUrl,
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more — at least 20 characters.")
    .max(2000, "Keep it under 2,000 characters."),
  terms: consentTrue("Tick the box to confirm you've read how early collaboration works."),
  consent: consentTrue("Tick the box so we can store your details to review them."),
  attribution: attributionSchema,
  ...antiSpam,
});

export type InterestInput = z.infer<typeof interestSchema>;

/** Flatten zod issues into { field: message } for accessible inline errors. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
