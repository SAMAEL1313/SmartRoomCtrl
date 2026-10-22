import type { Tone } from "@/lib/types";

const PILL_TONES: Record<Tone, string> = {
  accent: "border-accent/30 bg-accent-soft text-accent",
  warn: "border-warn/30 bg-warn/10 text-warn",
  danger: "border-danger/30 bg-danger/10 text-danger",
  fg: "border-border bg-surface text-fg",
  muted: "border-border bg-surface text-muted",
};

type PillProps = {
  tone?: Tone;
  children: React.ReactNode;
};

export function Pill({ tone = "muted", children }: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] ${PILL_TONES[tone]}`}
    >
      {children}
    </span>
  );
}
