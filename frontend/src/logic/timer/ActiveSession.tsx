import { TimerManager } from "./TimerManager";
import { SessionSettings } from "./SessionSettings";
import { BlockQueue } from "./TimeBlocks";


export class Observable {
  private listeners: (() => void)[] = [];

  /** Subscribe to changes */
  addListener(listener: () => void) {
    this.listeners.push(listener);
  }

  /** Notify all subscribers */
  protected notifyListeners() {
    for (const l of this.listeners) {
      l();
    }
  }
}


export class ActiveSession extends Observable {
  private static instance: ActiveSession | null = null;
  private bq: BlockQueue;

  constructor(settings: SessionSettings) {
    super();
    ActiveSession.instance = this;

    this.bq = new BlockQueue(settings);

    const timer = TimerManager.getInstance();
    timer.addFinishedListener(() => this.onBlockFinished());
  }

  static getInstance(): ActiveSession | null {
    return ActiveSession.instance;
  }

  start() {
    this.notifyListeners(); // initial block
    this.startCurrentBlock();
  }

  getCurrentBlockLabel(): string {
    return this.bq.getCurrentLabel();
  }

  getCurrentCycleLabel(): string {
    return this.bq.getCurrentCycleString();
  }

  private onBlockFinished() {
    this.bq.advance();

    if (!this.bq.isEmpty()) {
      this.notifyListeners(); // block changed
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