"use client";

import { VisitForm } from "@/components/visit-form";
import { useLocale } from "@/components/locale-provider";
import { hoursLabel, locations, placeName } from "@/lib/clinic";
import { getCopy } from "@/lib/ui-copy";

export function VisitView() {
  const { locale } = useLocale();
  const copy = getCopy(locale);
  return (
    <main id="content" className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.visit.kicker}</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight text-ink">{copy.visit.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{copy.visit.lede}</p>
        <ul className="mt-8 space-y-4">
          {locations.map((location) => (
            <li key={location.id} className="rounded-2xl bg-sand/80 px-4 py-4">
              <p className="font-medium">{placeName(location, locale)}</p>
              <p className="text-sm text-muted-foreground">{hoursLabel(location, locale)}</p>
              <a className="mt-1 inline-block font-display text-2xl text-ink" href={`tel:${location.phoneTel}`}>
                {location.phoneDisplay}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <VisitForm />
    </main>
  );
}
