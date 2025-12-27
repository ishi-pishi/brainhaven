import { ISessionManager, NotFoundError, InvalidSessionError, SessionManagerError } from "./ISessionManager";
import { BlockData, SessionData, SessionMap } from "../../shared/Types";
import fs from "fs";

export class LocalSessionFacade implements ISessionManager {
    private FILE_PATH = "./sessions.json";

    async loadSessions(): Promise<SessionMap> {
        if (!fs.existsSync(this.FILE_PATH)) return {};

        try {
            const raw = fs.readFileSync(this.FILE_PATH, "utf-8");
            return JSON.parse(raw) as SessionMap;
        } catch {
            throw new SessionManagerError("Failed to load/parse sessions from JSON file");
        }    
    }

    async loadSessionById(id: string): Promise<SessionData> {
        const sessions = await this.loadSessions();
        const session = sessions[id]

        if (!session) {
            throw new NotFoundError("No session with id exists");
        }

        return session;
    }

    async saveSession(newSession: SessionData): Promise<void> {
        this.validateSession(newSession);

        const sessions = await this.loadSessions();
        sessions[newSession.id] = newSession;
        fs.writeFileSync(this.FILE_PATH, JSON.stringify(sessions));
    }

    private validateSession(session: any): asserts session is SessionData {
        if (!session || typeof session !== "object") {
            throw new InvalidSessionError("Session must be an object");
        }
        if (typeof session.id !== "string" || typeof session.startedAt !== "number" || !Array.isArray(session.blocks)) {
            throw new InvalidSessionError("Session missing required fields");
        }

        session.blocks.forEach((b: any) => this.validateBlock(b));
    }

    private validateBlock(block: any): asserts block is BlockData {
        if (
            !block ||
            typeof block !== "object" ||
            typeof block.id !== "string" ||
            (block.type !== "work" && block.type !== "break") ||
            typeof block.durationMs !== "number" ||
            !Array.isArray(block.tags)
        ) {
            throw new InvalidSessionError("Invalid block data");
        }
    }
}