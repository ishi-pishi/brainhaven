import TimerDisplay from "./components/pomodoroSession/TimerDisplay";
import { SettingsMenu } from "./components/setSettings/settingsMenu";

export default function App() {
  return (
    <div className="">
      <SettingsMenu></SettingsMenu>
      <TimerDisplay></TimerDisplay>
    </div>
  );
}
