interface TimeBlockData {
  id: string;
  type: "work" | "break";
  durationMs: number;
  tags: string[];
  startedAt: number;
  endedAt?: number;
  productivityRating?: number;
}

interface SessionData {
  id: string;
  startedAt: number;
  finishedAt?: number;
  blocks: TimeBlockData[];
  remarks?: string;
}
