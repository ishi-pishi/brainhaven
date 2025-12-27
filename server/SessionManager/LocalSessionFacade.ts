import { ISessionManager, SessionManagerError } from "./ISessionManager";
import { SessionData, SessionMap } from "../../shared/Types";
import fs from "fs";

export class LocalSessionFacade implements ISessionManager {
    private FILE_PATH = "./sessions.json";

    loadSessions(): SessionMap {
        if (!fs.existsSync(this.FILE_PATH)) return {};
        const raw = fs.readFileSync(this.FILE_PATH, "utf-8");
        return JSON.parse(raw) as SessionMap;
    }

    // loadSessionById(): SessionData {
    //     const sessions = this.loadSessions();
    //     return {};
    // }

    saveSession(newSession: SessionData): void {
        const sessions = this.loadSessions();
        sessions[newSession.id] = newSession;
        fs.writeFileSync(this.FILE_PATH, JSON.stringify(sessions));
    }
}