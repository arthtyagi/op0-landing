import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Shader, SolidColor, Swirl, CRTScreen, FilmGrain, Ascii, Checkerboard, SineWave, CursorTrail, Liquify, Godrays, ChromaticAberration } from "shaders/react";
import { SIGNAL } from "./preset";

// Lazy-load the shader so the main bundle renders fast and the heavy
// WebGPU/WebGL stack initializes off the critical path.
const ShaderScene = lazy(() => import("./scene"));

function Fallback() {
  // CSS-only static atmosphere: scanlines + vignette, no GPU.
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-0 bg-[#0a0a0b]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.035) 3px, rgba(255,255,255,0.035) 4px), radial-gradient(70% 60% at 60% 35%, rgba(212,98,46,0.18), transparent 70%)",
      }}
    />
  );
}

export function ShaderAtmosphere({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Pause the shader when the hero scrolls off-screen to save GPU.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!mounted || reduce) return <Fallback />;

  return (
    <div ref={ref} aria-hidden className={`absolute inset-0 z-0 ${className}`}>
      {visible && (
        <Suspense fallback={<Fallback />}>
          <ShaderScene />
        </Suspense>
      )}
      {!visible && <Fallback />}
    </div>
  );
}
