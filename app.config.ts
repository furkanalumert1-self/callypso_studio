/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  app.config.ts — the single source of truth for this starter.            │
 * │  Every user-facing string is bilingual: { tr, en }.                      │
 * │  Run `/setup` (or say "bu projeyi kur") to rebrand.                       │
 * └──────────────────────────────────────────────────────────────────────────┘
 */
import type { L } from "@/lib/i18n/config";

export type IconName = string;

export interface NavItem { label: L; href: string; icon: IconName; }
export interface Feature { icon: IconName; title: L; body: L; }
export interface Stat { value: string; label: L; }
export interface PricingTier { name: string; price: string; period?: string; tagline: L; features: L[]; cta: L; featured?: boolean; }
export interface FaqItem { q: L; a: L; }
export interface Integration { key: string; name: string; envVars: string[]; required: boolean; docsUrl: string; purpose: string; }

export interface AppConfig {
  name: string;
  tagline: L;
  description: L;
  domain: string;
  logoText: string;
  accentName: string;
  marketing: {
    badge: L; heroTitle: L; heroAccent: L; heroSubtitle: L; heroCtaPrimary: L; heroCtaSecondary: L;
    features: Feature[]; stats: Stat[]; pricing: PricingTier[]; faq: FaqItem[];
  };
  nav: NavItem[];
  integrations: Integration[];
}

export const appConfig: AppConfig = {
  name: "Callypso Studio",
  tagline: { tr: "Tek bir ürün fotoğrafını satışa hazır kreatiflere dönüştür.", en: "Turn one product photo into sales-ready creatives." },
  description: {
    tr: "Callypso Studio, e-ticaret markalarının tek bir ürün fotoğrafından AI ile profesyonel satış kreatifleri üretmesini sağlar — ürün kilitli, markana uygun, Studio'dan Meta Ads'e kadar her kullanım için hazır.",
    en: "Callypso Studio is an AI creative studio for e-commerce brands — it turns a single product photo into professional, on-brand, product-locked sales creatives, ready for anything from Studio to Meta Ads.",
  },
  domain: "callypsostudio.com",
  logoText: "Cs",
  accentName: "fuchsia",

  marketing: {
    badge: { tr: "E-ticaret için AI Kreatif Stüdyo", en: "AI Creative Studio for E-commerce" },
    heroTitle: {
      tr: "Satışa hazır ürün kreatifleri,",
      en: "Sales-ready product creatives,",
    },
    heroAccent: {
      tr: "stüdyoya gerek kalmadan.",
      en: "without the studio.",
    },
    heroSubtitle: {
      tr: "Tek bir ürün fotoğrafı yükle; Callypso Studio ürününü kilitler, marka profiline uygun bir sahne şablonu uygular ve saniyeler içinde 4 varyasyon üretir. Studio, Lifestyle, Instagram, Meta Ads ve E-ticaret için hazır — onayla ve dışa aktar.",
      en: "Upload one product photo; Callypso Studio locks the product, applies an on-brand scene template, and generates 4 variations in seconds. Ready for Studio, Lifestyle, Instagram, Meta Ads and E-commerce — approve and export.",
    },
    heroCtaPrimary: { tr: "Bir kreatif üret", en: "Generate a creative" },
    heroCtaSecondary: { tr: "Galeriyi gör", en: "See the gallery" },
    features: [
      { icon: "lock", title: { tr: "Ürün Kilidi", en: "Product Lock" }, body: { tr: "Logo, yazı, renk, şekil ve ambalaj değişmeden kalır — Callypso Studio yalnızca sahneyi yeniden kurar, ürününü değil.", en: "Logo, text, color, shape and packaging stay untouched — Callypso Studio only rebuilds the scene, never your product." } },
      { icon: "palette", title: { tr: "Marka Profili", en: "Brand Profile" }, body: { tr: "Marka renklerini, stilini, logonu ve görsel tercihlerini bir kez ayarla; her üretim markana kilitli kalır.", en: "Set your brand colors, style, logo and visual preferences once — every generation stays locked to your brand." } },
      { icon: "image", title: { tr: "Şablon Kilidi", en: "Template Lock" }, body: { tr: "Beğendiğin bir sahne/ışık/kompozisyonu kilitle; sonraki ürünlerinde aynı bakışı tek tıkla tekrar kullan.", en: "Lock a scene, light and composition you like, then reuse that exact look on your next products in one click." } },
      { icon: "sparkles", title: { tr: "4 varyasyon, saniyeler içinde", en: "4 variations, in seconds" }, body: { tr: "Her üretim aynı kaynak üründen 4 farklı varyasyon çıkarır; beğendiğini onayla, gerisini eleyebilirsin.", en: "Every generation produces 4 variations from the same source product — approve the ones you like, skip the rest." } },
      { icon: "wand-sparkles", title: { tr: "Hazır kullanım tipleri", en: "Ready-made use cases" }, body: { tr: "Studio, Lifestyle, Instagram, Meta Ads ve E-ticaret için hazır şablonlarla, doğru formatta üret.", en: "Generate in the right format with ready templates for Studio, Lifestyle, Instagram, Meta Ads and E-commerce." } },
      { icon: "layers", title: { tr: "Dışa aktarım oranları", en: "Export ratios" }, body: { tr: "Onayladığın her kreatifi 1:1, 4:5 ve 9:16 oranlarında dışa aktar — kanal ne olursa olsun hazır.", en: "Export every approved creative in 1:1, 4:5 and 9:16 — ready for any channel." } },
    ],
    stats: [
      { value: "4 varyasyon", label: { tr: "tek fotoğraftan", en: "from one photo" } },
      { value: "90sn", label: { tr: "onaya hazır sete", en: "to an approve-ready set" } },
      { value: "$0", label: { tr: "stüdyo kirası", en: "studio rental" } },
      { value: "0", label: { tr: "anahtarla dene", en: "keys to try it" } },
    ],
    pricing: [
      { name: "Starter", price: "$0", period: "/ay", tagline: { tr: "İlk listelerin için.", en: "For your first listings." }, features: [{ tr: "1 marka kiti", en: "1 brand kit" }, { tr: "Aylık 30 çekim", en: "30 shots / mo" }, { tr: "Beyaz fon kesimleri", en: "White-background cut-outs" }, { tr: "PNG ve JPG dışa aktarma", en: "PNG & JPG export" }], cta: { tr: "Ücretsiz başla", en: "Start free" } },
      { name: "Store", price: "$39", period: "/ay", tagline: { tr: "Büyüyen bir katalog için.", en: "For a growing catalog." }, features: [{ tr: "3 marka kiti", en: "3 brand kits" }, { tr: "Sınırsız çekim", en: "Unlimited shots" }, { tr: "Yaşam tarzı sahneleri", en: "Lifestyle scenes" }, { tr: "Shopify senkronu", en: "Shopify sync" }, { tr: "4K dışa aktarma", en: "4K export" }], cta: { tr: "Ücretsiz dene", en: "Start free trial" }, featured: true },
      { name: "Studio", price: "$129", period: "/ay", tagline: { tr: "Ajanslar ve büyük kataloglar için.", en: "For agencies & big catalogs." }, features: [{ tr: "Sınırsız marka kiti", en: "Unlimited brand kits" }, { tr: "Toplu üretim", en: "Bulk generation" }, { tr: "Müşteri çalışma alanları", en: "Client workspaces" }, { tr: "Öncelikli render", en: "Priority rendering" }], cta: { tr: "Bize ulaş", en: "Talk to us" } },
    ],
    faq: [
      { q: { tr: "Denemek için API anahtarı gerekli mi?", en: "Do I need API keys to try it?" }, a: { tr: "Hayır. Callypso Studio örnek bir ürün kataloğu ve üretilmiş kreatiflerle demo modda açılır; hemen tıklayıp gezebilirsin. Gerçekten üretmek için fal.ai anahtarını sonra ekle.", en: "No. Callypso Studio boots in demo mode with a sample product catalog and generated creatives so you can click around immediately. Add your fal.ai key later to generate for real." } },
      { q: { tr: "Kreatifler gerçekten ürünüm gibi görünür mü?", en: "Will the creatives actually look like my product?" }, a: { tr: "Evet — Ürün Kilidi sayesinde yüklediğin fotoğraf temel alınır; logo, yazı, renk, şekil ve ambalaj aslına sadık kalır. Her kreatifi mağazana dokunmadan önce sen onaylarsın.", en: "Yes — Product Lock conditions on your uploaded photo, so the logo, text, color, shape and packaging stay true. You approve every creative before it touches your store." } },
      { q: { tr: "Görselleri mağazama gönderebilir mi?", en: "Can it push images to my store?" }, a: { tr: "Bu ilk aşamada Shopify, ikas ve Meta senkronu henüz yok (yol haritamızda) — onayladığın kreatifleri 1:1, 4:5 ve 9:16 oranlarında dışa aktarıp istediğin yere yükleyebilirsin.", en: "Shopify, ikas and Meta sync aren't wired up yet in this first phase (they're on the roadmap) — export your approved creatives in 1:1, 4:5 and 9:16 and upload them anywhere." } },
      { q: { tr: "Teknoloji nedir?", en: "What's the stack?" }, a: { tr: "Next.js 16, React 19, Tailwind v4. Her yere dağıtabileceğin standart bir uygulama.", en: "Next.js 16, React 19, Tailwind v4. It's a standard app you can deploy anywhere." } },
    ],
  },

  nav: [
    { label: { tr: "Genel", en: "Overview" }, href: "/dashboard", icon: "layout-dashboard" },
    { label: { tr: "Ürünler", en: "Products" }, href: "/products", icon: "package" },
    { label: { tr: "Üret", en: "Generate" }, href: "/generate", icon: "sparkles" },
    { label: { tr: "Sahneler", en: "Scenes" }, href: "/scenes", icon: "image" },
    { label: { tr: "Ayarlar", en: "Settings" }, href: "/settings", icon: "settings" },
  ],

  integrations: [
    {
      key: "fal",
      name: "fal.ai",
      envVars: ["FAL_KEY"],
      required: false,
      docsUrl: "https://fal.ai/dashboard/keys",
      purpose: "Generates product shots, lifestyle scenes and clean cut-outs from a single photo.",
    },
    {
      // TODO(real integration): Shopify push is a demo stub in phase 1. ikas and
      // Meta Ads sync are on the roadmap but intentionally not built yet.
      key: "shopify",
      name: "Shopify",
      envVars: ["SHOPIFY_STORE_DOMAIN", "SHOPIFY_ADMIN_ACCESS_TOKEN"],
      required: false,
      docsUrl: "https://shopify.dev/docs/apps/auth/admin-app-access-tokens",
      purpose: "Syncs your product list and pushes approved creatives to the right product. (Roadmap — not wired up yet.)",
    },
    {
      key: "supabase",
      name: "Supabase",
      envVars: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"],
      required: false,
      docsUrl: "https://supabase.com/dashboard/project/_/settings/api",
      purpose: "Stores products, brand profiles, locked templates and generated creatives. Without it, runs in demo mode.",
    },
  ],
};

export default appConfig;
