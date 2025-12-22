import { PauseButton } from "./PauseButton";
import TimerDisplay from "./TimerDisplay";

export function TimerSection() {
  return (
    <div className="flex flex-col items-center">
        <TimerDisplay />
        <PauseButton />
    </div>
  );
}
