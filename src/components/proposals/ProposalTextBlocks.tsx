import { getProposalTextBlocks } from "~/lib/proposal-utils";

type ProposalTextBlocksProps = {
  blocks: string | string[];
  className?: string;
};

export default function ProposalTextBlocks({
  blocks,
  className = "proposal-detail__text",
}: ProposalTextBlocksProps) {
  return (
    <div className={className}>
      {getProposalTextBlocks(blocks).map((block, index) => (
        <p key={`${block.slice(0, 24)}-${index}`}>{block}</p>
      ))}
    </div>
  );
}
