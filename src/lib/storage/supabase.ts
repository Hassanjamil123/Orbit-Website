import type { Collection, InsertResult, RecordFor, StorageDriver } from "./types";

const TABLES: Record<Collection, string> = {
  waitlist: "waitlist_signups",
  interest: "careers_interest",
};

const PAGE_SIZE = 1000;

/**
 * Supabase (Postgres) storage over the PostgREST HTTP API — no client SDK needed.
 * Duplicate prevention is enforced by a unique index on lower(email); see supabase/schema.sql.
 */
export class SupabaseStorage implements StorageDriver {
  readonly name = "supabase";

  constructor(
    private readonly url: string,
    private readonly serviceKey: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  private headers(extra: Record<string, string> = {}) {
    return {
      apikey: this.serviceKey,
      Authorization: `Bearer ${this.serviceKey}`,
      "Content-Type": "application/json",
      ...extra,
    };
  }

  private endpoint(collection: Collection, query = "") {
    return `${this.url.replace(/\/$/, "")}/rest/v1/${TABLES[collection]}${query}`;
  }

  async insert<C extends Collection>(collection: C, record: RecordFor<C>): Promise<InsertResult> {
    const res = await this.fetchImpl(this.endpoint(collection), {
      method: "POST",
      headers: this.headers({ Prefer: "return=minimal" }),
      body: JSON.stringify(record),
      cache: "no-store",
    });
    if (res.ok) return { status: "created" };
    const body = await res.text();
    // 23505 = unique_violation
    if (res.status === 409 || body.includes("23505")) return { status: "duplicate" };
    throw new Error(`Supabase insert failed (${res.status})`);
  }

  async list<C extends Collection>(collection: C): Promise<RecordFor<C>[]> {
    const all: RecordFor<C>[] = [];
    for (let offset = 0; ; offset += PAGE_SIZE) {
      const res = await this.fetchImpl(this.endpoint(collection, "?select=*&order=created_at.asc"), {
        headers: this.headers({ Range: `${offset}-${offset + PAGE_SIZE - 1}`, "Range-Unit": "items" }),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Supabase list failed (${res.status})`);
      const page = (await res.json()) as RecordFor<C>[];
      all.push(...page);
      if (page.length < PAGE_SIZE) return all;
    }
  }
}
