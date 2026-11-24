import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/** Card spotlight, magnetic buttons and the custom cursor. Mouse-only. */
export function initPointerEffects(cursor: HTMLElement | null): () => void {
  if (!hasFinePointer()) return () => {};

  const controller = new AbortController();
  const { signal } = controller;
  let cursorFrame = 0;

  document.querySelectorAll<HTMLElement>(".cell").forEach((cell) => {
    cell.addEventListener(
      "pointermove",
      (event) => {
        const rect = cell.getBoundingClientRect();
        cell.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        cell.style.setProperty("--my", `${event.clientY - rect.top}px`);
      },
      { signal },
    );
  });

  if (!prefersReducedMotion()) {
    document.querySelectorAll<HTMLElement>(".magnetic").forEach((element) => {
      element.addEventListener(
        "pointermove",
        (event) => {
          const rect = element.getBoundingClientRect();
          const dx = (event.clientX - rect.left - rect.width / 2) * 0.22;
          const dy = (event.clientY - rect.top - rect.height / 2) * 0.32;
          element.style.transform = `translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px)`;
        },
        { signal },
      );
      element.addEventListener(
        "pointerleave",
        () => {
          element.style.transform = "";
        },
        { signal },
      );
    });

    if (cursor) {
      let x = 0;
      let y = 0;
      let targetX = 0;
      let targetY = 0;
      let shown = false;

      const follow = () => {
        x += (targetX - x) * 0.2;
        y += (targetY - y) * 0.2;
        cursor.style.setProperty("--x", `${x.toFixed(1)}px`);
        cursor.style.setProperty("--y", `${y.toFixed(1)}px`);
        cursorFrame =
          Math.abs(targetX - x) + Math.abs(targetY - y) > 0.3
            ? requestAnimationFrame(follow)
            : 0;
      };

      window.addEventListener(
        "pointermove",
        (event) => {
          targetX = event.clientX;
          targetY = event.clientY;
          if (!shown) {
            shown = true;
            x = targetX;
            y = targetY;
            cursor.style.opacity = "1";
          }
          if (!cursorFrame) cursorFrame = requestAnimationFrame(follow);
        },
        { passive: true, signal },
      );
      document.addEventListener(
        "pointerover",
        (event) => {
          const target = event.target instanceof Element ? event.target : null;
          cursor.classList.toggle("big", Boolean(target?.closest("a,button,summary,input")));
        },
        { signal },
      );
      document.documentElement.addEventListener(
        "pointerleave",
        () => {
          shown = false;
          cursor.style.opacity = "0";
        },
        { signal },
      );
    }
  }

  return () => {
    controller.abort();
    cancelAnimationFrame(cursorFrame);
    if (cursor) cursor.style.opacity = "0";
  };
}
