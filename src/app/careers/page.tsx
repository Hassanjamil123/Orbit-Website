import type { Metadata } from "next";
import { InterestForm } from "@/components/forms/InterestForm";
import { Container, Heading, PageIntro, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Help build Orbit, the personal AI being built to get real things done. We're early and bootstrapped: read how collaboration works, then tell us what you'd build.",
  alternates: { canonical: "/careers" },
  openGraph: { url: "/careers", title: "Careers at Orbit" },
};

const problems = [
  {
    title: "Understanding what people mean",
    body: "Turning a loose, human request into a clear plan, and knowing when to ask instead of guess.",
  },
  {
    title: "Acting safely in the real world",
    body: "Bookings, forms and purchases with real consequences, done only with permission and always reversible where possible.",
  },
  {
    title: "Staying reliable over long tasks",
    body: "Work that spans hours or days, survives interruptions and leaves evidence of what happened.",
  },
  {
    title: "Making all of it feel simple",
    body: "Hiding enormous complexity behind three words: just tell Orbit.",
  },
];

const philosophy = [
  "Trust is the product. Earn it before asking for more of it.",
  "Ship small, learn from real people, then go further.",
  "Prefer plain language, in the product and in the code.",
  "Own the outcome, not only the task.",
];

const areas = [
  { title: "AI and agent engineering", body: "Planning, tool use, memory, evaluation and the systems that let Orbit act." },
  { title: "Software engineering", body: "The product, the platform and the integrations everything runs on." },
  { title: "Product design", body: "How people hand work to an AI, follow it and trust what comes back." },
  { title: "Research", body: "Reliability, safety and measuring whether Orbit really helped." },
  { title: "Creative production", body: "Film, motion, writing and the visual identity of a new kind of product." },
  { title: "Growth and marketing", body: "Telling Orbit's story and building a community around it." },
];

const honesty = [
  "Orbit is an early-stage, bootstrapped startup.",
  "We can't currently guarantee paid positions, and there are no salaried vacancies open.",
  "We aren't offering salaries, equity or benefits through this page. If there's a fit, any arrangement would be discussed openly and agreed in writing before you commit to anything.",
  "Please don't leave a job or turn down paid work because of this page.",
  "When this changes, this page will change first.",
];

export default function CareersPage() {
  return (
    <>
      <PageIntro
        title="Help build the AI that gets things done."
        lead="Orbit's mission is to make powerful AI accessible to everyone. We're early, we're small, and the people who join now will shape what Orbit becomes."
      />

      <Section aria-labelledby="opportunity-title">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 id="opportunity-title" className="text-title font-bold text-balance">
            The opportunity
          </h2>
          <div className="max-w-[40rem] space-y-6 text-lg leading-[1.75] text-body">
            <p>
              AI has become remarkably good at answering questions. The next step, an assistant that can reliably carry
              out real work across someone&apos;s whole life, is still unbuilt. It may be one of the most useful things
              software can do for people.
            </p>
            <p>
              Orbit is our attempt at it: one personal AI that researches, plans, connects to services and, with
              permission, gets things done. It&apos;s a foundational problem, and we&apos;re at the very start of it.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="mist" aria-labelledby="problems-title">
        <Container>
          <Heading id="problems-title" title="Problems worth your time" />
          <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {problems.map((p) => (
              <li key={p.title} className="border-t border-line pt-6">
                <h3 className="text-xl font-bold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-body">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="philosophy-title">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 id="philosophy-title" className="text-title font-bold text-balance">
            How we build
          </h2>
          <ul className="grid gap-5">
            {philosophy.map((line) => (
              <li key={line} className="border-l-2 border-violet pl-5 text-xl font-medium leading-snug tracking-[-0.015em]">
                {line}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="mist" aria-labelledby="areas-title">
        <Container>
          <Heading
            id="areas-title"
            title="Who we'd love to hear from"
            lead="Engineers, designers, researchers, creatives and collaborators who want to help shape Orbit from its earliest days."
          />
          <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <li key={a.title} className="border-t border-line pt-6">
                <h3 className="text-xl font-bold tracking-[-0.02em]">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{a.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="apply-title" id="apply">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-line bg-mist p-7 sm:p-9">
              <h2 className="text-2xl font-bold tracking-[-0.025em]">Before you get in touch</h2>
              <ul className="mt-6 grid gap-4">
                {honesty.map((line) => (
                  <li key={line} className="border-l-2 border-violet pl-4 leading-relaxed text-ink">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <Heading
              id="apply-title"
              title="Express interest"
              lead="This isn't a job application. Tell us who you are and what you'd want to build. We read everything, and if there's a fit we'll reply by email."
            />
            <div className="mt-12">
              <InterestForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
