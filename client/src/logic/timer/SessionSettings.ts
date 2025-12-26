/**
 * Represents the parameters of focus session, containing:
 * - duration of time spent in work
 * - duration of time spent in break
 * - number of cycles (each block containing a work followed by a break)
 */
export class SessionSettings {
    private workMs: number;
    private breakMs: number;
    private numCycles: number;

    // Constructs  settings with work/break amounts with the given number of SECONDS
    // and numBlocks.
    // Important: work/break are in seconds NOT time.
    constructor(workMs: number, breakMs: number, numCycles: number) {
        this.workMs = workMs;
        this.breakMs = breakMs;
        this.numCycles = numCycles;
    }

    /** Returns the work duration in milliseconds */
    getWorkDuration(): number {
        return this.workMs;
    }

    /** Returns the break duration in milliseconds */
    getBreakDuration(): number {
        return this.breakMs;
    }

    /** Return the total time in milliseconds */
    getTotalTime(): number {
        return this.workMs* this.numCycles + this.breakMs * (this.numCycles - 1 );
    }

    /** Returns the number of cycles */
    getNumCycles(): number {
        return this.numCycles;
    }
} 