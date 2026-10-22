import {
  Lightbulb,
  ListChecks,
  Power,
  ScanLine,
  SlidersHorizontal,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ActivityEvent, EventType } from "@/lib/types";

const ICONS: Record<Exclude<EventType, "light">, LucideIcon> = {
  occupancy: ScanLine,
  mode: Zap,
  rule: ListChecks,
  setting: SlidersHorizontal,
};

type ActivityIconProps = {
  event: ActivityEvent;
  highlight?: boolean;
};

export function ActivityIcon({ event, highlight = false }: ActivityIconProps) {
  const lightOn = event.type === "light" && event.lightState === "on";
  const Icon =
    event.type === "light" ? (lightOn ? Lightbulb : Power) : ICONS[event.type];
  const color = lightOn || highlight ? "text-accent" : "text-muted";

  return <Icon className={`size-4 shrink-0 ${color}`} aria-hidden />;
}
