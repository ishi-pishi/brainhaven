import { PauseButton } from "../components/pomodoroSession/PauseButton";
import TimerDisplay from "../components/pomodoroSession/TimerDisplay";

export function TimerPage() {
  return (
    <div className="">
      <TimerDisplay />
      <PauseButton />
    </div>
  );
}