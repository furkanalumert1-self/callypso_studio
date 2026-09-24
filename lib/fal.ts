/**
 * Server-only fal.ai client. FAL_KEY must never reach the browser — only
 * import this from route handlers / server components, never from a
 * "use client" file.
 *
 * Two paths:
 * - generateProductImage(): fal-ai/flux/schnell, text-to-image. Used when the
 *   merchant hasn't uploaded a real product photo (no pixels to condition on).
 * - editProductImage(): fal-ai/flux-pro/kontext, an image-editing model that
 *   takes the merchant's actual uploaded photo (data URL or https URL) plus an
 *   instruction and edits the scene while preserving the product — this is
 *   the real Product Lock path once a photo exists.
 */
import type { ExportRatio } from "@/lib/demo/data";

const FAL_ENDPOINT = "https://fal.run/fal-ai/flux/schnell";
const KONTEXT_ENDPOINT = "https://fal.run/fal-ai/flux-pro/kontext";

const RATIO_SIZE: Record<ExportRatio, { width: number; height: number }> = {
  "1:1": { width: 1024, height: 1024 },
  "4:5": { width: 896, height: 1120 },
  "9:16": { width: 768, height: 1360 },
};

/** Kontext only accepts a fixed enum ('21:9' | '16:9' | '4:3' | '3:2' | '1:1' |
 * '2:3' | '3:4' | '9:16' | '9:21') — map our ratios to the closest one. */
const KONTEXT_ASPECT_RATIO: Record<ExportRatio, string> = {
  "1:1": "1:1",
  "4:5": "3:4",
  "9:16": "9:16",
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

export interface EditProductImageParams {
  prompt: string;
  ratio: ExportRatio;
  /** The merchant's actual product photo — a data: URL or an https URL. */
  sourceImage: string;
}

export async function editProductImage({ prompt, ratio, sourceImage }: EditProductImageParams): Promise<string> {
  const key = process.env.FAL_KEY;
  if (!key) throw new Error("FAL_KEY is not configured");

  const res = await fetch(KONTEXT_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Key ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      image_url: sourceImage,
      aspect_ratio: KONTEXT_ASPECT_RATIO[ratio] ?? "1:1",
    }),
    signal: AbortSignal.timeout(60000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`fal.ai (kontext) request failed (${res.status}): ${detail.slice(0, 300)}`);
  }

  const data = await res.json();
  const url: unknown = data?.images?.[0]?.url;

  if (typeof url !== "string" || !url) {
    throw new Error("fal.ai response did not include an image URL");
  }
  return url;
}
