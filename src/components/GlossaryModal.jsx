import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES } from "../data/glossaryData";
import { soundEngine } from "../utils/audioEngine";

export default function GlossaryModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Lock body scroll when modal open and play chime
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      soundEngine.playTingsha(1800);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        soundEngine.playWoodBlock(440);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = GLOSSARY_TERMS.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesQuery =
      item.term.toLowerCase().includes(query.toLowerCase()) ||
      item.pali.toLowerCase().includes(query.toLowerCase()) ||
      item.literal.toLowerCase().includes(query.toLowerCase()) ||
      item.definition.toLowerCase().includes(query.toLowerCase()) ||
      (item.phonetic && item.phonetic.toLowerCase().includes(query.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  const handleCategoryChange = (catId) => {
    soundEngine.playWoodBlock(500);
    setActiveCategory(catId);
  };

  const handleClose = () => {
    soundEngine.playWoodBlock(440);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="glossary-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-temple-950/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-3xl border border-gold-500/35 bg-temple-950 p-5 shadow-2xl shadow-black/90 md:p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gold-500/20 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-gold-400">📖</span>
                  <h2 id="glossary-title" className="font-heading text-2xl font-bold text-temple-50 sm:text-3xl">
                    Pāli & Dhamma Glossary
                  </h2>
                </div>
                <p className="mt-1 text-xs uppercase tracking-widest text-gold-400/90 sm:text-sm">
                  Canonical terminology of early Buddhist philosophy & practice
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close glossary"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/20 bg-temple-900/60 text-lg text-temple-200/80 transition hover:border-gold-400 hover:bg-gold-500/15 hover:text-gold-400"
              >
                ✕
              </button>
            </div>

            {/* Search Input & Category Filter Chips */}
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Search concepts (e.g. Nibbāna, Anattā, Vipassanā, Kamma)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-gold-500/30 bg-temple-900/80 px-4 py-3 text-sm text-temple-50 placeholder-temple-200/40 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
              />

              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-2">
                {GLOSSARY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`rounded-full px-3.5 py-1 text-xs font-heading tracking-wider transition ${
                      activeCategory === cat.id
                        ? "border border-gold-400 bg-gold-500/25 text-gold-300 shadow-sm"
                        : "border border-gold-500/15 bg-temple-900/40 text-temple-200/70 hover:border-gold-500/30 hover:text-temple-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
                <span className="ml-auto text-xs text-temple-200/50">
                  {filtered.length} terms found
                </span>
              </div>
            </div>

            {/* Scrollable Terms List (100% Functional Smooth Scroll) */}
            <div
              data-lenis-prevent="true"
              className="mt-4 min-h-0 flex-1 space-y-3.5 overflow-y-auto overscroll-contain pr-2"
              style={{
                maxHeight: "calc(92vh - 240px)",
                scrollbarWidth: "thin",
                scrollbarColor: "#8c6320 #120b04",
              }}
            >
              {filtered.length === 0 ? (
                <div className="py-16 text-center text-temple-200/60">
                  <div className="text-3xl text-gold-400/50">☸</div>
                  <p className="mt-3 text-base">No matching terms found.</p>
                  <p className="mt-1 text-xs text-temple-200/40">
                    Try searching for &lsquo;Dhamma&rsquo;, &lsquo;Anatta&rsquo;, &lsquo;Jhāna&rsquo;, or &lsquo;Mettā&rsquo;.
                  </p>
                </div>
              ) : (
                filtered.map((item) => (
                  <div
                    key={item.term}
                    className="rounded-2xl border border-gold-500/15 bg-temple-900/45 p-4 sm:p-5 transition hover:border-gold-400/40 hover:bg-temple-900/75"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-lg font-bold text-gold-400 sm:text-xl">
                          {item.term}
                        </h3>
                        {item.phonetic && (
                          <span className="rounded-md bg-gold-500/10 px-2 py-0.5 font-mono text-[11px] text-gold-300/80">
                            /{item.phonetic}/
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 text-xs text-temple-200/70">
                        <span>Pāli: <strong className="text-temple-100">{item.pali}</strong></span>
                        <span>Sanskrit: <strong className="text-temple-100">{item.sanskrit}</strong></span>
                      </div>
                    </div>

                    <p className="mt-1.5 text-xs italic text-gold-300 font-serif">
                      Literal meaning: &ldquo;{item.literal}&rdquo;
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-temple-100/90 sm:text-sm">
                      {item.definition}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Footer note */}
            <div className="mt-3 border-t border-gold-500/20 pt-3 text-center text-xs text-temple-200/50">
              Sourced from the canonical Pāli Tipiṭaka & scholarly Buddhist traditions.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
