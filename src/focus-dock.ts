/**
 * Floating Focus Dock & Ambient Audio Controller
 * Provides an Apple/Linear-style non-intrusive bottom dock with an active
 * Pomodoro timer, ambient cognitive audio controller, and 1-click Cmd+K launcher.
 */

import { soundSynthesizer, SoundscapeType } from './audio-synthesizer.js';
import { icon } from './icons.js';

export class FocusDock {
  private static instance: FocusDock | null = null;
  private container: HTMLElement | null = null;
  private timerSeconds: number = 25 * 60;
  private timerTotal: number = 25 * 60;
  private isTimerRunning: boolean = false;
  private timerInterval: number | null = null;
  private activeSoundscape: SoundscapeType = 'none';
  private isMinimized: boolean = false;
  private isVisible: boolean = false;
  private onOpenPalette: () => void;

  constructor(onOpenPalette: () => void) {
    this.onOpenPalette = onOpenPalette;
    this.setupDOM();
  }

  public static init(onOpenPalette: () => void): FocusDock {
    if (!FocusDock.instance) {
      FocusDock.instance = new FocusDock(onOpenPalette);
    }
    return FocusDock.instance;
  }

  public setVisible(visible: boolean): void {
    this.isVisible = false;
    if (typeof document !== 'undefined') {
      document.querySelectorAll('#bloom-focus-dock, .focus-dock, [id*="focus-dock"], [id*="dock-timer"]').forEach(el => el.remove());
    }
  }

  private setupDOM(): void {
    // Floating dock permanently eradicated
    this.container = null;
    if (typeof document !== 'undefined') {
      const purge = () => {
        document.querySelectorAll('#bloom-focus-dock, .focus-dock, [id*="focus-dock"], [id*="dock-timer"]').forEach(el => el.remove());
      };
      purge();
      document.addEventListener('DOMContentLoaded', purge);
      window.addEventListener('load', purge);
    }
  }

  public render(): void {
    this.container = null;
    if (typeof document !== 'undefined') {
      document.querySelectorAll('#bloom-focus-dock, .focus-dock, [id*="focus-dock"], [id*="dock-timer"]').forEach(el => el.remove());
    }
  }

  private startTimer(): void {}
  private pauseTimer(): void {}
  private setSoundscape(_type: SoundscapeType): void {}
  private formatTime(secs: number): string {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}
