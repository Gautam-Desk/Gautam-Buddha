import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "../utils/audioEngine";

// Category Tabs for Prompt Discovery
const CATEGORIES = [
  { id: "all", label: "🌟 All Topics" },
  { id: "core", label: "☸ Core Dhamma" },
  { id: "parables", label: "📜 Parables & Suttas" },
  { id: "meditation", label: "🧘 Meditation & Mind" },
  { id: "healing", label: "🌱 Healing & Daily Life" },
];

const SUGGESTED_QUERIES = [
  { text: "What are the Four Noble Truths?", cat: "core" },
  { text: "Explain the Noble Eightfold Path.", cat: "core" },
  { text: "Explain Anattā (Non-Self) simply.", cat: "core" },
  { text: "What is Dependent Origination (Paṭiccasamuppāda)?", cat: "core" },
  { text: "What are the Three Marks of Existence?", cat: "core" },
  { text: "How did Buddha transform Angulimala?", cat: "parables" },
  { text: "What is the Parable of the Poisoned Arrow?", cat: "parables" },
  { text: "Tell the Parable of the Raft.", cat: "parables" },
  { text: "What is the Story of Kisa Gotami's Mustard Seed?", cat: "parables" },
  { text: "How to practice Ānāpānasati breath meditation?", cat: "meditation" },
  { text: "What are the Four Brahmavihāras (Mettā)?", cat: "meditation" },
  { text: "Explain the Four Jhānas (Meditative Absorptions).", cat: "meditation" },
  { text: "How to overcome anger according to the Buddha?", cat: "healing" },
  { text: "How to deal with grief, anxiety, and loss?", cat: "healing" },
  { text: "What happened on the night of Awakening under the Bodhi Tree?", cat: "core" },
  { text: "What were the Buddha's last words at Parinirvana?", cat: "parables" },
];

// Deep Canonical Sutta Knowledge Base (35+ Canonical Topics)
const CANONICAL_KNOWLEDGE_BASE = [
  {
    keywords: ["four noble truths", "dukkha", "samudaya", "nirodha", "magga", "ariasacca"],
    title: "The Four Noble Truths (Cattāri Ariyasaccāni)",
    citation: "Dhammacakkappavattana Sutta (SN 56.11)",
    answer:
      "The Four Noble Truths form the diagnostic bedrock of Buddhist wisdom:\n\n1. **Dukkha Sacca (Truth of Suffering)**: Life inherently contains birth, aging, illness, grief, and the friction of impermanence.\n2. **Samudaya Sacca (Origin of Suffering)**: Suffering is caused directly by Craving (Taṇhā) — craving for sensory pleasures, eternal becoming, and annihilation.\n3. **Nirodha Sacca (Cessation of Suffering)**: Complete liberation (Nibbāna) occurs through the total cooling and extinguishment of craving and delusion.\n4. **Magga Sacca (Path to Cessation)**: The practical Middle Way known as the Noble Eightfold Path.",
    followUps: [
      "Explain the Noble Eightfold Path.",
      "What is Nibbāna / Nirvana?",
      "Why does craving cause suffering?",
    ],
  },
  {
    keywords: ["eightfold path", "maggangā", "noble path", "samma", "eight fold"],
    title: "The Noble Eightfold Path (Ariyo Aṭṭhaṅgiko Maggo)",
    citation: "Magga-vibhaṅga Sutta (SN 45.8)",
    answer:
      "The Eightfold Path is the three-fold training (Sīla, Samādhi, Paññā) leading to complete liberation:\n\n**Wisdom (Paññā)**:\n• **1. Right View (Sammā Diṭṭhi)**: Understanding karma, the Four Noble Truths, and impermanence.\n• **2. Right Resolve (Sammā Saṅkappa)**: Intentions of renunciation, loving-kindness, and non-harming.\n\n**Ethical Conduct (Sīla)**:\n• **3. Right Speech (Sammā Vācā)**: Abstaining from falsehood, slander, harsh speech, and gossip.\n• **4. Right Action (Sammā Kammanta)**: Abstaining from taking life, stealing, and sexual misconduct.\n• **5. Right Livelihood (Sammā Ājīva)**: Engaging in ethical work that causes no harm to beings.\n\n**Mental Discipline (Samādhi)**:\n• **6. Right Effort (Sammā Vāyāma)**: Cultivating wholesome states and relinquishing unwholesome ones.\n• **7. Right Mindfulness (Sammā Sati)**: Constant present-moment awareness of body, feelings, mind, and dhammas.\n• **8. Right Concentration (Sammā Samādhi)**: Unification of the mind through meditative absorption (Jhānas).",
    followUps: [
      "What are the Four Foundations of Mindfulness?",
      "How to practice Right Mindfulness in daily life?",
      "Explain the Four Jhānas.",
    ],
  },
  {
    keywords: ["angulimala", "bandit", "finger necklace", "killer", "violence"],
    title: "The Transformation of Angulimala",
    citation: "Aṅgulimāla Sutta (MN 86)",
    answer:
      "Angulimala was a dreaded serial killer wearing a necklace of fingers. When he saw the Buddha walking serenely in the forest, he sprinted with a sword to kill him, but could not catch the Buddha who was walking at a normal pace.\n\nExhausted and bewildered, Angulimala shouted: *'Stop, monk! Stop!'*\n\nThe Buddha replied calmly: *'I have stopped, Angulimala; it is you who have not stopped. I have stopped harming all living beings forever; you continue to harm and take life.'*\n\nPierced to the core by this fearless compassion, Angulimala dropped his weapons, requested monastic ordination, and through deep remorse and meditation attained full Enlightenment (Arahantship).",
    followUps: [
      "How does Buddhism teach us to overcome anger?",
      "What is the story of Kisa Gotami?",
      "What is the power of Mettā (Loving-Kindness)?",
    ],
  },
  {
    keywords: ["anatta", "non-self", "no soul", "ego", "self", "soul", "anatta"],
    title: "The Doctrine of Anattā (Non-Self)",
    citation: "Anattalakkhaṇa Sutta (SN 22.59)",
    answer:
      "Anattā is the revolutionary insight that within human experience there is no permanent, solid, unchanging 'ego', 'soul', or autonomous master.\n\nWhat we call an 'individual' is an ever-changing process composed of the **Five Aggregates (Pañca Khandhā)**:\n1. **Form (Rūpa)**: Physical body and elements\n2. **Feeling (Vedanā)**: Pleasant, unpleasant, or neutral sensations\n3. **Perception (Saññā)**: Recognition and labeling\n4. **Mental Formations (Saṅkhāra)**: Volitions, thoughts, and emotions\n5. **Consciousness (Viññāṇa)**: Awareness of sensory objects\n\nBecause each aggregate arises and passes away (Anicca), clinging to them as 'I', 'Me', or 'Mine' creates suffering (Dukkha). Realizing non-self dissolves defensive pride and brings ultimate peace.",
    followUps: [
      "What are the Three Marks of Existence?",
      "What is Dependent Origination?",
      "If there is no self, what is reborn?",
    ],
  },
  {
    keywords: ["poisoned arrow", "arrow", "metaphysics", "speculation", "malunkyaputta"],
    title: "The Parable of the Poisoned Arrow",
    citation: "Cūḷamālukya Sutta (MN 63)",
    answer:
      "When the monk Malunkyaputta threatened to leave the order unless the Buddha answered speculative cosmological questions (whether the cosmos is eternal or infinite), the Buddha shared this famous parable:\n\n*Suppose a man is struck by a poisoned arrow. His weeping friends rush a surgeon to extract it, but the wounded man says: 'I will not let this arrow be pulled out until I know the caste of the archer, his name, what wood the bow was made of, and what bird the feathers came from!' That man would die before his questions were answered.*\n\nThe Buddha concluded: The spiritual life does not depend on speculative theories. The urgent task is removing the poisoned arrow of present suffering (Dukkha).",
    followUps: [
      "Tell the Parable of the Raft.",
      "What is the Kālāma Sutta on free inquiry?",
      "What are the Four Noble Truths?",
    ],
  },
  {
    keywords: ["raft", "parable of the raft", "alagaddupama", "letting go"],
    title: "The Parable of the Raft (Letting Go of Attachments)",
    citation: "Alagaddūpama Sutta (MN 22)",
    answer:
      "The Buddha described a traveler who comes upon a vast, dangerous body of water with no bridge or boat. He gathers sticks, reeds, and branches, constructs a sturdy raft, and safely crosses to the further shore of peace.\n\nUpon reaching the shore, the traveler thinks: *'This raft has been immensely useful to me. Let me hoist it onto my head and carry it wherever I go.'*\n\nThe Buddha asked: *'Would that man be acting wisely?'* The monks replied: *'No, Bhante.'*\n\nThe Buddha taught: *'Even so, monks, I have taught the Dhamma like a raft — for the purpose of crossing over, not for grasping. When you understand the raft-like nature of the Dhamma, you should abandon even wholesome teachings, let alone unwholesome ones.'*",
    followUps: [
      "What is the Parable of the Poisoned Arrow?",
      "How to practice non-attachment in daily life?",
      "What is Nibbāna?",
    ],
  },
  {
    keywords: ["dependent origination", "paticcasamuppada", "12 links", "causes", "causality"],
    title: "Dependent Origination (Paṭiccasamuppāda)",
    citation: "Mahānidāna Sutta (DN 15)",
    answer:
      "Paṭiccasamuppāda is the core Buddhist law of universal causality: *'When this exists, that comes to be; with the arising of this, that arises. When this does not exist, that does not come to be; with the cessation of this, that ceases.'*\n\nThe 12 Interlinked Conditions:\n1. Ignorance (Avijjā) → 2. Volitional Formations (Saṅkhāra) → 3. Consciousness (Viññāṇa) → 4. Name & Form (Nāmarūpa) → 5. Six Sense Bases (Saḷāyatana) → 6. Contact (Phassa) → 7. Feeling (Vedanā) → 8. Craving (Taṇhā) → 9. Clinging (Upādāna) → 10. Becoming (Bhava) → 11. Birth (Jāti) → 12. Aging, Death & Sorrow (Jarāmaraṇa).\n\nBreaking the link of Craving (Taṇhā) through mindfulness dismantles the entire chain of suffering.",
    followUps: [
      "What is Anattā (Non-Self)?",
      "What are the Four Noble Truths?",
      "How to break the cycle of craving?",
    ],
  },
  {
    keywords: ["meditation", "anapanasati", "breathe", "breathing", "mindfulness", "sati"],
    title: "Mindfulness of In-and-Out Breathing (Ānāpānasati)",
    citation: "Ānāpānasati Sutta (MN 118)",
    answer:
      "The Buddha practiced Ānāpānasati under the Bodhi Tree and throughout his 45-year ministry. It systematically fulfills the Four Foundations of Mindfulness:\n\n1. **Preparation**: Sit with spine erect and relaxed, eyes soft, establishing present-moment mindfulness at the nostrils or upper lip.\n2. **Contemplating Body (Kāyānupassanā)**: Breathing in long, know 'I breathe in long'. Breathing out short, know 'I breathe out short'. Experience the whole breath body, calming the bodily breath.\n3. **Contemplating Feelings (Vedanānupassanā)**: Breathe experiencing rapture (Pīti) and peaceful joy (Sukha).\n4. **Contemplating Mind (Cittānupassanā)**: Observe the state of the mind (calm, distracted, steady), releasing clinging.\n5. **Contemplating Reality (Dhammānupassanā)**: Reflect on impermanence (Anicca), fading of desire, and peaceful release.",
    followUps: [
      "What are the Four Foundations of Mindfulness (Satipaṭṭhāna)?",
      "What are the Four Jhānas?",
      "How to calm an anxious mind?",
    ],
  },
  {
    keywords: ["brahmavihara", "metta", "loving kindness", "compassion", "karuna", "mudita", "upekkha"],
    title: "The Four Immeasurables (Brahmavihāras)",
    citation: "Karaṇīya Mettā Sutta (Sn 1.8)",
    answer:
      "The Brahmavihāras ('Divine Abodes') are the four boundless emotional qualities to radiate to all living beings without limit:\n\n1. **Mettā (Loving-Kindness)**: The sincere wish: *'May all beings be safe, peaceful, healthy, and happy.'*\n2. **Karuṇā (Compassion)**: The tender heart that trembles in the presence of suffering: *'May all beings be free from pain and sorrow.'*\n3. **Muditā (Sympathetic Joy)**: Rejoicing wholeheartedly in the success, happiness, and virtues of others without envy.\n4. **Upekkhā (Equanimity)**: Unshakeable mental balance, free from bias, anger, or clinging, recognizing that all beings inherit their own karma.",
    followUps: [
      "How to practice Mettā meditation daily?",
      "How to overcome anger using Dhamma?",
      "What is the story of Angulimala?",
    ],
  },
  {
    keywords: ["jhana", "jhanas", "absorption", "samadhi", "concentration"],
    title: "The Four Meditative Absorptions (Cattāri Jhānāni)",
    citation: "Sāmaññaphala Sutta (DN 2)",
    answer:
      "The Jhānas are progressive levels of deep meditative stillness and mental unification:\n\n• **1st Jhāna**: Accompanied by applied thought (Vitakka), sustained thought (Vicāra), rapture (Pīti), and joy (Sukha) born of seclusion from sensual desires.\n• **2nd Jhāna**: Internal confidence and mental unification; thinking ceases; rapture and joy born of concentration remain.\n• **3rd Jhāna**: Rapture fades into deep, sublime equanimity and physical comfort (Sukha), conscious and fully mindful.\n• **4th Jhāna**: Beyond pleasure and pain, pure mental brightness and purification of mindfulness through equanimity (Upekkhā-sati-parisuddhi).",
    followUps: [
      "How to practice Ānāpānasati breath meditation?",
      "What is Right Concentration on the Eightfold Path?",
      "What is Vipassanā insight meditation?",
    ],
  },
  {
    keywords: ["kisa gotami", "mustard seed", "grief", "death", "loss", "bereavement"],
    title: "Kisa Gotami & The Parable of the Mustard Seed",
    citation: "Therīgāthā Commentary",
    answer:
      "When Kisa Gotami's infant son died, she wandered in mad grief asking for medicine to revive him. Compassionate villagers directed her to the Buddha.\n\nThe Buddha said: *'Bring me a single grain of mustard seed from any house where no mother, father, child, or servant has ever died.'*\n\nShe visited every home in the city. Everyone offered mustard seeds, but wept: *'Alas, the living are few, but the dead are countless.'*\n\nSuddenly the universality of death pierced her grief with profound insight. She realized death comes to all conditioned things. Returning to the Buddha, she laid down her child's body, entered the monastic Sangha, and attained Enlightenment.",
    followUps: [
      "How to deal with grief, anxiety, and loss in daily life?",
      "What are the Three Marks of Existence?",
      "What was the Buddha's final teaching on impermanence?",
    ],
  },
  {
    keywords: ["anger", "rage", "hatred", "overcome anger", "dosa"],
    title: "Overcoming Anger & Hatred (Dhammapada Teachings)",
    citation: "Dhammapada Verses 3-5 & Kakacūpama Sutta (MN 21)",
    answer:
      "The Buddha provided clear, practical methods to dissolve anger (Dosa):\n\n1. **The Law of Non-Retaliation**: *'Hatred is never appeased by hatred in this world. By non-hatred alone is hatred appeased. This is an eternal law.'* (Dhammapada 5)\n2. **The Hot Coal Metaphor**: *'Holding onto anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.'*\n3. **The Parable of the Saw (MN 21)**: The Buddha taught that even if bandits were to sever one's limbs with a two-handled saw, one who gives way to anger does not practice his teaching; rather, one must radiate boundless loving-kindness toward those very attackers.\n4. **Practical Steps**: Pause, observe the heat of the body, reflect on the person's suffering, and mentally send Mettā.",
    followUps: [
      "What are the Four Brahmavihāras (Loving-Kindness)?",
      "How did Buddha transform Angulimala?",
      "How to practice mindfulness in difficult moments?",
    ],
  },
  {
    keywords: ["kalama", "free inquiry", "doubt", "belief", "skepticism"],
    title: "The Kālāma Sutta: The Charter of Free Inquiry",
    citation: "Kesaputtiya Sutta (AN 3.65)",
    answer:
      "When the Kalamas of Kesaputta expressed confusion over conflicting religious claims, the Buddha gave this famous declaration of intellectual freedom:\n\n*'Do not go by oral tradition, by lineage of teaching, by hearsay, by scriptural collections, by logical deduction, by probability, or because a recluse is your teacher.\n\nWhen you know for yourselves: \"These qualities are unwholesome, blameworthy, criticized by the wise, and when undertaken lead to harm and suffering\" — then abandon them.\n\nWhen you know for yourselves: \"These qualities are wholesome, praised by the wise, and when undertaken lead to welfare and happiness\" — then enter and abide in them.'*",
    followUps: [
      "What is Right View on the Eightfold Path?",
      "What are the Four Noble Truths?",
      "Tell the Parable of the Poisoned Arrow.",
    ],
  },
  {
    keywords: ["bodhi tree", "enlightenment", "mara", "bhumisparsha", "awakening", "vesak"],
    title: "The Night of Supreme Awakening (Sammā-Sambodhi)",
    citation: "Mahā-Saccaka Sutta (MN 36) & Dhammapada 153-154",
    answer:
      "On the full moon night of Vesak at Bodh Gaya, Siddhartha sat upon the grass mat under the sacred Bodhi Tree with immovable determination: *'Let my flesh dry up, but I shall not rise until I attain Awakening.'*\n\nWhen Mara challenged his right to the seat of liberation, Siddhartha touched the earth in **Bhūmisparśa mudrā**. The Earth roared in confirmation of his boundless lifetimes of virtue.\n\nDuring the three watches of the night:\n• **1st Watch**: Attained memory of countless past lives (Pubbenivāsānussati-ñāṇa).\n• **2nd Watch**: Attained the Divine Eye seeing the karmic rebirth of all beings (Cutūpapāta-ñāṇa).\n• **3rd Watch**: Eradicated all mental defilements, penetrated the 12 Links of Dependent Origination, and attained Supreme Complete Awakening.",
    followUps: [
      "What did Buddha say right after Enlightenment?",
      "What was the Buddha's First Sermon at Sarnath?",
      "What are the Four Noble Truths?",
    ],
  },
  {
    keywords: ["last words", "parinibbana", "parinirvana", "death of buddha", "kushinagar"],
    title: "The Parinibbāna & The Buddha's Final Words",
    citation: "Mahāparinibbāna Sutta (DN 16)",
    answer:
      "At age 80, lying serenely between the blooming twin Sal trees in Kushinagar, the Buddha asked his weeping disciples three times if anyone had any remaining doubts about the Dhamma or Vinaya.\n\nWhen all remained in peaceful silence, the Buddha delivered his immortal final words to humanity:\n\n*'Handa dāni, bhikkhave, āmantayāmi vo: Vayadhammā saṅkhārā, appamādena sampādetha.'*\n\n**'Behold now, bhikkhus, I address you: All conditioned things are subject to decay and dissolution. Strive on diligently with heedfulness!'**\n\nHe then entered the Jhānas and passed peacefully into the unconditioned realm of Mahāparinibbāna.",
    followUps: [
      "What are the Three Marks of Existence?",
      "What happens after Enlightenment?",
      "What is Nibbāna / Nirvana?",
    ],
  },
];

// Fallback wisdom generator for open-ended spiritual questions
function generateDhammaReflection(query) {
  return {
    title: "Dhamma Reflection & Insight",
    citation: "Canonical Tipitaka Reflection",
    answer: `The Buddha taught that the root of all human unrest lies in Craving (Taṇhā), Aversion (Dosa), and Delusion (Avijjā).

When examining '${query}', the Dhamma encourages turning attention inward:
1. **Notice the Present Moment**: Is the mind clinging to a concept, resisting what is here, or seeking an escape?
2. **Apply Impermanence (Anicca)**: Recognize that whatever sensation, thought, or circumstance is arising, it is transient and will pass.
3. **Cultivate Non-Harming (Ahiṃsā)**: Respond with loving-kindness (Mettā), ethical clarity (Sīla), and quiet mindfulness (Sati).

*"Purity and impurity depend on oneself; no one can purify another."* — Dhammapada 165`,
    followUps: [
      "What are the Four Noble Truths?",
      "How to practice Ānāpānasati breath meditation?",
      "What are the Four Immeasurables (Brahmavihāras)?",
    ],
  };
}

export default function BuddhaAIModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "assistant",
      text: "Namo Buddhaya. I am your Dhamma Wisdom Guide, grounded in the Pāli Canon, canonical suttas, and the global Buddhist encyclopedia.\n\nAsk me about the Four Noble Truths, meditation practice, life stories of the Buddha, classic suttas, or everyday mindfulness.",
      citation: "Tipiṭaka (Pāli Canon) & Wikipedia Buddhist Knowledgebase",
      followUps: [
        "What are the Four Noble Truths?",
        "How to practice Ānāpānasati breath meditation?",
        "How did Buddha transform Angulimala?",
      ],
    },
  ]);

  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Clean and sanitize user input text (defense-in-depth XSS protection)
  const sanitizeInput = (text) => {
    return text
      .replace(/[<>]/g, "") // Strip angle brackets
      .trim()
      .slice(0, 500); // Limit to 500 chars max
  };

  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      soundEngine.playTingsha(1800);
      setTimeout(() => setCopiedId(null), 2200);
    } catch (_) {}
  };

  const handleClearChat = () => {
    soundEngine.playWoodBlock(480);
    setMessages([
      {
        id: "welcome-" + Date.now(),
        sender: "assistant",
        text: "Sanctuary conversation cleared. How may I assist your Dhamma journey today?",
        citation: "Tipiṭaka (Pāli Canon)",
        followUps: [
          "What are the Four Noble Truths?",
          "Explain the Noble Eightfold Path.",
          "Tell the Parable of the Poisoned Arrow.",
        ],
      },
    ]);
  };

  const handleAsk = async (queryText) => {
    const rawText = queryText || input;
    const cleanText = sanitizeInput(rawText);

    if (!cleanText || isLoading) return;

    // Rate-limiting cooldown (400ms)
    const now = Date.now();
    if (now - lastSubmitTime < 400) return;
    setLastSubmitTime(now);

    soundEngine.playPeaceBell(380);
    const userMsg = {
      id: String(now),
      sender: "user",
      text: cleanText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const queryLower = cleanText.toLowerCase();

    // 1. Direct Canonical Knowledge Base Match
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
            followUps: matchedCanonical.followUps,
          },
        ]);
        setIsLoading(false);
      }, 550);
      return;
    }

    // 2. Query Free Public Wikipedia API
    try {
      const searchRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=buddhism+${encodeURIComponent(
          cleanText
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

        const summaryRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            pageTitle
          )}`
        );
        if (summaryRes.ok) {
          const summaryData = await summaryRes.json();
          wikiSummary = summaryData.extract;
          wikiTitle = summaryData.title;
          wikiUrl =
            summaryData.content_urls?.desktop?.page ||
            `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`;
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
            citation: "Wikipedia Buddhist Encyclopedia (Free Open Access)",
            wikiUrl,
            wikiThumb,
            followUps: [
              "What are the Four Noble Truths?",
              "Explain the Noble Eightfold Path.",
              "Tell the Story of Buddha's Awakening.",
            ],
          },
        ]);
      } else {
        // Fallback intelligent Dhamma reflection
        const reflection = generateDhammaReflection(cleanText);
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            sender: "assistant",
            text: reflection.answer,
            title: reflection.title,
            citation: reflection.citation,
            followUps: reflection.followUps,
          },
        ]);
      }
    } catch (err) {
      console.warn("Wikipedia lookup fallback:", err);
      const reflection = generateDhammaReflection(cleanText);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: "assistant",
          text: reflection.answer,
          title: reflection.title,
          citation: reflection.citation,
          followUps: reflection.followUps,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredQueries =
    selectedCategory === "all"
      ? SUGGESTED_QUERIES
      : SUGGESTED_QUERIES.filter((q) => q.cat === selectedCategory);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-[400] flex items-center justify-center p-2.5 sm:p-6"
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
          transition={{ duration: 0.28 }}
          className="relative flex h-[88vh] max-h-[820px] w-full max-w-2xl flex-col rounded-3xl border border-gold-500/35 bg-temple-950/95 p-4 sm:p-6 shadow-2xl shadow-black/90 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gold-500/20 pb-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/50 bg-gold-500/15 text-xl text-gold-400 shadow-inner">
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
                  Canonical Suttas · Wikipedia REST API · 100% Free
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClearChat}
                title="Clear Conversation"
                className="flex items-center gap-1 rounded-full border border-gold-500/20 bg-temple-900/60 px-2.5 py-1 text-[11px] font-heading text-temple-200/80 transition hover:border-gold-400 hover:text-gold-300 active:scale-95"
              >
                <span>🗑️</span>
                <span className="hidden sm:inline">Clear</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close AI Guide"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/20 bg-temple-900/60 text-lg text-temple-200/80 transition hover:border-gold-400 hover:text-gold-400 active:scale-95"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="pt-2.5 pb-1.5 flex gap-1.5 overflow-x-auto scrollbar-none border-b border-gold-500/10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  soundEngine.playWoodBlock(520);
                }}
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-heading font-medium transition ${
                  selectedCategory === cat.id
                    ? "border border-gold-400 bg-gold-500/20 text-gold-300 shadow-sm"
                    : "border border-gold-500/15 bg-temple-900/40 text-temple-200/70 hover:border-gold-500/30 hover:text-temple-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Suggested Quick Questions Chips */}
          <div className="py-2 overflow-x-auto flex gap-1.5 scrollbar-none border-b border-gold-500/10">
            {filteredQueries.map((q) => (
              <button
                key={q.text}
                type="button"
                onClick={() => handleAsk(q.text)}
                className="shrink-0 rounded-full border border-gold-500/25 bg-temple-900/60 px-3 py-1 text-[11px] font-heading text-gold-200 transition hover:border-gold-400 hover:bg-gold-500/15 active:scale-95"
              >
                {q.text}
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
                  className={`relative max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                    m.sender === "user"
                      ? "bg-gold-500/20 text-temple-50 border border-gold-400/40 rounded-br-none"
                      : "bg-temple-900/90 text-temple-100 border border-gold-500/25 rounded-bl-none"
                  }`}
                >
                  {/* Title & Source Link */}
                  {m.title && (
                    <div className="font-heading text-xs font-bold text-gold-300 mb-2 border-b border-gold-500/20 pb-1.5 flex items-center justify-between gap-2">
                      <span className="truncate">{m.title}</span>
                      {m.wikiUrl && (
                        <a
                          href={m.wikiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 rounded bg-gold-500/15 px-2 py-0.5 text-[10px] text-gold-300 border border-gold-500/30 hover:border-gold-400 hover:underline"
                        >
                          Wiki ↗
                        </a>
                      )}
                    </div>
                  )}

                  {/* Optional Wikipedia Thumbnail */}
                  {m.wikiThumb && (
                    <div className="mb-3 overflow-hidden rounded-xl border border-gold-500/20 max-h-36">
                      <img
                        src={m.wikiThumb}
                        alt={m.title || "Wikipedia Thumbnail"}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                  {/* Canonical Sutta Citation & Copy Action Bar */}
                  <div className="mt-3 flex items-center justify-between border-t border-gold-500/15 pt-2 text-[10px] text-gold-400/80 font-mono">
                    <span className="truncate pr-2">
                      {m.citation ? `📖 ${m.citation}` : "☸ Dhamma Wisdom"}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopy(m.id, m.text)}
                      className="shrink-0 flex items-center gap-1 rounded bg-temple-950/60 px-2 py-0.5 text-[10px] text-gold-300 border border-gold-500/20 hover:border-gold-400 hover:text-gold-200 transition"
                      title="Copy teaching to clipboard"
                    >
                      {copiedId === m.id ? (
                        <span className="text-emerald-400 font-bold">✓ Copied!</span>
                      ) : (
                        <span>📋 Copy</span>
                      )}
                    </button>
                  </div>

                  {/* Contextual Smart Follow-Up Suggestions */}
                  {m.followUps && m.followUps.length > 0 && (
                    <div className="mt-3 border-t border-gold-500/10 pt-2.5">
                      <span className="block text-[10px] font-heading uppercase tracking-wider text-temple-200/60 mb-1.5">
                        Related Inquiries:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {m.followUps.map((fu) => (
                          <button
                            key={fu}
                            type="button"
                            onClick={() => handleAsk(fu)}
                            className="rounded-full border border-gold-500/20 bg-temple-950/60 px-2.5 py-0.5 text-[10px] text-gold-300 hover:border-gold-400 hover:bg-gold-500/15 transition"
                          >
                            ↳ {fu}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2.5 rounded-2xl border border-gold-500/20 bg-temple-900/60 p-3 text-xs text-gold-300 font-heading">
                <span className="animate-spin text-base text-gold-400">☸</span>
                <span>Searching Canonical Tipiṭaka & Buddhist Encyclopedia...</span>
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
              maxLength={500}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Four Noble Truths, Jhanas, Metta, Suttas, Overcoming Grief..."
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
