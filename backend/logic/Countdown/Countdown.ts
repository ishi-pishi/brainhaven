import { Time } from "./Time";
import { Session } from "./Session";

/**
 * Represents an ACTIVE session that is counting down, containing
 * - Session we are completing
 * - Total time elapsed so far
 */
export class Countdown {
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