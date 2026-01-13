"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Column } from "./Column";
import { CardWithDialog } from "./CardWithDialog";
import type { InquiryPhase } from "@/types";
import { useInquiriesStore } from "@/lib/inquiriesClientStore";
import { FilterPanel, buildFilters } from "./FilterPanel";
import { useSearchParams } from "next/navigation";

const phases: { key: InquiryPhase; label: string }[] = [
  { key: "new", label: "New" },
  { key: "sent_to_hotels", label: "Sent to Hotels" },
  { key: "offers_received", label: "Offers Received" },
  { key: "completed", label: "Completed" },
];

function SkeletonCard({ index }: { index: number }) {
  return (
    <div
      className={`rounded-md border border-slate-800 bg-slate-900 p-4 ${
        index % 2 === 0 ? "opacity-80" : "opacity-60"
      }`}
    >
      <div className="h-4 w-3/4 rounded bg-slate-800" />
      <div className="mt-2 h-3 w-1/2 rounded bg-slate-800" />
      <div className="mt-3 space-y-2">
        <div className="h-2 w-2/3 rounded bg-slate-800" />
        <div className="h-2 w-1/3 rounded bg-slate-800" />
        <div className="h-2 w-1/2 rounded bg-slate-800" />
      </div>
    </div>
  );
}

export function KanbanBoard() {
  const { inquiries, loading, error, updatePhase } = useInquiriesStore();
  const searchParams = useSearchParams();
  const initialFilters = buildFilters(searchParams);

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
      <FilterPanel
        key={searchParams.toString()}
        initialFilters={initialFilters}
      />
      {error && (
        <div className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {phases.map((phase) => {
          const items = inquiries.filter((inq) => inq.phase === phase.key);
          const showSkeletons = loading && inquiries.length === 0;

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
                  {showSkeletons
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <div key={`skeleton-${phase.key}-${index}`} className="animate-pulse">
                          <SkeletonCard index={index} />
                        </div>
                      ))
                    : items.map((inq, index) => (
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
