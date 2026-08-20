"use client";

import { type FormEvent, useEffect, useState } from "react";

import ProposalCommentForm from "~/components/proposals/ProposalCommentForm";
import type { Proposal } from "~/types/proposal";
import { api } from "~/trpc/react";

function readFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

type ProposalParticipationProps = {
  proposal: Proposal;
};

/**
 * Comments live on the proposal URL page — one place to read + participate.
 */
export default function ProposalParticipation({
  proposal,
}: ProposalParticipationProps) {
  const [expandForm, setExpandForm] = useState(false);
  const createComment = api.comments.create.useMutation();

  useEffect(() => {
    if (window.location.hash.replace(/^#/, "") !== "participa") return;

    setExpandForm(true);
    window.requestAnimationFrame(() => {
      document.getElementById("participa")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const payload = await createComment.mutateAsync({
      proposalNumber: proposal.numero,
      name: readFormString(formData, "name"),
      email: readFormString(formData, "email"),
      comment: readFormString(formData, "comment"),
      acceptedTerms: formData.get("acceptedTerms") === "on",
    });

    return { message: payload.message };
  }

  return (
    <div className="proposal-page-participation">
      <ProposalCommentForm
        collapsed={!expandForm}
        onSubmit={submitComment}
        proposal={proposal}
      />
    </div>
  );
}
