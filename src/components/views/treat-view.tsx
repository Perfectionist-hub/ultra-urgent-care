"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/components/locale-provider";
import { concernGroups } from "@/lib/appointments";
import { getPages } from "@/lib/pages-copy";

export function TreatView() {
  const { locale } = useLocale();
  const copy = getPages(locale).treat;
  return (
    <main id="content" className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.kicker}</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight text-ink">{copy.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{copy.lede}</p>
      <div className="mt-8">
        <Link href="/book" className={buttonVariants({ className: "h-11 rounded-full px-5" })}>
          {copy.book}
        </Link>
      </div>
      <div className="mt-12 space-y-10">
        {concernGroups.map((group) => {
          const service = copy.services[group.id];
          return (
            <section key={group.id} id={group.id}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-3xl tracking-tight text-ink">{copy.groups[group.id]}</h2>
                <Link href={`/services/${service}`} className="text-sm text-primary">
                  {copy.how}
                </Link>
              </div>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <li key={item.id} id={item.id}>
                    <Link href={`/book?visit=${item.visit}&concern=${item.id}`} className={`flex h-full flex-col justify-between rounded-[1.3rem] p-5 ${group.tone}`}>
                      <span className="font-display text-2xl tracking-tight text-ink">{locale === "es" ? item.es : item.en}</span>
                      <span className="mt-4 text-sm text-primary">{copy.book}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <p className="mt-12 max-w-2xl rounded-[1.4rem] bg-sand px-5 py-4 text-sm leading-relaxed">
        <Link href="/locations" className="font-medium text-primary">
          {copy.er}
        </Link>
      </p>
    </main>
  );
}
