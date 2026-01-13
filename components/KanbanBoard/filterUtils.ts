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

export function buildQuery(filters: InquiryFilters) {
  const params = new URLSearchParams();
  if (filters.client) params.set("client", filters.client);
  if (typeof filters.minValue === "number") {
    params.set("minValue", String(filters.minValue));
  }
  if (filters.startDate) params.set("startDate", filters.startDate);
  if (filters.endDate) params.set("endDate", filters.endDate);
  return params.toString();
}

export function normalizeDate(value: string) {
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

export function toDate(value: string) {
  const normalized = normalizeDate(value);
  if (!normalized) return undefined;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function formatDateLabel(value: string) {
  const date = toDate(value);
  return date ? date.toLocaleDateString() : "Select date";
}
