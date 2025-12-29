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
    session.addListener(updateLabels);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-semibold">{label}</div>
      <div>{cycle}</div>
    </div>
  );
}
