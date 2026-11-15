"use client";

import { ClinicPhoto } from "@/components/clinic-photo";
import { ClinicQr } from "@/components/clinic-qr";
import { PrintButton } from "@/components/print-button";
import { useLocale } from "@/components/locale-provider";
import { formatClock, locations, practice } from "@/lib/clinic";
import { getCopy } from "@/lib/ui-copy";

const qrTarget = `${practice.website}/locations`;

const serviceTone = ["bg-foam", "bg-sand", "bg-lilac"] as const;

export function FlyerView() {
  const { locale } = useLocale();
  const copy = getCopy(locale).flyer;
  const chicago = locations[0];
  const hoffman = locations[1];

  return (
    <main id="content" className="px-5 py-10 print:p-0">
      <div className="site-chrome mx-auto mb-8 flex max-w-[8.5in] flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.kicker}</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-ink">{copy.title}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{copy.lede}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrintButton />
          <a href="/ultra-urgent-care-flyer.pdf" download className="inline-flex h-11 items-center rounded-full border border-border bg-card px-5 text-sm font-medium text-ink">
            {locale === "es" ? "Descargar el PDF" : "Download the PDF"}
          </a>
        </div>
      </div>

      <div className="flyer-stage mx-auto">
        <article className="flyer-sheet flex h-[11in] w-[8.5in] flex-col overflow-hidden bg-[#f6f0e4] text-ink">
          <header className="bg-primary px-[0.42in] pt-[0.32in] pb-[0.28in] text-primary-foreground">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-display text-[46px] leading-none tracking-tight">Ultra</p>
                <p className="mt-1 text-[11px] tracking-[0.16em] text-gold uppercase">{copy.brand}</p>
              </div>
              <p className="max-w-[2.4in] text-right text-[12px] leading-snug text-gold">
                {copy.community}
                <span className="mt-1 block text-white/85">{copy.communityEs}</span>
              </p>
            </div>
            <p className="mt-4 text-[11px] tracking-[0.18em] text-foam uppercase">
              {copy.walkKicker}
              <span className="text-white/70"> · {copy.walkKickerEs}</span>
            </p>
            <h2 className="mt-1 font-display text-[68px] leading-[0.82] tracking-tight">{copy.headline}</h2>
            <p className="font-display text-[42px] leading-none text-gold">{copy.headlineEs}</p>
          </header>

          <div className="grid grid-cols-2 gap-3 px-[0.38in] pt-3">
            <div className="flex items-center gap-3 rounded-[14px] bg-white p-2">
              <ClinicPhoto name="ahsan" alt={copy.lines[1][0]} priority className="h-[1.42in] w-[1.12in] shrink-0 object-contain" sizes="120px" />
              <div>
                <p className="text-[10px] tracking-[0.14em] text-clay uppercase">Pain · Dolor</p>
                <p className="mt-1 font-display text-[22px] leading-none tracking-tight">Dr. Ahsan</p>
                <p className="mt-1 text-[11px] leading-snug text-foreground/75">Call to schedule. Llame para una cita.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-[14px] bg-white p-2">
              <ClinicPhoto name="sidhu" alt={copy.lines[2][0]} priority className="h-[1.42in] w-[1.12in] shrink-0 object-contain" sizes="120px" />
              <div>
                <p className="text-[10px] tracking-[0.14em] text-primary uppercase">Psychiatry · Psiquiatría</p>
                <p className="mt-1 font-display text-[20px] leading-none tracking-tight">Virpal Sidhu</p>
                <p className="mt-1 text-[11px] leading-snug text-foreground/75">Psychiatry by video. Psiquiatría por video.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 px-[0.38in] pt-3">
            {[chicago, hoffman].map((location, index) => (
              <section key={location.id} className={`rounded-[14px] px-4 py-3 ${index === 0 ? "bg-foam" : "bg-gold"}`}>
                <p className="text-[11px] tracking-[0.14em] uppercase">{location.neighborhood}</p>
                <p className="mt-1 font-display text-[28px] leading-none tracking-tight">
                  {formatClock(location.openHour)}–{formatClock(location.closeHour)}
                </p>
                <p className="text-[12px] text-foreground/75">
                  {copy.days}
                  <span className="text-foreground/55"> · {copy.daysEs}</span>
                </p>
                <p className="mt-2 text-[12px] leading-snug">
                  {location.street}
                  <br />
                  {location.cityLine}
                </p>
                <p className="mt-1 font-display text-[30px] leading-none tracking-tight">{location.phoneDisplay}</p>
              </section>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 px-[0.38in] pt-3">
            {copy.lines.map(([enTitle, esTitle, enLine, esLine], index) => (
              <section key={enTitle} className={`rounded-[14px] px-3 py-3 ${serviceTone[index]}`}>
                <p className="font-display text-[18px] leading-none tracking-tight">{enTitle}</p>
                <p className="text-[12px] text-primary">{esTitle}</p>
                <p className="mt-2 text-[11px] leading-snug">{enLine}</p>
                <p className="mt-1 text-[11px] leading-snug text-foreground/75">{esLine}</p>
              </section>
            ))}
          </div>

          <div className="flex flex-1 flex-col justify-center px-[0.38in]">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Children and adults", "Niños y adultos", "Physicals and vaccines.", "Físicos y vacunas."],
              ["Testing on site", "Pruebas aquí", "Labs, rapid tests, and X-rays.", "Laboratorios, pruebas rápidas y rayos X."],
              ["Call first for pain", "Llame primero por dolor", "Psychiatry is by video.", "La psiquiatría es por video."],
            ].map(([en, es, enBody, esBody]) => (
              <section key={en} className="rounded-[14px] border border-primary/15 bg-white px-3 py-3">
                <p className="font-display text-[16px] leading-tight tracking-tight">{en}</p>
                <p className="text-[12px] text-primary">{es}</p>
                <p className="mt-1.5 text-[11px] leading-snug">{enBody}</p>
                <p className="text-[11px] leading-snug text-foreground/70">{esBody}</p>
              </section>
            ))}
          </div>
          </div>

          <footer className="grid grid-cols-[1fr_1.05in] items-end gap-3 bg-ink px-[0.38in] py-3 text-primary-foreground">
            <div className="text-[12px] leading-snug">
              <p>{copy.insurance}</p>
              <p className="text-white/75">{copy.insuranceEs}</p>
              <p className="mt-2 text-gold">{copy.er}</p>
              <p className="text-gold/90">{copy.erEs}</p>
              <p className="mt-2 font-display text-[16px] tracking-tight">{practice.websiteLabel}</p>
              <p className="text-[10px] text-white/65">{copy.scan} {copy.scanEs}</p>
            </div>
            <div className="justify-self-end rounded-md bg-white p-1">
              <ClinicQr value={qrTarget} label={copy.qr} className="size-[0.95in]" />
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
