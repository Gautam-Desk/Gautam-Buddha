import { useEffect, useState } from "react";
import { soundEngine } from "../utils/audioEngine";
import BuddhistClock from "./BuddhistClock";

const NAV_LINKS = [
  { href: "#buddha-story", id: "buddha-story", label: "Story" },
  { href: "#life-chronicles", id: "life-chronicles", label: "Chronicle" },
  { href: "#awakening", id: "awakening", label: "Awakening" },
  { href: "#teachings", id: "teachings", label: "Dhamma" },
  { href: "#sacred-sites", id: "sacred-sites", label: "Sites" },
  { href: "#mudras", id: "mudras", label: "Mudrās" },
  { href: "#meditation", id: "meditation", label: "Meditation" },
  { href: "#gallery", id: "gallery", label: "Gallery" },
];

export default function Navbar({ onOpenGlossary, onOpenAI }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      if (totalH > 0) {
        setScrollProgress((scrollY / totalH) * 100);
      }

      // Scrollspy active section detection
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
      const scrollPos = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen for audio engine state changes
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(({ isMuted }) => {
      setIsMuted(isMuted);
    });
    return () => unsubscribe();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLink = (e, href) => {
    e.preventDefault();
    soundEngine.playPeaceBell(360);
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleToggleMasterSound = () => {
    const nextMuted = soundEngine.toggleMasterSound();
    setIsMuted(nextMuted);
  };

  return (
    <>
      {/* Dynamic Scroll Progress Bar with Golden Halo */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-temple-950/50">
        <div
          className="h-full bg-gradient-to-r from-saffron-500 via-gold-400 to-saffron-300 transition-all duration-100 shadow-[0_0_10px_rgba(217,164,65,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 px-3 sm:px-6 pt-2 sm:pt-3`}
      >
        {/* Floating Capsule Bar */}
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border transition-all duration-300 px-3.5 sm:px-5 py-2 ${
            scrolled
              ? "border-gold-500/35 bg-temple-950/95 backdrop-blur-xl shadow-2xl shadow-black/80"
              : "border-gold-500/20 bg-temple-950/80 backdrop-blur-md shadow-lg"
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLink(e, "#hero")}
            className="group flex items-center gap-2 font-heading text-sm sm:text-base font-bold tracking-[0.16em] text-gold-400 transition hover:text-gold-300 shrink-0"
            aria-label="Gautam Buddha Home"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-xs text-gold-400 transition duration-300 group-hover:scale-110 group-hover:border-gold-400 group-hover:shadow-[0_0_10px_rgba(217,164,65,0.5)]">
              ☸
            </span>
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-saffron-400 bg-clip-text text-transparent">
              BUDDHA
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((l) => {
                const isActive = activeSection === l.id;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => handleLink(e, l.href)}
                      className={`relative rounded-full px-2.5 py-1 font-heading text-xs font-medium uppercase tracking-wider transition duration-300 ${
                        isActive
                          ? "bg-gold-500/20 text-gold-300 font-bold border border-gold-400/40 shadow-sm"
                          : "text-temple-100/85 hover:bg-gold-500/10 hover:text-gold-300"
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Controls: Modern Time, Master Sound & AI Guide */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Ask Dhamma AI Guide Button */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playSingingBowl(216, 3.5);
                if (onOpenAI) onOpenAI();
              }}
              title="Ask Dhamma AI Wisdom Guide"
              className="flex h-8 items-center gap-1 rounded-full border border-gold-400/60 bg-gradient-to-r from-gold-500/25 to-saffron-500/25 px-2.5 font-heading text-[10px] font-bold uppercase tracking-wider text-gold-300 shadow-md hover:border-gold-300 hover:bg-gold-500/30 transition active:scale-95"
            >
              <span>✨</span>
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Buddhist Clock & Modern Year Trigger */}
            <BuddhistClock />

            {/* Master Sound Button */}
            <button
              type="button"
              onClick={handleToggleMasterSound}
              title={isMuted ? "Sound is OFF — Click to turn ON" : "Sound is ON — Click to Mute"}
              aria-label={isMuted ? "Turn Sound ON" : "Turn Sound OFF"}
              className={`flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-xs font-heading tracking-wider transition active:scale-95 ${
                !isMuted
                  ? "border-gold-400 bg-gold-500/20 text-gold-300 shadow-md font-semibold"
                  : "border-gold-500/25 bg-temple-900/70 text-temple-100/60 hover:border-gold-400/60 hover:text-temple-50"
              }`}
            >
              <span className="text-xs">{!isMuted ? "🔊" : "🔇"}</span>
            </button>

            {/* Glossary Trigger */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playTingsha(1700);
                onOpenGlossary();
              }}
              className="hidden xl:flex h-8 items-center gap-1 rounded-full border border-gold-500/25 bg-temple-900/70 px-2.5 font-heading text-[10px] uppercase tracking-wider text-temple-100 transition hover:border-gold-400 hover:bg-gold-500/15 hover:text-gold-300 active:scale-95"
            >
              <span>📖</span>
              <span>Glossary</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => {
                soundEngine.playWoodBlock(460);
                setOpen((v) => !v);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/25 bg-temple-900/60 text-gold-400 transition hover:border-gold-400 hover:bg-gold-500/10 lg:hidden"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            open
              ? "max-h-[550px] opacity-100 border border-gold-500/25 rounded-3xl mt-2 p-4"
              : "max-h-0 opacity-0 pointer-events-none"
          } bg-temple-950/98 backdrop-blur-2xl shadow-2xl mx-auto max-w-lg`}
        >
          <div className="space-y-3">
            <ul className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((l) => {
                const isActive = activeSection === l.id;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => handleLink(e, l.href)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 font-heading text-xs uppercase tracking-wider transition ${
                        isActive
                          ? "border-gold-400 bg-gold-500/20 text-gold-300 font-bold"
                          : "border-gold-500/15 bg-temple-900/50 text-temple-100 hover:border-gold-400 hover:bg-gold-500/15 hover:text-gold-300"
                      }`}
                    >
                      <span className="text-gold-400/70 text-xs">❖</span>
                      <span>{l.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-gold-500/20 pt-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  if (onOpenAI) onOpenAI();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold-400 bg-gold-500/20 py-2 font-heading text-xs uppercase tracking-wider text-gold-300 font-bold"
              >
                <span>✨ Ask Dhamma AI Guide</span>
              </button>

              <button
                type="button"
                onClick={handleToggleMasterSound}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-temple-900/80 py-2 font-heading text-xs uppercase tracking-wider text-gold-300"
              >
                <span>{!isMuted ? "🔊 Sound is ON" : "🔇 Sound is OFF"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenGlossary();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-temple-900/80 py-2 font-heading text-xs uppercase tracking-wider text-gold-400 hover:bg-gold-500/15"
              >
                <span>📖 Open Pāli Dhamma Glossary</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
