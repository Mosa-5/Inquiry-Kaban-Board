import { NextRequest, NextResponse } from "next/server";
import { isInquiryPhase, updateInquiryPhase } from "@/lib/inquiriesStore";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json().catch(() => null);

  if (!body || !isInquiryPhase(body.phase)) {
    return NextResponse.json(
      { error: "Invalid phase" },
      { status: 400 }
    );
  }

  const updated = updateInquiryPhase(id, body.phase);
  await sleep(500);

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: updated });
}
