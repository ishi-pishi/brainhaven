import { Session } from "./Session";
import { TimeBlock, WorkBlock, BreakBlock } from "./TimeBlock";

export class BlockQueue {
    private blocks: TimeBlock[];
    private currentIndex = 0;

    constructor(session: Session) {
        this.blocks = [];
        for (let i = 0; i < session.getNumCycles(); i++) {
            this.blocks.push(new WorkBlock(session.getWorkDuration()));
            this.blocks.push(new BreakBlock(session.getBreakDuration()));
        }
    }

    /** Returns the current block */
    current(): TimeBlock | null {
        return this.blocks[this.currentIndex] || null;
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