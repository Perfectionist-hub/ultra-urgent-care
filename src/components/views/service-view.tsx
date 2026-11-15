"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ClinicPhoto } from "@/components/clinic-photo";
import { useLocale } from "@/components/locale-provider";
import { servicePhoto, type PhotoName } from "@/lib/gallery";
import { getCopy } from "@/lib/ui-copy";

export function ServiceView({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const copy = getCopy(locale);
  const service = copy.services.find((item) => item.slug === slug) ?? copy.services[0];
  return (
    <main id="content" className="mx-auto max-w-6xl px-5 py-14">
      <figure className="mb-10 overflow-hidden rounded-[1.75rem] bg-foam ring-4 ring-foam">
        <ClinicPhoto
          name={servicePhoto[service.slug] ?? "exam"}
          alt={copy.gallery[(servicePhoto[service.slug] ?? "exam") as PhotoName]}
          priority
          className="h-64 w-full object-cover sm:h-80"
          sizes="(min-width: 1024px) 72rem, 100vw"
        />
      </figure>
      <p className="text-xs tracking-[0.18em] text-primary uppercase">{service.kicker}</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight text-ink">{service.name}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{service.summary}</p>
      <p className="mt-4 max-w-2xl leading-relaxed">{service.arrive}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/visit" className={buttonVariants({ className: "h-11 rounded-full px-5" })}>{copy.service.callback}</Link>
        <Link href="/locations" className={buttonVariants({ variant: "outline", className: "h-11 rounded-full px-5" })}>{copy.service.hours}</Link>
      </div>
      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-3xl tracking-tight text-ink">{copy.service.often}</h2>
          <ul className="mt-5 space-y-3">
            {service.goodFor.map((item) => (
              <li key={item} className="border-l-2 border-primary/30 pl-4 leading-relaxed">{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-3xl tracking-tight text-ink">{copy.service.expect}</h2>
          <ol className="mt-5 space-y-4">
            {service.expect.map((item, index) => (
              <li key={item} className="flex gap-4">
                <span className="font-display text-xl text-clay">{index + 1}</span>
                <span className="pt-1 leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <section className="mt-14 rounded-[1.6rem] bg-sand p-7 sm:p-8">
        <h2 className="font-display text-3xl tracking-tight text-ink">{copy.service.wrong}</h2>
        <ul className="mt-5 space-y-2">
          {service.notFor.map((item) => (
            <li key={item} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
