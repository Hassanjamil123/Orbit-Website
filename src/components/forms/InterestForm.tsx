"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AVAILABILITY, INTEREST_CONSENT_TEXT, INTEREST_TERMS_TEXT, ROLE_AREAS } from "@/lib/copy";
import { buttonClass } from "../ui";
import { Checkbox, Field, Honeypot, describedBy, inputClass } from "./fields";
import { useFormSubmit } from "./useFormSubmit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const MESSAGE_MAX = 2000;

type Values = {
  name: string;
  email: string;
  role_area: string;
  availability: string;
  location: string;
  link: string;
  message: string;
};

const ORDER: (keyof Values | "terms" | "consent")[] = [
  "name",
  "email",
  "role_area",
  "availability",
  "location",
  "link",
  "message",
  "terms",
  "consent",
];

function validate(v: Values, terms: boolean, consent: boolean) {
  const e: Record<string, string> = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address, like name@example.com.";
  if (!v.role_area) e.role_area = "Choose the area closest to your work.";
  if (!v.availability) e.availability = "Choose your availability.";
  if (v.link.trim() && !/^https?:\/\/\S+\.\S+$/i.test(v.link.trim())) e.link = "Enter a full link starting with https://";
  if (v.message.trim().length < 20) e.message = "Tell us a little more — at least 20 characters.";
  if (v.message.length > MESSAGE_MAX) e.message = "Keep it under 2,000 characters.";
  if (!terms) e.terms = "Tick the box to confirm you've read how early collaboration works.";
  if (!consent) e.consent = "Tick the box so we can store your details to review them.";
  return e;
}

export function InterestForm() {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    role_area: "",
    availability: "",
    location: "",
    link: "",
    message: "",
  });
  const [terms, setTerms] = useState(false);
  const [consent, setConsent] = useState(false);
  const [honey, setHoney] = useState("");
  const [local, setLocal] = useState<Record<string, string>>({});
  const { state, submit, fields } = useFormSubmit("/api/interest", "careers");
  const doneRef = useRef<HTMLDivElement>(null);
  const errors = { ...fields, ...local };
  const submitting = state.status === "submitting";

  useEffect(() => {
    if (state.status === "success") doneRef.current?.focus();
    if (state.status === "error") focusFirst(state.fields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const set = (k: keyof Values) => (e: { target: { value: string } }) => setValues((s) => ({ ...s, [k]: e.target.value }));

  function focusFirst(errs: Record<string, string>) {
    const first = ORDER.find((k) => errs[k]);
    if (first) document.getElementById(id(first))?.focus();
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(values, terms, consent);
    setLocal(errs);
    if (Object.keys(errs).length) return focusFirst(errs);
    await submit({ ...values, terms, consent, company_website: honey });
  }

  if (state.status === "success") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="rounded-xl border border-line bg-mist p-8 outline-none sm:p-10">
        <p className="text-2xl font-bold tracking-[-0.03em]">Thanks, {values.name.split(" ")[0]}.</p>
        <p className="mt-3 max-w-prose text-lg text-body">{state.message}</p>
      </div>
    );
  }

  const input = (k: keyof Values, extra: object = {}, hint = false) => ({
    id: id(k),
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": describedBy(id(k), { hint, error: errors[k] }),
    ...extra,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-6">
      <Honeypot value={honey} onChange={setHoney} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("name")} label="Name" error={errors.name}>
          <input {...input("name", { autoComplete: "name", required: true })} className={`${inputClass(!!errors.name)} h-12`} />
        </Field>
        <Field id={id("email")} label="Email" error={errors.email}>
          <input
            {...input("email", { type: "email", autoComplete: "email", inputMode: "email", required: true })}
            className={`${inputClass(!!errors.email)} h-12`}
          />
        </Field>
        <Field id={id("role_area")} label="Area" error={errors.role_area}>
          <select {...input("role_area", { required: true })} className={`${inputClass(!!errors.role_area)} h-12 appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat`} style={{ backgroundImage: CHEVRON }}>
            <option value="">Choose one</option>
            {ROLE_AREAS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id("availability")} label="Availability" error={errors.availability}>
          <select {...input("availability", { required: true })} className={`${inputClass(!!errors.availability)} h-12 appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat`} style={{ backgroundImage: CHEVRON }}>
            <option value="">Choose one</option>
            {AVAILABILITY.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id("location")} label="Where you're based" optional hint="City or time zone is enough." error={errors.location}>
          <input {...input("location", { autoComplete: "address-level2" }, true)} className={`${inputClass(!!errors.location)} h-12`} />
        </Field>
        <Field id={id("link")} label="A link to your work" optional hint="GitHub, portfolio, paper or profile." error={errors.link}>
          <input {...input("link", { type: "url", inputMode: "url", placeholder: "https://" }, true)} className={`${inputClass(!!errors.link)} h-12`} />
        </Field>
      </div>
      <Field
        id={id("message")}
        label="What would you want to build at Orbit?"
        hint="A few sentences is plenty. Tell us what you've made and what you'd take on."
        error={errors.message}
      >
        <textarea
          {...input("message", { rows: 6, maxLength: MESSAGE_MAX, required: true }, true)}
          className={`${inputClass(!!errors.message)} min-h-40 py-3 leading-relaxed`}
        />
        <p className="mt-2 text-right text-sm text-muted" aria-live="polite">
          {values.message.length > MESSAGE_MAX - 200 ? `${MESSAGE_MAX - values.message.length} characters left` : ""}
        </p>
      </Field>
      <div className="grid gap-4 rounded-xl border border-line bg-mist p-5">
        <Checkbox id={id("terms")} name="terms" checked={terms} onChange={setTerms} error={errors.terms}>
          {INTEREST_TERMS_TEXT}
        </Checkbox>
        <Checkbox id={id("consent")} name="consent" checked={consent} onChange={setConsent} error={errors.consent}>
          {INTEREST_CONSENT_TEXT}{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy notice
          </Link>
          .
        </Checkbox>
      </div>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={submitting} className={buttonClass("primary", "lg")}>
          {submitting ? "Sending…" : "Send expression of interest"}
        </button>
        <p role="alert" className={state.status === "error" ? "font-medium text-danger" : "sr-only"}>
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}

const CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%230d0d12' stroke-width='1.8'/%3E%3C/svg%3E\")";
