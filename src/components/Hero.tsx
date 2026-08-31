"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import CampaignBanner from "~/components/CampaignBanner";
import { heroMedia, siteConfig } from "~/data/site";
import { startHeroPlayback, type HeroPlaybackState } from "~/lib/hero-playback";
import {
  ArrowRightIcon,
  VolumeIcon,
  VolumeOffIcon,
} from "./Icons";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playback, setPlayback] = useState<HeroPlaybackState>("poster");
  const { image, video } = heroMedia;
  const videoPlaying = playback === "playing";

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    let cancelled = false;

    const tryStart = () => {
      void startHeroPlayback(node).then((next) => {
        if (!cancelled) setPlayback(next);
      });
    };

    // Declarative autoplay attributes handle most browsers; this covers the
    // case where the element mounts before media is ready.
    node.addEventListener("canplay", tryStart, { once: true });
    tryStart();

    return () => {
      cancelled = true;
      node.removeEventListener("canplay", tryStart);
    };
  }, []);

  /**
   * Toggle hero video audio during the user click gesture.
   * Alternar audio del video hero durante el clic del usuario.
   *
   * Browsers only allow unmute when tied to a direct user action, so we update
   * the DOM synchronously before any async React state update.
   * Los navegadores solo permiten activar audio con una acción directa del usuario.
   */
  function toggleMute() {
    const node = videoRef.current;
    if (!node) return;

    const nextMuted = !node.muted;

    // Apply audio state immediately on the media element / Aplicar estado de audio al instante
    node.muted = nextMuted;
    node.defaultMuted = nextMuted;
    node.volume = 1;

    if (!nextMuted) {
      void node.play().then(() => {
        if (!node.paused) setPlayback("playing");
      });
    }

    setMuted(nextMuted);
  }

  return (
    <section
      className={`hero${videoPlaying ? " hero-has-video" : ""}`}
      id="inicio"
      aria-labelledby="hero-title"
      style={
        {
          "--hero-focal-x": `${image.focalX}%`,
          "--hero-focal-y": `${image.focalY}%`,
          "--hero-video-x": `${video.objectPositionX}%`,
          "--hero-video-y": `${video.objectPositionY}%`,
        } as CSSProperties
      }
    >
      <div className="hero-media" aria-hidden="true">
        <div className="hero-still">
          <Image
            alt={image.alt}
            className="hero-photo"
            fill
            priority
            sizes="100vw"
            src={image.src}
          />
        </div>

        <video
          autoPlay
          className={`hero-video${videoPlaying ? " is-ready" : ""}`}
          loop
          muted={muted}
          playsInline
          poster={image.src}
          preload="metadata"
          ref={videoRef}
        >
          <source src={video.src} type={video.type} />
        </video>

        <div className="hero-scrim" />
        <div className="hero-grid" />
      </div>

      <div className="hero-content shell">
        <div className="hero-copy">
          <CampaignBanner className="hero-brand-banner" priority />
          <p className="eyebrow light">
            {siteConfig.role} <span>•</span> {siteConfig.affiliation}
          </p>
          <h1 id="hero-title">
            {siteConfig.candidate}
            <span> — un plan de ciudad para {siteConfig.district}</span>
          </h1>
          <p className="hero-description">
            {siteConfig.proposalCount} propuestas del Plan Municipal 2027–2030:
            diagnóstico, objetivos, acciones, metas y viabilidad, explicados con
            claridad para los vecinos de Pueblo Libre.
          </p>
          <div className="hero-actions">
            <button className="button button-yellow" type="button">
              Tu voz cuenta en Pueblo Libre
              <ArrowRightIcon />
            </button>
            <a className="button button-glass" href="#presentacion">
              Conocer a {siteConfig.candidate}
            </a>
          </div>
        </div>
      </div>

      <div className="hero-utility shell">
        {playback !== "unavailable" ? (
          <button
            aria-pressed={!muted}
            className={`sound-button${muted ? "" : " is-live"}`}
            onClick={toggleMute}
            type="button"
          >
            <span className="sound-button-icon" aria-hidden="true">
              {muted ? <VolumeOffIcon /> : <VolumeIcon />}
              {!muted ? <span className="sound-pulse" /> : null}
            </span>
            {muted ? "Activar sonido" : "Sonido activado"}
          </button>
        ) : null}
      </div>
    </section>
  );
}
