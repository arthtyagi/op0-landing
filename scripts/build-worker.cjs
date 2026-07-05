// Builds an all-in-one Worker that serves the Vite SPA same-origin (no CORS issues):
//  - inlines the CSS into index.html
//  - serves index.html at /
//  - serves each JS chunk at /assets/<name> (so relative imports + dynamic imports resolve)
// All chunks embedded as strings in the Worker.
const fs = require("fs");
const path = require("path");

const html0 = fs.readFileSync("dist/index.html", "utf8");
const readAsset = (name) => fs.readFileSync(path.join("dist/assets", name), "utf8");

const css = readAsset("index-DaVkxz_J.css");
const reactJs = readAsset("react-CH5eSenG.js");
const entryJs = readAsset("index-Lmeloqo8.js");
const sceneJs = readAsset("scene-BQo4z-y0.js");

// Inline the CSS; keep the module scripts pointing at same-origin /assets/<name>.
let html = html0.replace(
  /<link rel="stylesheet" crossorigin href="\/?assets\/index-[^"]+\.css">/,
  `<style>\n${css}\n</style>`,
);
// Make the script srcs root-relative (same-origin) so they resolve on the Worker.
html = html.replace(/src="\/?assets\//g, 'src="/assets/');

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

const worker = `// op0-landing preview — same-origin SPA (inlined CSS + JS chunks served from /assets).
const HTML = ${"`"}${esc(html)}${"`"};
const CHUNKS = {
  "/assets/react-CH5eSenG.js": ${"`"}${esc(reactJs)}${"`"},
  "/assets/index-Lmeloqo8.js": ${"`"}${esc(entryJs)}${"`"},
  "/assets/scene-BQo4z-y0.js": ${"`"}${esc(sceneJs)}${"`"},
};
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const chunk = CHUNKS[url.pathname];
    if (chunk) {
      return new Response(chunk, {
        headers: {
          "content-type": "text/javascript; charset=utf-8",
          "cache-control": "public, max-age=31536000, immutable",
          "x-content-type-options": "nosniff",
        },
      });
    }
    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=60, must-revalidate",
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin",
      },
    });
  },
};
`;

fs.writeFileSync("dist/worker.js", worker);
console.log("worker.js bytes:", worker.length, "(~", (worker.length / 1024 / 1024).toFixed(2), "MB)");
