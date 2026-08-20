"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

import { ArrowRightIcon, CloseIcon } from "~/components/Icons";
import { getDisplayTitle } from "~/lib/display-title";
import { getProposalPath } from "~/lib/propuestas";
import {
  getBeneficiaryScope,
  getProposalSummary,
} from "~/lib/proposal-utils";
import { runViewTransition } from "~/lib/view-transition";
import type { Proposal } from "~/types/proposal";

type ProposalQuickViewProps = {
  proposal: Proposal;
  onClose: () => void;
};

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((node) => !node.hasAttribute("disabled") && node.tabIndex !== -1);
}

export default function ProposalQuickView({
  proposal,
  onClose,
}: ProposalQuickViewProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const fullPath = getProposalPath(proposal);
  const commentPath = `${fullPath}#participa`;
  const title = getDisplayTitle(proposal.titulo);
  const summary = getProposalSummary(proposal, 280);
  const audience = getBeneficiaryScope(proposal);
  const transitionName = `proposal-image-${proposal.id}`;

  useEffect(() => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";
    document.body.classList.add("quick-view-open");

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = getFocusable(dialogRef.current);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.classList.remove("quick-view-open");
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    router.prefetch(fullPath);
  }, [fullPath, router]);

  function goTo(href: string) {
    runViewTransition(() => {
      router.push(href);
    });
  }

  return (
    <div className="quick-view-overlay" role="presentation">
      <motion.button
        animate={{ opacity: 1 }}
        aria-label="Cerrar ventana"
        className="quick-view-backdrop"
        exit={{ opacity: 0 }}
        initial={reduceMotion ? false : { opacity: 0 }}
        onClick={onClose}
        transition={{ duration: reduceMotion ? 0 : 0.22 }}
        type="button"
      />

      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        aria-labelledby={titleId}
        aria-modal="true"
        className="quick-view-modal"
        exit={
          reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }
        }
        initial={
          reduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }
        }
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
        transition={{
          duration: reduceMotion ? 0 : 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="quick-view-hero">
          <Image
            alt={proposal.imageAlt}
            className="quick-view-hero-image"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 560px"
            src={proposal.image}
            style={
              {
                objectFit: "cover",
                objectPosition: proposal.imagePosition,
                viewTransitionName: transitionName,
              } as CSSProperties
            }
          />
          <span aria-hidden="true" className="quick-view-hero-scrim" />
          <span className="quick-view-number">
            {String(proposal.numero).padStart(2, "0")}
          </span>
          <button
            aria-label="Cerrar"
            className="quick-view-close"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="quick-view-content">
          <p className="quick-view-category">{proposal.categoria}</p>
          <h3 id={titleId}>{title}</h3>
          <p className="quick-view-summary">{summary}</p>
          {audience ? (
            <p className="quick-view-audience">
              <span>Para</span> {audience}
            </p>
          ) : null}
        </div>

        <footer className="quick-view-actions">
          <button
            className="button button-purple"
            onClick={() => goTo(fullPath)}
            type="button"
          >
            Ver propuesta completa
            <ArrowRightIcon />
          </button>
          <button
            className="button button-outline"
            onClick={() => goTo(commentPath)}
            type="button"
          >
            Comentar esta propuesta
          </button>
        </footer>
      </motion.div>
    </div>
  );
}
