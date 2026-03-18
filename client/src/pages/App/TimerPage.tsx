import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDisableScroll } from "@/hooks/smallHooks";
import { ActiveSession } from "@/logic/timer/ActiveSession";
import { TimerSection } from "@/components/Timer/TimerSection";
import { FocusTodoList } from "@/components/Timer/FocusTodoList";
import { SpotifyEmbed } from "@/components/Timer/SpotifyEmbed";

import beep from "@/assets/beep.mp3";

/**
 *  This component is a page containing all the timer componets.
 */
export function TimerPage() {
  const navigate = useNavigate();
  const session = ActiveSession.getInstance();
  useDisableScroll();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (session && !session.isFinished()) {
        e.preventDefault();
        e.returnValue = ""; // It's deprecated, but I don't know how else to do it
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [session]);

  useEffect(() => {
    if (!session) return;

    const checkFinished = () => {
      if (session.isFinished()) {
        navigate("/endsession", { replace: true });
      }
    };

    const playSound = () => {
      const audio = new Audio(beep);
      audio.play();
    };

    session.addListener(checkFinished);
    session.addListener(playSound);
    return () => {};
  }, [session, navigate]);

  if (!session) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {/* Background patterns/effects can go here if needed */}
      
      {/* Absolute positioning for sidebar gadgets */}
      <div className="absolute left-8 bottom-8 z-10">
        <SpotifyEmbed />
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 h-auto">
        <FocusTodoList />
      </div>

      {/* Main Centered Timer */}
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <TimerSection />
      </div>
    </div>
  );
}
