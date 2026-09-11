export type FilterId = "todos" | "pasos" | "ruta" | "herramientas" | "formacion";

export type ToolId =
  | "cuenta"
  | "aprender"
  | "diagnostico"
  | "programa"
  | "planeacion"
  | "evaluacion"
  | "kit"
  | "formacion"
  | "gemas-banco"
  | "conoce";

export type ToolKind = "photo" | "illustration" | "kit" | "logo";

export type ExploreCard = {
  id: ToolId;
  title: string;
  href: string;
  filter: FilterId[];
  kind: ToolKind;
  image?: string;
  tone?: "cyan" | "green" | "blue" | "amber" | "rose" | "violet" | "dark";
  span?: "half" | "full";
  layout?: "compact" | "medium" | "tall" | "wide";
};

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "pasos", label: "Primeros pasos" },
  { id: "ruta", label: "Ruta" },
  { id: "herramientas", label: "Herramientas" },
  { id: "formacion", label: "Formación" },
];

export const EXPLORE: ExploreCard[] = [
  {
    id: "cuenta",
    title: "Activa tu cuenta @jaliscoedu.mx",
    href: "/t/cuenta",
    filter: ["pasos"],
    kind: "logo",
    tone: "dark",
    layout: "compact",
  },
  {
    id: "aprender",
    title: "Aprende paso a paso",
    href: "/t/aprender",
    filter: ["pasos"],
    kind: "photo",
    image: "/images/aprende.jpg",
    layout: "tall",
  },
  {
    id: "diagnostico",
    title: "Diagnóstico inicial",
    href: "/t/diagnostico",
    filter: ["pasos", "ruta"],
    kind: "illustration",
    tone: "cyan",
    layout: "tall",
  },
  {
    id: "programa",
    title: "Programa analítico",
    href: "/t/programa",
    filter: ["herramientas", "ruta"],
    kind: "illustration",
    tone: "green",
    layout: "compact",
  },
  {
    id: "planeacion",
    title: "Planeación didáctica",
    href: "/t/planeacion",
    filter: ["herramientas", "ruta"],
    kind: "illustration",
    tone: "blue",
    layout: "medium",
  },
  {
    id: "evaluacion",
    title: "Evaluación y retroalimentación",
    href: "/t/evaluacion",
    filter: ["herramientas", "ruta"],
    kind: "illustration",
    tone: "amber",
    layout: "tall",
  },
  {
    id: "kit",
    title: "Kit de herramientas",
    href: "/t/kit",
    filter: ["herramientas"],
    kind: "kit",
    span: "full",
    layout: "wide",
  },
  {
    id: "formacion",
    title: "Formación del Carácter al Estilo Jalisco",
    href: "/t/formacion",
    filter: ["formacion", "ruta"],
    kind: "photo",
    image: "/images/formacion.jpg",
    layout: "tall",
  },
  {
    id: "gemas-banco",
    title: "Banco de Gemas especializadas",
    href: "/gemas",
    filter: ["formacion", "herramientas"],
    kind: "photo",
    image: "/images/gemas-docente-wide.jpg",
    layout: "medium",
  },
  {
    id: "conoce",
    title: "Conoce más sobre la IA",
    href: "/t/conoce",
    filter: ["pasos", "formacion"],
    kind: "photo",
    image: "/images/conoce.jpg",
    span: "full",
    layout: "wide",
  },
];

export type GemAccessTarget = {
  id: string;
  title: string;
  url: string;
  copyText?: string;
};

export const GEM_ACCESS: Record<
  "diagnostico" | "programa" | "planeacion" | "evaluacion" | "leo",
  GemAccessTarget
> = {
  diagnostico: {
    id: "diagnostico",
    title: "Diagnóstico inicial",
    url: "https://gemini.google.com/gem/1E997ysThV6qkHsQ-QFZU5elj2GhuqSsL?usp=sharing",
  },
  programa: {
    id: "programa",
    title: "Programa analítico",
    url: "https://gemini.google.com/gem/1CJf1Zh-EW8V9-WQgj1riJ9FWxeKAH_Tr?usp=sharing",
  },
  planeacion: {
    id: "planeacion",
    title: "Planeación didáctica",
    url: "https://gemini.google.com/gem/1iCr-u-5XCdeL78-Oy5ogxRCq8VZQwa0L?usp=sharing",
  },
  evaluacion: {
    id: "evaluacion",
    title: "Evaluación y retroalimentación",
    url: "https://gemini.google.com/app",
    copyText:
      "Ayúdame a crear una evaluación formativa. Pregúntame primero por fase, campo formativo, PDA, evidencia disponible y necesidades del grupo. Después propón criterios observables, una rúbrica breve y retroalimentación accionable.",
  },
  leo: {
    id: "leo",
    title: "Programa LEO",
    url: "https://gemini.google.com/gem/13qO6ZZIVsvEAeBxPtwvI-hA5ql6xw1iO?usp=sharing",
  },
};

export const FASES = [
  { id: "2", label: "Fase 2 · 1.° y 2.° de primaria" },
  { id: "3", label: "Fase 3 · 3.° y 4.° de primaria" },
  { id: "4", label: "Fase 4 · 5.° y 6.° de primaria" },
  { id: "5", label: "Fase 5 · Secundaria" },
  { id: "6", label: "Fase 6 · Media superior" },
];

export const CAMPOS = [
  { id: "lenguajes", label: "Lenguajes" },
  { id: "cientifico", label: "Saberes y pensamiento científico" },
  { id: "etica", label: "Ética, naturaleza y sociedades" },
  { id: "humano", label: "De lo humano y lo comunitario" },
];

export const RUTA_STEPS = [
  {
    id: "diagnostico",
    title: "Diagnóstico inicial",
    blurb: "Analiza tu grupo y contexto a partir de datos reales.",
    tone: "cyan" as const,
  },
  {
    id: "programa",
    title: "Programa analítico",
    blurb: "Contextualiza el programa a tu comunidad y campos formativos.",
    tone: "green" as const,
  },
  {
    id: "planeacion",
    title: "Planeación didáctica",
    blurb: "Genera secuencias, actividades y materiales alineados a los PDA.",
    tone: "blue" as const,
  },
  {
    id: "evaluacion",
    title: "Evaluación y retroalimentación",
    blurb: "Crea rúbricas e instrumentos y retroalimenta por PDA.",
    tone: "amber" as const,
  },
];

export type Gema = {
  id: string;
  title: string;
  blurb: string;
  campo: string;
  tone: "cyan" | "green" | "blue" | "amber" | "rose" | "violet";
  prompt: string;
};

export const GEMAS: Gema[] = [
  {
    id: "situacion",
    title: "Situación didáctica NEM",
    blurb: "Una situación situada en el territorio, con PDA y secuencia de tres momentos.",
    campo: "Todos los campos",
    tone: "blue",
    prompt:
      "Diseña una situación didáctica NEM de 2 sesiones. Incluye intención pedagógica, PDA, inicio-desarrollo-cierre, materiales de escuela pública y vínculo con la comunidad.",
  },
  {
    id: "nee",
    title: "Adaptación para NEE",
    blurb: "Ajustes razonables, no un plan paralelo. Mismos aprendizajes, distintos caminos.",
    campo: "Inclusión",
    tone: "green",
    prompt:
      "Propón adaptaciones para NEE (apoyos visuales, tiempo, mediación entre pares) sin bajar la exigencia cognitiva. Sé concreto y respetuoso.",
  },
  {
    id: "rubrica",
    title: "Rúbrica holística",
    blurb: "Cuatro niveles, lenguaje de estudiantes, criterios observables.",
    campo: "Evaluación",
    tone: "amber",
    prompt:
      "Crea una rúbrica holística de 4 niveles (en proceso, esencial, esperado, sobresaliente) con criterios observables y lenguaje para retroalimentar al alumnado.",
  },
  {
    id: "detonadoras",
    title: "Preguntas detonadoras",
    blurb: "Doce preguntas que abren pensamiento, no recitan la respuesta.",
    campo: "Lenguajes",
    tone: "rose",
    prompt:
      "Escribe 12 preguntas detonadoras (literal, inferencial, crítica y metacognitiva) para una clase de 50 minutos. Evita sí/no.",
  },
  {
    id: "steam",
    title: "Proyecto STEAM local",
    blurb: "Un reto de 3 semanas anclado a un problema real de Jalisco.",
    campo: "Científico",
    tone: "cyan",
    prompt:
      "Diseña un proyecto STEAM de 3 semanas situado en Jalisco (agua, maíz, movilidad, feria, barrio). Incluye reto, productos, roles y evaluación.",
  },
  {
    id: "retro",
    title: "Retroalimentación formativa",
    blurb: "Comentarios que el estudiante puede usar mañana, no adjetivos.",
    campo: "Evaluación",
    tone: "violet",
    prompt:
      "Redacta 6 comentarios de retroalimentación formativa (fortaleza + siguiente paso + pregunta). Tono cercano, sin calificativos vacíos.",
  },
  {
    id: "asamblea",
    title: "Asamblea de aula",
    blurb: "Guion de 20 minutos para convivir, decidir y reparar.",
    campo: "Comunitario",
    tone: "green",
    prompt:
      "Diseña una asamblea de aula de 20 minutos: apertura, tema, turnos de palabra, acuerdo y cierre. Incluye normas de escucha.",
  },
  {
    id: "leo",
    title: "Secuencia LEO",
    blurb: "Lectura, escritura y oralidad en una sola sesión.",
    campo: "Lenguajes",
    tone: "blue",
    prompt:
      "Arma una secuencia LEO (lectura, escritura, oralidad) de 50 minutos con un texto breve, una consigna de escritura y una puesta en común.",
  },
  {
    id: "familia",
    title: "Puente con familias",
    blurb: "Una nota y una actividad de 15 minutos para casa, sin copiar.",
    campo: "Comunidad",
    tone: "amber",
    prompt:
      "Redacta una nota para familias (lenguaje claro, máximo 120 palabras) y una actividad de 15 minutos para hacer en casa sin materiales especiales.",
  },
  {
    id: "paz",
    title: "Paz en el recreo",
    blurb: "Protocolo breve para mediar un conflicto entre pares.",
    campo: "Carácter",
    tone: "rose",
    prompt:
      "Propón un protocolo de mediación entre pares de 4 pasos, un círculo restaurativo de 10 minutos y frases que el docente puede modelar.",
  },
];

export const VIRTUES = [
  {
    id: "respeto",
    title: "Respeto",
    line: "Mirar al otro como alguien que vale, también cuando discrepa.",
    aula: "Acuerdos de escucha visibles. Un objeto que da el turno de palabra.",
  },
  {
    id: "honestidad",
    title: "Honestidad",
    line: "Decir lo que sí se hizo y lo que aún no, sin miedo al error.",
    aula: "Diario de evidencia: lo que entendí / lo que me falta.",
  },
  {
    id: "responsabilidad",
    title: "Responsabilidad",
    line: "Cuidar la tarea, el material y a quien trabaja a mi lado.",
    aula: "Roles rotativos de aula: materiales, tiempo, cuidado.",
  },
  {
    id: "solidaridad",
    title: "Solidaridad",
    line: "El logro de uno no se celebra si alguien se quedó atrás.",
    aula: "Parejas de apoyo con consigna clara, no “el que ya acabó ayuda”.",
  },
  {
    id: "paz",
    title: "Paz",
    line: "Resolver sin humillar. Reparar antes de castigar.",
    aula: "Rincón de calma y un guion de mediación de 4 pasos.",
  },
  {
    id: "empatia",
    title: "Empatía",
    line: "Preguntar cómo se siente el otro antes de opinar.",
    aula: "Lectura de un conflicto y dos versiones del mismo hecho.",
  },
  {
    id: "perseverancia",
    title: "Perseverancia",
    line: "Volver a intentar con una estrategia nueva, no con más de lo mismo.",
    aula: "Bitácora de reintentos: qué cambié la segunda vez.",
  },
  {
    id: "gratitud",
    title: "Gratitud",
    line: "Nombrar lo que otras personas hacen posible en la escuela.",
    aula: "Tarjeta semanal a intendencia, patio o familia.",
  },
];

export const FAQ = [
  {
    q: "¿La IA reemplaza mi planeación?",
    a: "No. Genera un borrador. Tú decides, recortas y anclas al grupo real. La autonomía profesional se queda en ti.",
  },
  {
    q: "¿Puedo subir datos de mis estudiantes?",
    a: "No subas nombres, fotos ni calificaciones. Describe el grupo en términos generales: tamaño, ritmos, apoyos.",
  },
  {
    q: "¿Está alineado a la NEM?",
    a: "Las herramientas hablan de fases, campos formativos, PDA y evaluación formativa. Siempre contrastá con el programa sintético vigente.",
  },
  {
    q: "¿Necesito cuenta @jaliscoedu.mx?",
    a: "En esta versión de demostración el perfil vive en tu dispositivo. El alta institucional se gestiona con SEJ.",
  },
  {
    q: "¿Funciona sin internet?",
    a: "Puedes consultar rutas, gemas y documentos guardados. Generar con IA requiere conexión.",
  },
];

export const CONOCE_MODULOS = [
  {
    id: "que-es",
    title: "Qué es (y qué no es) la IA",
    body: "Un modelo de lenguaje predice texto plausible, no “entiende” a tu grupo. Es un asistente rápido, no un experto de tu escuela.",
  },
  {
    id: "aula",
    title: "Usos responsables en el aula",
    body: "Borradores de planeación, rúbricas, adaptaciones y preguntas. Nunca calificación automática sin tu criterio, nunca datos personales.",
  },
  {
    id: "sesgos",
    title: "Sesgos y alucinaciones",
    body: "Puede inventar leyes, PDA o autores. Si no puedes citarlo en un documento oficial, verifícalo. Desconfía de lo demasiado redondo.",
  },
  {
    id: "estudiantes",
    title: "Cuando el alumnado la usa",
    body: "Enséñales a declarar el uso, contrastar fuentes y reescribir con su voz. El producto final debe poder explicarse en voz alta.",
  },
];

export const APRENDER_STEPS = [
  {
    n: 1,
    title: "Empieza por el grupo, no por la herramienta",
    body: "Antes de pedir una planeación, anota fase, campo, cuántos son y qué ya intentaste. La IA trabaja mejor con contexto real.",
  },
  {
    n: 2,
    title: "Pide un borrador, no un destino",
    body: "Usa verbos como “propón”, “bosqueja”, “dame tres opciones”. Luego recorta. Si aceptas el primer texto, dejas de enseñar.",
  },
  {
    n: 3,
    title: "Revisa PDA y tiempos",
    body: "Contrasta con el programa sintético. Ajusta minutos a tu receso, tu patio y tu material real. Nada de laboratorios imaginarios.",
  },
  {
    n: 4,
    title: "Cierra con evidencia",
    body: "Toda secuencia necesita algo observable: un escrito, un croquis, una explicación oral. Si no hay evidencia, no hay evaluación.",
  },
];

export const KIT_TOOLS = [
  {
    id: "diagnostico",
    title: "Diagnóstico inicial",
    hint: "Conoce tu punto de partida",
    gema: "diagnostico" as const,
    prompt: undefined as string | undefined,
    tone: "cyan" as const,
  },
  {
    id: "planeacion",
    title: "Planeación didáctica",
    hint: "Organiza actividades y secuencias",
    gema: "planeacion" as const,
    prompt: undefined as string | undefined,
    tone: "violet" as const,
  },
  {
    id: "leo",
    title: "Programa LEO",
    hint: "Lectura que te acompaña",
    gema: "leo" as const,
    prompt: undefined as string | undefined,
    tone: "green" as const,
  },
  {
    id: "proyectos",
    title: "Proyectos integradores",
    hint: "Saberes que conectan aprendizajes",
    gema: undefined as "diagnostico" | "programa" | "planeacion" | "evaluacion" | "leo" | undefined,
    prompt:
      "Diseña un proyecto integrador situado en Jalisco. Pregúntame por fase, campos formativos, PDA, contexto comunitario, duración y recursos antes de proponer el reto, productos y evaluación.",
    tone: "amber" as const,
  },
  {
    id: "matematicas",
    title: "Matemáticas",
    hint: "Resuelve y explica de forma clara",
    gema: undefined as "diagnostico" | "programa" | "planeacion" | "evaluacion" | "leo" | undefined,
    prompt:
      "Ayúdame a diseñar una experiencia de matemáticas. Pregúntame por fase, PDA, saber previo, error frecuente y materiales disponibles. Después propón un reto contextualizado, estrategias y evidencia de aprendizaje.",
    tone: "rose" as const,
  },
  {
    id: "evaluacion",
    title: "Evaluación",
    hint: "Retroalimentación con propósito",
    gema: "evaluacion" as const,
    prompt: undefined as string | undefined,
    tone: "violet" as const,
  },
];

export const DIAG_QUESTIONS = [
  {
    id: "fase",
    q: "¿En qué fase impartes principalmente?",
    options: FASES.map((f) => ({ id: f.id, label: f.label })),
  },
  {
    id: "grupo",
    q: "¿De qué tamaño es tu grupo?",
    options: [
      { id: "chico", label: "Hasta 20" },
      { id: "medio", label: "21 a 35" },
      { id: "grande", label: "Más de 35" },
    ],
  },
  {
    id: "nee",
    q: "¿Cuántos estudiantes requieren apoyos específicos?",
    options: [
      { id: "ninguno", label: "Ninguno identificado aún" },
      { id: "pocos", label: "1 a 3" },
      { id: "varios", label: "4 o más" },
    ],
  },
  {
    id: "dispositivos",
    q: "¿Cómo está el acceso a dispositivos en tu aula?",
    options: [
      { id: "nulo", label: "Casi nulo" },
      { id: "docente", label: "Solo el mío" },
      { id: "aula", label: "Aula de medios / algunos tablets" },
      { id: "1a1", label: "La mayoría trae o hay kit" },
    ],
  },
  {
    id: "confianza",
    q: "¿Qué tan cómoda/o te sientes usando IA para planeación?",
    options: [
      { id: "inicio", label: "Apenas empiezo" },
      { id: "pruebo", label: "Ya probé un par de veces" },
      { id: "uso", label: "La uso cada semana" },
    ],
  },
  {
    id: "tiempo",
    q: "¿Cuánto tiempo real tienes para planear en la semana?",
    options: [
      { id: "escaso", label: "Menos de 2 horas" },
      { id: "justo", label: "2 a 4 horas" },
      { id: "holgado", label: "Más de 4 horas" },
    ],
  },
  {
    id: "reto",
    q: "Hoy, ¿cuál es tu principal reto?",
    options: [
      { id: "diversidad", label: "Atender la diversidad del grupo" },
      { id: "tiempo", label: "El tiempo de planeación" },
      { id: "eval", label: "Evaluar sin solo examinar" },
      { id: "convivencia", label: "Convivencia y carácter" },
    ],
  },
  {
    id: "meta",
    q: "¿Qué quieres lograr este ciclo con IA?",
    options: [
      { id: "aligerar", label: "Aligerar la carga de planeación" },
      { id: "mejorar", label: "Mejorar la calidad de las clases" },
      { id: "incluir", label: "Incluir mejor a quien más lo necesita" },
      { id: "formar", label: "Formarme con criterio, sin moda" },
    ],
  },
];
