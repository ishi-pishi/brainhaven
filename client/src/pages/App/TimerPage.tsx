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
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (session && !session.isFinished()) {
        e.preventDefault();
        e.returnValue = ""; // It's deprecated, but I don't know how else to do it
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [session])

  useEffect(() => {
    if (!session) return;

    const checkFinished = () => {
      if (session.isFinished()) {
        navigate("/endsession", { replace: true });
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
    <div className="fixed inset-0 flex justify-center items-center">
      <TimerSection />
    </div>
  );
}
