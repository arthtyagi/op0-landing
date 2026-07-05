import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ShaderAtmosphere } from "./shader/atmosphere";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

const EASE = [0.22, 1, 0.36, 1] as const;

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll<HTMLElement>(".reveal").forEach((n, i) => {
            setTimeout(() => n.classList.add("is-in"), i * 90);
          });
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

const LOOP = [
  { n: "01", tag: "signal", title: "something breaks.", body: "a replay, an error, a user annotation — a typed signal lands in the inbox. not a ticket. a signal." },
  { n: "02", tag: "context", title: "op0 assembles the room.", body: "replay, events, git state, prior version — gathered into one context bundle the agent can read in a single pass." },
  { n: "03", tag: "proposal", title: "an agent drafts a proposal.", body: "bounded by the rig. one object: diff, preview, policy decision, rollback target. reviewers sign the same thing operators revert." },
  { n: "04", tag: "ship", title: "it ships, reversibly.", body: "delivery emits a signed manifest and a PR. every deploy names what it would roll back to. nothing ships without a way home." },
];

const LAYERS = [
  { k: "above", title: "whatever writes the code", body: "ide agents, cli agents, autonomous engineers, always-on repo daemons, agents that read analytics and propose. op0 picks up the commit." },
  { k: "op0", title: "proposals, manifests, rollback", body: "one signed object per change. delivered to the surface, recorded in audit, reversible by name. the middle layer." },
  { k: "below", title: "whatever runs underneath", body: "sandboxes, browsers, source adapters, edge delivery, mcp transports. abstracted behind one command surface — http, cli, desktop, mcp." },
];

export function Landing() {
  const heroRef = useReveal();
  const loopRef = useReveal();
  const layersRef = useReveal();
  const closeRef = useReveal();

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background text-foreground">
      {/* full-bleed shader atmosphere — fixed behind everything */}
      <div className="fixed inset-0 z-0">
        <ShaderAtmosphere />
        {/* readability scrim — keeps floating content legible over the shader */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.35) 40%, rgba(10,10,11,0.7) 100%)",
          }}
        />
      </div>

      {/* skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-secondary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:outline-2 focus:outline-ring"
      >
        skip to content
      </a>

      {/* nav — minimal, floating, text-only (cordrun navigation) */}
      <nav
        aria-label="primary"
        className="fixed inset-x-0 top-4 z-40 mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-pill border border-border bg-secondary/50 px-5 py-2.5 backdrop-blur-xl"
      >
        <a href="/" className="font-display text-base font-semibold tracking-tight">
          op0
        </a>
        <ul role="list" className="hidden gap-7 text-sm text-muted-foreground sm:flex">
          <li><a className="transition-colors hover:text-foreground" href="#loop">loop</a></li>
          <li><a className="transition-colors hover:text-foreground" href="#layers">layers</a></li>
          <li><a className="transition-colors hover:text-foreground" href="#access">access</a></li>
        </ul>
        <Button asChild size="sm" variant="outline" className="h-8 px-3.5 text-xs">
          <a href="#access">request access</a>
        </Button>
      </nav>

      <main id="main" className="relative z-10">
        {/* ===== HERO — asymmetric, content floats over the shader ===== */}
        <section ref={heroRef} className="relative flex min-h-dvh items-center px-6 pt-28 pb-16 sm:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="reveal font-mono text-xs lowercase tracking-wide text-ignite"
                >
                  // a surface for shipping software with agents
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
                  className="reveal mt-6 font-display text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-balance"
                >
                  ship software
                  <br />
                  <span className="font-editorial italic font-medium text-ignite">the way agents</span>
                  <br />
                  already write it.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
                  className="reveal mt-8 max-w-[44ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                  agents already write code. op0 is the surface that turns what they write into
                  shipped product — every change a signed object, every release reversible by name.
                  not another tool. the layer underneath your tools.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
                  className="reveal mt-9 flex flex-wrap items-center gap-2.5"
                >
                  <Button asChild size="lg">
                    <a href="#access">try with your agent</a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="#loop">watch the loop</a>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.44, ease: EASE }}
                  className="reveal mt-7 flex flex-col gap-2"
                >
                  <code className="w-fit rounded-lg border border-border bg-secondary/60 px-3.5 py-2 font-mono text-xs text-foreground/90 sm:text-sm">
                    <span className="text-muted-foreground">$</span> curl -fsSL https://op0.dev/install | bash
                  </code>
                  <p className="font-mono text-xs lowercase tracking-wide text-muted-foreground">
                    <span className="mr-1.5 inline-block size-1 rounded-full bg-ignite align-middle" />
                    private preview · v0.1
                  </p>
                </motion.div>
              </div>

              {/* floating proposal-object card — the signature element, over the shader */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                className="reveal lg:mb-2"
              >
                <Card className="w-full max-w-sm border-lilac/20 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
                  <CardHeader className="flex-row items-center justify-between gap-3 border-b border-border pb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="lilac">
                        <span className="size-1.5 rounded-full bg-lilac" /> proposal·0xa4f
                      </Badge>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">studio</span>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="font-display text-base font-semibold tracking-tight">
                      single-step checkout
                    </p>
                    <dl className="mt-4 divide-y divide-border">
                      {[
                        { k: "diff", v: "+128 −64", h: "apps/checkout" },
                        { k: "preview", v: "3 routes", h: "/ · /cart · /checkout" },
                        { k: "policy", v: "4/4 pass", h: "lint·types·build·replay" },
                        { k: "rollback", v: "manifest@v37", h: "named · 2h ago" },
                      ].map((r) => (
                        <div key={r.k} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 py-3">
                          <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{r.k}</dt>
                          <dd>
                            <p className="truncate font-mono text-sm text-foreground">{r.v}</p>
                            <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">{r.h}</p>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
                <p className="mt-3 pl-1 font-mono text-xs lowercase tracking-wide text-muted-foreground">
                  the only object op0 emits
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== LOOP — a shadcn Tabs "console" floating over the shader ===== */}
        <section ref={loopRef} id="loop" className="relative px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="reveal max-w-2xl">
              <p className="font-mono text-xs lowercase tracking-wide text-ignite">// the loop</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                from a broken thing to a shipped fix, in four moves.
              </h2>
              <p className="mt-6 max-w-[56ch] text-pretty text-base leading-relaxed text-muted-foreground">
                every step writes evidence. every step has a name an agent can read. this is the
                whole shape of op0 — the rest is detail.
              </p>
            </div>

            <div className="reveal mt-12">
              <Tabs defaultValue="01" className="w-full">
                <TabsList className="mb-6 flex-wrap">
                  {LOOP.map((s) => (
                    <TabsTrigger key={s.n} value={s.n}>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">{s.n}</span>
                      <span className="ml-2">{s.tag}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {LOOP.map((s) => (
                  <TabsContent key={s.n} value={s.n}>
                    <Card className="border-ignite/20">
                      <CardHeader>
                        <Badge variant="ignite" className="w-fit">{s.tag}</Badge>
                        <CardTitle className="mt-2 text-2xl sm:text-3xl">{s.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="max-w-[52ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                          {s.body}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        {/* ===== LAYERS — where op0 sits, three floating cards ===== */}
        <section ref={layersRef} id="layers" className="relative px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="reveal max-w-2xl">
              <p className="font-mono text-xs lowercase tracking-wide text-ignite">// where op0 sits</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                we don't replace your agent. we sit underneath it.
              </h2>
            </div>
            <ul role="list" className="mt-12 grid gap-5 lg:grid-cols-3">
              {LAYERS.map((l, i) => (
                <li key={l.k} className={`reveal ${i === 1 ? "lg:-translate-y-4" : ""}`}>
                  <Card className={i === 1 ? "border-ignite/30 bg-secondary/80" : "bg-secondary/50"}>
                    <CardHeader>
                      <span className="font-mono text-xs lowercase tracking-wide text-muted-foreground">{l.k}</span>
                      <CardTitle className="mt-1 text-xl">{l.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">{l.body}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== ACCESS — the one centered moment ===== */}
        <section ref={closeRef} id="access" className="relative px-6 py-32 text-center sm:py-40">
          <div className="reveal mx-auto max-w-2xl">
            <p className="font-mono text-xs lowercase tracking-wide text-ignite">// early access</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              six teams. <span className="font-editorial italic text-mint">building the future</span> with us.
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              shipping with agents and tired of approvals scattered across PR threads, linear
              comments, and slack dms. we'll build the runtime alongside you.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Button asChild size="lg" className="bg-ignite text-accent-foreground hover:bg-ignite/90">
                <a href="mailto:ship@op0.dev?subject=op0%20early%20access">email our ship agent</a>
              </Button>
              <p className="font-mono text-xs lowercase tracking-wide text-muted-foreground">ship@op0.dev · direct line</p>
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="relative border-t border-border py-12">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center sm:px-10">
            <div>
              <a href="/" className="font-display text-base font-semibold tracking-tight">op0</a>
              <p className="mt-1.5 font-mono text-xs lowercase tracking-wide text-muted-foreground">runtime for adaptive software</p>
            </div>
            <ul role="list" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li><a className="transition-colors hover:text-foreground" href="#loop">loop</a></li>
              <li><a className="transition-colors hover:text-foreground" href="#layers">layers</a></li>
              <li><a className="transition-colors hover:text-foreground" href="#access">access</a></li>
              <li><a className="transition-colors hover:text-foreground" href="mailto:ship@op0.dev">ship@op0.dev</a></li>
            </ul>
          </div>
        </footer>
      </main>
    </div>
  );
}
