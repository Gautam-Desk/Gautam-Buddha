import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from "../data/galleryData";
import { soundEngine } from "../utils/audioEngine";

export default function Gallery() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [activeItem, setActiveItem] = useState(null);

  const filteredItems =
    selectedCat === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCat);

  const handleCategorySelect = (catId) => {
    soundEngine.playWoodBlock(500);
    setSelectedCat(catId);
  };

  const handleOpenLightbox = (item) => {
    soundEngine.playTingsha(1750);
    setActiveItem(item);
  };

  const handleCloseLightbox = () => {
    soundEngine.playWoodBlock(440);
    setActiveItem(null);
  };

  const handleNavLightbox = (direction) => {
    soundEngine.playWaterDrop(900);
    const idx = filteredItems.findIndex((x) => x.id === activeItem.id);
    if (direction === "next") {
      const nextIdx = (idx + 1) % filteredItems.length;
      setActiveItem(filteredItems[nextIdx]);
    } else {
      const prevIdx = (idx - 1 + filteredItems.length) % filteredItems.length;
      setActiveItem(filteredItems[prevIdx]);
    }
  };

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowRight") {
        handleNavLightbox("next");
      } else if (e.key === "ArrowLeft") {
        handleNavLightbox("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, filteredItems]);

  return (
    <section id="gallery" className="relative content-auto bg-temple-950 py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-400">
              Chapter VI · Visual Heritage
            </p>
            <h2 className="mt-3 font-heading text-3xl text-temple-50 sm:text-5xl md:text-6xl">
              Visions of the Path
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-temple-100/80 sm:text-base">
              A curated collection of sacred sculptures, ancient monasteries, cave sanctuaries, and contemplative meditative vistas.
            </p>
          </div>
        </Reveal>

        {/* Category Filter Chips */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`rounded-full px-4 py-1.5 font-heading text-xs uppercase tracking-wider transition ${
                  selectedCat === cat.id
                    ? "border border-gold-400 bg-gold-500/20 text-gold-300 shadow-md shadow-gold-500/10"
                    : "border border-gold-500/20 bg-temple-900/40 text-temple-200/70 hover:border-gold-400/40 hover:text-temple-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Responsive Masonry / Column Grid */}
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
          {filteredItems.map((img, i) => (
            <Reveal key={img.id} delay={i * 0.04} className="mb-6 break-inside-avoid">
              <button
                type="button"
                onClick={() => handleOpenLightbox(img)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-gold-500/20 bg-temple-900/50 text-left transition duration-500 hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-2xl hover:shadow-gold-500/15 focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-label={`Open ${img.title}`}
              >
                <div className="overflow-hidden">
                  <picture>
                    <source srcSet={img.src} type="image/webp" />
                    <img
                      src={img.fallback}
                      alt={img.title}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </picture>
                </div>

                {/* Overlay Caption on Hover */}
                <div className="p-4 bg-gradient-to-t from-temple-950 via-temple-950/80 to-transparent">
                  <span className="font-heading text-[10px] uppercase tracking-widest text-gold-400">
                    {img.location}
                  </span>
                  <h3 className="mt-1 font-heading text-sm font-semibold text-temple-50">
                    {img.title}
                  </h3>
                  <p className="mt-1 text-xs text-temple-200/80 line-clamp-2">
                    {img.caption}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div
            data-lenis-prevent="true"
            className="fixed inset-0 z-[400] flex items-center justify-center bg-temple-950/95 p-4 backdrop-blur-xl md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            {/* Click backdrop to close */}
            <div
              className="absolute inset-0"
              onClick={handleCloseLightbox}
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseLightbox}
              className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 bg-temple-900/80 font-heading text-xl text-gold-400 transition hover:border-gold-400 hover:text-gold-300"
              aria-label="Close Lightbox"
            >
              ✕
            </button>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNavLightbox("prev");
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/30 bg-temple-900/80 font-heading text-2xl text-gold-400 transition hover:border-gold-400 hover:text-gold-300"
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNavLightbox("next");
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/30 bg-temple-900/80 font-heading text-2xl text-gold-400 transition hover:border-gold-400 hover:text-gold-300"
              aria-label="Next image"
            >
              ›
            </button>

            {/* Main Modal Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex max-h-[90vh] max-w-4xl flex-col items-center overflow-hidden rounded-2xl border border-gold-500/30 bg-temple-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[68vh] w-full overflow-hidden bg-black/40 flex items-center justify-center">
                <picture>
                  <source srcSet={activeItem.src} type="image/webp" />
                  <img
                    src={activeItem.fallback}
                    alt={activeItem.title}
                    className="max-h-[68vh] w-auto max-w-full object-contain"
                  />
                </picture>
              </div>

              {/* Caption Bar */}
              <div className="w-full bg-temple-950 p-5 text-left border-t border-gold-500/20">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs uppercase tracking-widest text-gold-400">
                    {activeItem.location}
                  </span>
                  <span className="text-xs text-temple-200/50">
                    Use ← / → keys or arrows to navigate
                  </span>
                </div>
                <h3 className="mt-1 font-heading text-xl text-temple-50">
                  {activeItem.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-temple-100/90 sm:text-sm">
                  {activeItem.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
