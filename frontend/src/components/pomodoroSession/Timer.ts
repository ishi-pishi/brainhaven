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
