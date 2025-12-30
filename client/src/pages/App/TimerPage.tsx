import { useEffect } from "react";
import { TimerSection } from "@/components/Timer/TimerSection";
import { ActiveSession } from "@/logic/timer/ActiveSession";
import { useNavigate } from "react-router-dom";

export function TimerPage() {
  const navigate = useNavigate();
  const session = ActiveSession.getInstance();

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <TimerSection />
    </div>
  );
}
