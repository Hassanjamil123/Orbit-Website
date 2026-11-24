import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { HeroSpace } from "./HeroSpace";

/* Shared layout and action primitives. Every page is built from these. */

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[74rem] px-5 sm:px-8 ${className}`}>{children}</div>;
}

type SectionProps = ComponentProps<"section"> & { tone?: "canvas" | "mist"; spacing?: "md" | "lg" };

export function Section({ tone = "canvas", spacing = "lg", className = "", children, ...rest }: SectionProps) {
  const bg = tone === "mist" ? "bg-mist" : "bg-canvas";
  const pad = spacing === "lg" ? "py-24 sm:py-32" : "py-16 sm:py-20";
  return (
    <section className={`${bg} ${pad} ${className}`} {...rest}>
      {children}
    </section>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-[6px] font-semibold whitespace-nowrap tracking-[-0.005em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-70";

const variants = {
  primary: "border border-violet bg-violet text-white hover:border-violet-deep hover:bg-violet-deep",
  secondary: "border border-violet bg-canvas text-violet hover:bg-violet-soft",
  quiet: "text-ink hover:text-violet",
} as const;

const sizes = {
  sm: "h-10 px-4 text-[0.92rem]",
  md: "h-12 px-6 text-[0.98rem]",
  lg: "h-14 px-8 text-[1.02rem]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return `${buttonBase} ${variants[variant]} ${sizes[size]}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${buttonClass(variant, size)} ${className}`}>
      {children}
    </Link>
  );
}

/** Text link with the accent color. */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`font-semibold text-violet underline decoration-violet/30 underline-offset-4 transition-colors hover:decoration-violet ${className}`}
    >
      {children}
    </Link>
  );
}

/** Page or section heading. One scale for the whole site. */
export function Heading({
  id,
  title,
  lead,
  as: Tag = "h2",
  align = "left",
  className = "",
}: {
  id?: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Tag id={id} className="text-title font-bold text-balance text-ink">
        {title}
      </Tag>
      {lead ? (
        <p className={`mt-6 max-w-[40rem] text-lead text-body ${center ? "mx-auto" : ""}`}>{lead}</p>
      ) : null}
    </div>
  );
}

/** Opening block for every inner page. */
export function PageIntro({ title, lead, children }: { title: ReactNode; lead: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b border-line pb-20 pt-14 sm:pb-24 sm:pt-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <div>
          <h1 className="max-w-4xl text-hero font-bold text-balance">{title}</h1>
          <p className="mt-8 max-w-[38rem] text-lead text-body">{lead}</p>
          {children}
        </div>
        <HeroSpace compact className="hidden lg:block" />
      </Container>
    </section>
  );
}

/** Small status tag. Used to mark beta focus vs longer-term ambition. */
export function Tag({ tone = "neutral", children }: { tone?: "accent" | "neutral"; children: ReactNode }) {
  const t = tone === "accent" ? "bg-violet-soft text-violet-deep" : "bg-mist text-muted border border-line";
  return <span className={`inline-flex h-6 items-center rounded-[4px] px-2 text-xs font-semibold ${t}`}>{children}</span>;
}
