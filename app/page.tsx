import { ControlMode } from "@/components/overview/ControlMode";
import { LightingControl } from "@/components/overview/LightingControl";
import { RecentActivity } from "@/components/overview/RecentActivity";
import { StatusCards } from "@/components/overview/StatusCards";

export default function OverviewPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Smart room control</h1>

      <div className="grid gap-3 lg:grid-cols-3">
        <StatusCards />
        <LightingControl />
        <ControlMode />
        <RecentActivity />
      </div>
    </div>
  );
}
