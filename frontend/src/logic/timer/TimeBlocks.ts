import { SessionSettings } from "./SessionSettings";

export class BlockQueue {
    private blocks: TimeBlock[];
    private currentIndex = 0;
    private cycles = 0;
    private cycleIndex = 0;

    /** Constructs queue of work blocks interspersed by break */
    constructor(session: SessionSettings) {
        this.blocks = [];
        this.cycles = session.getNumCycles();
        for (let i = 0; i < session.getNumCycles() - 1; i++) {
            this.blocks.push(new WorkBlock(session.getWorkDuration()));
            this.blocks.push(new BreakBlock(session.getBreakDuration()));
        }

        this.blocks.push(new WorkBlock(session.getWorkDuration()));
    }

    /** Returns the current block */
    current(): TimeBlock {
        if (this.isEmpty()) {
            throw new Error("The queue is empty");
        }
        return this.blocks[this.currentIndex];
    }

    /** Move to the next block */
    advance(): void {
        if (this.currentIndex < this.blocks.length) this.currentIndex++;
        if (this.current instanceof BreakBlock) {
            this.cycleIndex++;
        }
    }

    /** Returns true if all blocks are done */
    isEmpty(): boolean {
        return this.currentIndex >= this.blocks.length;
    }

    getCurrentLabel(): string {
        const block = this.current();
        const blockNum = this.cycleIndex + 1;
        const totalBlocks = this.cycles;
        return `${block.getLabel()} ${blockNum}/${totalBlocks}`;
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

    abstract getLabel(): string;
}


export class WorkBlock extends TimeBlock {
    getLabel(): string {
        return "Focus";
    }
}

export class BreakBlock extends TimeBlock {
    getLabel(): string {
        return "Break";
    }
}