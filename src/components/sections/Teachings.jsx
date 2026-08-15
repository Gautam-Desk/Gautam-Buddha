import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../Reveal";
import WikiPop from "../WikiPop";
import {
  FOUR_NOBLE_TRUTHS,
  EIGHTFOLD_PATH,
  THREE_MARKS,
  BRAHMA_VIHARAS,
} from "../../data/dhammaData";
import { soundEngine } from "../../utils/audioEngine";

const CORE_PARABLES = [
  {
    id: "poisoned-arrow",
    title: "The Parable of the Poisoned Arrow",
    paliTitle: "Cūḷamālukya Sutta (MN 63)",
    icon: "🏹",
    quote: "A man struck by a poisoned arrow does not delay extracting it to ask who shot it or what wood was used. His urgent task is to remove the poison.",
    lesson: "The Buddha set aside 10 speculative metaphysical questions (whether the universe is eternal, infinite, etc.) to focus exclusively on what brings an end to present suffering.",
  },
  {
    id: "the-raft",
    title: "The Parable of the Raft",
    paliTitle: "Alagaddūpama Sutta (MN 22)",
    icon: "🪵",
    quote: "The Dhamma is like a raft: built to cross over the turbulent flood of suffering to the safe shore of Nibbāna, meant for crossing over, not for grasping.",
    lesson: "Even sublime spiritual teachings are instruments for liberation. Once across the river of delusion, one does not carry the raft on one's head; one lets go of clinging.",
  },
  {
    id: "kalama-inquiry",
    title: "The Charter of Free Inquiry",
    paliTitle: "Kālāma Sutta (AN 3.65)",
    icon: "✨",
    quote: "Do not go upon hearsay, tradition, or authority. But when you know for yourselves: 'These qualities are wholesome, blameless, and lead to peace' — then accept and abide in them.",
    lesson: "Buddhism rejects blind dogmatism. Direct personal verification (Ehipassiko — 'Come and see for yourself') is the bedrock of true wisdom.",
  },
];

export default function Teachings() {
  const [selectedTruth, setSelectedTruth] = useState(0);
  const [activePathCategory, setActivePathCategory] = useState("All");
  const [selectedPathFactor, setSelectedPathFactor] = useState(EIGHTFOLD_PATH[0]);
  const [activeParable, setActiveParable] = useState(CORE_PARABLES[0]);

  const handleTruthSelect = (idx) => {
    soundEngine.playTingsha(1600 + idx * 100);
    setSelectedTruth(idx);
  };

  const handlePathCategorySelect = (cat) => {
    soundEngine.playWoodBlock(480);
    setActivePathCategory(cat);
  };

  const handleFactorSelect = (item) => {
    soundEngine.playTingsha(1760);
    setSelectedPathFactor(item);
  };

  const handleParableSelect = (parable) => {
    soundEngine.playWoodBlock(520);
    setActiveParable(parable);
  };

  const pathCategories = ["All", "Wisdom", "Ethical Conduct", "Mental Cultivation"];

  const filteredPath =
    activePathCategory === "All"
      ? EIGHTFOLD_PATH
      : EIGHTFOLD_PATH.filter((p) => p.category === activePathCategory);

  return (
    <section id="teachings" className="relative bg-temple-950 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-400">
              Chapter III · Canonical Dhamma
            </p>
            <h2 className="mt-3 font-heading text-3xl text-temple-50 sm:text-5xl md:text-6xl">
              The Four Noble Truths & The Path
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-temple-100/80 sm:text-base">
              The core framework of Buddhist liberation: diagnosing the universal condition of suffering, identifying its origin, discovering its cessation, and walking the Eightfold Path.
            </p>
          </div>
        </Reveal>

        {/* 1. FOUR NOBLE TRUTHS INTERACTIVE ACCORDION / TABS */}
        <div className="mt-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FOUR_NOBLE_TRUTHS.map((truth, idx) => (
              <button
                key={truth.pali}
                type="button"
                onClick={() => handleTruthSelect(idx)}
                className={`flex flex-col text-left rounded-2xl border p-6 transition duration-300 ${
                  selectedTruth === idx
                    ? "border-gold-400 bg-temple-900/90 shadow-xl shadow-gold-500/10 -translate-y-1"
                    : "border-gold-500/20 bg-temple-900/40 hover:border-gold-500/40 hover:bg-temple-900/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold text-gold-400">
                    Truth {truth.number}
                  </span>
                  <span className="text-xl">{truth.icon}</span>
                </div>
                <h3 className="mt-3 font-heading text-xl text-temple-50">
                  {truth.title}
                </h3>
                <p className="mt-1 font-serif text-xs italic text-gold-300/80">
                  {truth.pali}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-temple-100/80 line-clamp-3">
                  {truth.summary}
                </p>
              </button>
            ))}
          </div>

          {/* Expanded Truth Detail Card */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTruth}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-gold-500/30 bg-temple-900/80 p-6 shadow-2xl backdrop-blur-md md:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold-500/20 pb-4">
                  <div>
                    <span className="font-heading text-xs uppercase tracking-widest text-gold-400">
                      Noble Truth {FOUR_NOBLE_TRUTHS[selectedTruth].number}
                    </span>
                    <h3 className="font-heading text-2xl text-temple-50 md:text-3xl">
                      {FOUR_NOBLE_TRUTHS[selectedTruth].title} —{" "}
                      <span className="text-gold-300">
                        {FOUR_NOBLE_TRUTHS[selectedTruth].translation}
                      </span>
                    </h3>
                  </div>
                  <span className="rounded-full border border-gold-500/30 bg-temple-950 px-4 py-1.5 font-serif text-sm italic text-gold-400">
                    {FOUR_NOBLE_TRUTHS[selectedTruth].pali}
                  </span>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-heading text-xs uppercase tracking-widest text-gold-400">
                      Philosophical Diagnosis
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-temple-100/90 sm:text-base">
                      {FOUR_NOBLE_TRUTHS[selectedTruth].deepInsight}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gold-500/20 bg-temple-950/60 p-4">
                    <h4 className="font-heading text-xs uppercase tracking-widest text-gold-400">
                      Pāli Canon Canonical Text
                    </h4>
                    <p className="mt-2 font-serif text-sm italic text-temple-100">
                      &ldquo;{FOUR_NOBLE_TRUTHS[selectedTruth].paliQuote}&rdquo;
                    </p>
                    <p className="mt-2 text-xs text-temple-200/70">
                      — {FOUR_NOBLE_TRUTHS[selectedTruth].quoteTranslation}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 2. THE NOBLE EIGHTFOLD PATH (DHARMACHAKRA EXPLORER) */}
        <div className="mt-24 border-t border-gold-500/20 pt-20">
          <Reveal>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.4em] text-gold-400">
                <span>☸</span>
                <span>The Wheel of Dhamma</span>
              </span>
              <h3 className="mt-3 font-heading text-3xl text-temple-50 sm:text-4xl">
                The Noble Eightfold Path
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-temple-100/80">
                Arya Ashtangika Marga · The three trainings of Wisdom (Paññā), Ethical Conduct (Sīla), and Mental Cultivation (Samādhi).
              </p>
            </div>
          </Reveal>

          {/* Category Filter Chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {pathCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handlePathCategorySelect(cat)}
                className={`rounded-full px-4 py-1.5 font-heading text-xs uppercase tracking-wider transition ${
                  activePathCategory === cat
                    ? "border border-gold-400 bg-gold-500/20 text-gold-300 shadow-md shadow-gold-500/10"
                    : "border border-gold-500/20 bg-temple-900/40 text-temple-200/70 hover:border-gold-400/50 hover:text-temple-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Path Factor Buttons Grid */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPath.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleFactorSelect(item)}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition duration-200 ${
                  selectedPathFactor.id === item.id
                    ? "border-gold-400 bg-temple-900/90 shadow-lg shadow-gold-500/15"
                    : "border-gold-500/15 bg-temple-900/40 hover:border-gold-500/30 hover:bg-temple-900/70"
                }`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-xs font-bold text-gold-400 border border-gold-500/40">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-temple-50">
                    {item.english}
                  </h4>
                  <p className="font-serif text-xs italic text-gold-300/80">
                    {item.pali}
                  </p>
                  <span className="mt-1 inline-block text-[10px] uppercase tracking-wider text-temple-200/60">
                    {item.category}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Path Factor Details */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPathFactor.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-gold-500/30 bg-gradient-to-br from-temple-900/90 to-temple-950 p-6 md:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold-500/20 pb-4">
                  <div>
                    <span className="font-heading text-xs uppercase tracking-widest text-gold-400">
                      Factor {selectedPathFactor.step} of 8 · Training in {selectedPathFactor.category} ({selectedPathFactor.categoryPali})
                    </span>
                    <h4 className="font-heading text-2xl text-temple-50 md:text-3xl">
                      {selectedPathFactor.english} —{" "}
                      <span className="text-gold-300 font-serif italic">
                        {selectedPathFactor.pali}
                      </span>
                    </h4>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h5 className="font-heading text-xs uppercase tracking-widest text-gold-400">
                      Philosophical Meaning
                    </h5>
                    <p className="mt-2 text-sm leading-relaxed text-temple-100/90">
                      {selectedPathFactor.description}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gold-500/20 bg-temple-950/60 p-4">
                    <h5 className="font-heading text-xs uppercase tracking-widest text-gold-400">
                      Everyday Practice & Cultivation
                    </h5>
                    <p className="mt-2 text-sm leading-relaxed text-gold-200/90">
                      {selectedPathFactor.practice}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. CLASSICAL DHAMMA PARABLES & INSIGHTS */}
        <div className="mt-24 border-t border-gold-500/20 pt-20">
          <Reveal>
            <div className="text-center">
              <span className="font-heading text-xs uppercase tracking-[0.3em] text-gold-400">
                Core Wisdom & Parables
              </span>
              <h3 className="mt-2 font-heading text-3xl text-temple-50">
                Classical Parables of the Buddha
              </h3>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-temple-100/80">
                Practical allegories illustrating non-attachment, urgent self-liberation, and experiential discernment.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {CORE_PARABLES.map((parable) => (
              <button
                key={parable.id}
                type="button"
                onClick={() => handleParableSelect(parable)}
                className={`rounded-2xl border p-6 text-left transition duration-300 ${
                  activeParable.id === parable.id
                    ? "border-gold-400 bg-temple-900/90 shadow-xl shadow-gold-500/10 -translate-y-1"
                    : "border-gold-500/15 bg-temple-900/40 hover:border-gold-500/35 hover:bg-temple-900/70"
                }`}
              >
                <div className="text-3xl">{parable.icon}</div>
                <h4 className="mt-3 font-heading text-lg font-semibold text-temple-50">
                  {parable.title}
                </h4>
                <p className="mt-1 font-serif text-xs italic text-gold-300/80">
                  {parable.paliTitle}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-temple-200/80 line-clamp-3">
                  {parable.lesson}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeParable.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-gold-500/30 bg-temple-900/75 p-6 md:p-8 shadow-xl"
              >
                <span className="font-heading text-xs uppercase tracking-widest text-gold-400">
                  {activeParable.paliTitle}
                </span>
                <blockquote className="mt-2 font-quote text-xl italic text-gold-200 leading-relaxed sm:text-2xl">
                  &ldquo;{activeParable.quote}&rdquo;
                </blockquote>
                <p className="mt-4 text-xs sm:text-sm text-temple-100/90 leading-relaxed">
                  <strong className="text-gold-400 font-heading uppercase text-xs tracking-wider">
                    Core Realization:{" "}
                  </strong>
                  {activeParable.lesson}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 4. THREE MARKS OF EXISTENCE & FOUR BRAHMA-VIHARAS */}
        <div className="mt-24 border-t border-gold-500/20 pt-20">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* The Three Marks of Existence (Tilakkhana) */}
            <div>
              <Reveal>
                <span className="font-heading text-xs uppercase tracking-[0.3em] text-gold-400">
                  Core Ontology
                </span>
                <h3 className="mt-2 font-heading text-2xl text-temple-50 sm:text-3xl">
                  The Three Marks of Existence
                </h3>
                <p className="mt-2 font-serif text-sm italic text-gold-300">
                  Tilakkhaṇa · The fundamental characteristics of all reality
                </p>
              </Reveal>

              <div className="mt-6 space-y-4">
                {THREE_MARKS.map((mark, mIdx) => (
                  <Reveal key={mark.pali} delay={mIdx * 0.1}>
                    <div className="rounded-xl border border-gold-500/20 bg-temple-900/40 p-5 transition hover:border-gold-500/40 hover:bg-temple-900/60">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading text-lg text-gold-400">
                          <WikiPop termKey={mark.pali.toLowerCase()}>{mark.pali}</WikiPop> — <span className="text-temple-100">{mark.english}</span>
                        </h4>
                        <span className="text-xl">{mark.symbol}</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-temple-100/90 sm:text-sm">
                        {mark.meaning}
                      </p>
                      <p className="mt-2 text-xs italic text-gold-300/80">
                        Realization: {mark.realization}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* The Four Sublime States (Brahma-Viharas) */}
            <div>
              <Reveal>
                <span className="font-heading text-xs uppercase tracking-[0.3em] text-gold-400">
                  Heart Cultivation
                </span>
                <h3 className="mt-2 font-heading text-2xl text-temple-50 sm:text-3xl">
                  The Four Sublime States
                </h3>
                <p className="mt-2 font-serif text-sm italic text-gold-300">
                  Brahmavihāra · The four boundless attitudes of the heart
                </p>
              </Reveal>

              <div className="mt-6 space-y-4">
                {BRAHMA_VIHARAS.map((vihara, vIdx) => (
                  <Reveal key={vihara.pali} delay={vIdx * 0.1}>
                    <div className="rounded-xl border border-gold-500/20 bg-temple-900/40 p-5 transition hover:border-gold-500/40 hover:bg-temple-900/60">
                      <div className="flex items-baseline justify-between">
                        <h4 className="font-heading text-lg text-gold-400">
                          {vihara.pali} — <span className="text-temple-100">{vihara.title}</span>
                        </h4>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-temple-100/90 sm:text-sm">
                        {vihara.description}
                      </p>
                      <p className="mt-2 rounded-lg bg-temple-950/60 p-2 font-serif text-xs italic text-gold-200/90">
                        &ldquo;{vihara.mantra}&rdquo;
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
