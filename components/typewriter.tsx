"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const ENTRIES = [
  { text: "кофе 250", category: "Кафе", sum: "−250 ₽" },
  { text: "такси 480", category: "Транспорт", sum: "−480 ₽" },
  { text: "зарплата 64000", category: "Доход", sum: "+64 000 ₽" },
];

/** Looping demo of the quick-entry field: types a note, shows the parsed result, erases. */
export function Typewriter() {
  const [text, setText] = useState(ENTRIES[0].text);
  const [entry, setEntry] = useState(ENTRIES[0]);
  const [chipShown, setChipShown] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Clearing the pending timer on unmount leaves the loop parked on its current await.
    let timer: ReturnType<typeof setTimeout>;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    (async () => {
      await sleep(0);
      setChipShown(false);
      for (let i = 0; ; i = (i + 1) % ENTRIES.length) {
        const next = ENTRIES[i];
        for (let length = 0; length <= next.text.length; length++) {
          setText(next.text.slice(0, length));
          await sleep(70 + Math.random() * 70);
        }
        await sleep(380);
        setEntry(next);
        setChipShown(true);
        await sleep(2000);
        setChipShown(false);
        await sleep(380);
        for (let length = next.text.length; length >= 0; length--) {
          setText(next.text.slice(0, length));
          await sleep(22);
        }
        await sleep(320);
      }
    })();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div aria-hidden="true">
      <div className="tw">
        <span>{text}</span>
        <span className="caret" />
      </div>
      <div className={chipShown ? "tw-chip on" : "tw-chip"}>
        <span>{entry.category}</span>
        <b>{entry.sum}</b>
      </div>
    </div>
  );
}
