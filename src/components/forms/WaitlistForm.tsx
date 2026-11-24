"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { WAITLIST_CONSENT_TEXT } from "@/lib/copy";
import { buttonClass } from "../ui";
import { Checkbox, FieldError, Honeypot, inputClass } from "./fields";
import { useFormSubmit } from "./useFormSubmit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

type Props = {
  /** Where on the site this form lives; stored with each sign-up. */
  source: string;
  align?: "left" | "center";
};

export function WaitlistForm({ source, align = "left" }: Props) {
  const uid = useId();
  const emailId = `${uid}-email`;
  const consentId = `${uid}-consent`;
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [honey, setHoney] = useState("");
  const [local, setLocal] = useState<Record<string, string>>({});
  const { state, submit, fields } = useFormSubmit("/api/waitlist", source);
  const emailRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const errors = { ...fields, ...local };
  const submitting = state.status === "submitting";
  const center = align === "center";

  useEffect(() => {
    if (state.status === "success") doneRef.current?.focus();
    if (state.status === "error") emailRef.current?.focus();
  }, [state.status]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address, like name@example.com.";
    if (!consent) next.consent = "Tick the box to agree to beta emails.";
    setLocal(next);
    if (next.email) return emailRef.current?.focus();
    if (next.consent) return document.getElementById(consentId)?.focus();
    await submit({ email, consent, company_website: honey });
  }

  if (state.status === "success") {
    const duplicate = state.result === "duplicate";
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className={`w-full max-w-xl rounded-xl border border-line bg-canvas p-6 text-left shadow-[0_1px_2px_rgba(13,13,18,0.04)] outline-none sm:p-7 ${center ? "mx-auto" : ""}`}
      >
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full ${duplicate ? "bg-violet-soft text-violet" : "bg-violet text-white"}`}
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="text-lg font-bold">{duplicate ? "You're already on the list." : "You're on the list."}</p>
            <p className="mt-1 text-body">
              {duplicate ? (
                <>
                  <span className="font-medium text-ink">{email.trim().toLowerCase()}</span> is already registered for
                  the private beta, so there&apos;s nothing more to do.
                </>
              ) : (
                <>
                  We&apos;ll be in touch at <span className="font-medium text-ink">{email.trim().toLowerCase()}</span>{" "}
                  as places in the private beta open up.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formError = state.status === "error" && Object.keys(state.fields).length === 0 ? state.message : "";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={submitting}
      className={`relative w-full max-w-xl text-left ${center ? "mx-auto" : ""}`}
    >
      <Honeypot value={honey} onChange={setHoney} />
      <label htmlFor={emailId} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          ref={emailRef}
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${emailId}-error` : formError ? `${uid}-form-error` : undefined}
          className={`${inputClass(Boolean(errors.email))} h-14 sm:flex-1`}
        />
        <button type="submit" disabled={submitting} className={`${buttonClass("primary", "lg")} shrink-0`}>
          {submitting ? (
            <>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Joining…
            </>
          ) : (
            "Join the Waitlist"
          )}
        </button>
      </div>
      <FieldError id={`${emailId}-error`} message={errors.email} />
      <div className="mt-4">
        <Checkbox id={consentId} name="consent" checked={consent} onChange={setConsent} error={errors.consent}>
          {WAITLIST_CONSENT_TEXT}{" "}
          <Link href="/privacy" className="font-medium text-ink underline underline-offset-2">
            Privacy notice
          </Link>
        </Checkbox>
      </div>
      <p id={`${uid}-form-error`} role="alert" className={formError ? "mt-4 font-medium text-danger" : "sr-only"}>
        {formError}
      </p>
    </form>
  );
}
