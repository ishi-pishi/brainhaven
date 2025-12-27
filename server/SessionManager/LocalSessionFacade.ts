import { ISessionManager, SessionManagerError } from "./ISessionManager";
import { SessionData } from "../../shared/Types";
import fs from "fs";

export class LocalSessionFacade implements ISessionManager {
    private FILE_PATH = "./sessions.json";

    loadSessions(): SessionData[] {
        if (!fs.existsSync(this.FILE_PATH)) return [];
        const raw = fs.readFileSync(this.FILE_PATH, "utf-8");
        return JSON.parse(raw) as SessionData[];
    }

    saveSession(session: SessionData): void {
        const sessions = this.loadSessions();
        sessions.push(session);
        fs.writeFileSync(this.FILE_PATH, JSON.stringify(session));
    }
}