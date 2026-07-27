export type ProposalDimension =
  | "Social"
  | "Económica"
  | "Ambiental"
  | "Institucional";

export type Proposal = {
  id: string;
  numero: number;
  titulo: string;
  categoria: string;
  dimension: ProposalDimension;
  diagnostico: string;
  objetivo: string;
  acciones: string[];
  metas: string[];
  viabilidad: string;
};

export type CommentCounts = Record<number, number>;

