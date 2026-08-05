export const siteConfig = {
  name: "Micky Ruiz",
  candidate: "Micky Ruiz",
  role: "Candidato a la Alcaldía de Pueblo Libre",
  affiliation: "Partido Morado",
  slogan: "Pueblo Libre para todos!",
  description:
    "Plataforma informativa para explorar las propuestas del Plan de Gobierno Municipal 2027–2030 y registrar aportes ciudadanos.",
  email: "contacto@pueblolibre2030.pe",
};

/** Campaign brand assets sourced from original artwork / Recursos de marca originales */
export const brandAssets = {
  banner: {
    src: "/brand/campaign-banner.jpg",
    width: 850,
    height: 139,
    alt: "Logo de campaña de Micky Ruiz con el eslogan Pueblo Libre para todos sobre fondo morado.",
  },
  partidoMorado: {
    src: "/brand/partido-morado.png",
    width: 540,
    height: 540,
    alt: "Logo oficial del Partido Morado",
  },
  /** Left crop ratio of the banner for the compact M icon / Recorte izquierdo para el ícono M */
  iconCropWidth: 118,
} as const;

/**
 * Hero composition contract
 * -------------------------
 * Layers (bottom → top):
 *   1. still image (poster / fallback)
 *   2. video (optional; reveals only when playback starts)
 *   3. scrim (left copy readability)
 *   4. copy column (left safe zone)
 */
export const heroMedia = {
  image: {
    src: "/gallery/equipo-gestion.jpg",
    alt: "Micky Ruiz junto al equipo de campaña en Pueblo Libre",
    width: 2400,
    height: 1350,
    focalX: 50,
    focalY: 22,
  },
  video: {
    src: "/videos/reel-micky-ruiz-web.mp4",
    type: "video/mp4" as const,
    orientation: "portrait" as const,
    objectPositionX: 50,
    objectPositionY: 26,
  },
};

/**
 * City Council Members / Regidores Municipales
 * Per-photo framing tuned for the carousel frame / Encuadre ajustado por regidor
 */
export const councilMembers = [
  {
    id: 1,
    name: "Angela Nessy Valdivia Murgueytio",
    position: "Regidora",
    number: 1,
    src: "/team/regidora-1-angela-valdivia.png",
    alt: "Angela Nessy Valdivia Murgueytio - Regidora #1",
    objectPosition: "50% 18%",
    imageScale: 1,
  },
  {
    id: 2,
    name: "Hermai Alfaro Roncal",
    position: "Regidor",
    number: 2,
    src: "/team/regidor-2-hermai-alfaro.png",
    alt: "Hermai Alfaro Roncal - Regidor #2",
    objectPosition: "50% 22%",
    imageScale: 1,
  },
  {
    id: 3,
    name: "Sonia Eloisa Montes Ccaccro",
    position: "Regidora",
    number: 3,
    src: "/team/regidora-3-sonia-montes-v2.png",
    alt: "Sonia Eloisa Montes Ccaccro - Regidora #3",
    objectPosition: "50% 22%",
    imageScale: 1,
  },
  {
    id: 5,
    name: "Nicole Milene Cordero Téllez",
    position: "Regidora",
    number: 5,
    src: "/team/regidora-5-nicole-cordero-v2.png",
    alt: "Nicole Milene Cordero Téllez - Regidora #5",
    objectPosition: "50% 24%",
    imageScale: 1,
  },
  {
    id: 7,
    name: "Sara Rita Rodriguez Cordova",
    position: "Regidora",
    number: 7,
    src: "/team/regidora-7-sara-rodriguez.png",
    alt: "Sara Rita Rodriguez Cordova - Regidora #7",
    objectPosition: "50% 40%",
    imageScale: 0.94,
  },
  {
    id: 8,
    name: "Leonardo Alcedo",
    position: "Regidor",
    number: 8,
    src: "/team/regidor-8-leonardo-alcedo.png",
    alt: "Leonardo Alcedo - Regidor #8",
    objectPosition: "50% 38%",
    imageScale: 0.95,
  },
  {
    id: 9,
    name: "Sandra Alexandra Legua Blotte",
    position: "Regidora",
    number: 9,
    src: "/team/regidora-9-sandra-legua.png",
    alt: "Sandra Alexandra Legua Blotte - Regidora #9",
    objectPosition: "50% 44%",
    imageScale: 0.93,
  },
  {
    id: 11,
    name: "Paola Milene Tellez Rosas",
    position: "Regidora",
    number: 11,
    src: "/team/regidora-11-paola-tellez.png",
    alt: "Paola Milene Tellez Rosas - Regidora #11",
    objectPosition: "50% 20%",
    imageScale: 1,
  },
];

/** Vision section copy / Textos de la sección de visión distrital */
export const visionSectionCopy = {
  eyebrow: "Visión de desarrollo distrital",
  title: "Nuestro camino hacia un mejor Pueblo Libre",
  description:
    "Un camino conectado para transformar Pueblo Libre con innovación, inclusión y gestión eficiente. Siete prioridades que construyen bienestar para hoy y oportunidades para siempre.",
} as const;

export const visionPriorityOrder = [6, 10, 11, 14, 16, 21, 22] as const;

export type VisionCardTheme = "purple" | "yellow" | "light" | "dark";
export type VisionLinkTone = "yellow" | "purple";
export type VisionIconTone = "purple" | "yellow" | "light" | "dark";

/** Vision cards: imagery, theme and summaries / Tarjetas de visión */
export const visionPriorityCards: Record<
  number,
  {
    theme: VisionCardTheme;
    linkTone: VisionLinkTone;
    iconTone: VisionIconTone;
    summary: string;
    src: string;
    alt: string;
    objectPosition: string;
    width: number;
    height: number;
  }
> = {
  6: {
    theme: "purple",
    linkTone: "yellow",
    iconTone: "purple",
    summary:
      "Más prevención, tecnología y respuesta para un distrito más seguro.",
    src: "/gallery/vision/seguridad-06.png",
    alt: "Patrullaje y prevención comunitaria para un Pueblo Libre más seguro",
    objectPosition: "50% 35%",
    width: 681,
    height: 1024,
  },
  10: {
    theme: "yellow",
    linkTone: "purple",
    iconTone: "yellow",
    summary:
      "Impulsamos el talento, el emprendimiento y la transformación digital.",
    src: "/gallery/vision/innovacion-10.png",
    alt: "Emprendimiento e innovación tecnológica para transformar Pueblo Libre",
    objectPosition: "50% 30%",
    width: 682,
    height: 1024,
  },
  11: {
    theme: "light",
    linkTone: "purple",
    iconTone: "light",
    summary:
      "Más oportunidades para jóvenes y familias, con capacitación y bolsas de trabajo.",
    src: "/gallery/vision/empleo-11.png",
    alt: "Jóvenes y familias accediendo a oportunidades de empleo en Pueblo Libre",
    objectPosition: "50% 30%",
    width: 682,
    height: 1024,
  },
  14: {
    theme: "dark",
    linkTone: "yellow",
    iconTone: "dark",
    summary:
      "Conectamos mejor el distrito con transporte sostenible e inteligente.",
    src: "/gallery/vision/movilidad-14.png",
    alt: "Transporte sostenible y conectividad urbana en las calles de Pueblo Libre",
    objectPosition: "50% 35%",
    width: 681,
    height: 1024,
  },
  16: {
    theme: "purple",
    linkTone: "yellow",
    iconTone: "purple",
    summary:
      "Más áreas verdes y acciones que cuidan nuestro ambiente y calidad de vida.",
    src: "/gallery/vision/sostenibilidad-16.png",
    alt: "Áreas verdes y acciones ambientales para una Pueblo Libre sostenible",
    objectPosition: "50% 35%",
    width: 681,
    height: 1024,
  },
  21: {
    theme: "yellow",
    linkTone: "purple",
    iconTone: "yellow",
    summary:
      "Gestión abierta y control ciudadano para recuperar la confianza de todos.",
    src: "/gallery/vision/transparencia-21.png",
    alt: "Participación ciudadana y gestión transparente con vecinos de Pueblo Libre",
    objectPosition: "50% 30%",
    width: 681,
    height: 1024,
  },
  22: {
    theme: "light",
    linkTone: "purple",
    iconTone: "light",
    summary:
      "Trámites simples, rápidos y 100% en línea, al alcance de todos.",
    src: "/gallery/vision/gobierno-digital-22.png",
    alt: "Servicios municipales digitales y trámites en línea para Pueblo Libre",
    objectPosition: "50% 30%",
    width: 681,
    height: 1024,
  },
};

export const galleryImages = [
  {
    src: "/gallery/equipo-gestion.jpg",
    alt: "Micky Ruiz junto al equipo en Pueblo Libre",
    caption: "Equipo y trabajo territorial",
  },
  {
    src: "/gallery/equipo-inclusion.jpg",
    alt: "Micky Ruiz conversando con vecinos de Pueblo Libre",
    caption: "Escucha e inclusión",
  },
  {
    src: "/gallery/equipo-comunidad.jpg",
    alt: "Equipo de trabajo junto a una mascota",
    caption: "Comunidad y bienestar",
  },
  {
    src: "/gallery/equipo-mascotas.jpg",
    alt: "Micky Ruiz, su equipo y una mascota en un parque",
    caption: "Espacio público compartido",
  },
];
