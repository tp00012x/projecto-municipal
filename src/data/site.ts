export const siteConfig = {
  name: "Pueblo Libre 2027–2030",
  candidate: "Micky Ruiz",
  role: "Candidato a la Alcaldía de Pueblo Libre",
  affiliation: "Partido Morado",
  slogan: "Pueblo Libre para todos",
  description:
    "Plataforma informativa para explorar las propuestas del Plan de Gobierno Municipal 2027–2030 y registrar aportes ciudadanos.",
  email: "contacto@pueblolibre2030.pe",
};

/**
 * Hero composition contract
 * -------------------------
 * Layers (bottom → top):
 *   1. still image (poster / fallback)
 *   2. video (optional; reveals only when playback starts)
 *   3. scrim (left copy readability)
 *   4. copy column (left safe zone)
 *
 * Rules:
 * - Never translate/pan media to dodge text.
 * - Tune framing with focal/object-position tokens only.
 * - Copy width is capped so it does not invade the subject zone.
 * - Prefer a web-optimized video asset (faststart, reasonable bitrate).
 */
export const heroMedia = {
  image: {
    src: "/gallery/equipo-gestion.jpg",
    alt: "Micky Ruiz junto al equipo de campaña en Pueblo Libre",
    width: 2400,
    height: 1350,
    /** % of source image — subject anchor for object-position */
    focalX: 50,
    focalY: 22,
  },
  video: {
    src: "/videos/polideportivo-mama-ocllo-web.mp4",
    type: "video/mp4" as const,
    /** Portrait source shown with cover on landscape viewports */
    orientation: "portrait" as const,
    objectPositionX: 50,
    objectPositionY: 24,
  },
};

/**
 * City Council Members / Regidores Municipales
 * List of team members running for city council positions
 * Lista de miembros del equipo postulando a regidurías
 */
export const councilMembers = [
  {
    id: 1,
    name: "Angela Nessy Valdivia Murgueytio",
    position: "Regidora",
    number: 1,
    src: "/team/regidora-1-angela-valdivia.png",
    alt: "Angela Nessy Valdivia Murgueytio - Regidora #1",
  },
  {
    id: 2,
    name: "Hermai Alfaro Roncal",
    position: "Regidor",
    number: 2,
    src: "/team/regidor-2-hermai-alfaro.png",
    alt: "Hermai Alfaro Roncal - Regidor #2",
  },
  {
    id: 3,
    name: "Sonia Elena Montes Ccaccro",
    position: "Regidora",
    number: 3,
    src: "/team/regidora-3-sonia-montes.png",
    alt: "Sonia Elena Montes Ccaccro - Regidora #3",
  },
  {
    id: 5,
    name: "Nicole Milene Cordero Téllez",
    position: "Regidora",
    number: 5,
    src: "/team/regidora-5-nicole-cordero.png",
    alt: "Nicole Milene Cordero Téllez - Regidora #5",
  },
  {
    id: 7,
    name: "Sara Rita Rodriguez Cordova",
    position: "Regidora",
    number: 7,
    src: "/team/regidora-7-sara-rodriguez.png",
    alt: "Sara Rita Rodriguez Cordova - Regidora #7",
  },
  {
    id: 8,
    name: "Leonardo Alcedo",
    position: "Regidor",
    number: 8,
    src: "/team/regidor-8-leonardo-alcedo.png",
    alt: "Leonardo Alcedo - Regidor #8",
  },
  {
    id: 9,
    name: "Sandra Alexandra Legua Blotte",
    position: "Regidora",
    number: 9,
    src: "/team/regidora-9-sandra-legua.png",
    alt: "Sandra Alexandra Legua Blotte - Regidora #9",
  },
  {
    id: 11,
    name: "Paola Milene Tellez Rosas",
    position: "Regidora",
    number: 11,
    src: "/team/regidora-11-paola-tellez.png",
    alt: "Paola Milene Tellez Rosas - Regidora #11",
  },
];

/**
 * Legacy gallery images (kept for backwards compatibility)
 * Imágenes de galería heredadas (mantenidas para compatibilidad)
 */
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
