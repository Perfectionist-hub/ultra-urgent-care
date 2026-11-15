"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { getCopy } from "@/lib/ui-copy";

export function ServicesView() {
  const { locale } = useLocale();
  const copy = getCopy(locale);
  return (
    <main id="content" className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.servicesPage.kicker}</p>
      <h1 className="mt-3 max-w-2xl font-display text-5xl tracking-tight text-ink">{copy.servicesPage.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{copy.servicesPage.lede}</p>
      <div className="mt-12 space-y-6">
        {copy.services.map((service) => (
          <article key={service.slug} className="grid gap-6 rounded-[1.6rem] border border-border bg-card p-6 sm:p-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-xs tracking-[0.16em] text-clay uppercase">{service.kicker}</p>
              <h2 className="mt-2 font-display text-4xl tracking-tight text-ink">{service.name}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{service.summary}</p>
              <Link href={`/services/${service.slug}`} className="mt-5 inline-block text-sm text-primary">
                {copy.servicesPage.more}
              </Link>
            </div>
            <ul className="space-y-2 text-sm leading-relaxed">
              {service.goodFor.slice(0, 5).map((item) => (
                <li key={item} className="rounded-xl bg-sand/70 px-4 py-3">{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
