import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AuthCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 *  Card Component showing login form
 */
export function AuthCard({ open, onOpenChange }: AuthCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // alert("Logged in!"); // Using redirect instead
      nav("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleSignUpClick = () => {
    window.location.href = "/signup";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-100 p-6">
        <div className="flex flex-col gap-6">
          <header className="mb-4">
            <h2 className="text-lg font-semibold">Log in to your account</h2>
            <p className="text-sm text-muted-foreground">
              Enter your email below to log in.
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
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
                onClick={async (e) => {
                  e.preventDefault();
                  setError(null);
                  setMessage(null);
                  if (!email) {
                    setError("Please enter your email above first.");
                    return;
                  }
                  try {
                    await sendPasswordResetEmail(auth, email);
                    setMessage("Password reset email sent! Check your inbox.");
                  } catch (err: any) {
                    console.error(err);
                    setError("Error sending reset email: " + err.message);
                  }
                }}
              >
                Forgot your password?
              </a>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="text-sm text-destructive">{error}</div>}
            {message && <div className="text-sm text-green-600 font-medium">{message}</div>}

            <Button type="submit" className="w-full cursor-pointer">
              Log In
            </Button>

            <div className="text-center mt-2">
              <span
                className="text-sm underline cursor-pointer"
                onClick={handleSignUpClick}
              >
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
