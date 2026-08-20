"use client";

import { type FormEvent, useEffect, useState } from "react";

import { ArrowRightIcon, MessageIcon } from "~/components/Icons";
import type { Proposal } from "~/types/proposal";

type FormState = {
  status: "idle" | "sending" | "success" | "error";
  message: string;
};

type ProposalCommentFormProps = {
  proposal: Proposal;
  collapsed?: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<{ message: string }>;
};

export default function ProposalCommentForm({
  proposal,
  collapsed = false,
  onSubmit,
}: ProposalCommentFormProps) {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });
  const [isOpen, setIsOpen] = useState(!collapsed);

  useEffect(() => {
    if (!collapsed) setIsOpen(true);
  }, [collapsed]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormState({ status: "sending", message: "Enviando sugerencia…" });

    try {
      const payload = await onSubmit(event);
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

  return (
    <div className="participation-card" id="participa">
      <div className="participation-intro">
        <span className="comment-icon">
          <MessageIcon />
        </span>
        <div>
          <p className="eyebrow">Participación ciudadana</p>
          <h4>Comenta esta propuesta</h4>
          <p>
            Los aportes se registran para revisión. No se publican automáticamente
            ni se utilizan con fines de campaña.
          </p>
        </div>
      </div>

      {collapsed ? (
        <button
          aria-controls={`comment-form-${proposal.id}`}
          aria-expanded={isOpen}
          className="button button-outline comment-toggle"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? "Ocultar formulario" : "Comentar esta propuesta"}
        </button>
      ) : null}

      {isOpen ? (
        <form id={`comment-form-${proposal.id}`} onSubmit={handleSubmit}>
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
              Acepto el aviso de participación y privacidad. Mi aporte puede ser
              moderado para retirar insultos, datos sensibles o publicidad.
            </span>
          </label>
          <div className="form-footer">
            <button
              className="button button-purple"
              disabled={formState.status === "sending"}
              type="submit"
            >
              {formState.status === "sending" ? "Enviando…" : "Enviar sugerencia"}
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
      ) : null}
    </div>
  );
}
