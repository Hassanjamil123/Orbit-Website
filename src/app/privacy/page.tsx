import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Orbit collects through this website, why, who processes it, and how to have it removed.",
  alternates: { canonical: "/privacy" },
};

/*
 * DRAFT — must be reviewed before public launch. It describes what the code
 * actually does. Items needing owner confirmation are listed in
 * docs/PRIVACY-REVIEW.md (legal entity, contact, jurisdiction, retention,
 * hosting regions). Update this page whenever the data handling changes.
 */
export default function PrivacyPage() {
  return (
    <section className="pb-28 pt-16 sm:pt-24">
      <Container>
        <div className="mx-auto max-w-[42rem]">
          <h1 className="text-hero font-bold">Privacy</h1>
          <p className="mt-6 text-lg text-muted">Last updated: November 2026</p>

          <div className="mt-12 space-y-10 text-lg leading-[1.7] text-body [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-[-0.025em] [&_h2]:text-ink [&_p]:mt-3 [&_strong]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            <div>
              <h2>What this covers</h2>
              <p>
                This notice covers the Orbit website at {site.domain}: the private beta waitlist and the careers
                interest form. The Orbit product will have its own privacy policy before anyone uses it.
              </p>
            </div>

            <div>
              <h2>What we collect</h2>
              <ul>
                <li>
                  <strong>Waitlist:</strong> your email address; the date and time you joined; that you agreed to be
                  contacted, and which version of that wording you saw; the page you signed up on; and, if the link you
                  followed included them, campaign tags and a referral code.
                </li>
                <li>
                  <strong>Careers interest:</strong> what you type into the form (name, email, area, availability, and
                  optionally your location, a link and your message), the date and time, and your confirmation that you
                  read how early collaboration works.
                </li>
              </ul>
              <p>
                We don&apos;t store your IP address. To prevent abuse, the website briefly keeps a one-way scrambled
                version of it in memory to limit repeated submissions, then discards it. The site sets no cookies and
                uses no advertising or analytics tracking.
              </p>
            </div>

            <div>
              <h2>Why we use it</h2>
              <ul>
                <li>To contact you about the Orbit private beta and launch, because you asked us to.</li>
                <li>To review careers interest and reply to you about it.</li>
                <li>To understand which pages and links bring people to the waitlist.</li>
              </ul>
              <p>We don&apos;t sell your details or share them for anyone else&apos;s marketing.</p>
            </div>

            <div>
              <h2>Who processes it</h2>
              <p>
                The website is hosted by Vercel, and submissions are stored in a database run by Supabase. They process
                the data on our behalf and only to provide those services. Only the Orbit team can view or export it.
              </p>
            </div>

            <div>
              <h2>How long we keep it</h2>
              <p>
                Waitlist details are kept until the private beta has opened and you&apos;ve had the chance to join, or
                until you ask us to remove them. Careers submissions are kept for up to 12 months.
              </p>
            </div>

            <div>
              <h2>Your choices</h2>
              <p>
                You can ask to see, correct or delete what we hold about you at any time, and any email we send will
                include a way to unsubscribe.{" "}
                {site.contactEmail ? (
                  <>
                    Write to{" "}
                    <a href={`mailto:${site.contactEmail}`} className="font-semibold text-violet underline underline-offset-4">
                      {site.contactEmail}
                    </a>
                    .
                  </>
                ) : (
                  <>A contact address for privacy requests will be published here before launch.</>
                )}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
