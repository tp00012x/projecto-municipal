"use client";

import { useEffect, useRef, useState } from "react";
import { heroVideos } from "../data/site";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  VolumeIcon,
  VolumeOffIcon,
} from "./Icons";

export default function Hero() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideo = heroVideos[activeVideo];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  function advanceVideo() {
    if (heroVideos.length > 1) {
      setActiveVideo((current) => (current + 1) % heroVideos.length);
    }
  }

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <div className="hero-still" />
        {currentVideo ? (
          <video
            autoPlay
            className={videoReady ? "is-ready" : ""}
            key={currentVideo.src}
            loop={heroVideos.length < 2}
            muted={muted}
            onCanPlay={() => setVideoReady(true)}
            onEnded={advanceVideo}
            playsInline
            preload="metadata"
            ref={videoRef}
          >
            <source src={currentVideo.src} type={currentVideo.type} />
          </video>
        ) : null}
        <div className="hero-overlay" />
        <div className="hero-grid" />
      </div>

      <div className="hero-content shell">
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

      <div className="hero-utility shell">
        <button
          className="sound-button"
          disabled={!currentVideo}
          onClick={() => setMuted((current) => !current)}
          type="button"
        >
          {muted ? <VolumeIcon /> : <VolumeOffIcon />}
          {currentVideo
            ? muted
              ? "Activar sonido"
              : "Desactivar sonido"
            : "Video pendiente de carga"}
        </button>

        <a className="scroll-cue" href="#contexto">
          Desliza para explorar
          <ChevronDownIcon />
        </a>
      </div>
    </section>
  );
}

