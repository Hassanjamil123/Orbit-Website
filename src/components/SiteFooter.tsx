import Link from "next/link";
import { site, social } from "@/lib/site";
import { LogoHorizontal } from "./Logo";
import { Container } from "./ui";

const groups = [
  {
    title: "Product",
    links: [
      { href: "/capabilities", label: "Capabilities" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/early-access", label: "Early access" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    title: "Legal",
    links: [{ href: "/privacy", label: "Privacy" }],
  },
];

const linkClass = "text-body transition-colors hover:text-ink";

export function SiteFooter() {
  const liveSocial = social.filter((s) => s.url);
  const pendingSocial = social.filter((s) => !s.url);
  return (
    <footer className="border-t border-line bg-mist">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <LogoHorizontal height={44} />
          <p className="mt-6 text-2xl font-bold tracking-[-0.03em]">{site.tagline}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className="text-sm font-semibold text-ink">{g.title}</h2>
              <ul className="mt-4 grid gap-3 text-[0.95rem]">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
                {g.title === "Company" ? (
                  <li>
                    <a href={`mailto:${site.contactEmail}`} className={linkClass}>
                      Contact
                    </a>
                    <span className="mt-1 block text-sm text-muted">{site.contactEmail}</span>
                  </li>
                ) : null}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-sm font-semibold text-ink">Social</h2>
            {liveSocial.length ? (
              <ul className="mt-4 grid gap-3 text-[0.95rem]">
                {liveSocial.map((s) => (
                  <li key={s.label}>
                    <a href={s.url} className={linkClass} rel="me noopener">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            {pendingSocial.length ? (
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
                {pendingSocial.map((s) => s.label).join(", ").replace(/, ([^,]*)$/, " and $1")} accounts are coming soon.
              </p>
            ) : null}
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-sm text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Orbit. All rights reserved.</p>
        <p>{site.domain}</p>
      </Container>
    </footer>
  );
}
