import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../Reveal";
import { BUDDHA_LIFE_STAGES } from "../../data/buddhaLife";
import { soundEngine } from "../../utils/audioEngine";

export default function LifeChronicles() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeStage = BUDDHA_LIFE_STAGES[activeIdx];

  const handleStageSelect = (idx) => {
    soundEngine.playWoodBlock(500 + idx * 25);
    setActiveIdx(idx);
  };

  return (
    <section id="life-chronicles" className="relative bg-temple-950 py-24 md:py-32">
      {/* Background Mandala Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,164,65,0.08)_0%,transparent_50%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-400">
              Chapter I · Historical Chronicle
            </p>
            <h2 className="mt-3 font-heading text-3xl text-temple-50 sm:text-4xl md:text-5xl">
              The Journey of Siddhartha Gautama
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-temple-100/80 sm:text-base">
              From the royal courts of Kapilavastu to the sacred shade of the Bodhi tree and Kushinagar — the 8 momentous milestones of the Enlightened One.
            </p>
          </div>
        </Reveal>

        {/* Milestone Navigation Tabs */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 border-b border-gold-500/20 pb-4">
            {BUDDHA_LIFE_STAGES.map((stage, idx) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => handleStageSelect(idx)}
                className={`group flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-heading tracking-wider transition md:text-sm ${
                  activeIdx === idx
                    ? "border border-gold-400 bg-gold-500/20 text-gold-300 shadow-md shadow-gold-500/10"
                    : "border border-gold-500/15 bg-temple-900/40 text-temple-200/70 hover:border-gold-500/30 hover:bg-temple-900/80 hover:text-temple-100"
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-temple-950/80 text-[10px] font-bold text-gold-400">
                  {idx + 1}
                </span>
                <span>{stage.period}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Stage Content Card */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid gap-8 rounded-3xl border border-gold-500/20 bg-temple-900/50 p-6 shadow-2xl backdrop-blur-sm md:grid-cols-12 md:items-center md:p-10"
            >
              {/* Text Info */}
              <div className="md:col-span-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-md bg-gold-500/15 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-widest text-gold-400 border border-gold-500/30">
                    {activeStage.period}
                  </span>
                  <span className="text-xs italic text-temple-200/60 font-serif">
                    {activeStage.paliTitle}
                  </span>
                </div>

                <h3 className="mt-4 font-heading text-2xl text-temple-50 sm:text-3xl md:text-4xl">
                  {activeStage.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-gold-300/90">
                  {activeStage.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-temple-100/90 sm:text-base">
                  {activeStage.summary}
                </p>

                {/* Sacred Utterance / Quote of the Buddha at this milestone */}
                {activeStage.sacredQuote && (
                  <div className="mt-5 rounded-2xl border border-gold-500/25 bg-temple-950/80 p-4">
                    <span className="font-heading text-[10px] uppercase tracking-widest text-gold-400">
                      Words of the Buddha · Pāli Canon
                    </span>
                    <p className="mt-1.5 font-serif text-sm italic text-gold-300/90 leading-relaxed">
                      &ldquo;{activeStage.sacredQuote}&rdquo;
                    </p>
                    <p className="mt-1.5 text-xs text-temple-200/80">
                      — {activeStage.quoteTranslation}
                    </p>
                  </div>
                )}

                {/* Key Insights bullet points */}
                <div className="mt-6 space-y-2.5">
                  {activeStage.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3">
                      <span className="mt-1 text-gold-400">❖</span>
                      <p className="text-xs leading-relaxed text-temple-200/90 sm:text-sm">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Canonical reference citation */}
                <div className="mt-6 border-t border-gold-500/15 pt-4 text-xs text-temple-200/60">
                  <span className="font-heading uppercase tracking-widest text-gold-400/80">
                    Canonical Source:{" "}
                  </span>
                  <cite className="not-italic text-temple-100/80">
                    {activeStage.canonicalReference}
                  </cite>
                </div>
              </div>

              {/* Visual Presentation */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold-500/25 bg-temple-950 shadow-xl md:col-span-5 md:aspect-[4/5]">
                <img
                  src={activeStage.image}
                  alt={activeStage.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-temple-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="font-heading text-xs tracking-widest text-gold-300 drop-shadow-md">
                    Milestone {activeIdx + 1} of {BUDDHA_LIFE_STAGES.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timeline Navigation Controls */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            disabled={activeIdx === 0}
            onClick={() => handleStageSelect(Math.max(0, activeIdx - 1))}
            className="flex items-center gap-2 rounded-full border border-gold-500/20 bg-temple-900/60 px-4 py-2 font-heading text-xs uppercase tracking-wider text-temple-100 transition hover:border-gold-400 hover:text-gold-400 disabled:opacity-30 disabled:pointer-events-none"
          >
            <span>←</span>
            <span>Previous Milestone</span>
          </button>

          <button
            type="button"
            disabled={activeIdx === BUDDHA_LIFE_STAGES.length - 1}
            onClick={() => handleStageSelect(Math.min(BUDDHA_LIFE_STAGES.length - 1, activeIdx + 1))}
            className="flex items-center gap-2 rounded-full border border-gold-500/20 bg-temple-900/60 px-4 py-2 font-heading text-xs uppercase tracking-wider text-temple-100 transition hover:border-gold-400 hover:text-gold-400 disabled:opacity-30 disabled:pointer-events-none"
          >
            <span>Next Milestone</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
