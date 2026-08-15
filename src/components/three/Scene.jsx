import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import Buddha from "./Buddha";
import Mist, { COUNT_DESKTOP, COUNT_MOBILE } from "./Mist";
import useIsMobile from "../../hooks/useIsMobile";

export default function Scene({ isVisible = true }) {
  const isMobile = useIsMobile();

  const cameraConfig = useMemo(() => {
    if (isMobile) {
      return { position: [0, 0.45, 4.3], fov: 45 };
    }
    return { position: [0, 0.55, 3.8], fov: 36 };
  }, [isMobile]);

  return (
    <Canvas
      frameloop={isVisible ? "always" : "never"}
      camera={cameraConfig}
      dpr={[1, isMobile ? 1.25 : 1.75]}
      gl={{
        antialias: !isMobile,
        powerPreference: "high-performance",
      }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2("#120b04", 0.15);
      }}
    >
      {/* Warm temple lighting */}
      <ambientLight intensity={0.45} color="#f5d29a" />
      <directionalLight
        position={[3, 4, 2]}
        intensity={1.2}
        color="#ffcf86"
      />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.6}
        color="#a36a2a"
      />
      {/* Soft rim from behind */}
      <pointLight position={[0, 1.5, -2]} intensity={1.4} color="#ffd7a0" distance={6} />

      <Suspense fallback={null}>
        <Buddha />
        <Mist count={isMobile ? COUNT_MOBILE : COUNT_DESKTOP} />

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.75}
            luminanceThreshold={0.45}
            luminanceSmoothing={0.6}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.25} darkness={0.8} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
