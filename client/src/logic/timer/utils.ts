const MS_PER_SECOND = 1_000;
const SECOND_PER_MIN = 60;

/**
 *  This is a simple function to format time.
*/
export function formatTime(ms: number): string {
  const secondsLeft = Math.max(0, Math.ceil(ms / MS_PER_SECOND));
  const minutes = Math.floor(secondsLeft / SECOND_PER_MIN).toString().padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
