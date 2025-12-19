import { useState, useEffect } from "react";
import { TimerManager } from "./TimerManager";

export default function TimerDisplay() {
  const [timeLeftMs, setTimeLeftMs] = useState(0);
  const timerManager = TimerManager.getInstance();

  useEffect(() => {
    const unsubscribe = timerManager.addTickListener(setTimeLeftMs);

    return () => {
      unsubscribe();
    };
  }, [timerManager]);


  return (
    <div className="text-5xl font-bold text-center p-6">
      {formatTime(timeLeftMs)}
    </div>
  );
}

// formatting helper
const MS_PER_SECOND = 1_000;
const SECOND_PER_MIN = 60;

function formatTime(ms: number): string {
  const secondsLeft = Math.max(0, Math.ceil(ms / MS_PER_SECOND));
  const minutes = Math.floor(secondsLeft / SECOND_PER_MIN)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
