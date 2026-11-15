"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { chicagoTimeLabel, doorStatus, hoursCompact, locations, placeShort } from "@/lib/clinic";
import { getCopy } from "@/lib/ui-copy";

export function OpenNow({ inverted = true }: { inverted?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);
  const { locale } = useLocale();
  const copy = getCopy(locale);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      aria-live="polite"
      className={
        inverted
          ? "rounded-[1.75rem] bg-ink p-6 text-primary-foreground sm:p-7"
          : "rounded-[1.75rem] border border-border bg-card p-6 sm:p-7"
      }
    >
      <div className="flex items-end justify-between gap-4">
        <p className={inverted ? "text-sm text-foam" : "text-sm text-muted-foreground"}>
          {copy.open.time}
        </p>
        <p className="font-display text-xl tracking-tight">
          {now ? chicagoTimeLabel(now, locale) : copy.open.checking}
        </p>
      </div>
      <ul className="mt-5 space-y-3">
        {locations.map((location) => {
          const status = now ? doorStatus(location, undefined, locale) : null;
          return (
            <li
              key={location.id}
              className={
                inverted
                  ? "rounded-2xl bg-white/10 px-4 py-4"
                  : "rounded-2xl bg-sand/60 px-4 py-4"
              }
            >
              <p className="font-medium">{placeShort(location, locale)}</p>
              <p className={inverted ? "mt-1 text-sm text-primary-foreground/90" : "mt-1 text-sm text-muted-foreground"}>
                {hoursCompact(location, locale)}
              </p>
              <p
                className={
                  status?.open
                    ? inverted
                      ? "mt-1 text-sm font-medium text-foam"
                      : "mt-1 text-sm font-medium text-primary"
                    : inverted
                      ? "mt-1 text-sm font-medium text-primary-foreground"
                      : "mt-1 text-sm font-medium text-ink"
                }
              >
                {status?.label ?? "—"}
              </p>
              <a
                href={`tel:${location.phoneTel}`}
                className="mt-2 inline-block font-display text-2xl tracking-tight"
              >
                {location.phoneDisplay}
              </a>
            </li>
          );
        })}
      </ul>
      <p className={inverted ? "mt-4 text-xs text-primary-foreground/80" : "mt-4 text-xs text-muted-foreground"}>
        {copy.open.note}
      </p>
    </section>
  );
}
