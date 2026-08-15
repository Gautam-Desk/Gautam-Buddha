import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LAYERS = [
  { count: 12, scale: 1.0, tiltBase: -Math.PI / 2.1, tiltBloom: 1.65, liftBloom: 0.08, yOffset: 0.0 },
  { count: 10, scale: 0.82, tiltBase: -Math.PI / 2.3, tiltBloom: 1.45, liftBloom: 0.12, yOffset: 0.05 },
  { count: 8, scale: 0.65, tiltBase: -Math.PI / 2.6, tiltBloom: 1.15, liftBloom: 0.16, yOffset: 0.1 },
];

/**
 * Creates an organic curved lotus petal with bevel and tapered tip.
 */
function createPetalGeometry(width = 0.28, length = 1.35) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(width * 0.7, length * 0.25, width, length * 0.7, 0, length);
  shape.bezierCurveTo(-width, length * 0.7, -width * 0.7, length * 0.25, 0, 0);

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.035,
    bevelEnabled: true,
    bevelSize: 0.018,
    bevelThickness: 0.018,
    bevelSegments: 4,
    curveSegments: 28,
  });
}

/**
 * Golden spiritual pollen particles emitted from the lotus heart.
 */
function LotusPollen({ bloomRef, count = 60 }) {
  const pointsRef = useRef();

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.35;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = 0.1 + Math.random() * 0.8;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      vel[i * 3] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 1] = 0.003 + Math.random() * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const bloom = bloomRef.current || 0;
    const arr = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const yIdx = i * 3 + 1;
      arr[yIdx] += velocities[yIdx] * (0.4 + bloom * 1.2);
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      if (arr[yIdx] > 1.8) {
        arr[yIdx] = 0.15;
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (0.1 + bloom * 0.3);
        arr[i * 3] = Math.cos(angle) * radius;
        arr[i * 3 + 2] = Math.sin(angle) * radius;
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
        size={0.045}
        color="#ffe299"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Lotus({ bloomRef }) {
  const rootGroup = useRef();
  const auraRing = useRef();
  const petalMeshRefs = useRef([]);

  // Geometries for layered petals
  const outerPetalGeo = useMemo(() => createPetalGeometry(0.32, 1.45), []);
  const middlePetalGeo = useMemo(() => createPetalGeometry(0.28, 1.25), []);
  const innerPetalGeo = useMemo(() => createPetalGeometry(0.24, 1.05), []);

  // Shimmering materials
  const outerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#fce0cb",
        roughness: 0.32,
        metalness: 0.12,
        emissive: "#401c05",
        emissiveIntensity: 0.28,
        side: THREE.DoubleSide,
      }),
    []
  );

  const middleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#fddac0",
        roughness: 0.28,
        metalness: 0.18,
        emissive: "#502408",
        emissiveIntensity: 0.35,
        side: THREE.DoubleSide,
      }),
    []
  );

  const innerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#fae2bd",
        roughness: 0.25,
        metalness: 0.22,
        emissive: "#65320a",
        emissiveIntensity: 0.45,
        side: THREE.DoubleSide,
      }),
    []
  );

  const centerReceptacleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f5c94e",
        roughness: 0.2,
        metalness: 0.35,
        emissive: "#8c5310",
        emissiveIntensity: 0.7,
      }),
    []
  );

  const stamenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffe082",
        roughness: 0.15,
        metalness: 0.4,
        emissive: "#e69519",
        emissiveIntensity: 0.9,
      }),
    []
  );

  // Animate petals, smooth rotation, wave breathing, and golden aura
  useFrame(({ clock, pointer }) => {
    if (!rootGroup.current) return;
    const bloom = bloomRef ? bloomRef.current : 0.85; // 0..1
    const t = clock.getElapsedTime();

    // Gentle global rotation + subtle interactive pointer tilt
    rootGroup.current.rotation.y = t * 0.12;
    rootGroup.current.rotation.x = THREE.MathUtils.lerp(
      rootGroup.current.rotation.x,
      -pointer.y * 0.15,
      0.05
    );
    rootGroup.current.rotation.z = THREE.MathUtils.lerp(
      rootGroup.current.rotation.z,
      pointer.x * 0.15,
      0.05
    );

    // Dynamic Aura Ring
    if (auraRing.current) {
      auraRing.current.rotation.z -= 0.008;
      const targetScale = 1.0 + bloom * 0.6 + Math.sin(t * 1.5) * 0.05;
      auraRing.current.scale.setScalar(targetScale);
      auraRing.current.material.opacity = 0.2 + bloom * 0.5;
    }

    // Animate each petal with organic ripple offsets
    let meshIndex = 0;
    LAYERS.forEach((layer, lIdx) => {
      for (let i = 0; i < layer.count; i++) {
        const mesh = petalMeshRefs.current[meshIndex];
        if (mesh) {
          // Petal breathing wave
          const wave = Math.sin(t * 1.8 + i * 0.4 + lIdx * 0.6) * 0.025;
          const targetTilt = layer.tiltBase + bloom * layer.tiltBloom + wave;
          const targetLift = bloom * layer.liftBloom;

          mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetTilt, 0.08);
          mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, layer.yOffset + targetLift, 0.08);
        }
        meshIndex++;
      }
    });
  });

  return (
    <group ref={rootGroup} position={[0, -0.35, 0]} scale={0.88}>
      {/* 1. Golden Aura Mandala Disc under Lotus */}
      <mesh ref={auraRing} position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.25, 48]} />
        <meshBasicMaterial
          color="#fbd38d"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 2. Seed Receptacle & Center Pod */}
      <group position={[0, 0.06, 0]}>
        {/* Central Dome */}
        <mesh material={centerReceptacleMat}>
          <cylinderGeometry args={[0.22, 0.16, 0.12, 32]} />
        </mesh>
        <mesh position={[0, 0.06, 0]} material={centerReceptacleMat}>
          <sphereGeometry args={[0.21, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        </mesh>

        {/* Ring of Golden Stamens (Anthers) */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const r = 0.25;
          return (
            <mesh
              key={`stamen-${i}`}
              position={[Math.cos(angle) * r, 0.04, Math.sin(angle) * r]}
              material={stamenMat}
            >
              <sphereGeometry args={[0.028, 12, 12]} />
            </mesh>
          );
        })}
      </group>

      {/* 3. Layered Concentric Petals */}
      {LAYERS.map((layer, lIdx) => {
        const geo =
          lIdx === 0 ? outerPetalGeo : lIdx === 1 ? middlePetalGeo : innerPetalGeo;
        const mat =
          lIdx === 0 ? outerMat : lIdx === 1 ? middleMat : innerMat;
        const rotationOffset = (lIdx * Math.PI) / layer.count;

        return (
          <group key={`layer-${lIdx}`} rotation={[0, rotationOffset, 0]}>
            {Array.from({ length: layer.count }).map((_, i) => {
              const angle = (i / layer.count) * Math.PI * 2;
              const globalIndex =
                LAYERS.slice(0, lIdx).reduce((acc, curr) => acc + curr.count, 0) + i;

              return (
                <mesh
                  key={`petal-${lIdx}-${i}`}
                  ref={(el) => (petalMeshRefs.current[globalIndex] = el)}
                  geometry={geo}
                  material={mat}
                  scale={[layer.scale, layer.scale, layer.scale]}
                  position={[0, layer.yOffset, 0]}
                  rotation={[0, 0, angle]}
                />
              );
            })}
          </group>
        );
      })}

      {/* 4. Spiritual Golden Pollen Particles */}
      <LotusPollen bloomRef={bloomRef} count={70} />
    </group>
  );
}
