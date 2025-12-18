import { Time } from "./Time";

/**
 * Represents a focus session, containing:
 * - duration of time spent in work
 * - duration of time spent in break
 * - number of cycles (each block containing a work followed by a break)
 */
export class Session {
    private work: Time;
    private break: Time;
    private numCycles: number;

    // Constructs session with work/break amounts with the given number of SECONDS
    // and numBlocks.
    // Important: work/break are in seconds NOT time.
    constructor(workSeconds: number, breakSeconds: number, numCycles: number) {
        this.work = new Time(workSeconds);
        this.break = new Time(breakSeconds);
        this.numCycles = numCycles;
    }
} 