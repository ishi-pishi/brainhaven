import { TimerManager } from "./TimerManager";
import { SessionSettings } from "./SessionSettings";
import { BlockQueue } from "./TimeBlocks";

/**
 *  Observable - makes an ActiveSession observable
 *  so outside objects can observe when a block finishes.
 */
export class Observable {
  private listeners: (() => void)[] = [];

  // Subscribe to changes
  addListener(listener: () => void) {
    this.listeners.push(listener);
  }

  // Notify all subscribers
  protected notifyListeners() {
    for (const l of this.listeners) {
      l();
    }
  }
}

/**
 *  ActiveSession tracks blocks and is responsible of controlling the current timer based on
 *  block progression. This doesn't have many timer controls in it; it's mainly just
 *  responsible for orchestrating the timer through the blocks.
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
  private metadata: any;

  /**
   *  Constructs a new unfinished ActiveSession based on current settings
   *  by constructing a new BlockQueue.
   * 
   *  This adds a timer to the session but does not start it.
   */
  constructor(settings: SessionSettings) {
    super();
    ActiveSession.instance = this;

    this.metadata = {
      subjectId: null,
      startedAt: null,
      endedAt: null,
      workMs: settings.getWorkDuration(),
      breakMs: settings.getBreakDuration(),
      intendedCycles: settings.getNumCycles(),
    };

    this.bq = new BlockQueue(settings);
    this.finished = false;

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

  // gets current time
  getTotalDurationCurrBlock(): number {
    if (this.finished) return 0;

    const block = this.bq.current();
    const duration = block.getDuration();

    return duration;
  }

  // Returns the either "Focus" or "Work"  
  getCurrentBlockLabel(): string {
    return this.bq.getCurrentLabel();
  }

  // Returns where we are in the cycle (e.g. "Cycle 1/4")
  getCurrentCycleLabel(): string {
    return this.bq.getCurrentCycleString();
  }

  // Starts the current block and notifies listeners.
  startNewBlock() {
    this.notifyListeners();
    this.startCurrentBlockTimer();
  }

  // Ends the current block and notifies listeners.
  endSession(): void {
    this.finished = true;
    this.metadata.endedAt = new Date();
    this.notifyListeners();
    TimerManager.getInstance().pause();
  }

  // Provides metadata object
  getMetadata(): any {
    return this.metadata;
  }

  // Set subject when starting a session
  setSubject(str: string): void {
    this.metadata.subjectId = str;
    console.log("Set session subject to: " + this.metadata.subjectId);
  }

  // Set settings
  setSettings(settings: SessionSettings): void {
    this.bq = new BlockQueue(settings);
  }

  // Start block from beginning
  startFirstBlock(): void {
    console.log("Starting session!");

    if(this.metadata.subjectId === null) {
      throw new Error("The subject has not been set! Choose a category for the study session.");
    }
    this.startNewBlock();
  }

  // Automatically advances to the next block when this book finishes.
  // If there are no more blocks end the session.
  private onBlockFinished() {
    if (this.finished) return;
    if (this.bq.isEmpty()) return;

    this.bq.advance();

    if (!this.bq.isEmpty()) {
      this.startNewBlock();
    } else {
      this.endSession();
    }
  }

  // Finds the block we are currently on and starts the timer from its duration.
  private startCurrentBlockTimer() {
    const block = this.bq.current();
    this.metadata.startedAt = new Date();
    this.timer.startTimerMs(block.getDuration());
  }
}