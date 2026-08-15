import { soundEngine } from "../../utils/audioEngine";
import Reveal from "../Reveal";

export default function Footer({ onOpenGlossary, onOpenAI }) {
  const scrollToTop = () => {
    soundEngine.playTingsha(1700);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-gold-500/20 bg-temple-950 py-16 text-temple-200/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Col 1: Sacred Emblem & Homage */}
            <div className="space-y-3">
              <div className="font-heading text-3xl text-gold-400">☸</div>
              <h3 className="font-heading text-base uppercase tracking-widest text-temple-50">
                Gautam Buddha
              </h3>
              <p className="text-xs leading-relaxed text-temple-200/70">
                Dedicated to the preservation, practice, and universal transmission of the timeless Dhamma for the peace, freedom, and happiness of all beings.
              </p>
            </div>

            {/* Col 2: Canonical Dhamma Navigation */}
            <div className="space-y-2.5">
              <h4 className="font-heading text-xs uppercase tracking-widest text-gold-400">
                Life & Chronicle
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#buddha-story" className="hover:text-gold-300 transition">The Great Buddha Story</a></li>
                <li><a href="#life-chronicles" className="hover:text-gold-300 transition">8 Historical Milestones</a></li>
                <li><a href="#awakening" className="hover:text-gold-300 transition">Bodh Gaya Awakening</a></li>
                <li><a href="#teachings" className="hover:text-gold-300 transition">Four Noble Truths & Eightfold Path</a></li>
                <li><a href="#sacred-sites" className="hover:text-gold-300 transition">Sacred Pilgrimage Places</a></li>
              </ul>
            </div>

            {/* Col 3: Practice & Scholarly Resources */}
            <div className="space-y-2.5">
              <h4 className="font-heading text-xs uppercase tracking-widest text-gold-400">
                Practice & Canon
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#mudras" className="hover:text-gold-300 transition">Sacred Mudrās & Symbols</a></li>
                <li><a href="#meditation" className="hover:text-gold-300 transition">Mindfulness & Breath Studio</a></li>
                <li><a href="#quotes" className="hover:text-gold-300 transition">Canonical Dhammapada Verses</a></li>
                <li><a href="#gallery" className="hover:text-gold-300 transition">Sacred Heritage Gallery</a></li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playSingingBowl(216, 3.5);
                      if (onOpenAI) onOpenAI();
                    }}
                    className="hover:text-gold-300 transition text-left flex items-center gap-1 text-gold-400"
                  >
                    <span>✨</span>
                    <span>Ask Dhamma AI Wisdom Guide</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playWoodBlock(480);
                      onOpenGlossary();
                    }}
                    className="hover:text-gold-300 transition text-left"
                  >
                    Pāli Dhamma Glossary
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Sacred Dedication */}
            <div className="space-y-3">
              <h4 className="font-heading text-xs uppercase tracking-widest text-gold-400">
                Universal Mettā
              </h4>
              <p className="font-serif text-sm italic text-gold-300/90 leading-relaxed">
                &ldquo;Sabbe sattā sukhitā hontu, sabbe hontu ca khemino.&rdquo;
              </p>
              <p className="text-xs text-temple-200/70">
                May all living beings be happy, peaceful, and free from harm.
              </p>
              <button
                type="button"
                onClick={scrollToTop}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-temple-900/60 px-4 py-1.5 text-xs font-heading uppercase tracking-wider text-gold-400 transition hover:border-gold-400 hover:text-gold-300 active:scale-95"
              >
                <span>↑</span>
                <span>Return to Top</span>
              </button>
            </div>
          </div>

          <div className="mt-12 border-t border-gold-500/15 pt-8 text-center text-xs text-temple-200/50">
            <p>
              Built with deep reverence and mindfulness · Grounded in the Tipiṭaka (Pāli Canon) · Free and open spiritual heritage for all generations.
            </p>
            <p className="mt-1">
              © {new Date().getFullYear()} Gautam Buddha — The Enlightened Path
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
