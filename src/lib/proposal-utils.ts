import type { Proposal } from "~/types/proposal";

export type SortOption = "numero" | "titulo" | "categoria" | "comentadas";

export const dimensionCopy = {
  Social: "Bienestar e inclusión",
  Económica: "Desarrollo y oportunidades",
  Ambiental: "Ciudad y sostenibilidad",
  Institucional: "Gestión y transparencia",
} as const;

export function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

export function getProposalTextBlocks(value: string | string[]) {
  const blocks = (Array.isArray(value) ? value : [value])
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.length ? blocks : [""];
}

export function joinProposalText(value: string | string[]) {
  return getProposalTextBlocks(value).join(" ");
}

export function getProposalSummary(proposal: Proposal, maxLength = 140) {
  const source = joinProposalText(proposal.objetivo);
  if (source.length <= maxLength) return source;

  const truncated = source.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const safeCut = lastSpace > 80 ? truncated.slice(0, lastSpace) : truncated;
  return `${safeCut}…`;
}

export function getPrimaryBenefit(proposal: Proposal) {
  return proposal.metas[0] ?? joinProposalText(proposal.objetivo);
}

export function getBeneficiaryScope(proposal: Proposal) {
  const objective = joinProposalText(proposal.objetivo).toLocaleLowerCase("es");
  const patterns = [
    /adultos mayores/,
    /personas con discapacidad/,
    /jóvenes/,
    /niños/,
    /familias/,
    /mascotas/,
    /emprendedores/,
    /vecinos/,
    /ciudadan/i,
  ];

  for (const pattern of patterns) {
    const match = objective.match(pattern);
    if (match) {
      return match[0].charAt(0).toUpperCase() + match[0].slice(1);
    }
  }

  return dimensionCopy[proposal.dimension];
}

export function filterProposals(
  proposals: Proposal[],
  query: string,
  category: string,
) {
  const needle = normalizeSearch(query.trim());

  return proposals.filter((proposal) => {
    const matchCategory =
      category === "Todas" || proposal.categoria === category;
    const haystack = normalizeSearch(
      [
        proposal.numero,
        proposal.titulo,
        proposal.categoria,
        proposal.dimension,
        ...getProposalTextBlocks(proposal.diagnostico),
        ...getProposalTextBlocks(proposal.objetivo),
        ...proposal.metas,
        ...proposal.acciones,
        ...getProposalTextBlocks(proposal.presupuesto),
      ].join(" "),
    );

    return matchCategory && (!needle || haystack.includes(needle));
  });
}

export function sortProposals(
  proposals: Proposal[],
  sortBy: SortOption,
  commentCounts: Record<number, number>,
) {
  const next = [...proposals];

  switch (sortBy) {
    case "titulo":
      return next.sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));
    case "categoria":
      return next.sort((a, b) => {
        const categoryCompare = a.categoria.localeCompare(b.categoria, "es");
        return categoryCompare !== 0
          ? categoryCompare
          : a.numero - b.numero;
      });
    case "comentadas":
      return next.sort((a, b) => {
        const diff =
          (commentCounts[b.numero] ?? 0) - (commentCounts[a.numero] ?? 0);
        return diff !== 0 ? diff : a.numero - b.numero;
      });
    case "numero":
    default:
      return next.sort((a, b) => a.numero - b.numero);
  }
}

export function getCategoryCounts(proposals: Proposal[]) {
  return proposals.reduce<Record<string, number>>((acc, proposal) => {
    acc[proposal.categoria] = (acc[proposal.categoria] ?? 0) + 1;
    return acc;
  }, {});
}
