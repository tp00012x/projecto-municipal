"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, CloseIcon } from "~/components/Icons";
import { getProposalPath } from "~/lib/propuestas";
import {
  getBeneficiaryScope,
  getProposalSummary,
} from "~/lib/proposal-utils";
import type { Proposal } from "~/types/proposal";

type ProposalQuickViewProps = {
  proposal: Proposal;
  onClose: () => void;
};

function getDisplayTitle(title: string) {
  const trimmed = title.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("“") && trimmed.endsWith("”"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export default function ProposalQuickView({
  proposal,
  onClose,
}: ProposalQuickViewProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const fullPath = getProposalPath(proposal);
  const commentPath = `${fullPath}#participa`;
  const title = getDisplayTitle(proposal.titulo);
  const summary = getProposalSummary(proposal, 280);
  const audience = getBeneficiaryScope(proposal);

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
        <div className="quick-view-hero">
          <Image
            alt={proposal.imageAlt}
            className="quick-view-hero-image"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 560px"
            src={proposal.image}
            style={{
              objectFit: "cover",
              objectPosition: proposal.imagePosition,
            }}
          />
          <span aria-hidden="true" className="quick-view-hero-scrim" />
          <span className="quick-view-number">
            {String(proposal.numero).padStart(2, "0")}
          </span>
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

        <div className="quick-view-content">
          <p className="quick-view-category">{proposal.categoria}</p>
          <h3 id={`quick-view-title-${proposal.id}`}>{title}</h3>
          <p className="quick-view-summary">{summary}</p>
          {audience ? (
            <p className="quick-view-audience">
              <span>Para</span> {audience}
            </p>
          ) : null}
        </div>

        <footer className="quick-view-actions">
          <Link
            className="button button-purple"
            href={fullPath}
            onClick={onClose}
          >
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
