import { useMemo } from "react";
import { useAnimation } from "../context/AnimationContext";

const LEAF_COUNT = 16;

export default function FloatingBodhiLeaves() {
  const { animMode } = useAnimation();

  const leaves = useMemo(() => {
    return Array.from({ length: LEAF_COUNT }).map((_, i) => ({
      id: i,
      left: `${(i * 100) / LEAF_COUNT + (Math.random() * 4 - 2)}%`,
      delay: `${(i * 1.8) % 15}s`,
      duration: `${14 + (i % 6) * 3}s`,
      size: `${14 + (i % 4) * 6}px`,
      opacity: 0.2 + (i % 3) * 0.08,
      rotation: `${(i * 45) % 360}deg`,
    }));
  }, []);

  if (animMode === "still") return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {leaves.slice(0, animMode === "subtle" ? 8 : LEAF_COUNT).map((leaf) => (
        <div
          key={leaf.id}
          className="absolute text-gold-400/80 animate-float-leaf select-none"
          style={{
            left: leaf.left,
            top: "-40px",
            fontSize: leaf.size,
            opacity: animMode === "subtle" ? leaf.opacity * 0.6 : leaf.opacity,
            animationDelay: leaf.delay,
            animationDuration: animMode === "subtle" ? "22s" : leaf.duration,
            transform: `rotate(${leaf.rotation})`,
          }}
        >
          🍃
        </div>
      ))}
    </div>
  );
}
