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
              What we&apos;re building for the private beta: research, planning and drafting.
            </dd>
          </div>
          <div className="flex items-start gap-3">
            <dt className="shrink-0">
              <Tag>{stageLabel.later}</Tag>
            </dt>
            <dd className="text-[0.95rem] leading-relaxed text-body">
              Where Orbit is headed: acting on your behalf, always with your approval.
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

          <details className="group mt-20 rounded-3xl border border-line bg-mist p-6 sm:p-8">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-bold tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
              More areas Orbit could help with
              <span
                aria-hidden="true"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-canvas text-lg transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              {moreDomains.map((m) => (
                <li key={m.name}>
                  <h3 className="font-bold">{m.name}</h3>
                  <p className="mt-1 leading-relaxed text-body">{m.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">All longer term. Nothing here is available today.</p>
          </details>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
