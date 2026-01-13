import * as React from "react";
import type { ColumnProps } from "@/types";
import { cn } from "@/lib/utils";
import { phaseHeaderStyles } from "./kanbanConfig";

export const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  (
    { title, inquiries, children, isDraggingOver, className, phase, ...rest },
    ref
  ) => {
    const count = inquiries.length;
    const totalValue = inquiries.reduce((sum, q) => sum + q.potentialValue, 0);
    const headerClass = phaseHeaderStyles[phase] || "bg-slate-800 text-slate-200";

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col rounded-xl min-h-[320px] border border-slate-800 p-4 transition",
          isDraggingOver ? "bg-slate-800/80" : "bg-slate-900",
          className
        )}
        {...rest}
      >
        <div className={cn("mb-4 rounded-lg border px-3 py-2", headerClass)}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              {title}
            </h2>
            <span className="text-xs font-semibold">{count}</span>
          </div>
          <p className="mt-1 text-xs text-slate-300">
            CHF {totalValue.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-3">{children}</div>
      </div>
    );
  }
);

Column.displayName = "Column";
