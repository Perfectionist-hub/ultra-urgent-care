"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FaqList } from "@/components/faq-list";
import { OpenNow } from "@/components/open-now";
import { useLocale } from "@/components/locale-provider";
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

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-5">
          <ul>
            {copy.services.map((service, index) => (
              <li key={service.slug} className="border-b border-border last:border-b-0">
                <Link href={`/services/${service.slug}`} className="group grid gap-3 py-7 md:grid-cols-[6rem_1fr_auto] md:items-center md:gap-8">
                  <span className="font-display text-2xl text-clay">0{index + 1}</span>
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

      <section className="bg-ink text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs tracking-[0.18em] text-foam uppercase">{copy.home.peopleKicker}</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight">{copy.home.peopleTitle}</h2>
            <p className="mt-4 leading-relaxed text-white/70">{copy.home.peopleBody}</p>
          </div>
          <div className="grid gap-4">
            {copy.providers.map((provider) => (
              <article key={provider.id} className="rounded-[1.4rem] bg-white/10 p-6">
                <p className="text-sm text-foam">{provider.role}</p>
                <h3 className="mt-1 font-display text-3xl tracking-tight">{provider.name}</h3>
                <p className="mt-1 text-sm text-white/60">{provider.credentials}</p>
                <p className="mt-4 leading-relaxed text-white/80">{provider.focus}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-14">
          <Link href="/providers" className="text-sm text-foam">{copy.home.providerLink}</Link>
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
