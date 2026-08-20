import { siteConfig, siteSeo } from "~/data/site";
import { getAllProposals, getProposalPath } from "~/lib/propuestas";
import { getProposalSummary } from "~/lib/proposal-utils";
import { getSiteUrl } from "~/lib/site-url";

export function buildSeoGraph() {
  const siteUrl = getSiteUrl();
  const proposals = getAllProposals();
  const personId = `${siteUrl}/#person-micky-ruiz`;
  const orgId = `${siteUrl}/#org-campana`;
  const websiteId = `${siteUrl}/#website`;

  const itemListElement = proposals.map((proposal, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    name: proposal.titulo,
    url: `${siteUrl}${getProposalPath(proposal)}`,
  }));

  const faqEntities = [...proposals]
    .sort((a, b) => a.numero - b.numero)
    .slice(0, 12)
    .map((proposal) => ({
      "@type": "Question" as const,
      name: `¿Qué propone Micky Ruiz sobre ${proposal.titulo}?`,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: getProposalSummary(proposal, 280),
      },
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteSeo.siteName,
        description: siteSeo.description,
        inLanguage: "es-PE",
        publisher: { "@id": orgId },
        about: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.candidate,
        jobTitle: siteConfig.role,
        email: siteConfig.email,
        affiliation: {
          "@type": "Organization",
          name: siteConfig.affiliation,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: `${siteConfig.district}, ${siteConfig.region}`,
        },
        url: siteUrl,
        description: siteConfig.description,
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteSeo.siteName,
        url: siteUrl,
        email: siteConfig.email,
        description: siteConfig.description,
        areaServed: {
          "@type": "AdministrativeArea",
          name: `${siteConfig.district}, ${siteConfig.region}`,
        },
      },
      {
        "@type": "ItemList",
        name: `${siteConfig.proposalCount} propuestas del Plan Municipal Pueblo Libre 2027–2030`,
        numberOfItems: proposals.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqEntities,
      },
      {
        "@type": "GovernmentService",
        name: "Propuestas municipales para Pueblo Libre 2027–2030",
        provider: { "@id": personId },
        areaServed: {
          "@type": "AdministrativeArea",
          name: `${siteConfig.district}, ${siteConfig.region}`,
        },
        description: siteSeo.description,
      },
    ],
  };
}
