import type { ActivityEvent } from "@/lib/types";
import { ActivityIcon } from "./ActivityIcon";

type ActivityRowProps = {
  event: ActivityEvent;
  highlight?: boolean;
};

/** Stacked event row: Overview's Recent activity and the mobile Activity log */
export function ActivityRow({ event, highlight = false }: ActivityRowProps) {
  return (
    <li className="flex items-center gap-3 border-b border-border px-4 py-3">
      <ActivityIcon event={event} highlight={highlight} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] text-fg">{event.title}</div>
        <div className="mt-0.5 truncate font-mono text-[10px] text-muted">
          {event.source} · {event.detail}
        </div>
      </div>
      <time className="shrink-0 font-mono text-[11px] text-muted">{event.time}</time>
    </li>
  );
}
