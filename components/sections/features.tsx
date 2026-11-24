import { cssVars } from "@/lib/css-vars";
import { CountUp } from "../count-up";
import { SplitHeading } from "../split-heading";
import { Typewriter } from "../typewriter";

const LIMITS = [
  { name: "Продукты", width: "74%", usage: "18 400 / 25 000" },
  { name: "Кафе", width: "77%", usage: "7 700 / 10 000" },
  { name: "Транспорт", width: "78%", usage: "6 200 / 8 000" },
  { name: "Подписки", width: "99%", usage: "1 990 / 2 000" },
];

const PAYMENTS = [
  { day: "01", name: "Аренда", sum: "32 000 ₽" },
  { day: "05", name: "Интернет", sum: "650 ₽" },
  { day: "12", name: "Подписки", sum: "1 990 ₽" },
];

const MONTH_BARS = [42, 58, 50, 66, 47, 72, 61, 80, 68, 88, 76, 100];

export function Features() {
  return (
    <section className="sec" id="features">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">02 / Возможности</span>
            <SplitHeading lines={["Всё для бюджета.", "Ничего лишнего."]} />
          </div>
          <p className="lead rv">
            Пять инструментов, которые превращают хаос в цифрах в понятный план на месяц.
          </p>
        </div>

        <div className="bento">
          <article className="cell c4 rv">
            <ul className="limits" aria-hidden="true">
              {LIMITS.map(({ name, width, usage }, i) => (
                <li key={name}>
                  <span>{name}</span>
                  <div className="track">
                    <i style={cssVars({ "--w": width, "--n": i })} />
                  </div>
                  <span className="mono">{usage}</span>
                </li>
              ))}
            </ul>
            <div>
              <h3>Лимиты по категориям</h3>
              <p>Задай потолок для каждой категории и сразу видь, сколько ещё можно потратить.</p>
            </div>
          </article>

          <article className="cell c2 inv rv" style={cssVars({ "--d": ".1s" })}>
            <div className="ring" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <circle className="ring-track" cx="60" cy="60" r="54" />
                <circle className="ring-val" cx="60" cy="60" r="54" />
              </svg>
              <CountUp to={68} suffix="%" className="ring-num" />
            </div>
            <div>
              <span className="mono cell-tag">Отпуск · 136 000 из 200 000 ₽</span>
              <h3 style={{ marginTop: 10 }}>Цели</h3>
              <p>Копи на важное и смотри, как растёт прогресс.</p>
            </div>
          </article>

          <article className="cell c2 rv">
            <ul className="pay" aria-hidden="true">
              {PAYMENTS.map(({ day, name, sum }, i) => (
                <li key={day} style={cssVars({ "--n": i })}>
                  <span className="day">{day}</span>
                  {name}
                  <b>{sum}</b>
                </li>
              ))}
            </ul>
            <div>
              <h3>Регулярные платежи</h3>
              <p>Аренда, связь и подписки заранее учтены в плане.</p>
            </div>
          </article>

          <article className="cell c2 rv" style={cssVars({ "--d": ".1s" })}>
            <div className="months" aria-hidden="true">
              {MONTH_BARS.map((height, i) => (
                <i key={i} style={cssVars({ "--h": `${height}%`, "--n": i })} />
              ))}
            </div>
            <div>
              <h3>Отчёты</h3>
              <p>Сравнивай месяцы и замечай, что меняется.</p>
            </div>
          </article>

          <article className="cell c2 rv" style={cssVars({ "--d": ".2s" })}>
            <Typewriter />
            <div>
              <h3>Быстрый ввод</h3>
              <p>Сумма и пара слов — трата записана.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
