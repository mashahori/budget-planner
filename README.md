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
npm run build:pages
```

Скрипт собирает статический сайт с путём `/budget-planner` (переменная `PAGES_BASE_PATH`, по умолчанию `/budget-planner`) и копирует результат из `out/` в папку `docs/`. В настройках GitHub Pages нужно выбрать: **Deploy from a branch → main → /docs**.

Файл `.nojekyll` внутри нужен, чтобы Pages не выбросил папку `_next`; он копируется из `public/` автоматически.

Для сайта в корне домена (`username.github.io` или свой домен) задайте пустой путь:

```bash
PAGES_BASE_PATH= npm run build:pages
```

## Структура

- `app/` — `layout.tsx` (метаданные, шрифты), `page.tsx` (сборка секций), `globals.css` (все стили).
- `components/sections/` — секции страницы по порядку: шапка, hero, возможности, шаги, калькулятор, принципы, FAQ, CTA, подвал.
- `components/` — интерактивные виджеты: дашборд, калькулятор, сетка точек, бегущая строка, сменяющееся слово, «печатающийся» ввод.
- `components/effects/` — эффекты всей страницы: появление при скролле, скролл‑анимации, курсор, плавный скролл (Lenis). Подключаются в `components/page-effects.tsx`.
- `lib/` — утилиты: анимация чисел, формат рублей, ссылки навигации.
- `index.html` — исходный макет, в сборке не участвует.