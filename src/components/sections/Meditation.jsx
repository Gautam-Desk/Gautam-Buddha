import { Suspense, useState, useRef, useEffect } from "react";
import Reveal from "../Reveal";
import BreathOrbCanvas from "../three/BreathOrbCanvas";
import { soundEngine } from "../../utils/audioEngine";

const BREATH_PATTERNS = [
  {
    id: "box",
    name: "Sama-Vṛtti (Box Breathing)",
    tag: "Focus & Grounding",
    pattern: { in: 4, hold: 4, out: 4, holdAfter: 4 },
    description: "4.0s Inhale · 4.0s Hold · 4.0s Exhale · 4.0s Stillness",
  },
  {
    id: "tranquility",
    name: "Deep Tranquility (4-7-8)",
    tag: "Nervous System Reset",
    pattern: { in: 4, hold: 7, out: 8, holdAfter: 0 },
    description: "4.0s Inhale · 7.0s Hold · 8.0s Exhale · 0s Stillness",
  },
  {
    id: "coherent",
    name: "Coherent Heart Resonance",
    tag: "Vagus Nerve Balance",
    pattern: { in: 5.5, hold: 0, out: 5.5, holdAfter: 0 },
    description: "5.5s Inhale · 0s Hold · 5.5s Exhale (5.5 breaths/min)",
  },
  {
    id: "gentle",
    name: "Gentle Calm (Beginner)",
    tag: "Effortless Ease",
    pattern: { in: 3.5, hold: 2, out: 3.5, holdAfter: 1 },
    description: "3.5s Inhale · 2.0s Hold · 3.5s Exhale · 1.0s Stillness",
  },
];

const MEDITATION_STEPS = [
  {
    step: "01",
    title: "Noble Posture (Āsana)",
    pali: "Kāyagata-sati",
    icon: "🧘",
    instruction:
      "Sit with an erect, relaxed spine. Rest your hands gently in your lap in the Dhyāna mudra (right hand resting upon the left, thumbs lightly touching).",
  },
  {
    step: "02",
    title: "Sensory Stillness",
    pali: "Indriya-saṃvara",
    icon: "👁️",
    instruction:
      "Softly close your eyes or cast them gently downwards. Release all tension from the shoulders, brow, jaw, and throat.",
  },
  {
    step: "03",
    title: "Mindfulness of Breath",
    pali: "Ānāpānasati",
    icon: "🪷",
    instruction:
      "Direct undivided attention to the natural sensation of the breath at the tip of the nostrils or upper lip. Do not force or control the rhythm.",
  },
  {
    step: "04",
    title: "Radiant Equanimity",
    pali: "Upekkhā-bhāvanā",
    icon: "✨",
    instruction:
      "When thoughts, memories, or distractions arise, observe them with gentle non-judgmental awareness and return lovingly to the anchor of the breath.",
  },
];

const TIMER_DURATIONS = [
  { label: "1 Min", seconds: 60 },
  { label: "3 Mins", seconds: 180 },
  { label: "5 Mins", seconds: 300 },
  { label: "10 Mins", seconds: 600 },
  { label: "15 Mins", seconds: 900 },
  { label: "Open Flow", seconds: 0 },
];

export default function Meditation() {
  const [activeTab, setActiveTab] = useState("breath");
  const [selectedPattern, setSelectedPattern] = useState(BREATH_PATTERNS[0]);
  const [sessionTimer, setSessionTimer] = useState(TIMER_DURATIONS[2]); // Default 5 Mins
  const [timerMsRemaining, setTimerMsRemaining] = useState(300 * 1000);
  const [sessionState, setSessionState] = useState("idle"); // 'idle' | 'running' | 'paused' | 'completed'
  const [completedCycles, setCompletedCycles] = useState(0);

  // User asked options: Soundscape background & bell chimes
  const [bgSoundscape, setBgSoundscape] = useState("drone"); // 'silent' | 'drone' | 'chimes'
  const [chimeOnCycle, setChimeOnCycle] = useState(true);

  const sessionEndRef = useRef(0);
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

  // Precise millisecond wall-clock countdown effect
  useEffect(() => {
    let intervalId;
    if (sessionState === "running" && sessionTimer.seconds > 0) {
      sessionEndRef.current = performance.now() + timerMsRemaining;

      intervalId = setInterval(() => {
        const remaining = Math.max(0, sessionEndRef.current - performance.now());
        setTimerMsRemaining(remaining);

        if (remaining <= 0) {
          setSessionState("completed");
          soundEngine.playDeepGong(6.0);
          if (bgSoundscape === "drone") {
            soundEngine.toggleAmbient(false);
          }
          clearInterval(intervalId);
        }
      }, 50);
    }
    return () => clearInterval(intervalId);
  }, [sessionState]);

  const handleTabChange = (tab) => {
    soundEngine.playWoodBlock(490);
    setActiveTab(tab);
  };

  const handlePatternChange = (pattern) => {
    soundEngine.playWaterDrop(920);
    setSelectedPattern(pattern);
  };

  const handleTimerSelect = (t) => {
    soundEngine.playWoodBlock(520);
    setSessionTimer(t);
    setTimerMsRemaining(t.seconds * 1000);
    if (sessionState !== "idle") {
      setSessionState("idle");
    }
  };

  const handleStartSession = () => {
    soundEngine.unlockAudio();
    soundEngine.playSingingBowl(216, 4.5);

    if (sessionTimer.seconds > 0 && timerMsRemaining <= 0) {
      setTimerMsRemaining(sessionTimer.seconds * 1000);
    }

    if (bgSoundscape === "drone") {
      soundEngine.toggleAmbient(true);
    }

    setSessionState("running");
  };

  const handlePauseSession = () => {
    soundEngine.playWoodBlock(440);
    if (bgSoundscape === "drone") {
      soundEngine.toggleAmbient(false);
    }
    setSessionState("paused");
  };

  const handleStopAndReset = () => {
    soundEngine.playPeaceBell(340);
    if (bgSoundscape === "drone") {
      soundEngine.toggleAmbient(false);
    }
    setSessionState("idle");
    setTimerMsRemaining(sessionTimer.seconds * 1000);
  };

  const handleCycleComplete = () => {
    setCompletedCycles((c) => c + 1);
    if (chimeOnCycle && sessionState === "running") {
      soundEngine.playTingsha(1760, 2.2);
    }
  };

  const handleSoundscapeChange = (mode) => {
    soundEngine.playWoodBlock(500);
    setBgSoundscape(mode);
    if (mode === "drone") {
      if (sessionState === "running") {
        soundEngine.toggleAmbient(true);
      }
    } else {
      soundEngine.toggleAmbient(false);
    }
  };

  const handleRingBowl = () => {
    soundEngine.unlockAudio();
    soundEngine.playSingingBowl(216, 5.0);
  };

  const formatTimerWithMs = (totalMs) => {
    const totalSecs = Math.floor(totalMs / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const tenths = Math.floor((totalMs % 1000) / 100);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}.${tenths}`;
  };

  return (
    <section
      ref={sectionRef}
      id="meditation"
      className="relative content-auto bg-temple-950 py-24 md:py-32"
    >
      {/* Visual background mandala glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,164,65,0.08)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-400">
              Chapter VII · The Art of Inner Peace
            </p>
            <h2 className="mt-3 font-heading text-3xl text-temple-50 sm:text-5xl md:text-6xl font-bold">
              Mindfulness & Ānāpānasati
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-temple-100 sm:text-base font-normal">
              The ancient science of mind cultivation (Bhāvanā) taught by the Buddha to tranquilize mental chatter and unveil the unconditioned stillness of pure awareness.
            </p>
          </div>
        </Reveal>

        {/* Canonical Sutta Inscription from Anapanasati Sutta */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-gold-500/30 bg-temple-900/80 p-5 text-center shadow-xl backdrop-blur-sm">
            <p className="font-serif text-sm italic text-gold-300 sm:text-base leading-relaxed">
              &ldquo;Dīghaṃ vā assasanto &lsquo;Dīghaṃ assasāmī&rsquo;ti pajānāti, dīghaṃ vā passasanto &lsquo;Dīghaṃ passasāmī&rsquo;ti pajānāti... Sabbakāyapaṭisaṃvedī assasissāmīti sikkhati.&rdquo;
            </p>
            <p className="mt-2 text-xs text-temple-100 font-heading tracking-wide">
              — &ldquo;Breathing in long, one discerns: &lsquo;I breathe in long&rsquo;; breathing out long, one discerns: &lsquo;I breathe out long.&rsquo; One trains: &lsquo;Experiencing the whole body, I shall breathe in.&rsquo;&rdquo; (Ānāpānasati Sutta, MN 118)
            </p>
          </div>
        </Reveal>

        {/* Mode Selector Tabs & Bell Ring */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleTabChange("breath")}
            className={`rounded-full px-5 py-2 font-heading text-xs uppercase tracking-wider transition ${
              activeTab === "breath"
                ? "border border-gold-400 bg-gold-500/20 text-gold-300 shadow-md shadow-gold-500/10 font-bold"
                : "border border-gold-500/20 bg-temple-900/40 text-temple-100 hover:border-gold-400/40 hover:text-temple-50"
            }`}
          >
            Interactive Breath Visualizer
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("guide")}
            className={`rounded-full px-5 py-2 font-heading text-xs uppercase tracking-wider transition ${
              activeTab === "guide"
                ? "border border-gold-400 bg-gold-500/20 text-gold-300 shadow-md shadow-gold-500/10 font-bold"
                : "border border-gold-500/20 bg-temple-900/40 text-temple-100 hover:border-gold-400/40 hover:text-temple-50"
            }`}
          >
            Fourfold Contemplation Steps
          </button>

          {/* Sound Effect Bell Ring */}
          <button
            type="button"
            onClick={handleRingBowl}
            className="flex items-center gap-2 rounded-full border border-gold-500/30 bg-temple-900/80 px-4 py-2 text-xs font-heading tracking-wider text-gold-300 transition hover:border-gold-400 hover:bg-gold-500/20 active:scale-95"
            title="Ring Tibetan Singing Bowl"
          >
            <span>🔔</span>
            <span>Ring Singing Bowl</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="mt-8">
          {activeTab === "breath" ? (
            <div className="rounded-3xl border border-gold-500/30 bg-temple-900/70 p-6 md:p-10 shadow-2xl backdrop-blur-md">
              {/* 1. Large User-Friendly Start / Pause / Reset Control Dashboard */}
              <div className="mb-8 rounded-2xl border border-gold-500/40 bg-temple-950/95 p-5 sm:p-6 shadow-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-3 w-3 relative">
                        {sessionState === "running" ? (
                          <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-400" />
                          </>
                        ) : (
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-temple-200/40" />
                        )}
                      </span>
                      <span className="font-heading text-xs uppercase tracking-widest text-gold-400 font-bold">
                        {sessionState === "running"
                          ? "Mindfulness Session In Progress"
                          : sessionState === "paused"
                          ? "Session Paused"
                          : sessionState === "completed"
                          ? "Session Complete · Peace Abides"
                          : "Ready for Stillness"}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-temple-100">
                      {sessionState === "running"
                        ? "Breathe in harmony with the illuminated sphere. Focus gently on the breath."
                        : sessionState === "paused"
                        ? "Session is paused. Take your time and resume when ready."
                        : sessionState === "completed"
                        ? "Congratulations on completing your session. Take a moment to integrate."
                        : "Select your preferred breathing pattern and duration, then press Start."}
                    </p>
                  </div>

                  {/* High Precision Live Timer Display */}
                  <div className="flex items-baseline gap-2 rounded-2xl border border-gold-500/35 bg-temple-900 px-5 py-2 shadow-inner">
                    <span className="text-xs text-gold-400/80 font-heading">TIME:</span>
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-gold-300">
                      {sessionTimer.seconds > 0
                        ? formatTimerWithMs(timerMsRemaining)
                        : "Open Flow"}
                    </span>
                  </div>
                </div>

                {/* Primary Large Buttons: START / PAUSE / STOP & RESET */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {sessionState !== "running" ? (
                      <button
                        type="button"
                        onClick={handleStartSession}
                        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-saffron-500 px-7 py-3 font-heading text-xs font-bold uppercase tracking-widest text-temple-950 shadow-lg shadow-gold-500/30 transition hover:from-gold-400 hover:to-saffron-400 hover:shadow-xl hover:shadow-gold-500/40 active:scale-95"
                      >
                        <span className="text-sm">▶</span>
                        <span>{sessionState === "paused" ? "Resume Meditation" : "Start Meditation"}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePauseSession}
                        className="flex items-center gap-2 rounded-full border border-gold-400 bg-gold-500/20 px-6 py-3 font-heading text-xs font-bold uppercase tracking-widest text-gold-300 shadow-md transition hover:border-gold-300 hover:bg-gold-500/30 active:scale-95"
                      >
                        <span className="text-sm">⏸</span>
                        <span>Pause Session</span>
                      </button>
                    )}

                    {(sessionState === "running" || sessionState === "paused" || sessionState === "completed") && (
                      <button
                        type="button"
                        onClick={handleStopAndReset}
                        className="flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-temple-900/80 px-5 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-temple-100 transition hover:border-gold-400 hover:text-gold-300 active:scale-95"
                      >
                        <span>⏹</span>
                        <span>Stop & Reset</span>
                      </button>
                    )}
                  </div>

                  {/* Completed Cycles Counter */}
                  <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-wider text-temple-100">
                    <span>Completed Cycles:</span>
                    <strong className="rounded-xl border border-gold-500/30 bg-temple-900 px-3 py-1 font-mono text-base text-gold-400 font-bold">
                      {completedCycles}
                    </strong>
                  </div>
                </div>
              </div>

              {/* 2. User-Customizable Options Bar: Duration & Soundscape */}
              <div className="mb-8 grid gap-4 lg:grid-cols-2">
                {/* Duration Option */}
                <div className="rounded-2xl border border-gold-500/25 bg-temple-950/80 p-4">
                  <span className="text-[11px] font-heading uppercase text-gold-400 font-bold tracking-wider">
                    1. Session Duration:
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {TIMER_DURATIONS.map((t) => (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => handleTimerSelect(t)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-heading transition ${
                          sessionTimer.label === t.label
                            ? "bg-gold-500 text-temple-950 font-bold shadow-md"
                            : "border border-gold-500/20 bg-temple-900/70 text-temple-100 hover:text-gold-300"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Soundscape & Chimes Option */}
                <div className="rounded-2xl border border-gold-500/25 bg-temple-950/80 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-heading uppercase text-gold-400 font-bold tracking-wider">
                      2. Ambient Soundscape:
                    </span>

                    {/* Cycle Chime Toggle */}
                    <label className="flex items-center gap-1.5 text-[11px] font-heading text-temple-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={chimeOnCycle}
                        onChange={(e) => setChimeOnCycle(e.target.checked)}
                        className="accent-gold-400 rounded"
                      />
                      <span>Chime on Cycle</span>
                    </label>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSoundscapeChange("drone")}
                      className={`rounded-xl px-3 py-1.5 text-xs font-heading transition ${
                        bgSoundscape === "drone"
                          ? "bg-gold-500 text-temple-950 font-bold shadow-md"
                          : "border border-gold-500/20 bg-temple-900/70 text-temple-100 hover:text-gold-300"
                      }`}
                    >
                      🪷 Tibetan Drone
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSoundscapeChange("silent")}
                      className={`rounded-xl px-3 py-1.5 text-xs font-heading transition ${
                        bgSoundscape === "silent"
                          ? "bg-gold-500 text-temple-950 font-bold shadow-md"
                          : "border border-gold-500/20 bg-temple-900/70 text-temple-100 hover:text-gold-300"
                      }`}
                    >
                      🔕 Silent / Natural
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Breath Pattern Selector Chips */}
              <div className="mb-8">
                <p className="text-center font-heading text-xs uppercase tracking-widest text-gold-400 font-bold">
                  3. Select Breathing Rhythm (Yogic Pranayama)
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {BREATH_PATTERNS.map((p) => {
                    const isSelected = selectedPattern.id === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handlePatternChange(p)}
                        className={`flex flex-col text-left rounded-2xl border p-4 transition duration-300 ${
                          isSelected
                            ? "border-gold-400 bg-gold-500/20 text-gold-300 shadow-lg shadow-gold-500/15 font-semibold -translate-y-0.5"
                            : "border-gold-500/20 bg-temple-950/70 text-temple-100 hover:border-gold-400/50 hover:bg-temple-950/90"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-heading text-xs font-bold text-temple-50">
                            {p.name}
                          </span>
                          <span className="rounded bg-gold-500/15 px-2 py-0.5 text-[10px] text-gold-300 border border-gold-500/20">
                            {p.tag}
                          </span>
                        </div>
                        <p className="mt-2 font-mono text-[11px] text-gold-200">
                          {p.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. 3D Visualizer Canvas & Decimal HUD */}
              <div className="w-full">
                {isVisible && (
                  <Suspense fallback={null}>
                    <BreathOrbCanvas
                      pattern={selectedPattern.pattern}
                      onCycleComplete={handleCycleComplete}
                      isVisible={isVisible}
                      isActive={sessionState === "running"}
                      isPaused={sessionState === "paused"}
                    />
                  </Suspense>
                )}
              </div>
            </div>
          ) : (
            /* Four Foundations of Mindfulness (Satipatthana) Guide Cards */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MEDITATION_STEPS.map((s, idx) => (
                <Reveal key={s.step} delay={idx * 0.08}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-gold-500/30 bg-temple-900/60 p-6 transition duration-300 hover:border-gold-400 hover:bg-temple-900/80 hover:shadow-xl hover:shadow-gold-500/10">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-xs font-bold text-gold-400">
                          Foundation {s.step}
                        </span>
                        <span className="text-2xl">{s.icon}</span>
                      </div>
                      <h4 className="mt-3 font-heading text-lg font-bold text-temple-50">
                        {s.title}
                      </h4>
                      <p className="mt-1 font-serif text-xs italic text-gold-300 font-medium">
                        {s.pali}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-temple-100 sm:text-sm">
                        {s.instruction}
                      </p>
                    </div>
                    <div className="mt-6 border-t border-gold-500/20 pt-3">
                      <span className="text-[11px] font-heading uppercase tracking-wider text-gold-400">
                        Classical Mindfulness Step
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
