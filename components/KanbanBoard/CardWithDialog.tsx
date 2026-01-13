"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Inquiry } from "@/types";
import { fallback } from "@/utils/fallback";
import { formatAbsolute, formatSmartDate } from "@/utils/date";
import { useInquiriesStore } from "@/lib/inquiriesClientStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface Props {
  inquiry: Inquiry;
}

const phaseOptions = [
  { value: "new", label: "New" },
  { value: "sent_to_hotels", label: "Sent to Hotels" },
  { value: "offers_received", label: "Offers Received" },
  { value: "completed", label: "Completed" },
];

export function CardWithDialog({ inquiry }: Props) {
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{inquiry.clientName}</DialogTitle>
            <DialogDescription>
              {inquiry.eventType} - {inquiry.guestCount} guests
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Date:</strong> {fallback(inquiry.eventDate)}
            </p>

            <p>
              <strong>Value:</strong> CHF {inquiry.potentialValue.toLocaleString()}
            </p>

            <p>
              <strong>Contact:</strong> {fallback(inquiry.contactPerson)}
            </p>

            <div>
              <strong>Phase:</strong>
              <select
                value={inquiry.phase}
                onChange={(event) => handlePhaseChange(event.target.value)}
                disabled={loading}
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              >
                {phaseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <strong>Hotels:</strong>
              {inquiry.hotels && inquiry.hotels.length > 0 ? (
                <ul className="list-disc list-inside ml-2">
                  {inquiry.hotels.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              ) : (
                <p className="ml-2 text-slate-500">None</p>
              )}
            </div>

            <div>
              <strong>Notes:</strong>
              <p>{fallback(inquiry.notes)}</p>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <p>
                <strong>Created:</strong> {formatAbsolute(inquiry.createdAt)}
              </p>
              <p>
                <strong>Updated:</strong> {formatSmartDate(inquiry.updatedAt)}
              </p>
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-700 transition"
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
