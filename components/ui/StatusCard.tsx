import type { LucideIcon } from "lucide-react";
import type { Tone } from "@/lib/types";
import { Label } from "./Label";
import { TONE_TEXT } from "./tone";

type StatusCardProps = {
  label: string;
  icon: LucideIcon;
  value: string;
  tone: Tone;
  meta: string;
  caption: string;
};

export function StatusCard({ label, icon: Icon, value, tone, meta, caption }: StatusCardProps) {
  return (
    <div className="min-w-0 rounded-md border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Icon className="size-4 text-muted" aria-hidden />
      </div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className={`font-mono text-[22px] font-medium tracking-tight ${TONE_TEXT[tone]}`}>
          {value}
        </span>
        <span className="font-mono text-[11px] text-muted">{meta}</span>
      </div>
      <p className="mt-2 text-[11px] text-muted">{caption}</p>
    </div>
  );
}
