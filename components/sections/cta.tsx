import { cssVars } from "@/lib/css-vars";
import { ArrowLink } from "../arrow-link";
import { SplitHeading } from "../split-heading";
import { MAIN_WEBSITE_URL } from "@/lib/constants";

const WORDMARK = "budget planner";

export function Cta() {
  return (
    <section className="cta" id="start">
      <div className="wrap">
        <span className="eyebrow">Следующий шаг</span>
        <SplitHeading lines={["Твои деньги.", "Твой план."]} />
        <p className="lead rv">Начни с одного месяца — этого хватит, чтобы увидеть разницу.</p>
        <div className="rv" style={cssVars({ "--d": ".1s" })}>
          <ArrowLink href={MAIN_WEBSITE_URL} className="magnetic">
            Начать планировать
          </ArrowLink>
        </div>
      </div>
      <div className="wordmark" aria-hidden="true">
        {[...WORDMARK].map((letter, i) => (
          <span key={i} style={cssVars({ "--i": i })}>
            {letter === " " ? "\u00a0" : letter}
          </span>
        ))}
      </div>
    </section>
  );
}
