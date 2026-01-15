import { useState } from "react";
import { TimerManager } from "../../logic/timer/TimerManager";

import { Button } from "../ui/button";

/**
 *  Component for pausing or resuming the timer.
 */
export function PauseButton() {
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = () => {
    setIsPaused(prev => !prev);
    const timer = TimerManager.getInstance()
    if (!isPaused) {
      timer.pause();
    } else {
      timer.resumeTimer();
    }
  };

  return (
    <Button onClick={handleClick} className="w-20">
      {isPaused ? "Play" : "Pause"}
    </Button>
  );
}
