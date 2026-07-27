"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  MessageIcon,
  SearchIcon,
} from "~/components/Icons";
import type { CommentCounts, Proposal } from "~/types/proposal";
import { api } from "~/trpc/react";

type DetailTab = "diagnostico" | "acciones" | "metas" | "viabilidad";
type FormState = {
  status: "idle" | "sending" | "success" | "error";
  message: string;
};

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

const tabs: Array<{ id: DetailTab; label: string }> = [
  { id: "diagnostico", label: "Diagnóstico y objetivo" },
  { id: "acciones", label: "Acciones" },
  { id: "metas", label: "Metas" },
  { id: "viabilidad", label: "Viabilidad" },
];

const dimensionCopy = {
  Social: "Bienestar e inclusión",
  Económica: "Desarrollo y oportunidades",
  Ambiental: "Ciudad y sostenibilidad",
  Institucional: "Gestión y transparencia",
};

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

export default function ProposalExplorer({ proposals }: { proposals: Proposal[] }) {
  const [activeId, setActiveId] = useState(proposals[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [dimension, setDimension] = useState("Todas");
  const [category, setCategory] = useState("Todas");
  const [activeTab, setActiveTab] = useState<DetailTab>("diagnostico");
  const [counts, setCounts] = useState<CommentCounts>(() => readStoredCounts());
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });

  const dimensions = useMemo(
    () => ["Todas", ...Array.from(new Set(proposals.map((item) => item.dimension)))],
    [proposals],
  );
  const categories = useMemo(
    () => ["Todas", ...Array.from(new Set(proposals.map((item) => item.categoria)))],
    [proposals],
  );

  const countsQuery = api.comments.getCounts.useQuery(undefined, {
    retry: false,
  });
  const createComment = api.comments.create.useMutation();

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

  const filtered = useMemo(() => {
    const needle = normalizeSearch(query.trim());
    return proposals.filter((proposal) => {
      const matchDimension =
        dimension === "Todas" || proposal.dimension === dimension;
      const matchCategory =
        category === "Todas" || proposal.categoria === category;
      const haystack = normalizeSearch(
        `${proposal.numero} ${proposal.titulo} ${proposal.categoria} ${proposal.diagnostico} ${proposal.objetivo}`,
      );
      return matchDimension && matchCategory && (!needle || haystack.includes(needle));
    });
  }, [category, dimension, proposals, query]);

  const active =
    filtered.find((proposal) => proposal.id === activeId) ??
    filtered[0] ??
    proposals[0];
  const activeIndex = Math.max(
    0,
    filtered.findIndex((proposal) => proposal.id === active?.id),
  );
  const totalComments = Object.values(counts).reduce((sum, count) => sum + count, 0);

  function selectProposal(id: string) {
    setActiveId(id);
    setActiveTab("diagnostico");
    setFormState({ status: "idle", message: "" });
  }

  function move(direction: -1 | 1) {
    if (!filtered.length) return;
    const nextIndex =
      (activeIndex + direction + filtered.length) % filtered.length;
    const nextProposal = filtered[nextIndex];
    if (!nextProposal) return;
    selectProposal(nextProposal.id);
  }

  function updateFilter(nextDimension: string, nextCategory: string) {
    setDimension(nextDimension);
    setCategory(nextCategory);
    const first = proposals.find(
      (proposal) =>
        (nextDimension === "Todas" || proposal.dimension === nextDimension) &&
        (nextCategory === "Todas" || proposal.categoria === nextCategory),
    );
    if (first) selectProposal(first.id);
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!active) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    setFormState({ status: "sending", message: "Enviando sugerencia…" });

    try {
      const payload = await createComment.mutateAsync({
        proposalNumber: active.numero,
        name: readFormString(formData, "name"),
        email: readFormString(formData, "email"),
        comment: readFormString(formData, "comment"),
        acceptedTerms: formData.get("acceptedTerms") === "on",
      });

      const nextCounts = {
        ...counts,
        [active.numero]: payload.count,
      };
      setCounts(nextCounts);
      persistCounts(nextCounts);
      void countsQuery.refetch();

      setFormState({
        status: "success",
        message: payload.message,
      });
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo enviar la sugerencia. Inténtalo de nuevo.";
      setFormState({
        status: "error",
        message,
      });
    }
  }

  if (!active) return null;

  return (
    <section className="section proposal-section" id="propuestas">
      <div className="shell">
        <div className="proposal-heading">
          <div>
            <p className="eyebrow">Explorador interactivo</p>
            <h2>
              23 propuestas.
              <span> Una lectura simple.</span>
            </h2>
          </div>
          <p>
            Filtra, busca y revisa cada ficha. Los textos sintetizan los campos
            del documento fuente sin reemplazar su lectura integral.
          </p>
        </div>

        <div className="filter-bar" aria-label="Filtros de propuestas">
          <label className="search-field">
            <span className="sr-only">Buscar propuestas</span>
            <SearchIcon />
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por tema, meta o palabra clave"
              type="search"
              value={query}
            />
          </label>
          <label>
            <span>Dimensión</span>
            <select
              onChange={(event) => updateFilter(event.target.value, category)}
              value={dimension}
            >
              {dimensions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Categoría</span>
            <select
              onChange={(event) => updateFilter(dimension, event.target.value)}
              value={category}
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="explorer-shell">
          <aside className="proposal-list-panel" aria-label="Lista de propuestas">
            <div className="list-panel-head">
              <span>{filtered.length} resultados</span>
              <span>{totalComments} aportes</span>
            </div>
            <div className="proposal-list">
              {filtered.map((proposal) => (
                <button
                  aria-current={proposal.id === active.id ? "true" : undefined}
                  className={proposal.id === active.id ? "is-active" : ""}
                  key={proposal.id}
                  onClick={() => selectProposal(proposal.id)}
                  type="button"
                >
                  <span>{String(proposal.numero).padStart(2, "0")}</span>
                  <span>
                    <strong>{proposal.titulo}</strong>
                    <small>{proposal.categoria}</small>
                  </span>
                </button>
              ))}
              {!filtered.length ? (
                <div className="empty-state">
                  <SearchIcon />
                  <strong>No encontramos coincidencias</strong>
                  <p>Prueba otra palabra o restablece los filtros.</p>
                  <button
                    onClick={() => {
                      setQuery("");
                      updateFilter("Todas", "Todas");
                    }}
                    type="button"
                  >
                    Restablecer
                  </button>
                </div>
              ) : null}
            </div>
          </aside>

          <article className="proposal-detail" key={active.id}>
            <div className="proposal-progress">
              <span>
                Propuesta {String(active.numero).padStart(2, "0")} de 23
              </span>
              <span>{counts[active.numero] ?? 0} aportes</span>
              <div aria-hidden="true">
                <i style={{ width: `${(active.numero / 23) * 100}%` }} />
              </div>
            </div>

            <div className="proposal-title">
              <div className="proposal-number">{String(active.numero).padStart(2, "0")}</div>
              <div>
                <div className="proposal-tags">
                  <span>{active.dimension}</span>
                  <span>{active.categoria}</span>
                </div>
                <h3>{active.titulo}</h3>
                <p>{dimensionCopy[active.dimension]}</p>
              </div>
            </div>

            <div className="detail-tabs" role="tablist" aria-label="Contenido de la propuesta">
              {tabs.map((tab) => (
                <button
                  aria-controls={`panel-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                  id={`tab-${tab.id}`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              aria-labelledby={`tab-${activeTab}`}
              className="detail-panel"
              id={`panel-${activeTab}`}
              role="tabpanel"
            >
              {activeTab === "diagnostico" ? (
                <div className="diagnosis-grid">
                  <div>
                    <span>Diagnóstico</span>
                    <p>{active.diagnostico}</p>
                  </div>
                  <div>
                    <span>Objetivo</span>
                    <p>{active.objetivo}</p>
                  </div>
                </div>
              ) : null}

              {activeTab === "acciones" ? (
                <ol className="numbered-list">
                  {active.acciones.map((item, index) => (
                    <li key={`${active.id}-action-${index}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ol>
              ) : null}

              {activeTab === "metas" ? (
                <ul className="check-list">
                  {active.metas.map((item, index) => (
                    <li key={`${active.id}-goal-${index}`}>
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {activeTab === "viabilidad" ? (
                <div className="viability-card">
                  <span>Viabilidad y presupuesto declarados</span>
                  <p>{active.viabilidad}</p>
                  <small>
                    Información atribuida al Plan de Gobierno Municipal
                    2027–2030. No constituye una evaluación independiente.
                  </small>
                </div>
              ) : null}
            </div>

            <div className="proposal-navigation">
              <button onClick={() => move(-1)} type="button">
                <ArrowLeftIcon />
                Anterior
              </button>
              <span>
                {activeIndex + 1} / {filtered.length || 1}
              </span>
              <button onClick={() => move(1)} type="button">
                Siguiente
                <ArrowRightIcon />
              </button>
            </div>

            <div className="participation-card" id="participa">
              <div className="participation-intro">
                <span className="comment-icon">
                  <MessageIcon />
                </span>
                <div>
                  <p className="eyebrow">Participación ciudadana</p>
                  <h4>Comenta esta propuesta</h4>
                  <p>
                    Los aportes se registran para revisión. No se publican
                    automáticamente ni se utilizan con fines de campaña.
                  </p>
                </div>
              </div>

              <form onSubmit={submitComment}>
                <div className="form-row">
                  <label>
                    Nombre o alias
                    <input
                      autoComplete="nickname"
                      maxLength={50}
                      minLength={2}
                      name="name"
                      required
                    />
                  </label>
                  <label>
                    Correo <span>(opcional)</span>
                    <input autoComplete="email" name="email" type="email" />
                  </label>
                </div>
                <label>
                  Comentario o sugerencia
                  <textarea
                    maxLength={800}
                    minLength={20}
                    name="comment"
                    placeholder="Comparte una observación concreta sobre la propuesta…"
                    required
                    rows={5}
                  />
                </label>
                <label className="terms-field">
                  <input name="acceptedTerms" required type="checkbox" />
                  <span>
                    Acepto el aviso de participación y privacidad. Mi aporte
                    puede ser moderado para retirar insultos, datos sensibles o
                    publicidad.
                  </span>
                </label>
                <div className="form-footer">
                  <button
                    className="button button-purple"
                    disabled={formState.status === "sending"}
                    type="submit"
                  >
                    {formState.status === "sending"
                      ? "Enviando…"
                      : "Enviar sugerencia"}
                    <ArrowRightIcon />
                  </button>
                  <p
                    aria-live="polite"
                    className={`form-message ${formState.status}`}
                    role="status"
                  >
                    {formState.message}
                  </p>
                </div>
              </form>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
