"use client";

import { useEffect, useMemo, useState } from "react";
import type { CommentCounts, Proposal } from "../types/proposal";
import MotionReveal from "./MotionReveal";

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

function mergeCounts(base: CommentCounts, incoming: CommentCounts) {
  return Object.fromEntries(
    Array.from(new Set([...Object.keys(base), ...Object.keys(incoming)])).map((key) => {
      const numberValue = Number(key);
      return [numberValue, (base[numberValue] ?? 0) + (incoming[numberValue] ?? 0)];
    }),
  ) as CommentCounts;
}

export default function ParticipationStats({
  proposals,
}: {
  proposals: Proposal[];
}) {
  const [counts, setCounts] = useState<CommentCounts>(() => readStoredCounts());

  useEffect(() => {
    const stored = readStoredCounts();
    fetch("/api/comments")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload: { counts?: Record<string, number> }) => {
        const next: CommentCounts = {};
        Object.entries(payload.counts ?? {}).forEach(([key, value]) => {
          next[Number(key)] = value;
        });
        const merged = mergeCounts(stored, next);
        setCounts(merged);
      })
      .catch(() => {
        // El módulo conserva el estado local si la base aún está iniciándose.
      });
  }, []);

  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const proposalsWithComments = Object.values(counts).filter((value) => value > 0).length;
  const top = useMemo(
    () =>
      proposals
        .map((proposal) => ({
          ...proposal,
          count: counts[proposal.numero] ?? 0,
        }))
        .sort((a, b) => b.count - a.count || a.numero - b.numero)
        .slice(0, 5),
    [counts, proposals],
  );
  const max = Math.max(1, ...top.map((proposal) => proposal.count));

  return (
    <section className="section stats-section" aria-labelledby="stats-title">
      <div className="shell stats-grid">
        <MotionReveal className="stats-copy">
          <p className="eyebrow light">Participación registrada</p>
          <h2 id="stats-title">La conversación también puede medirse.</h2>
          <p>
            Los indicadores muestran aportes recibidos por la plataforma. Los
            mensajes permanecen sujetos a moderación básica.
          </p>
          <div className="stats-numbers">
            <div>
              <strong>{total}</strong>
              <span>Aportes recibidos</span>
            </div>
            <div>
              <strong>{proposalsWithComments}</strong>
              <span>Propuestas comentadas</span>
            </div>
            <div>
              <strong>23</strong>
              <span>Fichas disponibles</span>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal className="stats-chart" delay={120}>
          <span className="chart-title">Participación por propuesta</span>
          {top.map((proposal) => (
            <div className="chart-row" key={proposal.id}>
              <span>{String(proposal.numero).padStart(2, "0")}</span>
              <div>
                <i style={{ width: `${(proposal.count / max) * 100}%` }} />
              </div>
              <strong>{proposal.count}</strong>
            </div>
          ))}
          <small>
            El gráfico se actualiza con los registros aceptados por el módulo.
          </small>
        </MotionReveal>
      </div>
    </section>
  );
}
