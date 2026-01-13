import { Inquiry } from "@/types";
import { formatSmartDate } from "@/utils/date";

interface CardProps {
  inquiry: Inquiry;
  onClick?: () => void;
}

export function Card({ inquiry, onClick }: CardProps) {
  const displayEventDate = formatSmartDate(inquiry.eventDate);
  const displayUpdatedDate = formatSmartDate(inquiry.updatedAt);

  return (
    <div
      onClick={onClick}
      className="bg-slate-800 rounded-md p-4 hover:bg-slate-700 transition cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{inquiry.clientName}</h3>

        {inquiry.potentialValue > 50000 && (
          <span className="text-xs bg-amber-900 text-amber-300 px-2 py-1 rounded">
            High
          </span>
        )}
      </div>

      <p className="text-slate-400 text-sm mt-1">{inquiry.eventType}</p>

      <div className="text-xs text-slate-500 mt-2 flex flex-col gap-1">
        <span>Date: {displayEventDate}</span>
        <span>Guests: {inquiry.guestCount}</span>
        <span>Value: CHF {inquiry.potentialValue.toLocaleString()}</span>
        <span>Updated: {displayUpdatedDate}</span>
      </div>
    </div>
  );
}
