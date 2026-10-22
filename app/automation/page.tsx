import { ModePanel } from "@/components/automation/ModePanel";
import { RulesPanel } from "@/components/automation/RulesPanel";
import { ThresholdsPanel } from "@/components/automation/ThresholdsPanel";

export default function AutomationPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Automation</h1>
      <p className="mb-6 mt-1 text-sm text-muted">
        Rules that control the studio light automatically.
      </p>

      <div className="grid items-start gap-3 lg:grid-cols-3">
        <RulesPanel />
        <ModePanel />
        <ThresholdsPanel />
      </div>
    </div>
  );
}
