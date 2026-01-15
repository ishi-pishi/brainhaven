import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUser, createStudySession, mySubjects, createSubject } from "@dataconnect/generated";
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

// Saves a subject to the database
export async function saveSubject(name: string) {
    if (await subjectNameAlreadyExists(name)) {
        throw new Error("Subject name already exists");
    }

    return await createSubject({ name });
}

// Returns a list of the names of the user's subjects in the database
export async function getSubjectNames() {
    const { data } = await mySubjects();
    return data.subjects.map(subject => subject.name);
}

// Checks if a subject name already exists in the database
// Returns true if it does, false if it doesn't
async function subjectNameAlreadyExists(name: string) {
    const { data } = await mySubjects();
    return !data.subjects.some(subject => subject.name.toLowerCase() === name.toLowerCase());
}