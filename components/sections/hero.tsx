import { cssVars } from "@/lib/css-vars";
import { ArrowLink } from "../arrow-link";
import { Dashboard } from "../dashboard";
import { DotGrid } from "../dot-grid";
import { Icon } from "../icon";
import { RotatingWord } from "../rotating-word";
import { MAIN_WEBSITE_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <DotGrid />
      <div className="wrap">
        <a className="badge" href="#features">
          <i aria-hidden="true" />
          <span className="shiny">Личный бюджет без сложных таблиц</span>
        </a>
        <h1 className="h1" id="hero-title">
          <span className="sr-only">Планируй бюджет. Живи свободнее.</span>
          <span aria-hidden="true">
            <span className="line">
              <span className="w" style={cssVars({ "--i": 0 })}>
                Планируй
              </span>{" "}
              <span className="w" style={cssVars({ "--i": 1 })}>
                бюджет.
              </span>
            </span>
            <span className="line">
              <span className="w" style={cssVars({ "--i": 2 })}>
                Живи
              </span>{" "}
              <RotatingWord order={3} />
            </span>
          </span>
        </h1>
        <p className="hero-sub">
          Budget Planner собирает доходы, расходы и цели в одну ясную картину. Ты видишь, сколько
          можно потратить сегодня — и куда движутся твои деньги.
        </p>
        <div className="hero-actions">
          <ArrowLink href={MAIN_WEBSITE_URL} className="magnetic">
            Начать планировать
          </ArrowLink>
          <a className="btn ghost magnetic" href="#calculator">
            Посчитать накопления
          </a>
        </div>

        <div className="stage" id="demo">
          <div className="chip chip-a" aria-hidden="true">
            <span className="chip-ico">
              <Icon name="down" />
            </span>
            <span>
              Лимит «Кафе»<b>осталось 2 300 ₽</b>
            </span>
          </div>
          <div className="chip chip-b" aria-hidden="true">
            <span className="chip-ico">
              <Icon name="arr" />
            </span>
            <span>
              В копилку «Отпуск»<b>+8 450 ₽</b>
            </span>
          </div>
          <Dashboard />
        </div>
      </div>
    </section>
  );
}
