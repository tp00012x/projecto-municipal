import proposalsData from "../data/propuestas.json" with { type: "json" };

/**
 * Former public slugs for renamed proposals. Destinations always come from
 * the explicit `slug` in propuestas.json so redirects cannot drift or loop.
 *
 * @type {Record<string, string[]>}
 */
const LEGACY_SLUGS_BY_ID = {
  "propuesta-09": [
    "09-remodelacion-de-complejos-deportivos-y-creacion-del-coliseo-deportivo-mu",
    "09-remodelacion-de-complejos-deportivos-y-creacion-del-coliseo-deportivo-multifuncional-mama-ocllo",
  ],
  "propuesta-10": [
    "10-hub-distrital-centro-de-innovacion-emprendimiento-y-desarrollo-empresari",
    "10-hub-distrital-centro-de-innovacion-emprendimiento-y-desarrollo-empresarial-de-pueblo-libre",
  ],
};

/** Former Propuesta 24 URL (renovación urbana) → canonical saneamiento legal (301). */
const LEGACY_301_SLUGS_BY_ID = {
  "propuesta-24": ["24-programa-de-renovacion-urbana-integral-mi-peru"],
};

/**
 * Next.js redirects for legacy proposal slugs (308 permanent).
 *
 * @type {Array<
 *   | { source: string, destination: string, permanent: true }
 *   | { source: string, destination: string, statusCode: 301 }
 * >}
 */
export const proposalSlugRedirects = Object.entries(LEGACY_SLUGS_BY_ID).flatMap(
  ([id, legacySlugs]) => {
    const proposal = proposalsData.find((item) => item.id === id);
    const currentSlug = proposal?.slug;
    if (!currentSlug) {
      throw new Error(`Missing explicit slug for ${id}`);
    }

    const destination = `/propuestas/${currentSlug}`;

    return legacySlugs.flatMap((slug) => {
      if (slug === currentSlug) return [];
      return [
        {
          source: `/propuestas/${slug}`,
          destination,
          permanent: true,
        },
      ];
    });
  },
);

/** @type {301} */
const LEGACY_301_STATUS = 301;

const legacy301Redirects = Object.entries(LEGACY_301_SLUGS_BY_ID).flatMap(
  ([id, legacySlugs]) => {
    const proposal = proposalsData.find((item) => item.id === id);
    const currentSlug = proposal?.slug;
    if (!currentSlug) {
      throw new Error(`Missing explicit slug for ${id}`);
    }

    const destination = `/propuestas/${currentSlug}`;

    return legacySlugs.flatMap((slug) => {
      if (slug === currentSlug) return [];
      return [
        {
          source: `/propuestas/${slug}`,
          destination,
          statusCode: LEGACY_301_STATUS,
        },
      ];
    });
  },
);

proposalSlugRedirects.push(...legacy301Redirects);
