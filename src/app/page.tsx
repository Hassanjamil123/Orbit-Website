import { ClosingCta } from "@/components/ClosingCta";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { AppIcon } from "@/components/Logo";
import { Container, Heading, Section, Tag, TextLink } from "@/components/ui";
import { abilities, domains, requests, stageLabel } from "@/content/capabilities";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* B. Hero */}
      <section aria-labelledby="hero-title" className="pb-24 pt-16 sm:pb-32 sm:pt-24">
        <Container className="flex flex-col items-center text-center">
          <AppIcon size={84} className="shadow-[0_18px_40px_-18px_rgba(98,36,204,0.55)]" />
          <h1 id="hero-title" className="mt-10 max-w-5xl text-hero font-bold text-balance">
            Your life. Your ambitions. One&nbsp;Orbit.
          </h1>
          <p className="mt-8 max-w-[36rem] text-lead text-body">
            Meet Orbit, the personal AI being built to go beyond answers and help you get things done across your life
            and work.
          </p>
          <p className="mt-9 text-[1.6rem] font-bold tracking-[-0.03em] sm:text-[1.9rem]">{site.tagline}</p>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-14 rounded-full bg-linear-to-r from-ring-from to-ring-to" />
          <div id="join" className="mt-10 w-full">
            <WaitlistForm source="home-hero" align="center" />
          </div>
          <p className="mt-6 text-sm text-muted">Private beta waitlist. No account needed, just your email.</p>
        </Container>
      </section>

      {/* C. What Orbit can do */}
      <Section aria-labelledby="examples-title" id="examples" className="border-t border-line">
        <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Heading
              id="examples-title"
              title="Just tell Orbit what you need."
              lead="Say it the way you'd say it to a person. These are the kinds of requests Orbit is being built to take on."
            />
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted">
              These show where Orbit is headed, not what every workflow does today. The private beta starts with
              research, planning and drafting; acting on your behalf comes later, with your approval.
            </p>
          </div>
          <ul className="border-b border-line">
            {requests.map((r) => (
              <li key={r.text} className="flex items-baseline justify-between gap-6 border-t border-line py-6 sm:py-7">
                <p className="text-[1.45rem] font-semibold leading-snug tracking-[-0.025em] sm:text-[1.9rem]">
                  <span aria-hidden="true" className="text-muted">
                    &ldquo;
                  </span>
                  {r.text}
                  <span aria-hidden="true" className="text-muted">
                    &rdquo;
                  </span>
                </p>
                <span className="hidden shrink-0 text-sm text-muted sm:block">{r.domain}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* D. Beyond answers */}
      <Section tone="mist" aria-labelledby="beyond-title" id="beyond">
        <Container>
          <Heading
            id="beyond-title"
            title="Beyond answers."
            lead="Most AI stops at telling you things. Orbit is being built to take the next step: to plan, to work with the services you connect, and, with your permission, to get things done and show you what it did."
          />
          <div className="mt-16">
            <div aria-hidden="true" className="flex items-center gap-4 text-sm font-medium text-muted">
              <span>Answers</span>
              <span className="h-px flex-1 bg-linear-to-r from-line via-ring-from/50 to-ring-to" />
              <span className="text-ink">Outcomes</span>
            </div>
            <ol className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {abilities.map((a, i) => (
                <li key={a.title} className="border-t border-line pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold tabular-nums text-muted">{i + 1}</span>
                    <Tag tone={a.stage === "beta" ? "accent" : "neutral"}>{stageLabel[a.stage]}</Tag>
                  </div>
                  <h3 className="mt-4 text-xl font-bold tracking-[-0.02em]">{a.title}</h3>
                  <p className="mt-2 leading-relaxed text-body">{a.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* E. One Orbit, across your world */}
      <Section aria-labelledby="world-title" id="world">
        <Container className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Heading
              id="world-title"
              title="One Orbit, across your world."
              lead="You shouldn't need a different AI for travel, money, work and health. Orbit is one assistant that keeps your context and helps across all of it."
            />
            <p className="mt-8">
              <TextLink href="/capabilities">Explore capabilities</TextLink>
            </p>
          </div>
          <ul className="flex flex-wrap gap-2.5 lg:pt-3" aria-label="Areas Orbit is being built for">
            {domains.map((d) => (
              <li
                key={d.name}
                className="rounded-full border border-line bg-canvas px-4 py-2.5 text-[0.95rem] font-medium text-ink"
              >
                {d.name}
              </li>
            ))}
            <li className="rounded-full px-4 py-2.5 text-[0.95rem] text-muted">and more</li>
          </ul>
        </Container>
      </Section>

      {/* F. Closing CTA */}
      <ClosingCta />
    </>
  );
}
