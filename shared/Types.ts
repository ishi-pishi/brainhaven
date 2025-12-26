export interface BlockData {
  id: string;
  type: "work" | "break";
  durationMs: number;
  tags: string[];
  productivityRating?: number;
}

export interface SessionData {
  id: string;
  startedAt: number;
  finishedAt?: number;
  blocks: BlockData[];
  remarks?: string;
}
