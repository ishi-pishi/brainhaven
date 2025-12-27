// Represents a single work or break block
export interface BlockData {
  id: string;
  type: "work" | "break";
  durationMs: number;
  tags: string[];
  productivityRating?: number;
}

// Represents a full pomodoro session with its work blocks and break blocks
export interface SessionData {
  id: string;
  startedAt: number;
  finishedAt?: number;
  blocks: BlockData[];
  remarks?: string;
}

// Map of sessions keyed by their ids
export type SessionMap = Record<string, SessionData>;