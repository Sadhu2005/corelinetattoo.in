import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url || !url.includes("instagram.com")) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}&omitscript=true`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch embed" }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Embed unavailable" }, { status: 502 });
  }
}
