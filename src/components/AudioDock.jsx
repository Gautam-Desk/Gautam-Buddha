import { useState, useEffect } from "react";
import { soundEngine } from "../utils/audioEngine";
import { useAnimation } from "../context/AnimationContext";

export default function AudioDock({ onOpenAI }) {
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted);
  const [isAmbient, setIsAmbient] = useState(soundEngine.isAmbientPlaying);
  const [expanded, setExpanded] = useState(false);
  const { animMode, setAnimMode } = useAnimation();

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(({ isMuted, isAmbientPlaying }) => {
      setIsMuted(isMuted);
      setIsAmbient(isAmbientPlaying);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleMute = () => {
    const nextMuted = soundEngine.toggleMasterSound();
    setIsMuted(nextMuted);
  };

  const handleToggleAmbient = () => {
    const nextAmbient = !isAmbient;
    soundEngine.toggleAmbient(nextAmbient);
    setIsAmbient(nextAmbient);
  };

  const playEffect = (fn) => {
    soundEngine.unlockAudio();
    fn();
  };

  const handleAnimSelect = (mode) => {
    soundEngine.playWoodBlock(500);
    setAnimMode(mode);
  };

  return (
    <aside
      aria-label="Zen audio and animation controls"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2"
    >
      {/* Expanded Control Menu with Meditative Sounds & Animation Customizer */}
      {expanded && (
        <div className="flex flex-col items-end gap-3 rounded-3xl border border-gold-500/35 bg-temple-950/98 p-4 shadow-2xl backdrop-blur-2xl animate-fade-in w-80 max-w-[calc(100vw-2rem)]">
          <div className="flex items-center justify-between w-full border-b border-gold-500/20 pb-2">
            <span className="font-heading text-xs uppercase tracking-widest text-gold-400 font-bold">
              Zen Sanctuary Settings
            </span>
            <span className="text-[10px] text-temple-100/70 font-mono">Audio & Motion</span>
          </div>

          {/* 1. Ask Dhamma AI Guide Trigger */}
          <button
            type="button"
            onClick={() => {
              setExpanded(false);
              soundEngine.playSingingBowl(216, 3.5);
              if (onOpenAI) onOpenAI();
            }}
            className="flex w-full items-center justify-between gap-2 rounded-2xl border border-gold-400 bg-gradient-to-r from-gold-500/25 to-saffron-500/25 px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider text-gold-300 shadow-md transition hover:border-gold-300 hover:bg-gold-500/35 active:scale-95"
          >
            <span>✨ Ask Dhamma AI Guide</span>
            <span>💬</span>
          </button>

          {/* 2. Animation Mode Selector */}
          <div className="w-full space-y-1.5 border-t border-gold-500/15 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-gold-400 font-heading">
                Animation Intensity:
              </span>
              <span className="text-[10px] text-gold-300 font-semibold uppercase">
                {animMode}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleAnimSelect("fluid")}
                className={`rounded-xl px-2 py-1.5 text-[10px] font-heading tracking-wider uppercase transition ${
                  animMode === "fluid"
                    ? "bg-gold-500 text-temple-950 font-bold shadow-md shadow-gold-500/20"
                    : "border border-gold-500/20 bg-temple-900/60 text-temple-100 hover:text-gold-300"
                }`}
              >
                🪷 Fluid
              </button>
              <button
                type="button"
                onClick={() => handleAnimSelect("subtle")}
                className={`rounded-xl px-2 py-1.5 text-[10px] font-heading tracking-wider uppercase transition ${
                  animMode === "subtle"
                    ? "bg-gold-500 text-temple-950 font-bold shadow-md shadow-gold-500/20"
                    : "border border-gold-500/20 bg-temple-900/60 text-temple-100 hover:text-gold-300"
                }`}
              >
                🌿 Subtle
              </button>
              <button
                type="button"
                onClick={() => handleAnimSelect("still")}
                className={`rounded-xl px-2 py-1.5 text-[10px] font-heading tracking-wider uppercase transition ${
                  animMode === "still"
                    ? "bg-gold-500 text-temple-950 font-bold shadow-md shadow-gold-500/20"
                    : "border border-gold-500/20 bg-temple-900/60 text-temple-100 hover:text-gold-300"
                }`}
              >
                ⏸ Still
              </button>
            </div>
          </div>

          {/* 3. Ambient Meditative Drone Toggle */}
          <button
            type="button"
            onClick={handleToggleAmbient}
            className={`flex w-full items-center justify-between gap-2.5 rounded-2xl px-3.5 py-2 text-xs font-heading tracking-wider transition ${
              isAmbient
                ? "border border-gold-400 bg-gold-500/20 text-gold-300 shadow-md shadow-gold-500/20 font-bold"
                : "border border-gold-500/20 bg-temple-900/60 text-temple-100 hover:border-gold-400/40 hover:text-temple-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                {isAmbient && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isAmbient ? "bg-gold-400" : "bg-temple-200/40"
                  }`}
                />
              </span>
              <span>{isAmbient ? "Ambient Drone: ON" : "Ambient Drone: OFF"}</span>
            </div>
            <span>🪷</span>
          </button>

          {/* 4. Soft Earpiece Meditative Instrument Triggers */}
          <div className="w-full pt-1 space-y-1.5">
            <p className="text-[10px] uppercase tracking-wider text-gold-400 font-heading">
              Soft Earpiece Tones:
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => playEffect(() => soundEngine.playSingingBowl(216, 4.5))}
                className="flex items-center justify-between rounded-xl border border-gold-500/20 bg-temple-900/60 px-3 py-1.5 text-[11px] font-heading text-gold-300 transition hover:border-gold-400 hover:bg-gold-500/15"
              >
                <span>Tibetan Bowl</span>
                <span>🔔</span>
              </button>
              <button
                type="button"
                onClick={() => playEffect(() => soundEngine.playDeepGong(5.5))}
                className="flex items-center justify-between rounded-xl border border-gold-500/20 bg-temple-900/60 px-3 py-1.5 text-[11px] font-heading text-gold-300 transition hover:border-gold-400 hover:bg-gold-500/15"
              >
                <span>Temple Gong</span>
                <span>🪘</span>
              </button>
              <button
                type="button"
                onClick={() => playEffect(() => soundEngine.playWindChimes())}
                className="flex items-center justify-between rounded-xl border border-gold-500/20 bg-temple-900/60 px-3 py-1.5 text-[11px] font-heading text-gold-300 transition hover:border-gold-400 hover:bg-gold-500/15"
              >
                <span>Wind Chimes</span>
                <span>🎐</span>
              </button>
              <button
                type="button"
                onClick={() => playEffect(() => soundEngine.playCrystalBowl(432, 4.5))}
                className="flex items-center justify-between rounded-xl border border-gold-500/20 bg-temple-900/60 px-3 py-1.5 text-[11px] font-heading text-gold-300 transition hover:border-gold-400 hover:bg-gold-500/15"
              >
                <span>Crystal 432Hz</span>
                <span>✨</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Master Sound Pill Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleToggleMute}
          title={isMuted ? "Sound is OFF. Click to Turn Sound ON" : "Sound is ON. Click to Turn Sound OFF"}
          aria-label={isMuted ? "Turn Sound ON" : "Turn Sound OFF"}
          className={`flex items-center gap-2 rounded-full border px-4 py-2.5 shadow-2xl backdrop-blur-xl transition duration-300 active:scale-95 ${
            !isMuted
              ? "border-gold-400 bg-gradient-to-r from-temple-900 via-gold-500/20 to-temple-900 text-gold-300 shadow-gold-500/25"
              : "border-gold-500/25 bg-temple-950/90 text-temple-100 hover:border-gold-400/50 hover:text-gold-300"
          }`}
        >
          <span className="text-base">{!isMuted ? "🔊" : "🔇"}</span>
          <span className="font-heading text-xs font-semibold uppercase tracking-widest">
            {!isMuted ? "Sound ON" : "Sound OFF"}
          </span>
        </button>

        {/* Expand / Minimize Settings Icon */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          title="Zen Audio & Motion Settings"
          aria-label="Zen Audio & Motion Settings"
          aria-expanded={expanded}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 bg-temple-950/90 text-sm text-gold-400 shadow-xl backdrop-blur-xl transition hover:border-gold-400 hover:bg-gold-500/15 active:scale-95"
        >
          {expanded ? "✕" : "⚙️"}
        </button>
      </div>
    </aside>
  );
}
