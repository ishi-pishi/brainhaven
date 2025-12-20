import type { TimerManager } from "./TimerManager";

type BlockType = 'work' | 'shortBreak';

interface TimeBlock {
  type: BlockType;
  durationMs: number;
  label?: string;  // The number of the block (e.g. Work Block 2/3 is the second work block)
}

export class ActiveSession {
  private blocks: TimeBlock[] = [];
  private currentBlockIndex: number = 0;
  private timer: TimerManager;

  constructor(workMs: number, breakMs: number, numWorkBlocks: number, timer: TimerManager) {
    this.timer = timer;
    this.blocks = this.buildBlocks(workMs, breakMs, numWorkBlocks);
    this.timer.addFinishedListener(() => this.onBlockFinished());
  }

  start() {
    this.startCurrentBlock();
  }

  private buildBlocks(workMs: number, breakMs: number, numWorkBlocks: number): TimeBlock[] {
    const blocks: TimeBlock[] = [];

    for (let i = 0; i < numWorkBlocks; i++) {
      blocks.push({ type: 'work', durationMs: workMs, label: `Work ${i + 1}/${numWorkBlocks}` });
      if (i < numWorkBlocks - 1) {
        blocks.push({ type: 'shortBreak', durationMs: breakMs });
      }
    }

    return blocks;
  }

  private startCurrentBlock() {
    const block = this.getCurrentBlock();
    this.timer.startTimerMs(block.durationMs);
  }

  private onBlockFinished() {
    this.currentBlockIndex++;

    if (this.currentBlockIndex < this.blocks.length) {
      this.startCurrentBlock();
    } else {
      console.log('Session complete!');
    }
  }

  getCurrentBlock(): TimeBlock {
    return this.blocks[this.currentBlockIndex];
  }

  getAllBlocks(): TimeBlock[] {
    return this.blocks;
  }
}
