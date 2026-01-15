import { AuthCard } from "@/components/Auth/Login";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

/**
 *  This is the landing page before users are signed in.
*/
export function LandingPage() {
    const lineRef = useRef<SVGLineElement>(null);

    useEffect(() => {
        if (lineRef.current) {
            lineRef.current.style.strokeDasharray = `${lineRef.current.getTotalLength()}`;
            lineRef.current.style.strokeDashoffset = `${lineRef.current.getTotalLength()}`;
            lineRef.current.getBoundingClientRect(); // trigger layout
            lineRef.current.style.transition = "stroke-dashoffset 2s ease-out";
            lineRef.current.style.strokeDashoffset = "0";
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-4">
            {/* Hero Section */}
            <h1 className="text-6xl font-bold mb-4 text-center">Brainhaven</h1>
            <p className="text-xl text-center mb-8">
                Organize your thoughts. Focus your mind.
            </p>

            <LoginButton />

            {/* Minimal line-draw animation */}
            <svg width="150" height="150" className="mb-8">
                <line
                    ref={lineRef}
                    x1="0"
                    y1="75"
                    x2="150"
                    y2="75"
                    stroke="black"
                    strokeWidth="2"
                />
            </svg>

            {/* Placeholder for future sections */}
            <div className="mt-20 space-y-16">
                <div className="text-center opacity-50">Features coming soon...</div>
            </div>
        </div>
    );
}

export function LoginButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                className="text-sm cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Login
            </Button>

            <AuthCard open={open} onOpenChange={setOpen} />
        </>
    );
}