import type { MetadataRoute } from "next";

import { getAllProposals, getProposalPath } from "~/lib/propuestas";
import { getSiteUrl } from "~/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: siteUrl,
    lastModified,
    changeFrequency: "weekly",
    priority: 1,
  };

  const gallery: MetadataRoute.Sitemap[number] = {
    url: `${siteUrl}/propuestas`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  };

  const proposalEntries: MetadataRoute.Sitemap = getAllProposals().map(
    (proposal) => ({
      url: `${siteUrl}${getProposalPath(proposal)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [home, gallery, ...proposalEntries];
}
