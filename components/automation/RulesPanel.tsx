"use client";

import { Panel } from "@/components/ui/Panel";
import { Pill } from "@/components/ui/Pill";
import { Switch } from "@/components/ui/Switch";
import { useRoom } from "@/lib/store";
import { RuleText } from "./RuleText";

export function RulesPanel() {
  const { state, toggleRule } = useRoom();
  const enabledCount = state.rules.filter((r) => r.enabled).length;

  return (
    <Panel
      number="02"
      title="Rules"
      tag={`${enabledCount} / ${state.rules.length} active`}
      className="lg:col-span-2 lg:row-span-2"
      bodyClassName=""
    >
      {state.mode === "manual" && (
        <p
          role="status"
          className="m-4 mb-0 rounded border border-border bg-inset px-3 py-2.5 text-xs text-warn"
        >
          Auto mode is paused. Rules won&apos;t run until you switch back to AUTO.
        </p>
      )}

      <ul>
        {state.rules.map((rule) => (
          <li
            key={rule.id}
            className="flex items-start gap-4 border-b border-border px-4 py-4 last:border-b-0"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-medium text-fg">{rule.id}</span>
                <Pill tone={rule.enabled ? "accent" : "muted"}>
                  {rule.enabled ? "Active" : "Disabled"}
                </Pill>
              </div>
              <div className="mt-2.5">
                <RuleText rule={rule} dimmed={!rule.enabled} />
              </div>
              <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                {rule.lastTriggered ? `Last triggered ${rule.lastTriggered}` : "Never triggered"}
              </p>
            </div>
            <Switch
              checked={rule.enabled}
              onChange={() => toggleRule(rule.id)}
              label={`Enable ${rule.id}`}
            />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
