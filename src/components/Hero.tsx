"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { heroMedia } from "~/data/site";
import {
  setHeroMuted,
  startHeroPlayback,
  type HeroPlaybackState,
} from "~/lib/hero-playback";
import {
  ArrowRightIcon,
  ChevronDownIcon,
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

  async function toggleMute() {
    const node = videoRef.current;
    const next = !muted;
    setMuted(next);
    if (node) {
      await setHeroMuted(node, next);
      if (!node.paused) setPlayback("playing");
    }
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
          preload="auto"
          ref={videoRef}
        >
          <source src={video.src} type={video.type} />
        </video>

        <div className="hero-scrim" />
        <div className="hero-grid" />
      </div>

      <div className="hero-content shell">
        <div className="hero-copy">
          <p className="eyebrow light">
            Plataforma informativa <span>•</span> Plan 2027–2030
          </p>
          <h1 id="hero-title">
            Un plan de ciudad,
            <span> explicado con claridad.</span>
          </h1>
          <p className="hero-description">
            Conoce el diagnóstico, los objetivos, las acciones, las metas y la
            viabilidad declarada de cada propuesta municipal.
          </p>
          <div className="hero-actions">
            <a className="button button-yellow" href="#propuestas">
              Explorar las 23 propuestas
              <ArrowRightIcon />
            </a>
            <a className="button button-glass" href="#contexto">
              Sobre esta plataforma
            </a>
          </div>
        </div>
      </div>

      <div className="hero-utility shell">
        {playback !== "unavailable" ? (
          <button className="sound-button" onClick={toggleMute} type="button">
            {muted ? <VolumeIcon /> : <VolumeOffIcon />}
            {muted ? "Activar sonido" : "Desactivar sonido"}
          </button>
        ) : (
          <span />
        )}

        <a className="scroll-cue" href="#contexto">
          Desliza para explorar
          <ChevronDownIcon />
        </a>
      </div>
    </section>
  );
}
