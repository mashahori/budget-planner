import { prefersReducedMotion } from "@/lib/motion";

export const REVEAL_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: "0px 0px -6% 0px",
};

/** Adds the `in` class to reveal targets once they scroll into view. */
export function initReveal(): () => void {
  const targets = document.querySelectorAll(".rv,[data-words],.wordmark");

  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    targets.forEach((element) => element.classList.add("in"));
    return () => {};
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    });
  }, REVEAL_OBSERVER_OPTIONS);
  targets.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}
