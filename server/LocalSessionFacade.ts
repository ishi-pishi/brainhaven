import { ISessionFacade } from "./ISessionFacade";
import { SessionData } from "../shared/Types";

export class LocalSessionFacade implements ISessionFacade {
    loadSessions(): SessionData[] {
        // TODO
        return [];
    }

    saveSession(session: SessionData): void {
        // TODO
    }
}