import type { Proposal } from "~/types/proposal";
import ProposalCard from "./ProposalCard";

type ProposalGalleryProps = {
  proposals: Proposal[];
  selectedId: string | null;
  commentCounts: Record<number, number>;
  onOpen: (id: string) => void;
};

export default function ProposalGallery({
  proposals,
  selectedId,
  commentCounts,
  onOpen,
}: ProposalGalleryProps) {
  return (
    <div aria-label="Galería de propuestas" className="proposal-gallery" role="list">
      {proposals.map((proposal) => (
        <div key={proposal.id} role="listitem">
          <ProposalCard
            commentCount={commentCounts[proposal.numero] ?? 0}
            isSelected={selectedId === proposal.id}
            onOpen={onOpen}
            proposal={proposal}
          />
        </div>
      ))}
    </div>
  );
}
