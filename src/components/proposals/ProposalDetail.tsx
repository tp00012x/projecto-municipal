"use client";

import { type FormEvent } from "react";
import Image from "next/image";

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "~/components/Icons";
import { dimensionCopy } from "~/lib/proposal-utils";
import type { Proposal } from "~/types/proposal";
import ProposalCommentForm from "./ProposalCommentForm";
import ProposalTextBlocks from "./ProposalTextBlocks";

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
        <div className="proposal-detail-image">
          <Image
            alt={proposal.imageAlt}
            className="proposal-detail-photo"
            fill
            loading="lazy"
            sizes="(max-width: 767px) 100vw, 900px"
            src={proposal.image}
            style={{
              objectFit: "cover",
              objectPosition: proposal.imagePosition,
            }}
          />
        </div>
        <div className="proposal-detail-intro">
          <div className="proposal-tags">
            <span>{proposal.dimension}</span>
            <span>{proposal.categoria}</span>
          </div>
          <span className="proposal-detail-number">
            Propuesta {String(proposal.numero).padStart(2, "0")}
          </span>
          <h3 className="proposal-detail__title">{proposal.titulo}</h3>
          <p className="proposal-detail__dimension">{dimensionCopy[proposal.dimension]}</p>
          {commentCount > 0 ? (
            <small className="proposal-detail-comments">
              {commentCount} {commentCount === 1 ? "aporte ciudadano" : "aportes ciudadanos"}
            </small>
          ) : null}
        </div>
      </div>

      <div className="proposal-detail-content">
        <section aria-labelledby={`detail-diagnostico-${proposal.id}`} className="proposal-detail-section">
          <h4 className="proposal-detail__section-title" id={`detail-diagnostico-${proposal.id}`}>
            Diagnóstico
          </h4>
          <ProposalTextBlocks blocks={proposal.diagnostico} />
        </section>

        <section aria-labelledby={`detail-objetivo-${proposal.id}`} className="proposal-detail-section">
          <h4 className="proposal-detail__section-title" id={`detail-objetivo-${proposal.id}`}>
            Objetivo
          </h4>
          <ProposalTextBlocks blocks={proposal.objetivo} />
        </section>

        <section aria-labelledby={`detail-acciones-${proposal.id}`} className="proposal-detail-section">
          <h4 className="proposal-detail__section-title" id={`detail-acciones-${proposal.id}`}>
            {proposal.acciones.length === 1 ? "Acción" : "Acciones"}
          </h4>
          <ol className="proposal-detail__list numbered-list">
            {proposal.acciones.map((item, actionIndex) => (
              <li key={`${proposal.id}-action-${actionIndex}`}>
                <span>{String(actionIndex + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby={`detail-presupuesto-${proposal.id}`} className="proposal-detail-section">
          <h4 className="proposal-detail__section-title" id={`detail-presupuesto-${proposal.id}`}>
            Presupuesto y viabilidad
          </h4>
          <div className="viability-card">
            <ProposalTextBlocks blocks={proposal.presupuesto} className="proposal-detail__text proposal-detail__text-light" />
            <small>
              Información atribuida al Plan de Gobierno Municipal 2027–2030. No
              constituye una evaluación independiente.
            </small>
          </div>
        </section>

        <section aria-labelledby={`detail-metas-${proposal.id}`} className="proposal-detail-section">
          <h4 className="proposal-detail__section-title" id={`detail-metas-${proposal.id}`}>
            Metas 2027-2030
          </h4>
          <ul className="proposal-detail__list check-list">
            {proposal.metas.map((item, metaIndex) => (
              <li key={`${proposal.id}-goal-${metaIndex}`}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
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
