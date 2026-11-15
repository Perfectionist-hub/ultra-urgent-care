"use client";

import { useLocale } from "@/components/locale-provider";
import { getCopy } from "@/lib/ui-copy";

export function FaqList() {
  const { locale } = useLocale();
  const faqs = getCopy(locale).faqs;
  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map(([question, answer]) => (
        <details key={question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg font-medium text-ink">
            {question}
            <span className="mt-1 text-clay transition group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <p className="max-w-3xl pt-3 leading-relaxed text-muted-foreground">{answer}</p>
        </details>
      ))}
    </div>
  );
}
