import type { CSSProperties } from "react";

/** Typed helper for passing CSS custom properties through the `style` prop. */
export const cssVars = (vars: Record<`--${string}`, string | number>) =>
  vars as CSSProperties;
