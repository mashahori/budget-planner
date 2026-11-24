"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, tween } from "@/lib/motion";
import { REVEAL_OBSERVER_OPTIONS } from "./effects/reveal";

type CountUpProps = {
  to: number;
  from?: number;
  suffix?: string;
  as?: "span" | "strong";
  className?: string;
};

/** Counts from `from` to `to` the first time it scrolls into view. */
export function CountUp({
  to,
  from = 0,
  suffix = "",
  as: Tag = "span",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(to);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    let cancel = () => {};
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      cancel = tween({ from, to, duration: 1800, onUpdate: setShown });
    }, REVEAL_OBSERVER_OPTIONS);
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancel();
    };
  }, [from, to]);

  return (
    <Tag ref={ref} className={className}>
      {shown}
      {suffix}
    </Tag>
  );
}
