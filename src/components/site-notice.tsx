"use client";

import { useLocale } from "@/components/locale-provider";
import { getCopy } from "@/lib/ui-copy";

export function SiteNotice() {
  const { locale } = useLocale();
  const copy = getCopy(locale);
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {copy.skip}
      </a>
      <div className="site-chrome border-b border-clay/30 bg-clay/10">
        <p className="mx-auto max-w-6xl px-5 py-2 text-center text-sm text-ink">{copy.banner}</p>
      </div>
    </>
  );
}
