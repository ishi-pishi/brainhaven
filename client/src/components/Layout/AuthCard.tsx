import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function AuthCard({ mode }: { mode: "login" | "signup" }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="text-sm px-2 py-1 rounded-md hover:underline transition-colors"
                    type="button"
                >
                    {mode === "login" ? "Login" : "Sign Up"}
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[400px] p-6">
                <div className="flex flex-col gap-6">
                    <header className="mb-4">
                        <h2 className="text-lg font-semibold">
                            {mode === "login" ? "Login to your account" : "Create an account"}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {mode === "login"
                                ? "Enter your email below to login."
                                : "Enter your email below to sign up."}
                        </p>
                    </header>

                    <form className="flex flex-col gap-4">
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
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {mode === "login" && (
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            {mode === "login" ? "Login" : "Sign Up"}
                        </Button>

                        <Button variant="outline" className="w-full">
                            {mode === "login" ? "Login with Google" : "Sign up with Google"}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
