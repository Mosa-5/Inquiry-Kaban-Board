import { NextRequest, NextResponse } from "next/server";
import { getInquiries } from "@/lib/inquiriesStore";
import type { InquiryFilters } from "@/lib/inquiriesStore";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const minValueParam = searchParams.get("minValue");
  const minValue = minValueParam ? Number(minValueParam) : undefined;

  const filters: InquiryFilters = {
    client: searchParams.get("client") || undefined,
    minValue: Number.isFinite(minValue) ? minValue : undefined,
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
  };

  const data = getInquiries(filters);

  await sleep(500);

  return NextResponse.json({ data, count: data.length });
}
