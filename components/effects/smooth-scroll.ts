import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/motion";

/** Lenis smooth scrolling plus eased jumps for in-page anchor links. */
export function initSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => {};

  const lenis = new Lenis({ lerp: 0.11 });
  let frame = requestAnimationFrame(function raf(time) {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  });

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest('a[href^="#"]:not(.skip)');
    const id = link?.getAttribute("href");
    if (!id) return;

    if (id === "#top") {
      event.preventDefault();
      lenis.scrollTo(0);
      return;
    }

    const target = document.getElementById(id.slice(1));
    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, { offset: -70 });
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    cancelAnimationFrame(frame);
    lenis.destroy();
  };
}
