/** Variation axes for the template gallery. Values are plain English — they're appended straight into the fal.ai prompt. */
export const LIGHTING = ["natural daylight", "soft studio light", "golden hour", "dramatic rim light", "neon glow", "overcast diffuse light", "candlelight", "hard flash"] as const;
export const CAMERA_ANGLE = ["front eye-level", "45-degree angle", "top-down flat lay", "low-angle hero shot", "close-up macro", "wide establishing shot"] as const;
export const STYLE = ["photoreal", "cinematic", "3D render", "illustration", "minimal", "neon", "vintage", "editorial"] as const;
export const MOOD = ["calm", "energetic", "luxurious", "playful", "professional", "cozy"] as const;
export const COLOR_PALETTE = ["monochrome", "pastel", "earth tones", "vibrant", "black and gold", "cool blue"] as const;
export const TIME_OF_DAY = ["morning", "midday", "sunset", "night"] as const;
export const ASPECT_RATIO = ["1:1", "4:5", "16:9", "9:16"] as const;

export type Lighting = (typeof LIGHTING)[number];
export type CameraAngle = (typeof CAMERA_ANGLE)[number];
export type Style = (typeof STYLE)[number];
export type Mood = (typeof MOOD)[number];
export type ColorPalette = (typeof COLOR_PALETTE)[number];
export type TimeOfDay = (typeof TIME_OF_DAY)[number];
export type AspectRatio = (typeof ASPECT_RATIO)[number];

export interface VariationParams {
  lighting: Lighting;
  cameraAngle: CameraAngle;
  style: Style;
  mood: Mood;
  colorPalette: ColorPalette;
  timeOfDay: TimeOfDay;
  aspectRatio: AspectRatio;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomVariation(): VariationParams {
  return {
    lighting: pick(LIGHTING),
    cameraAngle: pick(CAMERA_ANGLE),
    style: pick(STYLE),
    mood: pick(MOOD),
    colorPalette: pick(COLOR_PALETTE),
    timeOfDay: pick(TIME_OF_DAY),
    aspectRatio: pick(ASPECT_RATIO),
  };
}

export function variationToPrompt(v: VariationParams): string {
  return `${v.lighting} lighting, ${v.cameraAngle} camera angle, ${v.style} style, ${v.mood} mood, ${v.colorPalette} color palette, ${v.timeOfDay}, aspect ratio ${v.aspectRatio}.`;
}

export const RATIO_SIZE: Record<AspectRatio, { width: number; height: number }> = {
  "1:1": { width: 1024, height: 1024 },
  "4:5": { width: 896, height: 1120 },
  "16:9": { width: 1280, height: 720 },
  "9:16": { width: 768, height: 1360 },
};
