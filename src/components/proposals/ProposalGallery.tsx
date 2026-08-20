"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-label="Galería de propuestas"
      className="proposal-gallery"
      role="list"
    >
      <AnimatePresence mode="popLayout">
        {proposals.map((proposal, index) => (
          <motion.div
            key={proposal.id}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            initial={
              reduceMotion ? false : { opacity: 0, y: 18 }
            }
            layout={!reduceMotion}
            role="listitem"
            transition={{
              duration: reduceMotion ? 0 : 0.38,
              delay: reduceMotion ? 0 : Math.min(index, 10) * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProposalCard
              commentCount={commentCounts[proposal.numero] ?? 0}
              isSelected={selectedId === proposal.id}
              onOpen={onOpen}
              proposal={proposal}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
