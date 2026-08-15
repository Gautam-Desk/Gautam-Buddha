import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../Reveal";
import { SACRED_MUDRAS } from "../../data/dhammaData";
import { soundEngine } from "../../utils/audioEngine";

const SACRED_SYMBOLS = [
  {
    name: "The Dharmacakra (Wheel of Dhamma)",
    icon: "☸",
    meaning: "The 8 spokes symbolize the Noble Eightfold Path; the hub represents ethical discipline; the rim represents mindful concentration.",
  },
  {
    name: "The Sacred Lotus (Padma)",
    icon: "🪷",
    meaning: "Rooted in muddy water yet rising completely pristine above the surface — representing the mind transcending worldly defilements.",
  },
  {
    name: "The Bodhi Leaf (Pippala)",
    icon: "🍃",
    meaning: "The heart-shaped leaf of Ficus religiosa, symbolizing the dawn of supreme awakening and universal refuge.",
  },
  {
    name: "The Endless Knot (Shrivatsa)",
    icon: "♾️",
    meaning: "The infinite intertwining of wisdom and compassion, and the interconnected web of all existence (Pratītyasamutpāda).",
  },
];

export default function MudrasGuide() {
  const [selectedMudra, setSelectedMudra] = useState(SACRED_MUDRAS[0]);

  const handleMudraSelect = (mudra) => {
    soundEngine.playWoodBlock(490);
    setSelectedMudra(mudra);
  };

  return (
    <section id="mudras" className="relative content-auto bg-temple-950 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-400">
              Chapter V · Sacred Iconography & Gestures
            </p>
            <h2 className="mt-3 font-heading text-3xl text-temple-50 sm:text-5xl md:text-6xl">
              Sacred Mudrās of the Buddha
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-temple-100/80 sm:text-base">
              The hand gestures (Mudrās) of the Buddha communicate profound spiritual states, historical moments, and philosophical insights without a single spoken word.
            </p>
          </div>
        </Reveal>

        {/* Mudras Interactive Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SACRED_MUDRAS.map((mudra) => (
            <button
              key={mudra.id}
              type="button"
              onClick={() => handleMudraSelect(mudra)}
              className={`rounded-2xl border p-6 text-left transition duration-300 ${
                selectedMudra.id === mudra.id
                  ? "border-gold-400 bg-temple-900/90 shadow-xl shadow-gold-500/15 -translate-y-1"
                  : "border-gold-500/15 bg-temple-900/40 hover:border-gold-500/35 hover:bg-temple-900/70"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-xs font-bold text-gold-400">
                  {mudra.handPosition}
                </span>
                <span className="text-xl">🪷</span>
              </div>
              <h3 className="mt-3 font-heading text-xl font-semibold text-temple-50">
                {mudra.name}
              </h3>
              <p className="mt-1 font-serif text-xs italic text-gold-300/80">
                {mudra.sanskrit}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-temple-100/80 line-clamp-3">
                {mudra.meaning}
              </p>
            </button>
          ))}
        </div>

        {/* Expanded Mudra Focus Detail */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMudra.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-gold-500/30 bg-gradient-to-br from-temple-900/90 via-temple-950 to-temple-900/80 p-6 shadow-2xl backdrop-blur-md md:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold-500/20 pb-4">
                <div>
                  <span className="font-heading text-xs uppercase tracking-widest text-gold-400">
                    Sacred Hand Position: {selectedMudra.handPosition}
                  </span>
                  <h3 className="font-heading text-2xl text-temple-50 md:text-4xl">
                    {selectedMudra.name} —{" "}
                    <span className="text-gold-300 font-serif italic">
                      {selectedMudra.sanskrit}
                    </span>
                  </h3>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-heading text-xs uppercase tracking-widest text-gold-400">
                    Spiritual Meaning & Symbolism
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-temple-100/90 sm:text-base">
                    {selectedMudra.meaning}
                  </p>
                </div>

                <div className="rounded-2xl border border-gold-500/20 bg-temple-950/70 p-5">
                  <h4 className="font-heading text-xs uppercase tracking-widest text-gold-400">
                    Canonical Legend & Context
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-gold-200 sm:text-sm">
                    {selectedMudra.canonicalLegend}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sacred Symbols Grid */}
        <div className="mt-24 border-t border-gold-500/20 pt-20">
          <Reveal>
            <div className="text-center">
              <span className="font-heading text-xs uppercase tracking-[0.4em] text-gold-400">
                Auspicious Emblems
              </span>
              <h3 className="mt-2 font-heading text-3xl text-temple-50 sm:text-4xl">
                The Four Sacred Symbols
              </h3>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SACRED_SYMBOLS.map((sym, idx) => (
              <Reveal key={sym.name} delay={idx * 0.08}>
                <div className="rounded-2xl border border-gold-500/15 bg-temple-900/35 p-5 text-center transition hover:border-gold-500/35 hover:bg-temple-900/60">
                  <div className="text-3xl">{sym.icon}</div>
                  <h4 className="mt-3 font-heading text-base font-semibold text-temple-50">
                    {sym.name}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-temple-200/80">
                    {sym.meaning}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
