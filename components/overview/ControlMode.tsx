"use client";

import { MODE_OPTIONS, modeDescription } from "@/components/automation/mode";
import { RuleText } from "@/components/automation/RuleText";
import { Panel } from "@/components/ui/Panel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useRoom } from "@/lib/store";

export function ControlMode() {
  const { state, setMode } = useRoom();
  const rule = state.rules.find((r) => r.id === "RULE-01");

  return (
    <Panel number="02" title="Control mode" tag="RULE-01">
      <SegmentedControl
        options={MODE_OPTIONS}
        value={state.mode}
        onChange={setMode}
        ariaLabel="Control mode"
        fullWidth
      />

      <p className="mt-3 text-xs text-muted">{modeDescription(state.mode)}</p>

      {rule && (
        <div className="mt-4">
          <RuleText rule={rule} dimmed={state.mode !== "auto"} />
        </div>
      )}
    </Panel>
  );
}
