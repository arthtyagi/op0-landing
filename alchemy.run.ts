// op0-landing — Alchemy v2 deploy definition.
// Deploy with: CLOUDFLARE_API_TOKEN=… CLOUDFLARE_ACCOUNT_ID=… alchemy deploy --stage preview
// (Requires alchemy@next installed via npm/bun. The static-port Worker can also be deployed
//  manually without Alchemy — see README "Option B".)
//
// ponytail: this is the Alchemy-ready path for when a package manager is available.
// It deploys the same single-file Worker as the manual path, just via IaC.

import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

const stage = process.env.ALCHEMY_STAGE?.trim() || "preview";

const workerName =
  stage === "prod" ? "op0-landing" : `op0-landing-${stage}`;

const app = await alchemy("op0-landing", { stage, adopt: true });

export const site = await Worker(workerName, {
  name: workerName,
  entrypoint: "./dist/worker.js",
  compatibility: { date: "2024-11-01" },
  // Standalone preview only — do NOT bind the op0.dev domain here.
  // Repointing op0.dev happens only after sign-off (per user).
  url: true,
  adopt: true,
});

console.log({ stage, name: workerName, url: site.url });

await app.finalize();
