/**
 * Callypso Studio demo data — a DTC store's product catalog and the sales
 * creatives generated from it. Labels are bilingual ({ tr, en }); the pages
 * resolve them to the active language. Product names / SKUs stay as-is
 * (content). Wire fal.ai (run /setup) to generate creatives for real.
 *
 * TODO(real integration): Shopify/ikas product sync and Meta Ads push are not
 * built in this first phase — approved creatives are exported (1:1/4:5/9:16)
 * instead of pushed to a store.
 *
 * Scenes map to the `ScenePreset` union in components/shot-image.tsx, which
 * draws each tasteful gallery placeholder (gradient backdrop + product emoji).
 */
import type { L } from "@/lib/i18n/config";
import type { ScenePreset as SceneKind } from "@/components/shot-image";

/* ── KPIs (dashboard hero strip) ──────────────────────────────────────────── */
export interface Kpi { label: L; value: string; delta?: number; icon: string; hint: L; }

export const kpis: Kpi[] = [
  { label: { tr: "Üretilen çekim", en: "Shots made" }, value: "342", delta: 28.0, icon: "image", hint: { tr: "bu ay", en: "this month" } },
  { label: { tr: "Kapsanan ürün", en: "Products covered" }, value: "48", delta: 9.1, icon: "package", hint: { tr: "56 üründen", en: "of 56 products" } },
  { label: { tr: "Aktif stiller", en: "Active styles" }, value: "9", delta: 12.5, icon: "palette", hint: { tr: "marka kitine kilitli", en: "locked to brand kit" } },
  { label: { tr: "Tasarruf", en: "Cost saved" }, value: "$11.4k", delta: 31.2, icon: "piggy-bank", hint: { tr: "stüdyo + fotoğrafçı", en: "vs studio + shoots" } },
  { label: { tr: "Senkron oranı", en: "Sync rate" }, value: "%94", delta: 4.3, icon: "refresh-cw", hint: { tr: "mağazaya iten çekim", en: "shots pushed to store" } },
  { label: { tr: "Ort. render", en: "Avg render" }, value: "38sn", delta: -11.0, icon: "timer", hint: { tr: "set başına süre", en: "per shot set" } },
];

/* The hero strip shows the first four; the dashboard adds the rest below. */
export const heroKpis = kpis.slice(0, 4);
export const extraKpis = kpis.slice(4);

/* ── Use cases (ready-made template categories) ───────────────────────────── */
export type UseCase = "studio" | "lifestyle" | "instagram" | "meta-ads" | "ecommerce";
export const useCaseLabels: Record<UseCase, L> = {
  studio: { tr: "Studio", en: "Studio" },
  lifestyle: { tr: "Lifestyle", en: "Lifestyle" },
  instagram: { tr: "Instagram", en: "Instagram" },
  "meta-ads": { tr: "Meta Ads", en: "Meta Ads" },
  ecommerce: { tr: "E-ticaret", en: "E-commerce" },
};
export const useCases: UseCase[] = ["studio", "lifestyle", "instagram", "meta-ads", "ecommerce"];

/* ── Scene templates (the studio "looks") ─────────────────────────────────── */
export interface Scene {
  id: string;
  name: string;
  kind: SceneKind;
  hue: string;
  surface: L;
  mood: L;
  emoji: string;
  shots: number;
  useCases: UseCase[];
  /** Template Lock: reuse this scene/light/composition on the next products. */
  locked?: boolean;
}

export const scenes: Scene[] = [
  { id: "white", name: "White Sweep", kind: "studio", hue: "345", surface: { tr: "Sonsuz beyaz, gölgesiz", en: "Infinity white, no shadow" }, mood: { tr: "Temiz, pazaryeri", en: "Clean, marketplace" }, emoji: "⬜", shots: 96, useCases: ["studio", "ecommerce"] },
  { id: "marble", name: "Marble Studio", kind: "marble", hue: "250", surface: { tr: "Carrara mermeri + yumuşak gölge", en: "Carrara marble + soft shadow" }, mood: { tr: "Premium, editöryel", en: "Premium, editorial" }, emoji: "🏛️", shots: 128, useCases: ["studio", "instagram", "ecommerce"], locked: true },
  { id: "golden", name: "Golden Hour", kind: "outdoor", hue: "55", surface: { tr: "Güneşli teras, sıcak ışık", en: "Sunlit terrace, warm light" }, mood: { tr: "Sıcak, yaşanmış", en: "Warm, lived-in" }, emoji: "🌅", shots: 74, useCases: ["lifestyle", "instagram"] },
  { id: "cafe", name: "Café Lifestyle", kind: "lifestyle", hue: "30", surface: { tr: "Meşe masa + el detayları", en: "Oak table + human touch" }, mood: { tr: "Hikâye anlatan", en: "Story-driven" }, emoji: "☕", shots: 52, useCases: ["lifestyle", "instagram"] },
  { id: "linen", name: "Soft Linen", kind: "linen", hue: "75", surface: { tr: "Keten + kuru bitkiler", en: "Linen + dried botanicals" }, mood: { tr: "Hediye, sezonluk", en: "Gifting, seasonal" }, emoji: "🌾", shots: 38, useCases: ["lifestyle", "ecommerce"] },
  { id: "neon", name: "Neon Noir", kind: "gradient", hue: "320", surface: { tr: "Gradyan ışık + cam yansıma", en: "Gradient glow + glass reflection" }, mood: { tr: "Kampanya, cesur", en: "Campaign, bold" }, emoji: "🌃", shots: 31, useCases: ["instagram", "meta-ads"] },
];

/* ── Products (the catalog) ───────────────────────────────────────────────── */
export interface Product {
  id: string;
  title: string;
  sku: string;
  price: number;
  emoji: string;
  hue: string;
  shots: number;
  synced: boolean;
}

export const products: Product[] = [
  { id: "p1", title: "Aurora Linen Tote", sku: "TOTE-AUR-01", price: 68, emoji: "👜", hue: "345", shots: 12, synced: true },
  { id: "p2", title: "Terra Mug — Sand", sku: "MUG-TER-SD", price: 24, emoji: "☕", hue: "40", shots: 8, synced: true },
  { id: "p3", title: "Halo Lamp Mini", sku: "LAMP-HALO-M", price: 119, emoji: "💡", hue: "60", shots: 10, synced: true },
  { id: "p4", title: "Drift Throw Blanket", sku: "THRW-DRFT-GR", price: 89, emoji: "🧣", hue: "230", shots: 6, synced: false },
  { id: "p5", title: "Nimbus Diffuser", sku: "DIFF-NMB-01", price: 54, emoji: "💨", hue: "300", shots: 9, synced: true },
  { id: "p6", title: "Ember Candle — Fig", sku: "CNDL-EMB-FG", price: 32, emoji: "🕯️", hue: "30", shots: 7, synced: false },
  { id: "p7", title: "Vela Wine Glasses", sku: "GLAS-VELA-S2", price: 46, emoji: "🍷", hue: "345", shots: 5, synced: true },
  { id: "p8", title: "Pebble Soap Dish", sku: "DISH-PBL-WH", price: 18, emoji: "🧼", hue: "158", shots: 4, synced: false },
];

/* ── Shots (the gallery — the signature surface) ──────────────────────────── */
export type ShotStatus = "synced" | "approved" | "rendering" | "draft";

export interface Shot {
  id: string;
  title: L;
  product: string;
  productEmoji: string;
  scene: string; // scene name
  kind: SceneKind;
  hue: string;
  status: ShotStatus;
  span?: boolean; // gets a taller / wider tile in the masonry grid
}

export const shots: Shot[] = [
  { id: "h1", title: { tr: "Mermer flat-lay hero", en: "Marble flat-lay hero" }, product: "Aurora Linen Tote", productEmoji: "👜", scene: "Marble Studio", kind: "marble", hue: "250", status: "synced", span: true },
  { id: "h2", title: { tr: "Kafe masası anı", en: "Sunlit café table" }, product: "Terra Mug — Sand", productEmoji: "☕", scene: "Café Lifestyle", kind: "lifestyle", hue: "30", status: "synced" },
  { id: "h3", title: { tr: "Saf beyaz kesim", en: "Pure white cut-out" }, product: "Halo Lamp Mini", productEmoji: "💡", scene: "White Sweep", kind: "studio", hue: "60", status: "synced" },
  { id: "h4", title: { tr: "Altın saat hero", en: "Golden hour hero" }, product: "Vela Wine Glasses", productEmoji: "🍷", scene: "Golden Hour", kind: "outdoor", hue: "345", status: "approved" },
  { id: "h5", title: { tr: "Neon kampanya", en: "Neon campaign hero" }, product: "Nimbus Diffuser", productEmoji: "💨", scene: "Neon Noir", kind: "gradient", hue: "300", status: "rendering", span: true },
  { id: "h6", title: { tr: "Keten hediye seti", en: "Linen gifting set" }, product: "Ember Candle — Fig", productEmoji: "🕯️", scene: "Soft Linen", kind: "linen", hue: "75", status: "approved" },
  { id: "h7", title: { tr: "Sabun makro detay", en: "Soap macro detail" }, product: "Pebble Soap Dish", productEmoji: "🧼", scene: "White Sweep", kind: "studio", hue: "158", status: "draft" },
  { id: "h8", title: { tr: "Battaniye dokusu", en: "Throw texture close-up" }, product: "Drift Throw Blanket", productEmoji: "🧣", scene: "Soft Linen", kind: "linen", hue: "230", status: "synced" },
  { id: "h9", title: { tr: "Lamba yaşam tarzı", en: "Lamp lifestyle scene" }, product: "Halo Lamp Mini", productEmoji: "💡", scene: "Café Lifestyle", kind: "lifestyle", hue: "60", status: "approved" },
  { id: "h10", title: { tr: "Çanta gradyan", en: "Tote gradient hero" }, product: "Aurora Linen Tote", productEmoji: "👜", scene: "Neon Noir", kind: "gradient", hue: "345", status: "synced" },
];

/* ── Recent generations queue (live progress) ────────────────────────────── */
export interface GenJob {
  id: string;
  product: string;
  emoji: string;
  scene: L;
  progress: number; // 0-100
  eta: string;
}

export const genQueue: GenJob[] = [
  { id: "r1", product: "Nimbus Diffuser", emoji: "💨", scene: { tr: "Neon Noir · 4 varyant", en: "Neon Noir · 4 variants" }, progress: 64, eta: "~40 sn" },
  { id: "r2", product: "Pebble Soap Dish", emoji: "🧼", scene: { tr: "Beyaz fon kesimi", en: "White-background cut-out" }, progress: 22, eta: "~70 sn" },
  { id: "r3", product: "Drift Throw Blanket", emoji: "🧣", scene: { tr: "Keten · doku makrosu", en: "Soft Linen · texture macro" }, progress: 0, eta: "kuyrukta" },
];

/* ── Activity feed ────────────────────────────────────────────────────────── */
export interface DActivity { id: string; who: string; action: L; target: string; at: string; }
export const activity: DActivity[] = [
  { id: "a1", who: "Callypso Studio", action: { tr: "6 çekimi dışa aktardı:", en: "exported 6 creatives for" }, target: "Aurora Linen Tote", at: "2026-06-13T09:10:00Z" },
  { id: "a2", who: "Alex", action: { tr: "onayladı:", en: "approved the" }, target: "Marble Studio set", at: "2026-06-13T08:40:00Z" },
  { id: "a3", who: "Callypso Studio", action: { tr: "üretti:", en: "generated 12 shots in" }, target: "Café Lifestyle", at: "2026-06-12T17:25:00Z" },
  { id: "a4", who: "Callypso Studio", action: { tr: "fon temizledi:", en: "cut out backgrounds for" }, target: "Terra Mug — Sand", at: "2026-06-12T11:05:00Z" },
];

/* ── Generate page: 4 variations per generation (interactive) ─────────────── */
export type ExportRatio = "1:1" | "4:5" | "9:16";
export const exportRatios: ExportRatio[] = ["1:1", "4:5", "9:16"];

export interface ShotRecipe {
  id: string;
  label: L;
  ratio: ExportRatio;
}
/** Exactly 4 variations per Generate run — Studio/E-commerce, editorial, lifestyle, and Instagram/Meta Ads-ready. */
export const shotRecipes: ShotRecipe[] = [
  { id: "g1", label: { tr: "Önden hero, yumuşak gölge", en: "Front hero, soft shadow" }, ratio: "1:1" },
  { id: "g2", label: { tr: "45° açı, yansıtıcı zemin", en: "45° angle, reflective base" }, ratio: "4:5" },
  { id: "g3", label: { tr: "Sahnede yaşam tarzı", en: "Lifestyle in scene" }, ratio: "4:5" },
  { id: "g4", label: { tr: "Dikey story/reel kırpma", en: "Vertical story/reel crop" }, ratio: "9:16" },
];

/* ── Dashboard hero numbers ───────────────────────────────────────────────── */
export const studio = {
  shotsMade: "342",
  goal: 400,
  goalPct: 86,
  queue: genQueue.length,
};

/* ── Generations over time (dashboard chart) ──────────────────────────────── */
export interface TrendPoint { label: string; value: number; }
export const genTrend: TrendPoint[] = [
  { label: "Pzt", value: 34 },
  { label: "Sal", value: 52 },
  { label: "Çar", value: 41 },
  { label: "Per", value: 68 },
  { label: "Cum", value: 57 },
  { label: "Cmt", value: 49 },
  { label: "Paz", value: 41 },
];

/* ── Scene usage breakdown (which looks the store leans on) ────────────────── */
export interface SceneUsage { id: string; name: L; kind: SceneKind; hue: string; pct: number; shots: number; }
export const sceneUsage: SceneUsage[] = [
  { id: "u1", name: { tr: "Mermer Stüdyo", en: "Marble Studio" }, kind: "marble", hue: "250", pct: 31, shots: 128 },
  { id: "u2", name: { tr: "Beyaz Fon", en: "White Sweep" }, kind: "studio", hue: "345", pct: 24, shots: 96 },
  { id: "u3", name: { tr: "Altın Saat", en: "Golden Hour" }, kind: "outdoor", hue: "55", pct: 18, shots: 74 },
  { id: "u4", name: { tr: "Kafe Yaşam", en: "Café Lifestyle" }, kind: "lifestyle", hue: "30", pct: 13, shots: 52 },
  { id: "u5", name: { tr: "Yumuşak Keten", en: "Soft Linen" }, kind: "linen", hue: "75", pct: 9, shots: 38 },
  { id: "u6", name: { tr: "Neon Noir", en: "Neon Noir" }, kind: "gradient", hue: "320", pct: 5, shots: 31 },
];

/* ── Top products (most-shot catalog items) ───────────────────────────────── */
export interface TopProduct { id: string; title: string; emoji: string; hue: string; shots: number; synced: boolean; trend: number; }
export const topProducts: TopProduct[] = [
  { id: "t1", title: "Aurora Linen Tote", emoji: "👜", hue: "345", shots: 28, synced: true, trend: 12 },
  { id: "t2", title: "Halo Lamp Mini", emoji: "💡", hue: "60", shots: 22, synced: true, trend: 8 },
  { id: "t3", title: "Nimbus Diffuser", emoji: "💨", hue: "300", shots: 19, synced: true, trend: 21 },
  { id: "t4", title: "Terra Mug — Sand", emoji: "☕", hue: "40", shots: 16, synced: true, trend: -3 },
  { id: "t5", title: "Vela Wine Glasses", emoji: "🍷", hue: "345", shots: 14, synced: false, trend: 6 },
];

/* ── Credits / usage meter (render budget) ────────────────────────────────── */
export const credits = {
  used: 1290,
  total: 2000,
  pct: 65,
  renders: 342,
  cutouts: 188,
  variants: 96,
  resetLabel: { tr: "9 gün sonra yenilenir", en: "Renews in 9 days" } as L,
};

/* ── Brand Profile (colors, style, logo & visual preferences) ─────────────────
 * TODO(real integration): read/write via Supabase once connected — for now
 * this is the demo brand kit shown read-only in Settings → Brand Profile.
 */
export interface BrandProfile {
  colors: { name: string; hex: string }[];
  style: L[];
  visualPreferences: L[];
  logoText: string;
}
export const brandProfile: BrandProfile = {
  colors: [
    { name: "Primary", hex: "#c026a3" },
    { name: "Accent", hex: "#f23ca0" },
    { name: "Ink", hex: "#1c1230" },
  ],
  style: [
    { tr: "Minimal", en: "Minimal" },
    { tr: "Editöryel", en: "Editorial" },
    { tr: "Sıcak ışık", en: "Warm light" },
  ],
  visualPreferences: [
    { tr: "Mermer & keten yüzeyler", en: "Marble & linen surfaces" },
    { tr: "Yumuşak gölgeler", en: "Soft shadows" },
    { tr: "Doğal aksesuarlar", en: "Natural props" },
  ],
  logoText: "Cs",
};
