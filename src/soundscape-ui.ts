/**
 * CBSE Class XII Focus Soundscape & Binaural Beats UI Studio
 * Integrates Web Audio API procedural soundscape synthesizer with interactive controls:
 * 10 Hz Alpha Beats (Active Recall), 40 Hz Gamma Beats (High-Complexity Physics/Math),
 * Brown Noise, Pink Noise, Soft Rain, and Real-time HTML5 Canvas Audio Visualizer.
 */

import { soundSynthesizer, SoundscapeType } from './audio-synthesizer.js';

export class SoundscapeUI {
  private container: HTMLElement;
  private canvasCtx: CanvasRenderingContext2D | null = null;
  private animationFrameId: number | null = null;
  private currentPreset: SoundscapeType = 'alpha-binaural';

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public render(): void {
    const state = soundSynthesizer.getState();
    const isPlaying = state.isPlaying;

    this.container.innerHTML = `
      <div class="soundscape-ui-root" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); color: #1f2937; font-family: system-ui, -apple-system, sans-serif;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6366f1;">Procedural Web Audio Engine (0 Network Requests)</div>
            <h2 style="margin: 2px 0 0 0; font-size: 20px; font-weight: 800; color: #111827;">Cognitive Focus Soundscape</h2>
          </div>

          <!-- Play/Stop Master Button -->
          <button id="btn-master-audio-toggle" style="display: flex; align-items: center; gap: 8px; padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; background: ${isPlaying ? '#dc2626' : '#4f46e5'}; color: #ffffff; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3);">
            <span>${isPlaying ? '■ Stop Audio' : '▶ Play Focus Sound'}</span>
          </button>
        </div>

        <!-- Canvas Visualizer -->
        <div style="background: #0f172a; border-radius: 12px; padding: 12px; margin-bottom: 20px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);">
          <canvas id="soundscape-canvas" width="600" height="100" style="width: 100%; height: 100px; display: block; border-radius: 8px;"></canvas>
        </div>

        <!-- Preset Selection Cards -->
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 8px;">Select Focus Sound Profile</label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;">
            ${this.renderPresetButton('alpha-binaural', '10 Hz Alpha Beats', 'Relaxed alertness, memorization & active recall')}
            ${this.renderPresetButton('gamma-binaural', '40 Hz Gamma Beats', 'Intense problem solving, calculus & physics')}
            ${this.renderPresetButton('brown-noise', 'Brown Noise', 'Deep low-frequency rumble, blocks talking')}
            ${this.renderPresetButton('pink-noise', 'Pink Noise', '1/f natural spectrum balance, deep immersion')}
            ${this.renderPresetButton('soft-rain', 'Soft Rain', 'Procedural raindrops with gentle rhythm')}
          </div>
        </div>

        <!-- Volume and Dynamics Sliders -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-size: 12px; font-weight: 600; color: #4b5563;">Master Volume</span>
              <span id="label-volume" style="font-size: 12px; font-family: monospace; font-weight: 700; color: #1e3a8a;">${Math.round(state.volume * 100)}%</span>
            </div>
            <input id="slider-master-volume" type="range" min="0" max="100" value="${Math.round(state.volume * 100)}" style="width: 100%; cursor: pointer;">
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-size: 12px; font-weight: 600; color: #4b5563;">Soundscape Mode</span>
              <span style="font-size: 11px; font-weight: 700; background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px;">Zero Asset Pure Web Audio</span>
            </div>
            <div style="font-size: 12px; color: #64748b; line-height: 1.4;">
              Synthesized mathematically via dual stereophonic oscillators and white noise buffer modulation.
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.initCanvas();
  }

  private renderPresetButton(preset: SoundscapeType, title: string, subtitle: string): string {
    const isSelected = this.currentPreset === preset;
    return `
      <button class="preset-btn" data-preset="${preset}" style="text-align: left; padding: 12px; border: 1px solid ${isSelected ? '#4f46e5' : '#e5e7eb'}; border-radius: 8px; background: ${isSelected ? '#eef2ff' : '#ffffff'}; cursor: pointer; transition: all 0.15s;">
        <div style="font-size: 13px; font-weight: 700; color: ${isSelected ? '#4338ca' : '#1f2937'}; margin-bottom: 2px;">${title}</div>
        <div style="font-size: 11px; color: #6b7280; line-height: 1.3;">${subtitle}</div>
      </button>
    `;
  }

  private initCanvas(): void {
    const canvas = this.container.querySelector('#soundscape-canvas') as HTMLCanvasElement;
    if (canvas) {
      this.canvasCtx = canvas.getContext('2d');
      this.drawVisualizer();
    }
  }

  private drawVisualizer(): void {
    if (!this.canvasCtx) return;

    const canvas = this.canvasCtx.canvas;
    const width = canvas.width;
    const height = canvas.height;

    this.canvasCtx.clearRect(0, 0, width, height);

    // Draw background grid lines
    this.canvasCtx.strokeStyle = '#1e293b';
    this.canvasCtx.lineWidth = 1;
    this.canvasCtx.beginPath();
    this.canvasCtx.moveTo(0, height / 2);
    this.canvasCtx.lineTo(width, height / 2);
    this.canvasCtx.stroke();

    const isPlaying = soundSynthesizer.getState().isPlaying;

    if (isPlaying) {
      // Draw simulated waveform / frequency activity
      this.canvasCtx.strokeStyle = this.currentPreset.includes('gamma') ? '#ec4899' : (this.currentPreset.includes('alpha') ? '#6366f1' : '#10b981');
      this.canvasCtx.lineWidth = 2;
      this.canvasCtx.beginPath();

      const time = performance.now() * 0.003;
      const freq = this.currentPreset.includes('gamma') ? 0.08 : (this.currentPreset.includes('alpha') ? 0.04 : 0.02);

      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * freq + time) * 20 * Math.sin(x * 0.01 + time * 0.5);
        if (x === 0) {
          this.canvasCtx.moveTo(x, y);
        } else {
          this.canvasCtx.lineTo(x, y);
        }
      }
      this.canvasCtx.stroke();
    } else {
      // Idle straight line
      this.canvasCtx.strokeStyle = '#334155';
      this.canvasCtx.lineWidth = 1.5;
      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(0, height / 2);
      this.canvasCtx.lineTo(width, height / 2);
      this.canvasCtx.stroke();
    }

    this.animationFrameId = requestAnimationFrame(() => this.drawVisualizer());
  }

  private bindEvents(): void {
    // Master button
    this.container.querySelector('#btn-master-audio-toggle')?.addEventListener('click', () => {
      if (soundSynthesizer.getState().isPlaying) {
        soundSynthesizer.stop();
      } else {
        soundSynthesizer.selectSoundscape(this.currentPreset);
      }
      this.render();
    });

    // Preset buttons
    this.container.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const p = (e.currentTarget as HTMLElement).getAttribute('data-preset') as SoundscapeType;
        if (p) {
          this.currentPreset = p;
          if (soundSynthesizer.getState().isPlaying) {
            soundSynthesizer.selectSoundscape(p);
          }
          this.render();
        }
      });
    });

    // Volume slider
    const volumeSlider = this.container.querySelector('#slider-master-volume') as HTMLInputElement;
    volumeSlider?.addEventListener('input', () => {
      const vol = Number(volumeSlider.value) / 100;
      soundSynthesizer.setVolume(vol);
      const label = this.container.querySelector('#label-volume');
      if (label) {
        label.textContent = `${volumeSlider.value}%`;
      }
    });
  }

  public destroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    soundSynthesizer.stop();
  }
}
