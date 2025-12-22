import { useState, useEffect } from "react";
import { ActiveSession } from "../../logic/timer/ActiveSession";

export function CurrentBlockDisplay() {
  const [label, setLabel] = useState<string>("");
  const [cycle, setCycle] = useState<string>("");

  useEffect(() => {
    const session = ActiveSession.getInstance();
    if (!session) return;

    const updateLabels = () => {
      setLabel(session.getCurrentBlockLabel());
      setCycle(session.getCurrentCycleLabel());
    };

    updateLabels();
    session.addBlockChangeListener(updateLabels);
  }, []);

  return (
    <div className="text-3xl font-semibold text-text flex flex-col items-center">
      <div>{label}</div>
      <div className="text-sm text-muted">{cycle}</div>
    </div>
  );
}
