import { NextRequest, NextResponse } from "next/server";

/**
 * Streams a fal.ai-hosted image back with a Content-Disposition header so the
 * browser actually saves it. A plain <a download href="https://fal.media/...">
 * doesn't work — browsers ignore the `download` attribute for cross-origin
 * links and just open the image in a new tab instead. Routing through this
 * same-origin proxy makes the download attribute (and fetch-to-Blob for the
 * zip export) work reliably.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const filename = req.nextUrl.searchParams.get("filename") ?? "image.jpg";
  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }
  // Only proxy fal.ai-hosted images — this must never become an open URL fetcher.
  if (!/(^|\.)fal\.media$|(^|\.)fal\.ai$/.test(parsed.hostname)) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 400 });
  }

  const res = await fetch(url);
  if (!res.ok || !res.body) {
    return NextResponse.json({ error: `Failed to fetch image (${res.status})` }, { status: 502 });
  }

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  return new NextResponse(res.body, {
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "image/jpeg",
      "Content-Disposition": `attachment; filename="${safeName}"`,
    },
  });
}
