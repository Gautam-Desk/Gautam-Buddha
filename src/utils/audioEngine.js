/**
 * Web Audio API Buddhist Meditative Sound Synthesizer.
 * Tuned for peaceful, soft headphone & earpiece listening with gentle filters and zero harsh transients.
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.ambientGain = null;
    this.ambientOscillators = [];
    this.isAmbientPlaying = false;
    this.isMuted = false;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((l) =>
      l({
        isMuted: this.isMuted,
        isAmbientPlaying: this.isAmbientPlaying,
      })
    );
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    } catch (e) {
      console.warn("AudioContext init error:", e);
    }
  }

  unlockAudio() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted) {
      this.toggleAmbient(false);
    } else {
      this.unlockAudio();
      this.playPeaceBell(320);
    }
    this.notify();
    return this.isMuted;
  }

  toggleMasterSound() {
    return this.setMuted(!this.isMuted);
  }

  /**
   * 1. Soft Tibetan Bronze Singing Bowl (Warm, round fundamental with soft filter for earpieces).
   */
  playSingingBowl(freq = 216, duration = 4.8) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const masterGain = this.ctx.createGain();
      const lowpass = this.ctx.createBiquadFilter();

      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(1400, now);

      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.24, now + 0.15);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      lowpass.connect(this.ctx.destination);
      masterGain.connect(lowpass);

      const partials = [
        { mult: 1.0, gain: 0.55, decay: duration },
        { mult: 2.76, gain: 0.25, decay: duration * 0.8 },
        { mult: 5.4, gain: 0.1, decay: duration * 0.5 },
      ];

      partials.forEach(({ mult, gain, decay }) => {
        const osc = this.ctx.createOscillator();
        const pGain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq * mult + (Math.random() * 0.4 - 0.2), now);

        pGain.gain.setValueAtTime(gain, now);
        pGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(pGain);
        pGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + decay);
      });
    } catch (e) {
      console.warn("Singing bowl audio failed:", e);
    }
  }

  /**
   * 2. Soft Tingsha Cymbal Bell (Silky, gentle bell chime without piercing highs).
   */
  playTingsha(freq = 1680, duration = 2.8) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const masterGain = this.ctx.createGain();
      const lowpass = this.ctx.createBiquadFilter();

      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(2400, now);

      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.14, now + 0.05);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      lowpass.connect(this.ctx.destination);
      masterGain.connect(lowpass);

      const freqs = [freq, freq * 1.003, freq * 2.1];
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(idx === 2 ? 0.04 : 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + duration);
      });
    } catch (e) {
      console.warn("Tingsha audio failed:", e);
    }
  }

  /**
   * 3. Deep Sanctuary Temple Gong (108Hz low warm resonance).
   */
  playDeepGong(duration = 5.5) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const masterGain = this.ctx.createGain();
      const lowpass = this.ctx.createBiquadFilter();

      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(800, now);

      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.28, now + 0.2);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      lowpass.connect(this.ctx.destination);
      masterGain.connect(lowpass);

      const tones = [
        { f: 108, g: 0.6, d: duration },
        { f: 153, g: 0.3, d: duration * 0.8 },
        { f: 216, g: 0.2, d: duration * 0.6 },
      ];

      tones.forEach(({ f, g, d }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(g, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + d);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + d);
      });
    } catch (e) {
      console.warn("Deep gong audio failed:", e);
    }
  }

  /**
   * 4. Soft Wind Chimes Glissando (Serene earphone cascade).
   */
  playWindChimes() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];

      notes.forEach((freq, i) => {
        const delay = i * 0.08 + (Math.random() * 0.02);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const lowpass = this.ctx.createBiquadFilter();

        lowpass.type = "lowpass";
        lowpass.frequency.setValueAtTime(2200, now + delay);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.setValueAtTime(0.08, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 1.8);

        osc.connect(lowpass);
        lowpass.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 1.9);
      });
    } catch (e) {
      console.warn("Wind chimes audio failed:", e);
    }
  }

  /**
   * 5. Crystal Quartz 432Hz Bowl (Pure, luminous peaceful tone).
   */
  playCrystalBowl(freq = 432, duration = 4.5) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, now);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn("Crystal bowl audio failed:", e);
    }
  }

  /**
   * 6. Temple Wooden Fish (Mokugyo) / Woodblock click.
   */
  playWoodBlock(freq = 460) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.07);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq, now);
      filter.Q.setValueAtTime(2.5, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.11);
    } catch (e) {
      console.warn("Woodblock audio failed:", e);
    }
  }

  /**
   * 7. Zen Pond Water Droplet chime.
   */
  playWaterDrop(freq = 840) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.6, now + 0.07);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {
      console.warn("Water drop audio failed:", e);
    }
  }

  /**
   * 8. Soft Earpiece Peace Bell (Warm, gentle headphone tone for navigation).
   */
  playPeaceBell(freq = 360) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.3);
    } catch (e) {
      console.warn("Peace bell audio failed:", e);
    }
  }

  /**
   * 9. Ambient meditative warm harmonic drone soundscape.
   */
  toggleAmbient(enable) {
    try {
      this.init();
      if (!this.ctx) return false;

      if (enable && !this.isAmbientPlaying) {
        if (this.isMuted) {
          this.isMuted = false;
        }

        const now = this.ctx.currentTime;
        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0.001, now);
        this.ambientGain.gain.linearRampToValueAtTime(0.09, now + 3);

        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(280, now);

        this.ambientGain.connect(filter);
        filter.connect(this.ctx.destination);

        // Warm binaural-friendly drone roots: 108Hz, 162Hz, 216Hz, 432Hz
        const freqs = [108, 162, 216, 432];
        this.ambientOscillators = freqs.map((f, i) => {
          const osc = this.ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, now);
          osc.detune.setValueAtTime(i * 1.2 - 1.8, now);
          osc.connect(this.ambientGain);
          osc.start(now);
          return osc;
        });

        this.isAmbientPlaying = true;
        this.notify();
        return true;
      } else if (!enable && this.isAmbientPlaying) {
        if (this.ambientGain) {
          const now = this.ctx.currentTime;
          this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 1.5);
          setTimeout(() => {
            this.ambientOscillators.forEach((o) => {
              try {
                o.stop();
                o.disconnect();
              } catch (_) {}
            });
            this.ambientOscillators = [];
            this.isAmbientPlaying = false;
            this.notify();
          }, 1600);
        }
        return false;
      }
    } catch (e) {
      console.warn("Ambient audio error:", e);
      return false;
    }
    return this.isAmbientPlaying;
  }
}

export const soundEngine = new AudioEngine();
