"use client";

import { ClinicQr } from "@/components/clinic-qr";
import { PrintButton } from "@/components/print-button";
import { useLocale } from "@/components/locale-provider";
import { formatClock, locations, practice } from "@/lib/clinic";
import { getCopy } from "@/lib/ui-copy";

const qrTarget = `${practice.website}/locations`;

export function FlyerView() {
  const { locale } = useLocale();
  const copy = getCopy(locale).flyer;
  return (
    <main id="content" className="px-5 py-12">
      <div className="site-chrome mx-auto mb-8 flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.kicker}</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-ink">{copy.title}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{copy.lede}</p>
        </div>
        <PrintButton />
      </div>

      <article className="flyer-sheet mx-auto w-full max-w-[8.5in] overflow-hidden rounded-[1.2rem] border border-border bg-white text-ink print:rounded-none">
        <header className="flex items-center justify-between gap-4 bg-ink px-6 py-4 text-primary-foreground">
          <div>
            <p className="font-display text-2xl leading-none tracking-tight">Ultra</p>
            <p className="mt-1 text-[10px] tracking-[0.14em] text-foam uppercase">{copy.brand}</p>
          </div>
          <div className="max-w-[14rem] text-right text-[11px] leading-snug text-foam">
            <p>{copy.community}</p>
            <p className="mt-1">{copy.communityEs}</p>
          </div>
        </header>
        <div className="px-6 pt-6 pb-5">
          <p className="text-[11px] tracking-[0.16em] text-clay uppercase">{copy.walkKicker}</p>
          <p className="text-[11px] tracking-[0.16em] text-clay/80 uppercase">{copy.walkKickerEs}</p>
          <h2 className="mt-2 font-display text-5xl leading-[0.9] tracking-tight">{copy.headline}</h2>
          <p className="font-display text-4xl leading-none tracking-tight text-primary">{copy.headlineEs}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed">{copy.sub}</p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-foreground/75">{copy.subEs}</p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 print:grid-cols-2">
            {locations.map((location) => (
              <section key={location.id} className="rounded-2xl bg-sand px-4 py-3">
                <p className="text-[11px] tracking-[0.14em] text-primary uppercase">{location.neighborhood}</p>
                <p className="mt-1 font-display text-2xl leading-tight tracking-tight">
                  {copy.days} · {formatClock(location.openHour)}–{formatClock(location.closeHour)}
                </p>
                <p className="text-sm text-foreground/75">
                  {copy.daysEs} · {formatClock(location.openHour, 0, "es")}–{formatClock(location.closeHour, 0, "es")}
                </p>
                <p className="mt-2 text-xs leading-snug">
                  {location.street}
                  <br />
                  {location.cityLine}
                </p>
                <p className="mt-2 font-display text-3xl tracking-tight">{location.phoneDisplay}</p>
              </section>
            ))}
          </div>

          <div className="mt-4 divide-y divide-border border-y border-border">
            {copy.lines.map(([enTitle, esTitle, enLine, esLine]) => (
              <div key={enTitle} className="grid gap-1 py-2.5 sm:grid-cols-[9.5rem_1fr] print:grid-cols-[9.5rem_1fr]">
                <p className="font-medium leading-tight">
                  {enTitle}
                  <span className="block text-sm font-normal text-primary">{esTitle}</span>
                </p>
                <p className="text-sm leading-snug text-foreground/80">
                  {enLine}
                  <span className="mt-0.5 block">{esLine}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-end justify-between gap-4">
            <div className="text-sm leading-snug">
              <p>{copy.insurance}</p>
              <p>{copy.insuranceEs}</p>
              <p className="mt-2">{copy.er}</p>
              <p>{copy.erEs}</p>
              <p className="mt-3 font-display text-lg tracking-tight">{practice.websiteLabel}</p>
              <p className="text-xs text-muted-foreground">{copy.scan}</p>
              <p className="text-xs text-muted-foreground">{copy.scanEs}</p>
            </div>
            <ClinicQr value={qrTarget} label={copy.qr} />
          </div>
        </div>
      </article>
    </main>
  );
}
