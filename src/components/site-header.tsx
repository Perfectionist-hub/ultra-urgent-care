"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Wordmark } from "@/components/mark";
import { LanguageSwitch, useLocale } from "@/components/locale-provider";
import { locations, placeShort } from "@/lib/clinic";
import { getCopy } from "@/lib/ui-copy";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const copy = getCopy(locale);
  const links = [
    { href: "/services", label: copy.nav.care },
    { href: "/what-we-treat", label: copy.nav.treat },
    { href: "/locations", label: copy.nav.locations },
    { href: "/providers", label: copy.nav.providers },
  ];
  const more = [
    { href: "/insurance", label: copy.footer.insurance },
    { href: "/reviews", label: copy.footer.reviews },
    { href: "/visit", label: copy.nav.callback },
    { href: "/flyer", label: copy.nav.flyer },
  ];

  return (
    <header className="site-chrome sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Wordmark />
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-foreground/80 hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <div className="hidden items-center gap-4 lg:flex">
            {locations.map((location) => (
              <a key={location.id} href={`tel:${location.phoneTel}`} className="leading-tight">
                <span className="block text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {placeShort(location, locale)}
                </span>
                <span className="text-sm font-medium">{location.phoneDisplay}</span>
              </a>
            ))}
          </div>
          <LanguageSwitch />
          <Link href="/book" className={buttonVariants({ className: "h-10 rounded-full px-4" })}>
            {copy.nav.book}
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
          <span className="sr-only">{open ? copy.nav.closeMenu : copy.nav.openMenu}</span>
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-border px-5 py-4 md:hidden">
          <ul className="space-y-3 text-lg">
            <li>
              <Link href="/book" onClick={() => setOpen(false)} className="font-medium text-primary">
                {copy.nav.book}
              </Link>
            </li>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            {more.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <LanguageSwitch />
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

export function CallBar() {
  const { locale } = useLocale();
  const copy = getCopy(locale);
  return (
    <div className="site-chrome fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-2 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Link href="/book" className={buttonVariants({ className: "col-span-2 h-11 rounded-full" })}>
          {copy.nav.book}
        </Link>
        {locations.map((location) => (
          <a
            key={location.id}
            href={`tel:${location.phoneTel}`}
            className={buttonVariants({
              variant: location.id === "hoffman" ? "default" : "outline",
              className: "h-11 rounded-full px-2 text-xs",
            })}
          >
            {copy.nav.call} {placeShort(location, locale)}
          </a>
        ))}
        <button
          type="button"
          className="col-span-2 inline-flex h-10 items-center justify-center gap-2 rounded-full text-sm text-primary"
          onClick={() => window.dispatchEvent(new Event("ultra-open-chat"))}
        >
          <MessageCircle className="size-4" />
          {copy.chat.button}
        </button>
      </div>
    </div>
  );
}
