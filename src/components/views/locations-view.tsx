"use client";

import { OpenNow } from "@/components/open-now";
import { useLocale } from "@/components/locale-provider";
import { hoursLabel, locations, placeName } from "@/lib/clinic";
import { getCopy } from "@/lib/ui-copy";

export function LocationsView() {
  const { locale } = useLocale();
  const copy = getCopy(locale);
  const roles = locale === "es"
    ? ["Urgencias al mediodía en el lado sur.", "Horario de tarde y noche para los suburbios del noroeste."]
    : ["Midday urgent care on the South Side.", "Evening hours for the northwest suburbs."];
  return (
    <main id="content" className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.locationsPage.kicker}</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight text-ink">{copy.locationsPage.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{copy.locationsPage.lede}</p>
      <div className="mt-10 max-w-xl">
        <OpenNow inverted={false} />
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {locations.map((location, index) => (
          <article key={location.id} className="rounded-[1.6rem] border border-border bg-card p-7">
            <p className="text-sm text-primary">{roles[index]}</p>
            <h2 className="mt-2 font-display text-4xl tracking-tight text-ink">{placeName(location, locale)}</h2>
            <p className="mt-4 text-lg">
              {location.street}
              <br />
              {location.cityLine}
            </p>
            <p className="mt-3 text-muted-foreground">{hoursLabel(location, locale)}</p>
            <p className="text-muted-foreground">{copy.locationsPage.sunday}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a className="font-medium text-primary" href={`tel:${location.phoneTel}`}>
                {copy.locationsPage.call} {location.phoneDisplay}
              </a>
              <a className="font-medium text-primary" href={location.mapsUrl} target="_blank" rel="noreferrer">
                {copy.locationsPage.maps}
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
