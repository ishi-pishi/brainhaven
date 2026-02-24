// src/components/auth/SignUpCard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Mail, Check, Loader2 } from "lucide-react";
import { signupWithEmail } from "../../storage/user";

import {
  getAuth,
  sendEmailVerification,
  applyActionCode,
  type User,
} from "firebase/auth";

export function SignUpCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"form" | "verify">("form");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [pasteValue, setPasteValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const nav = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    let t: number | undefined;
    if (resendCooldown > 0) {
      t = window.setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [resendCooldown]);

  const sendVerificationEmail = async (user: User) => {
    setSending(true);
    setError(null);
    try {
      await sendEmailVerification(user);
      setCurrentUser(user);
      setStep("verify");
      setResendCooldown(30);
    } catch (err: any) {
      setError(err?.message ?? "Failed to send verification email");
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const cred = await signupWithEmail(email, password);
      if (!cred.user) throw new Error("No user returned from Firebase.");
      await sendVerificationEmail(cred.user);
    } catch (err: any) {
      setError(err?.message ?? "Error creating user");
    } finally {
      setLoading(false);
    }
  };

  const checkIfVerified = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No active user - please sign in first.");
      await user.reload();
      if (user.emailVerified) {
        nav("/dashboard");
      } else {
        setError(
          "Email still not verified. Please click the link in your email and then press the button again.",
        );
      }
    } catch (err: any) {
      setError(err?.message ?? "Verification check failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    if (resendCooldown > 0) return;
    const user = auth.currentUser || currentUser;
    if (!user) {
      setError("No user signed in to resend verification for.");
      return;
    }
    setResendCooldown(30);
    await sendVerificationEmail(user);
  };

  const handlePasteVerify = async () => {
    setError(null);
    setLoading(true);
    try {
      const raw = pasteValue.trim();
      if (!raw) throw new Error("Paste the verification link or code here.");
      let oobCode = "";
      try {
        const url = new URL(raw);
        oobCode = url.searchParams.get("oobCode") ?? "";
      } catch (e) {
        oobCode = raw;
      }
      if (!oobCode)
        throw new Error("Could not find a verification code in that input.");
      await applyActionCode(auth, oobCode);
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          nav("/dashboard");
          return;
        }
      }
      setError(
        "Verification code applied. If you're signed-in here, press 'I clicked the link' to continue.",
      );
    } catch (err: any) {
      setError(err?.message ?? "Failed to apply verification code.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "form") {
    return (
      <Card className="max-w-sm w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="bg-muted px-2 py-1 rounded-md">
              <Mail className="h-4 w-4" />
            </div>
            <CardTitle>Create an account</CardTitle>
          </div>
          <CardDescription>
            Enter your email and a password to sign up.
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

            {error && <div className="text-sm text-destructive">{error}</div>}

            <Button
              type="submit"
              className="w-full mt-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" /> Creating...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="bg-muted px-2 py-1 rounded-md">
            <Check className="h-4 w-4" />
          </div>
          <CardTitle>Verify your email</CardTitle>
        </div>
        <CardDescription>
          We've sent a verification link to <strong>{email}</strong>. Click it
          to continue.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          {error && <div className="text-sm text-destructive">{error}</div>}

          <div className="flex gap-2">
            <Button onClick={checkIfVerified} disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                "I clicked the link"
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleResend}
              disabled={sending || resendCooldown > 0}
            >
              {resendCooldown > 0
                ? `Resend (${resendCooldown}s)`
                : sending
                  ? "Resending..."
                  : "Resend email"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
