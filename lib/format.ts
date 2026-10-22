import type { Day } from "./types";

const pad = (n: number) => String(n).padStart(2, "0");

/** 18:37:12 */
export function formatTime(date: Date): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

/** "Today" / "Yesterday" */
export function dayLabel(day: Day): string {
  return day === "today" ? "Today" : "Yesterday";
}

/** 12.4 W, or 0 W when off */
export function formatWatts(watts: number): string {
  return watts === 0 ? "0 W" : `${watts.toFixed(1)} W`;
}