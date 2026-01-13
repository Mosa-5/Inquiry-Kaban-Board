"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useInquiriesStore } from "@/lib/inquiriesClientStore";
import type { InquiryFilters } from "@/types";
import { CalendarDays, ChevronDownIcon, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  buildQuery,
  formatDateLabel,
  normalizeDate,
  toDate,
} from "./filterUtils";


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
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const activeCount = useMemo(() => {
    let count = 0;
    if (client.trim()) count += 1;
    if (minValue.trim()) count += 1;
    if (startDate.trim()) count += 1;
    if (endDate.trim()) count += 1;
    return count;
  }, [client, minValue, startDate, endDate]);

  const handleDateSelect = (
    setter: (value: string) => void,
    value: Date | undefined,
    close: () => void
  ) => {
    if (!value) {
      setter("");
      return;
    }
    setter(value.toISOString().slice(0, 10));
    close();
  };

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
    <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 lg:max-w-[320px]">
            <Search className="h-4 w-4 text-slate-500" />
            <Input
              id="client-name"
              value={client}
              onChange={(event) => setClient(event.target.value)}
              placeholder="Search by client name..."
              className="h-6 border-0 bg-transparent p-0 text-sm text-slate-200 placeholder:text-slate-500 focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
            <Popover open={startOpen} onOpenChange={setStartOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="start-date"
                  className="h-10 w-full cursor-pointer justify-between border-slate-800 bg-slate-950 text-slate-200 hover:bg-slate-900 hover:text-slate-200 sm:w-[220px]"
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-slate-500" />
                    {toDate(startDate)
                      ? formatDateLabel(startDate)
                      : "From date"}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 text-slate-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[--radix-popover-trigger-width] overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={toDate(startDate)}
                  className="w-full"
                  classNames={{
                    root: "w-full",
                    months: "w-full",
                    month: "w-full",
                    table: "w-full",
                  }}
                  onSelect={(value) =>
                    handleDateSelect(setStartDate, value, () =>
                      setStartOpen(false)
                    )
                  }
                />
              </PopoverContent>
            </Popover>

            <Popover open={endOpen} onOpenChange={setEndOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="end-date"
                  className="h-10 w-full cursor-pointer justify-between border-slate-800 bg-slate-950 text-slate-200 hover:bg-slate-900 hover:text-slate-200 sm:w-[220px]"
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-slate-500" />
                    {toDate(endDate) ? formatDateLabel(endDate) : "To date"}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 text-slate-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[--radix-popover-trigger-width] overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={toDate(endDate)}
                  className="w-full"
                  classNames={{
                    root: "w-full",
                    months: "w-full",
                    month: "w-full",
                    table: "w-full",
                  }}
                  onSelect={(value) =>
                    handleDateSelect(setEndDate, value, () =>
                      setEndOpen(false)
                    )
                  }
                />
              </PopoverContent>
            </Popover>

            <div className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 sm:w-[160px]">
              <Filter className="h-4 w-4 text-slate-500" />
              <Input
                id="min-value"
                value={minValue}
                onChange={(event) => setMinValue(event.target.value)}
                inputMode="numeric"
                placeholder="Min value"
                className="h-6 border-0 bg-transparent p-0 text-sm text-slate-200 placeholder:text-slate-500 focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 lg:justify-end">
          <span className="text-xs text-slate-400">
            {activeCount} filters
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="cursor-pointer border-slate-800 bg-slate-950 text-slate-200 hover:bg-slate-900 hover:text-slate-200"
          >
            Clear filters
          </Button>
        </div>
      </div>
    </div>
  );
}
