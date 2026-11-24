import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { Container, PageIntro, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Orbit's mission is to make powerful AI accessible to everyone. Why we're building one personal AI for everyday life.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About Orbit" },
};

const beliefs = [
  {
    title: "Time",
    body: "Hours go to work that isn't really yours to do: comparing, filling in, chasing up. That time should come back to you.",
  },
  {
    title: "Freedom",
    body: "Your attention belongs on the things you care about, not on keeping track of everything else.",
  },
  {
    title: "Capability",
    body: "Things that once needed a team, a budget or the right connections should be within reach of anyone.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="Make powerful AI accessible to everyone."
        lead="That's Orbit's mission. We believe AI should give people more time, more freedom and the ability to do things that used to be difficult or out of reach."
      />

      <Section aria-labelledby="why-title">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 id="why-title" className="text-title font-bold text-balance">
            Why one Orbit
          </h2>
          <div className="max-w-[40rem] space-y-6 text-lg leading-[1.75] text-body">
            <p>
              Today&apos;s AI is impressive at answering questions. But most of life isn&apos;t a question. It&apos;s a
              trip to plan, an application to finish, a bill to sort out, a week to get under control. The answer is only
              the start; the work is everything after it.
            </p>
            <p>
              We don&apos;t think the future is a different assistant for every part of your life, each with its own app
              and its own memory. We think it&apos;s one assistant that knows your context, works across all of it, and
              keeps you in charge of anything that matters.
            </p>
            <p>
              That&apos;s what we&apos;re building. It&apos;s a long road, and we&apos;re at the beginning of it. We&apos;re
              starting with a private beta so we can build carefully, with the people who&apos;ll use it.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="mist" aria-labelledby="beliefs-title">
        <Container>
          <h2 id="beliefs-title" className="text-title font-bold">
            What we&apos;re giving back
          </h2>
          <ul className="mt-14 grid gap-12 md:grid-cols-3">
            {beliefs.map((b) => (
              <li key={b.title} className="border-t border-line pt-6">
                <h3 className="text-2xl font-bold tracking-[-0.025em]">{b.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-body">{b.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta secondary={{ href: "/careers", label: "Work with us" }} />
    </>
  );
}
