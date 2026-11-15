"use client";

import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocale } from "@/components/locale-provider";
import { locations, placeName, practice, type LocationId } from "@/lib/clinic";
import { getCopy } from "@/lib/ui-copy";

const fieldClass = "h-11 bg-card md:text-base";

export function VisitForm() {
  const { locale } = useLocale();
  const copy = getCopy(locale).visit;
  const english = getCopy("en").visit;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [locationId, setLocationId] = useState<LocationId>(locations[1].id);
  const [reasonIndex, setReasonIndex] = useState(0);
  const [when, setWhen] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const location = locations.find((item) => item.id === locationId) ?? locations[0];
  const reason = copy.reasons[reasonIndex] ?? copy.reasons[0];
  const reasonEn = english.reasons[reasonIndex] ?? english.reasons[0];
  const whenText = when.trim() || copy.whenDefault;

  const mailto = useMemo(() => {
    const body = [
      `${copy.mailName} / ${english.mailName}: ${name}`,
      `${copy.mailPhone} / ${english.mailPhone}: ${phone}`,
      `${copy.mailClinic} / ${english.mailClinic}: ${placeName(location, "en")} / ${placeName(location, "es")}`,
      `${copy.mailRequest} / ${english.mailRequest}: ${reason} / ${reasonEn}`,
      `${copy.mailWhen} / ${english.mailWhen}: ${whenText}`,
      note.trim() ? `${copy.mailNote} / ${english.mailNote}: ${note.trim()}` : "",
      "",
      copy.mailFooter,
      english.mailFooter,
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${practice.email}?subject=${encodeURIComponent(`Callback request — ${location.shortName}`)}&body=${encodeURIComponent(body)}`;
  }, [copy, english, location, name, note, phone, reason, reasonEn, whenText]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) {
      setError(copy.nameError);
      return;
    }
    if (digits.length < 10) {
      setError(copy.phoneError);
      return;
    }
    setError("");
    setReady(true);
  }

  if (ready) {
    return (
      <div className="rounded-[1.5rem] border border-border bg-card p-6 sm:p-8">
        <p className="text-xs tracking-[0.16em] text-primary uppercase">{copy.readyKicker}</p>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-ink">{copy.readyTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.readyBody}</p>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between gap-4 border-b border-border py-2">
            <dt className="text-muted-foreground">{copy.askFor}</dt>
            <dd>{name}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-border py-2">
            <dt className="text-muted-foreground">{copy.callBack}</dt>
            <dd>{phone}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-border py-2">
            <dt className="text-muted-foreground">{copy.clinic}</dt>
            <dd className="text-right">{placeName(location, locale)}</dd>
          </div>
          <div className="flex justify-between gap-4 py-2">
            <dt className="text-muted-foreground">{copy.aboutLabel}</dt>
            <dd className="text-right">{reason}</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={`tel:${location.phoneTel}`} className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground">
            {copy.callNow} {location.phoneDisplay}
          </a>
          <a href={mailto} className="inline-flex h-12 items-center justify-center rounded-full border border-border px-5 text-sm font-medium">
            {copy.email}
          </a>
        </div>
        <button type="button" className="mt-4 text-sm text-muted-foreground underline-offset-4 hover:underline" onClick={() => setReady(false)}>
          {copy.edit}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[1.5rem] border border-border bg-card p-6 sm:p-8" noValidate>
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="visit-name">{copy.name}</Label>
          <Input id="visit-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className={fieldClass} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="visit-phone">{copy.phone}</Label>
          <Input id="visit-phone" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" className={fieldClass} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="visit-location">{copy.clinic}</Label>
          <select id="visit-location" value={locationId} onChange={(event) => setLocationId(event.target.value as LocationId)} className="h-11 rounded-lg border border-input bg-card px-3 text-base">
            {locations.map((item) => (
              <option key={item.id} value={item.id}>
                {placeName(item, locale)} · {item.phoneDisplay}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="visit-reason">{copy.about}</Label>
          <select id="visit-reason" value={reasonIndex} onChange={(event) => setReasonIndex(Number(event.target.value))} className="h-11 rounded-lg border border-input bg-card px-3 text-base">
            {copy.reasons.map((item, index) => (
              <option key={item} value={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="visit-when">{copy.when}</Label>
          <Input id="visit-when" value={when} onChange={(event) => setWhen(event.target.value)} placeholder={copy.whenDefault} className={fieldClass} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="visit-note">{copy.note}</Label>
          <Textarea id="visit-note" value={note} onChange={(event) => setNote(event.target.value)} maxLength={280} placeholder={copy.notePlaceholder} className="min-h-24 bg-card md:text-base" />
          <p className="text-xs leading-relaxed text-muted-foreground">{copy.noteHelp}</p>
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" className="h-12 rounded-full px-6 text-base">
          {copy.submit}
        </Button>
      </div>
    </form>
  );
}
