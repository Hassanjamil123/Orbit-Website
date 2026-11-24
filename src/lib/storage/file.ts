import { promises as fs } from "node:fs";
import path from "node:path";
import type { Collection, InsertResult, RecordFor, StorageDriver } from "./types";

/**
 * Append-only JSON Lines storage for local development and single-server hosting.
 * Not suitable for serverless platforms (read-only or ephemeral filesystems) —
 * use the Supabase driver there.
 */
export class FileStorage implements StorageDriver {
  readonly name = "file";
  private queue: Promise<unknown> = Promise.resolve();

  constructor(private readonly dir: string) {}

  private file(collection: Collection) {
    return path.join(this.dir, `${collection}.jsonl`);
  }

  /** Serialise writes in-process so duplicate checks and appends can't interleave. */
  private exclusive<T>(fn: () => Promise<T>): Promise<T> {
    const run = this.queue.then(fn, fn);
    this.queue = run.catch(() => undefined);
    return run;
  }

  private async readAll<C extends Collection>(collection: C): Promise<RecordFor<C>[]> {
    let text: string;
    try {
      text = await fs.readFile(this.file(collection), "utf8");
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw err;
    }
    const rows: RecordFor<C>[] = [];
    for (const line of text.split("\n")) {
      if (!line.trim()) continue;
      try {
        rows.push(JSON.parse(line));
      } catch {
        // Skip a partially written line rather than failing every request.
      }
    }
    return rows;
  }

  insert<C extends Collection>(collection: C, record: RecordFor<C>): Promise<InsertResult> {
    return this.exclusive(async () => {
      const existing = await this.readAll(collection);
      if (existing.some((r) => r.email === record.email)) return { status: "duplicate" } as const;
      await fs.mkdir(this.dir, { recursive: true, mode: 0o700 });
      await fs.appendFile(this.file(collection), JSON.stringify(record) + "\n", { mode: 0o600 });
      return { status: "created" } as const;
    });
  }

  list<C extends Collection>(collection: C): Promise<RecordFor<C>[]> {
    return this.exclusive(() => this.readAll(collection));
  }
}
