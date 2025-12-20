import { useEffect } from "react";

import TimerDisplay from "./components/pomodoroSession/TimerDisplay";
import { TimerManager } from "./components/pomodoroSession/TimerManager";

export default function App() {
  useEffect(() => {
    TimerManager.getInstance().startTimerSeconds(10);
  }, []);

  return (
    <div className="">
      <TimerDisplay />
    </div>
  );
}
