"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/components/locale-provider";
import { locations, placeShort } from "@/lib/clinic";
import { getCopy } from "@/lib/ui-copy";
import { getPages } from "@/lib/pages-copy";

export function InsuranceView() {
  const { locale } = useLocale();
  const copy = getPages(locale).insurance;
  const bring = getCopy(locale).home.bringTitle;
  return (
    <main id="content" className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.kicker}</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight text-ink">{copy.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{copy.lede}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/book?visit=urgent" className={buttonVariants({ className: "h-11 rounded-full px-5" })}>
          {copy.book}
        </Link>
        <Link href="/#bring" className={buttonVariants({ variant: "outline", className: "h-11 rounded-full px-5" })}>
          {bring}
        </Link>
      </div>
      <ul className="mt-12 grid gap-4 md:grid-cols-2">
        {copy.points.map(([title, body], index) => (
          <li key={title} className={`rounded-[1.4rem] p-6 ${["bg-foam", "bg-sand", "bg-gold", "bg-lilac"][index]}`}>
            <h2 className="font-display text-2xl tracking-tight text-ink">{title}</h2>
            <p className="mt-2 leading-relaxed text-foreground/80">{body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {locations.map((location) => (
          <a key={location.id} href={`tel:${location.phoneTel}`} className="rounded-[1.4rem] border border-border bg-card px-5 py-5">
            <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">{copy.call}</p>
            <p className="mt-2 font-medium">{placeShort(location, locale)}</p>
            <p className="font-display text-3xl tracking-tight text-ink">{location.phoneDisplay}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
