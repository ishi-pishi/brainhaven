import { useDisableScroll } from "@/hooks/smallHooks";
import { SettingsMenu } from "@/components/TimerSettings/SettingsMenu";

/**
 *  This is a page component which renders the SettingsMenu component centered on the screen.
*/
export function SettingsMenuPage() {
  useDisableScroll();
  
  return (
    <div className="flex justify-center items-center h-screen">
      <SettingsMenu />
    </div>
  );
}