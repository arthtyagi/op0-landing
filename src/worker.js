// op0-landing — static landing page Worker.
// Serves the redesigned op0.dev landing page (single HTML file).
// Deployed standalone to a preview Workers URL — NOT op0.dev (per user: iterate first).
// ponytail: one file, one fetch handler, no bindings, no SSR.

import HTML from "./index.html";

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
