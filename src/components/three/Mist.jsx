import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT_DESKTOP = 1200;
const COUNT_MOBILE = 400;

/**
 * Drifting mist particles — thousands of soft, slowly-moving points.
 */
export default function Mist({ count = COUNT_DESKTOP }) {
  const ref = useRef();

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12; // x
      pos[i * 3 + 1] = Math.random() * 6 - 1.5; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1; // z
      spd[i] = 0.05 + Math.random() * 0.15;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const yi = i * 3 + 1;
      const xi = i * 3;
      arr[yi] += speeds[i] * delta * 0.1;
      arr[xi] += Math.sin(state.clock.elapsedTime + i) * 0.0015;
      if (arr[yi] > 4) arr[yi] = -2;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f4c98a"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export { COUNT_DESKTOP, COUNT_MOBILE };
