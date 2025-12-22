import { useState, useEffect } from "react";
import { ActiveSession } from "../../logic/timer/ActiveSession";

export function CurrentBlockDisplay() {
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    const session = ActiveSession.getInstance();
    if (!session) return;

    // Update immediately
    setLabel(session.getCurrentBlockLabel());

    // Poll every 500ms
    const interval = setInterval(() => {
      setLabel(session.getCurrentBlockLabel());
    }, 500);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="text-xl font-semibold text-text">
      Progress: {label}
    </div>
  );
}
