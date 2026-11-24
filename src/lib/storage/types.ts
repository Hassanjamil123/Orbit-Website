export type Collection = "waitlist" | "interest";

export interface WaitlistRecord {
  id: string;
  email: string;
  created_at: string;
  consent_version: string;
  consented_at: string;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  /** Referral code the visitor arrived with. Groundwork for a future referral system. */
  referred_by: string | null;
  /** Groundwork for beta invitations: waiting → invited → joined. */
  invite_status: "waiting" | "invited" | "joined";
}

export interface InterestRecord {
  id: string;
  name: string;
  email: string;
  role_area: string;
  availability: string;
  location: string;
  link: string;
  message: string;
  created_at: string;
  consent_version: string;
  consented_at: string;
  source: string;
}

export type RecordFor<C extends Collection> = C extends "waitlist" ? WaitlistRecord : InterestRecord;

export type InsertResult = { status: "created" } | { status: "duplicate" };

export interface StorageDriver {
  readonly name: string;
  /** Insert unless a record with the same email already exists in the collection. */
  insert<C extends Collection>(collection: C, record: RecordFor<C>): Promise<InsertResult>;
  /** Return all records, oldest first. Admin export only. */
  list<C extends Collection>(collection: C): Promise<RecordFor<C>[]>;
}

export class StorageConfigError extends Error {}
