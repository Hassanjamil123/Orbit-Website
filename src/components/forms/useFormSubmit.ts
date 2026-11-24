"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Attribution = {
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  ref?: string;
};

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string; result: "joined" | "duplicate" }
  | { status: "error"; message: string; fields: Record<string, string> };

const SAFE = /^[a-zA-Z0-9._-]{1,64}$/;

/** Read UTM and referral params after mount, so server and client markup match. */
function readAttribution(source: string): Attribution {
  const out: Attribution = { source };
  if (typeof window === "undefined") return out;
  const params = new URLSearchParams(window.location.search);
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "ref"] as const) {
    const v = params.get(key);
    if (v && SAFE.test(v)) out[key] = v;
  }
  return out;
}

export function useFormSubmit(endpoint: string, source: string) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const startedAt = useRef<number>(0);
  const attribution = useRef<Attribution>({ source });

  useEffect(() => {
    startedAt.current = Date.now();
    attribution.current = readAttribution(source);
  }, [source]);

  const submit = useCallback(
    async (payload: Record<string, unknown>) => {
      setState({ status: "submitting" });
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, started_at: startedAt.current, attribution: attribution.current }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          status?: string;
          message?: string;
          error?: string;
          fields?: Record<string, string>;
        };
        if (res.ok && data.ok) {
          setState({
            status: "success",
            message: data.message ?? "Done.",
            result: data.status === "duplicate" ? "duplicate" : "joined",
          });
          return true;
        }
        setState({
          status: "error",
          message: data.error ?? "Something went wrong. Try again in a moment.",
          fields: data.fields ?? {},
        });
      } catch {
        setState({
          status: "error",
          message: "We couldn't reach Orbit. Check your connection and try again.",
          fields: {},
        });
      }
      return false;
    },
    [endpoint],
  );

  const fields = state.status === "error" ? state.fields : {};
  return { state, submit, fields, setState };
}
