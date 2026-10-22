"use client";

import { Label } from "@/components/ui/Label";
import { Panel } from "@/components/ui/Panel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Slider } from "@/components/ui/Slider";
import { useRoom } from "@/lib/store";

const VACANCY_OPTIONS = [1, 5, 10, 15].map((min) => ({
  value: String(min),
  label: `${min} min`,
}));

export function ThresholdsPanel() {
  const { state, isDark, setThreshold, setVacancyTimeout } = useRoom();

  return (
    <Panel number="03" title="Thresholds" tag="LUX-01">
      <Slider
        label="Ambient light activation threshold"
        value={state.threshold}
        onChange={setThreshold}
        min={0}
        max={200}
        step={5}
        unit="lx"
      />
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        Current reading {state.ambientLux} lx ·{" "}
        <span className={isDark ? "text-warn" : "text-accent"}>{isDark ? "Dark" : "Bright"}</span>
      </p>

      <div className="mt-6 border-t border-border pt-5">
        <Label>Vacancy timeout</Label>
        <div className="mt-3">
          <SegmentedControl
            options={VACANCY_OPTIONS}
            value={String(state.vacancyTimeout)}
            onChange={(v) => setVacancyTimeout(Number(v))}
            ariaLabel="Vacancy timeout"
            fullWidth
          />
        </div>
        <p className="mt-3 text-xs text-muted">
          Light switches off after the room has been vacant this long.
        </p>
      </div>
    </Panel>
  );
}
