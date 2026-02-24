import { Navigate } from "react-router-dom";
import { ActiveSession } from "@/logic/timer/ActiveSession";

/**
 *  This protects the timer settings being shown if the timer is running;
 *  i.e., if a session is mid-progress, we redirect these pages to the timer
 */
export function TimerGuard({ children }: { children: React.ReactNode }) {
  const session = ActiveSession.getInstance();

  if (session && session.hasStarted() && !session.isFinished()) {
    return <Navigate to="/timer" replace />;
  }

  return <>{children}</>;
}

/**
 *  If the timer has NOT started, the timer element needs to forward to the settings
 *  menu element.
 */
export function NoTimerGuard({ children }: { children: React.ReactNode }) {
  const session = ActiveSession.getInstance();

  if (!session || !session.hasStarted() || session.isFinished()) {
    return <Navigate to="/timer-menu" replace />;
  }

  return <>{children}</>;
}
