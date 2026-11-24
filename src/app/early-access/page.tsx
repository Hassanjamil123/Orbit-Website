import type { Metadata } from "next";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { HeroBackdrop } from "@/components/HeroSpace";
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
    <>
      <section aria-labelledby="early-title" className="relative isolate overflow-hidden border-b border-line">
        <HeroBackdrop />
        <Container className="flex flex-col items-center py-24 text-center sm:py-28 lg:py-32">
          <h1 id="early-title" className="text-display font-bold">
            Join the
            <br />
            private beta.
          </h1>
          <p className="mt-8 max-w-[34rem] text-lead text-body">
            Orbit&apos;s private beta goes beyond chat: research, planning, drafting and real actions where supported,
            with your approval for anything that matters. Leave your email and we&apos;ll be in touch as places open up.
          </p>
          <div className="mt-10 w-full max-w-xl rounded-lg border border-line bg-canvas p-6 text-left text-ink shadow-[0_20px_50px_-30px_rgba(60,40,120,0.35)] sm:p-8">
            <WaitlistForm source="early-access" />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <ul className="grid gap-10 sm:grid-cols-3">
            {expectations.map((e) => (
              <li key={e.title} className="border-t border-line pt-6">
                <h2 className="text-lg font-bold tracking-[-0.02em]">{e.title}</h2>
                <p className="mt-2 leading-relaxed text-body">{e.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
