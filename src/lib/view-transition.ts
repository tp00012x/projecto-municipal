/**
 * Prefer the View Transitions API when available; fall back to an instant navigate.
 * Respects prefers-reduced-motion.
 */
export function runViewTransition(update: () => void) {
  if (typeof window !== "undefined") {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      update();
      return;
    }
  }

  const doc = document as Document & {
    startViewTransition?: (callback: () => void) => { finished: Promise<void> };
  };

  if (typeof doc.startViewTransition === "function") {
    doc.startViewTransition(() => {
      update();
    });
    return;
  }

  update();
}
