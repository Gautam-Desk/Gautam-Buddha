import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import BreathOrb from "./BreathOrb";

const DEFAULT_PATTERN = {
  in: 4,
  hold: 4,
  out: 4,
  holdAfter: 4,
};

function BreathOrbInternal({
  pattern = DEFAULT_PATTERN,
  onCycleComplete,
  domRefs,
  isActive = false,
  isPaused = false,
}) {
  const phaseRef = useRef({ phase: "idle", t: 0 });
  const lastPhaseRef = useRef("idle");
  const lastDisplayedTimeRef = useRef("");
  const prevLocalRef = useRef(0);
  const elapsedTimeRef = useRef(0);
  const lastFrameTimeRef = useRef(performance.now());

  // Reset or initialize clock when pattern or active state changes
  useEffect(() => {
    lastFrameTimeRef.current = performance.now();
    if (!isActive && !isPaused) {
      elapsedTimeRef.current = 0;
      prevLocalRef.current = 0;
      lastDisplayedTimeRef.current = "";
      lastPhaseRef.current = "idle";
      phaseRef.current = { phase: "idle", t: 0 };

      if (domRefs) {
        if (domRefs.progressBarRef.current) {
          domRefs.progressBarRef.current.style.width = "0%";
        }
        if (domRefs.countRef.current) {
          domRefs.countRef.current.textContent = (pattern.in || 4.0).toFixed(1);
        }
        if (domRefs.labelRef.current) {
          domRefs.labelRef.current.textContent = "Ready";
        }
        if (domRefs.instructionRef.current) {
          domRefs.instructionRef.current.textContent =
            "Press 'Start Meditation' above to begin mindful breathing";
        }
      }
    } else if (isPaused) {
      if (domRefs) {
        if (domRefs.labelRef.current) {
          domRefs.labelRef.current.textContent = "Paused";
        }
        if (domRefs.instructionRef.current) {
          domRefs.instructionRef.current.textContent =
            "Session paused. Click 'Resume Meditation' to continue.";
        }
      }
    }
  }, [pattern, isActive, isPaused]);

  useFrame(() => {
    const now = performance.now();
    const deltaMs = now - lastFrameTimeRef.current;
    lastFrameTimeRef.current = now;

    if (!isActive) {
      return;
    }

    // Accumulate elapsed active time
    elapsedTimeRef.current += deltaMs / 1000;
    const t = elapsedTimeRef.current;

    const cycleTotal =
      (pattern.in || 4) +
      (pattern.hold || 0) +
      (pattern.out || 4) +
      (pattern.holdAfter || 0);

    const local = t % cycleTotal;

    const tIn = pattern.in || 4;
    const tHold = tIn + (pattern.hold || 0);
    const tOut = tHold + (pattern.out || 4);

    let phase = "in";
    let frac = 0;
    let secondsLeft = 0;

    if (local < tIn) {
      phase = "in";
      frac = local / tIn;
      secondsLeft = tIn - local;
    } else if (local < tHold) {
      phase = "hold";
      frac = (local - tIn) / (pattern.hold || 1);
      secondsLeft = tHold - local;
    } else if (local < tOut) {
      phase = "out";
      frac = (local - tHold) / (pattern.out || 1);
      secondsLeft = tOut - local;
    } else {
      phase = "holdAfter";
      frac = (local - tOut) / (pattern.holdAfter || 1);
      secondsLeft = cycleTotal - local;
    }

    // Direct update to Three.js mesh controller ref
    phaseRef.current = { phase, t: frac };

    // Update DOM directly with zero React re-render overhead
    if (domRefs) {
      if (domRefs.progressBarRef.current) {
        domRefs.progressBarRef.current.style.width = `${Math.min(100, Math.max(0, frac * 100))}%`;
      }

      // Display high-precision decimal seconds (e.g. 4.0, 3.9, 3.8...)
      const displayString = Math.max(0.1, secondsLeft).toFixed(1);
      if (displayString !== lastDisplayedTimeRef.current) {
        lastDisplayedTimeRef.current = displayString;
        if (domRefs.countRef.current) {
          domRefs.countRef.current.textContent = displayString;
        }
      }

      if (phase !== lastPhaseRef.current) {
        lastPhaseRef.current = phase;
        if (domRefs.labelRef.current) {
          let label = "Inhale";
          let instruction = "Breathe in slowly & deeply through the nose";
          if (phase === "hold") {
            label = "Hold Breath";
            instruction = "Retain the breath with relaxed, quiet stillness";
          } else if (phase === "out") {
            label = "Exhale";
            instruction = "Release the breath gently, letting go of all tension";
          } else if (phase === "holdAfter") {
            label = "Rest in Stillness";
            instruction = "Abide at ease in empty, spacious awareness";
          }
          domRefs.labelRef.current.textContent = label;
          if (domRefs.instructionRef.current) {
            domRefs.instructionRef.current.textContent = instruction;
          }
        }
      }
    }

    // Cycle complete detection
    if (local < prevLocalRef.current) {
      if (onCycleComplete) {
        onCycleComplete();
      }
    }
    prevLocalRef.current = local;
  });

  return <BreathOrb phaseRef={phaseRef} />;
}

export default function BreathOrbCanvas({
  pattern = DEFAULT_PATTERN,
  onCycleComplete,
  isVisible = true,
  isActive = false,
  isPaused = false,
}) {
  const labelRef = useRef(null);
  const countRef = useRef(null);
  const instructionRef = useRef(null);
  const progressBarRef = useRef(null);

  const domRefs = {
    labelRef,
    countRef,
    instructionRef,
    progressBarRef,
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center">
      {/* 3D Orb Visualizer Container with subtle backdrop glow */}
      <div className="relative aspect-square w-full max-w-xs sm:max-w-sm">
        <Canvas
          frameloop={isVisible ? "always" : "never"}
          camera={{ position: [0, 0, 2.8], fov: 42 }}
          dpr={[1, typeof window !== "undefined" && window.innerWidth < 768 ? 1.25 : 1.5]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <BreathOrbInternal
              pattern={pattern}
              onCycleComplete={onCycleComplete}
              domRefs={domRefs}
              isActive={isActive}
              isPaused={isPaused}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Dedicated High-Contrast Illuminated Breath HUD */}
      <div className="relative -mt-2 w-full max-w-md rounded-3xl border border-gold-500/35 bg-temple-950/95 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              {isActive ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-400" />
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-3 w-3 bg-temple-200/40" />
              )}
            </span>
            <h3
              ref={labelRef}
              className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-widest text-gold-300"
            >
              Ready
            </h3>
          </div>

          <div className="flex items-baseline gap-1 rounded-2xl border border-gold-500/30 bg-temple-900/90 px-3.5 sm:px-4 py-1.5 shadow-inner">
            <span
              ref={countRef}
              className="font-mono text-2xl sm:text-3xl font-extrabold text-gold-400"
            >
              {(pattern.in || 4.0).toFixed(1)}
            </span>
            <span className="font-heading text-xs uppercase tracking-wider text-temple-200/80">
              s
            </span>
          </div>
        </div>

        {/* Phase Progress Bar */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-temple-900 border border-gold-500/20">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-gold-500 via-saffron-400 to-gold-300 transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(217,164,65,0.6)]"
            style={{ width: "0%" }}
          />
        </div>

        {/* Actionable Subtitle Instruction */}
        <p
          ref={instructionRef}
          className="mt-3 text-center text-xs font-medium leading-relaxed text-temple-100 sm:text-sm font-serif italic"
        >
          Press 'Start Meditation' above to begin mindful breathing
        </p>
      </div>
    </div>
  );
}
