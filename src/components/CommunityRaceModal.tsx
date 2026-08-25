"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import type { CSSProperties } from "react";

import { CloseIcon } from "~/components/Icons";
import { communityRaceEvent } from "~/data/site";

const STORAGE_KEY = "pueblo-libre-race-modal-dismissed";

export default function CommunityRaceModal() {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    setMounted(true);
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    document.body.classList.add("race-modal-open");
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("race-modal-open");
      document.body.style.overflow = "";
    };
  }, [close, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleTab(event: KeyboardEvent) {
      if (event.key !== "Tab" || focusable.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    dialog.addEventListener("keydown", handleTab);
    return () => dialog.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const { flyer, registrationUrl, ctaLabel, registrationHotspot } =
    communityRaceEvent;

  return createPortal(
    <div className="race-modal-overlay" role="presentation">
      <button
        aria-label="Cerrar aviso de carrera comunitaria"
        className="race-modal-backdrop"
        onClick={close}
        type="button"
      />

      <div
        ref={dialogRef}
        aria-describedby="race-modal-description"
        aria-labelledby="race-modal-title"
        aria-modal="true"
        className="race-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          ref={closeButtonRef}
          aria-label="Cerrar aviso de carrera comunitaria"
          className="race-modal__close"
          onClick={close}
          type="button"
        >
          <CloseIcon />
        </button>

        <h2 className="sr-only" id="race-modal-title">
          Carrera comunitaria: Corre por un Pueblo Libre para todos
        </h2>
        <p className="sr-only" id="race-modal-description">
          Este domingo 30 de agosto a las 9:00 a. m. Inscríbete en el formulario
          oficial.
        </p>

        <figure
          className="race-modal__flyer"
          style={
            {
              aspectRatio: `${flyer.width} / ${flyer.height}`,
              "--race-cta-top": `${(registrationHotspot.y / flyer.height) * 100}%`,
              "--race-cta-left": `${(registrationHotspot.x / flyer.width) * 100}%`,
              "--race-cta-width": `${(registrationHotspot.width / flyer.width) * 100}%`,
              "--race-cta-height": `${(registrationHotspot.height / flyer.height) * 100}%`,
            } as CSSProperties
          }
        >
          <Image
            alt={flyer.alt}
            className="race-modal__flyer-image"
            fill
            priority
            sizes="(max-width: 699px) 96vw, 640px"
            src={flyer.src}
          />
          <a
            aria-label={ctaLabel}
            className="race-modal__cta"
            href={registrationUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="sr-only">{ctaLabel}</span>
          </a>
        </figure>
      </div>
    </div>,
    document.body,
  );
}
