import { KanbanBoard } from "@/components/KanbanBoard/KanbanBoard";
import { InquiriesProvider } from "@/lib/inquiriesClientStore";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight">
          Inquiry Kanban Board
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Frontend Developer Assessment
        </p>
      </header>

      <section className="px-6 py-6">
        <InquiriesProvider>
          <KanbanBoard />
        </InquiriesProvider>
      </section>
    </main>
  );
}
