"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";

const packs = {
  en: {
    kicker: "For the practice, not for patients",
    title: "A 90-day plan to make the clinics easier to choose.",
    lede: "The visits you can actually offer are the message: a walk-in, a late door in Hoffman Estates, a named pain physician, and a video psychiatry visit. The site and the flyer now say that in English and Spanish. The checkable list for these 90 days is the internal marketing canvas, kept off this public page.",
    sheet: "Open the one-page campaign",
    sheetNote: "Four phases on one letter sheet, for the presentation.",
    sayTitle: "Say this, and stop saying the rest.",
    say: "“Walk in for urgent care. Entre sin cita. Hoffman Estates is open until 10 PM, Monday through Saturday. 95th Street is open noon to 6. Call for pain and for video psychiatry. If it might be an emergency, call 911.”",
    retire: "Retire “premium,” “zero wait,” “15+ years,” award badges, and any patient quote you cannot match to a real visit. One published testimonial describes a Sunday visit. Both clinics are closed Sunday.",
    who: "Who the message is for",
    audiences: [
      ["South Side families", "95th Street, noon to 6. Sick visits, physicals, a child with a parent. Say it in Spanish too."],
      ["Northwest suburbs after work", "Hoffman Estates, 2 to 10 PM. The reason to skip an ER wait for a sprain or a fever."],
      ["People living with pain", "A scheduled evaluation with Dr. Ahsan. Not a same-day injection."],
      ["Adults who want psychiatry by video", "Lt. Col. (Ret.) Virpal Sidhu. Confidential, scheduled, and never a crisis service."],
    ],
    measureTitle: "What to measure",
    measureBody: "There is no baseline in this plan, because the current site does not report one. Count calls in each language once the new site is live.",
    measures: [
      "Calls to 312-998-6900 and calls to 773-563-6400, kept separate.",
      "Direction requests on each Google profile, English and Spanish posts both.",
      "Pain evaluations booked, and video psychiatry visits booked.",
      "New reviews that name a real visit. Ignore any review you cannot stand behind.",
      "Cost per phone call, once search ads are on. Pause a campaign that cannot show this number.",
    ],
    leaveTitle: "Leave these alone",
    leave: [
      "Bought reviews, review gating, and testimonials written by the marketing team.",
      "Before-and-after pain claims, “cure,” and “best in Chicago.”",
      "Ads for controlled medicines or for ADHD drugs by name.",
      "A chatbot that diagnoses. The one on this site refuses that on purpose, in both languages.",
      "One flyer that lists every procedure Dr. Ahsan might someday offer.",
    ],
    home: "homepage",
    close: "Patients should be on the homepage. This page can stay unlisted.",
    weeks: [
      {
        when: "Days 1–14",
        title: "Make the facts match",
        items: [
          "Put this website on ultraurgentpainmanagement.com. The language switch is EN / ES, and the printed flyer already carries both languages.",
          "Confirm, out loud, that 95th Street is seeing patients. The public organization NPI on file is Hoffman Estates only. Do not buy ads for a door that is not open.",
          "Set both Google Business Profiles to the exact hours on this site, with the description in English and Spanish. Turn messaging off on Sunday.",
          "Pick one public name and use it everywhere: Ultra Urgent Care & Pain Management.",
          "Print the bilingual flyer only after someone on staff has checked both addresses, both phones, and both languages.",
          "Photograph the real exterior, the front desk, and the waiting room. Whoever answers the phone should be able to take the call in Spanish or hand it to someone who can.",
        ],
      },
      {
        when: "Days 15–45",
        title: "Show up where a same-day decision happens",
        items: [
          "Post once a week on each Google profile, alternating English and Spanish. One post, one fact. No cured-pain claims.",
          "Ask for a review at the end of a visit that went well. Offer the ask in the language of the visit. Never draft the words for the patient.",
          "Reply to every review within two days. If someone describes a Sunday visit, correct the hours in public.",
          "Give primary care offices a one-page referral note for Dr. Ahsan, with a Spanish version for offices that need it.",
          "For July and August, put the physicals line of the flyer in school offices and park districts that allow it.",
        ],
      },
      {
        when: "Days 46–90",
        title: "Spend only while the door is open",
        items: [
          "Run separate search campaigns for urgent care in Hoffman Estates, urgent care near 95th Street, and pain management. Include the Spanish queries: urgencias Hoffman Estates, clínica sin cita calle 95, dolor de espalda.",
          "Use call ads, and schedule them inside each clinic’s real hours. A Sunday click cannot become a visit.",
          "Keep psychiatry ads off drug names in either language. The offer is an evaluation by video.",
          "Judge ads by calls to the published numbers, not by clicks.",
          "Once a month, read the questions the chatbot is built to answer. If staff keep hearing a question in Spanish that the site does not answer, add it.",
        ],
      },
    ],
  },
  es: {
    kicker: "Para la práctica, no para los pacientes",
    title: "Un plan de 90 días para que sea más fácil elegir estas clínicas.",
    lede: "El mensaje son las visitas que de verdad pueden ofrecer: entrar sin cita, una puerta abierta hasta tarde en Hoffman Estates, un médico de dolor con nombre y una visita de psiquiatría por video. El sitio y el volante ya lo dicen en inglés y en español. La lista para marcar de estos 90 días está en el canvas interno de marketing, fuera de esta página pública.",
    sheet: "Abrir la campaña de una página",
    sheetNote: "Cuatro fases en una hoja tamaño carta, para la presentación.",
    sayTitle: "Diga esto, y deje de decir el resto.",
    say: "“Entre sin cita para urgencias. Walk in for urgent care. Hoffman Estates está abierto hasta las 10 p. m., de lunes a sábado. La calle 95 está abierta de mediodía a 6. Llame para dolor y para psiquiatría por video. Si puede ser una emergencia, llame al 911.”",
    retire: "Retire “premium”, “cero espera”, “más de 15 años”, las insignias de premios y cualquier cita de un paciente que no pueda ligar a una visita real. Un testimonio publicado describe una visita en domingo. Las dos clínicas cierran el domingo.",
    who: "Para quién es el mensaje",
    audiences: [
      ["Familias del lado sur", "Calle 95, de mediodía a 6. Visitas por enfermedad, exámenes físicos, un niño con un adulto. Dígalo también en español."],
      ["Suburbios del noroeste después del trabajo", "Hoffman Estates, de 2 a 10 p. m. La razón para no esperar en emergencias por un esguince o una fiebre."],
      ["Personas que viven con dolor", "Una evaluación con cita con el Dr. Ahsan. No una inyección el mismo día."],
      ["Adultos que quieren psiquiatría por video", "Tte. Cnel. (Ret.) Virpal Sidhu. Confidencial, con cita, y nunca un servicio de crisis."],
    ],
    measureTitle: "Qué medir",
    measureBody: "Este plan no trae una línea de base, porque el sitio actual no publica una. Cuente las llamadas en cada idioma cuando el sitio nuevo esté en el aire.",
    measures: [
      "Llamadas al 312-998-6900 y llamadas al 773-563-6400, por separado.",
      "Pedidos de cómo llegar en cada perfil de Google, con publicaciones en inglés y en español.",
      "Evaluaciones de dolor agendadas y visitas de psiquiatría por video agendadas.",
      "Reseñas nuevas que nombren una visita real. Ignore cualquier reseña que no pueda sostener.",
      "Costo por llamada, cuando haya anuncios. Pause una campaña que no pueda mostrar ese número.",
    ],
    leaveTitle: "Deje esto en paz",
    leave: [
      "Reseñas compradas, filtros de reseñas y testimonios escritos por el equipo de marketing.",
      "Antes y después del dolor, “cura” y “el mejor de Chicago”.",
      "Anuncios de medicamentos controlados o de fármacos para el TDAH por su nombre.",
      "Un chat que diagnostique. El de este sitio se niega a hacerlo, en los dos idiomas.",
      "Un volante que liste cada procedimiento que el Dr. Ahsan podría ofrecer algún día.",
    ],
    home: "página de inicio",
    close: "Los pacientes deben estar en la página de inicio. Esta página puede seguir sin listarse.",
    weeks: [
      {
        when: "Días 1–14",
        title: "Haga que los datos coincidan",
        items: [
          "Publique este sitio en ultraurgentpainmanagement.com. El cambio de idioma es EN / ES, y el volante impreso ya lleva los dos idiomas.",
          "Confirme, en voz alta, que la calle 95 está atendiendo pacientes. El NPI de la organización que aparece en el registro público es solo Hoffman Estates. No compre anuncios para una puerta que no está abierta.",
          "Ponga en los dos perfiles de Google el horario exacto de este sitio, con la descripción en inglés y en español. Apague los mensajes el domingo.",
          "Elija un solo nombre público y úselo en todas partes: Ultra Urgent Care & Pain Management.",
          "Imprima el volante bilingüe solo después de que alguien del personal revise las dos direcciones, los dos teléfonos y los dos idiomas.",
          "Fotografíe el exterior real, la recepción y la sala de espera. Quien conteste el teléfono debe poder tomar la llamada en español o pasarla a quien pueda.",
        ],
      },
      {
        when: "Días 15–45",
        title: "Aparezca donde se decide una visita el mismo día",
        items: [
          "Publique una vez por semana en cada perfil de Google, alternando inglés y español. Una publicación, un dato. Sin promesas de curar el dolor.",
          "Pida una reseña al final de una visita que salió bien. Haga el pedido en el idioma de la visita. Nunca escriba las palabras por el paciente.",
          "Responda cada reseña en dos días. Si alguien describe una visita en domingo, corrija el horario en público.",
          "Dé a los consultorios de atención primaria una hoja de referencia para el Dr. Ahsan, con una versión en español para los consultorios que la necesiten.",
          "En julio y agosto, deje la línea de exámenes físicos del volante en las oficinas escolares y los distritos de parques que lo permitan.",
        ],
      },
      {
        when: "Días 46–90",
        title: "Gaste solo mientras la puerta está abierta",
        items: [
          "Haga campañas separadas para urgencias en Hoffman Estates, urgencias cerca de la calle 95 y manejo del dolor. Incluya las búsquedas en español: urgencias Hoffman Estates, clínica sin cita calle 95, dolor de espalda.",
          "Use anuncios de llamada y prográmalos dentro del horario real de cada clínica. Un clic del domingo no se convierte en una visita.",
          "Mantenga los anuncios de psiquiatría lejos de nombres de medicamentos, en los dos idiomas. La oferta es una evaluación por video.",
          "Juzgue los anuncios por las llamadas a los números publicados, no por los clics.",
          "Una vez al mes, lea las preguntas que el chat sabe responder. Si el personal sigue oyendo una pregunta en español que el sitio no responde, agréguela.",
        ],
      },
    ],
  },
};

export function PlaybookView() {
  const { locale } = useLocale();
  const copy = packs[locale];
  return (
    <main id="content" className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">{copy.kicker}</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight text-ink">{copy.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{copy.lede}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        <Link className="font-medium text-primary" href="/campaign">{copy.sheet}</Link>
        . {copy.sheetNote}
      </p>
      <section className="mt-10 rounded-[1.4rem] bg-sand p-6">
        <h2 className="font-display text-2xl text-ink">{copy.sayTitle}</h2>
        <p className="mt-3 leading-relaxed">{copy.say}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.retire}</p>
      </section>
      <div className="mt-12 space-y-12">
        {copy.weeks.map((block) => (
          <section key={block.when}>
            <p className="text-xs tracking-[0.16em] text-clay uppercase">{block.when}</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-ink">{block.title}</h2>
            <ul className="mt-4 space-y-3">
              {block.items.map((item) => (
                <li key={item} className="border-l-2 border-primary/30 pl-4 leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="font-display text-3xl tracking-tight text-ink">{copy.who}</h2>
        <dl className="mt-4 divide-y divide-border border-y border-border">
          {copy.audiences.map(([title, body]) => (
            <div key={title} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr]">
              <dt className="font-medium">{title}</dt>
              <dd className="text-muted-foreground">{body}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-3xl tracking-tight text-ink">{copy.measureTitle}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{copy.measureBody}</p>
        <ul className="mt-4 space-y-2 leading-relaxed">
          {copy.measures.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-3xl tracking-tight text-ink">{copy.leaveTitle}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
          {copy.leave.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <Link className="text-primary" href="/">{copy.home}</Link>. {copy.close}
        </p>
      </section>
    </main>
  );
}
