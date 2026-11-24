# Budget Planner — лендинг

Лендинг планировщика личного бюджета на Next.js (App Router, TypeScript).

## Запуск

```bash
npm install
npm run dev     # http://localhost:3000
```

Линт: `npm run lint`.

## Сборка для GitHub Pages

```bash
npm run build
```

Статический сайт собирается в папку `out/` — её содержимое и публикуется на GitHub Pages. Файл `.nojekyll` внутри нужен, чтобы Pages не выбросил папку `_next`.

По умолчанию сборка рассчитана на корень домена (`username.github.io` или свой домен). Если сайт открывается по адресу вида `username.github.io/budget-planner/`, перед сборкой задайте путь:

```powershell
$env:PAGES_BASE_PATH = "/budget-planner"; npm run build
```

## Структура

- `app/` — `layout.tsx` (метаданные, шрифты), `page.tsx` (сборка секций), `globals.css` (все стили).
- `components/sections/` — секции страницы по порядку: шапка, hero, возможности, шаги, калькулятор, принципы, FAQ, CTA, подвал.
- `components/` — интерактивные виджеты: дашборд, калькулятор, сетка точек, бегущая строка, сменяющееся слово, «печатающийся» ввод.
- `components/effects/` — эффекты всей страницы: появление при скролле, скролл‑анимации, курсор, плавный скролл (Lenis). Подключаются в `components/page-effects.tsx`.
- `lib/` — утилиты: анимация чисел, формат рублей, ссылки навигации.
- `index.html` — исходный макет, в сборке не участвует.