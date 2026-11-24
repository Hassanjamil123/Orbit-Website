import { randomUUID } from "node:crypto";
import { RateLimiter } from "./rate-limit";
import { ipKey, isAllowedOrigin, json, readJson } from "./http";
import { getStorage, StorageConfigError, type InterestRecord, type WaitlistRecord } from "./storage";
import {
  INTEREST_CONSENT_VERSION,
  WAITLIST_CONSENT_VERSION,
  fieldErrors,
  interestSchema,
  waitlistSchema,
} from "./validation";

/** Submissions faster than this after the form rendered are treated as bots. */
export const MIN_FILL_MS = 1500;

export const MESSAGES = {
  waitlistJoined: "You're on the list. We'll be in touch as places in the private beta open up.",
  waitlistDuplicate: "You're already on the list, so there's nothing more to do.",
  interestReceived: "Thanks — we've got it. If there's a fit, we'll reply by email.",
  invalid: "Check the highlighted fields and try again.",
  badRequest: "We couldn't read that submission. Refresh the page and try again.",
  forbidden: "This form can only be submitted from justtellorbit.com.",
  rateLimited: "Too many attempts from this connection. Wait a few minutes and try again.",
  unavailable: "Sign-ups are paused for a moment. Try again shortly.",
} as const;

// 8 attempts per 10 minutes per IP for each form (typo corrections count as attempts).
const waitlistLimiter = new RateLimiter(8, 10 * 60_000);
const interestLimiter = new RateLimiter(8, 10 * 60_000);

type Limiters = { waitlist: RateLimiter; interest: RateLimiter };
let limiters: Limiters = { waitlist: waitlistLimiter, interest: interestLimiter };

/** Test hook. */
export function setLimitersForTests(next: Limiters) {
  limiters = next;
}

function looksLikeBot(data: { company_website?: string; started_at?: number }, now: number) {
  if (data.company_website) return true;
  if (data.started_at && now - data.started_at < MIN_FILL_MS) return true;
  return false;
}

async function guard(req: Request, limiter: RateLimiter): Promise<Response | unknown> {
  if (!isAllowedOrigin(req)) return json({ ok: false, error: MESSAGES.forbidden }, { status: 403 });
  const rl = limiter.check(ipKey(req));
  if (!rl.allowed) {
    return json(
      { ok: false, error: MESSAGES.rateLimited },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }
  const body = await readJson(req);
  if (body === null || typeof body !== "object") {
    return json({ ok: false, error: MESSAGES.badRequest }, { status: 400 });
  }
  return body;
}

function storageFailure(err: unknown) {
  if (err instanceof StorageConfigError) {
    console.error("[orbit] storage misconfigured:", err.message);
  } else {
    console.error("[orbit] storage error:", err instanceof Error ? err.message : err);
  }
  return json({ ok: false, error: MESSAGES.unavailable }, { status: 503 });
}

export async function handleWaitlist(req: Request): Promise<Response> {
  const body = await guard(req, limiters.waitlist);
  if (body instanceof Response) return body;

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, error: MESSAGES.invalid, fields: fieldErrors(parsed.error) }, { status: 422 });
  }
  const data = parsed.data;
  const now = Date.now();
  // Bots get the same success response so they learn nothing.
  if (looksLikeBot(data, now)) return json({ ok: true, status: "joined", message: MESSAGES.waitlistJoined });

  const stamp = new Date(now).toISOString();
  const record: WaitlistRecord = {
    id: randomUUID(),
    email: data.email,
    created_at: stamp,
    consent_version: WAITLIST_CONSENT_VERSION,
    consented_at: stamp,
    source: data.attribution.source,
    utm_source: data.attribution.utm_source ?? null,
    utm_medium: data.attribution.utm_medium ?? null,
    utm_campaign: data.attribution.utm_campaign ?? null,
    referred_by: data.attribution.ref ?? null,
    invite_status: "waiting",
  };

  let result;
  try {
    result = await getStorage().insert("waitlist", record);
  } catch (err) {
    return storageFailure(err);
  }
  // The brief asks for a visible "already on the list" state. Trade-off: this
  // confirms to anyone who types an address that it is registered. The rate
  // limit keeps that from scaling; see docs/DECISIONS.md to switch it off.
  if (result.status === "duplicate") {
    return json({ ok: true, status: "duplicate", message: MESSAGES.waitlistDuplicate });
  }
  return json({ ok: true, status: "joined", message: MESSAGES.waitlistJoined });
}

export async function handleInterest(req: Request): Promise<Response> {
  const body = await guard(req, limiters.interest);
  if (body instanceof Response) return body;

  const parsed = interestSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, error: MESSAGES.invalid, fields: fieldErrors(parsed.error) }, { status: 422 });
  }
  const data = parsed.data;
  const now = Date.now();
  if (looksLikeBot(data, now)) return json({ ok: true, message: MESSAGES.interestReceived });

  const stamp = new Date(now).toISOString();
  const record: InterestRecord = {
    id: randomUUID(),
    name: data.name,
    email: data.email,
    role_area: data.role_area,
    availability: data.availability,
    location: data.location,
    link: data.link,
    message: data.message,
    created_at: stamp,
    consent_version: INTEREST_CONSENT_VERSION,
    consented_at: stamp,
    source: data.attribution.source,
  };

  try {
    await getStorage().insert("interest", record);
  } catch (err) {
    return storageFailure(err);
  }
  return json({ ok: true, message: MESSAGES.interestReceived });
}
