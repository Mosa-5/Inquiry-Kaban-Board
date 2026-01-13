"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import { mockInquiries } from "@/data";
import { Column } from "./Column";
import { CardWithDialog } from "./CardWithDialog";
import type { InquiryPhase } from "@/types";

const phases: { key: InquiryPhase; label: string }[] = [
  { key: "new", label: "New" },
  { key: "sent_to_hotels", label: "Sent to Hotels" },
  { key: "offers_received", label: "Offers Received" },
  { key: "completed", label: "Completed" },
];

export function KanbanBoard() {
  const [inquiries, setInquiries] = useState(mockInquiries);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === draggableId
          ? { ...inq, phase: destination.droppableId as InquiryPhase }
          : inq
      )
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
