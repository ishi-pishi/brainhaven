import { SessionData, SessionMap } from "../../shared/Types"

export interface ISessionManager {
    loadSessions(): Promise<SessionMap>;
    saveSession(session: SessionData): Promise<void>;
    loadSessionById(id: string): Promise<SessionData>;
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