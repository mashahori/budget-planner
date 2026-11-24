import { NAV_LINKS } from "@/lib/site";
import { ArrowLink } from "../arrow-link";
import { Icon } from "../icon";
import { MAIN_WEBSITE_URL } from "@/lib/constants";

export function Header() {
  return (
    <header className="nav">
      <a className="brand" href="#top" aria-label="Budget Planner — наверх">
        <span className="symbol" aria-hidden="true">
          <Icon name="arr" />
        </span>
        budget planner
      </a>
      <nav className="nav-links" aria-label="Главная навигация">
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <ArrowLink href={MAIN_WEBSITE_URL} className="sm">
        Начать
      </ArrowLink>
    </header>
  );
}
