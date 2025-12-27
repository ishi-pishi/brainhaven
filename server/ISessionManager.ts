import { SessionData, BlockData } from "../shared/Types"

export interface ISessionFacade {
    loadSessions(): SessionData[];
    saveSession(session: SessionData): void;
}

export class SessionManagerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SessionManagerError";
    }
}