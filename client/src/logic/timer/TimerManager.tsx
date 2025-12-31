
export type TickListener = (timeLeftMs: number) => void;
export type FinishedListener = () => void;

export class TimerManagerSubject {
  private tickListeners = new Set<TickListener>();
  private finishedListeners = new Set<FinishedListener>();

  addTickListener(cb: TickListener) {
  this.tickListeners.add(cb);
  return () => {
    this.tickListeners.delete(cb);
  };
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

/**
 *  TimerManager class.
 *  This class is a singleton which controls an instance of the Timer and can
 *  tick it over seconds.
 *  
 *  It contains:
 *    - An instance for singleton
 *    - The Timer it ticks on
 *    - The interval it is using to tick the timer
 *    - The interval for each tick (set to 1s)
 */
export class TimerManager {
  private static instance: TimerManager;
  private currentTimer: Timer | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private TICK_INTERVAL_MS = 1000;
  private finishedEmitted = false;

  private subject = new TimerManagerSubject();

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

  startSeconds(seconds: number) {
    this.startTimerMs(seconds * 1000);
  }

  startMinutes(minutes: number) {
    this.startTimerMs(minutes * 60_000);
  }

  pause() {
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
    this.TICK_INTERVAL_MS = Math.max(50, ms);
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

  // Private helpers
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
    }, this.TICK_INTERVAL_MS);
  }

  private stopInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}


/**
 * Timer logic in MILLISECONDS.
 * Stores timer duration, as well as time started/finished.
 */
export class Timer {
  private readonly durationMs: number;
  private startedAtMs: number | null = null;
  private pausedAtMs: number | null = null;
  private accumulatedPausedMs = 0;

  constructor(durationMs: number) {
    this.durationMs = durationMs;
  }

  start(now: number = Date.now()) {
    if (this.startedAtMs === null) {
      this.startedAtMs = now;
      this.pausedAtMs = null;
      this.accumulatedPausedMs = 0;
    }
  }

  pause(now: number = Date.now()) {
    if (this.startedAtMs !== null && this.pausedAtMs === null) {
      this.pausedAtMs = now;
    }
  }

  resume(now: number = Date.now()) {
    if (this.pausedAtMs !== null) {
      this.accumulatedPausedMs += now - this.pausedAtMs;
      this.pausedAtMs = null;
    }
  }

  getElapsedMs(now: number = Date.now()): number {
    if (this.startedAtMs === null) return 0;
    const effectiveNow = this.pausedAtMs ?? now;
    return Math.min(effectiveNow - this.startedAtMs - this.accumulatedPausedMs, this.durationMs);
  }

  getTimeLeftMs(now: number = Date.now()): number {
    return Math.max(this.durationMs - this.getElapsedMs(now), 0);
  }

  isFinished(now: number = Date.now()): boolean {
    return this.getElapsedMs(now) >= this.durationMs;
  }
}
