import { useDisableScroll } from "@/hooks/smallHooks";
import { SettingsMenu } from "@/components/TimerSettings/SettingsMenu";

import { useNavigate } from "react-router-dom";
import { ActiveSession } from "@/logic/timer/ActiveSession";
import { useEffect } from "react";

/**
 *  This is a page component which renders the SettingsMenu component centered on the screen.
*/
export function SettingsMenuPage() {
  useDisableScroll();
  const navigate = useNavigate();

  useEffect(() => {
    if (ActiveSession.getInstance()?.hasStarted() && ActiveSession.getInstance()?.isFinished()) {
    navigate("/timer", { replace: true });
    return;
  }});

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <SettingsMenu />
    </div>
  );
}