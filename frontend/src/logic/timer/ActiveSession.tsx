import { TimerManager } from "./TimerManager";
import { SessionSettings } from "./SessionSettings";
import { BlockQueue } from "./TimeBlocks";

export class ActiveSession {
  private static instance: ActiveSession | null = null;
  private bq: BlockQueue;

  private blockChangeListeners: (() => void)[] = [];

  constructor(settings: SessionSettings) {
    ActiveSession.instance = this;

    this.bq = new BlockQueue(settings);

    const timer = TimerManager.getInstance();
    timer.addFinishedListener(() => this.onBlockFinished());
  }

  static getInstance(): ActiveSession | null {
    return ActiveSession.instance;
  }

  /** UI / controller can subscribe to block changes */
  addBlockChangeListener(listener: () => void) {
    this.blockChangeListeners.push(listener);
  }

  private notifyBlockChange() {
    for (const l of this.blockChangeListeners) {
      l();
    }
  }

  start() {
    this.notifyBlockChange(); // initial block
    this.startCurrentBlock();
  }

  getCurrentBlockLabel(): string {
    return this.bq.getCurrentLabel();
  }

  private onBlockFinished() {
    this.bq.advance();

    if (!this.bq.isEmpty()) {
      this.notifyBlockChange(); // block actually changed
      this.startCurrentBlock();
    } else {
      console.log("Session complete!");
    }
  }

  private startCurrentBlock() {
    const block = this.bq.current();
    TimerManager.getInstance().startTimerMs(block.getDuration());
  }
}
