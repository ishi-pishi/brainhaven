import { Timer } from "./Timer";
import { SessionSettings } from "./SessionSettings";
import { SessionState } from "./SessionState";

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
    private session: SessionSettings;
    private state: SessionState;

    // Construct a new session with no elapsed time
    constructor(session: SessionSettings, initialState: SessionState) {
        this.timer = new Timer(0); // TODO: this is wrong.
        this.session = session;
    }
}