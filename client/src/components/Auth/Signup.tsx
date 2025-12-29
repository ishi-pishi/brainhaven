import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpCard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Signed up!");
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div className="max-w-sm p-6 border rounded-lg shadow-md flex flex-col gap-6">
            <header className="mb-4">
                <h2 className="text-lg font-semibold">Create an account</h2>
                <p className="text-sm text-muted-foreground">
                    Enter your email and password to sign up.
                </p>
            </header>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
            </form>
        </div>
    );
}
