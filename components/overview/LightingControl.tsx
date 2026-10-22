"use client";

import { Lightbulb, Power } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Panel } from "@/components/ui/Panel";
import { Pill } from "@/components/ui/Pill";
import { StatusDot } from "@/components/ui/StatusDot";
import { formatWatts } from "@/lib/format";
import { useRoom } from "@/lib/store";

export function LightingControl() {
  const { state, setLight } = useRoom();
  const { lightOn, lastCommand } = state;
  const light = state.devices.find((d) => d.id === "LGT-01");
  const connected = light?.status === "connected";

  return (
    <Panel
      number="01"
      title="Lighting control"
      tag="LGT-01 / RELAY"
      className="lg:col-span-2"
      footer={
        <>
          <span>
            Last command <span className="text-fg">/ {lastCommand.label}</span>
          </span>
          <span>{lastCommand.time}</span>
        </>
      }
    >
      <div className="rounded border border-border bg-inset p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-xs text-fg">{light?.name ?? "LGT-01"}</span>
          <Pill tone={connected ? "accent" : "danger"}>{connected ? "Connected" : "Offline"}</Pill>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lightbulb
              className={`size-6 ${lightOn ? "text-accent" : "text-muted"}`}
              aria-hidden
            />
            <span className="font-mono text-[28px] font-medium leading-none tracking-tight text-fg">
              {lightOn ? "ON" : "OFF"}
            </span>
          </div>
          <div className="text-right">
            <Label>Power draw</Label>
            <div className="mt-1 font-mono text-sm text-fg">{formatWatts(state.powerDraw)}</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <Button
            variant={lightOn ? "primary" : "outline"}
            icon={Power}
            aria-pressed={lightOn}
            onClick={() => setLight(true)}
          >
            Light on
          </Button>
          <Button
            variant={lightOn ? "outline" : "primary"}
            icon={Power}
            aria-pressed={!lightOn}
            onClick={() => setLight(false)}
          >
            Light off
          </Button>
        </div>

        <p className="mt-3 text-[11px] text-muted">
          Manual controls pause auto until the room is vacant.
        </p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        <li className="flex items-center gap-2">
          <StatusDot tone={lightOn ? "accent" : "muted"} />
          Light active
        </li>
        <li className="flex items-center gap-2">
          <StatusDot tone="muted" />
          PIR sensor
        </li>
      </ul>
    </Panel>
  );
}
