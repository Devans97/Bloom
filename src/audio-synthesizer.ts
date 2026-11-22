/**
 * BLOOM - Web Audio API Ambient Sound & Binaural Beat Synthesizer
 * 100% Offline, Zero External Asset Dependencies
 * Procedurally generates calming focus soundscapes natively in the browser:
 * - Brown Noise (deep low-frequency focus rumble)
 * - Pink Noise (balanced 1/f sound mask)
 * - Soft Rain Ambience (low-pass filtered randomized raindrops)
 * - Binaural Alpha Beats (10 Hz difference for calm concentration)
 * - Binaural Gamma Beats (40 Hz difference for high-alert problem solving)
 */

export type SoundscapeType = 'none' | 'brown-noise' | 'pink-noise' | 'soft-rain' | 'alpha-binaural' | 'gamma-binaural';

export interface SoundscapeState {
  currentType: SoundscapeType;
  isPlaying: boolean;
  volume: number; // 0.0 to 1.0
}

class BloomAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeSourceNodes: (AudioNode | number)[] = [];
  private currentType: SoundscapeType = 'none';
  private volume: number = 0.4;

  /** Initialize or resume Web Audio context on user gesture */
  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /** Stop all currently running audio generators smoothly */
  public stop(): void {
    if (this.masterGain && this.ctx) {
      // Gentle fade out over 120ms to prevent audio popping
      this.masterGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.04);
    }
    setTimeout(() => {
      for (const node of this.activeSourceNodes) {
        if (typeof node === 'number') {
          clearInterval(node);
        } else if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          try {
            (node as AudioScheduledSourceNode).stop();
          } catch {
            // Already stopped
          }
        } else if ('disconnect' in node) {
          try {
            node.disconnect();
          } catch {
            // Already disconnected
          }
        }
      }
      this.activeSourceNodes = [];
      this.currentType = 'none';
    }, 150);
  }

  /** Set master volume level (0.0 to 1.0) */
  public setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  /** Generate procedural Brown Noise (Integration of white noise) */
  public playBrownNoise(): void {
    this.stop();
    const ctx = this.ensureContext();
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise integration formula: out = (last + (0.02 * white)) / 1.02
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5; // Compensate for attenuation
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Low-pass filter to remove harsh hiss and retain deep rumble
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(380, ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(this.masterGain!);

    noiseSource.start();
    this.activeSourceNodes.push(noiseSource, filter);
    this.currentType = 'brown-noise';
    this.masterGain!.gain.setTargetAtTime(this.volume, ctx.currentTime, 0.08);
  }

  /** Generate procedural Pink Noise (Paul Kellet's filter method) */
  public playPinkNoise(): void {
    this.stop();
    const ctx = this.ensureContext();
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    source.connect(filter);
    filter.connect(this.masterGain!);

    source.start();
    this.activeSourceNodes.push(source, filter);
    this.currentType = 'pink-noise';
    this.masterGain!.gain.setTargetAtTime(this.volume, ctx.currentTime, 0.08);
  }

  /** Generate gentle Rain Ambience (band-pass filtered noise with LFO volume swell) */
  public playSoftRain(): void {
    this.stop();
    const ctx = this.ensureContext();
    const bufferSize = ctx.sampleRate * 5;
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);

    for (let i = 0; i < bufferSize; i++) {
      left[i] = (Math.random() * 2 - 1) * 0.4;
      right[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const rainSource = ctx.createBufferSource();
    rainSource.buffer = buffer;
    rainSource.loop = true;

    // Filter simulating rain striking window pane
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.Q.setValueAtTime(0.8, ctx.currentTime);

    // Subtle LFO creating wind gusts / varying rain intensity
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.2, ctx.currentTime); // 5-second cycle
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.15, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.85, ctx.currentTime);

    lfo.connect(rainGain.gain);
    rainSource.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain!);

    rainSource.start();
    lfo.start();

    this.activeSourceNodes.push(rainSource, filter, lfo, rainGain);
    this.currentType = 'soft-rain';
    this.masterGain!.gain.setTargetAtTime(this.volume, ctx.currentTime, 0.08);
  }

  /**
   * Generate Binaural Beats
   * @param carrierFreq Base tone in Hz (e.g. 216 Hz)
   * @param beatDelta Difference in Hz (e.g. 10 Hz for Alpha, 40 Hz for Gamma)
   */
  public playBinaural(carrierFreq: number, beatDelta: number, typeName: SoundscapeType): void {
    this.stop();
    const ctx = this.ensureContext();

    const leftFreq = carrierFreq;
    const rightFreq = carrierFreq + beatDelta;

    const oscLeft = ctx.createOscillator();
    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(leftFreq, ctx.currentTime);

    const oscRight = ctx.createOscillator();
    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(rightFreq, ctx.currentTime);

    // Stereo panning to separate ears
    const merger = ctx.createChannelMerger(2);

    oscLeft.connect(merger, 0, 0); // Left channel
    oscRight.connect(merger, 0, 1); // Right channel

    // Gentle low-pass warm filter
    const warmFilter = ctx.createBiquadFilter();
    warmFilter.type = 'lowpass';
    warmFilter.frequency.setValueAtTime(600, ctx.currentTime);

    merger.connect(warmFilter);
    warmFilter.connect(this.masterGain!);

    oscLeft.start();
    oscRight.start();

    this.activeSourceNodes.push(oscLeft, oscRight, merger, warmFilter);
    this.currentType = typeName;
    this.masterGain!.gain.setTargetAtTime(this.volume, ctx.currentTime, 0.08);
  }

  /** 10 Hz Alpha wave: promotes calm alertness and relaxed focus */
  public playAlphaBinaural(): void {
    this.playBinaural(216, 10, 'alpha-binaural');
  }

  /** 40 Hz Gamma wave: promotes intense cognitive problem-solving and memorization */
  public playGammaBinaural(): void {
    this.playBinaural(240, 40, 'gamma-binaural');
  }

  /** Switch to chosen soundscape */
  public selectSoundscape(type: SoundscapeType): void {
    switch (type) {
      case 'brown-noise':
        this.playBrownNoise();
        break;
      case 'pink-noise':
        this.playPinkNoise();
        break;
      case 'soft-rain':
        this.playSoftRain();
        break;
      case 'alpha-binaural':
        this.playAlphaBinaural();
        break;
      case 'gamma-binaural':
        this.playGammaBinaural();
        break;
      case 'none':
      default:
        this.stop();
        break;
    }
  }

  /** Current state */
  public getState(): SoundscapeState {
    return {
      currentType: this.currentType,
      isPlaying: this.currentType !== 'none',
      volume: this.volume
    };
  }
}

export const soundSynthesizer = new BloomAudioSynthesizer();
