import { SessionData } from "../../shared/Types"

export interface ISessionManager {
    loadSessions(): SessionData[];
    saveSession(session: SessionData): void;
}

export class SessionManagerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SessionManagerError";
    }
}