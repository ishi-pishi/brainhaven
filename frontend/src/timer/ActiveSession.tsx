import { TimerManager } from "./TimerManager";
import { SessionSettings } from "./SessionSettings";
import { BlockQueue } from "./TimeBlocks";

/**
 *   Manages an ActiveSession.
 *   This tracks which PomodoroBlock we are on and updates the timer accordingly.
 *   Singleton.
 */
export class ActiveSession {
  private static instance: ActiveSession | null = null;
  private bq: BlockQueue;

  constructor(settings: SessionSettings) {
    ActiveSession.instance = this;

    this.bq = new BlockQueue(settings);

    const timer = TimerManager.getInstance();
    timer.addFinishedListener(() => this.onBlockFinished());
  }

  // Singleton getInstance; returns null if there is none.
  static getInstance(): ActiveSession | null {
    return ActiveSession.instance;
  }

  start() {
    this.startCurrentBlock();
  }

  private onBlockFinished() {
    this.bq.advance();
    if (!this.bq.isEmpty()) {
      this.startCurrentBlock();
    } else {
      console.log("Session complete!");
    }
  }

  private startCurrentBlock() {
    const block = this.bq.current();
    if (block) {
      TimerManager.getInstance().startTimerMs(block.getDuration());
    }
  }
}
