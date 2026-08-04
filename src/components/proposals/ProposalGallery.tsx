import type { Proposal } from "~/types/proposal";
import ProposalCard from "./ProposalCard";

type ProposalGalleryProps = {
  proposals: Proposal[];
  selectedId: string | null;
  savedIds: Set<string>;
  commentCounts: Record<number, number>;
  onOpen: (id: string) => void;
  onToggleSave: (id: string) => void;
};

export default function ProposalGallery({
  proposals,
  selectedId,
  savedIds,
  commentCounts,
  onOpen,
  onToggleSave,
}: ProposalGalleryProps) {
  return (
    <div aria-label="Galería de propuestas" className="proposal-gallery" role="list">
      {proposals.map((proposal) => (
        <div key={proposal.id} role="listitem">
          <ProposalCard
            commentCount={commentCounts[proposal.numero] ?? 0}
            isSaved={savedIds.has(proposal.id)}
            isSelected={selectedId === proposal.id}
            onOpen={onOpen}
            onToggleSave={onToggleSave}
            proposal={proposal}
          />
        </div>
      ))}
    </div>
  );
}
