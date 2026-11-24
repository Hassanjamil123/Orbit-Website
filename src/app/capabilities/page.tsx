import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { Container, PageIntro, Section, Tag } from "@/components/ui";
import { domains, moreDomains, stageLabel } from "@/content/capabilities";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Travel, shopping, research, careers, health, money, work and more: what Orbit is being built to help with, and what comes first in the private beta.",
  alternates: { canonical: "/capabilities" },
  openGraph: { url: "/capabilities", title: "What Orbit is being built to do" },
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageIntro
        title="One Orbit for everything you'd ask for help with."
        lead="Orbit is being built to work across the whole of your life, not one corner of it. Here's the scope of that ambition, and an honest view of what comes first."
      >
        <dl className="mt-12 grid max-w-2xl gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <dt className="shrink-0">
              <Tag tone="accent">{stageLabel.beta}</Tag>
            </dt>
            <dd className="text-[0.95rem] leading-relaxed text-body">
              Being developed for the private beta: research, planning, drafting and remembering your context.
            </dd>
          </div>
          <div className="flex items-start gap-3">
            <dt className="shrink-0">
              <Tag>{stageLabel.later}</Tag>
            </dt>
            <dd className="text-[0.95rem] leading-relaxed text-body">
              Broader capabilities for later, including acting on your behalf, always with your approval.
            </dd>
          </div>
        </dl>
      </PageIntro>

      <Section aria-label="Domains">
        <Container>
          <div className="grid gap-x-16 gap-y-16 lg:grid-cols-2">
            {domains.map((d) => (
              <article key={d.name} className="border-t border-line pt-7">
                <h2 className="text-2xl font-bold tracking-[-0.025em]">{d.name}</h2>
                <p className="mt-2 text-lg leading-relaxed text-body">{d.summary}</p>
                <ul className="mt-6 grid gap-3">
                  {d.examples.map((e) => (
                    <li key={e.text} className="flex items-start justify-between gap-4">
                      <span className="leading-relaxed text-ink">{e.text}</span>
                      <span className="shrink-0 pt-0.5">
                        <Tag tone={e.stage === "beta" ? "accent" : "neutral"}>{stageLabel[e.stage]}</Tag>
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <section aria-labelledby="more-title" className="mt-24 rounded-3xl border border-line bg-mist p-7 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id="more-title" className="text-2xl font-bold tracking-[-0.025em] sm:text-3xl">
                Further ahead
              </h2>
              <Tag>{stageLabel.later}</Tag>
            </div>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-body">
              Areas we want Orbit to reach in time. None of these are available today.
            </p>
            <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {moreDomains.map((m) => (
                <li key={m.name}>
                  <h3 className="font-bold">{m.name}</h3>
                  <p className="mt-1 leading-relaxed text-body">{m.note}</p>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
