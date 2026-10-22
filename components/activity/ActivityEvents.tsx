import { Label } from "@/components/ui/Label";
import { Pill } from "@/components/ui/Pill";
import { dayLabel } from "@/lib/format";
import { ActivityIcon } from "./ActivityIcon";
import { ActivityRow } from "./ActivityRow";
import type { DayGroup } from "./filters";

function DayCount({ count }: { count: number }) {
  return (
    <span className="ml-2 font-mono text-[10px] text-muted">
      {count} {count === 1 ? "event" : "events"}
    </span>
  );
}

/** Desktop (md and up): one table, one tbody per day */
export function ActivityTable({ groups }: { groups: DayGroup[] }) {
  return (
    <table className="hidden w-full border-collapse text-left md:table">
      <thead>
        <tr className="border-b border-border">
          <th scope="col" className="w-10 py-2.5 pl-4">
            <span className="sr-only">Type</span>
          </th>
          {["Event", "Source", "Detail"].map((h) => (
            <th key={h} scope="col" className="px-3 py-2.5 font-normal">
              <Label>{h}</Label>
            </th>
          ))}
          <th scope="col" className="py-2.5 pr-4 text-right font-normal">
            <Label>Time</Label>
          </th>
        </tr>
      </thead>

      {groups.map(({ day, events }) => (
        <tbody key={day}>
          <tr className="border-b border-border bg-inset">
            <th scope="rowgroup" colSpan={5} className="px-4 py-2 text-left font-normal">
              <Label>{dayLabel(day)}</Label>
              <DayCount count={events.length} />
            </th>
          </tr>
          {events.map((event) => (
            <tr
              key={event.id}
              className="border-b border-border transition-colors last:border-b-0 hover:bg-inset"
            >
              <td className="py-3 pl-4">
                <ActivityIcon event={event} />
              </td>
              <td className="px-3 py-3 text-[13px] text-fg">{event.title}</td>
              <td className="px-3 py-3">
                <Pill tone="muted">{event.source}</Pill>
              </td>
              <td className="px-3 py-3 text-xs text-muted">{event.detail}</td>
              <td className="py-3 pr-4 text-right font-mono text-[11px] text-muted">
                <time>{event.time}</time>
              </td>
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
}

/** Mobile: stacked rows, like RecentActivity */
export function ActivityList({ groups }: { groups: DayGroup[] }) {
  return (
    <div className="md:hidden">
      {groups.map(({ day, events }) => (
        <div key={day}>
          <div className="border-b border-border bg-inset px-4 py-2">
            <Label>{dayLabel(day)}</Label>
            <DayCount count={events.length} />
          </div>
          <ul aria-label={dayLabel(day)}>
            {events.map((event) => (
              <ActivityRow key={event.id} event={event} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
