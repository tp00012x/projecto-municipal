"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, CloseIcon } from "~/components/Icons";
import { getProposalPath } from "~/lib/propuestas";
import {
  dimensionCopy,
  getBeneficiaryScope,
  getPrimaryBenefit,
  getProposalSummary,
} from "~/lib/proposal-utils";
import type { Proposal } from "~/types/proposal";

type ProposalQuickViewProps = {
  proposal: Proposal;
  onClose: () => void;
};

export default function ProposalQuickView({
  proposal,
  onClose,
}: ProposalQuickViewProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const fullPath = getProposalPath(proposal);
  const commentPath = `${fullPath}#participa`;

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const summary = getProposalSummary(proposal, 200);
  const benefit = getPrimaryBenefit(proposal);
  const scope = getBeneficiaryScope(proposal);

  return (
    <div className="quick-view-overlay" role="presentation">
      <button
        aria-label="Cerrar ventana"
        className="quick-view-backdrop"
        onClick={onClose}
        type="button"
      />

      <div
        aria-labelledby={`quick-view-title-${proposal.id}`}
        aria-modal="true"
        className="quick-view-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="quick-view-header">
          <div className="quick-view-header-start">
            <span className="quick-view-badge">
              <span className="quick-view-number">
                {String(proposal.numero).padStart(2, "0")}
              </span>
              <span className="quick-view-category">{proposal.categoria}</span>
            </span>
          </div>

          <div className="quick-view-header-actions">
            <button
              aria-label="Cerrar"
              className="quick-view-close"
              onClick={onClose}
              ref={closeButtonRef}
              type="button"
            >
              <CloseIcon />
            </button>
          </div>
        </header>

        <div className="quick-view-content">
          <h3 id={`quick-view-title-${proposal.id}`}>{proposal.titulo}</h3>
          <p className="quick-view-dimension">{dimensionCopy[proposal.dimension]}</p>

          <div className="quick-view-visual proposal-preview-image">
            <Image
              alt={proposal.imageAlt}
              className="proposal-preview-photo"
              fill
              loading="lazy"
              sizes="(max-width: 767px) 100vw, 620px"
              src={proposal.image}
              style={{
                objectFit: "cover",
                objectPosition: proposal.imagePosition,
              }}
            />
          </div>

          <dl className="quick-view-meta">
            <div>
              <dt>Categoría</dt>
              <dd>{proposal.categoria}</dd>
            </div>
            <div>
              <dt>Beneficio principal</dt>
              <dd>{benefit}</dd>
            </div>
            <div>
              <dt>Alcance</dt>
              <dd>{scope}</dd>
            </div>
          </dl>

          <div className="quick-view-summary">
            <span>Resumen</span>
            <p>{summary}</p>
          </div>
        </div>

        <footer className="quick-view-actions">
          <Link className="button button-purple" href={fullPath} onClick={onClose}>
            Ver propuesta completa
            <ArrowRightIcon />
          </Link>
          <Link
            className="button button-outline"
            href={commentPath}
            onClick={onClose}
          >
            Comentar esta propuesta
          </Link>
        </footer>
      </div>
    </div>
  );
}
