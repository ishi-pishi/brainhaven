import { AuthCard } from "@/components/Auth/Login";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

/**
 *  This is the landing page before users are signed in.
 */
export function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4 overflow-hidden">
      {/* Decorative Pastel Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse duration-10000" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-accent/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-7xl md:text-8xl font-serif font-bold mb-6 text-center text-primary drop-shadow-sm flex items-center gap-4">
          🧠 brainhaven
        </h1>
        <p className="text-2xl md:text-3xl text-center mb-12 text-muted-foreground font-medium max-w-2xl">
          Your cozy little corner for deep productivity.
        </p>

        <LoginButton />
      </div>
    </div>
  );
}

export function LoginButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button 
        size="lg" 
        className="text-lg px-8 py-6 rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all" 
        onClick={() => setOpen(true)}
      >
        Step Inside ✨
      </Button>

      <AuthCard open={open} onOpenChange={setOpen} />
    </>
  );
}
