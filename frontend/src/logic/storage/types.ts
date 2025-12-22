export interface TimeBlockData {
  id: string;
  type: "work" | "break";
  durationMs: number;
  tags: string[];
  startedAt: number;
  endedAt?: number;
}

export interface SessionData {
  id: string;
  startedAt: number;
  finishedAt?: number;
  blocks: TimeBlockData[];
}