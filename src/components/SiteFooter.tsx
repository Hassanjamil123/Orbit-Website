import Link from "next/link";
import { site, social } from "@/lib/site";
import { Logo } from "./Logo";
import { Container } from "./ui";

type FooterLink = { href: string; label: string; external?: boolean };

const linkClass = "text-body transition-colors hover:text-ink";

export function SiteFooter() {
  const company: FooterLink[] = [
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
  ];
  if (site.contactEmail) company.push({ href: `mailto:${site.contactEmail}`, label: "Contact", external: true });

  const groups: { title: string; links: FooterLink[] }[] = [
    {
      title: "Product",
      links: [
        { href: "/capabilities", label: "Capabilities" },
        { href: "/how-it-works", label: "How it works" },
        { href: "/early-access", label: "Early access" },
      ],
    },
    { title: "Company", links: company },
    { title: "Legal", links: [{ href: "/privacy", label: "Privacy" }] },
  ];

  // Only verified, active profiles are shown.
  const liveSocial = social.filter((s) => s.url);
  if (liveSocial.length) {
    groups.push({ title: "Social", links: liveSocial.map((s) => ({ href: s.url, label: s.label, external: true })) });
  }

  return (
    <footer className="border-t border-line bg-mist">
      <Container className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.2fr_2fr]">
        <div className="max-w-xs">
          <Logo height={34} />
          <p className="mt-7 text-2xl font-bold tracking-[-0.03em]">{site.tagline}</p>
          <p className="mt-3 leading-relaxed text-body">{site.short}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className="text-sm font-semibold text-ink">{g.title}</h2>
              <ul className="mt-4 grid gap-3 text-[0.95rem]">
                {g.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a href={l.href} className={linkClass} rel="me noopener">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-sm text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Orbit. All rights reserved.</p>
        <p>Orbit is in development. Features described on this site are not yet available.</p>
      </Container>
    </footer>
  );
}
