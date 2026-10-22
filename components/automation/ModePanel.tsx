"use client";

import { MODE_OPTIONS, modeDescription } from "./mode";
import { Panel } from "@/components/ui/Panel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useRoom } from "@/lib/store";

export function ModePanel() {
  const { state, setMode } = useRoom();

  return (
    <Panel number="01" title="Control mode" tag="MODE">
      <SegmentedControl
        options={MODE_OPTIONS}
        value={state.mode}
        onChange={setMode}
        ariaLabel="Control mode"
        fullWidth
      />
      <p className="mt-3 text-xs text-muted">{modeDescription(state.mode)}</p>
    </Panel>
  );
}
