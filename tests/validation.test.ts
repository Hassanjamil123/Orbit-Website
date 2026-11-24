import { test } from "node:test";
import assert from "node:assert/strict";
import { interestSchema, normalizeEmail, waitlistSchema } from "../src/lib/validation";
import { toCsv } from "../src/lib/csv";
import { RateLimiter } from "../src/lib/rate-limit";
import { tokenMatches } from "../src/lib/http";

test("emails are trimmed and lower-cased", () => {
  assert.equal(normalizeEmail("  Ada@Example.COM "), "ada@example.com");
  const r = waitlistSchema.parse({ email: " Ada@Example.com ", consent: true });
  assert.equal(r.email, "ada@example.com");
});

test("invalid emails are rejected", () => {
  for (const email of ["", "ada", "ada@", "ada@example", "a b@example.com", "x".repeat(250) + "@ex.com"]) {
    assert.equal(waitlistSchema.safeParse({ email, consent: true }).success, false, email);
  }
});

test("waitlist requires explicit consent", () => {
  assert.equal(waitlistSchema.safeParse({ email: "ada@example.com" }).success, false);
  assert.equal(waitlistSchema.safeParse({ email: "ada@example.com", consent: "true" }).success, false);
  assert.equal(waitlistSchema.safeParse({ email: "ada@example.com", consent: false }).success, false);
});

test("attribution values are restricted to safe slugs", () => {
  const ok = waitlistSchema.safeParse({
    email: "ada@example.com",
    consent: true,
    attribution: { source: "home-hero", utm_source: "x.com", ref: "AB12" },
  });
  assert.equal(ok.success, true);
  const bad = waitlistSchema.safeParse({
    email: "ada@example.com",
    consent: true,
    attribution: { source: "<script>" },
  });
  assert.equal(bad.success, false);
});

test("careers interest needs terms acknowledgement and consent", () => {
  const base = {
    name: "Ada",
    email: "ada@example.com",
    role_area: "software",
    availability: "part-time",
    message: "I want to build the delegation engine for Orbit.",
  };
  assert.equal(interestSchema.safeParse({ ...base, terms: true, consent: true }).success, true);
  assert.equal(interestSchema.safeParse({ ...base, consent: true }).success, false);
  assert.equal(interestSchema.safeParse({ ...base, terms: true }).success, false);
  assert.equal(
    interestSchema.safeParse({ ...base, terms: true, consent: true, link: "javascript:alert(1)" }).success,
    false,
  );
});

test("CSV escapes quotes and neutralises formulas", () => {
  const csv = toCsv([{ a: '=HYPERLINK("x")', b: "plain, with comma" }], ["a", "b"]);
  assert.equal(csv, 'a,b\r\n"\'=HYPERLINK(""x"")","plain, with comma"\r\n');
});

test("rate limiter blocks after the limit and recovers after the window", () => {
  let now = 0;
  const rl = new RateLimiter(2, 1000, () => now);
  assert.equal(rl.check("k").allowed, true);
  assert.equal(rl.check("k").allowed, true);
  const blocked = rl.check("k");
  assert.equal(blocked.allowed, false);
  assert.equal(rl.check("other").allowed, true);
  now = 1001;
  assert.equal(rl.check("k").allowed, true);
});

test("admin token comparison", () => {
  assert.equal(tokenMatches("abc", "abc"), true);
  assert.equal(tokenMatches("abd", "abc"), false);
  assert.equal(tokenMatches(null, "abc"), false);
  assert.equal(tokenMatches("abc", undefined), false);
});
