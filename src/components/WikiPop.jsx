import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WIKI_DEFINITIONS } from "../data/wikiDefinitions";
import { soundEngine } from "../utils/audioEngine";

export default function WikiPop({ termKey, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const popRef = useRef(null);
  const data = WIKI_DEFINITIONS[termKey.toLowerCase()];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        popRef.current &&
        !popRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  if (!data) {
    return <span>{children}</span>;
  }

  const handleToggle = (e) => {
    e.stopPropagation();
    soundEngine.playTingsha(1800);
    setIsOpen((prev) => !prev);
  };

  return (
    <span className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        onMouseEnter={() => setIsOpen(true)}
        className="inline-flex items-center gap-0.5 border-b border-dashed border-gold-400/80 text-gold-300 transition hover:border-gold-300 hover:text-gold-200 font-medium cursor-help"
        aria-label={`Wikipedia definition for ${data.title}`}
        aria-expanded={isOpen}
      >
        <span>{children}</span>
        <span className="text-[9px] text-gold-400/70">ℹ️</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popRef}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-72 sm:w-80 rounded-2xl border border-gold-500/35 bg-temple-950/98 p-4 shadow-2xl backdrop-blur-xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Popover Header */}
            <div className="flex items-start justify-between border-b border-gold-500/20 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{data.icon}</span>
                <div>
                  <h4 className="font-heading text-xs font-bold text-temple-50 leading-tight">
                    {data.title}
                  </h4>
                  <span className="text-[10px] text-gold-400/90 font-mono">
                    {data.category} · {data.pali}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-temple-200/60 hover:text-gold-400 p-1"
                aria-label="Close popup"
              >
                ✕
              </button>
            </div>

            {/* Summary Body */}
            <p className="mt-2.5 text-xs text-temple-100/90 leading-relaxed">
              {data.summary}
            </p>

            <p className="mt-2 text-[11px] text-temple-200/80 leading-relaxed border-t border-gold-500/10 pt-2 font-serif italic">
              {data.details}
            </p>

            {/* Footer with Wikipedia Link */}
            <div className="mt-3 flex items-center justify-between border-t border-gold-500/15 pt-2 text-[10px]">
              <span className="text-temple-200/50">Canonical Dhamma Encyclopedia</span>
              <a
                href={data.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading font-semibold text-gold-400 hover:text-gold-300 transition flex items-center gap-1"
              >
                <span>Wikipedia</span>
                <span>↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
