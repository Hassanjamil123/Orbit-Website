import type { Metadata } from "next";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { AppIcon } from "@/components/Logo";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Early access",
  description: "Join the Orbit private beta waitlist. Just your email, no account needed. Just Tell Orbit.",
  alternates: { canonical: "/early-access" },
  openGraph: { url: "/early-access", title: "Join the Orbit private beta" },
};

const expectations = [
  {
    title: "Just your email",
    body: "No account, no password, no questionnaire.",
  },
  {
    title: "Invites in small groups",
    body: "We're opening Orbit gradually. Joining the waitlist doesn't guarantee immediate access.",
  },
  {
    title: "Easy to leave",
    body: "Any email we send will include a way to unsubscribe, and you can ask us to delete your address at any time.",
  },
];

export default function EarlyAccessPage() {
  return (
    <section aria-labelledby="early-title" className="pb-28 pt-16 sm:pb-36 sm:pt-24">
      <Container className="flex flex-col items-center text-center">
        <AppIcon size={72} className="shadow-[0_18px_40px_-18px_rgba(98,36,204,0.55)]" />
        <h1 id="early-title" className="mt-10 max-w-3xl text-hero font-bold text-balance">
          Join the private beta.
        </h1>
        <p className="mt-8 max-w-[34rem] text-lead text-body">
          Orbit is preparing for a private beta. Leave your email and we&apos;ll be in touch as places open up.
        </p>
        <div className="mt-12 w-full">
          <WaitlistForm source="early-access" align="center" />
        </div>

        <ul className="mt-20 grid w-full max-w-4xl gap-10 border-t border-line pt-12 text-left sm:grid-cols-3">
          {expectations.map((e) => (
            <li key={e.title}>
              <h2 className="text-lg font-bold tracking-[-0.02em]">{e.title}</h2>
              <p className="mt-2 leading-relaxed text-body">{e.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
