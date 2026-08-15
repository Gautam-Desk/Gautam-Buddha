import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../Reveal";
import { SACRED_PILGRIMAGE_SITES } from "../../data/dhammaData";
import { soundEngine } from "../../utils/audioEngine";

export default function SacredSites() {
  const [selectedSite, setSelectedSite] = useState(SACRED_PILGRIMAGE_SITES[0]);

  const handleSiteSelect = (site) => {
    soundEngine.playTingsha(1720);
    setSelectedSite(site);
  };

  return (
    <section id="sacred-sites" className="relative content-auto bg-gradient-to-b from-temple-950 via-temple-900 to-temple-950 py-24 md:py-32">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(217,164,65,0.08)_0%,transparent_60%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-400">
              Chapter IV · Sacred Heritage & Geography
            </p>
            <h2 className="mt-3 font-heading text-3xl text-temple-50 sm:text-5xl md:text-6xl">
              The Four Holy Pilgrimage Places
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-temple-100/80 sm:text-base">
              In the <em>Mahāparinibbāna Sutta</em>, the Buddha declared four sacred sites that devout followers should visit with reverence, calm, and inspiration.
            </p>
          </div>
        </Reveal>

        {/* Canonical Inscription from Mahaparinibbana Sutta */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-gold-500/25 bg-temple-950/80 p-5 text-center shadow-lg">
            <p className="font-serif text-sm italic text-gold-300 sm:text-base">
              &ldquo;Cattārimāni, Ānanda, saddhassa kulaputtassa dassanīyāni saṃvejanīyāni ṭhānāni: Idha tathāgato jāto... Idha tathāgato anuttaraṃ sammāsambodhiṃ abhisambuddho... Idha tathāgato anuttaraṃ dhammacakkaṃ pavattesi... Idha tathāgato anupādisesāya nibbānadhātuyā parinibbuto.&rdquo;
            </p>
            <p className="mt-2 text-xs text-temple-200/80">
              — &ldquo;These four places, Ananda, should be seen by a devout disciple with inspiring emotion: Where the Tathagata was born, where he awakened, where he turned the Wheel of Dhamma, and where he passed into Parinibbana.&rdquo; (DN 16)
            </p>
          </div>
        </Reveal>

        {/* Interactive Site Cards Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SACRED_PILGRIMAGE_SITES.map((site) => (
            <button
              key={site.id}
              type="button"
              onClick={() => handleSiteSelect(site)}
              className={`flex flex-col justify-between rounded-2xl border p-6 text-left transition duration-300 ${
                selectedSite.id === site.id
                  ? "border-gold-400 bg-temple-900/90 shadow-xl shadow-gold-500/15 -translate-y-1"
                  : "border-gold-500/15 bg-temple-900/40 hover:border-gold-500/35 hover:bg-temple-900/70"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-gold-500/15 px-2.5 py-0.5 font-heading text-[10px] uppercase tracking-wider text-gold-400 border border-gold-500/30">
                    {site.country}
                  </span>
                  <span className="font-heading text-xs text-temple-200/60">
                    {site.modern}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-temple-50">
                  {site.name}
                </h3>
                <p className="mt-1 font-serif text-xs italic text-gold-300/80">
                  {site.pali}
                </p>
                <p className="mt-2 text-xs font-medium text-gold-400">
                  {site.significance}
                </p>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-temple-200/80 line-clamp-2">
                {site.history}
              </p>
            </button>
          ))}
        </div>

        {/* Expanded Site Detail Feature Card */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSite.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-gold-500/30 bg-temple-900/80 p-6 shadow-2xl backdrop-blur-md md:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold-500/20 pb-4">
                <div>
                  <span className="font-heading text-xs uppercase tracking-widest text-gold-400">
                    Sacred Pilgrimage Sanctuary · {selectedSite.modern}, {selectedSite.country}
                  </span>
                  <h3 className="font-heading text-2xl text-temple-50 md:text-4xl">
                    {selectedSite.name}
                  </h3>
                </div>
                <span className="rounded-full border border-gold-500/30 bg-temple-950 px-4 py-1.5 font-serif text-sm italic text-gold-300">
                  {selectedSite.pali}
                </span>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-heading text-xs uppercase tracking-widest text-gold-400">
                    Spiritual Significance
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-temple-100/90 sm:text-base">
                    {selectedSite.significance}
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-temple-200/90 sm:text-sm">
                    {selectedSite.history}
                  </p>
                </div>

                <div className="rounded-2xl border border-gold-500/20 bg-temple-950/70 p-5">
                  <h4 className="font-heading text-xs uppercase tracking-widest text-gold-400">
                    Pilgrim Highlights & Archaeology
                  </h4>
                  <p className="mt-3 text-xs leading-relaxed text-gold-200 sm:text-sm">
                    {selectedSite.highlight}
                  </p>
                  <div className="mt-4 border-t border-gold-500/15 pt-3 text-[11px] text-temple-200/60 font-mono">
                    Coordinates & Region: {selectedSite.modern}, {selectedSite.country}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
