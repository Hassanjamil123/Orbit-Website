import { ClosingCta } from "@/components/ClosingCta";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { AppIcon } from "@/components/Logo";
import { RotatingRequest } from "@/components/RotatingRequest";
import { Container, Heading, Section, Tag, TextLink } from "@/components/ui";
import { differences, domains, requests, stageLabel } from "@/content/capabilities";
import { site } from "@/lib/site";

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
  { title: "You see what happened", body: "Progress is visible while Orbit works, and you get a record of what it did." },
];

export default function HomePage() {
  const featuredDomains = domains.filter((d) => featured.includes(d.name));
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="pb-24 pt-14 sm:pb-32 sm:pt-20">
        <Container className="flex flex-col items-center text-center">
          <AppIcon size={80} className="shadow-[0_18px_40px_-18px_rgba(98,36,204,0.5)]" />
          <h1 id="hero-title" className="mt-10 max-w-5xl text-hero font-bold text-balance">
            Your life. Your ambitions. One&nbsp;Orbit.
          </h1>
          <p className="mt-7 max-w-[36rem] text-lead text-body">
            Meet Orbit, the personal AI being built to go beyond answers and help you get things done across your life
            and work.
          </p>
          <p className="mt-10 text-[1.7rem] font-bold tracking-[-0.03em] sm:text-[2rem]">{site.tagline}</p>
          <div className="mt-2 w-full max-w-xl">
            <RotatingRequest items={requests.map((r) => r.text)} />
          </div>
          <div id="join" className="mt-10 w-full">
            <WaitlistForm source="home-hero" align="center" />
          </div>
          <p className="mt-6 text-sm text-muted">Private beta waitlist. No account needed, just your email.</p>
        </Container>
      </section>

      {/* Relatable examples */}
      <Section aria-labelledby="examples-title" id="examples" className="border-t border-line">
        <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Heading
              id="examples-title"
              title="Say it the way you'd say it to a person."
              lead="No apps to choose between, no tools to learn. These are the kinds of things you'll be able to tell Orbit."
            />
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted">
              Examples of where Orbit is headed. The private beta starts with research, planning and drafting; acting on
              your behalf comes later, and always with your approval.
            </p>
          </div>
          <ul className="border-b border-line">
            {requests.map((r) => (
              <li key={r.text} className="flex items-baseline justify-between gap-6 border-t border-line py-6 sm:py-7">
                <p className="text-[1.4rem] font-semibold leading-snug tracking-[-0.025em] sm:text-[1.85rem]">
                  <span aria-hidden="true" className="text-muted">&ldquo;</span>
                  {r.text}
                  <span aria-hidden="true" className="text-muted">&rdquo;</span>
                </p>
                <span className="hidden shrink-0 text-sm text-muted sm:block">{r.domain}</span>
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
            lead="A chatbot tells you what to do. Orbit is being built to help you do it: to carry a task from your request to a finished result."
          />
          <ul className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {differences.map((d) => (
              <li key={d.title} className="border-t border-line pt-6">
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
              lead="Not a different assistant for travel, money, work and health. One Orbit that knows your context and helps with all of it."
            />
            <p className="mt-8">
              <TextLink href="/capabilities">See every area Orbit is being built for</TextLink>
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
              Orbit is being designed around these principles from the start.{" "}
              <TextLink href="/how-it-works">How it works</TextLink>
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

      {/* Closing CTA */}
      <ClosingCta />
    </>
  );
}
