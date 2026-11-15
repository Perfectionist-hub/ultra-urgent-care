"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { locations, placeShort } from "@/lib/clinic";
import { getCopy } from "@/lib/ui-copy";

export function NotFoundView() {
  const { locale } = useLocale();
  const copy = getCopy(locale).missing;
  return (
    <main id="content" className="mx-auto max-w-xl px-5 py-20">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.kicker}</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight text-ink">{copy.title}</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">{copy.body}</p>
      <ul className="mt-6 space-y-2">
        {locations.map((location) => (
          <li key={location.id}>
            <a className="text-primary" href={`tel:${location.phoneTel}`}>
              {placeShort(location, locale)} · {location.phoneDisplay}
            </a>
          </li>
        ))}
      </ul>
      <Link href="/" className="mt-8 inline-block text-sm underline-offset-4 hover:underline">
        {copy.home}
      </Link>
    </main>
  );
}
