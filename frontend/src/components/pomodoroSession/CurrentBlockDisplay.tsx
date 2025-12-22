import { useState, useEffect } from "react";
import { ActiveSession } from "../../logic/timer/ActiveSession";

export function CurrentBlockDisplay() {
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    const session = ActiveSession.getInstance();
    if (!session) return;

    const updateLabel = () => {
      setLabel(session.getCurrentBlockLabel());
    };

    updateLabel();
    session.addBlockChangeListener(updateLabel);
  }, []);

  return (
    <div className="text-xl font-semibold text-text">
      Progress: {label}
    </div>
  );
}
