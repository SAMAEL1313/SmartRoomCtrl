"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ActivityRow } from "@/components/activity/ActivityRow";
import { Panel } from "@/components/ui/Panel";
import { useRoom } from "@/lib/store";

export function RecentActivity() {
  const { state } = useRoom();
  const events = state.activity.slice(0, 5);

  return (
    <Panel number="04" title="Recent activity" tag="TODAY" bodyClassName="">
      <ul>
        {events.map((event, i) => (
          <ActivityRow key={event.id} event={event} highlight={i === 0} />
        ))}
      </ul>

      <Link
        href="/activity"
        className="flex items-center justify-between rounded-b-md px-4 py-3 text-xs text-muted transition-colors hover:bg-inset hover:text-fg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
      >
        View activity log
        <ArrowUpRight className="size-3.5" aria-hidden />
      </Link>
    </Panel>
  );
}
