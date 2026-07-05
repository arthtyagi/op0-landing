const fs = require("fs");
const html = fs.readFileSync("src/index.html", "utf8");

// Escape backticks and ${ for embedding in a JS template string.
const escaped = html.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

const worker = `// op0-landing — static landing page Worker (single file, no bundler).
// Serves the redesigned op0.dev landing page. Standalone preview — NOT op0.dev.
const HTML = ${"`"}${escaped}${"`"};

export default {
  async fetch() {
    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300, must-revalidate",
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin",
      },
    });
  },
};
`;

fs.writeFileSync("dist/worker.js", worker);
console.log("dist/worker.js bytes:", worker.length);
