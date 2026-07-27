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
