import { ClosingCta } from "@/components/ClosingCta";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { HeroSpace } from "@/components/HeroSpace";
import { RingIcon } from "@/components/Logo";
import { ButtonLink, Container, Heading, Section, Tag, TextLink } from "@/components/ui";
import { differences, domains, requests, stageLabel } from "@/content/capabilities";

// A curated handful for the homepage; the full list is on /capabilities.
const featured = [
  "Travel and mobility",
  "Shopping and commerce",
  "Education and careers",
  "Research and knowledge",
  "Health and wellness",
  "Finance and investments",
  "Creators and content production",
  "Productivity and life admin",
];

const control = [
  { title: "You decide what it can use", body: "Orbit only works with the accounts and services you choose to connect." },
  { title: "You approve what matters", body: "Bookings, purchases, submissions and messages wait for your go-ahead." },
  { title: "You see what happened", body: "Follow progress while Orbit works, and keep a record of what it did." },
];

export default function HomePage() {
  const featuredDomains = domains.filter((d) => featured.includes(d.name));
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="overflow-hidden pb-20 pt-12 sm:pb-28 sm:pt-16 lg:pt-20">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <h1 id="hero-title" className="text-display font-bold uppercase">
              Just tell
              <br />
              Orbit.
            </h1>
            <p className="mt-8 max-w-[33rem] text-lead text-body">
              Orbit is a personal AI built to do more than answer. It researches, plans, organizes, creates and takes
              action across your life and work, always with your approval when it matters.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#join" size="lg">
                Join the Waitlist
              </ButtonLink>
              <ButtonLink href="/capabilities" variant="secondary" size="lg">
                Explore Orbit
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-muted">Private beta waitlist. No account needed, just your email.</p>
          </div>
          <HeroSpace />
        </Container>
      </section>

      {/* Relatable, action-oriented examples */}
      <Section aria-labelledby="examples-title" id="examples" className="border-t border-line">
        <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Heading
              id="examples-title"
              title="Say it the way you'd say it to a person."
              lead="No tools to learn. No complicated workflows to manage. Just tell Orbit what you want done. Orbit's private beta is designed to go beyond chat, combining research, planning, drafting and real actions with your approval."
            />
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted">
              Example requests. Actions depend on the services Orbit supports, and anything consequential waits for
              your approval.
            </p>
          </div>
          <ul className="border-b border-line">
            {requests.map((r) => (
              <li key={r.text} className="grid grid-cols-[2.25rem_1fr] gap-4 border-t border-line py-6 sm:grid-cols-[2.75rem_1fr_auto] sm:py-7">
                <span className="pt-2">
                  <RingIcon size={20} />
                </span>
                <p className="text-[1.3rem] font-semibold leading-snug tracking-[-0.02em] text-balance sm:text-[1.6rem]">
                  {r.text}
                </p>
                <span className="col-start-2 text-sm text-muted sm:col-start-auto sm:pt-2">{r.domain}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Beyond answers */}
      <Section tone="mist" aria-labelledby="beyond-title" id="beyond">
        <Container>
          <Heading
            id="beyond-title"
            title="Beyond answers."
            lead="A chatbot tells you what to do. Orbit is built to get it done: to carry a task from your request to a finished result, checking with you along the way."
          />
          <ul className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {differences.map((d) => (
              <li key={d.title} className="bg-canvas p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-bold tracking-[-0.025em]">{d.title}</h3>
                  <Tag tone={d.stage === "beta" ? "accent" : "neutral"}>{stageLabel[d.stage]}</Tag>
                </div>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-body">{d.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Across your life */}
      <Section aria-labelledby="world-title" id="world">
        <Container className="grid items-start gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <Heading
              id="world-title"
              title="One Orbit, across your life."
              lead="Not a different assistant for travel, money, work and health. One Orbit that knows your context and gets things done across all of it."
            />
            <p className="mt-8">
              <TextLink href="/capabilities">See everything Orbit is being built to do</TextLink>
            </p>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {featuredDomains.map((d) => (
              <div key={d.name} className="border-t border-line py-5">
                <dt className="font-bold">{d.name}</dt>
                <dd className="mt-1 text-[0.95rem] leading-relaxed text-body">{d.summary}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* User control */}
      <Section tone="mist" aria-labelledby="control-title" id="control" spacing="md">
        <Container className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <h2 id="control-title" className="text-title font-bold text-balance">
              You stay in charge.
            </h2>
            <p className="mt-5 text-body">
              Orbit is built around these principles from the start. <TextLink href="/how-it-works">How it works</TextLink>
            </p>
          </div>
          <ul className="grid gap-8 sm:grid-cols-3">
            {control.map((c) => (
              <li key={c.title} className="border-t-2 border-violet pt-5">
                <h3 className="text-lg font-bold tracking-[-0.02em]">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{c.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Closing CTA with the waitlist form */}
      <ClosingCta id="join" lead="Join the private beta waitlist. No account, no questionnaire, just your email.">
        <h3 className="text-xl font-bold tracking-[-0.02em]">Join the private beta</h3>
        <p className="mt-2 mb-6 text-body">Joining doesn&apos;t guarantee immediate access. We&apos;re opening Orbit in small groups.</p>
        <WaitlistForm source="home" />
      </ClosingCta>
    </>
  );
}
