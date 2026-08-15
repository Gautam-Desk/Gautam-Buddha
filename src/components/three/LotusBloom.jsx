import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense } from "react";
import Lotus from "./Lotus";

function LotusDriver({ manualBloom, isAutoPulse }) {
  const bloomRef = useRef(0.85);

  useEffect(() => {
    if (manualBloom !== null && manualBloom !== undefined) {
      bloomRef.current = manualBloom;
      return;
    }

    const compute = () => {
      if (isAutoPulse) return;
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const docProgress = docH > 0 ? scrollY / docH : 0;
      // Lotus in Awakening section (~0.12 - 0.40)
      const local = Math.min(1, Math.max(0, (docProgress - 0.12) / 0.28));
      bloomRef.current = local;
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [manualBloom, isAutoPulse]);

  useFrame(({ clock }) => {
    if (isAutoPulse) {
      // Gentle meditative breathing oscillation (10s period)
      const t = clock.getElapsedTime();
      const wave = (Math.sin((t * Math.PI * 2) / 10) + 1) * 0.5; // 0..1
      bloomRef.current = 0.2 + wave * 0.8;
    } else if (manualBloom !== null && manualBloom !== undefined) {
      bloomRef.current = manualBloom;
    }
  });

  return <Lotus bloomRef={bloomRef} />;
}

export default function LotusBloom({
  isVisible = true,
  manualBloom = null,
  manualProgress = null,
  isAutoPulse = false,
  autoPulse = false,
}) {
  const effectiveBloom = manualBloom !== null ? manualBloom : manualProgress;
  const effectiveAutoPulse = isAutoPulse || autoPulse;

  return (
    <Canvas
      frameloop={isVisible ? "always" : "never"}
      camera={{ position: [0, 0.9, 3.1], fov: 36 }}
      dpr={[1, typeof window !== "undefined" && window.innerWidth < 768 ? 1.25 : 1.75]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor("#120b04", 0);
      }}
    >
      {/* Radiant warm spiritual illumination */}
      <ambientLight intensity={0.55} color="#ffd7a0" />
      <directionalLight position={[2, 3.5, 2.5]} intensity={1.3} color="#ffe8c2" />
      <directionalLight position={[-2.5, 1.5, -2]} intensity={0.6} color="#c47a2a" />
      <pointLight position={[0, 0.8, 1.2]} intensity={1.8} color="#ffcf86" distance={5} />

      <Suspense fallback={null}>
        <LotusDriver manualBloom={effectiveBloom} isAutoPulse={effectiveAutoPulse} />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.7}
            mipmapBlur
          />
          <Vignette offset={0.25} darkness={0.75} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
