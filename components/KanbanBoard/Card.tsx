import type { CardProps } from "@/types";
import { formatSmartDate } from "@/utils/date";
import { CalendarDays, Users } from "lucide-react";
import { phaseAccentBorder } from "./kanbanConfig";

export function Card({ inquiry, onClick }: CardProps) {
  const displayEventDate = formatSmartDate(inquiry.eventDate);
  const displayUpdatedDate = formatSmartDate(inquiry.updatedAt);

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border bg-slate-900/80 p-4 shadow-sm transition hover:border-slate-600 hover:bg-slate-800 cursor-pointer ${
        phaseAccentBorder[inquiry.phase] || "border-slate-800"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-100">
            {inquiry.clientName}
          </h3>
          <span className="mt-1 inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
            {inquiry.eventType}
          </span>
        </div>
        {inquiry.potentialValue > 50000 && (
          <span className="rounded-full bg-amber-500/20 px-2 py-1 text-[11px] font-semibold text-amber-300">
            High value
          </span>
        )}
      </div>

      <div className="mt-4 space-y-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{displayEventDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5" />
          <span>{inquiry.guestCount} guests</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
        <span className="font-semibold text-amber-300">
          CHF {inquiry.potentialValue.toLocaleString()}
        </span>
        <span className="text-slate-500">{displayUpdatedDate}</span>
      </div>
    </div>
  );
}
