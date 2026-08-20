"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CheckIcon, LinkIcon, ShareIcon, WhatsAppIcon } from "~/components/Icons";
import { getWhatsAppUrl } from "~/data/site";
import { runViewTransition } from "~/lib/view-transition";

type ProposalFichaChromeProps = {
  prevPath: string | null;
  nextPath: string | null;
};

export function ProposalShareBar({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState(() => {
    if (typeof window === "undefined") return path;
    return window.location.href;
  });

  useEffect(() => {
    setPageUrl(window.location.href);
  }, [path]);

  function resolveUrl() {
    return typeof window !== "undefined" ? window.location.href : pageUrl;
  }

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleShare() {
    const url = resolveUrl();
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title,
          text: `${title} — propuesta de Micky Ruiz para Pueblo Libre`,
          url,
        });
        return;
      }
    } catch {
      // Cancelled share sheet.
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(resolveUrl());
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      aria-label="Compartir propuesta"
      className="proposal-share-bar"
      role="group"
    >
      <button
        className="proposal-share-btn"
        onClick={() => void handleShare()}
        type="button"
      >
        <ShareIcon />
        Compartir
      </button>
      <button
        className="proposal-share-btn"
        onClick={() => void handleCopy()}
        type="button"
      >
        {copied ? <CheckIcon /> : <LinkIcon />}
        {copied ? "Copiado" : "Copiar link"}
      </button>
      <a
        className="proposal-share-btn proposal-share-whatsapp"
        href={getWhatsAppUrl(
          `Mira esta propuesta de Micky Ruiz: ${title} — ${pageUrl.startsWith("http") ? pageUrl : `https://mickyruiz.com${path}`}`,
        )}
        rel="noopener noreferrer"
        target="_blank"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
    </div>
  );
}

export default function ProposalFichaChrome({
  prevPath,
  nextPath,
}: ProposalFichaChromeProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowLeft" && prevPath) {
        event.preventDefault();
        runViewTransition(() => {
          router.push(prevPath);
        });
      }
      if (event.key === "ArrowRight" && nextPath) {
        event.preventDefault();
        runViewTransition(() => {
          router.push(nextPath);
        });
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextPath, prevPath, router]);

  return (
    <div
      aria-hidden="true"
      className="reading-progress"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
