"use client";

import { useEffect, useRef } from "react";
import { initPointerEffects } from "./effects/pointer";
import { initReveal } from "./effects/reveal";
import { initScrollMotion } from "./effects/scroll-motion";
import { initSmoothScroll } from "./effects/smooth-scroll";

/** Page-wide progressive enhancements layered on top of the server-rendered markup. */
export function PageEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanups = [
      initReveal(),
      initScrollMotion(),
      initPointerEffects(cursorRef.current),
      initSmoothScroll(),
    ];
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <div className="cursor" ref={cursorRef} aria-hidden="true" />
    </>
  );
}
