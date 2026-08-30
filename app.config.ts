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
  name: "Pixmint",
  tagline: { tr: "Stüdyo kalitesinde ürün fotoğrafları, istediğin an üretilsin.", en: "Studio-grade product photos, generated on demand." },
  description: {
    tr: "Pixmint ürününün tek bir telefon fotoğrafını markana uygun, stüdyo kalitesinde bir çekim setine dönüştürür — yaşam tarzı, beyaz fon ve sezonluk — doğrudan mağazana senkronlanır.",
    en: "Pixmint turns a single phone snap of your product into a full set of on-brand studio shots — lifestyle, white-background and seasonal — synced straight to your store.",
  },
  domain: "pixmint.studio",
  logoText: "Px",
  accentName: "fuchsia",

  marketing: {
    badge: { tr: "AI ürün fotoğrafçılığı", en: "AI product photography" },
    heroTitle: {
      tr: "Kataloğa hazır ürün çekimleri,",
      en: "Catalog-ready product shots,",
    },
    heroAccent: {
      tr: "stüdyoya gerek kalmadan.",
      en: "without the studio.",
    },
    heroSubtitle: {
      tr: "Tek bir fotoğraf yükle, bir görünüm seç; Pixmint markana uygun temiz bir ürün görseli seti üretir — yaşam tarzı sahneleri, net beyaz fonlar ve kampanya hero çekimleri — Shopify'a göndermeye hazır.",
      en: "Upload one photo, pick a look, and Pixmint generates a clean set of on-brand product images — lifestyle scenes, crisp white backgrounds and campaign hero shots — ready to push to Shopify.",
    },
    heroCtaPrimary: { tr: "Bir çekim üret", en: "Generate a shot" },
    heroCtaSecondary: { tr: "Galeriyi gör", en: "See the gallery" },
    features: [
      { icon: "sparkles", title: { tr: "Tek kare, tam set", en: "One snap, a full set" }, body: { tr: "Tek bir ürün fotoğrafı bırak; bir düzine cilalı açı, sahne ve kırpma al — ışık kutusu yok, fotoğrafçı yok, yeniden çekim yok.", en: "Drop in a single product photo and get a dozen polished angles, scenes and crops — no lightbox, no photographer, no reshoots." } },
      { icon: "palette", title: { tr: "Markana kilitli", en: "Locked to your brand" }, body: { tr: "Paletini, aksesuarlarını ve havanı bir kez ayarla. Her üretilen çekim markana uygun gelir; grid'in ve ürün sayfan tutarlı kalır.", en: "Set your palette, props and mood once. Every generated shot lands on-brand, so your grid and PDP stay consistent." } },
      { icon: "image", title: { tr: "Her sahnede yaşam tarzı", en: "Lifestyle in any scene" }, body: { tr: "Ürünleri mermere, ketene, güneşli bir kafe masasına ya da temiz bir stüdyo fonuna yerleştir — tarif et, Pixmint sahneyi kursun.", en: "Place products on marble, linen, a sunlit café table or a clean studio sweep — describe it and Pixmint builds the scene." } },
      { icon: "wand-sparkles", title: { tr: "Temiz kesimler, ücretsiz", en: "Clean cut-outs, free" }, body: { tr: "Pazaryeri listeleri için net kenarlar ve saf beyaz fonlar, her çekimden otomatik üretilir.", en: "Crisp edges and pure white backgrounds for marketplace listings, generated automatically from every shot." } },
      { icon: "package", title: { tr: "Mağazana senkron", en: "Synced to your store" }, body: { tr: "Bir çekimi onayla; doğrudan ilgili Shopify ürününe gider — görseller sattığın yerde, tek tıkla.", en: "Approve a shot and it pushes straight to the right Shopify product — images live where you sell, in one click." } },
      { icon: "layers", title: { tr: "Varyantlar ve sezonlar", en: "Variants & seasons" }, body: { tr: "Bir hero çekiminin Kara Cuma, yaz veya hediye versiyonlarını saniyeler içinde aynı kaynak üründen üret.", en: "Spin up Black Friday, summer or gifting versions of a hero shot in seconds, all from the same source product." } },
    ],
    stats: [
      { value: "12 çekim", label: { tr: "tek fotoğraftan", en: "from one photo" } },
      { value: "90sn", label: { tr: "tam bir sete", en: "to a full set" } },
      { value: "$0", label: { tr: "stüdyo kirası", en: "studio rental" } },
      { value: "0", label: { tr: "anahtarla dene", en: "keys to try it" } },
    ],
    pricing: [
      { name: "Starter", price: "$0", period: "/ay", tagline: { tr: "İlk listelerin için.", en: "For your first listings." }, features: [{ tr: "1 marka kiti", en: "1 brand kit" }, { tr: "Aylık 30 çekim", en: "30 shots / mo" }, { tr: "Beyaz fon kesimleri", en: "White-background cut-outs" }, { tr: "PNG ve JPG dışa aktarma", en: "PNG & JPG export" }], cta: { tr: "Ücretsiz başla", en: "Start free" } },
      { name: "Store", price: "$39", period: "/ay", tagline: { tr: "Büyüyen bir katalog için.", en: "For a growing catalog." }, features: [{ tr: "3 marka kiti", en: "3 brand kits" }, { tr: "Sınırsız çekim", en: "Unlimited shots" }, { tr: "Yaşam tarzı sahneleri", en: "Lifestyle scenes" }, { tr: "Shopify senkronu", en: "Shopify sync" }, { tr: "4K dışa aktarma", en: "4K export" }], cta: { tr: "Ücretsiz dene", en: "Start free trial" }, featured: true },
      { name: "Studio", price: "$129", period: "/ay", tagline: { tr: "Ajanslar ve büyük kataloglar için.", en: "For agencies & big catalogs." }, features: [{ tr: "Sınırsız marka kiti", en: "Unlimited brand kits" }, { tr: "Toplu üretim", en: "Bulk generation" }, { tr: "Müşteri çalışma alanları", en: "Client workspaces" }, { tr: "Öncelikli render", en: "Priority rendering" }], cta: { tr: "Bize ulaş", en: "Talk to us" } },
    ],
    faq: [
      { q: { tr: "Denemek için API anahtarı gerekli mi?", en: "Do I need API keys to try it?" }, a: { tr: "Hayır. Pixmint örnek bir ürün kataloğu ve üretilmiş çekimlerle demo modda açılır; hemen tıklayıp gezebilirsin. Gerçekten üretmek ve senkronlamak için fal.ai ve Shopify anahtarlarını sonra ekle.", en: "No. Pixmint boots in demo mode with a sample product catalog and generated shots so you can click around immediately. Add your fal.ai and Shopify keys later to generate and sync for real." } },
      { q: { tr: "Çekimler gerçekten ürünüm gibi görünür mü?", en: "Will the shots actually look like my product?" }, a: { tr: "Evet — Pixmint yüklediğin fotoğrafı temel alır; renkler, biçim ve etiketler aslına sadık kalır. Her çekimi mağazana dokunmadan önce sen incelersin.", en: "Yes — Pixmint conditions on your uploaded photo, so colors, shape and labels stay true. You review every shot before it touches your store." } },
      { q: { tr: "Görselleri mağazama gönderebilir mi?", en: "Can it push images to my store?" }, a: { tr: "Ayarlar'dan Shopify'ı bağla; onaylanan çekimler eşleşen ürüne senkronlanır. Ya da dosyaları indirip istediğin yere yükle.", en: "Connect Shopify in Settings and approved shots sync to the matching product. Or just download the files and upload anywhere." } },
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
      key: "shopify",
      name: "Shopify",
      envVars: ["SHOPIFY_STORE_DOMAIN", "SHOPIFY_ADMIN_ACCESS_TOKEN"],
      required: false,
      docsUrl: "https://shopify.dev/docs/apps/auth/admin-app-access-tokens",
      purpose: "Syncs your product list and pushes approved shots to the right product.",
    },
    {
      key: "supabase",
      name: "Supabase",
      envVars: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
      required: false,
      docsUrl: "https://supabase.com/dashboard/project/_/settings/api",
      purpose: "Stores products, brand kits and generated shots. Without it, runs in demo mode.",
    },
  ],
};

export default appConfig;
