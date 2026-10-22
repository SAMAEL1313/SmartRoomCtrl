"use client";

import { Lightbulb, Moon, ScanLine } from "lucide-react";
import { StatusCard } from "@/components/ui/StatusCard";
import { formatWatts } from "@/lib/format";
import { useRoom } from "@/lib/store";

export function StatusCards() {
  const { state, isDark } = useRoom();

  return (
    <div className="grid gap-3 md:grid-cols-3 lg:col-span-3">
      <StatusCard
        label="Ambient light"
        icon={Moon}
        value={isDark ? "DARK" : "BRIGHT"}
        tone={isDark ? "warn" : "accent"}
        meta={`${state.ambientLux} lx`}
        caption={`${isDark ? "Below" : "Above"} the ${state.threshold} lx activation threshold`}
      />
      <StatusCard
        label="Occupancy"
        icon={ScanLine}
        value={state.occupancy ? "DETECTED" : "VACANT"}
        tone={state.occupancy ? "accent" : "muted"}
        meta="PIR-01"
        caption={state.occupancy ? "Motion detected · 8 seconds ago" : "No motion detected"}
      />
      <StatusCard
        label="Light"
        icon={Lightbulb}
        value={state.lightOn ? "ON" : "OFF"}
        tone={state.lightOn ? "accent" : "muted"}
        meta={formatWatts(state.powerDraw)}
        caption={`Ceiling light · Switched ${state.lightOn ? "on" : "off"} by ${state.lightSource}`}
      />
    </div>
  );
}
