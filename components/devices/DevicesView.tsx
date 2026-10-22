"use client";

import { useRoom } from "@/lib/store";
import { DeviceCard } from "./DeviceCard";
import { RoomSummary } from "./RoomSummary";

export function DevicesView() {
  const { state } = useRoom();
  const connected = state.devices.filter((d) => d.status === "connected").length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Devices</h1>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          {connected} / {state.devices.length} connected
        </span>
      </div>

      <div className="grid gap-3">
        <RoomSummary />
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {state.devices.map((device) => (
            <li key={device.id} className="grid">
              <DeviceCard device={device} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
