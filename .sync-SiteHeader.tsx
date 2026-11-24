"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, productNav } from "@/lib/site";
import { Logo } from "./Logo";
import { ButtonLink } from "./ui";

const linkBase = "rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const productButton = useRef<HTMLButtonElement>(null);
  const productWrap = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const productActive = productNav.some((p) => isActive(p.href));

  // Close both menus on navigation (reset during render, as React recommends).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setProductOpen(false);
  }

  // Escape closes whichever menu is open and returns focus to its button.
  useEffect(() => {
    if (!menuOpen && !productOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (productOpen) {
        setProductOpen(false);
        productButton.current?.focus();
      } else {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (productOpen && !productWrap.current?.contains(e.target as Node)) setProductOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen, productOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/90 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-[4.25rem] w-full max-w-[74rem] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="Orbit home" className="shrink-0 rounded-md">
          <Logo height={30} priority />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          <div
            ref={productWrap}
            className="relative"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setProductOpen(false);
            }}
          >
            <button
              ref={productButton}
              type="button"
              aria-expanded={productOpen}
              aria-controls="product-menu"
              onClick={() => setProductOpen((v) => !v)}
              className={`${linkBase} inline-flex items-center gap-1.5 ${productActive ? "text-ink" : "text-body hover:text-ink"}`}
            >
              Product
              <svg
                aria-hidden="true"
                viewBox="0 0 12 8"
                className={`h-2 w-3 transition-transform ${productOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M1 1.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ul
              id="product-menu"
              hidden={!productOpen}
              className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-line bg-canvas p-2 shadow-[0_12px_32px_-12px_rgba(13,13,18,0.18)]"
            >
              {productNav.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    aria-current={isActive(p.href) ? "page" : undefined}
                    className="block rounded-xl px-4 py-3 transition-colors hover:bg-mist"
                  >
                    <span className="block font-semibold text-ink">{p.label}</span>
                    <span className="block text-sm text-muted">{p.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`${linkBase} ${isActive(item.href) ? "text-ink" : "text-body hover:text-ink"}`}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/early-access" size="sm" className="ml-3">
            Join the waitlist
          </ButtonLink>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ButtonLink href="/early-access" size="sm">
            Join waitlist
          </ButtonLink>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {menuOpen ? <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" /> : <path d="M3.5 7h13M3.5 13h13" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      <nav id="mobile-menu" aria-label="Main" hidden={!menuOpen} className="border-t border-line bg-canvas px-5 pb-6 pt-3 md:hidden">
        <p className="pt-2 text-sm font-semibold text-muted">Product</p>
        <ul>
          {productNav.map((p) => (
            <li key={p.href} className="border-b border-line">
              <Link href={p.href} aria-current={isActive(p.href) ? "page" : undefined} className="flex h-14 items-center text-lg font-medium text-ink">
                {p.label}
              </Link>
            </li>
          ))}
          {nav.map((item) => (
            <li key={item.href} className="border-b border-line last:border-b-0">
              <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className="flex h-14 items-center text-lg font-medium text-ink">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
