"use client";

import { useEffect, useMemo, useState } from "react";
import type { CommentCounts, Proposal } from "../types/proposal";
import MotionReveal from "./MotionReveal";

export default function ParticipationStats({
  proposals,
}: {
  proposals: Proposal[];
}) {
  const [counts, setCounts] = useState<CommentCounts>({});

  useEffect(() => {
    fetch("/api/comments")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload: { counts?: Record<string, number> }) => {
        const next: CommentCounts = {};
        Object.entries(payload.counts ?? {}).forEach(([key, value]) => {
          next[Number(key)] = value;
        });
        setCounts(next);
      })
      .catch(() => {
        // El módulo conserva el estado cero si la base aún está iniciándose.
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

