import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const MAX_BODY_BYTES = 16 * 1024;

export function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(data), { ...init, headers });
}

/** Best-effort client IP. Behind Vercel/most proxies the first x-forwarded-for entry is the client. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Hash the IP so raw addresses never sit in memory longer than the request. */
export function ipKey(req: Request, salt = process.env.RATE_LIMIT_SALT ?? "orbit-dev-salt"): string {
  return createHmac("sha256", salt).update(clientIp(req)).digest("hex").slice(0, 32);
}

/**
 * Reject cross-site form posts. Browsers always send Origin on POST fetches;
 * when it is present it must match this site.
 */
export function isAllowedOrigin(req: Request, siteUrl = process.env.NEXT_PUBLIC_SITE_URL): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients; other checks still apply
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const allowed = new Set<string>();
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (host) allowed.add(host);
  if (siteUrl) {
    try {
      allowed.add(new URL(siteUrl).host);
    } catch {
      /* ignore malformed config */
    }
  }
  return allowed.has(originHost);
}

/** Read a JSON body with a hard size cap. Returns null if missing, too large, or malformed. */
export async function readJson(req: Request): Promise<unknown | null> {
  const type = req.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) return null;
  const declared = Number(req.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) return null;
  const text = await req.text();
  if (Buffer.byteLength(text) > MAX_BODY_BYTES) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Constant-time comparison of a presented token against the configured one. */
export function tokenMatches(presented: string | null | undefined, expected: string | undefined): boolean {
  if (!presented || !expected) return false;
  const a = createHash("sha256").update(presented).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
