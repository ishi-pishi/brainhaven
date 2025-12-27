import { SessionData, SessionMap } from "../../shared/Types"

export interface ISessionManager {

    /**
     *  Loads entire history of sessions into a SessionMap object.
     *  
     *  Throws SessionManagerError if sessions exist but cannot be loaded.
     *  Throws ResultTooLargeError if there are >5000 sessions.
     */
    loadSessions(): Promise<SessionMap>;

    /**
     *   Loads a session into a SessionData object by searching for id.
     * 
     *   Throws NotFoundError if session with id does not exist.
     */
    loadSessionById(id: string): Promise<SessionData>;

    /**
     *   Saves a session into memory.
     * 
     *   Throws an InvalidSessionError if session should not be added.
     */
    saveSession(session: SessionData): Promise<void>;
}

export class SessionManagerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SessionManagerError";
    }
}

export class NotFoundError extends SessionManagerError {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class InvalidSessionError extends SessionManagerError {
    constructor(message: string) {
        super(message);
        this.name = "InvalidSessionError";
    }
}