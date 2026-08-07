"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import MotionReveal from "~/components/MotionReveal";
import TeamMemberProfile from "~/components/TeamMemberProfile";
import { councilMembers } from "~/data/site";

/** Auto-advance interval in ms / Intervalo de avance automático en ms */
const AUTOPLAY_MS = 2500;

/** Close delay to prevent flicker / Retraso de cierre para evitar parpadeos */
const CLOSE_DELAY_MS = 220;

/** Mobile breakpoint aligned with site styles / Breakpoint móvil alineado con estilos del sitio */
const MOBILE_QUERY = "(max-width: 767px)";

/**
 * Team Gallery Component with Carousel / Componente de Galería de Equipo con Carrusel
 *
 * - Horizontal scroll on the container (not scrollIntoView on the page)
 * - Scroll horizontal en el contenedor (no scrollIntoView en la página)
 * - Auto-advance "ruleta" with pause on hover or manual interaction
 * - Avance automático tipo ruleta con pausa al interactuar
 * - Hover/focus profile popover for each council member card
 * - Perfil emergente al pasar el cursor o recibir foco por teclado
 */
export default function TeamGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeProfileIndex, setActiveProfileIndex] = useState<number | null>(
    null,
  );
  const [isMobile, setIsMobile] = useState(false);
  const [mobileProfileDismissed, setMobileProfileDismissed] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openProfile = useCallback(
    (index: number) => {
      clearCloseTimer();
      setActiveProfileIndex(index);
    },
    [clearCloseTimer],
  );

  const scheduleClose = useCallback(() => {
    if (isMobile) return;

    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveProfileIndex(null);
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer, isMobile]);

  const closeProfile = useCallback(() => {
    clearCloseTimer();
    if (isMobile) {
      setMobileProfileDismissed(true);
      return;
    }
    setActiveProfileIndex(null);
  }, [clearCloseTimer, isMobile]);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const syncMobile = () => setIsMobile(media.matches);
    syncMobile();
    media.addEventListener("change", syncMobile);
    return () => media.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    setMobileProfileDismissed(false);
  }, [currentSlide]);

  useEffect(() => {
    if (!isMobile || mobileProfileDismissed) return;
    setActiveProfileIndex(currentSlide);
  }, [currentSlide, isMobile, mobileProfileDismissed]);

  useEffect(() => {
    if (activeProfileIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProfile();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeProfileIndex, closeProfile]);

  /**
   * Scroll the carousel container to a specific slide index.
   * Desplazar el contenedor del carrusel a un slide específico.
   */
  const goToSlide = useCallback((index: number, smooth = true) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll<HTMLElement>(".team-carousel-slide");
    const slide = slides[index];
    if (!slide) return;

    const targetLeft =
      slide.offsetLeft - (container.clientWidth - slide.clientWidth) / 2;

    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: smooth ? "smooth" : "auto",
    });

    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    const nextIndex = (currentSlide + 1) % councilMembers.length;
    goToSlide(nextIndex);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex =
      currentSlide === 0 ? councilMembers.length - 1 : currentSlide - 1;
    goToSlide(prevIndex);
  }, [currentSlide, goToSlide]);

  /** Sync active dot while the user swipes / Sincronizar punto activo al deslizar */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slides = container.querySelectorAll<HTMLElement>(".team-carousel-slide");
      const containerCenter = container.scrollLeft + container.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      slides.forEach((slide, index) => {
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const distance = Math.abs(containerCenter - slideCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCurrentSlide(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Auto-advance carousel like a "ruleta" / Avance automático tipo ruleta
   * Pauses while hovered or after manual navigation.
   */
  useEffect(() => {
    if (isPaused || activeProfileIndex !== null) return;

    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextIndex = (prev + 1) % councilMembers.length;
        const container = scrollContainerRef.current;
        if (container) {
          const slides =
            container.querySelectorAll<HTMLElement>(".team-carousel-slide");
          const slide = slides[nextIndex];
          if (slide) {
            const targetLeft =
              slide.offsetLeft -
              (container.clientWidth - slide.clientWidth) / 2;
            container.scrollTo({
              left: Math.max(0, targetLeft),
              behavior: "auto",
            });
          }
        }
        return nextIndex;
      });
    }, AUTOPLAY_MS);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, activeProfileIndex]);

  const handleManualNav = (action: () => void) => {
    setIsPaused(true);
    action();
    window.setTimeout(() => setIsPaused(false), AUTOPLAY_MS * 2);
  };

  const activeMember =
    activeProfileIndex !== null ? councilMembers[activeProfileIndex] : null;
  const activeAnchor =
    activeProfileIndex !== null
      ? (cardRefs.current[activeProfileIndex] ?? null)
      : null;

  return (
    <section className="section gallery-section" id="equipo">
      <div className="shell">
        <MotionReveal className="gallery-heading gallery-heading-team">
          <div className="gallery-heading-copy">
            <p className="eyebrow vision-eyebrow">
              <span aria-hidden="true" />
              Nuestro Equipo
            </p>
            <h2 className="vision-title">
              <span className="gallery-heading-line">
                Un alcalde no gobierna solo;{" "}
              </span>
              <span className="gallery-heading-accent">
                gobierna con el mejor equipo al servicio de nuestra gente.
              </span>
            </h2>
          </div>
          <p className="vision-description gallery-heading-support">
            “Conoce a los regidores que conforman nuestra lista municipal y que
            trabajarán junto a la comunidad para transformar Pueblo Libre.”
          </p>
        </MotionReveal>

        <div
          className="team-carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="team-carousel-container"
            ref={scrollContainerRef}
            role="region"
            aria-label="Carrusel de regidores"
            aria-live="polite"
          >
            {councilMembers.map((member, index) => (
              <div
                key={member.id}
                className="team-carousel-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} de ${councilMembers.length}`}
              >
                <div
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className="team-card"
                  tabIndex={0}
                  aria-describedby={
                    activeProfileIndex === index
                      ? `team-profile-${member.id}`
                      : undefined
                  }
                  onMouseEnter={() => openProfile(index)}
                  onMouseLeave={scheduleClose}
                  onFocus={() => openProfile(index)}
                  onBlur={(event) => {
                    const nextTarget = event.relatedTarget as Node | null;
                    if (
                      nextTarget &&
                      event.currentTarget.contains(nextTarget)
                    ) {
                      return;
                    }
                    scheduleClose();
                  }}
                >
                  <div className="team-card-image">
                    <div
                      className="team-card-photo-frame"
                      style={
                        {
                          "--photo-position": member.objectPosition,
                          "--photo-scale": member.imageScale,
                        } as CSSProperties
                      }
                    >
                      <Image
                        key={member.src}
                        alt={member.alt}
                        fill
                        loading={index < 2 ? "eager" : "lazy"}
                        sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 30vw"
                        src={member.src}
                        className="team-card-photo"
                      />
                    </div>
                  </div>
                  <div className="team-card-info">
                    <p className="team-card-role">
                      {member.position} #{member.number}
                    </p>
                    <h3 className="team-card-title">{member.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-button carousel-button-prev"
            onClick={() => handleManualNav(prevSlide)}
            aria-label="Ver regidor anterior"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="carousel-button carousel-button-next"
            onClick={() => handleManualNav(nextSlide)}
            aria-label="Ver siguiente regidor"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div
            className="carousel-pagination"
            role="tablist"
            aria-label="Navegación de regidores"
          >
            {councilMembers.map((member, index) => (
              <button
                key={member.id}
                className={`carousel-dot${index === currentSlide ? " active" : ""}`}
                onClick={() => handleManualNav(() => goToSlide(index))}
                aria-label={`Ir a ${member.position} ${member.number}: ${member.name}`}
                aria-selected={index === currentSlide}
                role="tab"
                type="button"
              />
            ))}
          </div>
        </div>
      </div>

      {activeMember ? (
        <TeamMemberProfile
          member={activeMember}
          anchorEl={activeAnchor}
          isMobile={isMobile}
          onPointerEnter={clearCloseTimer}
          onPointerLeave={scheduleClose}
        />
      ) : null}
    </section>
  );
}
