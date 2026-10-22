"use client";

import { Label } from "@/components/ui/Label";
import { Panel } from "@/components/ui/Panel";
import { formatWatts } from "@/lib/format";
import { useRoom } from "@/lib/store";

export function RoomSummary() {
  const { state } = useRoom();
  const connected = state.devices.filter((d) => d.status === "connected").length;

  const stats = [
    { label: "Devices", value: String(state.devices.length) },
    { label: "Connected", value: String(connected) },
    { label: "Power draw", value: formatWatts(state.powerDraw) },
  ];

  return (
    <Panel number="01" title="Studio" tag="ROOM / 01" bodyClassName="">
      <dl className="grid grid-cols-3 divide-x divide-border">
        {stats.map(({ label, value }) => (
          <div key={label} className="px-3 py-3 sm:px-4 sm:py-4">
            <dt>
              <Label>{label}</Label>
            </dt>
            <dd className="mt-1.5 font-mono text-base text-fg sm:text-xl">{value}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
