import { useEffect, useRef } from "react";
import { useAnimation } from "../context/AnimationContext";

export default function ZenCursor() {
  const { animMode } = useAnimation();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isTouchDeviceRef = useRef(false);

  useEffect(() => {
    // Detect touch device
    if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      isTouchDeviceRef.current = true;
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let currentScale = 1.0;
    let targetScale = 1.0;
    let isHovered = false;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Smooth lerp loop for position AND scale to eliminate any navbar jitter
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      currentScale += (targetScale - currentScale) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
      }

      rafId = requestAnimationFrame(render);
    };

    // Continuous hover check with smooth target scaling
    const handleMouseOver = (e) => {
      const target = e.target.closest("button, a, input, select, textarea, [role='button'], [tabindex='0'], nav, header");
      isHovered = !!target;
      targetScale = isHovered ? 1.35 : 1.0;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.4 : 1.0})`;
      }
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget) {
        targetScale = 1.0;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDeviceRef.current || animMode === "still") return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] overflow-hidden"
    >
      {/* Outer Trailing Glowing Golden Halo Ring with zero-jitter lerp physics */}
      <div
        ref={ringRef}
        className="absolute h-8 w-8 rounded-full border border-gold-400/60 bg-gold-500/10 shadow-[0_0_16px_rgba(217,164,65,0.35)]"
        style={{ left: 0, top: 0, willChange: "transform" }}
      />

      {/* Inner Pinpoint Golden Dhamma Light Bead */}
      <div
        ref={dotRef}
        className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-gold-200 to-gold-400 shadow-[0_0_10px_#fbd88d]"
        style={{ left: 0, top: 0, willChange: "transform" }}
      />
    </div>
  );
}
