import { SessionSettings } from "./SessionSettings";

export class BlockQueue {
    private blocks: TimeBlock[];
    private currentIndex = 0;

    /** Constructs queue of work blocks interspersed by break */
    constructor(session: SessionSettings) {
        this.blocks = [];
        for (let i = 0; i < session.getNumCycles() - 1; i++) {
            this.blocks.push(new WorkBlock(session.getWorkDuration()));
            this.blocks.push(new BreakBlock(session.getBreakDuration()));
        }

        this.blocks.push(new WorkBlock(session.getWorkDuration()));
    }

    /** Returns the current block */
    current(): TimeBlock {
        if (this.isEmpty()) {
            throw new Error("The queue is empty. Do not throw.");
        }
        return this.blocks[this.currentIndex];
    }

    /** Move to the next block */
    advance(): void {
        if (this.currentIndex < this.blocks.length) this.currentIndex++;
    }

    /** Returns true if all blocks are done */
    isEmpty(): boolean {
        return this.currentIndex >= this.blocks.length;
    }
}

/**
 * A class representing a block of time (either work or break)
 */
export abstract class TimeBlock {
    protected durationMs: number;

    constructor(durationMs: number) {
        this.durationMs = durationMs;
    }

    getDuration(): number {
        return this.durationMs;
    }
}


export class WorkBlock extends TimeBlock { }
export class BreakBlock extends TimeBlock { }

