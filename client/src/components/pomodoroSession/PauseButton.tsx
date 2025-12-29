import { useState } from "react";
import { TimerManager } from "../../logic/timer/TimerManager";

import { Button } from "../ui/button";

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
    <Button onClick={handleClick} className="w-20">
      {isPaused ? "▶ Play" : "⏸ Pause"}
    </Button>
  );
}
