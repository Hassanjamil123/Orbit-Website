import type { ReactNode } from "react";

export function inputClass(invalid: boolean) {
  return [
    "w-full rounded-2xl border bg-canvas px-4 text-base text-ink outline-none transition-colors duration-150",
    "placeholder:text-muted focus:border-violet focus:ring-4 focus:ring-violet/10",
    invalid ? "border-danger" : "border-line hover:border-ink/25",
  ].join(" ");
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-danger">
      {message}
    </p>
  );
}

export function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.95rem] font-semibold">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-muted">(optional)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="-mt-1 mb-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

/** Ids for aria-describedby: hint and error, if present. */
export function describedBy(id: string, opts: { hint?: boolean; error?: string }) {
  const ids = [opts.hint ? `${id}-hint` : null, opts.error ? `${id}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function Checkbox({
  id,
  name,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  name: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-[0.2rem] h-[1.15rem] w-[1.15rem] shrink-0 cursor-pointer accent-violet"
        />
        <label htmlFor={id} className="cursor-pointer text-[0.93rem] leading-snug text-body">
          {children}
        </label>
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

/** Invisible to people (and to assistive tech); bots tend to fill every field. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company website
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
