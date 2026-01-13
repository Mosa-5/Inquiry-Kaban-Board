import { Inquiry } from "@/types/";
import { CardWithDialog } from "./CardWithDialog";

interface ColumnProps {
  title: string;
  phase: string;
  inquiries: Inquiry[];
}

export function Column({ title, inquiries }: ColumnProps) {
  return (
    <div className="w-72 bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      <div className="flex flex-col gap-3">
        {inquiries.map((inq) => (
          <CardWithDialog key={inq.id} inquiry={inq} />
        ))}
      </div>
    </div>
  );
}
