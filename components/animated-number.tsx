"use client";

import { useEffect, useRef, useState } from "react";
import { tween } from "@/lib/motion";

type AnimatedNumberProps = {
  value: number;
  format?: (value: number) => string;
  duration?: number;
  /** Optional count-up played once after mount. */
  intro?: { from: number; delay?: number; duration: number };
};

export function AnimatedNumber({
  value,
  format = String,
  duration = 700,
  intro,
}: AnimatedNumberProps) {
  const [shown, setShown] = useState(value);
  const shownRef = useRef(value);
  const introRef = useRef(intro);

  useEffect(() => {
    const onUpdate = (next: number) => {
      shownRef.current = next;
      setShown(next);
    };

    const pendingIntro = introRef.current;
    if (pendingIntro) {
      return tween({
        ...pendingIntro,
        to: value,
        onUpdate,
        onDone: () => {
          introRef.current = undefined;
        },
      });
    }

    if (shownRef.current === value) return;
    return tween({ from: shownRef.current, to: value, duration, onUpdate });
  }, [value, duration]);

  return format(shown);
}
