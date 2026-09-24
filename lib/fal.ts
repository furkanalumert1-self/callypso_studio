/**
 * Server-only fal.ai client. FAL_KEY must never reach the browser — only
 * import this from route handlers / server components, never from a
 * "use client" file.
 *
 * TODO(real integration): this uses fal-ai/flux/schnell (text-to-image), so
 * it renders a new product render from a text prompt rather than editing the
 * merchant's actual uploaded photo pixel-for-pixel. True Product Lock (exact
 * logo/text/color/shape/packaging preservation) needs an image-editing model
 * (e.g. a FLUX Kontext-style endpoint) fed the real source photo, plus
 * Supabase storage for uploads — wire that in once photo upload is real.
 */
import type { ExportRatio } from "@/lib/demo/data";

const FAL_ENDPOINT = "https://fal.run/fal-ai/flux/schnell";

const RATIO_SIZE: Record<ExportRatio, { width: number; height: number }> = {
  "1:1": { width: 1024, height: 1024 },
  "4:5": { width: 896, height: 1120 },
  "9:16": { width: 768, height: 1360 },
};

export function isFalConfigured(): boolean {
  return !!process.env.FAL_KEY;
}

export interface GenerateImageParams {
  prompt: string;
  ratio: ExportRatio;
}

export async function generateProductImage({ prompt, ratio }: GenerateImageParams): Promise<string> {
  const key = process.env.FAL_KEY;
  if (!key) throw new Error("FAL_KEY is not configured");

  const size = RATIO_SIZE[ratio] ?? RATIO_SIZE["1:1"];

  const res = await fetch(FAL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Key ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      image_size: size,
      num_images: 1,
    }),
    signal: AbortSignal.timeout(45000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`fal.ai request failed (${res.status}): ${detail.slice(0, 300)}`);
  }

  const data = await res.json();
  const url: unknown =
    data?.images?.[0]?.url ?? data?.image?.url ?? data?.output?.images?.[0]?.url;

  if (typeof url !== "string" || !url) {
    throw new Error("fal.ai response did not include an image URL");
  }
  return url;
}
