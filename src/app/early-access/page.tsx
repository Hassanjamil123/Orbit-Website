import type { Metadata } from "next";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { HeroSpace } from "@/components/HeroSpace";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Early access",
  description: "Join the Orbit private beta waitlist. Just your email, no account needed. Just Tell Orbit.",
  alternates: { canonical: "/early-access" },
  openGraph: { url: "/early-access", title: "Join the Orbit private beta" },
};

const expectations = [
  { title: "Just your email", body: "No account, no password, no questionnaire." },
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
    <section aria-labelledby="early-title" className="pb-24 pt-12 sm:pb-32 sm:pt-16 lg:pt-20">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <h1 id="early-title" className="text-display font-bold uppercase">
              Join the
              <br />
              private beta.
            </h1>
            <p className="mt-8 max-w-[34rem] text-lead text-body">
              Orbit is preparing for a private beta that goes beyond chat: research, planning, drafting and real actions
              where supported, with your approval for anything that matters. Leave your email and we&apos;ll be in touch
              as places open up.
            </p>
            <div className="mt-10">
              <WaitlistForm source="early-access" />
            </div>
          </div>
          <HeroSpace />
        </div>

        <ul className="mt-20 grid gap-10 border-t border-line pt-12 sm:grid-cols-3">
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
