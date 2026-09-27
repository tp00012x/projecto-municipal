export type ProposalDimension =
  | "Social"
  | "Económica"
  | "Ambiental"
  | "Institucional";

export type Proposal = {
  id: string;
  numero: number;
  titulo: string;
  /** Full public slug, including the number prefix. Overrides auto-generation. */
  slug?: string;
  /** Short copy for cards and previews; falls back to objetivo excerpt. */
  resumen?: string;
  seoTitle?: string;
  seoDescription?: string;
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
