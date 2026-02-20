import { createStudySession } from "@dataconnect/generated";

export type StudySession = {
  subjectId: string
  startTime: string
  endTime: string
  workBlockMs: number
  breakBlockMs: number
  intendedCycles?: number
  productivityRating?: number
  reflections?: string
  earnedCurrency: number
}

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
