"use client";

import { PrintButton } from "@/components/print-button";
import { useLocale } from "@/components/locale-provider";
import { formatClock, locations, practice, providers } from "@/lib/clinic";

const chicago = locations[0];
const hoffman = locations[1];
const ahsan = providers[0];
const sidhu = providers[1];

const phases = [
  {
    n: "01",
    name: "Foundation",
    when: "Days 1–14",
    span: "14fr",
    rail: "bg-primary text-primary-foreground",
    job: "Put one name, both hours, and both languages in public before a dollar is spent.",
    who: "Staff first, then South Side walk-in, after-work Hoffman, pain referrals, and video psychiatry.",
    en: "Walk in for urgent care. Hoffman Estates is open until 10 PM, Monday through Saturday. 95th Street is noon to 6. Call for pain and video psychiatry. Emergency: 911.",
    es: "Entre sin cita para urgencias. Hoffman Estates está abierto hasta las 10 p. m., de lunes a sábado. La calle 95, de mediodía a 6. Llame para dolor y psiquiatría por video. Emergencia: 911.",
    done: "Google hours match this sheet. Staff has said whether 95th Street is seeing patients. The flyer is checked for both addresses, both phones, and both languages. The organization NPI on file stays Hoffman Estates only.",
  },
  {
    n: "02",
    name: "Show up locally",
    when: "Days 15–45",
    span: "31fr",
    rail: "bg-clay text-ink",
    job: "Be where a same-day decision happens. Do not buy the click yet.",
    who: "South Side walk-in, in English and Spanish. After-work Hoffman. Pain referrals to Dr. Ahsan. Adults who will call for video psychiatry.",
    en: "No appointment for urgent care. Call first for pain with Dr. Ahsan, and for psychiatry by video.",
    es: "Sin cita para urgencias. Llame primero por dolor con el Dr. Ahsan y por psiquiatría por video.",
    done: "One Google post a week on each profile, English and Spanish alternating, one fact. A review is asked only after a real visit, in that language, never scripted. A referral note for Dr. Ahsan goes out in both languages.",
  },
  {
    n: "03",
    name: "Spend only while the door is open",
    when: "Days 46–75",
    span: "30fr",
    rail: "bg-gold text-ink",
    job: "Buy search inside real hours, and only for a door staff has confirmed is seeing patients.",
    who: "After-work Hoffman leads the ads. South Side walk-in stays out of paid ads until 95th Street is confirmed. Pain and video psychiatry stay separate.",
    en: "Open until 10 PM in Hoffman Estates. Walk in. Call for pain and for video psychiatry.",
    es: "Abierto hasta las 10 p. m. en Hoffman Estates. Entre sin cita. Llame para dolor y para psiquiatría por video.",
    done: "Call ads run Monday–Saturday inside each clinic’s hours. Sunday is off. Include urgencias Hoffman Estates and dolor de espalda. Hold “clínica sin cita calle 95” until that door is confirmed. Count calls to 773-563-6400 and 312-998-6900 apart, not clicks.",
  },
  {
    n: "04",
    name: "Review and keep what works",
    when: "Days 76–90",
    span: "15fr",
    rail: "bg-ink text-gold",
    job: "Keep what produced a call or a booked visit. Pause what cannot show that.",
    who: "Count them apart: South Side walk-in, after-work Hoffman, pain referrals, and video psychiatry.",
    en: "Walk in during the posted hours. Call to confirm your insurance, including Medicare.",
    es: "Entre durante el horario publicado. Llame para confirmar su seguro, incluso Medicare.",
    done: "Read calls, direction requests, pain evaluations booked, video visits booked, and reviews that name a real visit. No cost per call means the spend pauses. The chat stays on the device and does not diagnose.",
  },
] as const;

const heldBack = [
  "95th Street as confirmed-open in a paid ad, until staff confirms that door is seeing patients",
  "Sunday placements. Both clinics are closed Sunday",
  "“15+ years,” award badges, “zero wait,” or “under 30 minutes”",
  "Bought reviews, scripted quotes, and the Sunday-visit line",
  "“Cure” and “best in Chicago”",
  "Controlled medicines or ADHD drugs by name, and any chat that diagnoses",
];

const attention = [
  { label: "After-work Hoffman", note: "Lead the paid hours", width: "100%" },
  { label: "South Side walk-in", note: "Local until the door is confirmed", width: "68%" },
  { label: "Pain referrals", note: "Separate. Evaluation first", width: "46%" },
  { label: "Video psychiatry", note: "Calls only. No drug names", width: "32%" },
];

const intro = {
  en: {
    kicker: "For the presentation",
    title: "A 90-day campaign, in four phases.",
    lede: "One letter page for the room. Each phase has a window, a job, who it is for, the line to say in English and Spanish, and what done means. The bars are a proposed plan for attention, not money already spent.",
    hold: "Paid ads do not call 95th Street confirmed-open until staff confirms that door is seeing patients.",
    download: "Download PDF",
    back: "Practice playbook",
  },
  es: {
    kicker: "Para la presentación",
    title: "Una campaña de 90 días, en cuatro fases.",
    lede: "Una página tamaño carta para la sala. Cada fase tiene un plazo, una tarea, a quién va dirigida, la frase en inglés y en español, y qué significa lista. Las barras son un plan propuesto de atención, no dinero ya gastado.",
    hold: "Los anuncios pagados no presentan la calle 95 como confirmada y abierta hasta que el personal confirme que esa puerta atiende pacientes.",
    download: "Descargar el PDF",
    back: "Guía de la práctica",
  },
} as const;

function Label({ children }: { children: string }) {
  return <span className="mr-1 text-[8px] tracking-[0.12em] text-clay uppercase">{children}</span>;
}

function clockSpan(openHour: number, closeHour: number) {
  return `${formatClock(openHour)}–${formatClock(closeHour)}`;
}

export function CampaignView() {
  const { locale } = useLocale();
  const copy = intro[locale];

  return (
    <main id="content" className="px-5 py-10 print:p-0">
      <div className="site-chrome mx-auto mb-8 flex max-w-[8.5in] flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.kicker}</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-ink">{copy.title}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{copy.lede}</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-clay">{copy.hold}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrintButton />
          <a
            href="/ultra-campaign-one-pager.pdf"
            download
            className="inline-flex h-11 items-center rounded-full border border-border bg-card px-5 text-sm font-medium text-ink"
          >
            {copy.download}
          </a>
          <a href="/playbook" className="inline-flex h-11 items-center text-sm text-primary">
            {copy.back}
          </a>
        </div>
      </div>

      <div className="flyer-stage campaign-stage mx-auto">
        <article className="flyer-sheet campaign-sheet flex h-[11in] w-[8.5in] flex-col overflow-hidden bg-background text-ink">
          <header className="shrink-0 bg-primary px-[0.32in] pt-[0.16in] pb-[0.14in] text-primary-foreground">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-[32px] leading-none tracking-tight">Ultra</p>
                <p className="mt-1 text-[10px] tracking-[0.16em] text-gold uppercase">Urgent Care & Pain Management</p>
              </div>
              <p className="max-w-[2.5in] text-right text-[10px] leading-snug text-gold">
                Staff sheet · 90 days · four phases
                <span className="mt-0.5 block text-white/80">A proposed plan. Not past spend. Not a lobby flyer.</span>
              </p>
            </div>
            <p className="mt-2 font-display text-[22px] leading-none tracking-tight">Four phases. One line to say.</p>
            <p className="mt-1.5 text-[12.5px] leading-snug text-gold">
              Walk in for urgent care. Entre sin cita. Hoffman until 10 PM, Mon–Sat. 95th Street, noon to 6. Call for pain and video psychiatry. Emergency: 911.
            </p>
          </header>

          <div className="grid shrink-0 grid-cols-2">
            <div className="bg-foam px-[0.28in] py-[0.08in]">
              <p className="text-[8px] tracking-[0.14em] uppercase">Hoffman Estates · the door ads can name</p>
              <p className="mt-0.5 font-display text-[16px] leading-none tracking-tight">
                {clockSpan(hoffman.openHour, hoffman.closeHour)} · {hoffman.phoneDisplay}
              </p>
              <p className="mt-0.5 text-[9.5px] leading-snug">
                {hoffman.street}, {hoffman.cityLine} · Mon–Sat · Sunday closed
              </p>
            </div>
            <div className="bg-sand px-[0.28in] py-[0.08in]">
              <p className="text-[8px] tracking-[0.14em] text-clay uppercase">95th Street · hold paid ads</p>
              <p className="mt-0.5 font-display text-[16px] leading-none tracking-tight">
                {clockSpan(chicago.openHour, chicago.closeHour)} · {chicago.phoneDisplay}
              </p>
              <p className="mt-0.5 text-[9.5px] leading-snug">
                {chicago.street}, {chicago.cityLine} · Mon–Sat · Sunday closed
              </p>
              <p className="text-[9px] leading-snug text-clay">
                Do not call this door confirmed-open in a paid ad until staff says it is seeing patients. NPI on file is Hoffman Estates only.
              </p>
            </div>
          </div>

          <div className="grid shrink-0 grid-cols-[14fr_31fr_30fr_15fr] text-[8px] leading-tight text-ink">
            {phases.map((phase) => (
              <div key={phase.n} className={`px-[0.1in] py-[0.05in] ${phase.rail}`}>
                <p className="tracking-[0.12em] uppercase">{phase.when.replace("Days ", "")}</p>
                <p className="font-medium">{phase.name}</p>
              </div>
            ))}
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            {phases.map((phase, index) => (
              <section
                key={phase.n}
                className={`grid min-h-0 flex-1 grid-cols-[0.4in_1fr] overflow-hidden border-t border-primary/15 ${index % 2 === 1 ? "bg-sand/45" : "bg-card"}`}
              >
                <div className={`flex items-center justify-center font-display text-[18px] leading-none ${phase.rail}`}>
                  {phase.n}
                </div>
                <div className="flex min-h-0 flex-col justify-center gap-[3px] px-[0.14in] py-[0.05in]">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-[15px] leading-none tracking-tight">{phase.name}</h2>
                    <p className="shrink-0 text-[9px] tracking-[0.14em] text-clay uppercase">{phase.when}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 text-[10.5px] leading-[1.25]">
                    <p>
                      <Label>Job</Label>
                      {phase.job}
                    </p>
                    <p>
                      <Label>Who</Label>
                      {phase.who}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 bg-sand px-2 py-[3px] text-[10.5px] leading-[1.25]">
                    <p>
                      <Label>English</Label>
                      “{phase.en}”
                    </p>
                    <p>
                      <Label>Español</Label>
                      “{phase.es}”
                    </p>
                  </div>
                  <p className="text-[10.5px] leading-[1.25] text-primary">
                    <Label>Done</Label>
                    {phase.done}
                  </p>
                </div>
              </section>
            ))}
          </div>

          <footer className="shrink-0 bg-ink px-[0.28in] pt-[0.1in] pb-[0.1in] text-primary-foreground">
            <div className="grid grid-cols-[1.25fr_0.85fr] gap-x-4">
              <div>
                <p className="text-[8px] tracking-[0.16em] text-gold uppercase">Do not buy</p>
                <ul className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5 text-[9px] leading-snug">
                  {heldBack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[8px] tracking-[0.16em] text-gold uppercase">Proposed attention</p>
                <p className="text-[8px] leading-snug text-white/70">A plan for these 90 days. Not money already spent.</p>
                <ul className="mt-1 space-y-0.5">
                  {attention.map((item) => (
                    <li key={item.label}>
                      <div className="flex items-baseline justify-between gap-2 text-[9px] leading-none">
                        <span>{item.label}</span>
                        <span className="text-white/70">{item.note}</span>
                      </div>
                      <div className="mt-0.5 h-[4px] bg-white/15">
                        <div className="h-full bg-gold" style={{ width: item.width }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-1.5 border-t border-white/15 pt-1 text-[8.5px] leading-snug text-white/85">
              <p>
                Pain: {ahsan.name} · AQPM, DABPM, DAAPM. King Edward Medical University; anesthesiology residency and pain fellowship, University of Michigan, Ann Arbor. Video psychiatry: {sidhu.name}, {sidhu.credentials}. Scheduled. Not a crisis line.
              </p>
              <p className="mt-0.5">
                Most major insurance. Call to confirm, including Medicare. Emergency: 911. Crisis: 911, or call or text 988. Emergencia: 911. Crisis: 911, o llame o envíe un mensaje al 988.
              </p>
              <p className="mt-0.5 text-gold">
                {practice.legalName} · {practice.email} · {practice.websiteLabel}
              </p>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
