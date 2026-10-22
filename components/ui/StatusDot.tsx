import type { Tone } from "@/lib/types";

const DOT_TONES: Record<Tone, string> = {
  accent: "bg-accent",
  warn: "bg-warn",
  danger: "bg-danger",
  fg: "bg-fg",
  muted: "bg-muted",
};

export function StatusDot({ tone = "muted" }: { tone?: Tone }) {
  return <span aria-hidden className={`inline-block size-1.5 shrink-0 rounded-full ${DOT_TONES[tone]}`} />;
}
