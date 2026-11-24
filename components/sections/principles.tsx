import type { ReactNode } from "react";
import { cssVars } from "@/lib/css-vars";
import { CountUp } from "../count-up";
import { SplitHeading } from "../split-heading";

const SLIDERS = [
  { from: "28%", to: "66%", delay: "0s" },
  { from: "74%", to: "38%", delay: "-1.4s" },
  { from: "46%", to: "82%", delay: "-2.6s" },
];

const STAIRS = [22, 38, 54, 70, 88];

const PRINCIPLES: { title: string; text: string; tinted?: boolean; art: ReactNode }[] = [
  {
    title: "Ясность вместо контроля",
    text: "Не нужно считать каждую копейку. Достаточно видеть общую картину и понимать, что происходит с деньгами.",
    art: (
      <div className="art art-rings" aria-hidden="true">
        <i />
        <i />
      </div>
    ),
  },
  {
    title: "План, а не запреты",
    text: "Бюджет не про отказ от удовольствий. Он про то, чтобы на них точно хватило.",
    tinted: true,
    art: (
      <div className="art art-sliders" style={{ background: "#ebebe7" }} aria-hidden="true">
        {SLIDERS.map(({ from, to, delay }) => (
          <i key={from} style={cssVars({ "--x": from, "--x2": to, "--dl": delay })} />
        ))}
      </div>
    ),
  },
  {
    title: "Маленькие шаги",
    text: "Большие цели складываются из регулярных небольших взносов. Главное — ритм.",
    art: (
      <div className="art art-stairs" aria-hidden="true">
        {STAIRS.map((height, i) => (
          <i key={height} style={cssVars({ "--h": `${height}%`, "--n": i })} />
        ))}
      </div>
    ),
  },
];

const STATS = [
  { to: 5, from: 0, label: "минут на первый бюджет" },
  { to: 1, from: 9, label: "экран — вся картина месяца" },
  { to: 0, from: 24, label: "сложных таблиц" },
];

export function Principles() {
  return (
    <section className="sec" id="principles">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">05 / Принципы</span>
            <SplitHeading lines={["Три идеи, на которых", "всё держится."]} />
          </div>
          <p className="lead rv">
            Budget Planner не учит экономить на всём. Он помогает тратить осознанно.
          </p>
        </div>

        <div className="stack-list">
          {PRINCIPLES.map(({ title, text, tinted, art }, i) => (
            <article key={title} className="stack-card" style={cssVars({ "--n": i })}>
              <div
                className="stack-inner"
                style={tinted ? cssVars({ "--bg-card": "#f6f6f3" }) : undefined}
              >
                <div className="stack-copy">
                  <span className="stack-num">0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
                {art}
              </div>
            </article>
          ))}
        </div>

        <div className="stats">
          {STATS.map(({ to, from, label }, i) => (
            <div
              key={label}
              className="stat rv"
              style={i > 0 ? cssVars({ "--d": `${i / 10}s` }) : undefined}
            >
              <CountUp as="strong" to={to} from={from} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
