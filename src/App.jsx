import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Hero from "./components/sections/Hero";
import BuddhaStory from "./components/sections/BuddhaStory";
import LifeChronicles from "./components/sections/LifeChronicles";
import Awakening from "./components/sections/Awakening";
import Teachings from "./components/sections/Teachings";
import SacredSites from "./components/sections/SacredSites";
import MudrasGuide from "./components/sections/MudrasGuide";
import Meditation from "./components/sections/Meditation";
import Quotes from "./components/sections/Quotes";
import Gallery from "./components/Gallery";
import Footer from "./components/sections/Footer";
import GlossaryModal from "./components/GlossaryModal";
import BuddhaAIModal from "./components/BuddhaAIModal";
import AudioDock from "./components/AudioDock";
import FloatingBodhiLeaves from "./components/FloatingBodhiLeaves";
import ZenCursor from "./components/ZenCursor";
import { AnimationProvider } from "./context/AnimationContext";
import useLenis from "./hooks/useLenis";

export default function App() {
  useLenis();
  const [ready, setReady] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimationProvider>
      <Loader ready={ready} />
      <ZenCursor />
      <FloatingBodhiLeaves />
      <Navbar
        onOpenGlossary={() => setGlossaryOpen(true)}
        onOpenAI={() => setAiOpen(true)}
      />
      <main>
        <Hero onOpenAI={() => setAiOpen(true)} />
        <BuddhaStory />
        <LifeChronicles />
        <Awakening />
        <Teachings />
        <SacredSites />
        <MudrasGuide />
        <Meditation />
        <Quotes />
        <Gallery />
      </main>
      <Footer
        onOpenGlossary={() => setGlossaryOpen(true)}
        onOpenAI={() => setAiOpen(true)}
      />
      <AudioDock onOpenAI={() => setAiOpen(true)} />
      <GlossaryModal
        isOpen={glossaryOpen}
        onClose={() => setGlossaryOpen(false)}
      />
      <BuddhaAIModal
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
      />
    </AnimationProvider>
  );
}
