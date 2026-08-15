import { Suspense, useState, useRef, useEffect } from "react";
import Reveal from "../Reveal";
import LotusBloom from "../three/LotusBloom";
import { soundEngine } from "../../utils/audioEngine";

export default function Awakening() {
  const [manualBloom, setManualBloom] = useState(0.85);
  const [useManual, setUseManual] = useState(false);
  const [isAutoPulse, setIsAutoPulse] = useState(false);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePreset = (val) => {
    soundEngine.playTingsha(1600 + val * 400);
    setIsAutoPulse(false);
    setUseManual(true);
    setManualBloom(val);
  };

  const handleToggleAutoPulse = () => {
    soundEngine.playSingingBowl(216, 4.0);
    setIsAutoPulse((prev) => !prev);
    setUseManual(false);
  };

  return (
    <section
      ref={sectionRef}
      id="awakening"
      className="relative min-h-screen content-auto bg-gradient-to-b from-temple-950 via-temple-900 to-temple-950 py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-400">
              Chapter II · The Supreme Illumination
            </p>
            <h2 className="mt-3 font-heading text-3xl text-temple-50 sm:text-5xl md:text-6xl">
              Awakening Beneath the Bodhi Tree
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-temple-100/80 sm:text-base">
              Beneath the sacred Bodhi Tree in Bodh Gaya, Siddhartha passed through the four meditative absorptions (Jhānas), dispelled the illusions of Mara, and attained the Unconditioned State of Nibbāna.
            </p>
          </div>
        </Reveal>

        {/* 3D Animated Lotus Bloom Presentation */}
        <div className="relative mt-12 aspect-square sm:aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-3xl border border-gold-500/25 bg-radial-gradient">
          <div className="absolute inset-0">
            {isVisible && (
              <Suspense fallback={null}>
                <LotusBloom
                  manualProgress={useManual ? manualBloom : undefined}
                  autoPulse={isAutoPulse}
                  isVisible={isVisible}
                />
              </Suspense>
            )}
          </div>

          {/* Top Info Badge */}
          <div className="absolute left-3 top-3 sm:left-4 sm:top-4 z-10 rounded-full border border-gold-500/30 bg-temple-950/80 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md">
            <span className="font-heading text-[10px] sm:text-xs uppercase tracking-widest text-gold-300">
              {isAutoPulse ? "Auto-Breathing Mode" : "Interactive Lotus"}
            </span>
          </div>

          {/* Interactive Lotus Controls Overlay at bottom */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 rounded-2xl border border-gold-500/30 bg-temple-950/90 p-3 sm:p-4 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-xs font-heading uppercase text-gold-400 hidden xs:inline">
                Bloom:
              </span>
              <button
                type="button"
                onClick={() => handlePreset(0.1)}
                className={`rounded-lg px-2.5 py-1 text-[11px] sm:text-xs font-heading transition ${
                  useManual && manualBloom === 0.1
                    ? "bg-gold-500 text-temple-950 font-bold"
                    : "bg-temple-900/80 text-temple-200 hover:text-gold-300"
                }`}
              >
                Closed Bud
              </button>
              <button
                type="button"
                onClick={() => handlePreset(0.55)}
                className={`rounded-lg px-2.5 py-1 text-[11px] sm:text-xs font-heading transition ${
                  useManual && manualBloom === 0.55
                    ? "bg-gold-500 text-temple-950 font-bold"
                    : "bg-temple-900/80 text-temple-200 hover:text-gold-300"
                }`}
              >
                Awakening
              </button>
              <button
                type="button"
                onClick={() => handlePreset(1.0)}
                className={`rounded-lg px-2.5 py-1 text-[11px] sm:text-xs font-heading transition ${
                  useManual && manualBloom === 1.0
                    ? "bg-gold-500 text-temple-950 font-bold"
                    : "bg-temple-900/80 text-temple-200 hover:text-gold-300"
                }`}
              >
                Full Bloom
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleAutoPulse}
                className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-heading tracking-wider transition ${
                  isAutoPulse
                    ? "border-gold-400 bg-gold-500/30 text-gold-300 shadow-md"
                    : "border-gold-500/30 bg-temple-900/80 text-temple-100 hover:border-gold-400"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  {isAutoPulse && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      isAutoPulse ? "bg-gold-400" : "bg-temple-200/40"
                    }`}
                  />
                </span>
                <span>{isAutoPulse ? "Breathing Mode: Active" : "Auto-Breathe"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Victory Utterance of Supreme Awakening */}
        <div className="mt-14 rounded-3xl border border-gold-500/25 bg-temple-900/40 p-6 md:p-10">
          <Reveal>
            <div className="text-center">
              <span className="font-heading text-xs uppercase tracking-[0.3em] text-gold-400">
                The Victory Song of the Buddha · Udāna & Dhammapada 153–154
              </span>
              <h3 className="mt-2 font-heading text-2xl text-temple-50 sm:text-3xl">
                The House-Builder is Defeated
              </h3>
            </div>

            <div className="mt-6 mx-auto max-w-3xl rounded-2xl border border-gold-500/20 bg-temple-950/80 p-6 text-center">
              <p className="font-serif text-base italic text-gold-300 sm:text-lg md:text-xl leading-relaxed">
                &ldquo;Through many a birth in saṃsāra have I wandered in vain, seeking the builder of this house of suffering.
                Repeated birth is misery! O house-builder! You are seen! You shall build no more houses for me.
                All your rafters are broken; your ridge-pole is shattered! My mind has reached the Unconditioned; the end of craving is attained!&rdquo;
              </p>
              <div className="mt-4 border-t border-gold-500/20 pt-3 text-xs text-temple-200/70 font-heading uppercase tracking-widest">
                — Siddhartha Gautama upon the dawn of Supreme Enlightenment
              </div>
            </div>
          </Reveal>
        </div>

        {/* Awakening Night 3 Watches */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-gold-500/20 bg-temple-900/40 p-6 transition hover:border-gold-500/40 hover:bg-temple-900/60">
              <span className="font-heading text-xs font-bold text-gold-400">1st Watch of the Night</span>
              <h4 className="mt-2 font-heading text-lg text-temple-50">Knowledge of Past Lives</h4>
              <p className="font-serif text-xs italic text-gold-300/80">Pubbenivāsānussati-ñāṇa</p>
              <p className="mt-3 text-xs leading-relaxed text-temple-100/80">
                Recollected the countless cycle of previous existences, understanding how identity arises, wanders, and departs across realms.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-gold-500/20 bg-temple-900/40 p-6 transition hover:border-gold-500/40 hover:bg-temple-900/60">
              <span className="font-heading text-xs font-bold text-gold-400">2nd Watch of the Night</span>
              <h4 className="mt-2 font-heading text-lg text-temple-50">The Divine Eye & Karma</h4>
              <p className="font-serif text-xs italic text-gold-300/80">Cutūpapāta-ñāṇa</p>
              <p className="mt-3 text-xs leading-relaxed text-temple-100/80">
                Witnessed all sentient beings dying and being reborn in accordance with their intentional volitional actions (Kamma).
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="rounded-2xl border border-gold-500/20 bg-temple-900/40 p-6 transition hover:border-gold-500/40 hover:bg-temple-900/60">
              <span className="font-heading text-xs font-bold text-gold-400">3rd Watch of the Night</span>
              <h4 className="mt-2 font-heading text-lg text-temple-50">Eradication of All Defilements</h4>
              <p className="font-serif text-xs italic text-gold-300/80">Āsavakkhaya-ñāṇa</p>
              <p className="mt-3 text-xs leading-relaxed text-temple-100/80">
                Penetrated Dependent Origination and uprooted all taints of sensual desire, becoming, ignorance, and suffering forever.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
