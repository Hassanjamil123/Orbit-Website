import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink, Container } from "./ui";

/*
 * Shared closing call to action: a contained night-sky panel with the official
 * glowing ring. Pass `children` (e.g. the waitlist form) to show it in a white
 * card on the right; otherwise two buttons are shown.
 */
export function ClosingCta({
  id,
  lead = "Join the private beta waitlist. All it takes is your email address.",
  secondary = { href: "/how-it-works", label: "See how it works" },
  children,
}: {
  id?: string;
  lead?: string;
  secondary?: { href: string; label: string } | null;
  children?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby="closing-title" className="bg-canvas py-20 sm:py-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-xl bg-[#07060f] px-6 py-16 text-white sm:px-12 sm:py-20 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_85%_50%,rgba(120,70,240,0.28),transparent_70%)]"
          />
          <Image
            src="/brand/orbit-icon-glow.webp"
            alt=""
            aria-hidden="true"
            width={403}
            height={381}
            className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-auto w-[26rem] -translate-y-1/2 opacity-60 sm:-right-10 lg:opacity-90"
          />
          <div className={`grid items-center gap-12 ${children ? "lg:grid-cols-[1fr_1.05fr] lg:gap-16" : ""}`}>
            <div>
              <h2 id="closing-title" className="text-display font-bold">
                Just Tell
                <br />
                Orbit.
              </h2>
              <p className="mt-6 max-w-md text-lead text-white/70">{lead}</p>
              {!children ? (
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/early-access" size="lg">
                    Join the Waitlist
                  </ButtonLink>
                  {secondary ? (
                    <ButtonLink href={secondary.href} variant="secondary" size="lg">
                      {secondary.label}
                    </ButtonLink>
                  ) : null}
                </div>
              ) : null}
            </div>
            {children ? <div className="rounded-lg bg-canvas p-6 text-ink sm:p-8">{children}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
