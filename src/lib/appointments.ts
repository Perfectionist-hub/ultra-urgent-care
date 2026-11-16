import { chicagoClock, type Location, type LocationId } from "./clinic";

export const appointmentKinds = [
  { id: "urgent", service: "urgent-care" },
  { id: "physical", service: "urgent-care" },
  { id: "vaccine", service: "urgent-care" },
  { id: "pain", service: "pain-management" },
  { id: "psychiatry", service: "psychiatry" },
] as const;

export type AppointmentKindId = (typeof appointmentKinds)[number]["id"];

export function isAppointmentKind(value: string | undefined): value is AppointmentKindId {
  return appointmentKinds.some((kind) => kind.id === value);
}

export function chicagoDateISO(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function weekdayOfISO(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])).getDay();
}

export function timeChoices(location: Location) {
  const choices: { value: string; minutes: number }[] = [];
  for (let minutes = location.openHour * 60; minutes + 30 <= location.closeHour * 60; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    choices.push({
      value: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
      minutes,
    });
  }
  return choices;
}

export function slotHasPassed(iso: string, value: string) {
  if (iso !== chicagoDateISO()) return false;
  const [hour, minute] = value.split(":").map(Number);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return true;
  const clock = chicagoClock();
  return hour * 60 + minute <= clock.hour * 60 + clock.minute;
}

export function locationFromQuery(value: string | undefined): LocationId {
  return value === "chicago" || value === "hoffman" ? value : "hoffman";
}

export const concernGroups = [
  {
    id: "illness",
    tone: "bg-foam",
    items: [
      { id: "cold", visit: "urgent", en: "Cold, flu, and fever", es: "Gripe, resfriado y fiebre" },
      { id: "sinus", visit: "urgent", en: "Sinus trouble and allergies", es: "Sinusitis y alergias" },
      { id: "strep", visit: "urgent", en: "Sore throat and strep", es: "Dolor de garganta y estreptococo" },
      { id: "stomach", visit: "urgent", en: "Stomach bug", es: "Malestar estomacal" },
    ],
  },
  {
    id: "injury",
    tone: "bg-sand",
    items: [
      { id: "sprain", visit: "urgent", en: "Sprain or sports injury", es: "Esguince o lesión deportiva" },
      { id: "cut", visit: "urgent", en: "Cut, burn, or wound", es: "Corte, quemadura o herida" },
      { id: "xray", visit: "urgent", en: "X-ray for a minor injury", es: "Rayos X por una lesión leve" },
    ],
  },
  {
    id: "testing",
    tone: "bg-gold",
    items: [
      { id: "labs", visit: "urgent", en: "Labs and rapid tests", es: "Laboratorio y pruebas rápidas" },
      { id: "physical", visit: "physical", en: "School, work, or sports physical", es: "Examen físico escolar, laboral o deportivo" },
      { id: "vaccine", visit: "vaccine", en: "Vaccinations", es: "Vacunas" },
      { id: "child", visit: "urgent", en: "A sick child", es: "Un niño enfermo" },
    ],
  },
  {
    id: "ongoing",
    tone: "bg-lilac",
    items: [
      { id: "chronic", visit: "urgent", en: "Diabetes, asthma, or blood pressure", es: "Diabetes, asma o presión arterial" },
      { id: "back", visit: "pain", en: "Back or neck pain", es: "Dolor de espalda o cuello" },
      { id: "joint", visit: "pain", en: "Joint or nerve pain", es: "Dolor de articulaciones o nervios" },
    ],
  },
  {
    id: "video",
    tone: "bg-foam",
    items: [
      { id: "anxiety", visit: "psychiatry", en: "Anxiety or depression", es: "Ansiedad o depresión" },
      { id: "adhd", visit: "psychiatry", en: "ADHD evaluation", es: "Evaluación de TDAH" },
      { id: "meds", visit: "psychiatry", en: "Medication follow-up by video", es: "Seguimiento de medicamentos por video" },
    ],
  },
] as const;

export type Concern = (typeof concernGroups)[number]["items"][number];
export type ConcernId = Concern["id"];

export function concernById(id: string | undefined): Concern | undefined {
  for (const group of concernGroups) {
    const item = group.items.find((entry) => entry.id === id);
    if (item) return item;
  }
  return undefined;
}

export const concernList: Concern[] = concernGroups.flatMap((group) => [...group.items]);
