"use client";

import { useState } from "react";
import { cssVars } from "@/lib/css-vars";
import { rub } from "@/lib/format";
import { AnimatedNumber } from "../animated-number";
import { SplitHeading } from "../split-heading";

const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 50000;
const BAR_COUNT = 12;

const TERMS = [
  { months: 6, button: "6 мес", label: "6 месяцев" },
  { months: 12, button: "1 год", label: "12 месяцев" },
  { months: 24, button: "2 года", label: "24 месяца" },
  { months: 36, button: "3 года", label: "36 месяцев" },
];
const MAX_TOTAL = MAX_AMOUNT * TERMS[TERMS.length - 1].months;

export function Calculator() {
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(TERMS[1]);

  const total = amount * term.months;
  const fill = ((amount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100;
  const barScale = Math.pow(total / MAX_TOTAL, 0.45);

  return (
    <section className="sec" id="calculator">
      <div className="wrap calc-grid">
        <div>
          <span className="eyebrow">04 / Калькулятор</span>
          <SplitHeading lines={["Сколько ты накопишь?"]} />
          <p className="lead rv" style={{ marginTop: 24 }}>
            Подвигай ползунок и выбери срок — посмотри, во что превращается привычка откладывать.
          </p>
          <div className="field rv">
            <div className="field-top">
              <label htmlFor="amount">Откладываю в месяц</label>
              <output htmlFor="amount">{rub(amount)}</output>
            </div>
            <input
              type="range"
              id="amount"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={1000}
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              aria-valuetext={`${rub(amount)} в месяц, через ${term.label} — ${rub(total)}`}
              style={cssVars({ "--val": `${fill.toFixed(1)}%` })}
            />
            <div className="terms" role="group" aria-label="Срок накопления">
              {TERMS.map((option) => (
                <button
                  key={option.months}
                  type="button"
                  aria-pressed={option === term}
                  onClick={() => setTerm(option)}
                >
                  {option.button}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="calc-card rv" style={cssVars({ "--d": ".1s" })}>
          <span className="mono">
            Через <span>{term.label}</span>
          </span>
          <strong className="total">
            <AnimatedNumber value={total} format={rub} duration={500} />
          </strong>
          <div className="bars" aria-hidden="true">
            {Array.from({ length: BAR_COUNT }, (_, i) => (
              <i
                key={i}
                style={{
                  ...cssVars({ "--n": i }),
                  height: `${(5 + ((i + 1) / BAR_COUNT) * 95 * barScale).toFixed(1)}%`,
                }}
              />
            ))}
          </div>
          <div className="bars-legend" aria-hidden="true">
            <span>Старт</span>
            <span>{term.label}</span>
          </div>
          <p className="calc-note">Расчёт без процентов — только сила регулярности.</p>
        </div>
      </div>
    </section>
  );
}
