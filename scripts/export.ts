/**
 * Export a collection to CSV on stdout using the configured storage driver.
 *
 *   npm run export:waitlist > waitlist.csv
 *   npm run export:interest > interest.csv
 *
 * Reads the same env vars as the app (load .env.local first, e.g. with
 * `node --env-file=.env.local` or your shell).
 */
import { INTEREST_COLUMNS, WAITLIST_COLUMNS } from "../src/lib/admin-export";
import { toCsv } from "../src/lib/csv";
import { getStorage, type InterestRecord, type WaitlistRecord } from "../src/lib/storage";

async function main() {
  const collection = process.argv[2];
  if (collection !== "waitlist" && collection !== "interest") {
    console.error("Usage: tsx scripts/export.ts <waitlist|interest>");
    process.exit(1);
  }
  const rows = await getStorage().list(collection);
  process.stdout.write(
    collection === "waitlist"
      ? toCsv(rows as WaitlistRecord[], WAITLIST_COLUMNS)
      : toCsv(rows as InterestRecord[], INTEREST_COLUMNS),
  );
  console.error(`Exported ${rows.length} ${collection} record(s).`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
