import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from "@dataconnect/generated";
import { auth } from "@/lib/firebase";

// Signs up a user given email and password.
// Adds them both to auth AND to the database.
export async function signupWithEmail(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
    await createUser({ displayName: "placeholder display name" });
}