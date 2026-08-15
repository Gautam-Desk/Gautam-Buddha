import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

export default function BreathOrb({ phaseRef }) {
  const mesh = useRef();
  const innerMesh = useRef();
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame(({ clock }) => {
    if (!mesh.current || !phaseRef.current) return;
    const { phase, t } = phaseRef.current; // t is 0..1 within current phase
    const time = clock.getElapsedTime();

    let scale = 1;
    if (phase === "in") {
      scale = 0.65 + 0.75 * t; // Smooth expansion
    } else if (phase === "hold") {
      scale = 1.4; // Full expansion
    } else if (phase === "out") {
      scale = 1.4 - 0.75 * t; // Smooth contraction
    } else if (phase === "holdAfter") {
      scale = 0.65; // Stillness at rest
    }

    mesh.current.scale.setScalar(scale);
    mesh.current.rotation.y = time * 0.25;
    mesh.current.rotation.x = time * 0.15;

    if (innerMesh.current) {
      innerMesh.current.scale.setScalar(scale * 0.85);
      innerMesh.current.rotation.y = -time * 0.4;
      innerMesh.current.rotation.z = time * 0.2;
    }

    if (ring1.current) {
      ring1.current.rotation.z += 0.006;
      ring1.current.scale.setScalar(scale * 1.3);
    }

    if (ring2.current) {
      ring2.current.rotation.x += 0.008;
      ring2.current.rotation.y += 0.005;
      ring2.current.scale.setScalar(scale * 1.15);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} color="#ffd7a0" />
      <pointLight position={[0, 0, 2.5]} intensity={2.2} color="#ffcf86" />
      <pointLight position={[0, -1.5, -1]} intensity={1.2} color="#c47a2a" />

      {/* Main Glowing Breath Orb */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.68, 4]} />
        <meshStandardMaterial
          color="#f5c97e"
          roughness={0.2}
          metalness={0.45}
          emissive="#d98c3a"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Inner Sacred Geometric Core */}
      <mesh ref={innerMesh}>
        <octahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial
          color="#ffe8a8"
          roughness={0.15}
          metalness={0.6}
          emissive="#f19a26"
          emissiveIntensity={1.5}
          wireframe
        />
      </mesh>

      {/* Concentric Halo Rings */}
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.016, 16, 64]} />
        <meshBasicMaterial color="#ffd7a0" transparent opacity={0.6} />
      </mesh>

      <mesh ref={ring2} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[0.82, 0.012, 16, 64]} />
        <meshBasicMaterial color="#f7b94a" transparent opacity={0.45} />
      </mesh>

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.9} luminanceThreshold={0.4} luminanceSmoothing={0.7} mipmapBlur />
      </EffectComposer>
    </>
  );
}
