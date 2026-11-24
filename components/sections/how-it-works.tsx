import { cssVars } from "@/lib/css-vars";
import { SplitHeading } from "../split-heading";

const STEPS = [
  {
    title: "Запиши доход",
    text: "Добавь всё, что приходит за месяц: зарплату, подработку, проценты. Это твоя точка отсчёта.",
  },
  {
    title: "Распредели деньги",
    text: "Раздели сумму на обязательное, желания и накопления. Начни с правила 50/30/20 и подстрой под себя.",
  },
  {
    title: "Отмечай расходы",
    text: "Записывай траты по ходу дня — и сразу видь, сколько осталось в каждой категории.",
  },
  {
    title: "Двигайся к цели",
    text: "Откладывай остаток на то, что важно. Прогресс виден после каждого взноса.",
  },
];

const SPLIT = [
  { name: "Обязательное", sum: "64 000 ₽", width: "50%" },
  { name: "Желания", sum: "38 400 ₽", width: "30%" },
  { name: "Накопления", sum: "25 600 ₽", width: "20%" },
];

/** One phone screen per step; scroll-motion toggles the `on` class as steps pass the viewport centre. */
function PhoneScreens() {
  return (
    <div className="phone">
      <div className="screens">
        <div className="screen on">
          <span className="s-label">Доход в месяц</span>
          <strong className="s-big">128 000 ₽</strong>
          <div className="s-list">
            <div>
              <span>Зарплата</span>
              <b>96 000 ₽</b>
            </div>
            <div>
              <span>Фриланс</span>
              <b>32 000 ₽</b>
            </div>
            <div>
              <span>+ Добавить источник</span>
            </div>
          </div>
          <div className="s-btn">Сохранить доход</div>
        </div>

        <div className="screen">
          <span className="s-label">Распределение</span>
          <strong className="s-big">50 / 30 / 20</strong>
          <div className="s-split">
            {SPLIT.map(({ name, sum, width }) => (
              <div key={name}>
                <span>{name}</span>
                <b>{sum}</b>
                <div className="track">
                  <i style={cssVars({ "--w": width })} />
                </div>
              </div>
            ))}
          </div>
          <div className="s-btn">Применить план</div>
        </div>

        <div className="screen">
          <span className="s-label">Свободно сегодня</span>
          <strong className="s-big">1 920 ₽</strong>
          <div className="s-list">
            <div>
              <span>Продукты</span>
              <b>−1 840 ₽</b>
            </div>
            <div>
              <span>Метро</span>
              <b>−62 ₽</b>
            </div>
            <div>
              <span>Кофе</span>
              <b>−250 ₽</b>
            </div>
            <div>
              <span>Зарплата</span>
              <b>+64 000 ₽</b>
            </div>
          </div>
          <div className="s-btn">Добавить трату</div>
        </div>

        <div className="screen">
          <span className="s-label">Цель</span>
          <div className="s-ring">
            <svg viewBox="0 0 120 120">
              <circle className="ring-track" cx="60" cy="60" r="54" />
              <circle className="ring-val" cx="60" cy="60" r="54" strokeDasharray="339.3" />
            </svg>
            <span>68%</span>
          </div>
          <p className="s-center">
            <b>Отпуск</b>136 000 из 200 000 ₽
          </p>
          <div className="s-btn">Пополнить цель</div>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="sec" id="how">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">03 / Как это работает</span>
            <SplitHeading lines={["Четыре шага", "до ясного бюджета."]} />
          </div>
          <p className="lead rv">
            Первый план собирается за один вечер. Дальше — пара минут в день.
          </p>
        </div>

        <div className="how-grid">
          <ol className="steps">
            {STEPS.map(({ title, text }, i) => (
              <li key={title} className={i === 0 ? "step on" : "step"}>
                <span className="mono">Шаг 0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className="phone-col" aria-hidden="true">
            <PhoneScreens />
          </div>
        </div>
      </div>
    </section>
  );
}
