import { Timer } from "./Timer";
import { Session } from "./Session";
import { ActiveSessionState } from "./ActiveSessionState";

/**
 * Represents an ACTIVE session that is counting down, containing
 * - Total time elapsed so far
 * - Session we are tracking
 * 
 * This is the context; the state can be:
 * - Ready
 * - Running
 * - Paused
 * - Completed
 */
export class ActiveSession {
    private timer: Timer;
    private session: Session;
    private state: ActiveSessionState;

    // Construct a new session with no elapsed time
    constructor(session: Session) {
        this.timer = new Timer(0); // TODO: this is wrong.
        this.session = session;
    }
}