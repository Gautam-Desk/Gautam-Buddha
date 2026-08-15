import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "../utils/audioEngine";

/**
 * Calculates current Modern Gregorian Time, Buddhist Era (B.E.), lunar phase name, and pilgrimage zone time.
 */
function getBuddhistTimeData(now = new Date()) {
  const gregorianYear = now.getFullYear();
  // Buddhist Era is Gregorian + 543 (standard in Thailand, Myanmar, Sri Lanka, Cambodia, Laos)
  const buddhistEra = gregorianYear + 543;

  // Approximate Lunar Moon Phase (0 = New Moon, 0.5 = Full Moon)
  const refNewMoon = new Date(2026, 0, 18, 19, 52).getTime();
  const diffDays = (now.getTime() - refNewMoon) / (1000 * 60 * 60 * 24);
  const synodicMonth = 29.53058867;
  const phaseFraction = (((diffDays % synodicMonth) + synodicMonth) % synodicMonth) / synodicMonth;

  let lunarName = "Waxing Crescent (Suklapaksha)";
  let lunarIcon = "🌒";
  let isUposatha = false;

  if (phaseFraction < 0.03 || phaseFraction > 0.97) {
    lunarName = "New Moon (Amāvāsyā · Sacred Uposatha)";
    lunarIcon = "🌑";
    isUposatha = true;
  } else if (phaseFraction < 0.22) {
    lunarName = "Waxing Crescent (Suklapaksha)";
    lunarIcon = "🌒";
  } else if (phaseFraction < 0.28) {
    lunarName = "First Quarter Moon (Uposatha Day)";
    lunarIcon = "🌓";
    isUposatha = true;
  } else if (phaseFraction < 0.47) {
    lunarName = "Waxing Gibbous";
    lunarIcon = "🌔";
  } else if (phaseFraction < 0.53) {
    lunarName = "Full Moon (Pūrṇimā · Vesak Uposatha)";
    lunarIcon = "🌕";
    isUposatha = true;
  } else if (phaseFraction < 0.72) {
    lunarName = "Waning Gibbous";
    lunarIcon = "🌖";
  } else if (phaseFraction < 0.78) {
    lunarName = "Last Quarter Moon (Uposatha Day)";
    lunarIcon = "🌗";
    isUposatha = true;
  } else {
    lunarName = "Waning Crescent (Krishnapaksha)";
    lunarIcon = "🌘";
  }

  // Monastic Watch of the Day
  const hour = now.getHours();
  let watchName = "Night Silent Meditation";
  let watchPali = "Ratti Bhāvanā";
  if (hour >= 4 && hour < 7) {
    watchName = "Dawn Awakening & Chanting";
    watchPali = "Udaya Kāla";
  } else if (hour >= 7 && hour < 11) {
    watchName = "Morning Alms & Contemplation";
    watchPali = "Piṇḍapāta Kāla";
  } else if (hour >= 11 && hour < 15) {
    watchName = "Midday Reflection & Sutta Study";
    watchPali = "Majjhantika Kāla";
  } else if (hour >= 15 && hour < 19) {
    watchName = "Afternoon Dhamma Discourse";
    watchPali = "Sāyanha Kāla";
  } else if (hour >= 19 && hour < 23) {
    watchName = "Evening Metta & Stillness";
    watchPali = "Sandhyā Bhāvanā";
  }

  // Pilgrimage Site Time (Bodh Gaya / Lumbini — Indian Standard Time UTC+5:30)
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const bodhGayaDate = new Date(utc + 3600000 * 5.5);
  const bodhGayaTimeString = bodhGayaDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return {
    modernYear: `${gregorianYear} CE`,
    gregorianYear,
    buddhistEra,
    lunarName,
    lunarIcon,
    isUposatha,
    watchName,
    watchPali,
    bodhGayaTimeString,
    dayName: now.toLocaleDateString("en-US", { weekday: "long" }),
    fullDate: now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    timeString: now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };
}

const SACRED_FESTIVALS = [
  {
    name: "Vesak (Buddha Purnima)",
    date: "Full Moon of Vaisakha (May)",
    significance: "Triple sacred commemoration: The Nativity, Supreme Enlightenment, and Parinibbana of the Buddha.",
  },
  {
    name: "Asalha Puja (Dhamma Day)",
    date: "Full Moon of Asadha (July)",
    significance: "Celebrates the First Sermon at Sarnath and the turning of the Wheel of Dhamma.",
  },
  {
    name: "Magha Puja (Sangha Day)",
    date: "Full Moon of Magha (February/March)",
    significance: "The spontaneous gathering of 1,250 enlightened Arahants to receive the Ovada Patimokkha.",
  },
  {
    name: "Kathina Ceremony",
    date: "End of Vassa Rains Retreat (October/November)",
    significance: "Annual robe-offering ceremony celebrating monastic dedication and generosity (Dana).",
  },
];

export default function BuddhistClock() {
  const [timeData, setTimeData] = useState(() => getBuddhistTimeData(new Date()));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeData(getBuddhistTimeData(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpen = () => {
    soundEngine.playTingsha(1750);
    setIsOpen(true);
  };

  const handleClose = () => {
    soundEngine.playWoodBlock(460);
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar Real-Time Trigger Pill: Modern Year & Buddhist Era */}
      <button
        type="button"
        onClick={handleOpen}
        title="View Modern Calendar & Sacred Buddhist Era Clock"
        aria-label="View Modern Calendar & Sacred Buddhist Era Clock"
        className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold-500/25 bg-temple-900/70 px-2.5 sm:px-3 py-1.5 text-xs font-heading tracking-wider text-gold-300 transition hover:border-gold-400 hover:bg-gold-500/15 hover:shadow-md hover:shadow-gold-500/15 active:scale-95 shrink-0"
      >
        <span className="text-sm">{timeData.lunarIcon}</span>
        <span className="font-mono font-semibold text-temple-50 text-[11px] sm:text-xs">
          {timeData.timeString}
        </span>
        <span className="hidden sm:inline text-[10px] text-gold-400/90 font-mono bg-temple-950/80 px-1.5 py-0.5 rounded-full border border-gold-500/20">
          {timeData.modernYear}
        </span>
      </button>

      {/* Sacred Buddhist & Modern Time Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <div
            data-lenis-prevent="true"
            className="fixed inset-0 z-[350] flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="buddhist-clock-title"
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
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex max-h-[88svh] w-full max-w-2xl flex-col rounded-3xl border border-gold-500/35 bg-temple-950 p-5 sm:p-8 shadow-2xl shadow-black/90 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-gold-500/20 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-gold-400">☸</span>
                    <h2
                      id="buddhist-clock-title"
                      className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-temple-50"
                    >
                      Sacred Time & Modern Calendar
                    </h2>
                  </div>
                  <p className="mt-1 text-[11px] sm:text-xs uppercase tracking-widest text-gold-400/90">
                    Dual Chronology: Modern Solar Year {timeData.modernYear} · Buddhist Era {timeData.buddhistEra} B.E.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close calendar"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-gold-500/20 bg-temple-900/60 text-base sm:text-lg text-temple-200/80 transition hover:border-gold-400 hover:text-gold-400"
                >
                  ✕
                </button>
              </div>

              {/* Main Live Time Card */}
              <div className="mt-5 rounded-2xl border border-gold-500/30 bg-gradient-to-br from-temple-900/90 via-temple-950 to-temple-900/90 p-5 sm:p-6 text-center shadow-xl">
                <span className="font-heading text-xs uppercase tracking-[0.25em] text-gold-400">
                  {timeData.dayName} · {timeData.fullDate}
                </span>

                {/* Big Live Modern Clock */}
                <div className="mt-2 font-mono text-3xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-temple-50 via-gold-200 to-gold-400 tracking-wider">
                  {timeData.timeString}
                </div>

                {/* Dual Year Alignment Pills */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-temple-950/90 px-3.5 py-1 shadow-inner">
                    <span className="text-[10px] sm:text-xs uppercase font-heading text-gold-400 font-bold">
                      Modern Solar Year:
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-temple-50">
                      {timeData.modernYear}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/15 px-3.5 py-1 shadow-inner">
                    <span className="text-[10px] sm:text-xs uppercase font-heading text-gold-300 font-bold">
                      Buddhist Era (B.E.):
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-gold-200">
                      {timeData.buddhistEra} B.E.
                    </span>
                  </div>
                </div>

                {/* Pilgrimage Sanctuary Time & Lunar Phase */}
                <div className="mt-5 grid gap-3 sm:grid-cols-3 text-left border-t border-gold-500/15 pt-4">
                  <div className="rounded-xl border border-gold-500/15 bg-temple-950/70 p-3">
                    <span className="text-[10px] font-heading uppercase tracking-widest text-gold-400">
                      Bodh Gaya Temple Time
                    </span>
                    <h4 className="mt-1 font-mono text-sm font-bold text-temple-50">
                      {timeData.bodhGayaTimeString}
                    </h4>
                    <p className="text-[10px] text-temple-200/60">
                      Indian Standard (UTC+5:30)
                    </p>
                  </div>

                  <div className="rounded-xl border border-gold-500/15 bg-temple-950/70 p-3">
                    <span className="text-[10px] font-heading uppercase tracking-widest text-gold-400">
                      Monastic Watch of Day
                    </span>
                    <h4 className="mt-1 font-heading text-xs sm:text-sm font-bold text-temple-50">
                      {timeData.watchName}
                    </h4>
                    <p className="font-serif text-[11px] italic text-gold-300/80">
                      {timeData.watchPali}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gold-500/15 bg-temple-950/70 p-3">
                    <span className="text-[10px] font-heading uppercase tracking-widest text-gold-400">
                      Lunar Moon Phase
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-lg">{timeData.lunarIcon}</span>
                      <h4 className="font-heading text-xs font-bold text-temple-50 truncate">
                        {timeData.lunarName.split("(")[0].trim()}
                      </h4>
                    </div>
                    {timeData.isUposatha && (
                      <span className="mt-0.5 inline-block text-[9px] uppercase tracking-wider text-gold-400 font-bold">
                        ★ Sacred Uposatha Day
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Uposatha Observance Guide */}
              <div className="mt-4 rounded-2xl border border-gold-500/20 bg-temple-900/40 p-4">
                <h4 className="font-heading text-xs uppercase tracking-widest text-gold-400">
                  About the Buddhist Calendar & Uposatha
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-temple-100/90 sm:text-sm">
                  The Buddhist Era begins with the Parinirvana of the Buddha in 543 BCE. On lunar Uposatha days (Full Moon, New Moon, and Quarter Moons), lay disciples observe the Eight Precepts and meditate together in monasteries.
                </p>
              </div>

              {/* Sacred Annual Holy Festivals */}
              <div className="mt-4">
                <h4 className="font-heading text-xs uppercase tracking-widest text-gold-400 mb-2.5">
                  Annual Buddhist Holy Festivals
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {SACRED_FESTIVALS.map((fest) => (
                    <div
                      key={fest.name}
                      className="rounded-xl border border-gold-500/15 bg-temple-900/45 p-3"
                    >
                      <h5 className="font-heading text-xs sm:text-sm font-bold text-gold-300">
                        {fest.name}
                      </h5>
                      <span className="text-[10px] text-temple-200/60 font-mono">
                        {fest.date}
                      </span>
                      <p className="mt-1 text-[11px] text-temple-100/80 leading-relaxed">
                        {fest.significance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 border-t border-gold-500/20 pt-3 text-center text-xs text-temple-200/50">
                Synchronized with Modern Gregorian Solar Calendar & Canonical Theravāda Lunar Epoch.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
