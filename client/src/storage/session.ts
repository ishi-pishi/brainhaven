import { createStudySession, myStudySessions } from "@dataconnect/generated";

export type StudySession = {
  id?: string; // null if creating session now
  subjectId: string;
  subject?: string;
  status?: string;
  startTime: string;
  endTime: string;
  workBlockMs: number;
  breakBlockMs: number;
  intendedCycles?: number;
  productivityRating?: number;
  reflections?: string;
  earnedCurrency: number;
};

// Saves a completed study session to the database.
export async function saveSession(session: StudySession) {
  return await createStudySession({
    subjectId: session.subjectId,
    startTime: session.startTime,
    endTime: session.endTime,
    workBlockMs: session.workBlockMs,
    breakBlockMs: session.breakBlockMs,
    intendedCycles: session.intendedCycles ?? null,
    earnedCurrency: session.earnedCurrency,
    productivityRating: session.productivityRating ?? null,
    reflections: session.reflections ?? null,
  });
}

// Gets all of user's sessions
export async function getSessions(): Promise<StudySession[]> {
  const { data } = await myStudySessions();

  return data.studySessions.map((s) => ({
    id: s.id,
    subjectId: s.subject?.id ?? "NO-ID",
    subject: s.subject?.name ?? "Unknown",
    status: "finished",
    startTime: s.startTime,
    endTime: s.endTime,
    workBlockMs: s.workBlockMs,
    breakBlockMs: s.breakBlockMs,
    intendedCycles: s.intendedCycles || undefined,
    productivityRating: s.productivityRating || undefined,
    reflections: s.reflections || undefined,
    earnedCurrency: s.earnedCurrency,
  }));
}
