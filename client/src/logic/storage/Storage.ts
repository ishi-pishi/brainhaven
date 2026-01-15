import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from "@dataconnect/generated";
import { auth } from "@/lib/firebase";

export async function signupWithEmail(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
    await createUser({ displayName: "placeholder display name" });
}