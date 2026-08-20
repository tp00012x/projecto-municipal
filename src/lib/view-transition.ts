/**
 * Prefer the View Transitions API when available; fall back to an instant navigate.
 */
export function runViewTransition(update: () => void) {
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
