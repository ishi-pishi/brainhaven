import { useState, useEffect } from "react";
import { TimerManager } from "./TimerManager";

export default function TimerDisplay() {
  const [timeLeftMs, setTimeLeftMs] = useState(0);
  const timerManager = TimerManager.getInstance();

  useEffect(() => {
    const tickHandler = (msLeft: number) => setTimeLeftMs(msLeft);
    timerManager.setTickCallback(tickHandler);

    // TEMP: start a timer for testing
    timerManager.startTimer(20_000); // 10 seconds

    return () => timerManager.setTickCallback(() => { });
  }, [timerManager]);

  return (
    <div className="text-5xl font-bold text-center p-6">
      {formatTime(timeLeftMs)}
    </div>
  );
}


// Helper
const MS_PER_MINUTE = 60_000;
const MS_PER_SECOND = 1_000;

function formatTime(ms: number): string {
  const minutes = Math.floor(ms / MS_PER_MINUTE)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((ms % MS_PER_MINUTE) / MS_PER_SECOND)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}