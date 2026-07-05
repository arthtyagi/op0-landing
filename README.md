# op0-landing

The op0.dev landing page — **redesigned** with [cordrun-skills](https://github.com/arthtyagi/cordrun-skills) (design engineering) + [shadcn/ui](https://ui.shadcn.com) theming, deployed to Cloudflare Workers via [Alchemy v2](https://v2.alchemy.run).

> **Status:** standalone preview. This repo is **not** the live deploy source for op0.dev yet — iterate here first, repoint later.

## Live preview

- **Preview URL:** https://op0-landing-preview.op0.workers.dev
- **Worker:** `op0-landing-preview` (Cloudflare account `op0-ai`)
- The production `op0-web` Worker on `op0.dev` is untouched.

## What's here

```
src/index.html   — the redesigned landing page (self-contained, shadcn static-port)
src/worker.js    — Cloudflare Worker that serves the HTML (dev/source form)
dist/worker.js   — built single-file Worker (HTML inlined) — what actually deploys
scripts/build.js — inlines index.html into dist/worker.js (no bundler needed)
alchemy.run.ts   — Alchemy v2 deploy definition (Workers + assets) — for when npm is available
wrangler.jsonc   — manual wrangler fallback deploy config
```

## Stack

- **Design:** cordrun-skills compose-ui pipeline (wireframe → art-direction → compose-ui → review), shadcn/ui token theming (brand palette as CSS variables), Tailwind v4 (Play CDN for the static-port), Geist + Geist Mono + Playfair Display.
- **Runtime:** Cloudflare Workers (static assets). No SSR, no build tooling required for the static port — `node scripts/build.js` inlines the HTML into the Worker.
- **IaC:** Alchemy v2 (`alchemy.run.ts`) — deploy with `alchemy deploy` once Alchemy is installed.

## Deploy

### Option A — Alchemy v2 (preferred when npm is available)

```bash
bun add alchemy@next       # or npm i -D alchemy@next
CLOUDFLARE_API_TOKEN=… CLOUDFLARE_ACCOUNT_ID=… alchemy deploy --stage preview
```

### Option B — manual Worker upload (no npm; current path)

```bash
node scripts/build.js                    # inlines index.html → dist/worker.js
# then PUT dist/worker.js to /accounts/{id}/workers/scripts/op0-landing-preview
# (the executor Cloudflare connection does this via the multipart metadata + module form)
```

### Option C — wrangler

```bash
npx wrangler deploy --config wrangler.jsonc
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
