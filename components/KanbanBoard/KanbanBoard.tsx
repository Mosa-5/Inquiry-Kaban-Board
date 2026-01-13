import { mockInquiries } from "@/data";
import { Column } from "./Column";

export function KanbanBoard() {
  const phases = [
    { key: "new", label: "New" },
    { key: "sent_to_hotels", label: "Sent to Hotels" },
    { key: "offers_received", label: "Offers Received" },
    { key: "completed", label: "Completed" }
  ];

  return (
    <div className="flex gap-4 overflow-x-auto">
      {phases.map((phase) => (
        <Column
          key={phase.key}
          title={phase.label}
          phase={phase.key}
          inquiries={mockInquiries.filter((i) => i.phase === phase.key)}
        />
      ))}
    </div>
  );
}