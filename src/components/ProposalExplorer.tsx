"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";

import EmptyState from "~/components/proposals/EmptyState";
import ErrorState from "~/components/proposals/ErrorState";
import LoadingState from "~/components/proposals/LoadingState";
import ProposalDetail from "~/components/proposals/ProposalDetail";
import ProposalFilters from "~/components/proposals/ProposalFilters";
import ProposalGallery from "~/components/proposals/ProposalGallery";
import ProposalQuickView from "~/components/proposals/ProposalQuickView";
import ProposalSearch from "~/components/proposals/ProposalSearch";
import ProposalSort from "~/components/proposals/ProposalSort";
import type { CommentCounts, Proposal } from "~/types/proposal";
import {
  filterProposals,
  getCategoryCounts,
  persistSavedProposals,
  readSavedProposals,
  sortProposals,
  type SortOption,
} from "~/lib/proposal-utils";
import { api } from "~/trpc/react";

const storageKey = "pueblolibre-comments-v1";

function readStoredCounts(): CommentCounts {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const next: CommentCounts = {};
    Object.entries(parsed).forEach(([key, value]) => {
      const numberValue = Number(key);
      if (Number.isFinite(numberValue) && typeof value === "number" && value >= 0) {
        next[numberValue] = value;
      }
    });
    return next;
  } catch {
    return {};
  }
}

function persistCounts(counts: CommentCounts) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(counts));
  } catch {
    // La persistencia local es opcional si el navegador bloquea el almacenamiento.
  }
}

function mergeCounts(base: CommentCounts, incoming: CommentCounts): CommentCounts {
  const next: CommentCounts = { ...base };
  Object.entries(incoming).forEach(([key, value]) => {
    const numberValue = Number(key);
    next[numberValue] = (next[numberValue] ?? 0) + value;
  });
  return next;
}

function readFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

type ViewMode = "gallery" | "detail";

export default function ProposalExplorer({ proposals }: { proposals: Proposal[] }) {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [sortBy, setSortBy] = useState<SortOption>("numero");
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());
  const [counts, setCounts] = useState<CommentCounts>(() => readStoredCounts());

  const categories = useMemo(
    () => Array.from(new Set(proposals.map((item) => item.categoria))).sort((a, b) =>
      a.localeCompare(b, "es"),
    ),
    [proposals],
  );
  const categoryCounts = useMemo(() => getCategoryCounts(proposals), [proposals]);

  const countsQuery = api.comments.getCounts.useQuery(undefined, {
    retry: false,
  });
  const createComment = api.comments.create.useMutation();

  useEffect(() => {
    setMounted(true);
    setSavedIds(readSavedProposals());
  }, []);

  useEffect(() => {
    if (!countsQuery.data) return;
    const stored = readStoredCounts();
    const next: CommentCounts = {};
    Object.entries(countsQuery.data).forEach(([key, value]) => {
      next[Number(key)] = value;
    });
    const merged = mergeCounts(stored, next);
    setCounts(merged);
    persistCounts(merged);
  }, [countsQuery.data]);

  const filtered = useMemo(
    () => filterProposals(proposals, query, category),
    [category, proposals, query],
  );

  const sorted = useMemo(
    () => sortProposals(filtered, sortBy, counts),
    [counts, filtered, sortBy],
  );

  const quickViewProposal = sorted.find((item) => item.id === quickViewId) ?? null;
  const detailProposal =
    sorted.find((item) => item.id === detailId) ??
    proposals.find((item) => item.id === detailId) ??
    null;
  const detailIndex = detailProposal
    ? sorted.findIndex((item) => item.id === detailProposal.id)
    : -1;

  const hasCommentData =
    Object.values(counts).some((value) => value > 0) || Boolean(countsQuery.data);

  function openQuickView(id: string) {
    setQuickViewId(id);
    setViewMode("gallery");
  }

  function closeQuickView() {
    setQuickViewId(null);
  }

  function openDetail(id: string) {
    setDetailId(id);
    setQuickViewId(null);
    setViewMode("detail");
    document.getElementById("propuestas")?.scrollIntoView({ behavior: "smooth" });
  }

  function backToGallery() {
    setViewMode("gallery");
    setDetailId(null);
    setQuickViewId(null);
  }

  function openCommentFromQuickView(id: string) {
    openDetail(id);
    window.setTimeout(() => {
      document.getElementById("participa")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  }

  function navigateDetail(direction: -1 | 1) {
    if (!sorted.length || !detailProposal) return;
    const currentIndex = sorted.findIndex((item) => item.id === detailProposal.id);
    const nextIndex = (currentIndex + direction + sorted.length) % sorted.length;
    const nextProposal = sorted[nextIndex];
    if (!nextProposal) return;
    setDetailId(nextProposal.id);
    document.getElementById("propuestas")?.scrollIntoView({ behavior: "smooth" });
  }

  function resetFilters() {
    setQuery("");
    setCategory("Todas");
    setSortBy("numero");
  }

  function toggleSaved(id: string) {
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      persistSavedProposals(next);
      return next;
    });
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    const proposal = detailProposal ?? quickViewProposal;
    if (!proposal) {
      throw new Error("No hay una propuesta seleccionada.");
    }

    const formData = new FormData(event.currentTarget);
    const payload = await createComment.mutateAsync({
      proposalNumber: proposal.numero,
      name: readFormString(formData, "name"),
      email: readFormString(formData, "email"),
      comment: readFormString(formData, "comment"),
      acceptedTerms: formData.get("acceptedTerms") === "on",
    });

    const nextCounts = {
      ...counts,
      [proposal.numero]: payload.count,
    };
    setCounts(nextCounts);
    persistCounts(nextCounts);
    void countsQuery.refetch();

    return { message: payload.message };
  }

  if (!proposals.length) {
    return (
      <section className="section proposal-section" id="propuestas">
        <div className="shell">
          <EmptyState
            description="No hay propuestas disponibles en este momento."
            title="Sin propuestas para mostrar"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="section proposal-section" id="propuestas">
      <div className="shell">
        {viewMode === "gallery" ? (
          <>
            <div className="proposal-heading gallery-heading-block">
              <div>
                <p className="eyebrow">Galería de propuestas</p>
                <h2>
                  23 propuestas.
                  <span> Una lectura simple.</span>
                </h2>
              </div>
              <p>
                Explora, conoce y revisa las propuestas para construir un Pueblo
                Libre para todos.
              </p>
            </div>

            {countsQuery.isError ? (
              <ErrorState onRetry={() => void countsQuery.refetch()} />
            ) : null}

            <div className="gallery-controls">
              <ProposalSearch
                onChange={setQuery}
                onClear={() => setQuery("")}
                value={query}
              />
              <ProposalFilters
                activeCategory={category}
                categories={categories}
                counts={categoryCounts}
                onChange={setCategory}
                totalCount={proposals.length}
              />
            </div>

            <div className="gallery-toolbar">
              <p aria-live="polite" className="gallery-count">
                Mostrando {sorted.length}{" "}
                {sorted.length === 1 ? "propuesta" : "propuestas"}
              </p>
              <ProposalSort
                onChange={setSortBy}
                showCommentSort={hasCommentData}
                value={sortBy}
              />
            </div>

            {!mounted || countsQuery.isLoading ? (
              <LoadingState />
            ) : sorted.length ? (
              <ProposalGallery
                commentCounts={counts}
                onOpen={openQuickView}
                onToggleSave={toggleSaved}
                proposals={sorted}
                savedIds={savedIds}
                selectedId={quickViewId}
              />
            ) : (
              <EmptyState onReset={resetFilters} />
            )}
          </>
        ) : detailProposal ? (
          <ProposalDetail
            commentCount={counts[detailProposal.numero] ?? 0}
            index={Math.max(0, detailIndex)}
            onBack={backToGallery}
            onNavigate={navigateDetail}
            onSubmitComment={submitComment}
            proposal={detailProposal}
            total={sorted.length || 1}
          />
        ) : null}

        {quickViewProposal ? (
          <ProposalQuickView
            onClose={closeQuickView}
            onComment={openCommentFromQuickView}
            onOpenFull={openDetail}
            proposal={quickViewProposal}
          />
        ) : null}
      </div>
    </section>
  );
}
