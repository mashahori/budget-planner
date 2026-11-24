import { NAV_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="wrap footer">
      <span>© 2026 Budget Planner</span>
      <nav aria-label="Навигация в подвале">
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a href="#top">Наверх ↑</a>
    </footer>
  );
}
