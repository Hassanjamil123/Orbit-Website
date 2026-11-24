import { toCsv } from "./csv";
import { json, tokenMatches } from "./http";
import { getStorage, type Collection, type InterestRecord, type WaitlistRecord } from "./storage";

export const WAITLIST_COLUMNS: (keyof WaitlistRecord & string)[] = [
  "id",
  "email",
  "created_at",
  "source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "referred_by",
  "invite_status",
  "consent_version",
  "consented_at",
];

export const INTEREST_COLUMNS: (keyof InterestRecord & string)[] = [
  "id",
  "name",
  "email",
  "role_area",
  "availability",
  "location",
  "link",
  "message",
  "created_at",
  "source",
  "consent_version",
  "consented_at",
];

const MIN_TOKEN_LENGTH = 32;

/**
 * GET /api/admin/export?collection=waitlist|interest&format=csv|json
 * Authorization: Bearer <ADMIN_EXPORT_TOKEN>
 *
 * Disabled (404) unless ADMIN_EXPORT_TOKEN is set to a strong value, so a
 * forgotten env var can never expose the list. The token is accepted only in
 * the Authorization header, never the query string, so it stays out of logs.
 */
export async function handleExport(req: Request): Promise<Response> {
  const expected = process.env.ADMIN_EXPORT_TOKEN?.trim();
  if (!expected || expected.length < MIN_TOKEN_LENGTH) {
    return json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const auth = req.headers.get("authorization") ?? "";
  const presented = auth.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  if (!tokenMatches(presented, expected)) {
    return json(
      { ok: false, error: "Unauthorized" },
      { status: 401, headers: { "WWW-Authenticate": 'Bearer realm="orbit-admin"' } },
    );
  }

  const url = new URL(req.url);
  const collection = (url.searchParams.get("collection") ?? "waitlist") as Collection;
  const format = url.searchParams.get("format") ?? "csv";
  if (collection !== "waitlist" && collection !== "interest") {
    return json({ ok: false, error: "collection must be waitlist or interest" }, { status: 400 });
  }
  if (format !== "csv" && format !== "json") {
    return json({ ok: false, error: "format must be csv or json" }, { status: 400 });
  }

  let rows;
  try {
    rows = await getStorage().list(collection);
  } catch (err) {
    console.error("[orbit] export failed:", err instanceof Error ? err.message : err);
    return json({ ok: false, error: "Storage unavailable" }, { status: 503 });
  }

  if (format === "json") return json({ ok: true, collection, count: rows.length, rows });

  const csv =
    collection === "waitlist"
      ? toCsv(rows as WaitlistRecord[], WAITLIST_COLUMNS)
      : toCsv(rows as InterestRecord[], INTEREST_COLUMNS);
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="orbit-${collection}-${date}.csv"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
