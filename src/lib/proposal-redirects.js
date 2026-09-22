import proposalsData from "../data/propuestas.json" with { type: "json" };

/**
 * Former public slugs for renamed proposals. Destinations come from the explicit
 * `slug` in propuestas.json so redirects cannot drift or loop.
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

/** Retired proposals — no detail page; send visitors to the gallery. */
const RETIRED_PROPOSAL_SLUGS = [
  "24-programa-de-renovacion-urbana-integral-mi-peru",
];

/**
 * @type {Array<{ source: string, destination: string, permanent: true }>}
 */
const renamedProposalRedirects = Object.entries(LEGACY_SLUGS_BY_ID).flatMap(
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

const retiredProposalRedirects = RETIRED_PROPOSAL_SLUGS.map((slug) => ({
  source: `/propuestas/${slug}`,
  destination: "/propuestas",
  permanent: true,
}));

/** Permanent (308) redirects for renamed and retired proposal URLs. */
export const proposalSlugRedirects = [
  ...renamedProposalRedirects,
  ...retiredProposalRedirects,
];
