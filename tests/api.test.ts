import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { POST as waitlistPOST } from "../src/app/api/waitlist/route";
import { POST as interestPOST } from "../src/app/api/interest/route";
import { GET as exportGET } from "../src/app/api/admin/export/route";
import { setLimitersForTests } from "../src/lib/submissions";
import { RateLimiter } from "../src/lib/rate-limit";
import { FileStorage } from "../src/lib/storage/file";
import { SupabaseStorage } from "../src/lib/storage/supabase";
import { setStorageForTests } from "../src/lib/storage";

const SITE = "https://justtellorbit.com";
const TOKEN = "t".repeat(40);
let dir: string;

process.env.NEXT_PUBLIC_SITE_URL = SITE;

function post(url: string, body: unknown, headers: Record<string, string> = {}) {
  return new Request(`${SITE}${url}`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: SITE, "x-forwarded-for": "203.0.113.7", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const signup = (email = "ada@example.com", extra: object = {}) => ({
  email,
  consent: true,
  started_at: Date.now() - 5000,
  attribution: { source: "home-hero", utm_campaign: "launch" },
  ...extra,
});

function rows(collection: string) {
  try {
    return readFileSync(path.join(dir, `${collection}.jsonl`), "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
  } catch {
    return [];
  }
}

beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), "orbit-test-"));
  setStorageForTests(new FileStorage(dir));
  setLimitersForTests({ waitlist: new RateLimiter(100, 60_000), interest: new RateLimiter(100, 60_000) });
});

after(() => setStorageForTests(null));

test("valid signup is persisted with consent and attribution", async () => {
  const res = await waitlistPOST(post("/api/waitlist", signup("Ada@Example.com")));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.ok, true);
  const saved = rows("waitlist");
  assert.equal(saved.length, 1);
  assert.equal(saved[0].email, "ada@example.com");
  assert.equal(saved[0].source, "home-hero");
  assert.equal(saved[0].utm_campaign, "launch");
  assert.equal(saved[0].invite_status, "waiting");
  assert.ok(saved[0].consent_version && saved[0].consented_at);
});

test("duplicate email writes no second row and reports the duplicate state", async () => {
  const a = await (await waitlistPOST(post("/api/waitlist", signup()))).json();
  const b = await (await waitlistPOST(post("/api/waitlist", signup("ADA@example.com ")))).json();
  assert.equal(a.status, "joined");
  assert.equal(b.ok, true);
  assert.equal(b.status, "duplicate");
  assert.equal(rows("waitlist").length, 1);
});

test("concurrent duplicate submissions still produce one row", async () => {
  await Promise.all(Array.from({ length: 10 }, () => waitlistPOST(post("/api/waitlist", signup()))));
  assert.equal(rows("waitlist").length, 1);
});

test("invalid email returns 422 with a field error", async () => {
  const res = await waitlistPOST(post("/api/waitlist", signup("not-an-email")));
  assert.equal(res.status, 422);
  const body = await res.json();
  assert.match(body.fields.email, /valid email/);
  assert.equal(rows("waitlist").length, 0);
});

test("missing consent returns 422", async () => {
  const res = await waitlistPOST(post("/api/waitlist", { ...signup(), consent: false }));
  assert.equal(res.status, 422);
  assert.ok((await res.json()).fields.consent);
});

test("honeypot and too-fast submissions get a fake success and are not stored", async () => {
  const r1 = await waitlistPOST(post("/api/waitlist", signup("bot1@example.com", { company_website: "spam.biz" })));
  const r2 = await waitlistPOST(post("/api/waitlist", signup("bot2@example.com", { started_at: Date.now() })));
  assert.equal(r1.status, 200);
  assert.equal(r2.status, 200);
  assert.equal(rows("waitlist").length, 0);
});

test("cross-origin posts are rejected", async () => {
  const res = await waitlistPOST(post("/api/waitlist", signup(), { origin: "https://evil.example" }));
  assert.equal(res.status, 403);
});

test("malformed and oversized bodies are rejected", async () => {
  assert.equal((await waitlistPOST(post("/api/waitlist", "{not json"))).status, 400);
  assert.equal((await waitlistPOST(post("/api/waitlist", { email: "a".repeat(20_000) }))).status, 400);
  const form = new Request(`${SITE}/api/waitlist`, { method: "POST", headers: { origin: SITE }, body: "email=a" });
  assert.equal((await waitlistPOST(form)).status, 400);
});

test("rate limiting returns 429 with Retry-After", async () => {
  setLimitersForTests({ waitlist: new RateLimiter(2, 60_000), interest: new RateLimiter(2, 60_000) });
  await waitlistPOST(post("/api/waitlist", signup("a1@example.com")));
  await waitlistPOST(post("/api/waitlist", signup("a2@example.com")));
  const res = await waitlistPOST(post("/api/waitlist", signup("a3@example.com")));
  assert.equal(res.status, 429);
  assert.ok(Number(res.headers.get("retry-after")) > 0);
  // A different client is unaffected.
  const other = await waitlistPOST(post("/api/waitlist", signup("b@example.com"), { "x-forwarded-for": "198.51.100.2" }));
  assert.equal(other.status, 200);
});

test("storage failure returns 503 without leaking details", async () => {
  setStorageForTests({
    name: "broken",
    insert: async () => {
      throw new Error("db password wrong");
    },
    list: async () => [],
  });
  const res = await waitlistPOST(post("/api/waitlist", signup()));
  assert.equal(res.status, 503);
  assert.doesNotMatch(await res.text(), /password/);
});

test("careers interest is validated and stored", async () => {
  const good = {
    name: "Grace",
    email: "grace@example.com",
    role_area: "research",
    availability: "few-hours",
    link: "https://github.com/grace",
    message: "I'd like to work on evaluation for long-running delegated tasks.",
    terms: true,
    consent: true,
    started_at: Date.now() - 10_000,
    attribution: { source: "careers" },
  };
  const bad = await interestPOST(post("/api/interest", { ...good, terms: false }));
  assert.equal(bad.status, 422);
  const ok = await interestPOST(post("/api/interest", good));
  assert.equal(ok.status, 200);
  const saved = rows("interest");
  assert.equal(saved.length, 1);
  assert.equal(saved[0].role_area, "research");
});

test("admin export is disabled without a strong token", async () => {
  delete process.env.ADMIN_EXPORT_TOKEN;
  assert.equal((await exportGET(new Request(`${SITE}/api/admin/export`))).status, 404);
  process.env.ADMIN_EXPORT_TOKEN = "short";
  assert.equal((await exportGET(new Request(`${SITE}/api/admin/export`, { headers: { authorization: "Bearer short" } }))).status, 404);
});

test("admin export requires the bearer token and returns CSV", async () => {
  process.env.ADMIN_EXPORT_TOKEN = TOKEN;
  await waitlistPOST(post("/api/waitlist", signup("ada@example.com")));
  await waitlistPOST(post("/api/waitlist", signup("-cmd@example.com")));

  const denied = await exportGET(new Request(`${SITE}/api/admin/export`, { headers: { authorization: "Bearer wrong" } }));
  assert.equal(denied.status, 401);
  const viaQuery = await exportGET(new Request(`${SITE}/api/admin/export?token=${TOKEN}`));
  assert.equal(viaQuery.status, 401);

  const res = await exportGET(
    new Request(`${SITE}/api/admin/export?collection=waitlist&format=csv`, { headers: { authorization: `Bearer ${TOKEN}` } }),
  );
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /text\/csv/);
  assert.equal(res.headers.get("cache-control"), "no-store");
  const csv = await res.text();
  const lines = csv.trim().split("\r\n");
  assert.equal(lines.length, 3);
  assert.ok(lines[0].startsWith("id,email,created_at"));
  assert.ok(csv.includes("'-cmd@example.com"), "formula cell is neutralised");

  const asJson = await exportGET(
    new Request(`${SITE}/api/admin/export?collection=waitlist&format=json`, { headers: { authorization: `Bearer ${TOKEN}` } }),
  );
  assert.equal((await asJson.json()).count, 2);
  delete process.env.ADMIN_EXPORT_TOKEN;
});

test("Supabase driver maps unique violations to duplicate and pages exports", async () => {
  const calls: { url: string; init?: RequestInit }[] = [];
  let inserts = 0;
  const fakeFetch = (async (url: string, init?: RequestInit) => {
    calls.push({ url, init });
    if (init?.method === "POST") {
      inserts++;
      return inserts === 1
        ? new Response(null, { status: 201 })
        : new Response('{"code":"23505","message":"duplicate key"}', { status: 409 });
    }
    return new Response(JSON.stringify([{ email: "a@example.com" }]), { status: 200 });
  }) as typeof fetch;

  const s = new SupabaseStorage("https://proj.supabase.co/", "service-key", fakeFetch);
  const record = { email: "a@example.com" } as never;
  assert.deepEqual(await s.insert("waitlist", record), { status: "created" });
  assert.deepEqual(await s.insert("waitlist", record), { status: "duplicate" });
  assert.equal(calls[0].url, "https://proj.supabase.co/rest/v1/waitlist_signups");
  assert.equal((calls[0].init?.headers as Record<string, string>).apikey, "service-key");
  const listed = await s.list("waitlist");
  assert.equal(listed.length, 1);
});

after(() => {
  try {
    rmSync(dir, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});
