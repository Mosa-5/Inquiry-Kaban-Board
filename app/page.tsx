import { mockInquiries } from "@/data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight">
          Inquiry Kanban Board
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Frontend Developer Assessment – Kanban view for hotel inquiries.
        </p>
      </header>

      <section className="px-6 py-6 space-y-2">
        <p className="text-xs text-slate-500">
          Currently loaded mock inquiries: {mockInquiries.length}
        </p>
      </section>
    </main>
  );
}