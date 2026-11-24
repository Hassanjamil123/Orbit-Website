import path from "node:path";
import { FileStorage } from "./file";
import { SupabaseStorage } from "./supabase";
import { StorageConfigError, type StorageDriver } from "./types";

export * from "./types";

let cached: StorageDriver | null = null;

/** Resolve the configured storage driver. Throws StorageConfigError if misconfigured. */
export function getStorage(env: NodeJS.ProcessEnv = process.env): StorageDriver {
  if (cached && env === process.env) return cached;
  const driver = (env.STORAGE_DRIVER ?? (env.NODE_ENV === "production" ? "" : "file")).trim();

  let storage: StorageDriver;
  if (driver === "supabase") {
    const url = env.SUPABASE_URL?.trim();
    const key = env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (!url || !key) throw new StorageConfigError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
    storage = new SupabaseStorage(url, key);
  } else if (driver === "file") {
    if (env.VERCEL) throw new StorageConfigError("The file driver cannot persist data on Vercel; use supabase");
    storage = new FileStorage(path.resolve(env.DATA_DIR?.trim() || "./data"));
  } else {
    throw new StorageConfigError("Set STORAGE_DRIVER to 'supabase' (or 'file' for single-server hosting)");
  }

  if (env === process.env) cached = storage;
  return storage;
}

/** Test hook. */
export function setStorageForTests(storage: StorageDriver | null) {
  cached = storage;
}
