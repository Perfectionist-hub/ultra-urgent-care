"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ClinicPhoto } from "@/components/clinic-photo";
import { FaqList } from "@/components/faq-list";
import { OpenNow } from "@/components/open-now";
import { useLocale } from "@/components/locale-provider";
import { servicePhoto, type PhotoName } from "@/lib/gallery";
import { getCopy } from "@/lib/ui-copy";

export function HomeView() {
  const { locale } = useLocale();
  const copy = getCopy(locale);
  return (
    <main id="content">
      <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 pt-8 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:pt-16">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">{copy.home.eyebrow}</p>
          <h1 className="mt-4 max-w-xl font-display text-5xl leading-[0.96] tracking-tight text-ink sm:text-7xl">{copy.home.title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">{copy.home.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/visit" className={buttonVariants({ className: "h-12 rounded-full px-6 text-base" })}>
              {copy.home.callback}
            </Link>
            <Link href="/locations" className={buttonVariants({ variant: "outline", className: "h-12 rounded-full px-6 text-base" })}>
              {copy.home.hours}
            </Link>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <OpenNow />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="grid gap-4 md:grid-cols-12">
          <figure className="overflow-hidden rounded-[1.75rem] bg-foam ring-4 ring-foam md:col-span-7">
            <ClinicPhoto name="waiting" alt={copy.gallery.waiting} priority className="h-72 w-full object-cover sm:h-[26rem]" sizes="(min-width: 768px) 58vw, 100vw" />
          </figure>
          <div className="grid gap-4 md:col-span-5">
            <figure className="overflow-hidden rounded-[1.5rem] bg-sand ring-4 ring-sand">
              <ClinicPhoto name="exam" alt={copy.gallery.exam} className="h-44 w-full object-cover sm:h-52" sizes="(min-width: 768px) 36vw, 100vw" />
            </figure>
            <figure className="overflow-hidden rounded-[1.5rem] bg-gold ring-4 ring-gold">
              <ClinicPhoto name="evening" alt={copy.gallery.evening} className="h-44 w-full object-cover sm:h-52" sizes="(min-width: 768px) 36vw, 100vw" />
            </figure>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground">{copy.gallery.note}</p>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-5">
          <ul>
            {copy.services.map((service, index) => (
              <li key={service.slug} className="border-b border-border last:border-b-0">
                <Link href={`/services/${service.slug}`} className="group grid gap-4 py-5 md:grid-cols-[7.5rem_1fr_auto] md:items-center md:gap-8">
                  <span className={`overflow-hidden rounded-2xl ${["bg-foam", "bg-sand", "bg-lilac"][index] ?? "bg-foam"}`}>
                    <ClinicPhoto
                      name={servicePhoto[service.slug] ?? "exam"}
                      alt={copy.gallery[(servicePhoto[service.slug] ?? "exam") as PhotoName]}
                      className="h-24 w-full object-cover"
                      sizes="120px"
                    />
                  </span>
                  <span>
                    <span className="block font-display text-3xl tracking-tight text-ink group-hover:text-primary">{service.name}</span>
                    <span className="mt-1 block text-muted-foreground">{service.promise}</span>
                  </span>
                  <span className="text-sm tracking-[0.14em] text-primary uppercase">{service.kicker}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-2">
        <div>
          <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.home.comeKicker}</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-ink">{copy.home.comeTitle}</h2>
          <ul className="mt-6 space-y-3 text-foreground/85">
            {copy.services[0].goodFor.slice(0, 6).map((item) => (
              <li key={item} className="border-l-2 border-primary/40 pl-4 leading-relaxed">{item}</li>
            ))}
          </ul>
          <Link href="/services/urgent-care" className="mt-6 inline-block text-sm text-primary">{copy.home.fullList}</Link>
        </div>
        <div className="rounded-[1.75rem] bg-sand p-7 sm:p-8">
          <p className="text-xs tracking-[0.18em] text-clay uppercase">{copy.home.erKicker}</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-ink">{copy.home.erTitle}</h2>
          <ul className="mt-6 space-y-3">
            {copy.er.map((item) => (
              <li key={item} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs tracking-[0.18em] text-gold uppercase">{copy.home.peopleKicker}</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight">{copy.home.peopleTitle}</h2>
            <p className="mt-4 leading-relaxed text-white/80">{copy.home.peopleBody}</p>
            <Link href="/providers" className="mt-6 inline-block text-sm text-gold">{copy.home.providerLink}</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.providers.map((provider) => (
              <article key={provider.id} className="overflow-hidden rounded-[1.4rem] bg-card text-ink">
                <ClinicPhoto
                  name={provider.id === "sidhu" ? "sidhu" : "ahsan"}
                  alt={provider.id === "sidhu" ? copy.gallery.sidhu : copy.gallery.ahsan}
                  className="h-64 w-full object-cover object-top"
                  sizes="(min-width: 640px) 24vw, 100vw"
                />
                <div className="p-5">
                  <p className="text-sm text-primary">{provider.role}</p>
                  <h3 className="mt-1 font-display text-2xl tracking-tight">{provider.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{provider.credentials}</p>
                  <p className="mt-3 text-sm leading-relaxed">{provider.focus}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.home.bringKicker}</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-ink">{copy.home.bringTitle}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{copy.home.bringBody}</p>
          </div>
          <ol className="space-y-0">
            {copy.bring.map((item, index) => (
              <li key={item} className="flex gap-4 border-t border-border py-4">
                <span className="font-display text-xl text-clay">0{index + 1}</span>
                <span className="pt-1">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="font-display text-4xl tracking-tight text-ink">{copy.home.faqTitle}</h2>
        <div className="mt-8">
          <FaqList />
        </div>
      </section>
    </main>
  );
}
