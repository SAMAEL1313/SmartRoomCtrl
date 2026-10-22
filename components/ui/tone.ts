import type { Tone } from "@/lib/types";

/** Text color for each tone, e.g. condition labels and status values */
export const TONE_TEXT: Record<Tone, string> = {
  accent: "text-accent",
  warn: "text-warn",
  danger: "text-danger",
  fg: "text-fg",
  muted: "text-muted",
};
