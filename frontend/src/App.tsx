import { useEffect } from "react";

import TimerDisplay from "./components/pomodoroSession/TimerDisplay";
import { ActiveSession } from "./logic/timer/ActiveSession";
import { SessionSettings } from "./logic/timer/SessionSettings";

export default function App() {
  useEffect(() => {
    const settings = new SessionSettings(10*1000, 5*1000, 2);
    const session = new ActiveSession(settings);
    session.start(); // starts the first block internally
  }, []);
  
  return (
    <div className="">
      <TimerDisplay />
    </div>
  );
}
