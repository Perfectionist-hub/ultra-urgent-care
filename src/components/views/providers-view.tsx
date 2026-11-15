"use client";

import Link from "next/link";
import { ClinicPhoto } from "@/components/clinic-photo";
import { useLocale } from "@/components/locale-provider";
import { getCopy } from "@/lib/ui-copy";

export function ProvidersView() {
  const { locale } = useLocale();
  const copy = getCopy(locale);
  return (
    <main id="content" className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.providersPage.kicker}</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight text-ink">{copy.providersPage.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{copy.providersPage.lede}</p>
      <div className="mt-12 space-y-8">
        {copy.providers.map((provider) => (
          <article key={provider.id} className="grid gap-6 overflow-hidden rounded-[1.75rem] border border-border bg-card lg:grid-cols-[18rem_1fr]">
            <figure className={provider.id === "sidhu" ? "bg-lilac" : "bg-sand"}>
              <ClinicPhoto
                name={provider.id === "sidhu" ? "sidhu" : "ahsan"}
                alt={provider.id === "sidhu" ? copy.gallery.sidhu : copy.gallery.ahsan}
                className="h-80 w-full object-cover object-top lg:h-full"
                sizes="(min-width: 1024px) 18rem, 100vw"
              />
            </figure>
            <div className="px-6 py-6 sm:px-8">
              <h2 className="font-display text-3xl tracking-tight text-ink">{provider.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{provider.credentials}</p>
              <p className="mt-3 text-sm text-primary">{provider.role}</p>
              <p className="mt-5 text-lg leading-relaxed">{provider.bio}</p>
              <p className="mt-4 text-muted-foreground">{provider.focus}</p>
              <Link href={provider.id === "ahsan" ? "/services/pain-management" : "/services/psychiatry"} className="mt-5 inline-block text-sm text-primary">
                {copy.providersPage.book}
              </Link>
            </div>
          </article>
        ))}
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{copy.providersPage.note}</p>
    </main>
  );
}
