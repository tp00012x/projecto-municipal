import Image from "next/image";

import { getProposalSummary } from "~/lib/proposal-utils";
import type { Proposal } from "~/types/proposal";

type ProposalCardProps = {
  proposal: Proposal;
  isSelected: boolean;
  commentCount: number;
  onOpen: (id: string) => void;
};

export default function ProposalCard({
  proposal,
  isSelected,
  commentCount,
  onOpen,
}: ProposalCardProps) {
  const summary = getProposalSummary(proposal, 120);

  return (
    <article
      className={`proposal-card ${isSelected ? "is-selected" : ""}`.trim()}
    >
      <button
        aria-label={`Abrir propuesta ${proposal.numero}: ${proposal.titulo}`}
        className="proposal-card-main"
        onClick={() => onOpen(proposal.id)}
        type="button"
      >
        <div className="proposal-card-media proposal-image-container">
          <Image
            alt={proposal.imageAlt}
            className="proposal-card-image"
            fill
            loading="lazy"
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
            src={proposal.image}
            style={{
              objectFit: "cover",
              objectPosition: proposal.imagePosition,
            }}
          />
          <span className="proposal-card-number">
            {String(proposal.numero).padStart(2, "0")}
          </span>
        </div>
        <div className="proposal-card-body">
          <span className="proposal-card-category">{proposal.categoria}</span>
          <h3 className="proposal-card__title">{proposal.titulo}</h3>
          <p className="proposal-card__description">{summary}</p>
        </div>
      </button>

      <div className="proposal-card-footer">
        <button
          className="button button-outline proposal-card-action"
          onClick={() => onOpen(proposal.id)}
          type="button"
        >
          Ver propuesta
        </button>
      </div>

      {commentCount > 0 ? (
        <span className="proposal-card-comments">
          {commentCount} {commentCount === 1 ? "aporte" : "aportes"}
        </span>
      ) : null}
    </article>
  );
}
