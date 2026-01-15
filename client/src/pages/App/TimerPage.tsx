import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDisableScroll } from "@/hooks/smallHooks";

import { ActiveSession } from "@/logic/timer/ActiveSession";
import { TimerSection } from "@/components/Timer/TimerSection";

/**
 *  This component is a page containing all the timer componets.
 */
export function TimerPage() {
  const navigate = useNavigate();
  const session = ActiveSession.getInstance();
  useDisableScroll();

  useEffect(() => {
    if (!session) return;

    const checkFinished = () => {
      if (session.isFinished()) {
        navigate("/", { replace: true });
      }
    };

    session.addListener(checkFinished);
    return () => {
    };
  }, [session, navigate]);

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TimerSection />
    </div>
  );
}
