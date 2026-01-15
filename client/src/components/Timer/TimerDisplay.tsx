import { useState, useEffect, useRef } from "react";
import { TimerManager } from "../../logic/timer/TimerManager";
import { ActiveSession } from "../../logic/timer/ActiveSession";
import { CurrentBlockDisplay } from "./CurrentBlockDisplay";
import { formatTime } from "../../logic/timer/utils";

/**
 *  Displays the timer and bar itself which visibly updates as time elapses.
 */
export default function TimerDisplay() {
  const [timeLeftMs, setTimeLeftMs] = useState(0);
  const [totalMs, setTotalMs] = useState(0);
  const timerManager = TimerManager.getInstance();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const session = ActiveSession.getInstance();
    if (session) {
      const updateTotalMs = () => {
        const block = (session as any)?.bq?.current?.();
        const duration = block?.getDuration?.() ?? 0;
        setTotalMs(duration);
      };
      updateTotalMs();
      const listener = () => updateTotalMs();
      (session as any).addListener?.(listener);
      return () => {
        // @ts-ignore
        (session as any).removeListener?.(listener);
      };
    }
  }, []);

  useEffect(() => {
    const unsubscribe = timerManager.addTickListener(setTimeLeftMs);
    return () => unsubscribe();
  }, [timerManager]);

  const fraction = totalMs ? Math.max(0, Math.min(1, timeLeftMs / totalMs)) : 0;
  const fullArc = 270;
  const startAngle = 225;

  const radius = containerRef.current ? containerRef.current.offsetWidth / 2 - 8 : 60;
  const strokeWidth = 6;

  return (
    <div ref={containerRef} className="relative w-50 aspect-square">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={describeArc(radius + strokeWidth, radius + strokeWidth, radius, startAngle, startAngle + fullArc)}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={describeArc(radius + strokeWidth, radius + strokeWidth, radius, startAngle, startAngle + fullArc * fraction)}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-5xl">
        {formatTime(timeLeftMs)}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/8">
        <CurrentBlockDisplay />
      </div>
    </div>
  );
}

/**
 *  This is a function that descirbes the arc path which represents the timer.
 *  It represents an arc which contains the timer.
 * 
 *   x and y are the center coordinates of the circle (to place it), the radius
 *   is the radius of the circle, and the angle of each side of the arc.
 */
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const diff = Math.abs(endAngle - startAngle);
  const largeArcFlag = diff <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

/** 
 *  This converts the polar coordinates to cartesian coordinates.
 *  This just allows the arc to be displayed on the screen, since SVG uses cartesian coordinates.
*/
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return { x: centerX + radius * Math.cos(angleInRadians), y: centerY + radius * Math.sin(angleInRadians) };
}
