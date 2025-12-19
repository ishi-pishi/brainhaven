import { Timer } from "./Timer";

/**
 * Timer controller.
 * - Singleton, so there can only be one timer with a controller at a time
 * - This class deals with the interval stuff, whereas the Timer methods have the methods
 *   to calculate next times.
 */
export class TimerManager {
  private static instance: TimerManager;

  private currentTimer: Timer | null = null;
  private intervalId: number | null = null;
  private tickCallback: ((timeLeftMs: number) => void) | null = null;

  private constructor() {} // private so no external `new TimerManager()`

  // singleton accessor
  static getInstance(): TimerManager {
    if (!TimerManager.instance) {
      TimerManager.instance = new TimerManager();
    }
    return TimerManager.instance;
  }

  startTimer(durationMs: number) {
    this.stopInterval();
    this.currentTimer = new Timer(durationMs);
    this.currentTimer.start();
    this.startInterval();
  }

  pauseTimer() {
    this.currentTimer?.pause();
  }

  resumeTimer() {
    this.currentTimer?.resume();
  }

  getTimeLeftMs(): number {
    return this.currentTimer?.getTimeLeftMs() ?? 0;
  }

  isFinished(): boolean {
    return this.currentTimer?.isFinished() ?? true;
  }

  setTickCallback(cb: (timeLeftMs: number) => void) {
    this.tickCallback = cb;
  }

  /**
   * Private methods
   */
  private startInterval() {
    if (!this.currentTimer) return;
    this.intervalId = setInterval(() => {
      if (!this.currentTimer) return;

      if (this.tickCallback) {
        this.tickCallback(this.currentTimer.getTimeLeftMs());
      }

      if (this.currentTimer.isFinished()) {
        this.stopInterval();
      }
    }, 1000);
  }

  private stopInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
