/**
 * Floating Focus Dock & Ambient Audio Controller
 * Provides an Apple/Linear-style non-intrusive bottom dock with an active
 * Pomodoro timer, ambient cognitive audio controller, and 1-click Cmd+K launcher.
 */
export class FocusDock {
    static instance = null;
    container = null;
    timerSeconds = 25 * 60;
    timerTotal = 25 * 60;
    isTimerRunning = false;
    timerInterval = null;
    activeSoundscape = 'none';
    isMinimized = false;
    isVisible = false;
    onOpenPalette;
    constructor(onOpenPalette) {
        this.onOpenPalette = onOpenPalette;
        this.setupDOM();
    }
    static init(onOpenPalette) {
        if (!FocusDock.instance) {
            FocusDock.instance = new FocusDock(onOpenPalette);
        }
        return FocusDock.instance;
    }
    setVisible(visible) {
        this.isVisible = false;
        if (typeof document !== 'undefined') {
            document.querySelectorAll('#bloom-focus-dock, .focus-dock, [id*="focus-dock"], [id*="dock-timer"]').forEach(el => el.remove());
        }
    }
    setupDOM() {
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
    render() {
        this.container = null;
        if (typeof document !== 'undefined') {
            document.querySelectorAll('#bloom-focus-dock, .focus-dock, [id*="focus-dock"], [id*="dock-timer"]').forEach(el => el.remove());
        }
    }
    startTimer() { }
    pauseTimer() { }
    setSoundscape(_type) { }
    formatTime(secs) {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
}
