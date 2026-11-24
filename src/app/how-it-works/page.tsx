import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ClosingCta } from "@/components/ClosingCta";
import { AppIcon } from "@/components/Logo";
import { Container, PageIntro, Section, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Tell Orbit what you need, let it work out how to help, approve anything important, and follow the outcome. Just Tell Orbit.",
  alternates: { canonical: "/how-it-works" },
  openGraph: { url: "/how-it-works", title: "How Orbit works" },
};

/* Illustrations are simple diagrams of the intended experience, not product screenshots. */

function Frame({ children }: { children: ReactNode }) {
  return (
    <figure className="rounded-3xl border border-line bg-mist p-5 sm:p-7">
      <div className="rounded-2xl border border-line bg-canvas p-5 shadow-[0_1px_2px_rgba(13,13,18,0.04)] sm:p-6">{children}</div>
      <figcaption className="mt-3 px-1 text-sm text-muted">Illustration of the intended experience</figcaption>
    </figure>
  );
}

function Check({ done = true }: { done?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${done ? "bg-ink text-white" : "border-2 border-line"}`}
    >
      {done ? (
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </span>
  );
}

const steps = [
  {
    title: "Just tell Orbit.",
    body: "Describe what you want to get done, the way you would to a capable friend. No commands to learn. If something's unclear, Orbit asks.",
    art: (
      <Frame>
        <p className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-ink px-4 py-3 leading-snug text-white">
          I&apos;m speaking at a conference in Dubai on the 14th. Find me a good flight, nothing too early.
        </p>
        <div className="mt-4 flex items-start gap-3">
          <AppIcon size={28} />
          <p className="rounded-2xl rounded-tl-md bg-mist px-4 py-3 leading-snug text-ink">
            Flying from London? And would you rather arrive the day before?
          </p>
        </div>
      </Frame>
    ),
  },
  {
    title: "Orbit works out the steps.",
    body: "It breaks your request into steps, does the research, organizes what it finds, and uses the services you've connected where they're supported.",
    art: (
      <Frame>
        <p className="font-bold">Plan</p>
        <ul className="mt-4 grid gap-3">
          {[
            ["Check direct flights on the 13th", true],
            ["Leave out departures before 8am", true],
            ["Compare price, journey time and baggage", true],
            ["Shortlist the best three", false],
          ].map(([t, d]) => (
            <li key={t as string} className="flex items-center gap-3 text-[0.95rem]">
              <Check done={d as boolean} />
              <span className={d ? "text-body" : "text-ink"}>{t}</span>
            </li>
          ))}
        </ul>
      </Frame>
    ),
  },
  {
    title: "You stay in control.",
    body: "Important actions need your authorization first: bookings, purchases, submissions and messages sent in your name. You can change the plan or say no.",
    art: (
      <Frame>
        <p className="text-sm font-semibold text-muted">Needs your approval</p>
        <p className="mt-2 text-lg font-bold tracking-[-0.02em]">Book the 10:05 direct flight on 13 December?</p>
        <p className="mt-1 text-body">Arrives 20:40 local time. Checked bag included.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex h-10 items-center rounded-full bg-violet px-5 text-sm font-semibold text-white">Approve</span>
          <span className="inline-flex h-10 items-center rounded-full border border-line px-5 text-sm font-semibold">Change</span>
          <span className="inline-flex h-10 items-center rounded-full px-3 text-sm font-semibold text-muted">Not now</span>
        </div>
      </Frame>
    ),
  },
  {
    title: "See what gets done.",
    body: "Follow progress as Orbit works, and see the outcome: what was done, what's left and the confirmations to prove it.",
    art: (
      <Frame>
        <ol className="grid gap-4">
          {[
            ["Flight booked", "Confirmation saved to your trip"],
            ["Seat chosen", "Aisle, as you prefer"],
            ["Added to your calendar", "With the airport travel time"],
            ["Check-in reminder", "Set for the day before"],
          ].map(([t, s], i, arr) => (
            <li key={t} className="flex items-start gap-3">
              <Check done={i < arr.length - 1} />
              <div>
                <p className="font-semibold leading-tight">{t}</p>
                <p className="text-sm text-muted">{s}</p>
              </div>
            </li>
          ))}
        </ol>
      </Frame>
    ),
  },
];

const principles = [
  "You approve anything consequential before it happens.",
  "You choose which accounts and services Orbit can use, and you can disconnect them.",
  "You can always see what Orbit did, and why.",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro
        title="You say what you need. Orbit helps make it happen."
        lead="No complicated software to learn and no separate assistants to manage. Here's the experience Orbit is being built around, in four steps."
      />

      <Section aria-label="Four steps">
        <Container>
          <ol className="grid gap-24 sm:gap-32">
            {steps.map((s, i) => (
              <li key={s.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <p className="text-sm font-semibold tabular-nums text-violet">Step {i + 1}</p>
                  <h2 className="mt-3 text-title font-bold text-balance">{s.title}</h2>
                  <p className="mt-5 max-w-md text-lead text-body">{s.body}</p>
                </div>
                <div className={i % 2 ? "lg:order-1" : ""}>{s.art}</div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section aria-labelledby="direction-title" spacing="md" className="border-t border-line">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <h2 id="direction-title" className="text-2xl font-bold tracking-[-0.025em] sm:text-3xl">
              Where it&apos;s going
            </h2>
            <p className="mt-3">
              <Tag>Future</Tag>
            </p>
          </div>
          <div className="max-w-[40rem] space-y-5 text-lg leading-relaxed text-body">
            <p>
              Over time, Orbit is being designed to handle several things at once. A bigger request, like moving city,
              could be split into parts that progress side by side: searching for flats, comparing removal quotes and
              updating your address.
            </p>
            <p>
              Behind the scenes that may mean several coordinated helpers. For you it stays simple: one Orbit, one
              conversation, one place to approve and follow everything. This is the product direction, not a feature
              available today.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="mist" aria-labelledby="principles-title" spacing="md">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <h2 id="principles-title" className="text-2xl font-bold tracking-[-0.025em] sm:text-3xl">
            Built so you stay in charge
          </h2>
          <ul className="grid gap-6 sm:grid-cols-3">
            {principles.map((p) => (
              <li key={p} className="border-t-2 border-violet pt-4 leading-relaxed text-ink">
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta secondary={{ href: "/capabilities", label: "Explore capabilities" }} />
    </>
  );
}
