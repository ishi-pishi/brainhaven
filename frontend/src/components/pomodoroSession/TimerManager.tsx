import { Timer } from "./Timer";

type TickListener = (timeLeftMs: number) => void;

/**
 * Runs the timer as a singleton instance.
 * Contains interval logic (e.g., can recalculate time every second)
 * as WELL as subscription logic.
 */
export class TimerManager {
  private static instance: TimerManager;
  private currentTimer: Timer | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private listeners = new Set<TickListener>();
  private tickIntervalMs = 1000;

  private constructor() {}

  static getInstance(): TimerManager {
    if (!TimerManager.instance) TimerManager.instance = new TimerManager();
    return TimerManager.instance;
  }

  startTimerMs(durationMs: number) {
    this.stopInterval();
    this.currentTimer = new Timer(durationMs);
    this.currentTimer.start();
    this.emitTick(); 
    this.startInterval();
  }

  startTimerSeconds(seconds: number) {
    this.startTimerMs(seconds * 1000);
  }

  startTimerMinutes(minutes: number) {
    this.startTimerMs(minutes * 60_000);
  }

  pauseTimer() {
    this.currentTimer?.pause();
    this.emitTick();
  }

  resumeTimer() {
    this.currentTimer?.resume();
    this.emitTick();
  }

  getTimeLeftMs(): number {
    return this.currentTimer?.getTimeLeftMs() ?? 0;
  }

  isFinished(): boolean {
    return this.currentTimer?.isFinished() ?? true;
  }

  // Also contains Subscription information.
  addTickListener(cb: TickListener) {
    this.listeners.add(cb);
    cb(this.getTimeLeftMs());
    return () => this.listeners.delete(cb);
  }

  removeTickListener(cb: TickListener) {
    this.listeners.delete(cb);
  }

  setTickIntervalMs(ms: number) {
    this.tickIntervalMs = Math.max(100, ms);
    if (this.intervalId !== null) {
      this.stopInterval();
      this.startInterval();
    }
  }

  private emitTick() {
    const msLeft = this.getTimeLeftMs();
    for (const cb of Array.from(this.listeners)) cb(msLeft);
  }

  private startInterval() {
    if (!this.currentTimer) return;
    this.stopInterval();
    this.intervalId = setInterval(() => {
      if (!this.currentTimer) return;
      this.emitTick();
      if (this.currentTimer.isFinished()) this.stopInterval();
    }, this.tickIntervalMs);
  }

  private stopInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
