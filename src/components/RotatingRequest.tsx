"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through example requests in the hero. Pauses while hovered or
 * focused, and shows a single static example when reduced motion is preferred.
 * Screen readers get the full list in the examples section instead, so this
 * line is not announced as it changes.
 */
export function RotatingRequest({ items, interval = 3200 }: { items: readonly string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % items.length), interval);
    return () => window.clearInterval(t);
  }, [paused, items.length, interval]);

  return (
    <p
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex min-h-[2.2em] items-center justify-center text-lg text-muted sm:text-xl"
    >
      <span key={i} className="example-in">
        &ldquo;{items[i]}&rdquo;
      </span>
    </p>
  );
}
