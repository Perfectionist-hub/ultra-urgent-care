"use client";

import Link from "next/link";
import { Wordmark } from "@/components/mark";
import { useLocale } from "@/components/locale-provider";
import { locations, placeName, practice } from "@/lib/clinic";
import { getCopy } from "@/lib/ui-copy";

export function SiteFooter() {
  const { locale } = useLocale();
  const copy = getCopy(locale);
  return (
    <footer className="site-chrome border-t border-border bg-sand/50 pb-36 md:pb-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{copy.footer.blurb}</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">{copy.footer.clinics}</p>
          <ul className="mt-3 space-y-4 text-sm">
            {locations.map((location) => (
              <li key={location.id}>
                <p className="font-medium">{placeName(location, locale)}</p>
                <p className="text-muted-foreground">
                  {location.street}, {location.cityLine}
                </p>
                <a className="text-primary" href={`tel:${location.phoneTel}`}>
                  {location.phoneDisplay}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">{copy.footer.onSite}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/services">{copy.footer.care}</Link></li>
            <li><Link href="/providers">{copy.footer.providers}</Link></li>
            <li><Link href="/locations">{copy.footer.hours}</Link></li>
            <li><Link href="/visit">{copy.footer.callback}</Link></li>
            <li><Link href="/flyer">{copy.footer.flyer}</Link></li>
            <li><Link href="/playbook">{copy.footer.playbook}</Link></li>
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">
            <a href={`mailto:${practice.email}`}>{practice.email}</a>
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs leading-relaxed text-muted-foreground">{copy.footer.legal}</p>
      </div>
    </footer>
  );
}
