export const practice = {
  name: "Ultra Urgent Care & Pain Management",
  legalName: "Ultra Urgent and Pain Management Centers",
  email: "Ultraurgentpain@gmail.com",
  website: "https://ultraurgentpainmanagement.com",
  websiteLabel: "ultraurgentpainmanagement.com",
} as const;

export type LocationId = "chicago" | "hoffman";

export type Location = {
  id: LocationId;
  name: string;
  shortName: string;
  neighborhood: string;
  street: string;
  cityLine: string;
  phoneDisplay: string;
  phoneTel: string;
  hoursLabel: string;
  openDays: number[];
  openHour: number;
  closeHour: number;
  mapsUrl: string;
  reviewsUrl: string;
  role: string;
};

export const locations: Location[] = [
  {
    id: "chicago",
    name: "Chicago — 95th Street",
    shortName: "95th Street",
    neighborhood: "Chicago",
    street: "1925 E 95th St",
    cityLine: "Chicago, IL 60617",
    phoneDisplay: "312-998-6900",
    phoneTel: "+13129986900",
    hoursLabel: "Monday–Saturday, 12:00 PM–6:00 PM",
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 12,
    closeHour: 18,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=1925+E+95th+St+Chicago+IL+60617",
    reviewsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ultra+Urgent+Care+Pain+Management+1925+E+95th+St+Chicago+IL+60617",
    role: "Midday urgent care on the South Side.",
  },
  {
    id: "hoffman",
    name: "Hoffman Estates",
    shortName: "Hoffman Estates",
    neighborhood: "Hoffman Estates",
    street: "136 W Higgins Road",
    cityLine: "Hoffman Estates, IL 60169",
    phoneDisplay: "773-563-6400",
    phoneTel: "+17735636400",
    hoursLabel: "Monday–Saturday, 2:00 PM–10:00 PM",
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 14,
    closeHour: 22,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=136+W+Higgins+Road+Hoffman+Estates+IL+60169",
    reviewsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ultra+Urgent+Care+Pain+Management+136+W+Higgins+Road+Hoffman+Estates+IL+60169",
    role: "Evening hours for the northwest suburbs.",
  },
];

export const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type ChicagoClock = {
  weekday: number;
  hour: number;
  minute: number;
};

export function chicagoClock(date = new Date()): ChicagoClock {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return {
    weekday: weekdayMap[get("weekday")] ?? 0,
    hour: Number(get("hour")),
    minute: Number(get("minute")),
  };
}

export type Locale = "en" | "es";

export function formatClock(hour: number, minute = 0, locale: Locale = "en") {
  const suffix = hour >= 12 ? (locale === "es" ? "p. m." : "PM") : locale === "es" ? "a. m." : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${suffix}`;
}

const weekdayEs = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"] as const;

export function hoursLabel(location: Location, locale: Locale = "en") {
  const open = formatClock(location.openHour, 0, locale);
  const close = formatClock(location.closeHour, 0, locale);
  if (locale === "es") return `de lunes a sábado, ${open}–${close}`;
  return `Monday–Saturday, ${open}–${close}`;
}

export function hoursCompact(location: Location, locale: Locale = "en") {
  const open = formatClock(location.openHour, 0, locale);
  const close = formatClock(location.closeHour, 0, locale);
  if (locale === "es") return `lun–sáb · ${open}–${close}`;
  return `Mon–Sat · ${open}–${close}`;
}

export function placeName(location: Location, locale: Locale = "en") {
  if (locale === "es" && location.id === "chicago") return "Chicago — calle 95";
  return location.name;
}

export function placeShort(location: Location, locale: Locale = "en") {
  if (locale === "es" && location.id === "chicago") return "Calle 95";
  return location.shortName;
}

export type DoorStatus = {
  open: boolean;
  label: string;
};

export function doorStatus(location: Location, clock = chicagoClock(), locale: Locale = "en"): DoorStatus {
  const minutes = clock.hour * 60 + clock.minute;
  const opens = location.openHour * 60;
  const closes = location.closeHour * 60;
  const openToday = location.openDays.includes(clock.weekday);
  const at = formatClock(location.openHour, 0, locale);
  const until = formatClock(location.closeHour, 0, locale);

  if (openToday && minutes >= opens && minutes < closes) {
    return {
      open: true,
      label: locale === "es" ? `Abierto hasta las ${until}` : `Open until ${until}`,
    };
  }

  if (openToday && minutes < opens) {
    return {
      open: false,
      label: locale === "es" ? `Abre hoy a las ${at}` : `Opens today at ${at}`,
    };
  }

  for (let step = 1; step <= 7; step += 1) {
    const day = (clock.weekday + step) % 7;
    if (!location.openDays.includes(day)) continue;
    if (locale === "es") {
      const when = step === 1 ? "mañana" : `el ${weekdayEs[day]}`;
      return { open: false, label: `Abre ${when} a las ${at}` };
    }
    const when = step === 1 ? "tomorrow" : weekdayNames[day];
    return { open: false, label: `Opens ${when} at ${at}` };
  }

  return { open: false, label: locale === "es" ? "Cerrado" : "Closed" };
}

export function chicagoTimeLabel(date = new Date(), locale: Locale = "en") {
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export type Service = {
  slug: string;
  name: string;
  kicker: string;
  promise: string;
  summary: string;
  arrive: string;
  goodFor: string[];
  expect: string[];
  notFor: string[];
};

export const services: Service[] = [
  {
    slug: "urgent-care",
    name: "Urgent care",
    kicker: "Walk in",
    promise: "No appointment for illnesses, injuries, labs, and physicals.",
    summary:
      "Come in for problems that need a clinician today and do not belong in an emergency room. Both clinics welcome walk-ins for urgent care during posted hours.",
    arrive: "Walk in during posted hours. Bring a photo ID and your insurance card if you have one.",
    goodFor: [
      "Colds, flu, fever, sinus infections, allergies, strep, and other viral illnesses",
      "Sprains, minor fractures, cuts, burns, and sports injuries",
      "On-site lab testing, urine studies, rapid tests, blood work, and X-rays",
      "School, work, and sports physicals",
      "Vaccinations and IV hydration",
      "Care for children and adults",
      "Routine screenings, wellness exams, pregnancy testing, and basic gynecologic care",
      "Support visits for diabetes, asthma, and blood pressure",
    ],
    expect: [
      "Check in at the front desk. Urgent visits do not need an appointment.",
      "A clinician evaluates the problem you came in for.",
      "Labs or imaging are done on site when that test is part of the visit.",
      "You leave with a plan, a prescription when one is appropriate, or direction to the ER if the problem is more serious.",
    ],
    notFor: [
      "Chest pain, trouble breathing, or signs of a stroke",
      "Heavy bleeding, major trauma, or a severe burn",
      "A child who is struggling to breathe or is hard to wake",
      "Anything you already know is an emergency — call 911",
    ],
  },
  {
    slug: "pain-management",
    name: "Pain management",
    kicker: "Call to be seen",
    promise: "Back, neck, joint, and nerve pain, evaluated by Dr. Ahsan.",
    summary:
      "Pain visits are scheduled. Dr. Ahsan is fellowship-trained in pain management and treats chronic pain with a plan that can stay conservative or include an interventional procedure after an evaluation.",
    arrive: "Call the clinic you want. Same-day pain appointments are offered when a slot is open.",
    goodFor: [
      "Back and neck pain",
      "Joint pain and arthritis",
      "Nerve pain",
      "A second look when rest, primary care, and ordinary medicines have not been enough",
    ],
    expect: [
      "The first visit is an evaluation, not a procedure.",
      "Bring prior imaging reports and a list of medicines if you have them.",
      "The practice describes a range of options, from facet-nerve radiofrequency and epidural injections to spinal cord stimulation, implantable drug delivery, percutaneous disc procedures, minimally invasive lumbar decompression, kyphoplasty, and regenerative treatments using platelet-rich plasma or bone marrow.",
      "Nothing in that list is promised for a given patient. The plan follows the evaluation.",
    ],
    notFor: [
      "New weakness, loss of bowel or bladder control, fever with severe back pain, or pain after a major injury — those need emergency care",
      "A walk-in procedure without an evaluation",
    ],
  },
  {
    slug: "psychiatry",
    name: "Virtual psychiatry",
    kicker: "Video visit",
    promise: "Psychiatric evaluation and medication management by video.",
    summary:
      "Lt. Col. (Ret.) Virpal Sidhu, MSN, PMHNP-BC, sees patients by video for psychiatric care. Visits are confidential. This is scheduled care, not a crisis line.",
    arrive: "Call either clinic to ask for a video visit. Have a quiet, private place and a charged phone or computer.",
    goodFor: [
      "Psychiatric evaluations",
      "Medication management",
      "Anxiety and depression",
      "ADHD evaluation and treatment",
      "Mood disorders, including bipolar disorder",
    ],
    expect: [
      "You will be asked for history. Treatment, including any medicine, is decided after that evaluation.",
      "The visit is by telehealth and is meant to be private.",
      "If you might act on thoughts of suicide or harm, call 911 or call or text 988. Do not wait for a video appointment.",
    ],
    notFor: [
      "A crisis happening right now",
      "Court-ordered evaluations or disability paperwork, unless the clinic has agreed to it in advance",
      "A guarantee of a specific medicine",
    ],
  },
];

export const providers = [
  {
    id: "ahsan",
    name: "Dr. Ahsan, MD",
    credentials: "MD, AQPM, DABPM, DAAPM",
    role: "Pain management",
    focus: "Chronic pain, after an in-person evaluation.",
    bio: "Dr. Ahsan leads pain management for the clinic. He earned his medical degree at King Edward Medical University, then completed an anesthesiology residency and a fellowship in pain management at the University of Michigan, Ann Arbor. He treats chronic pain and decides between conservative care and interventional procedures only after seeing the patient.",
  },
  {
    id: "sidhu",
    name: "Lt. Col. (Ret.) Virpal Sidhu",
    credentials: "MSN, PMHNP-BC",
    role: "Psychiatric & mental health nurse practitioner",
    focus: "Video visits for evaluation and medication management.",
    bio: "Virpal Sidhu is a psychiatric mental health nurse practitioner. She retired from the Indian Army as a lieutenant colonel after a career as an operating room nurse, and she sees Ultra patients by video. The visit covers psychiatric evaluation and, when appropriate, medication management for anxiety, depression, ADHD, and mood disorders.",
  },
] as const;

export const faqs = [
  {
    q: "Do I need an appointment for urgent care?",
    a: "No. Walk in during posted hours for urgent care. Pain management and virtual psychiatry are scheduled — call first. Same-day slots for those visits are offered when one is open.",
  },
  {
    q: "Which clinic is open later?",
    a: "Hoffman Estates, at 136 W Higgins Road, is open Monday through Saturday from 2:00 PM to 10:00 PM. The 95th Street clinic in Chicago is open Monday through Saturday from 12:00 PM to 6:00 PM. Both are closed Sunday.",
  },
  {
    q: "Do you see children?",
    a: "Yes. Urgent care is for children and adults, including sick visits, physicals, and vaccinations. A parent or guardian should come with a child.",
  },
  {
    q: "Do you take my insurance?",
    a: "The clinic accepts most major insurance plans and also offers self-pay. Coverage can differ by location and by service, including Medicare. Call the clinic you plan to visit and ask about your exact plan before you come.",
  },
  {
    q: "Can I be seen for chronic pain today?",
    a: "Pain visits are scheduled with Dr. Ahsan. Call and ask whether a same-day evaluation is open. A procedure is not done on a walk-in basis.",
  },
  {
    q: "How do virtual psychiatry visits work?",
    a: "Call either clinic and ask for a video visit with Lt. Col. (Ret.) Virpal Sidhu. You will need a private place and a phone or computer. If this is a crisis, call 911 or call or text 988 instead of waiting for an appointment.",
  },
  {
    q: "When should I go to the emergency room?",
    a: "Call 911 for chest pain, trouble breathing, signs of stroke, heavy bleeding, major trauma, a severe burn, a child who is hard to wake, or thoughts of harming yourself. Ultra is not an emergency department.",
  },
] as const;

export const bringList = [
  "A photo ID",
  "Your insurance card, if you have one",
  "A list of the medicines you take",
  "For a child, the adult who can consent to care",
  "Prior imaging reports, if this is a pain visit and you have them",
] as const;

export const erWarnings = [
  "Chest pain, pressure, or trouble breathing",
  "Face droop, arm weakness, or trouble speaking",
  "Heavy bleeding, a major broken bone, or a severe burn",
  "A head injury with confusion, or a seizure",
  "A child who is struggling to breathe or is hard to wake",
  "Thoughts of suicide or of harming someone else",
] as const;

export function locationById(id: LocationId) {
  return locations.find((location) => location.id === id) ?? locations[0];
}

export function serviceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
