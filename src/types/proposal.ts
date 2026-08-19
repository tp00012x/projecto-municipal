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
  image: string;
  imageAlt: string;
  imagePosition: string;
  diagnostico: string[];
  objetivo: string[];
  acciones: string[];
  presupuesto: string[];
  metas: string[];
};

export type CommentCounts = Record<number, number>;
