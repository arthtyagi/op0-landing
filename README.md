# op0-landing

An **experimental** op0.dev landing surface — built with the real [`shaders`](https://shaders.com) npm package (WebGPU "Bad Signal"-style atmosphere), [shadcn/ui](https://ui.shadcn.com) components composed over the shader, [cordrun-skills](https://github.com/arthtyagi/cordrun-skills) design rules, deployed to Cloudflare Workers.

> **Status:** standalone preview (v2, experimental). Not the live deploy source for op0.dev — iterate here first, repoint later.

## Live preview

- **Preview URL:** https://op0-landing-preview.op0.workers.dev
- **Worker:** `op0-landing-preview` (Cloudflare account `op0-ai`)
- The production `op0-web` Worker on `op0.dev` is untouched.

## What's here

```
index.html              — Vite entry
src/main.tsx            — React root
src/landing.tsx         — the experimental page (shader bg + shadcn-over-shader composition)
src/globals.css         — Tailwind v4 + op0 brand tokens (@theme inline)
src/shader/             — the shader atmosphere (preset, lazy scene, atmosphere wrapper)
src/components/ui/      — hand-ported shadcn components (Button, Card, Badge, Tabs)
src/lib/utils.ts        — cn() helper
vite.config.ts          — Vite + React + Tailwind v4 + manual chunks (shader/three split out)
scripts/build-worker.cjs — builds the all-in-one deploy Worker (inlines CSS, serves JS chunks same-origin)
alchemy.run.ts          — Alchemy v2 deploy definition (for when alchemy is installed)
wrangler.jsonc          — manual wrangler fallback config
```

## Stack

- **Shader:** the real [`shaders`](https://shaders.com) npm package (v2.5.134) + `three` — a "Bad Signal"-style WebGPU stack: `SolidColor → Swirl → CRTScreen(Checkerboard + SineWave + CursorTrail + Liquify + Ascii "op0·░▒") → Godrays → ChromaticAberration → FilmGrain`. Lazy-loaded, mouse-reactive, reduced-motion CSS fallback.
- **UI:** shadcn/ui components (Button/Card/Badge/Tabs) hand-ported as React + Tailwind v4, themed via op0 brand tokens. Composed *over* the shader with `backdrop-blur` — not as the whole page.
- **Design:** cordrun-skills compose-ui rules (one primary button, hairlines not double-elevation, left-aligned with one centered CTA, reduced-motion-safe reveals). Geist + Geist Mono + Playfair Display (one editorial italic signature moment).
- **Build:** Vite 6 + React 19 + Tailwind v4. `npm run build` → `dist/`.
- **Deploy:** all-in-one Cloudflare Worker (CSS inlined into HTML; JS chunks served same-origin at `/assets/*` so relative + dynamic imports resolve without CORS). See `scripts/build-worker.cjs`.

## Deploy

### Option A — all-in-one Worker (current path, no alchemy needed)

```bash
npm install
npm run build                       # vite build -> dist/
node scripts/build-worker.cjs       # -> dist/worker.js (all-in-one)
# PUT dist/worker.js to /accounts/{id}/workers/scripts/op0-landing-preview
# (the executor Cloudflare connection does this via multipart module upload)
```

### Option B — wrangler

```bash
npm install && npm run build
npx wrangler deploy --config wrangler.jsonc
```

### Option C — Alchemy v2 (when alchemy is installed)

```bash
npm i -D alchemy@next
CLOUDFLARE_API_TOKEN=… CLOUDFLARE_ACCOUNT_ID=… alchemy deploy --stage preview
```

## Design notes

- One accent (`ignite #eb652b`) — Warp/Trigger.dev single-accent discipline. No default-AI indigo.
- One filled primary button per page; everything else secondary (cordrun buttons rule).
- Left-aligned sections; only the Early-Access CTA is centered (cordrun section-layout).
- Hairline borders only — no double elevation (border + shadow together).
- The **Proposal card** is the signature element (the one signed object op0 emits) — recurs as the page's motif.
- `// code-comment` eyebrows = programmer voice (Langbase reference).
- Blueprint hairline grid = diagram-as-credibility (Trunk reference).
- Scroll reveal: opacity + transform only, `prefers-reduced-motion` safe (cordrun motion rule).

## Source

Redesigned from the landing page in [`arthtyagi/opzero`](https://github.com/arthtyagi/opzero) (`apps/web`), per the positioning in `apps/web/src/landing/POSITIONING.md` (V9).
