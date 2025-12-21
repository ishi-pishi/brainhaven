import type { TimerManager } from "./TimerManager";

/**
 *   Manages an ActiveSession.
 *   This tracks which PomodoroBlock we are on and updates the timer accordingly.
 */
export class ActiveSession {
  private static instance: ActiveSession | null = null;

  private timer: TimerManager;

  private constructor(timer: TimerManager) {
    this.timer = timer;
  }

  static getInstance(timer: TimerManager): ActiveSession {
    if (!ActiveSession.instance) {
      ActiveSession.instance = new ActiveSession(timer);
    }
    return ActiveSession.instance;
  }

  private startTimer(durationMs: number) {
    this.timer.startTimerMs(durationMs);
  }

  private resetTimer(durationMs: number) {
    this.timer.startTimerMs(durationMs);
  }
}
