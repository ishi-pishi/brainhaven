import { Time } from "./Time";

/**
 * Represents a focus session, containing:
 * - duration of time spent in work
 * - duration of time spent in break
 * - number of blocks (each block containing a work followed by a break)
 */
export class Session {
    private workDuration: Time;
    private breakDuration: Time;
    private numBlocks: number;

    constructor(workDuration: Time, breakDuration: Time, numBlocks: Time) {
        this.workDuration = workDuration;
        this.breakDuration = breakDuration;
        this.numBlocks = numBlocks;
    }
} 