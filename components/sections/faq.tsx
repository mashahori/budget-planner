import { SplitHeading } from "../split-heading";

const QUESTIONS = [
  {
    question: "Что такое Budget Planner?",
    answer:
      "Это планировщик личного бюджета: ты записываешь доходы и расходы, распределяешь деньги по категориям и следишь за целями.",
  },
  {
    question: "Нужно ли разбираться в финансах?",
    answer:
      "Нет. Достаточно знать свой доход и основные траты — остальное становится понятным по ходу.",
  },
  {
    question: "С чего начать планирование бюджета?",
    answer:
      "Запиши доход за месяц, отметь обязательные расходы и реши, сколько хочешь откладывать. Остаток — твой свободный бюджет.",
  },
  {
    question: "Что, если доход нерегулярный?",
    answer:
      "Планируй от минимальной суммы, на которую точно можешь рассчитывать, а всё, что сверх неё, распределяй по целям.",
  },
];

export function Faq() {
  return (
    <section className="sec" id="faq">
      <div className="wrap faq-grid">
        <div>
          <span className="eyebrow">06 / Вопросы</span>
          <SplitHeading lines={["Коротко о главном."]} />
        </div>
        <div className="faq-list rv">
          {QUESTIONS.map(({ question, answer }, i) => (
            // A shared `name` makes the browser keep only one item open at a time.
            <details key={question} name="faq" open={i === 0}>
              <summary>
                {question}
                <span className="plus" aria-hidden="true" />
              </summary>
              <div className="ans">{answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
