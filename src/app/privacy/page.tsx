import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Orbit collects through this website, why, and how to have it removed.",
  alternates: { canonical: "/privacy" },
};

// DRAFT: have this reviewed by someone qualified for the jurisdictions Orbit
// operates in before the site goes live. Keep it in step with what the code stores.
export default function PrivacyPage() {
  return (
    <section className="pb-28 pt-16 sm:pt-24">
      <Container>
        <div className="mx-auto max-w-[42rem]">
          <h1 className="text-hero font-bold">Privacy</h1>
          <p className="mt-6 text-lg text-muted">Last updated: November 2026</p>

          <div className="mt-12 space-y-10 text-lg leading-[1.7] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-[-0.03em] [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            <div>
              <h2>What this covers</h2>
              <p>
                This notice covers the Orbit website at {site.domain}: the private beta waitlist and the careers
                interest form. The Orbit product itself will have its own privacy policy.
              </p>
            </div>
            <div>
              <h2>What we collect</h2>
              <ul>
                <li>
                  <strong>Private beta waitlist:</strong> your email address, when you joined, which version of the consent
                  wording you agreed to, and how you found us (the page you signed up on, and any campaign or referral
                  code in the link you followed).
                </li>
                <li>
                  <strong>Careers interest:</strong> the details you type into the form — name, email, area,
                  availability, and optionally your location, a link and your message.
                </li>
              </ul>
              <p>
                We don&apos;t store your IP address. To stop abuse, we briefly keep a one-way hash of it in memory to limit
                repeated submissions. This site doesn&apos;t use advertising or analytics cookies.
              </p>
            </div>
            <div>
              <h2>Why we use it</h2>
              <ul>
                <li>To contact you about the Orbit private beta and launch updates, because you asked us to.</li>
                <li>To review careers interest and reply to you about it.</li>
              </ul>
              <p>We don&apos;t sell your details or share them for anyone else&apos;s marketing.</p>
            </div>
            <div>
              <h2>Where it&apos;s kept</h2>
              <p>
                Submissions are stored in a database run for us by our hosting and database providers, who process it only
                on our instructions. Access is limited to the Orbit team.
              </p>
            </div>
            <div>
              <h2>How long we keep it</h2>
              <p>
                Until the private beta has opened and you&apos;ve had the chance to join, or until you ask us to remove
                it, whichever comes first. Careers submissions are kept for up to 12 months.
              </p>
            </div>
            <div>
              <h2>Your choices</h2>
              <p>
                Every email we send will include a way to unsubscribe. To see, correct or delete what we hold about you,
                email{" "}
                <a href={`mailto:${site.contactEmail}`} className="font-semibold text-violet underline underline-offset-2">
                  {site.contactEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
