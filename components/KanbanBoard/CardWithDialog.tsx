"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Inquiry } from "@/types";
import { fallback } from "@/utils/fallback";
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



export function CardWithDialog({ inquiry }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card inquiry={inquiry} onClick={() => setOpen(true)} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{inquiry.clientName}</DialogTitle>
            <DialogDescription>
              {inquiry.eventType} – {inquiry.guestCount} guests
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
