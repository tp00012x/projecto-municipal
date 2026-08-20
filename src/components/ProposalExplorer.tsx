"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import EmptyState from "~/components/proposals/EmptyState";
import ErrorState from "~/components/proposals/ErrorState";
import LoadingState from "~/components/proposals/LoadingState";
import ProposalFilters from "~/components/proposals/ProposalFilters";
import ProposalGallery from "~/components/proposals/ProposalGallery";
import ProposalQuickView from "~/components/proposals/ProposalQuickView";
import ProposalSearch from "~/components/proposals/ProposalSearch";
import ProposalSort from "~/components/proposals/ProposalSort";
import MotionReveal from "~/components/MotionReveal";
import type { CommentCounts, Proposal } from "~/types/proposal";
import {
  filterProposals,
  getCategoryCounts,
  sortProposals,
  type SortOption,
} from "~/lib/proposal-utils";
import { api } from "~/trpc/react";

const storageKey = "pueblolibre-comments-v1";
const sortOptions: SortOption[] = ["numero", "titulo", "categoria", "comentadas"];

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
    next[numberValue] = Math.max(next[numberValue] ?? 0, value);
  });
  return next;
}

function isSortOption(value: string | null): value is SortOption {
  return Boolean(value && sortOptions.includes(value as SortOption));
}

/**
 * Gallery + quick preview only.
 * Full read + comments live on /propuestas/[slug].
 */
export default function ProposalExplorer({ proposals }: { proposals: Proposal[] }) {
  const [mounted, setMounted] = useState(false);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [sortBy, setSortBy] = useState<SortOption>("numero");
  const [counts, setCounts] = useState<CommentCounts>(() => readStoredCounts());
  const [filtersReady, setFiltersReady] = useState(false);

  const categories = useMemo(
    () =>
      Array.from(new Set(proposals.map((item) => item.categoria))).sort((a, b) =>
        a.localeCompare(b, "es"),
      ),
    [proposals],
  );
  const categoryCounts = useMemo(() => getCategoryCounts(proposals), [proposals]);

  const countsQuery = api.comments.getCounts.useQuery(undefined, {
    retry: false,
  });

  useEffect(() => {
    setMounted(true);

    const params = new URLSearchParams(window.location.search);
    const nextQuery = params.get("q")?.trim() ?? "";
    const nextCategory = params.get("categoria")?.trim() || "Todas";
    const nextSort = params.get("orden");

    if (nextQuery) setQuery(nextQuery);
    if (
      nextCategory === "Todas" ||
      categories.includes(nextCategory)
    ) {
      setCategory(nextCategory);
    }
    if (isSortOption(nextSort)) setSortBy(nextSort);

    setFiltersReady(true);

    const hasShareState =
      Boolean(nextQuery) ||
      (nextCategory && nextCategory !== "Todas") ||
      isSortOption(nextSort);

    if (hasShareState && !window.location.hash) {
      window.requestAnimationFrame(() => {
        document.getElementById("propuestas")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [categories]);

  useEffect(() => {
    if (!mounted || !filtersReady) return;

    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set("q", query.trim());
    else url.searchParams.delete("q");

    if (category !== "Todas") url.searchParams.set("categoria", category);
    else url.searchParams.delete("categoria");

    if (sortBy !== "numero") url.searchParams.set("orden", sortBy);
    else url.searchParams.delete("orden");

    const next = `${url.pathname}${url.search}${url.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next !== current) {
      window.history.replaceState(null, "", next);
    }
  }, [category, filtersReady, mounted, query, sortBy]);

  useEffect(() => {
    if (!mounted) return;

    function openFromHash() {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash.startsWith("propuesta-")) return;

      const proposal = proposals.find((item) => item.id === hash);
      if (!proposal) return;

      setQuickViewId(proposal.id);
      window.requestAnimationFrame(() => {
        document.getElementById("propuestas")?.scrollIntoView({ behavior: "smooth" });
      });
    }

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [mounted, proposals]);

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

  const quickViewProposal =
    proposals.find((item) => item.id === quickViewId) ??
    sorted.find((item) => item.id === quickViewId) ??
    null;

  const hasCommentData =
    Object.values(counts).some((value) => value > 0) || Boolean(countsQuery.data);

  function openQuickView(id: string) {
    setQuickViewId(id);
  }

  function closeQuickView() {
    setQuickViewId(null);
  }

  function resetFilters() {
    setQuery("");
    setCategory("Todas");
    setSortBy("numero");
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
        <MotionReveal className="proposal-heading gallery-heading-block">
          <div>
            <p className="eyebrow">Galería de propuestas</p>
            <h2>
              24 propuestas.
              <span> Claras. Accionables.</span>
            </h2>
          </div>
          <p>
            Elige una propuesta, mira el resumen y entra a la ficha completa
            cuando quieras profundizar.
          </p>
        </MotionReveal>

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
            Mostrando{" "}
            <span className="gallery-count-number" key={sorted.length}>
              {sorted.length}
            </span>{" "}
            {sorted.length === 1 ? "propuesta" : "propuestas"}
          </p>
          <ProposalSort
            onChange={setSortBy}
            showCommentSort={hasCommentData}
            value={sortBy}
          />
        </div>

        {!mounted ? (
          <LoadingState />
        ) : sorted.length ? (
          <ProposalGallery
            commentCounts={counts}
            onOpen={openQuickView}
            proposals={sorted}
            selectedId={quickViewId}
          />
        ) : (
          <EmptyState onReset={resetFilters} />
        )}

        <AnimatePresence>
          {quickViewProposal ? (
            <ProposalQuickView
              key={quickViewProposal.id}
              onClose={closeQuickView}
              proposal={quickViewProposal}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
