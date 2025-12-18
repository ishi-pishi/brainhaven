import { Time } from "./Time";
import { Session } from "./Session";
import { ActiveSessionState } from "./SessionStates/ActiveSessionState";

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
    private elapsed: Time;
    private session: Session;
    private state: ActiveSessionState;

    // Construct a new session with no elapsed time
    constructor(session: Session) {
        this.elapsed = new Time(0);
        this.session = session;
        // todo: init state
    }
}