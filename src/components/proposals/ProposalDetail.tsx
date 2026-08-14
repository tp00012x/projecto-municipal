"use client";

import { type FormEvent, useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "~/components/Icons";
import { dimensionCopy } from "~/lib/proposal-utils";
import type { Proposal } from "~/types/proposal";
import CategoryVisual from "./CategoryVisual";
import ProposalCommentForm from "./ProposalCommentForm";

type DetailSection = "diagnostico" | "acciones" | "metas" | "viabilidad";

const sections: Array<{ id: DetailSection; label: string }> = [
  { id: "diagnostico", label: "Diagnóstico y objetivo" },
  { id: "acciones", label: "Acciones" },
  { id: "metas", label: "Metas" },
  { id: "viabilidad", label: "Viabilidad" },
];

type ProposalDetailProps = {
  proposal: Proposal;
  index: number;
  total: number;
  commentCount: number;
  onBack: () => void;
  onNavigate: (direction: -1 | 1) => void;
  onSubmitComment: (event: FormEvent<HTMLFormElement>) => Promise<{ message: string }>;
};

export default function ProposalDetail({
  proposal,
  index,
  total,
  commentCount,
  onBack,
  onNavigate,
  onSubmitComment,
}: ProposalDetailProps) {
  const [activeSection, setActiveSection] = useState<DetailSection>("diagnostico");

  return (
    <article className="proposal-detail-full">
      <div className="proposal-detail-toolbar">
        <button className="detail-back-link" onClick={onBack} type="button">
          <ArrowLeftIcon />
          Volver a las 24 propuestas
        </button>
        <span>
          {index + 1} / {total}
        </span>
      </div>

      <div className="proposal-detail-hero">
        <CategoryVisual categoria={proposal.categoria} size="panel" />
        <div>
          <div className="proposal-tags">
            <span>{proposal.dimension}</span>
            <span>{proposal.categoria}</span>
          </div>
          <span className="proposal-detail-number">
            Propuesta {String(proposal.numero).padStart(2, "0")}
          </span>
          <h3>{proposal.titulo}</h3>
          <p>{dimensionCopy[proposal.dimension]}</p>
          {commentCount > 0 ? (
            <small className="proposal-detail-comments">
              {commentCount} {commentCount === 1 ? "aporte ciudadano" : "aportes ciudadanos"}
            </small>
          ) : null}
        </div>
      </div>

      <div className="detail-tabs" role="tablist" aria-label="Contenido de la propuesta">
        {sections.map((section) => (
          <button
            aria-controls={`detail-panel-${section.id}`}
            aria-selected={activeSection === section.id}
            id={`detail-tab-${section.id}`}
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            role="tab"
            type="button"
          >
            {section.label}
          </button>
        ))}
      </div>

      <div
        aria-labelledby={`detail-tab-${activeSection}`}
        className="detail-panel"
        id={`detail-panel-${activeSection}`}
        role="tabpanel"
      >
        {activeSection === "diagnostico" ? (
          <div className="detail-blocks">
            <div className="detail-block">
              <span>Diagnóstico</span>
              <p>{proposal.diagnostico}</p>
            </div>
            <div className="detail-block">
              <span>Objetivo</span>
              <p>{proposal.objetivo}</p>
            </div>
            <div className="detail-block detail-block-highlight">
              <span>Propuesta</span>
              <p>{proposal.acciones[0] ?? proposal.objetivo}</p>
            </div>
          </div>
        ) : null}

        {activeSection === "acciones" ? (
          <ol className="numbered-list">
            {proposal.acciones.map((item, actionIndex) => (
              <li key={`${proposal.id}-action-${actionIndex}`}>
                <span>{String(actionIndex + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        ) : null}

        {activeSection === "metas" ? (
          <ul className="check-list">
            {proposal.metas.map((item, metaIndex) => (
              <li key={`${proposal.id}-goal-${metaIndex}`}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {activeSection === "viabilidad" ? (
          <div className="viability-card">
            <span>Viabilidad y presupuesto declarados</span>
            <p>{proposal.viabilidad}</p>
            <small>
              Información atribuida al Plan de Gobierno Municipal 2027–2030. No
              constituye una evaluación independiente.
            </small>
          </div>
        ) : null}
      </div>

      <div className="proposal-navigation">
        <button onClick={() => onNavigate(-1)} type="button">
          <ArrowLeftIcon />
          Anterior
        </button>
        <span>
          {index + 1} / {total}
        </span>
        <button onClick={() => onNavigate(1)} type="button">
          Siguiente
          <ArrowRightIcon />
        </button>
      </div>

      <ProposalCommentForm
        collapsed
        onSubmit={onSubmitComment}
        proposal={proposal}
      />
    </article>
  );
}
