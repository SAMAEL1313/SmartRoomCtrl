"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { StatusDot } from "@/components/ui/StatusDot";
import { useRoom } from "@/lib/store";
import { ActivityFilters } from "./ActivityFilters";
import { ActivityList, ActivityTable } from "./ActivityEvents";
import { filterEvents, groupByDay, type SourceFilter, type TypeFilter } from "./filters";

export function ActivityLog() {
  const { state } = useRoom();
  const [type, setType] = useState<TypeFilter>("all");
  const [source, setSource] = useState<SourceFilter>("all");

  const filtered = useMemo(
    () => filterEvents(state.activity, type, source),
    [state.activity, type, source]
  );
  const groups = useMemo(() => groupByDay(filtered), [filtered]);

  const resetFilters = () => {
    setType("all");
    setSource("all");
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Activity log</h1>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "event" : "events"}
        </span>
      </div>

      <div className="grid gap-3">
        <ActivityFilters
          type={type}
          source={source}
          onTypeChange={setType}
          onSourceChange={setSource}
        />

        <Panel
          number="02"
          title="Events"
          tag={
            <span className="flex items-center gap-1.5">
              <StatusDot tone="accent" />
              Live
            </span>
          }
          bodyClassName=""
        >
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-4 py-14 text-center">
              <SearchX className="size-6 text-muted" aria-hidden />
              <p className="text-sm text-muted">No events match these filters</p>
              <Button variant="outline" onClick={resetFilters}>
                Reset filters
              </Button>
            </div>
          ) : (
            <>
              <ActivityTable groups={groups} />
              <ActivityList groups={groups} />
            </>
          )}
        </Panel>
      </div>
    </div>
  );
}
