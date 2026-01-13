import { FallbackValue } from "@/types";

export function fallback(value: FallbackValue, defaultText = "None") {
  if (value === null || value === undefined) return defaultText;

  if (Array.isArray(value)) {
    return value.length > 0 ? value : defaultText;
  }

  if (typeof value === "string" && value.trim() === "") return defaultText;

  return value;
}
