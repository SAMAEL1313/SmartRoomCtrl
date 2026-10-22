import { Zap, type LucideIcon } from "lucide-react";
import type { Mode } from "@/lib/types";

/** Shared by Overview's Control mode panel and the Automation page */
export const MODE_OPTIONS: { value: Mode; label: string; icon?: LucideIcon }[] = [
  { value: "auto", label: "Auto", icon: Zap },
  { value: "manual", label: "Manual" },
];

export function modeDescription(mode: Mode): string {
  return mode === "auto"
    ? "Light responds to ambient light and occupancy."
    : "Light is controlled manually.";
}
