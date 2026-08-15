https://gautam-desk.github.io/Gautam-Buddha/

# ☸ Gautam Buddha — The Enlightened Path & Sacred Dhamma Sanctuary

> *“Sabbapāpassa akaraṇaṃ, kusalassa upasampadā; Sacittapariyodapanaṃ, etaṃ buddhāna sāsanaṃ.”*  
> *“To refrain from all evil, to cultivate good, to purify one’s mind — this is the teaching of all Buddhas.”* — **Dhammapada 183**

An interactive, high-performance 3D web sanctuary dedicated to the historical life, awakening under the Bodhi Tree, canonical teachings of the Tipiṭaka (Pāli Canon), and timeless mindfulness meditation practice of **Siddhartha Gautama (Shakyamuni Buddha)**.

---

## 🌟 Key Highlights & Features

### 🪷 1. Interactive 3D Sacred Buddha Sanctuary
- **Sculpted Three.js Padmāsana & Halo**: Real-time rotating *Prabhāmaṇḍala* Dharmacakra halo, floating Padmāsana lotus pedestal, and rising spiritual Dhamma embers.
- **Dynamic Multi-Aspect-Ratio Camera**: Calibrated for ultra-wide desktop screens and tall modern smartphone ratios (19.5:9 / 20:9).
- **Interactive Zen Cursor**: Zero-jitter physics-lerping golden light bead with expanding trailing aura ring.
- **Ambient Floating Bodhi Leaves**: Lightweight ambient falling leaves drifting across all chapters with zero CPU/GPU overhead.

### 🧘 2. Manual Precision Mindfulness & Ānāpānasati Studio
- **Millisecond Wall-Clock Precision**: Smooth `MM:SS.ms` session timer computed directly via `performance.now()`.
- **Decimal Breath Countdown HUD**: Real-time decimal countdowns (`4.0s`, `3.9s`...) and linear progression indicators.
- **Manual Start / Pause / Reset Control**: Breathing visualizer stays at calm resting stillness until the user triggers the session.
- **Customizable Yogic Pranayama Patterns**: Box Breathing (*Sama-Vṛtti*), Deep Tranquility (*4-7-8*), Coherent Heart Resonance (*5.5s*), and Gentle Calm.

### 🔔 3. Soft Earphone / Earpiece Audio Synthesizer
- **Headphone-Tuned Acoustics**: Built with the Web Audio API and shaped through custom lowpass biquad filters (`800Hz–2400Hz`) to eliminate harsh high frequencies when wearing earbuds.
- **Synthesized Instruments**:
  - *Tibetan Bronze Singing Bowls* (multi-harmonic resonant wash)
  - *Deep Sanctuary Temple Gongs* (108Hz fundamental)
  - *Silky Tingsha Cymbal Bells* (high crystal twin chime)
  - *Zen Wind Chimes & Water Droplets*
  - *Continuous Ambient Meditative Drone* (toggleable)

### 🗓️ 4. Dual Gregorian Solar & Buddhist Era (B.E.) Timekeeper
- **Live Navbar Time Pill**: Displays current solar time with real-time astronomical moon phase calculations.
- **Interactive Modal Popup**:
  - Shows **Modern Solar Year 2026 CE** beside **Buddhist Era 2570 B.E.**
  - Live pilgrimage temple time for **Bodh Gaya & Lumbini** (IST `UTC+5:30`).
  - **Uposatha Lunar Observance Tracker** (New Moon, Full Moon Pūrṇimā, Crescent phases).
  - Annual Holy Days Calendar (*Vesak, Asalha Puja, Magha Puja, Kathina*).

### 📖 5. Wikipedia-Style Inline Popovers (`WikiPop`)
- Hovering or tapping over canonical terms (*Dukkha, Nibbāna, Anattā, Anicca, Taṇhā, Bodhi, Saṅgha, Kamma, Ānāpānasati, Mettā, Māra, Bhūmisparśa*) opens rich preview cards with Pāli etymology, category, and direct external Wikipedia links.

### ✨ 6. Free Wikipedia API + Canonical Sutta AI Wisdom Guide
- Interactive AI dialog querying live Wikipedia articles and canonical Pali Canon suttas with **zero API keys required**.
- Answers questions regarding the Four Noble Truths, Eightfold Path, parables (*Poisoned Arrow, Raft, Mustard Seed of Kisa Gotami, Angulimala's Transformation*), and mindfulness instructions.

### 🎛️ 7. Customizable Animation Modes
- Direct control over motion intensity via the floating dock:
  - 🪷 **Fluid**: Full 3D aura, drifting Bodhi leaves, and interactive cursor.
  - 🌿 **Subtle**: Slower relaxed breath and reduced particles.
  - ⏸️ **Stillness**: Minimal static mode for deep focus.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) |
| **3D Graphics** | [Three.js](https://threejs.org/) · [React Three Fiber](https://r3f.docs.pmnd.rs/) · [@react-three/drei](https://github.com/pmndrs/drei) |
| **Postprocessing** | [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) (Bloom, Depth of Field, Vignette) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Buddhist Gold/Temple Design System |
| **Animation & Motion** | [Framer Motion](https://www.framer.com/motion/) · [GSAP](https://greensock.com/) · [Lenis Smooth Scroll](https://lenis.darkroom.engineering/) |
| **Audio Synthesis** | Native Web Audio API (Multi-Harmonic Synthesizer) |
| **Live Knowledge API** | Free Public [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/) + Canonical Tipiṭaka Engine |
| **Typography** | Cinzel · Cormorant Garamond · Marcellus · Inter |

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` or `yarn` or `pnpm`

### Installation & Run

```bash
# 1. Clone this repository
git clone https://github.com/<your-username>/gautam-buddha.git

# 2. Navigate to project folder
cd gautam-buddha

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to experience the site.

### Build Production Bundle

```bash
npm run build
```

The optimized static production files will be output to the `dist/` directory.

---

## 🌐 How to Deploy to GitHub Pages

### Option A: Automatic Deployment via GitHub Actions (Recommended)

1. Create a new repository on GitHub (e.g., `gautam-buddha` or `<username>.github.io`).
2. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Gautam Buddha interactive 3D sanctuary"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. Go to your GitHub repository on the web:
   - Navigate to **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` workflow will automatically build and publish your site at:
   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```

### Option B: Deploy to Vercel or Netlify (One-Click)

- **Vercel**: Import the GitHub repository, select Vite preset, and click **Deploy**.
- **Netlify**: Connect repository, set build command to `npm run build`, and publish directory to `dist`.

---

## 📜 Canonical Buddhist Bibliography & Sources

1. **Dīgha Nikāya** (Long Discourses of the Buddha) — *Mahāparinibbāna Sutta (DN 16)*
2. **Majjhima Nikāya** (Middle Length Discourses) — *Ānāpānasati Sutta (MN 118)*, *Satipaṭṭhāna Sutta (MN 10)*, *Ariyapariyesanā Sutta (MN 26)*, *Cūḷamālukya Sutta (MN 63)*, *Aṅgulimāla Sutta (MN 86)*
3. **Saṃyutta Nikāya** (Connected Discourses) — *Dhammacakkappavattana Sutta (SN 56.11)*, *Anattalakkhaṇa Sutta (SN 22.59)*
4. **Aṅguttara Nikāya** (Numerical Discourses) — *Kālāma Sutta (AN 3.65)*
5. **Khuddaka Nikāya** — *Dhammapada (Verses 1, 153-154, 183, 277-279)*, *Sutta Nipāta (Karaṇīya Mettā Sutta)*

---

## 💛 Dedication of Merit

> *“Sabbe sattā sukhi hontu, sabbe hontu ca khemino.”*  
> *“May all living beings be happy, peaceful, and liberated from suffering.”*

Distributed freely for cultural, spiritual, educational, and meditative preservation.
