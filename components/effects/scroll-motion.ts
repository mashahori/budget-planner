import { clamp, prefersReducedMotion } from "@/lib/motion";

/** Scroll-linked motion: progress bar, sticky nav, dashboard tilt, manifesto, steps and card stack. */
export function initScrollMotion(): () => void {
  const root = document.documentElement;
  const reduced = prefersReducedMotion();
  const all = <T extends HTMLElement>(selector: string) => [
    ...document.querySelectorAll<T>(selector),
  ];

  const nav = document.querySelector<HTMLElement>(".nav");
  const stage = document.querySelector<HTMLElement>(".stage");
  const manifesto = document.querySelector<HTMLElement>(".mani-text");
  const manifestoWords = all(".mani-text .mw");
  const stepList = document.querySelector<HTMLElement>(".steps");
  const steps = all(".step");
  const screens = all(".screen");
  const stackCards = all(".stack-inner");

  let frame = 0;

  function update() {
    frame = 0;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = root.scrollHeight - vh;
    const free = reduced || max <= 2;

    root.classList.toggle("free", free);
    root.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : "0");
    nav?.classList.toggle("stuck", y > 30);

    if (stage) {
      const stageTop = stage.getBoundingClientRect().top + y;
      const progress = free ? 1 : clamp(y / Math.max(stageTop - vh * 0.2, 1));
      stage.style.setProperty("--p", progress.toFixed(4));
    }

    if (manifesto) {
      const rect = manifesto.getBoundingClientRect();
      const progress = free ? 1 : clamp((vh * 0.86 - rect.top) / (rect.height + vh * 0.42));
      const count = manifestoWords.length;
      manifestoWords.forEach((word, i) => {
        word.style.opacity = (0.16 + 0.84 * clamp((progress * (count + 5) - i) / 5)).toFixed(2);
      });
    }

    let best = 0;
    let bestDistance = Infinity;
    steps.forEach((step, i) => {
      const rect = step.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - vh / 2);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    steps.forEach((step, i) => step.classList.toggle("on", i === best));
    screens.forEach((screen, i) => screen.classList.toggle("on", i === best));

    if (stepList) {
      const rect = stepList.getBoundingClientRect();
      const progress = free ? 1 : clamp((vh / 2 - rect.top) / rect.height);
      stepList.style.setProperty("--sp", progress.toFixed(4));
    }

    stackCards.forEach((card, i) => {
      const next = stackCards[i + 1];
      if (!next?.parentElement || !card.parentElement || free) {
        card.style.transform = "";
        card.style.filter = "";
        return;
      }
      const a = card.parentElement.getBoundingClientRect();
      const b = next.parentElement.getBoundingClientRect();
      const progress = clamp(1 - (b.top - a.top) / a.height);
      card.style.transform = `scale(${(1 - progress * 0.07).toFixed(4)})`;
      card.style.filter = `brightness(${(1 - progress * 0.05).toFixed(3)})`;
    });
  }

  const requestUpdate = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const controller = new AbortController();
  const { signal } = controller;
  window.addEventListener("scroll", requestUpdate, { passive: true, signal });
  window.addEventListener("resize", requestUpdate, { signal });
  window.addEventListener("load", requestUpdate, { signal });
  document.fonts?.ready.then(() => {
    if (!signal.aborted) requestUpdate();
  });
  update();

  return () => {
    controller.abort();
    cancelAnimationFrame(frame);
  };
}
