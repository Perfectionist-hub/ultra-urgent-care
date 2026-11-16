"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { hoursLabel, locations, placeName } from "@/lib/clinic";
import { getPages } from "@/lib/pages-copy";

export function ReviewsView() {
  const { locale } = useLocale();
  const copy = getPages(locale).reviews;
  return (
    <main id="content" className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.kicker}</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight text-ink">{copy.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{copy.lede}</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {locations.map((location) => (
          <article key={location.id} id={location.id} className="flex flex-col rounded-[1.6rem] border border-border bg-card p-7">
            <p className="text-xs tracking-[0.16em] text-clay uppercase">Google</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-ink">{placeName(location, locale)}</h2>
            <p className="mt-3 text-lg">
              {location.street}
              <br />
              {location.cityLine}
            </p>
            <p className="mt-2 text-muted-foreground">{hoursLabel(location, locale)}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy.missing}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={location.reviewsUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground">
                {copy.open}
              </a>
              <a href={location.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm">
                {copy.maps}
              </a>
              <Link href={`/book?location=${location.id}`} className="inline-flex h-11 items-center text-sm text-primary">
                {copy.book}
              </Link>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-10 max-w-2xl leading-relaxed text-foreground/80">{copy.after}</p>
    </main>
  );
}
