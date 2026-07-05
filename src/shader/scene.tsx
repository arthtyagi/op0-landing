import { Shader, SolidColor, Swirl, CRTScreen, FilmGrain, Ascii, Checkerboard, SineWave, CursorTrail, Liquify, Godrays, ChromaticAberration } from "shaders/react";
import { SIGNAL } from "./preset";

/**
 * Full-bleed shader scene — "Bad Signal"-style CRT stack extended experimentally.
 * SolidColor base → Swirl → CRTScreen(checker + sine wave + cursor trail + liquify + ascii)
 * → Godrays → ChromaticAberration → FilmGrain.
 */
export default function ShaderScene() {
  return (
    <Shader
      className="absolute inset-0 h-full w-full"
      style={{ width: "100%", height: "100%" }}
    >
      <SolidColor color={SIGNAL.base} />
      <Swirl
        colorA={SIGNAL.ignite}
        colorB={SIGNAL.lilac}
        blend={SIGNAL.swirl.blend}
        detail={SIGNAL.swirl.detail}
        speed={SIGNAL.swirl.speed}
      />
      <CRTScreen
        blendMode="hardLight"
        brightness={SIGNAL.crt.brightness}
        contrast={SIGNAL.crt.contrast}
        colorShift={SIGNAL.crt.colorShift}
      >
        <Checkerboard colorA={SIGNAL.nightfall} colorB={SIGNAL.base} />
        <SineWave
          amplitude={SIGNAL.wave.amplitude}
          frequency={SIGNAL.wave.frequency}
          softness={SIGNAL.wave.softness}
          speed={SIGNAL.wave.speed}
          thickness={SIGNAL.wave.thickness}
        />
        <CursorTrail
          colorA={SIGNAL.trail.colorA}
          length={SIGNAL.trail.length}
          opacity={SIGNAL.trail.opacity}
          radius={SIGNAL.trail.radius}
        />
        <Liquify
          intensity={SIGNAL.liquify.intensity}
          stiffness={SIGNAL.liquify.stiffness}
          damping={SIGNAL.liquify.damping}
          radius={SIGNAL.liquify.radius}
        />
        <Ascii
          cellSize={SIGNAL.ascii.cellSize}
          characters={SIGNAL.ascii.characters}
          fontFamily={SIGNAL.ascii.fontFamily}
          gamma={SIGNAL.ascii.gamma}
          spacing={SIGNAL.ascii.spacing}
        />
      </CRTScreen>
      {/* experimental layer: volumetric light + chromatic fringe */}
      <Godrays
        density={SIGNAL.godrays.density}
        decay={SIGNAL.godrays.decay}
        exposure={SIGNAL.godrays.exposure}
        weight={SIGNAL.godrays.weight}
      />
      <ChromaticAberration offset={SIGNAL.chroma.offset} direction={SIGNAL.chroma.direction} />
      <FilmGrain strength={SIGNAL.grain} />
    </Shader>
  );
}
