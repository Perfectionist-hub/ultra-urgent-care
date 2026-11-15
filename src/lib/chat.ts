import {
  chicagoClock,
  chicagoTimeLabel,
  doorStatus,
  hoursLabel,
  locations,
  placeName,
  placeShort,
  practice,
  type Locale,
} from "./clinic";
import { getCopy } from "./ui-copy";

export type ChatReply = {
  text: string;
  suggestions: string[];
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function has(text: string, pattern: RegExp) {
  return pattern.test(text);
}

function pick(locale: Locale, en: string, es: string) {
  return locale === "es" ? es : en;
}

function count(text: string, pattern: RegExp) {
  return text.match(pattern)?.length ?? 0;
}

function replyLocale(text: string, fallback: Locale): Locale {
  const esHits = count(text, /\b(hola|horario|abiert\w*|cerrad\w*|cita|seguro|dolor|donde|direccion|urgencia|psiquiat\w*|nino|nina|traer|espera|gracias|manana|hoy|clinica|vacuna|gripe|fiebre|espalda|cuello|domingo|acept\w*|estan|llame)\b/g);
  const enHits = count(text, /\b(hello|hours|open|closed|appointment|insurance|pain|where|urgent|psych|child|bring|wait|thanks|tomorrow|today|clinic|vaccine|flu|fever|back|neck)\b/g);
  if (esHits > enHits) return "es";
  if (enHits > esHits) return "en";
  return fallback;
}

function dot(text: string) {
  const trimmed = text.trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function hoursBlock(locale: Locale) {
  const stamp = chicagoTimeLabel(new Date(), locale).replace(/\.$/, "");
  const clock = chicagoClock();
  const lines = locations.map((location) => {
    const status = doorStatus(location, clock, locale);
    const name = placeName(location, locale);
    const hours = hoursLabel(location, locale);
    return pick(
      locale,
      `${name}: ${dot(status.label)} Usual hours are ${dot(hours)} Call ${location.phoneDisplay}.`,
      `${name}: ${dot(status.label)} El horario habitual es ${dot(hours)} Llame al ${location.phoneDisplay}.`,
    );
  });
  return pick(
    locale,
    `It is ${stamp} in Chicago. ${lines.join(" ")} Both clinics are closed Sunday.`,
    `Hora de Chicago: ${dot(stamp)} ${lines.join(" ")} Las dos clínicas están cerradas el domingo.`,
  );
}

function phones(locale: Locale) {
  return locations.map((location) => `${placeShort(location, locale)} ${location.phoneDisplay}`).join(" · ");
}

function extra(locale: Locale) {
  return {
    open: pick(locale, "Which clinic is open?", "¿Qué clínica está abierta?"),
    walk: pick(locale, "Can I walk in?", "¿Puedo entrar sin cita?"),
    insurance: pick(locale, "Do you take my insurance?", "¿Aceptan mi seguro?"),
    pain: pick(locale, "Pain management", "Manejo del dolor"),
    psych: pick(locale, "Virtual psychiatry", "Psiquiatría por video"),
    bring: pick(locale, "What should I bring?", "¿Qué debo traer?"),
    hoffman: pick(locale, "Hoffman Estates address", "Dirección de Hoffman Estates"),
    chicago: pick(locale, "95th Street address", "Dirección de la calle 95"),
    hours: pick(locale, "Clinic hours", "Horario"),
    treat: pick(locale, "What do you treat?", "¿Qué atienden?"),
    er: pick(locale, "Is this an emergency?", "¿Esto es una emergencia?"),
  };
}

export function answerQuestion(raw: string, fallback: Locale = "en"): ChatReply {
  const text = normalize(raw).slice(0, 500);
  const locale = replyLocale(text, fallback);
  const copy = getCopy(locale);
  const bag = extra(locale);

  if (!text) {
    return {
      text: pick(
        fallback,
        "Ask about hours, walk-ins, insurance, pain care, or video psychiatry. If this is an emergency, call 911.",
        "Pregunte por horarios, visitas sin cita, seguros, dolor o psiquiatría por video. Si es una emergencia, llame al 911.",
      ),
      suggestions: getCopy(fallback).chat.suggestions,
    };
  }

  const crisis = has(text, /\b(suicid|kill myself|want to die|end my life|self harm|hurt myself|harm myself|quiero morir|matarme|hacerme dano|autolesion|no quiero vivir)\b/);
  const emergency = has(
    text,
    /\b(chest pain|heart attack|cant breathe|cannot breathe|trouble breathing|short of breath|stroke|slurred|face droop|uncontrolled bleeding|severe bleeding|unconscious|unresponsive|seizure|overdose|anaphylaxis|not breathing|dolor de pecho|pecho|no puedo respirar|falta de aire|derrame|embolia|convulsion|inconsciente|sobredosis|sangrado)\b/,
  );

  if (crisis || emergency) {
    const lead = crisis
      ? pick(
          locale,
          "If you may act on thoughts of suicide or self-harm, call 911 now. You can also call or text 988, the Suicide and Crisis Lifeline, any hour.",
          "Si puede actuar sobre pensamientos de suicidio o de hacerse daño, llame al 911 ahora. También puede llamar o enviar un mensaje de texto al 988, la línea de crisis, a cualquier hora.",
        )
      : pick(
          locale,
          "Call 911 now. This chat cannot tell whether a symptom is an emergency, and the clinics are not emergency departments.",
          "Llame al 911 ahora. Este chat no puede decir si un síntoma es una emergencia, y las clínicas no son salas de emergencias.",
        );
    return {
      text: `${lead} ${pick(locale, "Do not wait on a callback. When everyone is safe, the clinics can be reached at", "No espere una llamada. Cuando todos estén a salvo, las clínicas están en")} ${phones(locale)}.`,
      suggestions: [bag.hours, bag.psych],
    };
  }

  if (has(text, /\b(911|emergency room|\ber\b|when should i go|sala de emergencias|emergencia)\b/)) {
    return {
      text: pick(
        locale,
        `Call 911 or go to an emergency department for: ${copy.er.join("; ")}. Ultra can treat non-emergency illness, injury, pain, and scheduled psychiatry. ${hoursBlock(locale)}`,
        `Llame al 911 o vaya a una sala de emergencias por: ${copy.er.join("; ")}. Ultra puede atender enfermedades y lesiones que no son emergencia, dolor y psiquiatría con cita. ${hoursBlock(locale)}`,
      ),
      suggestions: [bag.open, bag.treat],
    };
  }

  if (has(text, /\b(hour|hours|open|opened|closed|close|closing|sunday|tonight|when are you|horario|abiert\w*|abren|cerrad\w*|domingo|esta noche)\b/) || text === "when") {
    return {
      text: hoursBlock(locale),
      suggestions: [bag.walk, bag.hoffman, bag.chicago],
    };
  }

  if (has(text, /\b(insurance|medicare|medicaid|self pay|selfpay|cost|price|copay|aetna|bcbs|blue cross|cigna|humana|united|ppo|hmo|seguro|costo|precio|copago|particular)\b/)) {
    return {
      text: pick(
        locale,
        `Most major insurance plans are accepted, and self-pay is available. Plans are not all treated the same at every location or for every service, so call and name your plan before you come. ${phones(locale)}. Email ${practice.email} only for scheduling notes — do not send medical details by email.`,
        `Se aceptan la mayoría de los seguros principales, y también hay pago particular. No todos los planes se tratan igual en cada clínica o para cada servicio, así que llame y diga el nombre de su plan antes de venir. ${phones(locale)}. Escriba a ${practice.email} solo para notas de cita: no envíe detalles médicos por correo.`,
      ),
      suggestions: [bag.open, bag.bring],
    };
  }

  if (has(text, /\b(psych|psychiat\w*|adhd|anxiety|depression|bipolar|mood|sidhu|virpal|telehealth|video|mental|ansiedad|depres\w*|tdah|animo|psiquiat\w*)\b/)) {
    return {
      text: `${copy.services[2].summary} ${pick(locale, "Call either clinic to request a video visit:", "Llame a cualquiera de las dos clínicas para pedir una visita por video:")} ${phones(locale)}. ${pick(locale, "If you are in crisis, call 911 or call or text 988 instead.", "Si está en crisis, llame al 911 o llame o envíe un mensaje de texto al 988.")}`,
      suggestions: [bag.hours, bag.insurance],
    };
  }

  if (has(text, /\b(pain|back|neck|joint|arthritis|nerve|spine|injection|ahsan|epidural|stimulat\w*|dolor|espalda|cuello|articul\w*|nervio|columna|inyeccion\w*)\b/)) {
    return {
      text: pick(
        locale,
        `Dr. Ahsan sees patients for back, neck, joint, and nerve pain. The first visit is an evaluation. Procedures are considered only after that, and a walk-in does not include a procedure. Call to schedule: ${phones(locale)}. New weakness, fever with severe back pain, or loss of bowel or bladder control needs the ER, not a clinic appointment.`,
        `El Dr. Ahsan atiende dolor de espalda, cuello, articulaciones y nervios. La primera visita es una evaluación. Los procedimientos se consideran solo después, y una visita sin cita no incluye un procedimiento. Llame para programar: ${phones(locale)}. Debilidad nueva, fiebre con dolor de espalda intenso, o pérdida del control de la vejiga o del intestino necesitan emergencias, no una cita de clínica.`,
      ),
      suggestions: [bag.open, bag.bring],
    };
  }

  if (has(text, /\b(walk|appointment|same day|do i need|schedule|book|cita|sin cita|agendar|program\w*)\b/)) {
    return {
      text:
        pick(
          locale,
          "Urgent care is walk-in during posted hours. You do not need an appointment for illness, injury, labs, or physicals. Pain visits with Dr. Ahsan and video psychiatry with Lt. Col. (Ret.) Virpal Sidhu are scheduled. Call and ask if a same-day slot is open. ",
          "Las urgencias son sin cita durante el horario publicado. No necesita cita para una enfermedad, una lesión, laboratorios o un examen físico. Las visitas de dolor con el Dr. Ahsan y la psiquiatría por video con la Tte. Cnel. (Ret.) Virpal Sidhu se programan. Llame y pregunte si hay un cupo el mismo día. ",
        ) + hoursBlock(locale),
      suggestions: [bag.pain, bag.psych, bag.bring],
    };
  }

  if (has(text, /\b(where|address|location|direction|map|parking|hoffman|95th|higgins|chicago clinic|donde|direccion|estacionamiento|mapa)\b/)) {
    const focused = has(text, /\b(hoffman|higgins)\b/)
      ? locations.filter((location) => location.id === "hoffman")
      : has(text, /\b(95th|95|calle 95)\b/)
        ? locations.filter((location) => location.id === "chicago")
        : locations;
    const lines = focused.map((location) =>
      pick(
        locale,
        `${placeName(location, locale)} is at ${location.street}, ${location.cityLine}. ${hoursLabel(location, locale)}. ${location.phoneDisplay}.`,
        `${placeName(location, locale)} está en ${location.street}, ${location.cityLine}. ${hoursLabel(location, locale)}. ${location.phoneDisplay}.`,
      ),
    );
    const parking = has(text, /parking|estacionamiento/)
      ? pick(locale, " Parking details are not listed here — call the clinic and ask before you drive.", " El estacionamiento no está publicado aquí: llame a la clínica y pregunte antes de manejar.")
      : "";
    return { text: `${lines.join(" ")}${parking}`, suggestions: [bag.open, bag.walk] };
  }

  if (has(text, /\b(child|kid|pediatric|son|daughter|baby|infant|physical|vaccine|vaccination|school|sports|nino|nina|hijo|hija|pediatr|vacuna|fisico|escuela|deporte)\b/)) {
    return {
      text:
        pick(
          locale,
          "Urgent care sees children and adults. That includes sick visits, school and sports physicals, and vaccinations. A parent or guardian should come with a child. Walk in during posted hours. ",
          "Las urgencias atienden a niños y adultos. Eso incluye visitas por enfermedad, exámenes físicos de la escuela y los deportes, y vacunas. Un padre, una madre o un tutor debe venir con el niño. Entre durante el horario publicado. ",
        ) + hoursBlock(locale),
      suggestions: [bag.bring, bag.insurance],
    };
  }

  if (has(text, /\b(xray|x ray|lab|blood|strep|flu|covid|test|hydration|sprain|cut|burn|cold|sinus|fever|rayos|laboratorio|sangre|gripe|fiebre|esguince|cortada|quemadura|resfriado)\b/)) {
    return {
      text:
        pick(
          locale,
          "Urgent care treats common illnesses and minor injuries, and the clinic offers on-site labs, rapid tests, blood work, urine studies, and X-rays when the visit calls for them. Call if you need a specific test confirmed for today. Walk in during posted hours. ",
          "Las urgencias atienden enfermedades comunes y lesiones leves, y la clínica ofrece laboratorio, pruebas rápidas, sangre, orina y rayos X cuando la visita lo requiere. Llame si necesita confirmar una prueba específica para hoy. Entre durante el horario publicado. ",
        ) + hoursBlock(locale),
      suggestions: [bag.walk, bag.er],
    };
  }

  if (has(text, /\b(bring|what do i need|insurance card|traer|identificacion)\b/)) {
    const items = copy.bring.join(", ");
    return {
      text: pick(
        locale,
        `Bring ${items}. Skip sending symptoms in this chat. The front desk will ask what they need when you arrive or when they call you back.`,
        `Traiga ${items}. No envíe síntomas en este chat. Recepción le dirá lo que hace falta cuando llegue o cuando le devuelvan la llamada.`,
      ),
      suggestions: [bag.open, bag.insurance],
    };
  }

  if (has(text, /\b(doctor|provider|who|ahsan|sidhu|nurse|medico|doctor|quien|enfermera)\b/)) {
    return {
      text: pick(
        locale,
        `Dr. Ahsan, MD, sees patients for pain management. He trained in anesthesiology and completed a pain fellowship at the University of Michigan. Lt. Col. (Ret.) Virpal Sidhu, MSN, PMHNP-BC, sees virtual psychiatry visits. Urgent care is covered by the clinicians on duty. ${phones(locale)}`,
        `El Dr. Ahsan, MD, atiende el manejo del dolor. Se formó en anestesiología y completó una subespecialidad de dolor en la Universidad de Michigan. La Tte. Cnel. (Ret.) Virpal Sidhu, MSN, PMHNP-BC, atiende la psiquiatría por video. Las urgencias las cubre el clínico de turno. ${phones(locale)}`,
      ),
      suggestions: [bag.pain, bag.psych, bag.hours],
    };
  }

  if (has(text, /\b(email|contact|phone|call|number|correo|telefono|llamar|numero)\b/)) {
    return {
      text: pick(
        locale,
        `Call ${phones(locale)}. Email ${practice.email} for a callback request only. Do not include symptoms, medicines, or insurance numbers in an email or in this chat.`,
        `Llame al ${phones(locale)}. Escriba a ${practice.email} solo para pedir que le llamen. No incluya síntomas, medicamentos ni números de seguro en un correo ni en este chat.`,
      ),
      suggestions: [bag.open, bag.walk],
    };
  }

  if (has(text, /\b(wait|how long|busy|espera|tardan|demora)\b/)) {
    return {
      text: pick(
        locale,
        `The clinic does not publish a wait time. Urgent care is first-come during open hours. Pain and psychiatry visits depend on the schedule that day. Call the location you want and ask how the day is running. ${phones(locale)}`,
        `La clínica no publica un tiempo de espera. Las urgencias son por orden de llegada durante el horario. Las visitas de dolor y de psiquiatría dependen de la agenda de ese día. Llame a la clínica que quiere y pregunte cómo va el día. ${phones(locale)}`,
      ),
      suggestions: [bag.open, bag.walk],
    };
  }

  return {
    text: pick(
      locale,
      `I can help with hours, addresses, walk-ins, insurance, pain visits, and video psychiatry. I cannot diagnose symptoms or start a treatment. Call ${phones(locale)}, or call 911 if you think this is an emergency.`,
      `Puedo ayudar con horarios, direcciones, visitas sin cita, seguros, dolor y psiquiatría por video. No puedo diagnosticar síntomas ni empezar un tratamiento. Llame al ${phones(locale)}, o llame al 911 si cree que es una emergencia.`,
    ),
    suggestions: copy.chat.suggestions.slice(0, 4),
  };
}

export function chatIntro(locale: Locale) {
  return getCopy(locale).chat;
}
