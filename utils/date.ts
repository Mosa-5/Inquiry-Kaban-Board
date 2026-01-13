import { formatDistanceToNow } from "date-fns";

export function formatAbsolute(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatSmartDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  // If date is in the future show absolute date
  if (date > now) {
    return formatAbsolute(dateString);
  }

  // If older than 7 days absolute
  if (diffDays > 7) {
    return formatAbsolute(dateString);
  }

  // Otherwise relative
  return formatDistanceToNow(date, { addSuffix: true });
}