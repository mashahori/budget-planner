"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cssVars } from "@/lib/css-vars";
import { EASE, prefersReducedMotion } from "@/lib/motion";

const WORDS = ["свободнее.", "спокойнее.", "смелее.", "увереннее."];
const HIDDEN = { opacity: 0, filter: "blur(10px)" };
const SHOWN = { transform: "none", opacity: 1, filter: "blur(0)" };

/** Last word of the hero headline, swapped every few seconds. */
export function RotatingWord({ order }: { order: number }) {
  const [index, setIndex] = useState(0);
  const boxRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const renderedIndex = useRef(0);

  // Runs before paint so the box width and the incoming word change together.
  useLayoutEffect(() => {
    const box = boxRef.current;
    const word = wordRef.current;
    if (!box || !word) return;

    box.style.width = `${word.offsetWidth}px`;
    if (renderedIndex.current === index) return;
    renderedIndex.current = index;

    word.animate([{ transform: "translateY(60%)", ...HIDDEN }, SHOWN], {
      duration: 700,
      easing: EASE,
    });
    word.style.opacity = "";
  }, [index]);

  useEffect(() => {
    const box = boxRef.current;
    const word = wordRef.current;
    if (!box || !word) return;

    let active = true;
    const fit = () => {
      if (active) box.style.width = `${word.offsetWidth}px`;
    };
    window.addEventListener("resize", fit);
    window.addEventListener("load", fit);
    document.fonts?.ready.then(fit);

    const timer = prefersReducedMotion()
      ? undefined
      : setInterval(() => {
          if (document.hidden) return;
          word
            .animate([SHOWN, { transform: "translateY(-60%)", ...HIDDEN }], {
              duration: 380,
              easing: "ease-in",
            })
            .finished.then(() => {
              if (!active) return;
              word.style.opacity = "0";
              setIndex((current) => (current + 1) % WORDS.length);
            })
            .catch(() => {});
        }, 2800);

    return () => {
      active = false;
      clearInterval(timer);
      window.removeEventListener("resize", fit);
      window.removeEventListener("load", fit);
    };
  }, []);

  return (
    <span ref={boxRef} className="w rot" style={cssVars({ "--i": order })}>
      <span ref={wordRef} className="rot-word">
        {WORDS[index]}
      </span>
    </span>
  );
}
