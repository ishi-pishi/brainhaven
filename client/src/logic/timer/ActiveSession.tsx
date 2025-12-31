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

/**
 *  ActiveSession tracks blocks and is responsible of controlling the current timer based on
 *  block progression.
 * 
 *  In some ways this is kind of a wrapper for both TimerManager and BlockQueue;
 *  it advances through a BlockQueue and alters the timer accordingly.
 * 
 *  Contains:
 *     - Instance of Active Session for singleton access
 *     - Queue of remaining blocks (changes as blocks are used)
 *     - Whether or not the block is complete
 *     - The original session settings
 */
export class ActiveSession extends Observable {
  private static instance: ActiveSession | null = null;
  private bq: BlockQueue;
  private finished: boolean = false;
  private timer: TimerManager;
  private settings;

  /**
   *  Constructs a new unfinished ActiveSession based on current settings
   *  by constructing a new BlockQueue.
   * 
   *  This adds a timer to the session but does not start it.
   */
  constructor(settings: SessionSettings) {
    super();
    ActiveSession.instance = this;

    this.bq = new BlockQueue(settings);
    this.finished = false;
    this.settings = settings;

    this.timer = TimerManager.getInstance();
    this.timer.addFinishedListener(() => this.onBlockFinished());
  }

  // Singleton
  static getInstance(): ActiveSession | null {
    return ActiveSession.instance;
  }


  /**
   *  GETTERS --->
   */
  // Returns true if finished; otherwise false.
  isFinished() {
    return this.finished;
  }

  // Returns the either "Focus" or "Work"  
  getCurrentBlockLabel(): string {
    return this.bq.getCurrentLabel();
  }

  // Returns where we are in the cycle (e.g. "Cycle 1/4")
  getCurrentCycleLabel(): string {
    return this.bq.getCurrentCycleString();
  }

  /**
   *  SESSION-WIDE CONTROLLERS --->
   */

  // Starts the current block and notifies listeners.
  startNewBlock() {
    this.notifyListeners();
    this.startCurrentBlockTimer();
  }

  // Ends the current block and notifies listeners.
  endSession(): void {
    this.finished = true;
    this.notifyListeners();
    TimerManager.getInstance().pause();
  }

  // Automatically advances to the next block when this book finishes.
  // If there are no more blocks end the session.
  private onBlockFinished() {
    this.bq.advance();

    if (!this.bq.isEmpty()) {
      this.startNewBlock();
    } else {
      this.endSession();
    }
  }

  /**
   *  TIMER-ONLY CONTROLLERS
   */
  pauseTimer() {
    this.timer.pause();
  }

  // Finds the block we are currently on and starts the timer from its duration.
  private startCurrentBlockTimer() {
    const block = this.bq.current();
    this.timer.startTimerMs(block.getDuration());
  }
}