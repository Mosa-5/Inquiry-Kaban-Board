import type { HTMLAttributes, ReactNode } from "react";

export type InquiryPhase =
  | "new"
  | "sent_to_hotels"
  | "offers_received"
  | "completed";

export interface Inquiry {
  id: string;
  clientName: string;
  contactPerson: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  potentialValue: number;
  phase: InquiryPhase;
  hotels: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type FallbackValue = string | number | string[] | null | undefined;

export interface InquiryFilters {
  client?: string;
  minValue?: number;
  startDate?: string;
  endDate?: string;
}

export interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  inquiries: Inquiry[];
  phase: InquiryPhase;
  children?: ReactNode;
  isDraggingOver?: boolean;
}
