"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import type { CSSProperties } from "react";

import { CloseIcon } from "~/components/Icons";
import { campaignPromoModal } from "~/data/site";

const STORAGE_KEY = "pueblo-libre-promo-modal-v2";
const { intervalMs, slides } = campaignPromoModal;

type PromoSlide = (typeof slides)[number];

function hotspotStyle(slide: PromoSlide): CSSProperties {
  return {
    "--race-cta-top": `${(slide.hotspot.y / slide.height) * 100}%`,
    "--race-cta-left": `${(slide.hotspot.x / slide.width) * 100}%`,
    "--race-cta-width": `${(slide.hotspot.width / slide.width) * 100}%`,
    "--race-cta-height": `${(slide.hotspot.height / slide.height) * 100}%`,
  } as CSSProperties;
}

export default function CommunityRaceModal() {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
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
    if (!isOpen || isPaused || prefersReducedMotion || slides.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [isOpen, isPaused, prefersReducedMotion]);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = [
      ...dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => {
      if (element.closest("[inert]")) return false;
      if (element.getAttribute("tabindex") === "-1") return false;
      return true;
    });
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
  }, [isOpen, activeIndex]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="race-modal-overlay" role="presentation">
      <button
        aria-label="Cerrar avisos de campaña"
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
          aria-label="Cerrar avisos de campaña"
          className="race-modal__close"
          onClick={close}
          type="button"
        >
          <CloseIcon />
        </button>

        <h2 className="sr-only" id="race-modal-title">
          Avisos de campaña
        </h2>
        <p className="sr-only" id="race-modal-description">
          Carrera comunitaria el domingo 30 de agosto e encuesta virtual de
          Pueblo Libre. Pulsa la zona amarilla de cada aviso para continuar.
        </p>

        <div
          aria-label="Avisos de campaña"
          aria-roledescription="carrusel"
          className="race-modal__carousel"
          onBlurCapture={(event) => {
            const next = event.relatedTarget;
            if (next instanceof Node && event.currentTarget.contains(next)) {
              return;
            }
            setIsPaused(false);
          }}
          onFocusCapture={() => setIsPaused(true)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <figure
                aria-hidden={!isActive}
                className="race-modal__flyer"
                data-active={isActive}
                inert={!isActive}
                key={slide.id}
                style={hotspotStyle(slide)}
              >
                <Image
                  alt={slide.alt}
                  className="race-modal__flyer-image"
                  height={slide.height}
                  priority
                  src={slide.src}
                  unoptimized={slide.unoptimized}
                  width={slide.width}
                />
                <a
                  aria-label={slide.ctaLabel}
                  className="race-modal__cta"
                  href={slide.href}
                  rel="noopener noreferrer"
                  tabIndex={isActive ? 0 : -1}
                  target="_blank"
                >
                  <span className="sr-only">{slide.ctaLabel}</span>
                </a>
              </figure>
            );
          })}
        </div>

        {slides.length > 1 ? (
          <div
            aria-label="Elegir aviso"
            className="race-modal__dots"
            onBlurCapture={(event) => {
              const next = event.relatedTarget;
              if (next instanceof Node && event.currentTarget.contains(next)) {
                return;
              }
              setIsPaused(false);
            }}
            onFocusCapture={() => setIsPaused(true)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            role="tablist"
          >
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  aria-label={slide.ctaLabel}
                  aria-selected={isActive}
                  className={
                    isActive
                      ? "race-modal__dot race-modal__dot--active"
                      : "race-modal__dot"
                  }
                  key={slide.id}
                  onClick={() => setActiveIndex(index)}
                  role="tab"
                  type="button"
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
