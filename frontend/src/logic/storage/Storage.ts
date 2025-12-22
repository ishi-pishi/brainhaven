import type { SessionData } from "react-router-dom";

/**
 * Class to store and load Session data (using local storage for now)
 */
export class SessionStorage {
  static saveSession(session: SessionData) {
    localStorage.setItem(session.id, JSON.stringify(session));
  }

  static loadSession(id: string): SessionData | null {
    const data = localStorage.getItem(id);
    return data ? JSON.parse(data) : null;
  }

  static getAllSessions(): SessionData[] {
    return Object.keys(localStorage)
      .map((key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      })
      .filter((s): s is SessionData => s !== null);
  }

  static deleteSession(id: string) {
    localStorage.removeItem(id);
  }
}
