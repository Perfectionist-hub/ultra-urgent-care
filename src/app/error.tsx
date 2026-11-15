"use client";

import { useLocale } from "@/components/locale-provider";
import { locations } from "@/lib/clinic";
import { getCopy } from "@/lib/ui-copy";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const { locale } = useLocale();
  const copy = getCopy(locale).error;
  return (
    <main id="content" className="mx-auto max-w-xl px-5 py-20">
      <h1 className="font-display text-4xl tracking-tight text-ink">{copy.title}</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">{copy.body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="h-11 rounded-full bg-primary px-5 text-sm text-primary-foreground">
          {copy.retry}
        </button>
        {locations.map((location) => (
          <a key={location.id} href={`tel:${location.phoneTel}`} className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm">
            {location.phoneDisplay}
          </a>
        ))}
      </div>
    </main>
  );
}
