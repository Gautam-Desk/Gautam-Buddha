/**
 * Canonical Buddhist Philosophy, Four Noble Truths, Eightfold Path, Mudras, and Sacred Pilgrimage Sites.
 */

export const FOUR_NOBLE_TRUTHS = [
  {
    number: "01",
    pali: "Dukkha Sacca",
    title: "The Truth of Suffering",
    translation: "Unsatisfactoriness & Impermanence",
    icon: "☸",
    summary:
      "Physical and mental life inevitably involves pain, sorrow, illness, separation from what is loved, association with what is disliked, and unfulfilled longing.",
    deepInsight:
      "Dukkha is not mere pessimism; it is a realistic diagnostic that all conditioned phenomena are transient (Anicca) and incapable of offering permanent satisfaction.",
    paliQuote: "Jātipi dukkhā, jarāpi dukkhā, maraṇampi dukkhaṁ.",
    quoteTranslation: "Birth is suffering, aging is suffering, death is suffering.",
  },
  {
    number: "02",
    pali: "Samudaya Sacca",
    title: "The Origin of Suffering",
    translation: "Craving & Attachment",
    icon: "🔥",
    summary:
      "Suffering arises directly from craving (Taṇhā) — the craving for sensual pleasure (Kāma-taṇhā), for eternal existence (Bhava-taṇhā), and for non-existence (Vibhava-taṇhā) rooted in delusion (Avijjā).",
    deepInsight:
      "Clinging to that which is fleeting generates friction in consciousness, like grasping a burning ember with bare hands.",
    paliQuote: "Yā’yaṁ taṇhā ponobbhavikā nandirāgasahagatā.",
    quoteTranslation: "It is this craving which leads to renewed existence, accompanied by delight and lust.",
  },
  {
    number: "03",
    pali: "Nirodha Sacca",
    title: "The Cessation of Suffering",
    translation: "Nibbāna — The Unconditioned Peace",
    icon: "🪷",
    summary:
      "Complete release from suffering is attainable through the complete fading away, renunciation, and total eradication of craving.",
    deepInsight:
      "Nibbāna is the cooling of the three fires of greed (Lobha), hatred (Dosa), and delusion (Moha). It is supreme freedom, absolute clarity, and unshakeable peace here and now.",
    paliQuote: "Yo tassāyeva taṇhāya asesavirāganirodho cāgo paṭinissaggo mutti anālayo.",
    quoteTranslation: "The remainderless fading and cessation of that very craving, its relinquishment, release, and freedom.",
  },
  {
    number: "04",
    pali: "Magga Sacca",
    title: "The Path to Cessation",
    translation: "The Noble Eightfold Path",
    icon: "🧭",
    summary:
      "The practical Middle Path that avoids the extremes of sensual indulgence and ascetic self-torment, leading directly to peace, insight, and Enlightenment.",
    deepInsight:
      "Divided into three interconnected trainings: Paññā (Wisdom), Sīla (Ethical Conduct), and Samādhi (Mental Cultivation).",
    paliQuote: "Ayameva ariyo aṭṭhaṅgiko maggo.",
    quoteTranslation: "This is the Noble Eightfold Path: right view, intention, speech, action, livelihood, effort, mindfulness, and concentration.",
  },
];

export const EIGHTFOLD_PATH = [
  {
    id: "right-view",
    step: 1,
    pali: "Sammā Diṭṭhi",
    english: "Right View",
    category: "Wisdom",
    categoryPali: "Paññā",
    description:
      "Understanding the Four Noble Truths, the law of Kamma (cause and effect), and the impermanent, selfless nature of existence.",
    practice: "Cultivating clear awareness that actions carry consequences and observing reality without distortion.",
  },
  {
    id: "right-intention",
    step: 2,
    pali: "Sammā Saṅkappa",
    english: "Right Intention / Resolve",
    category: "Wisdom",
    categoryPali: "Paññā",
    description:
      "Cultivating thoughts of renunciation, goodwill (Mettā), non-harming (Ahiṃsā), and boundless compassion for all beings.",
    practice: "Consciously replacing anger, malice, and greed with kindness and peaceful intentions.",
  },
  {
    id: "right-speech",
    step: 3,
    pali: "Sammā Vācā",
    english: "Right Speech",
    category: "Ethical Conduct",
    categoryPali: "Sīla",
    description:
      "Refraining from false speech, divisive speech, harsh words, and idle chatter. Speaking truth that is gentle, timely, and beneficial.",
    practice: "Asking before speaking: 'Is it true? Is it kind? Is it necessary? Is it the right moment?'",
  },
  {
    id: "right-action",
    step: 4,
    pali: "Sammā Kammanta",
    english: "Right Action",
    category: "Ethical Conduct",
    categoryPali: "Sīla",
    description:
      "Refraining from taking life, taking what is not freely given, and sensual or sexual misconduct.",
    practice: "Protecting life, respecting the property of others, and acting with moral integrity.",
  },
  {
    id: "right-livelihood",
    step: 5,
    pali: "Sammā Ājīva",
    english: "Right Livelihood",
    category: "Ethical Conduct",
    categoryPali: "Sīla",
    description:
      "Earning one's living through honest work that avoids harming others (refraining from dealing in weapons, living beings, meat, intoxicants, and poisons).",
    practice: "Choosing a profession that fosters harmony, fairness, and collective welfare.",
  },
  {
    id: "right-effort",
    step: 6,
    pali: "Sammā Vāyāma",
    english: "Right Effort",
    category: "Mental Cultivation",
    categoryPali: "Samādhi",
    description:
      "The fourfold endeavor: preventing unwholesome states, abandoning existing negative states, cultivating wholesome qualities, and maintaining them.",
    practice: "Exercising gentle, persistent discipline to nurture positive mental habits.",
  },
  {
    id: "right-mindfulness",
    step: 7,
    pali: "Sammā Sati",
    english: "Right Mindfulness",
    category: "Mental Cultivation",
    categoryPali: "Samādhi",
    description:
      "Anchored present-moment awareness through the Four Foundations of Mindfulness: the body (Kāya), feelings (Vedanā), mind (Citta), and mental phenomena (Dhamma).",
    practice: "Observing thoughts, emotions, and bodily sensations without clinging or aversion.",
  },
  {
    id: "right-concentration",
    step: 8,
    pali: "Sammā Samādhi",
    english: "Right Concentration",
    category: "Mental Cultivation",
    categoryPali: "Samādhi",
    description:
      "Developing unified, one-pointed stillness of mind through the meditative absorptions (Jhānas), leading to radiant clarity.",
    practice: "Quiet meditation focusing on breath (Ānāpānasati) to cultivate tranquil stability.",
  },
];

export const THREE_MARKS = [
  {
    pali: "Anicca",
    english: "Impermanence",
    symbol: "🌊",
    meaning:
      "All conditioned things are constantly rising, shifting, and dissolving. Nothing in physical or mental experience remains static.",
    realization: "When we accept flux without resistance, anxiety evaporates.",
  },
  {
    pali: "Dukkha",
    english: "Unsatisfactoriness",
    symbol: "⚖️",
    meaning:
      "Because all things are impermanent, seeking lasting happiness in outer objects or fleeting emotions inevitably produces suffering.",
    realization: "True peace is found only in the unconditioned inner sanctuary.",
  },
  {
    pali: "Anattā",
    english: "Non-Self / Insubstantiality",
    symbol: "🪞",
    meaning:
      "There is no permanent, unchanging 'ego' or 'soul' residing inside phenomena. Existence is a flowing continuum of interrelated conditions.",
    realization: "Releasing ego-clinging unveils universal compassion and freedom.",
  },
];

export const BRAHMA_VIHARAS = [
  {
    pali: "Mettā",
    title: "Loving-Kindness",
    mantra: "May all beings be safe, happy, healthy, and live at ease.",
    description: "Unconditional, universal goodwill extended to friends, strangers, and enemies alike without distinction.",
  },
  {
    pali: "Karuṇā",
    title: "Compassion",
    mantra: "May all who suffer be swiftly freed from their pain.",
    description: "The heart trembling with empathy when witnessing sorrow, actively wishing to alleviate distress.",
  },
  {
    pali: "Muditā",
    title: "Sympathetic Joy",
    mantra: "May your joy and prosperity never diminish.",
    description: "Rejoicing unreservedly in the happiness, virtues, and triumphs of others without envy.",
  },
  {
    pali: "Upekkhā",
    title: "Equanimity",
    mantra: "All beings are owners of their karma, heirs to their deeds.",
    description: "Unshakeable balance of mind that remains serene amidst praise and blame, gain and loss, pleasure and pain.",
  },
];

export const SACRED_MUDRAS = [
  {
    id: "bhumisparsha",
    pali: "Bhūmisparśa Mudrā",
    sanskrit: "Bhūmisparśa Mudrā",
    name: "Earth-Witness Mudra",
    handPosition: "Right Hand Touching Earth",
    gesture: "Right hand touching the earth, left hand in lap palm up",
    meaning: "Calling the earth goddess Sthavara to witness countless lifetimes of selfless virtue, utterly routing the armies of Mara at the dawn of Supreme Enlightenment.",
    canonicalLegend: "When Mara challenged Siddhartha's right to occupy the Diamond Throne, Siddhartha lowered his fingers to touch the soil. The earth trembled and proclaimed: 'I bear witness!'",
    symbolism: "Unshakeable resolve, grounded truth, spiritual victory.",
  },
  {
    id: "abhaya",
    pali: "Abhaya Mudrā",
    sanskrit: "Abhaya Mudrā",
    name: "Gesture of Fearlessness & Protection",
    handPosition: "Right Hand Raised, Palm Outward",
    gesture: "Right hand raised to shoulder level, palm facing outward",
    meaning: "Dispels fear, bestows divine protection, and invites universal peace. Displayed by the Buddha when subduing the raging war elephant Nalagiri.",
    canonicalLegend: "When his envious cousin Devadatta loosed an intoxicated elephant to crush him in Rajgir, the Buddha radiated boundless Loving-Kindness (Mettā). The beast knelt in peace.",
    symbolism: "Courage, reassurance, safety, non-violence (Ahiṃsā).",
  },
  {
    id: "dharmachakra",
    pali: "Dharmacakra Mudrā",
    sanskrit: "Dharmacakra Mudrā",
    name: "Wheel of the Law / First Teaching",
    handPosition: "Both Hands Forming Twin Wheels at Chest",
    gesture: "Both hands held before the chest forming circular wheels with index fingers and thumbs",
    meaning: "Commemorates the Buddha's first discourse at Sarnath Deer Park, setting into eternal motion the wheel of the Four Noble Truths and Eightfold Path.",
    canonicalLegend: "At Isipatana Deer Park, the Buddha rotated the wheel of truth that cannot be turned back by any recluse, priest, deity, or demon in the cosmos.",
    symbolism: "Dissemination of sacred truth, dynamic wisdom, continuous spiritual transmission.",
  },
  {
    id: "dhyana",
    pali: "Dhyāna / Samādhi Mudrā",
    sanskrit: "Dhyāna Mudrā",
    name: "Meditation & Inner Silence",
    handPosition: "Both Hands in Lap, Thumbs Lightly Touching",
    gesture: "Both hands rested in the lap, right hand over left with thumbs lightly touching",
    meaning: "The classic posture of deep meditation, single-pointed concentration, and tranquil absorption adopted under the Bodhi Tree.",
    canonicalLegend: "Adopted by Prince Siddhartha in the shade of the rose-apple tree in his youth and beneath the Bodhi tree to master the four sublime meditative Jhānas.",
    symbolism: "Concentration, inner silence, unified mind, transcendence of sensory distraction.",
  },
  {
    id: "varada",
    pali: "Varada Mudrā",
    sanskrit: "Varada Mudrā",
    name: "Gesture of Boundless Generosity",
    handPosition: "Right Hand Lowered, Palm Facing Out",
    gesture: "Right hand lowered, palm outward and fingers pointed downward",
    meaning: "Symbolizes supreme benevolence, charity, and granting unconditional spiritual liberation and refuge from cyclic suffering.",
    canonicalLegend: "The gesture of giving (Dāna) representing the Buddha offering the jewel of the Dhamma freely to all beings without holding anything back.",
    symbolism: "Boundless giving, mercy, fulfilling wholesome aspirations.",
  },
  {
    id: "vitarka",
    pali: "Vitarka Mudrā",
    sanskrit: "Vitarka Mudrā",
    name: "Gesture of Discourse & Dialectic Insight",
    handPosition: "Thumb & Index Finger Touching in a Circle",
    gesture: "Right hand raised with thumb and index finger touching in a circle of wisdom",
    meaning: "Represents intellectual discussion, explanation of subtle philosophical teachings, and experiential verification of truth.",
    canonicalLegend: "Frequently portrayed in monastic discourse when the Buddha reasoned dialectically with ascetics, scholars, kings, and disciples.",
    symbolism: "Direct transmission of wisdom, spiritual clarity, empirical discernment.",
  },
];

export const SACRED_PILGRIMAGE_SITES = [
  {
    id: "lumbini",
    name: "Lumbini",
    pali: "Lumbinīvana",
    modern: "Rupandehi District",
    country: "Nepal",
    significance: "The Sacred Birthplace of Prince Siddhartha",
    highlight: "Maya Devi Temple, Pushkarini Sacred Pond & Ashokan Inscription Pillar (249 BCE)",
    history:
      "A UNESCO World Heritage sanctuary where Queen Maya Devi gave birth to Siddhartha under the Sal trees. Emperor Ashoka visited in 249 BCE and erected a sandstone pillar proclaiming the site tax-free in reverence.",
    coords: "27.4705° N, 83.2754° E",
    tag: "Primary Site · Nativity",
  },
  {
    id: "bodhgaya",
    name: "Bodh Gaya",
    pali: "Bodhimaṇḍa / Uruvelā",
    modern: "Gaya District, Bihar",
    country: "India",
    significance: "The Holy Seat of Supreme Enlightenment (Bodhi)",
    highlight: "Mahabodhi Pyramidal Temple, The Sacred Bodhi Tree & The Vajrāsana (Diamond Throne)",
    history:
      "The spiritual epicenter of Buddhism. Here beneath the Bodhi tree, Siddhartha defeated Mara's armies, penetrated Dependent Origination, and attained Sammā-Sambodhi on the full moon of Vesak in 528 BCE.",
    coords: "24.6961° N, 84.9913° E",
    tag: "Primary Site · Enlightenment",
  },
  {
    id: "sarnath",
    name: "Sarnath",
    pali: "Isipatana Migadāya",
    modern: "Varanasi, Uttar Pradesh",
    country: "India",
    significance: "The First Discourse & Inception of the Sangha",
    highlight: "Dhamekh Stupa (43.6m), Chaukhandi Stupa & Ashoka Lion Capital (India's National Emblem)",
    history:
      "The deer park where the Buddha delivered the historic Dhammacakkappavattana Sutta to the five ascetics, initiating the Wheel of Dhamma and ordaining the first members of the Noble Sangha.",
    coords: "25.3811° N, 83.0214° E",
    tag: "Primary Site · First Sermon",
  },
  {
    id: "kushinagar",
    name: "Kushinagar",
    pali: "Kusinārā Upavattana",
    modern: "Kushinagar, Uttar Pradesh",
    country: "India",
    significance: "The Great Passing into Mahāparinibbāna",
    highlight: "Parinirvana Stupa, Nirvana Temple & 6.1m Ancient Reclining Sandstone Buddha",
    history:
      "Where the Buddha lay between the twin Sal trees at age 80, spoke his immortal final exhortation ('Strive on with diligence'), and passed into the unconditioned element of Parinibbana.",
    coords: "26.7410° N, 83.8893° E",
    tag: "Primary Site · Parinirvana",
  },
  {
    id: "rajgir",
    name: "Rajgir (Rājagaha)",
    pali: "Rājagaha & Gijjhakūṭa",
    modern: "Nalanda District, Bihar",
    country: "India",
    significance: "Gridhrakuta (Vulture Peak) & Venuvana Bamboo Grove",
    highlight: "Vulture Peak Meditation Rock, Saptaparni Cave & Peace Pagoda (Vishwa Shanti Stupa)",
    history:
      "Ancient capital of the Magadha Kingdom where King Bimbisara welcomed the Buddha. Scene of numerous profound discourses and where the First Buddhist Council convened after the Buddha's passing.",
    coords: "25.0298° N, 85.4217° E",
    tag: "Secondary Site · Ministry",
  },
  {
    id: "shravasti",
    name: "Shravasti (Sāvatthī)",
    pali: "Sāvatthī & Jetavana",
    modern: "Shravasti, Uttar Pradesh",
    country: "India",
    significance: "Jetavana Monastery & Great Teachings",
    highlight: "Anathapindika's Stupa, Gandhakuti (Fragrant Chamber) & Anandabodhi Tree",
    history:
      "The metropolis where the Buddha spent 25 rainy seasons (Vassa), delivering over 800 suttas in the tranquil Jetavana grove donated by the wealthy merchant Anathapindika.",
    coords: "27.5135° N, 82.0295° E",
    tag: "Secondary Site · Discourses",
  },
];
