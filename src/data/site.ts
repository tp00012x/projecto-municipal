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
    bio: "Angela, creció en el distrito, estudió en el colegio Canonesas de la Cruz y luego en la Universidad de Lima, cursó la carrera de Comunicaciones con especialidad en marketing, publicidad y comunicación corporativa, además es docente universitaria. Su experiencia académica y profesional le permite aportar una mirada estratégica y creativa a la gestión municipal y sabe que para gobernar primero hay que escuchar las necesidades reales de la comunidad. Su visión es clara: un Pueblo Libre con obras duraderas, bien hechas y con seguimiento permanente, que no se deterioren a los pocos meses ni queden en el abandono. Por eso, su compromiso como Regidora N.º 1 es garantizar que cada decisión municipal se tome con responsabilidad, transparencia y pensando en el bienestar de todos.",
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
    bio: "Hermai, un vecino como nosotros, con raíces que abrazan la diversidad y la fuerza de nuestro Perú. Del temple de Cajamarca y la firmeza del Cusco por sus abuelos, creció con la fuerza de Puno, para luego llegar a nuestro querido Pueblo Libre. A orillas del Titicaca, se formó como Ecólogo en la Universidad Nacional del Altiplano. Aprendió que la naturaleza y la vida humana deben convivir en equilibrio. Y esa visión es la que trae al distrito. Como presidente de uno de los comités vecinales del Sector 7, escucha a los vecinos y ha visto una realidad que no podemos seguir ignorando: nuestro distrito crece hacia arriba, pero se queda sin aire. Coincide en que Pueblo Libre no necesita más cemento a ciegas; necesita equilibrio, pulmones verdes y gestión con sentido común. Hermai es ecólogo, dirigente vecinal y, sobre todo, un vecino dispuesto a defender nuestro derecho a vivir bien.",
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
    bio: "Sonia es socióloga y magister en Gerencia Social con especializaciones en marketing, investigación de mercados y gestión de proyectos. Cuenta con una amplia experiencia liderando proyectos en instituciones educativas y organizaciones de reconocido prestigio, aportando al desarrollo de iniciativas con impacto social y educativo. Ha dedicado parte de su vida al servicio de la comunidad, participado como voluntaria, llevando actividades artísticas y recreativas a niños, jóvenes y adultos en situación de vulnerabilidad, convencida de que el arte también transforma vidas.",
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
    bio: "Nicole estudió Economía y Negocios Internacionales, y cuenta con experiencia en licitaciones y comercio exterior. Actualmente se desempeña en la gestión de procesos de contrataciones públicas y privadas, aplicando su experiencia para contribuir al desarrollo de proyectos con eficiencia, responsabilidad y transparencia. Como vecina del Sector 2, conoce de cerca la realidad del distrito y las necesidades de sus vecinos. Cree en una gestión cercana, transparente y comprometida. Nicole, busca contribuir a la construcción de un distrito más seguro, con parques y áreas verdes recuperados y bien mantenidos, pistas y veredas en mejores condiciones y más espacios para fomentar el deporte y la integración de las familias. Aspira a un distrito ordenado, moderno y atractivo, del que los vecinos se sientan orgullosos y que vuelva a ser un referente para quienes lo visitan.",
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
    bio: "Sara cuenta con más de seis años de experiencia en Gestión Humana, actualmente se desempeña como Coordinadora de Incorporación y Onboarding en una empresa multinacional del sector de maquinaria pesada. A lo largo de su trayectoria, ha trabajado en distintas áreas de gestión de personas, desarrollando habilidades de liderazgo, organización, trabajo en equipo y gestión de talento. Esta experiencia le permite comprender cómo construir equipos sólidos, motivados y enfocados en resultados. Como regidora, su compromiso es aportar esa visión a la gestión municipal: Fortalecer la eficiencia y transparencia en los procesos internos de la municipalidad, impulsar una cultura de servicio cercano al vecino, donde cada decisión esté orientada a responder a sus necesidades reales y prioritarias. Buscará fomentar la participación y el bienestar comunitario, aplicando principios de gestión humana para que Pueblo Libre sea un distrito ordenado, moderno y humano. Esta convencida de que una gestión municipal exitosa no depende solo de normas y procedimientos, sino de personas comprometidas y motivadas que trabajen con responsabilidad y vocación de servicio.",
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
    bio: "Leonardo, es estudiante de Comunicación y Periodismo, además de creador de contenido y fotógrafo independiente. Su motivación para postularse como regidor nace de la convicción de que la política local necesita renovación, preparación y una visión moderna de la comunicación y la gestión. Como vecino del Sector 1, he estado cerca de las realidades de nuestro distrito, informando y registrando lo que ocurre en nuestras calles. Su compromiso es claro: Impulsar oportunidades laborales y de emprendimiento para los jóvenes de Pueblo Libre, potenciar la transparencia y la participación ciudadana mediante contenido digital de valor y registros fotográficos que acerquen la gestión municipal a los vecinos. Aspira a que Pueblo Libre sea un distrito ordenado, atractivo y lleno de oportunidades para todos.",
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
    bio: "Sandra es Geógrafa egresada de la Universidad Nacional Mayor de San Marcos, con especialidad en planificación urbana, catastro y ordenamiento territorial, lo cual nos ayudará para retomar la armonía en la convivencia del distrito. Participó en el voluntariado de Conservación de Flora y Fauna Silvestre y complementó sus estudios con una especialización en supervisión en medio ambiente y monitoreo ambiental. Además de cursos en sistemas de logística en el estado. Sandra desea que Pueblo Libre sea un distrito ordenado en lo urbano y seguro en lo social, que se gestione culturalmente, que sea reconocido y atractivo y se desarrolle de manera sostenible.",
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
    bio: "Paola es una vecina que vive y respira la realidad de Pueblo Libre. Contadora Pública con 20 años de experiencia y Conciliadora Familiar, entiende que el diálogo es el motor de una comunidad fuerte. Su vocación de servicio no nació con esta candidatura: como dirigente vecinal de la Zona 2, ya demostró su capacidad de gestión trabajando con la Municipalidad para instalar cámaras de seguridad, renovar la iluminación y recuperar áreas verdes. Su compromiso siempre se ha basado en el trabajo constante por su barrio. Hoy postula como Regidora para construir un distrito seguro, ordenado y moderno. Su gestión se enfocará en una fiscalización firme, la recuperación urgente de pistas y veredas, el respeto a la zonificación y la creación de oportunidades para jóvenes y emprendedores. Además, trabajará para revitalizar nuestros parques, huacas y espacios públicos, incluyendo zonas adecuadas para mascotas. Paola representa una política distinta: es la autoridad honesta y cercana que los vecinos merecen, dispuesta a escuchar, actuar y cumplir.",
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
