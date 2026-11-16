"use client";

import Link from "next/link";
import { BookForm } from "@/components/book-form";
import { useLocale } from "@/components/locale-provider";
import { hoursLabel, locations, placeName } from "@/lib/clinic";
import { getPages } from "@/lib/pages-copy";

export function BookView({
  initialVisit,
  initialLocation,
  initialConcern,
}: {
  initialVisit?: string;
  initialLocation?: string;
  initialConcern?: string;
}) {
  const { locale } = useLocale();
  const copy = getPages(locale).book;
  return (
    <main id="content" className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[0.82fr_1.18fr]">
      <div>
        <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.kicker}</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight text-ink">{copy.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{copy.lede}</p>
        <p className="mt-4 rounded-2xl bg-sand px-4 py-3 text-sm leading-relaxed">{copy.crisis}</p>
        <ul className="mt-8 space-y-4">
          {locations.map((location) => (
            <li key={location.id} className="rounded-2xl border border-border bg-card px-4 py-4">
              <p className="font-medium">{placeName(location, locale)}</p>
              <p className="text-sm text-muted-foreground">{hoursLabel(location, locale)}</p>
              <a className="mt-1 inline-block font-display text-2xl text-ink" href={`tel:${location.phoneTel}`}>
                {location.phoneDisplay}
              </a>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <a className="text-primary" href={location.mapsUrl} target="_blank" rel="noreferrer">
                  {getPages(locale).doors.maps}
                </a>
                <Link className="text-primary" href={`/locations#${location.id}`}>
                  {placeName(location, locale)}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <BookForm initialVisit={initialVisit} initialLocation={initialLocation} initialConcern={initialConcern} />
    </main>
  );
}
