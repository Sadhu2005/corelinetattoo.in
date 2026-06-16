import { NextResponse } from "next/server";
import { getTattooDesigns } from "@/lib/data/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const designs = await getTattooDesigns(category ?? undefined);
  return NextResponse.json(designs);
}
