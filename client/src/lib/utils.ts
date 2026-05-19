import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** deterministic hash -> hue */
function hashToHue(str: string) {
  let h = 2167; // seed
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  // positive
  const hue = Math.abs(h) % 360;
  return hue;
}

export function subjectColor(subjectIdOrName: string) {
  const hue = hashToHue(subjectIdOrName);
  // Soft pastel: Saturation 45-60%, Lightness 75-85%
  const saturation = 50 + (hue % 10); 
  const lightness = 80 + (hue % 5);
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}
// force vite reload
