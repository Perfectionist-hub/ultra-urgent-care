"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Locale } from "@/lib/clinic";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const storageKey = "ultra-locale";

function readInitial(): Locale {
  if (typeof window === "undefined") return "en";
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param === "es" || param === "en") return param;
  const stored = window.localStorage.getItem(storageKey);
  if (stored === "es" || stored === "en") return stored;
  return window.navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const next = readInitial();
    setLocaleState(next);
    document.documentElement.lang = next;
  }, []);

  function setLocale(next: Locale) {
    setLocaleState(next);
    window.localStorage.setItem(storageKey, next);
    document.documentElement.lang = next;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <div className={`flex rounded-full border border-border p-0.5 text-xs font-medium ${className}`} role="group" aria-label={locale === "es" ? "Idioma" : "Language"}>
      {(["en", "es"] as const).map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
          className={
            locale === code
              ? "rounded-full bg-primary px-2.5 py-1 text-primary-foreground"
              : "rounded-full px-2.5 py-1 text-muted-foreground"
          }
        >
          {code === "en" ? "EN" : "ES"}
        </button>
      ))}
    </div>
  );
}
