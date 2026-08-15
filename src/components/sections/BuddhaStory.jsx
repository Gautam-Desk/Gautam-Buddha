import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../Reveal";
import { soundEngine } from "../../utils/audioEngine";

const STORY_ACTS = [
  {
    id: "act-1",
    actNumber: "Act I",
    period: "563 BCE",
    title: "The Auspicious Nativity & The Golden Palace",
    subtitle: "A Prince Born under the Sal Blossoms",
    location: "Lumbini & Kapilavastu",
    image: "./zaimful-buddha-1478259.webp",
    quote: "Aggo'hamasmi lokassa, jeṭṭho'hamasmi lokassa, seṭṭho'hamasmi lokassa. Ayamantimā jāti, natthi dāni punabbhavo.",
    quoteTranslation: "Chief am I in the world, supreme am I in the world. This is my final birth; there is no further rebirth for me.",
    narrative: [
      "On the full moon of Vesak, Queen Maya Devi rested beneath a blooming Sal tree in the sacred gardens of Lumbini. As she grasped a blossoming bough, Prince Siddhartha was born pure and unstained, taking seven lotus steps toward the north.",
      "The aged hermit sage Asita wept tears of mixed joy and sorrow upon examining the infant's 32 physical marks of greatness, prophesying that Siddhartha would not inherit his father's earthly empire, but would become the Supreme Awakened Buddha.",
      "To shield him from sorrow, King Suddhodana built three seasonal pleasure palaces of marble and cedar, surrounding the youth with music, jasmine gardens, and luxury, concealing the existence of suffering, sickness, and decay.",
    ],
    highlight: "The White Elephant Dream & The Prophecy of Sage Asita",
    soundEffect: () => soundEngine.playWindChimes(),
  },
  {
    id: "act-2",
    actNumber: "Act II",
    period: "Age 29",
    title: "The Four Sights & The Great Renunciation",
    subtitle: "Trading a Kingdom for the Path of Truth",
    location: "Anoma River & Uruvela Forest",
    image: "./1.webp",
    quote: "Appamattā na mīyanti, ye pamattā yathā matā.",
    quoteTranslation: "The heedful do not die; the heedless are already like the dead.",
    narrative: [
      "Venturing beyond the palace walls with his charioteer Channa, Siddhartha confronted the raw truth of existence through the Four Divine Messengers: an old man bent double, a diseased person wracked with fever, a lifeless corpse on a funeral bier, and a calm wandering recluse.",
      "At midnight, realizing that all sensual pleasure is fleeting, he cast a tender farewell gaze upon his sleeping wife Yasodhara and newborn son Rahula. Riding his noble steed Kanthaka across the river Anoma, he severed his hair, cast off his royal silks, and donned the coarse saffron robes of a homeless seeker.",
      "For six years in the dense jungles of Uruvela, he practiced severe self-mortification until his ribs showed like the rafters of a ruined barn. Recognizing that self-mortification only clouded the mind, he accepted sweet milk-rice from the maiden Sujata and formulated the Middle Way.",
    ],
    highlight: "The Metaphor of the Lute Strings: The Middle Way between Indulgence and Self-Harm",
    soundEffect: () => soundEngine.playDeepGong(5.0),
  },
  {
    id: "act-3",
    actNumber: "Act III",
    period: "Age 35",
    title: "The Defeat of Mara & Supreme Awakening",
    subtitle: "The Dawn of Unshakeable Liberation",
    location: "Under the Bodhi Tree, Bodh Gaya",
    image: "./bodhi_tree.webp",
    quote: "Gahakāraka diṭṭho'si, puna gehaṃ na kāhasi! Sabbā te phāsukā bhaggā, gahakūṭaṃ visaṅkhataṃ!",
    quoteTranslation: "O house-builder of suffering! You are seen! You shall build no more houses for me. All your rafters are broken; the ridge-pole is shattered!",
    narrative: [
      "Taking his seat upon a grass mat beneath the sacred Pippala (Bodhi) Tree, Siddhartha made an immovable vow: 'Let my skin, sinews, and bones dry up; let my flesh melt away; but I will not rise from this seat until I attain supreme, unexcelled Enlightenment.'",
      "As dusk fell, Mara, the personification of illusion, desire, and death, attacked with tempests, flaming arrows, and his alluring daughters (Taṇhā, Arati, Rāga). Unmoved, Siddhartha reached down his right hand and touched the earth in the Bhūmisparśa mudra, calling the Earth itself to witness his countless lifetimes of selfless virtue. The earth roared in affirmation, and Mara's armies scattered like dust.",
      "Passing through the four Jhānas in the watches of the night, Siddhartha penetrated the Twelve Links of Dependent Origination (Paṭiccasamuppāda). As the morning star arose, all ignorance vanished forever into the radiant, unconditioned peace of Nibbāna.",
    ],
    highlight: "Bhumisparsha Earth-Touching Mudra & Conquest of the 10 Armies of Mara",
    soundEffect: () => soundEngine.playSingingBowl(216, 5.0),
  },
  {
    id: "act-4",
    actNumber: "Act IV",
    period: "Age 35–80",
    title: "The 45-Year Ministry & Compassionate Works",
    subtitle: "Transforming Bandits, Healing Grief, and Establishing the Sangha",
    location: "Sarnath, Rajgir, Shravasti & Vaishali",
    image: "./3.webp",
    quote: "Caratha bhikkhave cārikaṃ bahujanahitāya bahujanasukhāya lokānukampāya atthāya hitāya sukhāya devamanussānaṃ.",
    quoteTranslation: "Go forth, O bhikkhus, for the welfare of the many, for the happiness of the many, out of compassion for the world.",
    narrative: [
      "At Sarnath Deer Park, the Buddha delivered his first sermon to the five ascetics, setting the eternal Wheel of Dhamma in motion. For 45 years barefoot across northern India, he taught kings, courtesans, outcasts, and scholars without discrimination.",
      "Taming the Ferocious Bandit Angulimala: When the serial killer chased the Buddha with a sword, the Buddha walked at normal pace while the sprinting bandit could not catch him. The Buddha said: 'I have stopped harming living beings, Angulimala; it is you who have not stopped.' Angulimala dropped his weapons and became an enlightened monk.",
      "The Mustard Seed of Kisa Gotami: When a young mother carried her dead child weeping, the Buddha asked her to bring a mustard seed from a house where no one had died. After searching every home in vain, she realized death is universal, her grief softened into insight, and she attained liberation.",
      "The Subjugation of Nalagiri: When his jealous cousin Devadatta loosed a drunken, raging war elephant, the Buddha stood completely calm and radiated boundless loving-kindness (Mettā). The beast dropped to its knees and bowed before him in reverence.",
      "Establishing the Order of Nuns (Bhikkhunis): Championed by his foster mother Mahapajapati Gotami and disciple Ananda, the Buddha established the full monastic ordination of women, affirming their equal capacity for enlightenment.",
    ],
    highlight: "Healing Kisa Gotami, Taming Angulimala, and Subduing Nalagiri through Metta",
    soundEffect: () => soundEngine.playCrystalBowl(432, 5.0),
  },
  {
    id: "act-5",
    actNumber: "Act V",
    period: "Age 80 (483 BCE)",
    title: "The Great Passing into Mahāparinibbāna",
    subtitle: "The Final Exhortation: Strive On with Diligence",
    location: "Twin Sal Groves of Kushinagar",
    image: "./medusa_print_art-buddha-7850744.webp",
    quote: "Handa dāni, bhikkhave, āmantayāmi vo: Vayadhammā saṅkhārā, appamādena sampādetha.",
    quoteTranslation: "Behold now, bhikkhus, I exhort you: All conditioned things are subject to disintegration and decay. Strive on with diligence!",
    narrative: [
      "At the age of eighty, despite severe illness, the Buddha walked to the Sal groves of the Mallas in Kushinagar. He asked his attendant Ananda to prepare a couch between two twin Sal trees, lying down on his right side in the lion's posture, with his head toward the north.",
      "As heavenly Sal blossoms rained out of season upon his body, Venerable Ananda wept leaning against a doorpost. The Buddha called him gently: 'Do not weep, Ananda. Have I not taught you that whatever is born is subject to separation? You have served the Tathagata with boundless love; strive on, and soon you will be free of defilements.'",
      "He asked the assembled monks three times if anyone had any lingering doubt concerning the Dhamma or the Vinaya. When all remained silent in perfect understanding, the Buddha spoke his last parting words to the world, entered the meditative absorptions, and passed into the unconditioned peace of Mahaparinirvana.",
    ],
    highlight: "The Last Words of the Buddha & Passing into Parinibbana",
    soundEffect: () => soundEngine.playDeepGong(6.0),
  },
];

export default function BuddhaStory() {
  const [activeAct, setActiveAct] = useState(STORY_ACTS[0]);

  const handleActSelect = (act) => {
    act.soundEffect();
    setActiveAct(act);
  };

  return (
    <section id="buddha-story" className="relative bg-temple-950 py-24 md:py-32">
      {/* Background radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,164,65,0.08)_0%,transparent_60%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="text-center">
            <span className="font-heading text-xs uppercase tracking-[0.4em] text-gold-400">
              The Great Sacred Narrative
            </span>
            <h2 className="mt-3 font-heading text-3xl text-temple-50 sm:text-5xl md:text-6xl">
              The Life & Compassionate Works of the Buddha
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-temple-100/80 sm:text-base">
              The epic journey from royal prince to wandering mendicant, supreme awakening under the Bodhi tree, 45 years of boundless compassion, and the final Mahāparinibbāna.
            </p>
          </div>
        </Reveal>

        {/* Act Selector Navigation Bar */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 border-b border-gold-500/20 pb-4">
            {STORY_ACTS.map((act) => {
              const isSelected = activeAct.id === act.id;
              return (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => handleActSelect(act)}
                  className={`group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-heading tracking-wider transition md:text-sm ${
                    isSelected
                      ? "border border-gold-400 bg-gold-500/20 text-gold-300 shadow-md shadow-gold-500/15 font-bold"
                      : "border border-gold-500/15 bg-temple-900/40 text-temple-200/70 hover:border-gold-500/30 hover:bg-temple-900/80 hover:text-temple-100"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-temple-950 text-[10px] font-bold text-gold-400 border border-gold-500/30">
                    {act.actNumber.replace("Act ", "")}
                  </span>
                  <span>{act.title.split("&")[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Story Focus Feature Card */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid gap-8 rounded-3xl border border-gold-500/25 bg-temple-900/60 p-6 shadow-2xl backdrop-blur-md md:grid-cols-12 md:p-10"
            >
              {/* Narrative Content */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-md bg-gold-500/15 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-widest text-gold-400 border border-gold-500/30">
                      {activeAct.actNumber} · {activeAct.period}
                    </span>
                    <span className="text-xs text-temple-200/60 font-mono">
                      📍 {activeAct.location}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-2xl text-temple-50 sm:text-3xl md:text-4xl">
                    {activeAct.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gold-300/90 font-serif italic">
                    {activeAct.subtitle}
                  </p>

                  {/* Deep Narrative Paragraphs */}
                  <div className="mt-5 space-y-3.5 text-xs sm:text-sm leading-relaxed text-temple-100/90">
                    {activeAct.narrative.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Sacred Quote Callout */}
                  <div className="mt-6 rounded-2xl border border-gold-500/25 bg-temple-950/85 p-4 shadow-inner">
                    <span className="font-heading text-[10px] uppercase tracking-widest text-gold-400">
                      Pāli Utterance · Canonical Record
                    </span>
                    <p className="mt-1 font-serif text-sm italic text-gold-200 leading-relaxed">
                      &ldquo;{activeAct.quote}&rdquo;
                    </p>
                    <p className="mt-1 text-xs text-temple-200/80">
                      — {activeAct.quoteTranslation}
                    </p>
                  </div>
                </div>

                {/* Core Highlight Footer */}
                <div className="mt-6 border-t border-gold-500/15 pt-4 text-xs text-gold-300/90">
                  <strong className="font-heading uppercase tracking-wider text-gold-400">
                    Key Historical Deed:{" "}
                  </strong>
                  <span>{activeAct.highlight}</span>
                </div>
              </div>

              {/* Visual Presentation */}
              <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gold-500/25 bg-temple-950 md:col-span-5 aspect-[4/5]">
                <img
                  src={activeAct.image}
                  alt={activeAct.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-temple-950 via-temple-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="font-heading text-xs uppercase tracking-widest text-gold-300 drop-shadow-md">
                    {activeAct.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
