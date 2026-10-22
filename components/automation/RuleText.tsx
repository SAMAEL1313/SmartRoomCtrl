import { Fragment } from "react";
import { TONE_TEXT } from "@/components/ui/tone";
import type { Rule, Tone } from "@/lib/types";

type RuleTextProps = {
  rule: Rule;
  dimmed?: boolean;
};

export function RuleText({ rule, dimmed = false }: RuleTextProps) {
  // Dimmed rules switch every color to muted instead of lowering opacity,
  // so the text keeps AA contrast in both themes
  const tone = (t: Tone) => (dimmed ? "text-muted" : TONE_TEXT[t]);

  return (
    <div className="space-y-1.5 rounded border border-border bg-inset p-3 font-mono text-[11px]">
      <div>
        <span className="text-muted">IF </span>
        {rule.conditions.map((c, i) => (
          <Fragment key={c.label}>
            {i > 0 && <span className="text-muted"> + </span>}
            <span className={tone(c.tone)}>{c.label}</span>
          </Fragment>
        ))}
      </div>
      <div>
        <span className="text-muted">↳ </span>
        <span className={tone("fg")}>{rule.action}</span>
      </div>
    </div>
  );
}
