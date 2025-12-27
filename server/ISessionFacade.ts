import { SessionData, BlockData } from "../shared/Types"

export interface ISessionFacade {
    loadSessions(): SessionData[];
    saveSession(session: SessionData): void;
}