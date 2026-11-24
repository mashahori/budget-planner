export const EASE = "cubic-bezier(.16,1,.3,1)";

export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

type TweenOptions = {
  from: number;
  to: number;
  duration: number;
  delay?: number;
  onUpdate: (value: number) => void;
  onDone?: () => void;
};

/** Animates an integer with an ease-out curve. Returns a cancel function. */
export function tween({
  from,
  to,
  duration,
  delay = 0,
  onUpdate,
  onDone,
}: TweenOptions): () => void {
  if (prefersReducedMotion()) {
    onUpdate(to);
    onDone?.();
    return () => {};
  }

  let raf = 0;
  const start = performance.now() + delay;
  const frame = (now: number) => {
    const progress = clamp((now - start) / duration);
    onUpdate(Math.round(from + (to - from) * (1 - Math.pow(1 - progress, 4))));
    if (progress < 1) raf = requestAnimationFrame(frame);
    else onDone?.();
  };
  raf = requestAnimationFrame(frame);

  return () => cancelAnimationFrame(raf);
}
