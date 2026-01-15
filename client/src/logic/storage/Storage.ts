import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUser, createStudySession } from "@dataconnect/generated";
import { auth } from "@/lib/firebase";
import type { StudySession } from "./Types";

// Signs up a user given email and password.
// Adds them both to auth AND to the database.
export async function signupWithEmail(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
    await createUser({ displayName: "placeholder display name" });
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