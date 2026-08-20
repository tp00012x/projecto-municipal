import proposalsData from "~/data/propuestas.json";
import type { Proposal } from "~/types/proposal";

const proposals = proposalsData as Proposal[];

export function getAllProposals(): Proposal[] {
  return proposals;
}

export function slugifyProposalTitle(titulo: string) {
  return titulo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

/** Stable pretty slug: 01-centro-de-cuidado-diurno-manos-que-cuidan */
export function getProposalSlug(proposal: Proposal) {
  const num = String(proposal.numero).padStart(2, "0");
  const slug = slugifyProposalTitle(proposal.titulo);
  return `${num}-${slug}`;
}

export function getProposalPath(proposal: Proposal) {
  return `/propuestas/${getProposalSlug(proposal)}`;
}

export function getProposalBySlug(slug: string): Proposal | undefined {
  return proposals.find((proposal) => getProposalSlug(proposal) === slug);
}

export function getProposalById(id: string): Proposal | undefined {
  return proposals.find((proposal) => proposal.id === id);
}

export function getAdjacentProposals(proposal: Proposal) {
  const sorted = [...proposals].sort((a, b) => a.numero - b.numero);
  const index = sorted.findIndex((item) => item.id === proposal.id);
  return {
    prev: index > 0 ? sorted[index - 1] : undefined,
    next: index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : undefined,
    index,
    total: sorted.length,
  };
}
