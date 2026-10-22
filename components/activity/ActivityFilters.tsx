import { Label } from "@/components/ui/Label";
import { Panel } from "@/components/ui/Panel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { SOURCE_OPTIONS, TYPE_OPTIONS, type SourceFilter, type TypeFilter } from "./filters";

type ActivityFiltersProps = {
  type: TypeFilter;
  source: SourceFilter;
  onTypeChange: (type: TypeFilter) => void;
  onSourceChange: (source: SourceFilter) => void;
};

export function ActivityFilters({ type, source, onTypeChange, onSourceChange }: ActivityFiltersProps) {
  return (
    <Panel number="01" title="Filters">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <div className="min-w-0">
          <Label>Type</Label>
          {/* Scrolls on its own on narrow screens, so the page never does */}
          <div className="mt-2 overflow-x-auto">
            <SegmentedControl
              options={TYPE_OPTIONS}
              value={type}
              onChange={onTypeChange}
              ariaLabel="Filter by event type"
            />
          </div>
        </div>
        <div className="min-w-0">
          <Label>Source</Label>
          <div className="mt-2 overflow-x-auto">
            <SegmentedControl
              options={SOURCE_OPTIONS}
              value={source}
              onChange={onSourceChange}
              ariaLabel="Filter by source"
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
