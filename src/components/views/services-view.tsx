"use client";

import Link from "next/link";
import { ClinicPhoto } from "@/components/clinic-photo";
import { useLocale } from "@/components/locale-provider";
import { servicePhoto, type PhotoName } from "@/lib/gallery";
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
          <article key={service.slug} className={`grid gap-6 overflow-hidden rounded-[1.6rem] border border-border bg-card lg:grid-cols-[16rem_1fr_1fr] ${["ring-foam", "ring-sand", "ring-lilac"][["urgent-care", "pain-management", "psychiatry"].indexOf(service.slug)] ?? ""}`}>
            <ClinicPhoto
              name={servicePhoto[service.slug] ?? "exam"}
              alt={copy.gallery[(servicePhoto[service.slug] ?? "exam") as PhotoName]}
              className="h-52 w-full object-cover lg:h-full"
              sizes="(min-width: 1024px) 16rem, 100vw"
            />
            <div className="px-6 pt-6 sm:px-8 lg:px-0 lg:py-8">
              <p className="text-xs tracking-[0.16em] text-clay uppercase">{service.kicker}</p>
              <h2 className="mt-2 font-display text-4xl tracking-tight text-ink">{service.name}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{service.summary}</p>
              <Link href={`/services/${service.slug}`} className="mt-5 inline-block text-sm text-primary">
                {copy.servicesPage.more}
              </Link>
            </div>
            <ul className="space-y-2 px-6 pb-6 text-sm leading-relaxed sm:px-8 lg:py-8 lg:pr-8 lg:pl-0">
              {service.goodFor.slice(0, 5).map((item) => (
                <li key={item} className={`rounded-xl px-4 py-3 ${service.slug === "psychiatry" ? "bg-lilac" : service.slug === "urgent-care" ? "bg-foam" : "bg-sand"}`}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
