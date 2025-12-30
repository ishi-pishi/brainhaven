import { useDisableScroll } from "@/hooks/smallHooks";
import { SettingsMenu } from "@/components/TimerSettings/SettingsMenu";

export function SettingsMenuPage() {
  useDisableScroll();
  
  return (
    <div className="flex justify-center items-center h-screen">
      <SettingsMenu />
    </div>
  );
}