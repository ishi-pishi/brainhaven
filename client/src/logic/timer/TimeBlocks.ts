import { SessionSettings } from "./SessionSettings";

/**
 *  Contains a queue of work and break blocks that can be moved through.
 * 
 *  
 */
export class BlockQueue {
    private blocks: TimeBlock[];
    private currentIndex = 0;
    private cycles = 0;
    private cycleIndex = 0;

    // Constructs queue of work blocks interspersed by break/
    constructor(session: SessionSettings) {
        this.blocks = [];
        this.cycles = session.getNumCycles();

        for (let i = 0; i < this.cycles - 1; i++) {
            this.blocks.push(new WorkBlock(session.getWorkDuration()));
            this.blocks.push(new BreakBlock(session.getBreakDuration()));
        }

        this.blocks.push(new WorkBlock(session.getWorkDuration()));
    }

    // Returns the current block
    current(): TimeBlock {
        if (this.isEmpty()) {
            throw new Error("The queue is empty");
        }
        return this.blocks[this.currentIndex];
    }

    // Move to the next block
    advance(): void {
        const finishedBlock = this.current();

        this.currentIndex++;

        if (finishedBlock instanceof BreakBlock) {
            this.cycleIndex++;
        }
    }

    // Returns true if all blocks are done
    isEmpty(): boolean {
        return this.currentIndex >= this.blocks.length;
    }

    // Returns the 'label' of the current block
    getCurrentLabel(): string {
        if (this.isEmpty()) {
            return "Session Complete";
        }

        return this.current().getLabel();
    }

    // Returns a string representing the current cycle
    // e.g., "Cycle 2 of 4"
    getCurrentCycleString(): string {
        return `Cycle ${this.getCurrentCycle()} of ${this.cycles}`;
    }

    // Returns the current cycle as a number, 1-indexed
    getCurrentCycle(): number {
        return this.cycleIndex + 1;
    }
}

/**
 * A class representing a block of time (either work or break)
 */
export abstract class TimeBlock {
    protected durationMs: number; // Duration of a block, either work or time

    constructor(durationMs: number) {
        this.durationMs = durationMs;
    }

    getDuration(): number {
        return this.durationMs;
    }

    abstract getLabel(): string;
}

// Represents a block of work/focus
export class WorkBlock extends TimeBlock {
    getLabel(): string {
        return "Focus";
    }
}

// Represents a block of break
export class BreakBlock extends TimeBlock {
    getLabel(): string {
        return "Break";
    }
}
