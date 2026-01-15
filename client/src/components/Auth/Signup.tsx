import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signupWithEmail } from "@/logic/storage/Storage";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    // CardFooter,
} from "@/components/ui/card";

/**
 *  Card component for sign up form (for new users)
 */
export function SignUpCard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const nav = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            signupWithEmail(email, password);
            nav("/dashboard");
        } catch (err: any) {
            alert("Error creating user: " + err.message);
        }
    };

    return (
        <Card className="max-w-sm w-full">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your email and password to sign up.
                </CardDescription>
            </CardHeader>

            <CardContent>
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

                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full mt-2" onClick={handleSubmit}>
                        Sign Up
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
