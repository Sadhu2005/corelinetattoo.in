import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const secret = request.headers.get("x-health-secret");
  if (secret !== process.env.HEALTH_PING_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.json({ ok: true, supabase: "not configured" });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("site_stats").select("id").limit(1);

  return NextResponse.json({
    ok: !error,
    timestamp: new Date().toISOString(),
  });
}
