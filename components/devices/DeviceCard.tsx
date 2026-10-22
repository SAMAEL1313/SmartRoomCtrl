"use client";

import { Cpu, Lightbulb, Plug, ScanLine, Sun, type LucideIcon } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { StatusDot } from "@/components/ui/StatusDot";
import { Switch } from "@/components/ui/Switch";
import { TONE_TEXT } from "@/components/ui/tone";
import { formatWatts } from "@/lib/format";
import { useRoom } from "@/lib/store";
import type { Device, Tone } from "@/lib/types";

const DEVICE_ICONS: Record<string, LucideIcon> = {
  "LGT-01": Lightbulb,
  "PIR-01": ScanLine,
  "LUX-01": Sun,
  "PLG-02": Plug,
};

type Reading = {
  value: string;
  tone: Tone;
  secondary: string;
  secondaryTone?: Tone;
};

export function DeviceCard({ device }: { device: Device }) {
  const { state, isDark, setLight } = useRoom();
  const online = device.status === "connected";
  const Icon = DEVICE_ICONS[device.id] ?? Cpu;

  const reading = ((): Reading => {
    if (!online) return { value: "—", tone: "muted", secondary: "No signal" };
    switch (device.id) {
      case "LGT-01":
        return {
          value: state.lightOn ? "ON" : "OFF",
          tone: state.lightOn ? "accent" : "muted",
          secondary: formatWatts(state.powerDraw),
        };
      case "PIR-01":
        return {
          value: state.occupancy ? "DETECTED" : "VACANT",
          tone: state.occupancy ? "accent" : "muted",
          secondary: "Motion",
        };
      case "LUX-01":
        return {
          value: `${state.ambientLux} lx`,
          tone: "fg",
          secondary: isDark ? "Dark" : "Bright",
          secondaryTone: isDark ? "warn" : "accent",
        };
      default:
        return { value: "—", tone: "muted", secondary: "No signal" };
    }
  })();

  return (
    <article
      aria-label={`${device.id} ${device.name}`}
      className={`flex min-w-0 flex-col rounded-md border border-border p-4 ${online ? "bg-surface" : "bg-inset"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className={`size-4 ${online ? "text-fg" : "text-muted"}`} aria-hidden />
          <span className="font-mono text-xs font-medium text-fg">{device.id}</span>
        </div>
        <Pill tone={online ? "accent" : "danger"}>{online ? "Connected" : "Offline"}</Pill>
      </div>

      <div className="mt-4">
        <h2 className={`text-sm ${online ? "text-fg" : "text-muted"}`}>{device.name}</h2>
        <p className="mt-0.5 text-xs text-muted">{device.type}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className={`font-mono text-2xl font-medium tracking-tight ${TONE_TEXT[reading.tone]}`}>
          {reading.value}
        </span>
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.1em] ${TONE_TEXT[reading.secondaryTone ?? "muted"]}`}
        >
          {reading.secondary}
        </span>
      </div>

      <div className="mt-4 flex min-h-5 items-center justify-between gap-3 border-t border-border pt-3">
        <span className="flex items-center gap-2 text-xs text-muted">
          <StatusDot tone={online ? "accent" : "danger"} />
          Last seen {device.lastSeen}
        </span>
        {online && device.id === "LGT-01" && (
          <Switch
            checked={state.lightOn}
            onChange={setLight}
            label="Toggle studio ceiling light"
          />
        )}
      </div>
    </article>
  );
}
