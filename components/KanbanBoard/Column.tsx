import * as React from "react";
import { ColumnProps } from "@/types";
import { cn } from "@/lib/utils";

export const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  (
    { title, inquiries, children, isDraggingOver, className, ...rest },
    ref
  ) => {
    const count = inquiries.length;
    const totalValue = inquiries.reduce((sum, q) => sum + q.potentialValue, 0);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col rounded-lg min-h-[300px] border border-slate-800 p-4 transition",
          isDraggingOver ? "bg-slate-800/80" : "bg-slate-900",
          className
        )}
        {...rest}
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-xs text-slate-400">
            {count} inquiries - CHF {totalValue.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-3">{children}</div>
      </div>
    );
  }
);

Column.displayName = "Column";
