// TimerManager.ts
import { Timer } from "./Timer";

export type TickListener = (timeLeftMs: number) => void;
export type FinishedListener = () => void;

export class TMSubject {
  private tickListeners = new Set<TickListener>();
  private finishedListeners = new Set<FinishedListener>();

  addTickListener(cb: TickListener) {
    this.tickListeners.add(cb);
    return () => this.tickListeners.delete(cb);
  }

  addFinishedListener(cb: FinishedListener) {
    this.finishedListeners.add(cb);
    return () => this.finishedListeners.delete(cb);
  }

  emitTick(msLeft: number) {
    for (const cb of this.tickListeners) {
      try { cb(msLeft); } catch (err) { console.error("tick listener error", err); }
    }
  }

  emitFinished() {
    for (const cb of this.finishedListeners) {
      try { cb(); } catch (err) { console.error("finished listener error", err); }
    }
  }
}

export class TimerManager {
  private static instance: TimerManager;
  private currentTimer: Timer | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private tickIntervalMs = 1000;
  private finishedEmitted = false;

  private subject = new TMSubject();

  private constructor() {}

  static getInstance(): TimerManager {
    if (!TimerManager.instance) TimerManager.instance = new TimerManager();
    return TimerManager.instance;
  }

  startTimerMs(durationMs: number) {
    this.stopInterval();
    this.currentTimer = new Timer(durationMs);
    this.finishedEmitted = false;
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

  setTickIntervalMs(ms: number) {
    this.tickIntervalMs = Math.max(50, ms);
    if (this.intervalId !== null) {
      this.stopInterval();
      this.startInterval();
    }
  }

  addTickListener(cb: TickListener) {
    const unsub = this.subject.addTickListener(cb);
    cb(this.getTimeLeftMs());
    return unsub;
  }

  addFinishedListener(cb: FinishedListener) {
    return this.subject.addFinishedListener(cb);
  }

  // Private helper
  private emitTick() {
    if (!this.currentTimer) return;

    const msLeft = this.getTimeLeftMs();
    this.subject.emitTick(msLeft);

    if (this.isFinished() && !this.finishedEmitted) {
      this.finishedEmitted = true;
      this.subject.emitFinished();
    }
  }

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
