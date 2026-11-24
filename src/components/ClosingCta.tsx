import { site } from "@/lib/site";
import { ButtonLink, Container } from "./ui";

/** Shared closing call to action, used at the end of every marketing page. */
export function ClosingCta({
  lead = "Join the private beta waitlist. All it takes is your email address.",
  secondary = { href: "/how-it-works", label: "See how it works" },
}: {
  lead?: string;
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section aria-labelledby="closing-title" className="border-t border-line bg-canvas py-28 sm:py-36">
      <Container className="text-center">
        <h2 id="closing-title" className="text-hero font-bold">
          {site.tagline}
        </h2>
        <span aria-hidden="true" className="mx-auto mt-7 block h-[3px] w-16 rounded-full bg-linear-to-r from-ring-from to-ring-to" />
        <p className="mx-auto mt-7 max-w-md text-lead text-body">{lead}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/early-access" size="lg">
            Join the waitlist
          </ButtonLink>
          {secondary ? (
            <ButtonLink href={secondary.href} variant="secondary" size="lg">
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
