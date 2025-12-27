import { ISessionManager, SessionManagerError } from "./ISessionManager";
import { SessionData, SessionMap } from "../../shared/Types";
import fs from "fs";

export class LocalSessionFacade implements ISessionManager {
    private FILE_PATH = "./sessions.json";

    async loadSessions(): Promise<SessionMap> {
        if (!fs.existsSync(this.FILE_PATH)) return {};
        const raw = fs.readFileSync(this.FILE_PATH, "utf-8");
        return JSON.parse(raw) as SessionMap;
    }

    async loadSessionById(id: string): Promise<SessionData> {
        const sessions = await this.loadSessions();
        return sessions[id];
    }

    async saveSession(newSession: SessionData): Promise<void> {
        const sessions = await this.loadSessions();
        sessions[newSession.id] = newSession;
        await fs.writeFileSync(this.FILE_PATH, JSON.stringify(sessions));
    }
}