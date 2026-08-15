import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../Reveal";
import { QUOTES, CATEGORIES } from "../../data/quotes";
import { soundEngine } from "../../utils/audioEngine";

export default function Quotes() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredQuotes =
    selectedCategory === "all"
      ? QUOTES
      : QUOTES.filter((q) => q.category === selectedCategory);

  // Safely clamp currentIndex if category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredQuotes.length);
    }, 7500);
    return () => clearInterval(id);
  }, [isPaused, filteredQuotes.length]);

  const currentQuote = filteredQuotes[currentIndex] || filteredQuotes[0];

  const handleCategorySelect = (catId) => {
    soundEngine.playWaterDrop(850);
    setSelectedCategory(catId);
  };

  const handleQuoteNav = (direction) => {
    soundEngine.playWaterDrop(950);
    if (direction === "next") {
      setCurrentIndex((prev) => (prev + 1) % filteredQuotes.length);
    } else {
      setCurrentIndex(
        (prev) => (prev - 1 + filteredQuotes.length) % filteredQuotes.length
      );
    }
  };

  const handleCopy = () => {
    if (!currentQuote) return;
    soundEngine.playTingsha(1850);
    const textToCopy = `"${currentQuote.text}" — ${currentQuote.source} (${currentQuote.pali || ""})`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="quotes"
      className="relative bg-temple-950 py-24 md:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Section Header */}
        <Reveal>
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-400">
            Chapter V · Words of the Awakened
          </p>
          <h2 className="mt-3 font-heading text-3xl text-temple-50 sm:text-5xl md:text-6xl">
            Canonical Dhamma Verses
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-temple-100/80 sm:text-base">
            Grounded in the verses of the <em>Dhammapada</em> and the early <em>Nikāyas</em> of the Pāli Canon.
          </p>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`rounded-full px-4 py-1.5 font-heading text-xs uppercase tracking-wider transition ${
                  selectedCategory === cat.id
                    ? "border border-gold-400 bg-gold-500/20 text-gold-300 shadow-md shadow-gold-500/10"
                    : "border border-gold-500/20 bg-temple-900/40 text-temple-200/70 hover:border-gold-400/40 hover:text-temple-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Quote Display Card */}
        <div className="relative mx-auto mt-12 min-h-[300px] max-w-3xl rounded-3xl border border-gold-500/25 bg-temple-900/60 p-8 shadow-2xl backdrop-blur-md sm:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentQuote.id}-${selectedCategory}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col justify-between"
            >
              {/* Quote Mark */}
              <div className="font-serif text-5xl leading-none text-gold-400/40">“</div>

              {/* Main English Text */}
              <blockquote className="font-quote text-2xl italic leading-relaxed text-temple-50 sm:text-3xl md:text-4xl">
                {currentQuote.text}
              </blockquote>

              {/* Pali Transliteration if present */}
              {currentQuote.pali && (
                <p className="mt-6 font-serif text-xs italic text-gold-300/80 sm:text-sm">
                  {currentQuote.pali}
                </p>
              )}

              {/* Citation Source & Context */}
              <div className="mt-8 border-t border-gold-500/20 pt-6">
                <cite className="font-heading text-xs uppercase tracking-widest text-gold-400 not-italic sm:text-sm">
                  — {currentQuote.source}
                </cite>
                {currentQuote.context && (
                  <p className="mt-1 text-xs text-temple-200/60">
                    Theme: {currentQuote.context}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy quote with canonical citation"
            className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-gold-500/20 bg-temple-950/70 px-3 py-1 text-[11px] font-heading uppercase tracking-wider text-temple-200/80 transition hover:border-gold-400 hover:text-gold-300"
          >
            <span>{copied ? "✓ Copied" : "📋 Copy"}</span>
          </button>
        </div>

        {/* Navigation Dots & Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => handleQuoteNav("prev")}
            aria-label="Previous quote"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/20 text-temple-200/70 transition hover:border-gold-400 hover:text-gold-400"
          >
            ←
          </button>

          <div className="flex gap-2">
            {filteredQuotes.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to quote ${idx + 1}`}
                onClick={() => {
                  soundEngine.playWaterDrop(900);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-gold-400"
                    : "w-2 bg-temple-100/20 hover:bg-temple-100/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleQuoteNav("next")}
            aria-label="Next quote"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/20 text-temple-200/70 transition hover:border-gold-400 hover:text-gold-400"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
