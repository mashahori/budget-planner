# 🧾 Budget Planner — Landing Page

> A landing page for a personal budget planner, built with **Next.js** (App Router) and **TypeScript**. ✨

🔗 **Live demo:** https://mashahori.github.io/budget-planner/

## 🧰 Tech Stack

- ⚡ [Next.js 16](https://nextjs.org/) (App Router)
- ⚛️ React 19
- 🔷 TypeScript
- 🌀 [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- 🧹 ESLint

## 🚀 Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
```

🔍 Lint: `npm run lint`

## 📦 Deploying to GitHub Pages

```bash
npm run build:pages
```

This script builds a static site with the `/budget-planner` base path (set via `PAGES_BASE_PATH`, defaults to `/budget-planner`) and copies the output from `out/` into the `docs/` folder. 📂

⚙️ In your GitHub Pages settings, choose **Deploy from a branch → `main` → `/docs`**.

> 💡 The `.nojekyll` file is required so Pages doesn't ignore the `_next` folder. It's copied from `public/` automatically.

🌐 For a site at the domain root (`username.github.io` or a custom domain), set an empty base path:

```bash
PAGES_BASE_PATH= npm run build:pages
```

## 🗂️ Project Structure

| Path | Description |
|------|-------------|
| `app/` | 🧱 `layout.tsx` (metadata, fonts), `page.tsx` (assembles sections), `globals.css` (all styles) |
| `components/sections/` | 📄 Page sections in order: header, hero, features, how it works, calculator, principles, FAQ, CTA, footer |
| `components/` | 🎛️ Interactive widgets: dashboard, calculator, dot grid, marquee, rotating word, typewriter input |
| `components/effects/` | ✨ Page-wide effects: scroll reveal, scroll motion, pointer, smooth scroll (Lenis). Wired up in `components/page-effects.tsx` |
| `lib/` | 🛠️ Utilities: number animation, ruble formatting, navigation links |
| `index.html` | 🎨 Original design mockup — not part of the build |