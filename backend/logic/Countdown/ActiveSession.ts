import { Time } from "./Time";
import { Session } from "./Session";
import { TimeBlock, WorkBlock, BreakBlock } from "./TimeBlock";

/**
 * Represents an ACTIVE session that is counting down, containing
 * - Session we are completing
 * - Total time elapsed so far
 */
export class ActiveSession {
    private elapsed: Time;
    private session: Session;

    // Construct a new session with no elapsed time
    constructor(session: Session) {
        this.elapsed = new Time(0);
        this.session = session;
    }
    
    startTimer() {
        // TODO
    }

    pauseTimer() {
        // TODO
    }
}