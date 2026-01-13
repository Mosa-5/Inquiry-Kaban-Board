import type { InquiryPhase } from "@/types";

export const phaseOptions: { value: InquiryPhase; label: string }[] = [
  { value: "new", label: "New" },
  { value: "sent_to_hotels", label: "Sent to Hotels" },
  { value: "offers_received", label: "Offers Received" },
  { value: "completed", label: "Completed" },
];

export const phaseColumns: { key: InquiryPhase; label: string }[] = [
  { key: "new", label: "New" },
  { key: "sent_to_hotels", label: "Sent to Hotels" },
  { key: "offers_received", label: "Offers Received" },
  { key: "completed", label: "Completed" },
];

export const phaseAccentBorder: Record<InquiryPhase, string> = {
  new: "border-blue-500/40",
  sent_to_hotels: "border-amber-500/40",
  offers_received: "border-purple-500/40",
  completed: "border-emerald-500/40",
};

export const phaseAccentText: Record<InquiryPhase, string> = {
  new: "text-blue-300",
  sent_to_hotels: "text-amber-300",
  offers_received: "text-purple-300",
  completed: "text-emerald-300",
};

export const phaseHeaderStyles: Record<InquiryPhase, string> = {
  new: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  sent_to_hotels: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  offers_received: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  completed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
};
