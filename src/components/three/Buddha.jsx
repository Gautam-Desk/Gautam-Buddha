import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Ascending spiritual Dhamma fireflies/embers orbiting the Buddha.
 */
function BuddhaEmbers({ count = 45 }) {
  const pointsRef = useRef();

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.6 + Math.random() * 1.8;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = -1.2 + Math.random() * 3.2;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      spd[i] = 0.004 + Math.random() * 0.008;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const arr = pointsRef.current.geometry.attributes.position.array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const yIdx = i * 3 + 1;
      const xIdx = i * 3;
      const zIdx = i * 3 + 2;

      arr[yIdx] += speeds[i];
      // Gentle spiral swirl
      arr[xIdx] += Math.sin(t * 0.8 + i) * 0.002;
      arr[zIdx] += Math.cos(t * 0.8 + i) * 0.002;

      if (arr[yIdx] > 2.2) {
        arr[yIdx] = -1.1;
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.5 + Math.random() * 1.6;
        arr[xIdx] = Math.cos(angle) * radius;
        arr[zIdx] = Math.sin(angle) * radius;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#ffe299"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Buddha() {
  const group = useRef();
  const haloRef = useRef();
  const innerHaloRef = useRef();
  const auraDiscRef = useRef();

  // Subtle breathing + dynamic pointer parallax
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    const breath = Math.sin(t * 0.75) * 0.02;

    if (group.current) {
      group.current.position.y = -0.08 + breath;
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.x * 0.18,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -pointer.y * 0.1,
        0.05
      );
    }

    // Rotating Concentric Halo (Prabhāmaṇḍala)
    if (haloRef.current) {
      haloRef.current.rotation.z = t * 0.15;
    }
    if (innerHaloRef.current) {
      innerHaloRef.current.rotation.z = -t * 0.22;
      const pulse = 1.0 + Math.sin(t * 1.5) * 0.04;
      innerHaloRef.current.scale.setScalar(pulse);
    }
    if (auraDiscRef.current) {
      const auraPulse = 0.35 + Math.sin(t * 1.2) * 0.12;
      auraDiscRef.current.material.opacity = auraPulse;
    }
  });

  // Gilded bronze and monastic gold materials
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d49643",
        roughness: 0.38,
        metalness: 0.42,
        emissive: "#542507",
        emissiveIntensity: 0.35,
      }),
    []
  );

  const robeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#bd7628",
        roughness: 0.52,
        metalness: 0.28,
        emissive: "#4a1c04",
        emissiveIntensity: 0.3,
      }),
    []
  );

  const goldTrimMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffd56b",
        roughness: 0.2,
        metalness: 0.6,
        emissive: "#b87208",
        emissiveIntensity: 0.7,
      }),
    []
  );

  const haloMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffda85",
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  return (
    <group ref={group} position={[0, -0.08, 0]} scale={1.15}>
      {/* 1. Luminous Golden Halo & Dharmacakra Behind Head */}
      <group position={[0, 0.85, -0.22]}>
        {/* Outer Halo Ring */}
        <mesh ref={haloRef} material={haloMat}>
          <ringGeometry args={[0.55, 0.68, 36]} />
        </mesh>

        {/* Inner Geometric Star Mandala */}
        <mesh ref={innerHaloRef} material={haloMat}>
          <ringGeometry args={[0.42, 0.49, 16]} />
        </mesh>

        {/* Glowing Aura Disc */}
        <mesh ref={auraDiscRef} position={[0, 0, -0.05]}>
          <circleGeometry args={[0.75, 32]} />
          <meshBasicMaterial
            color="#f7b748"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 2. Sculpted Lotus Throne Pedestal (Padmāsana) */}
      <group position={[0, -0.92, 0]}>
        {/* Tiered Base Rings */}
        <mesh position={[0, -0.15, 0]} material={goldTrimMat}>
          <cylinderGeometry args={[1.05, 1.25, 0.18, 32]} />
        </mesh>
        <mesh position={[0, -0.02, 0]} material={bodyMat}>
          <cylinderGeometry args={[0.92, 1.02, 0.14, 32]} />
        </mesh>

        {/* Ring of Lotus Petals on Pedestal */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const r = 0.95;
          return (
            <mesh
              key={`base-petal-${i}`}
              position={[Math.cos(angle) * r, 0.02, Math.sin(angle) * r]}
              rotation={[0.35, -angle, 0]}
              material={goldTrimMat}
            >
              <sphereGeometry args={[0.16, 12, 12]} />
            </mesh>
          );
        })}
      </group>

      {/* 3. Buddha Torso & Monastic Sanghati Robe */}
      <group position={[0, 0, 0]}>
        {/* Torso core */}
        <mesh position={[0, 0.08, 0]} material={bodyMat}>
          <sphereGeometry args={[0.56, 32, 32]} />
        </mesh>

        {/* Robe Drape Over Left Shoulder */}
        <mesh position={[-0.12, 0.15, 0.08]} rotation={[0, 0, 0.35]} material={robeMat}>
          <cylinderGeometry args={[0.42, 0.52, 0.65, 24]} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.85, 0]} material={bodyMat}>
          <sphereGeometry args={[0.36, 32, 32]} />
        </mesh>

        {/* Ushnisha (Wisdom Crown Knob) */}
        <mesh position={[0, 1.22, 0]} material={goldTrimMat}>
          <sphereGeometry args={[0.13, 20, 20]} />
        </mesh>
        <mesh position={[0, 1.34, 0]} material={goldTrimMat}>
          <sphereGeometry args={[0.05, 12, 12]} />
        </mesh>

        {/* Elongated Ear Lobes */}
        <mesh position={[-0.37, 0.78, 0]} material={bodyMat} rotation={[0, 0, 0.15]}>
          <torusGeometry args={[0.09, 0.028, 12, 24, Math.PI]} />
        </mesh>
        <mesh position={[0.37, 0.78, 0]} material={bodyMat} rotation={[0, Math.PI, 0.15]}>
          <torusGeometry args={[0.09, 0.028, 12, 24, Math.PI]} />
        </mesh>

        {/* Folded Arms in Dhyana Mudra (Hands in Lap) */}
        <mesh position={[0, -0.06, 0.36]} material={robeMat}>
          <sphereGeometry args={[0.44, 24, 24]} />
        </mesh>

        {/* Right hand resting over left hand in lap */}
        <mesh position={[0, -0.16, 0.46]} material={goldTrimMat}>
          <boxGeometry args={[0.32, 0.06, 0.18]} />
        </mesh>

        {/* Crossed Legs in Full Lotus (Padmasana) */}
        <mesh position={[-0.46, -0.48, 0.28]} rotation={[0.2, 0.4, 0]} material={robeMat}>
          <sphereGeometry args={[0.26, 20, 20]} />
        </mesh>
        <mesh position={[0.46, -0.48, 0.28]} rotation={[0.2, -0.4, 0]} material={robeMat}>
          <sphereGeometry args={[0.26, 20, 20]} />
        </mesh>
        <mesh position={[0, -0.52, 0.38]} material={robeMat}>
          <cylinderGeometry args={[0.62, 0.72, 0.24, 24]} />
        </mesh>
      </group>

      {/* 4. Swirling Spiritual Embers */}
      <BuddhaEmbers count={50} />
    </group>
  );
}
