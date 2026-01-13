import { mockInquiries } from "@/data";
import type { Inquiry, InquiryFilters, InquiryPhase } from "@/types";

const PHASES: InquiryPhase[] = [
  "new",
  "sent_to_hotels",
  "offers_received",
  "completed",
];

const seedInquiries = () =>
  mockInquiries.map((inq) => ({
    ...inq,
    hotels: [...inq.hotels],
  }));

declare global {
  var __inquiriesStore: Inquiry[] | undefined;
}

const inquiries: Inquiry[] = globalThis.__inquiriesStore ?? seedInquiries();
globalThis.__inquiriesStore = inquiries;

export function isInquiryPhase(value: unknown): value is InquiryPhase {
  return typeof value === "string" && PHASES.includes(value as InquiryPhase);
}

export function getInquiries(filters: InquiryFilters): Inquiry[] {
  let result = inquiries;

  if (filters.client) {
    const query = filters.client.toLowerCase();
    result = result.filter((inq) =>
      inq.clientName.toLowerCase().includes(query)
    );
  }

  if (typeof filters.minValue === "number") {
    result = result.filter((inq) => inq.potentialValue >= filters.minValue!);
  }

  const start = filters.startDate ? new Date(filters.startDate) : null;
  if (start && !Number.isNaN(start.getTime())) {
    result = result.filter((inq) => new Date(inq.eventDate) >= start);
  }

  const end = filters.endDate ? new Date(filters.endDate) : null;
  if (end && !Number.isNaN(end.getTime())) {
    result = result.filter((inq) => new Date(inq.eventDate) <= end);
  }

  return result;
}

export function updateInquiryPhase(
  id: string,
  phase: InquiryPhase
): Inquiry | null {
  const index = inquiries.findIndex((inq) => inq.id === id);
  if (index === -1) return null;

  const updated: Inquiry = {
    ...inquiries[index],
    phase,
    updatedAt: new Date().toISOString(),
  };

  inquiries[index] = updated;
  return updated;
}
