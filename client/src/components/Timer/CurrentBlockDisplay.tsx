import { useState, useEffect } from "react";
import { ActiveSession } from "../../logic/timer/ActiveSession";

/**
 *  Component that describes the current block.
 *  E.g., Focus (Cycle 1/2)
 *  or Break (Cycle 2/2)
 */
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
      <div className="text-2xl font-normal">{label}</div>
      <div>{cycle}</div>
    </div>
  );
}
