"use client";

import { useRef, useState } from "react";
import { cssVars } from "@/lib/css-vars";
import { rub } from "@/lib/format";
import { EASE, prefersReducedMotion } from "@/lib/motion";
import { AnimatedNumber } from "./animated-number";

const CHART_WIDTH = 600;
const CHART_HEIGHT = 200;
const CATEGORIES = ["Жильё", "Продукты", "Кафе", "Транспорт", "Остальное"];

const PERIODS = {
  month: {
    button: "Месяц",
    name: "месяц",
    title: "Ноябрь 2026",
    income: 128000,
    spent: 74350,
    free: 53650,
    categories: [32000, 18400, 7700, 6200, 10050],
    line: [22, 30, 26, 41, 37, 52, 48, 63, 58, 74, 70, 86],
    labels: ["01", "08", "15", "22", "30"],
  },
  week: {
    button: "Неделя",
    name: "неделю",
    title: "23 — 29 ноября",
    income: 32000,
    spent: 18590,
    free: 13410,
    categories: [8000, 4600, 1900, 1550, 2540],
    line: [30, 38, 46, 40, 55, 62, 78],
    labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  },
};

type Period = keyof typeof PERIODS;

const KPIS = [
  { key: "income", label: "Доход", className: "kpi" },
  { key: "spent", label: "Расходы", className: "kpi" },
  { key: "free", label: "Свободно", className: "kpi inv" },
] as const;

const KPI_INTRO = { from: 0, delay: 800, duration: 1900 };

/** Smooth SVG path through percentage values (0–100) spread evenly across the chart. */
function smoothPath(values: number[]) {
  const points = values.map((value, i) => [
    (i * CHART_WIDTH) / (values.length - 1),
    CHART_HEIGHT - (value / 100) * CHART_HEIGHT,
  ]);
  const n = (value: number) => value.toFixed(1);

  let d = `M${n(points[0][0])} ${n(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    d +=
      ` C${n(p1[0] + (p2[0] - p0[0]) / 6)} ${n(p1[1] + (p2[1] - p0[1]) / 6)}` +
      ` ${n(p2[0] - (p3[0] - p1[0]) / 6)} ${n(p2[1] - (p3[1] - p1[1]) / 6)}` +
      ` ${n(p2[0])} ${n(p2[1])}`;
  }
  return d;
}

export function Dashboard() {
  const [period, setPeriod] = useState<Period>("month");
  const [status, setStatus] = useState("");
  const chartRef = useRef<SVGSVGElement>(null);

  const data = PERIODS[period];
  const path = smoothPath(data.line);
  const maxCategory = Math.max(...data.categories);

  const selectPeriod = (next: Period) => {
    if (next === period) return;
    const nextData = PERIODS[next];
    setPeriod(next);
    setStatus(
      `За ${nextData.name}: доход ${rub(nextData.income)}, расходы ${rub(nextData.spent)}, свободно ${rub(nextData.free)}`,
    );
    if (!prefersReducedMotion()) {
      chartRef.current?.animate(
        [{ clipPath: "inset(-12px 100% -12px 0)" }, { clipPath: "inset(-12px -12px -12px 0)" }],
        { duration: 900, easing: EASE },
      );
    }
  };

  return (
    <div className="dash" role="group" aria-label="Пример экрана Budget Planner">
      <div className="dash-bar">
        <span className="dash-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="mono dash-title">{data.title}</span>
        <div className="seg" role="group" aria-label="Период">
          {(Object.keys(PERIODS) as Period[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={key === period}
              onClick={() => selectPeriod(key)}
            >
              {PERIODS[key].button}
            </button>
          ))}
        </div>
      </div>

      <div className="dash-body">
        <div className="kpis">
          {KPIS.map(({ key, label, className }) => (
            <div key={key} className={className}>
              <span>{label}</span>
              <strong>
                <AnimatedNumber value={data[key]} format={rub} intro={KPI_INTRO} />
              </strong>
            </div>
          ))}
        </div>

        <div className="dash-grid">
          <div className="panel">
            <div className="panel-head">
              <span>Баланс</span>
              <span className="mono">₽</span>
            </div>
            <div className="chart" aria-hidden="true">
              <svg
                ref={chartRef}
                viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chart-fade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0a0a0a" stopOpacity=".16" />
                    <stop offset="1" stopColor="#0a0a0a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#chart-fade)"
                  d={`${path} L${CHART_WIDTH} ${CHART_HEIGHT} L0 ${CHART_HEIGHT} Z`}
                />
                <path
                  fill="none"
                  stroke="#0a0a0a"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  d={path}
                />
              </svg>
              <span className="chart-dot" style={{ top: `${100 - data.line[data.line.length - 1]}%` }} />
            </div>
            <div className="chart-labels" aria-hidden="true">
              {data.labels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <span>Категории</span>
              <span className="mono">{CATEGORIES.length}</span>
            </div>
            <ul className="cats">
              {CATEGORIES.map((category, i) => (
                <li key={category}>
                  <span>{category}</span>
                  <b>{rub(data.categories[i])}</b>
                  <div className="track">
                    <i
                      style={cssVars({
                        "--w": `${((data.categories[i] / maxCategory) * 100).toFixed(1)}%`,
                      })}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <span className="sr-only" role="status">
        {status}
      </span>
    </div>
  );
}
