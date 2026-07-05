/**
 * op0 signal preset — values for the full-bleed shader atmosphere.
 * Authored for op0-landing (not redistributed from the shaders preset library).
 * Warmer, darker night palette tuned for a full-bleed canvas behind content.
 */
export const SIGNAL = {
  base: "#0a0a0b",
  nightfall: "#131316",
  ignite: "#d4622e",
  lilac: "#8a8498",
  electric: "#f6f361",
  swirl: {
    speed: 1.6,
    speedReduced: 0.35,
    blend: 48,
    detail: 2.1,
  },
  crt: {
    colorShift: 3.2,
    brightness: 0.86,
    contrast: 1.12,
  },
  wave: {
    amplitude: 0.014,
    frequency: 0.8,
    softness: 0.3,
    thickness: 0.7,
    speed: 0.9,
  },
  liquify: {
    intensity: 6,
    stiffness: 4,
    damping: 2.6,
    radius: 0.68,
  },
  ascii: {
    characters: "op0·░▒",
    cellSize: 58,
    spacing: 0.5,
    gamma: 0.88,
    fontFamily: "Geist Mono",
  },
  grain: 0.012,
  trail: {
    colorA: "#e07a44",
    radius: 0.58,
    length: 0.6,
    opacity: 0.82,
  },
  // Experimental extras layered on top of the Bad-Signal-style stack.
  godrays: { density: 0.55, decay: 0.94, exposure: 0.9, weight: 0.4 },
  chroma: { offset: 0.0025, direction: 0 },
} as const;
