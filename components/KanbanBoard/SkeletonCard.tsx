interface SkeletonCardProps {
  index: number;
}

export function SkeletonCard({ index }: SkeletonCardProps) {
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
