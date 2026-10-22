import type { ActivityEvent, Day, EventSource } from "@/lib/types";

export type TypeFilter = "all" | "light" | "occupancy" | "mode" | "rules";
export type SourceFilter = "all" | EventSource;

export const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "light", label: "Light" },
  { value: "occupancy", label: "Occupancy" },
  { value: "mode", label: "Mode" },
  { value: "rules", label: "Rules" },
];

export const SOURCE_OPTIONS: { value: SourceFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "AUTO", label: "Auto" },
  { value: "MANUAL", label: "Manual" },
  { value: "PIR-01", label: "PIR-01" },
];

function matchesType(event: ActivityEvent, filter: TypeFilter): boolean {
  if (filter === "all") return true;
  // RULES covers rule changes and setting changes
  if (filter === "rules") return event.type === "rule" || event.type === "setting";
  return event.type === filter;
}

export function filterEvents(
  events: ActivityEvent[],
  type: TypeFilter,
  source: SourceFilter
): ActivityEvent[] {
  return events.filter(
    (e) => matchesType(e, type) && (source === "all" || e.source === source)
  );
}

export type DayGroup = { day: Day; events: ActivityEvent[] };

/** Groups events by day, keeping the original (newest first) order */
export function groupByDay(events: ActivityEvent[]): DayGroup[] {
  const groups: DayGroup[] = [];
  for (const event of events) {
    const last = groups[groups.length - 1];
    if (last?.day === event.day) last.events.push(event);
    else groups.push({ day: event.day, events: [event] });
  }
  return groups;
}
