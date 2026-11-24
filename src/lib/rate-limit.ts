/**
 * Sliding-window rate limiter kept in memory.
 *
 * On serverless hosting each instance has its own memory, so this is a first
 * line of defence, not a global guarantee. Duplicate prevention in storage,
 * the honeypot and the timing check cover the rest. If abuse appears, move the
 * counters to a shared store (see docs/DEPLOYMENT.md).
 */
export class RateLimiter {
  private hits = new Map<string, number[]>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
    private readonly now: () => number = Date.now,
  ) {}

  /** Record an attempt. Returns whether it is allowed and, if not, seconds until retry. */
  check(key: string): { allowed: true } | { allowed: false; retryAfter: number } {
    const t = this.now();
    const recent = (this.hits.get(key) ?? []).filter((ts) => t - ts < this.windowMs);
    if (recent.length >= this.limit) {
      this.hits.set(key, recent);
      const retryAfter = Math.max(1, Math.ceil((recent[0] + this.windowMs - t) / 1000));
      return { allowed: false, retryAfter };
    }
    recent.push(t);
    this.hits.set(key, recent);
    if (this.hits.size > 10_000) this.prune(t);
    return { allowed: true };
  }

  private prune(t: number) {
    for (const [key, list] of this.hits) {
      if (list.every((ts) => t - ts >= this.windowMs)) this.hits.delete(key);
    }
  }
}
