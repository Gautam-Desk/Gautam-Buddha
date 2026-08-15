import { Suspense, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Scene from "../three/Scene";
import { soundEngine } from "../../utils/audioEngine";

export default function Hero({ onOpenAI }) {
  const [webgl, setWebgl] = useState(true);
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl =
        c.getContext("webgl2") ||
        c.getContext("webgl") ||
        c.getContext("experimental-webgl");
      if (!gl) setWebgl(false);
    } catch {
      setWebgl(false);
    }
  }, []);

  // Intersection observer to stop 3D rendering when hero scrolls out of view
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    soundEngine.playPeaceBell(360);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden pt-24 pb-12"
    >
      {/* 3D background with visibility-based frameloop optimization */}
      {webgl && isVisible && (
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <Scene isVisible={isVisible} />
          </Suspense>
        </div>
      )}

      {/* Atmospheric ambient glow layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,164,65,0.2)_0%,rgba(18,11,4,0.7)_65%,#120b04_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-temple-950 to-transparent"
      />

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 my-auto">
        {/* Sacred Golden Dharmacakra (Wheel of Dhamma) & Lotus Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mx-auto mb-5 relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center"
        >
          {/* Subtle Ambient Golden Radial Glow */}
          <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-xl animate-pulse" />

          {/* Ornate Sculpted 8-Spoked Dharmacakra SVG Emblem */}
          <svg
            viewBox="0 0 100 100"
            className="relative h-full w-full drop-shadow-[0_0_18px_rgba(217,164,65,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Sacred Eight-Spoked Dharmacakra Wheel of Dhamma"
          >
            <defs>
              <linearGradient id="goldGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffebb3" />
                <stop offset="50%" stopColor="#d9a441" />
                <stop offset="100%" stopColor="#87570d" />
              </linearGradient>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff8e7" />
                <stop offset="60%" stopColor="#d9a441" />
                <stop offset="100%" stopColor="#543302" />
              </radialGradient>
            </defs>

            {/* Outer Decorative Sunburst Lotus Ring */}
            <circle
              cx="50"
              cy="50"
              r="47"
              stroke="url(#goldGradHero)"
              strokeWidth="1.5"
              strokeDasharray="2 3"
              className="animate-spin-slow origin-center opacity-80"
            />
            {/* Outer Rim */}
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="url(#goldGradHero)"
              strokeWidth="3.5"
              className="shadow-sm"
            />
            <circle
              cx="50"
              cy="50"
              r="37"
              stroke="url(#goldGradHero)"
              strokeWidth="1.5"
            />

            {/* 8 Noble Spokes of the Dhamma Wheel */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 50 50)`}>
                <line
                  x1="50"
                  y1="13"
                  x2="50"
                  y2="37"
                  stroke="url(#goldGradHero)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="18" r="2.2" fill="url(#goldGradHero)" />
              </g>
            ))}

            {/* Inner Sacred Hub (The Navel of Nibbāna) */}
            <circle
              cx="50"
              cy="50"
              r="13"
              fill="url(#hubGlow)"
              stroke="url(#goldGradHero)"
              strokeWidth="2.5"
            />
            <circle cx="50" cy="50" r="5" fill="#150d05" />
            <circle cx="50" cy="50" r="2.5" fill="#ffebb3" />
          </svg>
        </motion.div>

        {/* Sacred Sanskrit Invocation */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-temple-900/80 px-3.5 sm:px-4 py-1.5 backdrop-blur-md shadow-md"
        >
          <span className="text-gold-400 text-xs">☸</span>
          <span className="font-heading text-[10px] sm:text-xs uppercase tracking-[0.22em] text-gold-300 font-semibold">
            Namo Tassa Bhagavato Arahato Sammā Sambuddhassa
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 font-heading text-xs uppercase tracking-[0.4em] text-gold-400 sm:text-sm font-semibold"
        >
          The Awakened One · Shakyamuni
        </motion.p>

        {/* Main Title with Ultra-Readable Classical Inscription Font */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45 }}
          className="mt-2 font-heading text-4xl font-extrabold uppercase tracking-[0.1em] sm:tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-r from-temple-50 via-gold-200 to-gold-400 sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_4px_24px_rgba(217,164,65,0.45)] select-none"
        >
          Gautam Buddha
        </motion.h1>

        {/* Core Canonical Inscription from Dhammapada 183 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mt-4 max-w-xl rounded-2xl border border-gold-500/30 bg-temple-950/85 p-4 backdrop-blur-md shadow-xl"
        >
          <p className="font-serif text-xs sm:text-sm italic text-gold-200 leading-relaxed">
            &ldquo;Sabbapāpassa akaraṇaṃ, kusalassa upasampadā; Sacittapariyodapanaṃ, etaṃ buddhāna sāsanaṃ.&rdquo;
          </p>
          <p className="mt-1.5 text-[11px] text-temple-100 uppercase tracking-wider font-heading font-medium">
            To refrain from all evil, to cultivate good, to purify one's mind — this is the teaching of all Buddhas. (Dhammapada 183)
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-temple-100 sm:text-base md:text-lg font-normal"
        >
          An immersive journey through the historical life, awakening under the Bodhi tree, canonical Dhamma teachings, and timeless mindfulness wisdom of Siddhartha Gautama.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            type="button"
            onClick={() => scrollTo("#buddha-story")}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-saffron-500 px-6 py-3 font-heading text-xs font-bold uppercase tracking-widest text-temple-950 shadow-lg shadow-gold-500/25 transition hover:from-gold-400 hover:to-saffron-400 hover:shadow-xl hover:shadow-gold-500/35 active:scale-95"
          >
            <span>Explore The Buddha Story</span>
            <span className="transition duration-300 group-hover:translate-x-1">→</span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo("#meditation")}
            className="flex items-center gap-2 rounded-full border border-gold-500/40 bg-temple-900/70 px-6 py-3 font-heading text-xs font-bold uppercase tracking-widest text-gold-300 backdrop-blur-sm transition hover:border-gold-400 hover:bg-gold-500/20 hover:text-temple-50 active:scale-95 shadow-md"
          >
            <span>Mindfulness Studio</span>
            <span>🪷</span>
          </button>
        </motion.div>

        {/* 3 Sacred Pillars High-Impact Highlights Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 border-t border-gold-500/20 pt-5 max-w-xl mx-auto"
        >
          <div className="text-center">
            <div className="font-heading text-base sm:text-xl font-bold text-gold-300">45 Years</div>
            <div className="text-[10px] sm:text-xs text-temple-100 uppercase tracking-wider font-heading">Ministry of Peace</div>
          </div>
          <div className="text-center border-x border-gold-500/20 px-2">
            <div className="font-heading text-base sm:text-xl font-bold text-gold-300">4 Noble Truths</div>
            <div className="text-[10px] sm:text-xs text-temple-100 uppercase tracking-wider font-heading">Path to Nibbāna</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-base sm:text-xl font-bold text-gold-300">2,600+ Years</div>
            <div className="text-[10px] sm:text-xs text-temple-100 uppercase tracking-wider font-heading">Living Heritage</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="mt-6 text-center z-10"
      >
        <button
          type="button"
          onClick={() => scrollTo("#buddha-story")}
          className="group flex flex-col items-center gap-1.5 text-xs uppercase tracking-widest text-temple-200/80 transition hover:text-gold-400"
          aria-label="Scroll down to begin journey"
        >
          <span className="text-[11px] font-heading">Scroll to explore</span>
          <div className="h-5 w-px bg-gradient-to-b from-gold-400 via-gold-500/50 to-transparent transition duration-300 group-hover:h-8" />
        </button>
      </motion.div>
    </section>
  );
}
