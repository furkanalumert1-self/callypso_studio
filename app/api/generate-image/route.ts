import { NextRequest, NextResponse } from "next/server";
import { generateProductImage, editProductImage, isFalConfigured } from "@/lib/fal";
import type { ExportRatio } from "@/lib/demo/data";

const VALID_RATIOS: ExportRatio[] = ["1:1", "4:5", "9:16"];

export async function POST(req: NextRequest) {
  if (!isFalConfigured()) {
    return NextResponse.json({ error: "FAL_KEY not configured — demo mode" }, { status: 501 });
  }

  let body: { prompt?: unknown; ratio?: unknown; sourceImage?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { prompt, ratio, sourceImage } = body;
  if (typeof prompt !== "string" || !prompt.trim()) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }
  const safeRatio: ExportRatio = VALID_RATIOS.includes(ratio as ExportRatio) ? (ratio as ExportRatio) : "1:1";
  const hasSourceImage = typeof sourceImage === "string" && sourceImage.length > 0;

  try {
    const url = hasSourceImage
      ? await editProductImage({ prompt, ratio: safeRatio, sourceImage: sourceImage as string })
      : await generateProductImage({ prompt, ratio: safeRatio });
    return NextResponse.json({ url });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Generation failed" },
      { status: 502 },
    );
  }
}
