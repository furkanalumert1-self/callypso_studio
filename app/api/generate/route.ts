import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
import { createClient } from "@/lib/supabase/server";
import { RATIO_SIZE, variationToPrompt, type AspectRatio, type VariationParams } from "@/lib/variations";

interface GenerateBody {
  templateId?: string;
  prompt?: string;
  variations?: VariationParams;
  count?: number;
}

/** New template-gallery route: {templateId, prompt, variations, count} → { images: [{url|error}] }.
 * Distinct from /api/generate-image (used by the existing Generate page) — left untouched. */
export async function POST(req: NextRequest) {
  const key = process.env.FAL_KEY;
  if (!key) {
    return NextResponse.json({ error: "FAL_KEY not configured — demo mode" }, { status: 501 });
  }

  let body: GenerateBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { templateId, prompt, variations, count } = body;
  if (!templateId || typeof prompt !== "string" || !prompt.trim()) {
    return NextResponse.json({ error: "Missing templateId or prompt" }, { status: 400 });
  }
  const n = Math.min(Math.max(Math.trunc(count ?? 1), 1), 4);
  const ratio: AspectRatio = variations?.aspectRatio ?? "1:1";
  const size = RATIO_SIZE[ratio] ?? RATIO_SIZE["1:1"];
  const fullPrompt = variations ? `${prompt} ${variationToPrompt(variations)}` : prompt;

  fal.config({ credentials: key });

  const results = await Promise.allSettled(
    Array.from({ length: n }).map(() =>
      fal.subscribe("fal-ai/flux/schnell", {
        input: { prompt: fullPrompt, image_size: size, num_images: 1 },
      }),
    ),
  );

  const supabase = await createClient();
  const images: { url: string | null; error?: string }[] = [];

  for (const r of results) {
    if (r.status === "fulfilled") {
      const url = (r.value.data as { images?: { url: string }[] })?.images?.[0]?.url;
      if (url) {
        images.push({ url });
        if (supabase) {
          try {
            await supabase.from("generations").insert({
              template_id: templateId,
              prompt: fullPrompt,
              variation_params: variations ?? null,
              image_url: url,
              status: "done",
            });
          } catch {
            // best-effort persistence — schema may not be applied yet
          }
        }
      } else {
        images.push({ url: null, error: "No image URL in fal.ai response" });
      }
    } else {
      images.push({ url: null, error: r.reason instanceof Error ? r.reason.message : String(r.reason) });
    }
  }

  return NextResponse.json({ images });
}
