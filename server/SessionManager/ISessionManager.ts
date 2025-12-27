import { SessionData, SessionMap } from "../../shared/Types"

export interface ISessionManager {
    loadSessions(): SessionMap;
    saveSession(session: SessionData): void;
}

export class SessionManagerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SessionManagerError";
    }
}