import { useState } from "react";
import { TimerManager } from "../../logic/timer/TimerManager";

export function PauseButton() {
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = () => {
    setIsPaused(prev => !prev);
    const timer = TimerManager.getInstance()
    if (!isPaused) {
        timer.pauseTimer();
    } else {
        timer.resumeTimer();
    }
  };

  return (
    <button onClick={handleClick}>
      {isPaused ? "▶" : "⏸"}
    </button>
  );
}
