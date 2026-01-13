"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Inquiry, InquiryFilters, InquiryPhase } from "@/types";

interface InquiriesState {
  inquiries: Inquiry[];
  loading: boolean;
  error: string | null;
  filters: InquiryFilters;
}

interface InquiriesActions {
  refresh: () => Promise<void>;
  setFilters: (next: InquiryFilters) => void;
  updatePhase: (id: string, phase: InquiryPhase) => Promise<void>;
}

type InquiriesStore = InquiriesState & InquiriesActions;

const InquiriesContext = createContext<InquiriesStore | null>(null);

function buildQuery(filters: InquiryFilters) {
  const params = new URLSearchParams();
  if (filters.client) params.set("client", filters.client);
  if (typeof filters.minValue === "number") {
    params.set("minValue", String(filters.minValue));
  }
  if (filters.startDate) params.set("startDate", filters.startDate);
  if (filters.endDate) params.set("endDate", filters.endDate);
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function InquiriesProvider({ children }: { children: ReactNode }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<InquiryFilters>({});
  const abortRef = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/inquiries${buildQuery(filters)}`,
        { signal: controller.signal }
      );
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }
      const payload = (await response.json()) as { data: Inquiry[] };
      setInquiries(payload.data);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError((err as Error).message);
      }
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setFilters = useCallback((next: InquiryFilters) => {
    setFiltersState((prev) => ({ ...prev, ...next }));
  }, []);

  const updatePhase = useCallback(
    async (id: string, phase: InquiryPhase) => {
      const snapshot = inquiries;
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, phase } : inq))
      );

      try {
        const response = await fetch(`/api/inquiries/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phase }),
        });

        if (!response.ok) {
          throw new Error(`Update failed (${response.status})`);
        }

        const payload = (await response.json()) as { data: Inquiry };
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? payload.data : inq))
        );
      } catch (err) {
        setError((err as Error).message);
        setInquiries(snapshot);
      }
    },
    [inquiries]
  );

  const value = useMemo<InquiriesStore>(
    () => ({
      inquiries,
      loading,
      error,
      filters,
      refresh,
      setFilters,
      updatePhase,
    }),
    [inquiries, loading, error, filters, refresh, setFilters, updatePhase]
  );

  return (
    <InquiriesContext.Provider value={value}>
      {children}
    </InquiriesContext.Provider>
  );
}

export function useInquiriesStore() {
  const context = useContext(InquiriesContext);
  if (!context) {
    throw new Error("useInquiriesStore must be used within InquiriesProvider");
  }
  return context;
}
