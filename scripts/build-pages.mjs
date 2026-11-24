import { spawnSync } from "node:child_process";
import { cpSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const env = {
  ...process.env,
  PAGES_BASE_PATH: process.env.PAGES_BASE_PATH ?? "/budget-planner",
};

const build = spawnSync("npm run build", { cwd: root, env, stdio: "inherit", shell: true });
if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

// GitHub Pages "deploy from folder" can only publish the repo root or /docs.
const target = join(root, "docs");
rmSync(target, { recursive: true, force: true });
cpSync(join(root, "out"), target, { recursive: true });

console.log(`Static site with basePath "${env.PAGES_BASE_PATH}" copied to docs/`);
