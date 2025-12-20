// TimerManager.ts
import { Timer } from "./Timer";
import { TMSubject } from "./TMSubject";

export class TimerManager {
  private static instance: TimerManager;
  private currentTimer: Timer | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private tickIntervalMs = 1000;

  private subject = new TMSubject();

  private constructor() {}

  static getInstance(): TimerManager {
    if (!TimerManager.instance) TimerManager.instance = new TimerManager();
    return TimerManager.instance;
  }

  startTimerMs(durationMs: number) {
    this.stopInterval();
    this.currentTimer = new Timer(durationMs);
    this.currentTimer.start();
    this.emitTick(); // emit immediately
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

  setTickIntervalMs(ms: number) {
    this.tickIntervalMs = Math.max(50, ms);
    if (this.intervalId !== null) {
      this.stopInterval();
      this.startInterval();
    }
  }

  addTickListener(cb: (msLeft: number) => void) {
    const unsub = this.subject.addTickListener(cb);
    cb(this.getTimeLeftMs());
    return unsub;
  }

  addFinishedListener(cb: () => void) {
    return this.subject.addFinishedListener(cb);
  }

  private emitTick() {
    const msLeft = this.getTimeLeftMs();
    this.subject.emitTick(msLeft);
    if (this.isFinished()) this.subject.emitFinished();
  }

  // Helpers
  private startInterval() {
    if (!this.currentTimer) return;
    this.stopInterval();
    this.intervalId = setInterval(() => {
      if (!this.currentTimer) return;
      this.emitTick();
      if (this.isFinished()) this.stopInterval();
    }, this.tickIntervalMs);
  }

  private stopInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
