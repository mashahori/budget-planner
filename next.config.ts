import type { NextConfig } from "next";

// Set PAGES_BASE_PATH (e.g. "/budget-planner") when the site is served from a
// sub-path such as https://username.github.io/budget-planner/.
const basePath = process.env.PAGES_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  // Static HTML export into `out/` for GitHub Pages.
  output: "export",
  basePath,
};

export default nextConfig;