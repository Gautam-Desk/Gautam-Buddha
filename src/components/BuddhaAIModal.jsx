import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "../utils/audioEngine";

const SUGGESTED_QUERIES = [
  "What are the Four Noble Truths?",
  "How did Buddha transform Angulimala?",
  "Explain Anattā (Non-Self) simply.",
  "What is the Parable of the Poisoned Arrow?",
  "How to practice Ānāpānasati breath meditation?",
  "What happened under the Bodhi Tree?",
];

const CANONICAL_KNOWLEDGE_BASE = [
  {
    keywords: ["four noble truths", "dukkha", "samudaya", "nirodha", "magga"],
    title: "The Four Noble Truths (Cattāri Ariyasaccāni)",
    citation: "Dhammacakkappavattana Sutta (SN 56.11)",
    answer:
      "The Four Noble Truths form the diagnostic bedrock of the Buddha's teachings:\n\n1. **Dukkha Sacca (Truth of Suffering)**: Physical and mental life involves inherent friction, aging, sorrow, and impermanence.\n2. **Samudaya Sacca (Origin of Suffering)**: Suffering arises directly from Craving (Taṇhā) — craving for sensory pleasure, eternal becoming, and non-existence.\n3. **Nirodha Sacca (Cessation of Suffering)**: Complete release (Nibbāna) is achieved through the total unbinding and relinquishment of craving.\n4. **Magga Sacca (Path to Cessation)**: The practical Middle Path known as the Noble Eightfold Path: Right View, Intention, Speech, Action, Livelihood, Effort, Mindfulness, and Concentration.",
  },
  {
    keywords: ["angulimala", "bandit", "finger necklace", "killer", "violence"],
    title: "The Transformation of Angulimala",
    citation: "Angulimala Sutta (MN 86)",
    answer:
      "Angulimala was a fearsome bandit who wore a necklace made of his victims' fingers. When he saw the Buddha walking peacefully in the forest, he drew his sword and sprinted to kill him, yet could not catch up even though the Buddha was walking at normal pace.\n\nExhausted, Angulimala shouted: *'Stop, monk! Stop!'*\n\nThe Buddha replied calmly: *'I have stopped, Angulimala; it is you who have not stopped. I have stopped harming living beings forever; you continue to harm and take life.'*\n\nStruck by the profound moral power and fearless compassion of these words, Angulimala threw down his weapons, bowed, requested ordination, and subsequently attained full Arahantship (Enlightenment).",
  },
  {
    keywords: ["anatta", "non-self", "no soul", "ego", "self", "soul"],
    title: "The Doctrine of Anattā (Non-Self)",
    citation: "Anattalakkhana Sutta (SN 22.59)",
    answer:
      "Anattā is one of the Three Marks of Existence (Tilakkhaṇa). The Buddha taught that within human experience there is no permanent, unchanging 'ego', 'soul', or autonomous master.\n\nWhat we call a 'person' is an ever-flowing stream of five interconnected aggregates (Khandhas):\n1. Form / Physical Body (Rūpa)\n2. Sensations / Feelings (Vedanā)\n3. Perception (Saññā)\n4. Mental Formations / Intentions (Saṅkhāra)\n5. Consciousness (Viññāṇa)\n\nBecause every one of these five is impermanent (Anicca) and subject to change, none can rightfully be clung to as 'I', 'Me', or 'Mine'. Direct insight into Anattā dissolves defensive ego-clinging and unlocks boundless compassion.",
  },
  {
    keywords: ["poisoned arrow", "arrow", "metaphysics", "speculation"],
    title: "The Parable of the Poisoned Arrow",
    citation: "Cūḷamālukya Sutta (MN 63)",
    answer:
      "When a monk named Malunkyaputta demanded answers to speculative metaphysical questions (whether the cosmos is eternal, whether an enlightened one exists after death), the Buddha told this parable:\n\n*Imagine a person struck by a poisoned arrow. His friends rush a surgeon to help, but the wounded man says: 'I will not let this arrow be pulled out until I know who shot it, what caste he was from, what wood the shaft was made of, and what feather was on the fletching!' That man would die before his curiosity was satisfied.*\n\nThe Buddha concluded: The urgent spiritual task is not speculative philosophy, but extracting the poisoned arrow of present suffering (Dukkha).",
  },
  {
    keywords: ["meditation", "anapanasati", "breathe", "breathing", "mindfulness", "sati"],
    title: "Mindfulness of Breathing (Ānāpānasati)",
    citation: "Ānāpānasati Sutta (MN 118)",
    answer:
      "The Buddha practiced and taught Ānāpānasati as the supreme vehicle for developing calm (Samatha) and insight (Vipassanā):\n\n1. **Posture**: Sit with an upright spine, eyes softly closed or resting down, hands in Dhyāna mudra.\n2. **Anchor**: Direct undivided present-moment attention to the physical sensation of the breath at the nostrils or upper lip.\n3. **Observation**: Notice long breaths as long, short breaths as short, without forcing or judging.\n4. **Experiencing the Whole Body**: Feel the entire body breathing in and out with relaxed ease.\n5. **Tranquilizing**: Calm the bodily and mental formations, cultivating inner joy, radiant clarity, and peaceful release.",
  },
  {
    keywords: ["bodhi tree", "enlightenment", "mara", "bhumisparsha", "awakening"],
    title: "The Night of Supreme Awakening",
    citation: "Maha-Saccaka Sutta (MN 36) & Dhammapada 153-154",
    answer:
      "At age 35 on the full moon of Vesak, Siddhartha sat upon the Diamond Throne beneath the Bodhi Tree in Bodh Gaya with immovable resolve.\n\nWhen Mara, the lord of illusion, unleashed storms and challenged his right to the seat of liberation, Siddhartha touched the earth in **Bhūmisparśa mudrā**. The Earth roared: *'I bear witness to his lifetimes of virtue!'* routing Mara's armies.\n\nDuring the three watches of the night, Siddhartha attained:\n- **1st Watch**: Memory of past lives (Pubbenivāsānussati-ñāṇa)\n- **2nd Watch**: The Divine Eye seeing karmic rebirth (Cutūpapāta-ñāṇa)\n- **3rd Watch**: Destruction of all mental defilements & penetration of Dependent Origination (Āsavakkhaya-ñāṇa)\n\nAt dawn, he realized Sammā-Sambodhi (Unexcelled Complete Enlightenment).",
  },
  {
    keywords: ["kisa gotami", "mustard seed", "grief", "death", "child"],
    title: "The Mustard Seed of Kisa Gotami",
    citation: "Therigatha Commentary",
    answer:
      "When Kisa Gotami's infant son died, she carried his body in sorrow from house to house asking for medicine. Compassionate villagers guided her to the Buddha.\n\nThe Buddha said: *'Go into the city and bring me a single mustard seed from any household where no parent, child, spouse, or servant has ever died.'*\n\nShe went to every house. Everyone offered mustard seeds, but replied: *'Alas, the living are few, but the dead are many.'* She realized that death is universal to all conditioned life. Returning to the Buddha, she laid her grief down, ordained, and achieved liberation.",
  },
];

export default function BuddhaAIModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "assistant",
      text: "Namo Buddhaya. I am your Dhamma Wisdom Guide, grounded in the Pāli Canon and historical Buddhist encyclopedia. Ask me anything regarding the Buddha's life, Four Noble Truths, Eightfold Path, mindfulness meditation, or sacred parables.",
      citation: "Tipiṭaka (Pāli Canon) & Wikipedia Knowledgebase",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleAsk = async (queryText) => {
    const textToAsk = queryText || input;
    if (!textToAsk.trim() || isLoading) return;

    soundEngine.playPeaceBell(380);
    const userMsg = {
      id: String(Date.now()),
      sender: "user",
      text: textToAsk,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const queryLower = textToAsk.toLowerCase();

    // 1. Check Canonical Sutta Knowledge Base
    const matchedCanonical = CANONICAL_KNOWLEDGE_BASE.find((entry) =>
      entry.keywords.some((kw) => queryLower.includes(kw))
    );

    if (matchedCanonical) {
      setTimeout(() => {
        soundEngine.playSingingBowl(216, 3.5);
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            sender: "assistant",
            text: matchedCanonical.answer,
            title: matchedCanonical.title,
            citation: matchedCanonical.citation,
          },
        ]);
        setIsLoading(false);
      }, 700);
      return;
    }

    // 2. Query Free Wikipedia API dynamically for any Buddhist search query
    try {
      // First, search Wikipedia for relevant Buddhism article
      const searchRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=buddhism+${encodeURIComponent(
          textToAsk
        )}&format=json&origin=*`
      );
      const searchData = await searchRes.json();

      let wikiSummary = "";
      let wikiTitle = "";
      let wikiUrl = "";
      let wikiThumb = "";

      if (searchData?.query?.search?.length > 0) {
        const topResult = searchData.query.search[0];
        const pageTitle = topResult.title;

        // Fetch page summary
        const summaryRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            pageTitle
          )}`
        );
        if (summaryRes.ok) {
          const summaryData = await summaryRes.json();
          wikiSummary = summaryData.extract;
          wikiTitle = summaryData.title;
          wikiUrl = summaryData.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`;
          wikiThumb = summaryData.thumbnail?.source;
        }
      }

      if (wikiSummary) {
        soundEngine.playTingsha(1700);
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            sender: "assistant",
            text: wikiSummary,
            title: wikiTitle,
            citation: "Wikipedia Buddhist Encyclopedia",
            wikiUrl,
            wikiThumb,
          },
        ]);
      } else {
        // Fallback Buddhist reflection
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            sender: "assistant",
            text:
              "In the words of the Dhammapada: 'Better than a thousand hollow words is one word that brings peace.' While I continue to search the scriptures, reflect on the core practice of mindful presence (Sati), non-harming (Ahiṃsā), and cultivating Loving-Kindness (Mettā) in this present moment.",
            citation: "Dhammapada Verse 100",
          },
        ]);
      }
    } catch (err) {
      console.warn("Wikipedia API lookup failed, providing canonical fallback:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: "assistant",
          text:
            "The Dhamma is profound, peaceful, and open to direct personal verification (Ehipassiko). The Buddha taught that all suffering is rooted in craving (Taṇhā) and delusion (Avijjā), and freedom is attained through the cultivation of the Noble Eightfold Path.",
          citation: "Majjhima Nikāya",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-[400] flex items-center justify-center p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="buddha-ai-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-temple-950/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative flex h-[85vh] w-full max-w-2xl flex-col rounded-3xl border border-gold-500/35 bg-temple-950 p-4 sm:p-6 shadow-2xl shadow-black/90"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gold-500/20 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/50 bg-gold-500/15 text-lg text-gold-400">
                ☸
              </span>
              <div>
                <h2
                  id="buddha-ai-title"
                  className="font-heading text-lg sm:text-xl font-bold text-temple-50"
                >
                  Dhamma AI Wisdom Guide
                </h2>
                <p className="text-[10px] sm:text-xs text-gold-400/90 font-mono">
                  Canonical Suttas · Wikipedia API · Free Public Access
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close AI Guide"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/20 bg-temple-900/60 text-lg text-temple-200/80 transition hover:border-gold-400 hover:text-gold-400"
            >
              ✕
            </button>
          </div>

          {/* Suggested Quick Questions Chips */}
          <div className="py-2.5 overflow-x-auto flex gap-1.5 scrollbar-none border-b border-gold-500/10">
            {SUGGESTED_QUERIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleAsk(q)}
                className="shrink-0 rounded-full border border-gold-500/20 bg-temple-900/60 px-3 py-1 text-[11px] font-heading text-gold-300 transition hover:border-gold-400 hover:bg-gold-500/15"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Transcript Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto space-y-3.5 py-4 pr-1 text-left"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                    m.sender === "user"
                      ? "bg-gold-500/20 text-temple-50 border border-gold-400/40 rounded-br-none"
                      : "bg-temple-900/80 text-temple-100 border border-gold-500/25 rounded-bl-none"
                  }`}
                >
                  {m.title && (
                    <div className="font-heading text-xs font-bold text-gold-300 mb-1 border-b border-gold-500/20 pb-1 flex items-center justify-between">
                      <span>{m.title}</span>
                      {m.wikiUrl && (
                        <a
                          href={m.wikiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-gold-400 hover:underline"
                        >
                          Wiki ↗
                        </a>
                      )}
                    </div>
                  )}

                  <p className="whitespace-pre-line">{m.text}</p>

                  {m.citation && (
                    <div className="mt-2 text-[10px] text-gold-400/80 font-mono border-t border-gold-500/15 pt-1.5">
                      📖 {m.citation}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-gold-400 font-heading">
                <span className="animate-spin text-sm">☸</span>
                <span>Searching Canonical Suttas & Encyclopedia...</span>
              </div>
            )}
          </div>

          {/* Input Box Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="mt-2 flex items-center gap-2 border-t border-gold-500/20 pt-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Buddha, Four Noble Truths, Jhanas, Suttas..."
              className="flex-1 rounded-full border border-gold-500/30 bg-temple-900/80 px-4 py-2.5 text-xs sm:text-sm text-temple-50 placeholder-temple-200/50 outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
            />

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-10 items-center gap-1.5 rounded-full bg-gradient-to-r from-gold-500 to-saffron-500 px-5 font-heading text-xs font-bold uppercase tracking-wider text-temple-950 shadow-md transition hover:from-gold-400 hover:to-saffron-400 disabled:opacity-40 disabled:pointer-events-none active:scale-95 shrink-0"
            >
              <span>Ask</span>
              <span>→</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
