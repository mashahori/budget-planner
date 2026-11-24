"use client";

import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";

const ROWS = [
  { words: ["Доходы", "Расходы", "Накопления", "Цели", "Лимиты", "Отчёты"], className: "mq-row" },
  { words: ["Ясность", "Спокойствие", "Свобода", "План", "Ритм", "Баланс"], className: "mq-row alt" },
];

/** Two endless rows that speed up and skew with scroll velocity. */
export function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const rows = [...section.querySelectorAll<HTMLElement>(".mq-row")].map((element, i) => ({
      element,
      direction: i % 2 ? -1 : 1,
      x: 0,
      half: 0,
    }));
    const measure = () => {
      rows.forEach((row) => {
        row.half = row.element.scrollWidth / 2;
      });
    };

    let lastY = window.scrollY;
    let velocity = 0;
    let visible = false;
    let frame = 0;

    const loop = () => {
      frame = 0;
      if (!visible || document.hidden) return;
      const delta = window.scrollY - lastY;
      lastY = window.scrollY;
      velocity += (delta - velocity) * 0.12;
      const speed = 0.7 + Math.min(Math.abs(velocity) * 0.5, 34);
      const skew = clamp(velocity * 0.12, -7, 7);
      rows.forEach((row) => {
        if (!row.half) return;
        row.x -= row.direction * speed;
        if (row.x <= -row.half) row.x += row.half;
        if (row.x > 0) row.x -= row.half;
        row.element.style.transform = `translate3d(${row.x.toFixed(1)}px,0,0) skewX(${(-row.direction * skew).toFixed(2)}deg)`;
      });
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (frame) return;
      lastY = window.scrollY;
      frame = requestAnimationFrame(loop);
    };

    measure();
    const controller = new AbortController();
    const { signal } = controller;
    window.addEventListener("resize", measure, { signal });
    window.addEventListener("load", measure, { signal });
    document.fonts?.ready.then(() => {
      if (!signal.aborted) measure();
    });
    document.addEventListener(
      "visibilitychange",
      () => {
        if (!document.hidden) start();
      },
      { signal },
    );

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    observer.observe(section);

    return () => {
      controller.abort();
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={sectionRef} className="mq" aria-hidden="true">
      {ROWS.map(({ words, className }) => (
        <div key={className} className={className}>
          {/* Rendered twice so the row can loop seamlessly at the halfway point. */}
          {[...words, ...words].map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
