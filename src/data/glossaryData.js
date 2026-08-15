/**
 * Comprehensive authentic glossary of Pali & Sanskrit Buddhist terminology.
 */

export const GLOSSARY_CATEGORIES = [
  { id: "all", label: "All Terms" },
  { id: "liberation", label: "Liberation & Truth" },
  { id: "ontology", label: "Ontology & Existence" },
  { id: "meditation", label: "Meditation & Mind" },
  { id: "ethics", label: "Virtue & Practice" },
];

export const GLOSSARY_TERMS = [
  {
    term: "Nibbāna (Nirvana)",
    pali: "Nibbāna",
    sanskrit: "Nirvāṇa",
    phonetic: "nee-BAH-nuh",
    category: "liberation",
    literal: "Extinguishing / Unbinding",
    definition:
      "The ultimate spiritual goal of Buddhism: the complete extinguishing of the fires of greed (Lobha), hatred (Dosa), and delusion (Moha), releasing consciousness from cyclic rebirth (Samsara).",
  },
  {
    term: "Dhamma (Dharma)",
    pali: "Dhamma",
    sanskrit: "Dharma",
    phonetic: "DUM-muh",
    category: "liberation",
    literal: "That which upholds / Cosmic Law & Truth",
    definition:
      "The universal truth of existence as discovered and taught by the Buddha; the moral laws, path of practice, and phenomena as they truly are.",
  },
  {
    term: "Saṅgha (Sangha)",
    pali: "Saṅgha",
    sanskrit: "Saṅgha",
    phonetic: "SUNG-guh",
    category: "ethics",
    literal: "Community / Assembly",
    definition:
      "The spiritual community of ordained monastics (Bhikkhus and Bhikkhunis) and noble disciples (Ariya-sangha) who preserve and practice the Dhamma.",
  },
  {
    term: "Anattā (Anatman)",
    pali: "Anattā",
    sanskrit: "Anātman",
    phonetic: "uh-NAHT-tah",
    category: "ontology",
    literal: "Non-Self / Insubstantiality",
    definition:
      "The core insight that all physical and mental phenomena lack an independent, unchanging, permanent 'self' or 'soul'.",
  },
  {
    term: "Anicca (Anitya)",
    pali: "Anicca",
    sanskrit: "Anitya",
    phonetic: "uh-NEET-chuh",
    category: "ontology",
    literal: "Impermanence / Inconstancy",
    definition:
      "The universal characteristic of existence stating that all conditioned things, thoughts, and states are in continuous flux, arising and vanishing.",
  },
  {
    term: "Dukkha",
    pali: "Dukkha",
    sanskrit: "Duḥkha",
    phonetic: "DOOK-kuh",
    category: "ontology",
    literal: "Unsatisfactoriness / Stress / Suffering",
    definition:
      "The intrinsic friction and inability of conditioned phenomena to provide ultimate, permanent fulfillment.",
  },
  {
    term: "Paṭiccasamuppāda",
    pali: "Paṭiccasamuppāda",
    sanskrit: "Pratītyasamutpāda",
    phonetic: "puh-TEE-chuh-suh-MOOP-pah-duh",
    category: "ontology",
    literal: "Dependent Origination",
    definition:
      "The twelve-linked chain of causality explaining how all physical and mental phenomena arise in mutual dependence upon conditions, without a first creator.",
  },
  {
    term: "Vipassanā",
    pali: "Vipassanā",
    sanskrit: "Vipaśyanā",
    phonetic: "vee-PUS-suh-nah",
    category: "meditation",
    literal: "Insight / Seeing Things As They Are",
    definition:
      "Contemplative meditation observing body, feelings, and mind with continuous non-reactive awareness to perceive the three marks of existence directly.",
  },
  {
    term: "Samatha",
    pali: "Samatha",
    sanskrit: "Śamatha",
    phonetic: "SUM-uh-tuh",
    category: "meditation",
    literal: "Calm / Tranquility",
    definition:
      "The practice of single-pointed concentration (such as mindfulness of breathing) to tranquilize mental chatter and cultivate meditative absorption (Jhāna).",
  },
  {
    term: "Ānāpānasati",
    pali: "Ānāpānasati",
    sanskrit: "Ānāpānasmṛti",
    phonetic: "ah-nah-PAH-nuh-suh-tee",
    category: "meditation",
    literal: "Mindfulness of Breathing",
    definition:
      "The fundamental practice taught by the Buddha in the Majjhima Nikaya using the natural breath as an anchor for both tranquil concentration and liberating insight.",
  },
  {
    term: "Kamma (Karma)",
    pali: "Kamma",
    sanskrit: "Karma",
    phonetic: "KUM-muh",
    category: "ethics",
    literal: "Volitional Action",
    definition:
      "The moral law of cause and effect: intentional actions of thought, word, and deed create psychological impressions that ripen into corresponding results.",
  },
  {
    term: "Taṇhā",
    pali: "Taṇhā",
    sanskrit: "Tṛṣṇā",
    phonetic: "TUN-hah",
    category: "ontology",
    literal: "Thirst / Craving",
    definition:
      "The unquenchable drive for sensual pleasure, perpetual being, or non-being that binds consciousness to the cycle of Dukkha.",
  },
  {
    term: "Mettā",
    pali: "Mettā",
    sanskrit: "Maitrī",
    phonetic: "MET-tah",
    category: "ethics",
    literal: "Loving-Kindness / Goodwill",
    definition:
      "The boundless, unconditioned wish for the safety, happiness, and peace of all living beings without exception.",
  },
  {
    term: "Karuṇā",
    pali: "Karuṇā",
    sanskrit: "Karuṇā",
    phonetic: "kuh-ROO-nah",
    category: "ethics",
    literal: "Compassion",
    definition:
      "The heart trembling with empathy when witnessing suffering, paired with the active desire to ease distress.",
  },
  {
    term: "Upekkhā",
    pali: "Upekkhā",
    sanskrit: "Upekṣā",
    phonetic: "oo-PAYK-khah",
    category: "ethics",
    literal: "Equanimity / Non-Reactivity",
    definition:
      "Unshakeable balance of mind that observes worldly fluctuations (gain and loss, praise and blame) with radiant composure.",
  },
  {
    term: "Bodhi",
    pali: "Bodhi",
    sanskrit: "Bodhi",
    phonetic: "BOH-dee",
    category: "liberation",
    literal: "Awakening / Supreme Illumination",
    definition:
      "Direct realization of the Four Noble Truths and complete eradication of ignorance and mental defilements.",
  },
  {
    term: "Tathāgata",
    pali: "Tathāgata",
    sanskrit: "Tathāgata",
    phonetic: "tuh-TAH-guh-tuh",
    category: "liberation",
    literal: "The One Who Has Thus Come / Gone",
    definition:
      "The title the Buddha used when referring to himself, designating one who has fully penetrated the true nature of reality beyond all conceptual dualities.",
  },
  {
    term: "Saṃsāra",
    pali: "Saṃsāra",
    sanskrit: "Saṃsāra",
    phonetic: "sum-SAH-ruh",
    category: "ontology",
    literal: "Continuous Wandering / Cyclic Existence",
    definition:
      "The beginningless cycle of birth, aging, death, and rebirth driven by ignorance (Avijjā) and craving (Taṇhā).",
  },
  {
    term: "Sīla",
    pali: "Sīla",
    sanskrit: "Śīla",
    phonetic: "SEE-luh",
    category: "ethics",
    literal: "Moral Virtue / Ethical Conduct",
    definition:
      "The ethical discipline of non-harming (Ahimsa), right speech, right action, and right livelihood that forms the indispensable foundation for mental concentration.",
  },
  {
    term: "Jhāna (Dhyana)",
    pali: "Jhāna",
    sanskrit: "Dhyāna",
    phonetic: "JAH-nuh",
    category: "meditation",
    literal: "Meditative Absorption",
    definition:
      "Profound, luminous states of unified concentration where the five mental hindrances (sensual desire, ill-will, sloth, restlessness, and doubt) are temporarily suspended.",
  },
];
