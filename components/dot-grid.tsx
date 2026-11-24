"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Interactive dotted background for the hero. Pauses while off-screen. */
export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduced = prefersReducedMotion();
    let width = 0;
    let height = 0;
    let pointerX = -999;
    let pointerY = -999;
    let easedX = -999;
    let easedY = -999;
    let visible = true;
    let frame = 0;

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      easedX += (pointerX - easedX) * 0.12;
      easedY += (pointerY - easedY) * 0.12;
      const gap = width < 700 ? 22 : 28;
      const phase = reduced ? 0 : time * 0.0012;
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const near = Math.max(0, 1 - Math.hypot(x - easedX, y - easedY) / 180);
          const wave = 0.5 + 0.5 * Math.sin(x * 0.012 + y * 0.016 - phase);
          context.fillStyle = `rgba(10,10,10,${(0.1 + wave * 0.1 + near * near * 0.75).toFixed(3)})`;
          context.beginPath();
          context.arc(x, y, 0.9 + wave * 0.35 + near * near * 2.6, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const loop = (time: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      draw(time);
      if (!reduced) frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };
    resize();

    const controller = new AbortController();
    const { signal } = controller;
    window.addEventListener("resize", resize, { signal });
    window.addEventListener(
      "pointermove",
      (event) => {
        const rect = canvas.getBoundingClientRect();
        pointerX = event.clientX - rect.left;
        pointerY = event.clientY - rect.top;
      },
      { passive: true, signal },
    );
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
    observer.observe(canvas.parentElement ?? canvas);

    return () => {
      controller.abort();
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="dots" aria-hidden="true" />;
}
