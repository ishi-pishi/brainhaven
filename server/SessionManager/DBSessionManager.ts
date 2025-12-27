import Database from 'better-sqlite3';

import { ISessionManager, NotFoundError, InvalidSessionError, SessionManagerError } from './ISessionManager';
import { SessionData, SessionMap } from '../../shared/Types';

class DBSessionManager implements ISessionManager {
    loadSessions(): Promise<SessionMap> {
        throw new Error("This puppy ain't implemented yet!");
    }

    loadSessionById(id: string): Promise<SessionData> {
        throw new Error("This puppy ain't implemented yet!");
    }

    saveSession(session: SessionData): Promise<void> {
        throw new Error("This puppy ain't implemented yet!");
    }
}