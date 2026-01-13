"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useInquiriesStore } from "@/lib/inquiriesClientStore";
import type { InquiryFilters } from "@/types";

export function buildFilters(params: URLSearchParams): InquiryFilters {
  const minValueParam = params.get("minValue");
  const minValue = minValueParam ? Number(minValueParam) : undefined;
  const startDate = normalizeDate(params.get("startDate") || "");
  const endDate = normalizeDate(params.get("endDate") || "");

  return {
    client: params.get("client") || undefined,
    minValue: Number.isFinite(minValue) ? minValue : undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  };
}

function buildQuery(filters: InquiryFilters) {
  const params = new URLSearchParams();
  if (filters.client) params.set("client", filters.client);
  if (typeof filters.minValue === "number") {
    params.set("minValue", String(filters.minValue));
  }
  if (filters.startDate) params.set("startDate", filters.startDate);
  if (filters.endDate) params.set("endDate", filters.endDate);
  return params.toString();
}

function normalizeDate(value: string) {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  if (value.includes("T")) {
    const slice = value.slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(slice) ? slice : "";
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    const year = parsed.getUTCFullYear();
    if (year < 1000 || year > 9999) return "";
    return parsed.toISOString().slice(0, 10);
  }

  return "";
}

interface FilterPanelProps {
  initialFilters: InquiryFilters;
}

export function FilterPanel({ initialFilters }: FilterPanelProps) {
  const { setAllFilters, clearFilters } = useInquiriesStore();
  const router = useRouter();
  const pathname = usePathname();

  const [client, setClient] = useState(initialFilters.client || "");
  const [minValue, setMinValue] = useState(
    typeof initialFilters.minValue === "number"
      ? String(initialFilters.minValue)
      : ""
  );
  const [startDate, setStartDate] = useState(initialFilters.startDate || "");
  const [endDate, setEndDate] = useState(initialFilters.endDate || "");

  const activeCount = useMemo(() => {
    let count = 0;
    if (client.trim()) count += 1;
    if (minValue.trim()) count += 1;
    if (startDate.trim()) count += 1;
    if (endDate.trim()) count += 1;
    return count;
  }, [client, minValue, startDate, endDate]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const parsedMinValue = minValue.trim()
        ? Number(minValue)
        : undefined;
      const validMinValue = Number.isFinite(parsedMinValue)
        ? parsedMinValue
        : undefined;

      const normalizedStartDate = normalizeDate(startDate);
      const normalizedEndDate = normalizeDate(endDate);

      const filters: InquiryFilters = {
        client: client.trim() || undefined,
        minValue: validMinValue,
        startDate: normalizedStartDate || undefined,
        endDate: normalizedEndDate || undefined,
      };

      setAllFilters(filters);

      const query = buildQuery(filters);
      const nextUrl = query ? `${pathname}?${query}` : pathname;
      router.replace(nextUrl);
    }, 300);

    return () => clearTimeout(handler);
  }, [
    client,
    minValue,
    startDate,
    endDate,
    setAllFilters,
    router,
    pathname,
  ]);

  const handleClear = () => {
    setClient("");
    setMinValue("");
    setStartDate("");
    setEndDate("");
    clearFilters();
    router.replace(pathname);
  };

  return (
    <div className="mb-6 rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-300">Client name</span>
            <input
              value={client}
              onChange={(event) => setClient(event.target.value)}
              placeholder="Search clients"
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-300">Minimum value</span>
            <input
              value={minValue}
              onChange={(event) => setMinValue(event.target.value)}
              inputMode="numeric"
              placeholder="CHF 0"
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-300">Start date</span>
            <input
              value={startDate}
              onChange={(event) => {
                setStartDate(event.target.value);
              }}
              onBlur={() =>
                setStartDate((current) => normalizeDate(current))
              }
              type="date"
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-300">End date</span>
            <input
              value={endDate}
              onChange={(event) => {
                setEndDate(event.target.value);
              }}
              onBlur={() => setEndDate((current) => normalizeDate(current))}
              type="date"
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            {activeCount} filters
          </span>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
}
