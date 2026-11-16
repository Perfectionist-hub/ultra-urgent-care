"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocale } from "@/components/locale-provider";
import {
  chicagoDateISO,
  concernById,
  isAppointmentKind,
  locationFromQuery,
  slotHasPassed,
  timeChoices,
  weekdayOfISO,
  type AppointmentKindId,
} from "@/lib/appointments";
import { formatClock, locationById, placeName, practice, type LocationId } from "@/lib/clinic";
import { getPages } from "@/lib/pages-copy";

const fieldClass = "h-11 bg-card md:text-base";

export function BookForm({
  initialVisit,
  initialLocation,
  initialConcern,
}: {
  initialVisit?: string;
  initialLocation?: string;
  initialConcern?: string;
}) {
  const { locale } = useLocale();
  const copy = getPages(locale).book;
  const english = getPages("en").book;
  const concern = concernById(initialConcern);
  const [kind, setKind] = useState<AppointmentKindId>(isAppointmentKind(initialVisit) ? initialVisit : concern && isAppointmentKind(concern.visit) ? concern.visit : "urgent");
  const [locationId, setLocationId] = useState<LocationId>(locationFromQuery(initialLocation));
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [who, setWho] = useState<"self" | "child">("self");
  const [history, setHistory] = useState<"new" | "returning">("new");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const location = locationById(locationId);
  const slots = timeChoices(location);
  const kindCopy = copy.kinds[kind];
  const kindEn = english.kinds[kind];
  const concernLabel = concern ? (locale === "es" ? concern.es : concern.en) : "";
  const today = chicagoDateISO();

  const whenLabel = useMemo(() => {
    if (!date || !time) return "";
    const [hour, minute] = time.split(":").map(Number);
    return `${date} · ${formatClock(hour, minute, locale)}`;
  }, [date, locale, time]);

  const mailto = useMemo(() => {
    const [hour, minute] = (time || "00:00").split(":").map(Number);
    const whenEn = date ? `${date} · ${formatClock(hour, minute, "en")}` : "";
    const whenEs = date ? `${date} · ${formatClock(hour, minute, "es")}` : "";
    const whoEn = who === "child" ? english.child : english.self;
    const whoEs = who === "child" ? copy.child : copy.self;
    const historyEn = history === "returning" ? english.returning : english.newPatient;
    const historyEs = history === "returning" ? copy.returning : copy.newPatient;
    const body = [
      `${copy.mailKind} / ${english.mailKind}: ${kindCopy.name} / ${kindEn.name}`,
      concern ? `${copy.mailConcern} / ${english.mailConcern}: ${concern.es} / ${concern.en}` : "",
      `${copy.mailWhen} / ${english.mailWhen}: ${whenEs} / ${whenEn}`,
      `${english.clinic}: ${placeName(location, "en")} / ${placeName(location, "es")}`,
      `${copy.name} / ${english.name}: ${name}`,
      `${copy.phone} / ${english.phone}: ${phone}`,
      `${copy.mailWho} / ${english.mailWho}: ${whoEs} / ${whoEn}`,
      `${copy.mailHistory} / ${english.mailHistory}: ${historyEs} / ${historyEn}`,
      note.trim() ? `${copy.note} / ${english.note}: ${note.trim()}` : "",
      "",
      copy.mailFooter,
      english.mailFooter,
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${practice.email}?subject=${encodeURIComponent(`Appointment request — ${location.shortName} — ${kindEn.name}`)}&body=${encodeURIComponent(body)}`;
  }, [concern, copy, date, english, history, kindCopy.name, kindEn.name, location, name, note, phone, time, who]);

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
    const weekday = weekdayOfISO(date);
    if (!date || weekday === null || weekday === 0 || date < today) {
      setError(weekday === 0 ? copy.sunday : copy.dateError);
      return;
    }
    if (!time || !slots.some((slot) => slot.value === time)) {
      setError(copy.timeError);
      return;
    }
    if (slotHasPassed(date, time)) {
      setError(copy.past);
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
          <Row label={copy.summaryKind} value={kindCopy.name} />
          <Row label={copy.clinic} value={placeName(location, locale)} />
          <Row label={copy.summaryWhen} value={whenLabel} />
          <Row label={copy.name} value={name} />
          <Row label={copy.phone} value={phone} />
          <Row label={copy.summaryWho} value={who === "child" ? copy.child : copy.self} />
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
      {concern ? (
        <p className="mb-5 rounded-2xl bg-foam px-4 py-3 text-sm text-ink">
          {copy.started}: {concernLabel}
        </p>
      ) : null}
      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium">{copy.kind}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(copy.kinds) as AppointmentKindId[]).map((id) => {
            const item = copy.kinds[id];
            const selected = kind === id;
            return (
              <label key={id} className={`cursor-pointer rounded-2xl border px-4 py-3 ${selected ? "border-primary bg-foam" : "border-border bg-background"}`}>
                <input className="sr-only" type="radio" name="kind" value={id} checked={selected} onChange={() => setKind(id)} />
                <span className="block font-medium text-ink">{item.name}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.note}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="mt-5 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="book-location">{copy.clinic}</Label>
          <select
            id="book-location"
            value={locationId}
            onChange={(event) => {
              const next = event.target.value as LocationId;
              setLocationId(next);
              setTime("");
            }}
            className="h-11 rounded-lg border border-input bg-card px-3 text-base"
          >
            {(["hoffman", "chicago"] as LocationId[]).map((id) => {
              const item = locationById(id);
              return (
                <option key={id} value={id}>
                  {placeName(item, locale)} · {item.phoneDisplay}
                </option>
              );
            })}
          </select>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="book-date">{copy.date}</Label>
            <Input id="book-date" type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} className={fieldClass} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="book-time">{copy.time}</Label>
            <select id="book-time" value={time} onChange={(event) => setTime(event.target.value)} className="h-11 rounded-lg border border-input bg-card px-3 text-base" required>
              <option value="">{copy.time}</option>
              {slots.map((slot) => {
                const [hour, minute] = slot.value.split(":").map(Number);
                return (
                  <option key={slot.value} value={slot.value}>
                    {formatClock(hour, minute, locale)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="book-name">{copy.name}</Label>
            <Input id="book-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className={fieldClass} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="book-phone">{copy.phone}</Label>
            <Input id="book-phone" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" className={fieldClass} required />
          </div>
        </div>
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">{copy.who}</legend>
          <div className="flex flex-wrap gap-2">
            <Choice pressed={who === "self"} onClick={() => setWho("self")}>{copy.self}</Choice>
            <Choice pressed={who === "child"} onClick={() => setWho("child")}>{copy.child}</Choice>
          </div>
        </fieldset>
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">{copy.been}</legend>
          <div className="flex flex-wrap gap-2">
            <Choice pressed={history === "new"} onClick={() => setHistory("new")}>{copy.newPatient}</Choice>
            <Choice pressed={history === "returning"} onClick={() => setHistory("returning")}>{copy.returning}</Choice>
          </div>
        </fieldset>
        <div className="grid gap-2">
          <Label htmlFor="book-note">{copy.note}</Label>
          <Textarea id="book-note" value={note} onChange={(event) => setNote(event.target.value)} maxLength={280} placeholder={copy.notePlaceholder} className="min-h-24 bg-card md:text-base" />
          <p className="text-xs leading-relaxed text-muted-foreground">{copy.noteHelp}</p>
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" className="h-12 rounded-full px-6 text-base">
          {copy.submit}
        </Button>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {copy.walkIn}{" "}
          <Link href="/visit" className="text-primary">
            {copy.callback}
          </Link>
        </p>
      </div>
    </form>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border py-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}

function Choice({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: string }) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} className={`h-11 rounded-full px-4 text-sm ${pressed ? "bg-primary text-primary-foreground" : "border border-border bg-background"}`}>
      {children}
    </button>
  );
}
