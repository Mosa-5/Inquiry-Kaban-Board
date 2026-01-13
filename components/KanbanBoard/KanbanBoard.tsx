"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Column } from "./Column";
import { CardWithDialog } from "./CardWithDialog";
import type { InquiryPhase } from "@/types";
import { useInquiriesStore } from "@/lib/inquiriesClientStore";

const phases: { key: InquiryPhase; label: string }[] = [
  { key: "new", label: "New" },
  { key: "sent_to_hotels", label: "Sent to Hotels" },
  { key: "offers_received", label: "Offers Received" },
  { key: "completed", label: "Completed" },
];

export function KanbanBoard() {
  const { inquiries, loading, error, updatePhase } = useInquiriesStore();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    updatePhase(draggableId, destination.droppableId as InquiryPhase);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {error && (
        <div className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}
      {loading && (
        <div className="mb-4 text-sm text-slate-400">Loading inquiries...</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {phases.map((phase) => {
          const items = inquiries.filter((inq) => inq.phase === phase.key);

          return (
            <Droppable droppableId={phase.key} key={phase.key}>
              {(provided, snapshot) => (
                <Column
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  title={phase.label}
                  inquiries={items}
                  phase={phase.key}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {items.map((inq, index) => (
                    <Draggable key={inq.id} draggableId={inq.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={
                            snapshot.isDragging ? "opacity-70" : "opacity-100"
                          }
                        >
                          <CardWithDialog inquiry={inq} />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </Column>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}
