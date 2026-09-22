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

/** Retired proposals — no detail page; 301 to the gallery for SEO. */
const RETIRED_PROPOSAL_SLUGS = [
  "24-programa-de-renovacion-urbana-integral-mi-peru",
];

/**
 * Next.js redirects for legacy proposal slugs (308) and retired proposals (301).
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
const RETIRED_REDIRECT_STATUS = 301;

const retiredProposalRedirects = RETIRED_PROPOSAL_SLUGS.map((slug) => ({
  source: `/propuestas/${slug}`,
  destination: "/propuestas",
  statusCode: RETIRED_REDIRECT_STATUS,
}));

proposalSlugRedirects.push(...retiredProposalRedirects);
