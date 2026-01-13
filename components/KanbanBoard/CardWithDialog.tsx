"use client";

import { useState } from "react";
import { Card } from "./Card";
import type { Inquiry } from "@/types";
import { fallback } from "@/utils/fallback";
import { formatAbsolute, formatSmartDate } from "@/utils/date";
import { useInquiriesStore } from "@/lib/inquiriesClientStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  CircleDollarSign,
  Hotel,
  Mail,
  Tag,
  Users,
} from "lucide-react";
import {
  phaseAccentBorder,
  phaseAccentText,
  phaseOptions,
} from "./kanbanConfig";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";


export function CardWithDialog({ inquiry }: { inquiry: Inquiry;}) {
  const [open, setOpen] = useState(false);
  const { updatePhase, loading } = useInquiriesStore();

  const handlePhaseChange = (value: string) => {
    if (value === inquiry.phase) return;
    updatePhase(inquiry.id, value as Inquiry["phase"]);
  };

  return (
    <>
      <Card inquiry={inquiry} onClick={() => setOpen(true)} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`max-w-[calc(100%-2rem)] sm:max-w-xl bg-slate-950 text-slate-100 border ${phaseAccentBorder[inquiry.phase]} max-h-[90vh] overflow-y-auto`}
        >
          <DialogHeader className="space-y-1">
            <p className="text-xs text-slate-500">ID: {inquiry.id}</p>
            <DialogTitle className="text-2xl">{inquiry.clientName}</DialogTitle>
            <DialogDescription className="text-slate-500">
              {inquiry.eventType}
            </DialogDescription>
          </DialogHeader>

          <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className={`text-xs font-semibold ${phaseAccentText[inquiry.phase]}`}>
                  Current phase
                </p>
                <div className="mt-2">
                  <Select
                    value={inquiry.phase}
                    onValueChange={handlePhaseChange}
                    disabled={loading}
                  >
                    <SelectTrigger className={`bg-slate-950 text-slate-100 ${phaseAccentBorder[inquiry.phase]}`}>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      {phaseOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold text-slate-400">
                  Potential value
                </p>
                <p className="mt-2 text-2xl font-semibold text-amber-400">
                  CHF {inquiry.potentialValue.toLocaleString()}
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 border-t border-slate-800 pt-4 text-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <Tag className="h-4 w-4" />
                  Event type
                </div>
                <p className="font-medium text-slate-100">
                  {fallback(inquiry.eventType)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <Mail className="h-4 w-4" />
                  Contact person
                </div>
                <p className="font-medium text-slate-100">
                  {fallback(inquiry.contactPerson)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <CalendarDays className="h-4 w-4" />
                  Event date
                </div>
                <p className="font-medium text-slate-100">
                  {formatAbsolute(inquiry.eventDate)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <Users className="h-4 w-4" />
                  Guest count
                </div>
                <p className="font-medium text-slate-100">
                  {inquiry.guestCount} guests
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Hotel className="h-4 w-4" />
                Associated hotels
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {inquiry.hotels && inquiry.hotels.length > 0 ? (
                  inquiry.hotels.map((hotel) => (
                    <span
                      key={hotel}
                      className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {hotel}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">None</span>
                )}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <CircleDollarSign className="h-4 w-4" />
                Notes
              </div>
              <p className="mt-2 text-sm text-slate-300">
                {fallback(inquiry.notes)}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-2 border-t border-slate-800 pt-4 text-xs text-slate-400 sm:flex-row">
              <span>Created: {formatAbsolute(inquiry.createdAt)}</span>
              <span>Updated: {formatSmartDate(inquiry.updatedAt)}</span>
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
