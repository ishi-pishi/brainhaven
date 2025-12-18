import { TimeBlock, WorkBlock, BreakBlock } from "./TimeBlock";

/**
 * Represents a focus session, containing:
 * - duration of time spent in work
 * - duration of time spent in break
 * - number of blocks (each block containing a work followed by a break)
 */
export class Session {
    private work: WorkBlock;
    private break: BreakBlock;
    private numBlocks: number;
} 