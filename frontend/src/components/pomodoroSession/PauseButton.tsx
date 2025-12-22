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
    <button onClick={handleClick}
      className="w-20 h-12 text-2xl rounded-lg bg-accent hover:bg-accent-2 transition-all duration-150 shadow-md flex items-center justify-center active:scale-95 active:translate-y-0.5"
    >
      {isPaused ? "▶" : "⏸"}
    </button>
  );
}
