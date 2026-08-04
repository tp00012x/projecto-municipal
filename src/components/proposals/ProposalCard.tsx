import { BookmarkIcon } from "~/components/Icons";
import { getProposalSummary } from "~/lib/proposal-utils";
import type { Proposal } from "~/types/proposal";
import CategoryVisual from "./CategoryVisual";

type ProposalCardProps = {
  proposal: Proposal;
  isSelected: boolean;
  isSaved: boolean;
  commentCount: number;
  onOpen: (id: string) => void;
  onToggleSave: (id: string) => void;
};

export default function ProposalCard({
  proposal,
  isSelected,
  isSaved,
  commentCount,
  onOpen,
  onToggleSave,
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
        <div className="proposal-card-media">
          <CategoryVisual categoria={proposal.categoria} />
          <span className="proposal-card-number">
            {String(proposal.numero).padStart(2, "0")}
          </span>
        </div>
        <div className="proposal-card-body">
          <span className="proposal-card-category">{proposal.categoria}</span>
          <h3>{proposal.titulo}</h3>
          <p>{summary}</p>
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
        <button
          aria-label={
            isSaved
              ? `Quitar propuesta ${proposal.numero} de guardados`
              : `Guardar propuesta ${proposal.numero}`
          }
          aria-pressed={isSaved}
          className={`proposal-card-save ${isSaved ? "is-saved" : ""}`.trim()}
          onClick={() => onToggleSave(proposal.id)}
          type="button"
        >
          <BookmarkIcon />
          <span className="sr-only">
            {isSaved ? "Guardada" : "Guardar propuesta"}
          </span>
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
