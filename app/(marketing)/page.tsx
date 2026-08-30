"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight, ArrowRight, Sparkles, Palette, Image as ImageIcon, WandSparkles,
  Package, Layers, Check, Plus, Minus, Download, RefreshCw, ArrowLeftRight,
  Sun, Snowflake, Store, Hand, BadgeCheck, Briefcase, Upload, MousePointerClick,
} from "lucide-react";
import { LogoMark } from "@/components/ui/logo";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ShotImage, type ScenePreset } from "@/components/shot-image";
import { useLang } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

const moduleIcons = [Sparkles, Palette, ImageIcon, WandSparkles, Package, Layers];

const content = {
  tr: {
    nav: ["Ne yapar", "Nasıl çalışır", "Fiyatlar"], signin: "Giriş yap", demo: "Demoyu dene",
    badge: "AI ürün fotoğrafçılığı stüdyosu",
    h1a: "Tek fotoğraf gir,", h1b: "tam bir çekim seti çık.", h1c: "Stüdyoya gerek yok.",
    sub: "Pixmint ürününün tek bir telefon karesini alır; ışık kutusu, fotoğrafçı ve yeniden çekim olmadan markana kilitli, kataloğa hazır bir çekim seti üretir — yaşam tarzı sahneleri, net beyaz fonlar, kampanya hero'ları — doğrudan mağazana.",
    cta1: "Bir çekim üret", cta2: "Galeriyi gör", note: "· kart yok · 60 saniyelik demo",
    proofAvatars: "300+ DTC mağazası çekimlerini Pixmint'e ürettiriyor.",
    marqueeTitle: "Pixmint her sahneyi kurar",
    marquee: ["Beyaz Fon", "Mermer Stüdyo", "Altın Saat", "Kafe Masası", "Yumuşak Keten", "Neon Noir", "Çakıl & Su", "Bitki Köşesi", "Cam Yüzey", "Kraft Kâğıt", "Pastel Set", "Gece Vitrini"],
    problemKicker: "Eski yol", problemH: ["Stüdyo pahalı,", "her yeniden çekim bir gün."],
    problemBody: "Işık kutusu kirası, fotoğrafçı günlüğü, geri dönüş süresi, her varyant ve sezon için yeni bir çekim... ürün sayfan boş kalır, listelerin tutarsız görünür, satış kaçar. Pixmint bütün bu işi tek fotoğrafa ve birkaç dakikaya indirir.",
    problemStats: [
      { n: "$450", l: "ürün başına fotoğrafçı + stüdyo" },
      { n: "3 gün", l: "çekimden teslime bekleme" },
      { n: "8", l: "hâlâ görseli olmayan ürün" },
      { n: "%0", l: "listeler arası tutarlılık" },
    ],
    whatKicker: "Ne yapar", whatH: ["Bir çekim ekibi kadar iş,", "tek panelde, sessizce."],
    modules: [
      { t: "Tek kare, tam set", b: "Tek bir ürün fotoğrafı bırak; bir düzine cilalı açı, sahne ve kırpma al — ışık kutusu yok, fotoğrafçı yok, yeniden çekim yok." },
      { t: "Markana kilitli", b: "Paletini, aksesuarlarını ve havanı bir kez ayarla. Her çekim markana uygun gelir; grid'in ve ürün sayfan tutarlı kalır." },
      { t: "Her sahnede yaşam tarzı", b: "Ürünleri mermere, ketene, güneşli bir kafe masasına ya da temiz bir stüdyo fonuna yerleştir — tarif et, Pixmint sahneyi kursun." },
      { t: "Temiz kesimler, ücretsiz", b: "Pazaryeri listeleri için net kenarlar ve saf beyaz fonlar, her çekimden otomatik üretilir." },
      { t: "Mağazana senkron", b: "Bir çekimi onayla; doğrudan ilgili Shopify ürününe gider — görseller sattığın yerde, tek tıkla." },
      { t: "Varyantlar ve sezonlar", b: "Bir hero'nun Kara Cuma, yaz veya hediye versiyonlarını saniyeler içinde aynı kaynak üründen üret." },
    ],
    stepsKicker: "Üç adım", stepsH: ["Fotoğraf, sahne,", "yayında."],
    steps: [
      { n: "01", t: "Bir kare yükle", b: "Telefonla çekilmiş tek bir ürün fotoğrafı yeter. Pixmint ürünü tanır, fonu çözer." },
      { n: "02", t: "Bir sahne seç", b: "Mermer, altın saat, beyaz fon... bir bak tıkla. Markana kilitli her seferinde." },
      { n: "03", t: "Onayla & senkronla", b: "Beğendiğin çekimleri onayla; tek tıkla mağazana ve sosyal kanallarına iner." },
    ],
    showcaseKicker: "Çekim galerisi", showcaseH: ["Tek üründen,", "bir vitrin dolusu çekim."],
    showcaseBody: "Aynı kaynak fotoğraf, altı farklı sahne. Hepsi markana kilitli, hepsi mağazaya hazır.",
    proof: [
      { big: "12", l: "tek fotoğraftan çekim", c: "Ortalama bir üründen üretilen set" },
      { big: "90sn", l: "tam bir sete", c: "Yükle, sahne seç, render et" },
      { big: "%96", l: "daha ucuz", c: "Stüdyo + fotoğrafçıya kıyasla" },
    ],
    testKicker: "Mağazalardan", testH: "Kataloğu çeviren ekipler.",
    tests: [
      { q: "İlk haftada 8 ürünün ürün sayfasını doldurduk. Eskiden bir fotoğrafçı turu bütçemizin yarısıydı.", n: "Lara M.", r: "Aurora Goods, kurucu", metric: "Çekim maliyeti −%92" },
      { q: "Mermer ve altın saat sahnelerini marka kitimize kilitledik; artık her liste aynı dilden konuşuyor.", n: "Devin K.", r: "Nimbus Home, e-ticaret", metric: "Dönüşüm +%18" },
      { q: "Kara Cuma için 40 hero varyantını bir öğleden sonrada çıkardık. Stüdyoyla imkânsızdı.", n: "Sena T.", r: "Vela & Co, pazarlama", metric: "40 varyant / 1 gün" },
      { q: "Etsy mağazamın görselleri artık butik bir markaya benziyor. Telefonla çektiğim kareler bunlar.", n: "Mira A.", r: "Loom & Clay, el yapımı", metric: "Liste tıklaması +%24" },
      { q: "Ajans olarak 6 müşterinin kataloğunu aynı hafta teslim ettik. Stüdyo takvimi artık darboğaz değil.", n: "Ozan B.", r: "Northlight Studio, ajans", metric: "6 müşteri / 1 hafta" },
      { q: "Yeni ürünü stoğa girer girmez fotoğrafları hazır oluyor. Boş ürün sayfası diye bir şey kalmadı.", n: "Yasemin K.", r: "Pebble & Co, e-ticaret", metric: "Teslim 3 gün → 90 sn" },
    ],
    compareKicker: "Karşılaştır", compareH: ["Stüdyo, Photoshop", "ve Pixmint."],
    compareCols: ["Stüdyo çekimi", "Photoshop", "Pixmint"],
    compareRows: [
      { l: "Bir set için maliyet", a: "$300–600 / ürün", p: "Saatlik tasarımcı", b: "Plan dahili" },
      { l: "Geri dönüş", a: "2–5 gün", p: "Saatler", b: "~90 saniye" },
      { l: "Beceri gerektirir", a: "Fotoğrafçı + set", p: "İleri düzey editör", b: "Hiçbiri — tıkla" },
      { l: "Yeniden çekim / varyant", a: "Yeni randevu", p: "Elle yeniden çiz", b: "Anında varyant" },
      { l: "Yaşam tarzı sahneleri", a: "Lokasyon kirası", p: "Manuel kompozit", b: "Tek tık sahne" },
      { l: "Marka tutarlılığı", a: "Fotoğrafçıya bağlı", p: "Dosyaya bağlı", b: "Kite kilitli" },
      { l: "Beyaz fon kesimi", a: "Ek iş", p: "Elle maskeleme", b: "Otomatik & ücretsiz" },
      { l: "Mağaza senkronu", a: "Manuel yükleme", p: "Manuel dışa aktar", b: "Tek tıkla" },
    ],
    promiseKicker: "Dürüst söz", promiseH: ["Ürünü sahnele.", "Çarpıtma."],
    promiseBody: "Pixmint çekimi yüklediğin fotoğrafa dayandırır — renk, biçim ve etiket aslına sadık kalır. Sahne ve ışık değişir, ürünün değişmez. Her çekimi mağazana dokunmadan önce sen incelersin.",
    promiseBullets: [
      "Ürünün rengi, biçimi ve etiketleri olduğu gibi korunur.",
      "Her çekim, yayınlanmadan önce senin onayından geçer.",
      "Orijinal fotoğraflar her zaman saklanır, indirilebilir.",
      "Üretilen her görsel senindir; telif ve kullanım hakları sana ait.",
    ],
    pricingKicker: "Fiyatlar", pricingH: ["Bir stüdyo.", "Dürüst fiyat."],
    plans: [
      { name: "Starter", price: "$0", cad: "başlangıç", body: "İlk listelerin için. Tek marka, az sayıda çekim.", bullets: ["1 marka kiti", "Aylık 30 çekim", "Beyaz fon kesimleri", "PNG & JPG dışa aktarma"], cta: "Ücretsiz başla", featured: false },
      { name: "Store", price: "$39", cad: "/ay", body: "Büyüyen bir katalog için tam stüdyo deneyimi.", bullets: ["3 marka kiti", "Sınırsız çekim", "Yaşam tarzı sahneleri", "Shopify senkronu", "4K dışa aktarma"], cta: "Ücretsiz dene", featured: true },
      { name: "Studio", price: "$129", cad: "/ay", body: "Ajanslar ve büyük kataloglar: ekip, müşteri alanları.", bullets: ["Sınırsız marka kiti", "Toplu üretim", "Müşteri çalışma alanları", "Öncelikli render"], cta: "Bize ulaş", featured: false },
    ],
    faqKicker: "Merak edilenler", faqH: "Kısa cevaplar.",
    faq: [
      { q: "Denemek için API anahtarı gerekir mi?", a: "Hayır. Pixmint örnek bir ürün kataloğu ve üretilmiş çekimlerle demo modda açılır — hemen tıklayabilirsin. Gerçekten üretmek ve senkronlamak için fal.ai ve Shopify anahtarlarını sonra eklersin." },
      { q: "Çekimler gerçekten ürünüm gibi görünür mü?", a: "Evet — Pixmint yüklediğin fotoğrafı temel alır; renkler, biçim ve etiketler aslına sadık kalır. Her çekimi mağazana dokunmadan önce sen incelersin." },
      { q: "Görselleri mağazama gönderebilir mi?", a: "Ayarlar'dan Shopify'ı bağla; onaylanan çekimler eşleşen ürüne senkronlanır. Ya da dosyaları indirip istediğin yere yükle." },
      { q: "Hangi formatları dışa aktarabilirim?", a: "Pazaryeri kareleri (1:1), PDP ve sosyal oranları (4:5, 9:16, 16:9), beyaz fon kesimleri ve 4K çıktılar. Her kanal için doğru boyut tek tıkla hazır." },
      { q: "Kendi marka kitimi kullanabilir miyim?", a: "Evet. Paletini, aksesuarlarını ve havanı bir kez ayarla; her çekim o kite kilitlenir, böylece tüm listelerin aynı görünür." },
      { q: "Kaç ürün ve çekim üretebilirim?", a: "Plana bağlı: Starter ayda 30 çekim, Store sınırsız, Studio toplu üretim ve müşteri alanları ekler. Kataloğun büyüdükçe yükseltebilirsin." },
      { q: "Orijinal fotoğraflarım saklanır mı?", a: "Her zaman. Yüklediğin orijinaller saklanır ve indirilebilir; ürettiğimiz her görselin hakları sana aittir." },
      { q: "Teknoloji nedir?", a: "Next.js 16, React 19, Tailwind v4. Her yere dağıtabileceğin standart bir uygulama." },
    ],
    finaleKicker: "Dene · 60 saniye", finaleH: ["Bir sonraki ürünü", "stüdyosuz çek."],
    finaleBody: "Önceden doldurulmuş canlı bir stüdyo demosunu gez — her ekran tıklanabilir. Kart yok, kayıt yok.",
    footTagline: "Stüdyoya gerek kalmadan, kataloğa hazır ürün çekimleri.",

    /* Interactive demo */
    tryKicker: "Sahneni seç", tryH: ["Bir ürün seç,", "sahneyi kur."],
    tryBody: "Bir ürün ve bir fon seç — sahne anında yeniden çizilir. Işığı çevir, havanın nasıl değiştiğini gör. Hepsi tarayıcında, sahte fotoğraf yok.",
    tryProduct: "Ürün", tryScene: "Fon", tryLight: "Işık", tryLightWarm: "Sıcak", tryLightCool: "Soğuk",
    tryProducts: [
      { emoji: "👜", name: "Aurora Çanta" }, { emoji: "🕯️", name: "Ember Mum" },
      { emoji: "🍷", name: "Vela Kadeh" }, { emoji: "💨", name: "Nimbus Difüzör" },
    ],
    tryScenes: [
      { label: "Mermer", kind: "marble", hue: "250" }, { label: "Stüdyo", kind: "studio", hue: "345" },
      { label: "Doğa", kind: "outdoor", hue: "55" }, { label: "Gradyan", kind: "gradient", hue: "320" },
    ],
    tryHint: "Her seçim markana kilitli yeni bir varyant üretir.",

    /* Use-cases / personas */
    useKicker: "Kimler için", useH: ["Tek panel,", "her satıcı için."],
    useCases: [
      { icon: "store", t: "E-ticaret ekipleri", b: "Yüzlerce listeyi tutarlı, dönüşen ürün görselleriyle doldur — sezon başına yeni çekim derdi yok." },
      { icon: "hand", t: "El yapımı satıcılar", b: "Etsy ya da kendi mağazan: tek telefon karesinden butik bir vitrin görünümü yakala." },
      { icon: "brand", t: "Markalar", b: "Paletini ve havanı kilitle; her kanalda — PDP, reklam, sosyal — aynı dili konuşan görseller." },
      { icon: "agency", t: "Ajanslar", b: "Birden çok müşteri alanı, toplu üretim ve öncelikli render ile katalogları gün içinde çevir." },
    ],

    /* Backdrops gallery */
    bdKicker: "Sahneler & fonlar", bdH: ["Bir kütüphane dolusu", "sahne, hazır bekliyor."],
    bdBody: "Mermerden suya, ahşaptan neona — bir bakışta seç, Pixmint ürününü o sahneye yerleştirsin.",
    backdrops: [
      { label: "Mermer Stüdyo", kind: "marble", hue: "250", emoji: "🧴" },
      { label: "Beyaz Fon", kind: "studio", hue: "345", emoji: "👜" },
      { label: "Doğa Işığı", kind: "outdoor", hue: "55", emoji: "🌿" },
      { label: "Neon Gradyan", kind: "gradient", hue: "320", emoji: "💨" },
      { label: "Yumuşak Keten", kind: "linen", hue: "75", emoji: "🕯️" },
      { label: "Ahşap Masa", kind: "lifestyle", hue: "30", emoji: "☕" },
      { label: "Çakıl & Su", kind: "outdoor", hue: "200", emoji: "🧼" },
      { label: "Pastel Set", kind: "gradient", hue: "20", emoji: "🌸" },
      { label: "Cam Yüzey", kind: "studio", hue: "220", emoji: "🍷" },
      { label: "Bitki Köşesi", kind: "outdoor", hue: "145", emoji: "🪴" },
    ],

    /* Workflow deep-dive + integrations */
    flowKicker: "Akış", flowH: ["Yükle, seç,", "indir."],
    flow: [
      { n: "01", t: "Ürün fotoğrafını yükle", b: "Telefonla çekilmiş tek bir kare yeter; Pixmint ürünü ve fonu çözer." },
      { n: "02", t: "Sahneyi seç", b: "Kütüphaneden bir fon tıkla ya da kendi tarifini yaz — markana kilitli." },
      { n: "03", t: "Varyantları al", b: "Bir set varyant, kırpma ve oran saniyeler içinde önüne gelir." },
      { n: "04", t: "İndir ya da senkronla", b: "Beğendiklerini indir veya tek tıkla doğrudan mağazana gönder." },
    ],
    fmtKicker: "Formatlar & entegrasyonlar", fmtBody: "Her pazaryeri ve sosyal kanal için doğru oranda dışa aktar.",
    formats: [
      { name: "Shopify", sub: "ürün senkronu" }, { name: "Instagram", sub: "1:1 · 4:5 · story" },
      { name: "Amazon", sub: "beyaz fon kesimi" }, { name: "Etsy", sub: "kare liste" },
      { name: "TikTok", sub: "9:16 video kare" }, { name: "Web PDP", sub: "16:9 banner" },
    ],
  },
  en: {
    nav: ["What it does", "How it works", "Pricing"], signin: "Sign in", demo: "Try the demo",
    badge: "AI product photography studio",
    h1a: "Drop one photo,", h1b: "get a full shot set.", h1c: "No studio required.",
    sub: "Pixmint takes a single phone snap of your product and generates an on-brand, catalog-ready shot set — lifestyle scenes, crisp white backgrounds, campaign heroes — with no lightbox, no photographer, no reshoots. Straight to your store.",
    cta1: "Generate a shot", cta2: "See the gallery", note: "· no card · 60-second demo",
    proofAvatars: "300+ DTC stores let Pixmint generate their shots.",
    marqueeTitle: "Pixmint builds every scene",
    marquee: ["White Sweep", "Marble Studio", "Golden Hour", "Café Table", "Soft Linen", "Neon Noir", "Pebble & Water", "Plant Corner", "Glass Surface", "Kraft Paper", "Pastel Set", "Night Vitrine"],
    problemKicker: "The old way", problemH: ["Studios are expensive,", "every reshoot is a day."],
    problemBody: "Lightbox rental, a photographer's day-rate, the turnaround wait, a fresh shoot for every variant and season... your PDP sits empty, your listings look inconsistent, and the sale slips. Pixmint collapses all of it into one photo and a few minutes.",
    problemStats: [
      { n: "$450", l: "photographer + studio, per product" },
      { n: "3 days", l: "shoot-to-delivery turnaround" },
      { n: "8", l: "products still with no images" },
      { n: "0%", l: "consistency across listings" },
    ],
    whatKicker: "What it does", whatH: ["A whole shoot team's work,", "in one panel, quietly."],
    modules: [
      { t: "One snap, a full set", b: "Drop in a single product photo and get a dozen polished angles, scenes and crops — no lightbox, no photographer, no reshoots." },
      { t: "Locked to your brand", b: "Set your palette, props and mood once. Every shot lands on-brand, so your grid and PDP stay consistent." },
      { t: "Lifestyle in any scene", b: "Place products on marble, linen, a sunlit café table or a clean studio sweep — describe it and Pixmint builds the scene." },
      { t: "Clean cut-outs, free", b: "Crisp edges and pure white backgrounds for marketplace listings, generated automatically from every shot." },
      { t: "Synced to your store", b: "Approve a shot and it pushes straight to the right Shopify product — images live where you sell, in one click." },
      { t: "Variants & seasons", b: "Spin up Black Friday, summer or gifting versions of a hero in seconds, all from the same source product." },
    ],
    stepsKicker: "Three steps", stepsH: ["Photo, scene,", "live."],
    steps: [
      { n: "01", t: "Upload one snap", b: "A single phone photo of the product is enough. Pixmint recognises it and resolves the background." },
      { n: "02", t: "Pick a scene", b: "Marble, golden hour, white sweep... glance and click. Locked to your brand every time." },
      { n: "03", t: "Approve & sync", b: "Approve the shots you love; one click pushes them to your store and social channels." },
    ],
    showcaseKicker: "Shot gallery", showcaseH: ["From one product,", "a vitrine of shots."],
    showcaseBody: "The same source photo, six different scenes. All on-brand, all store-ready.",
    proof: [
      { big: "12", l: "shots from one photo", c: "A typical set generated per product" },
      { big: "90s", l: "to a full set", c: "Upload, pick a scene, render" },
      { big: "96%", l: "cheaper", c: "Versus studio + photographer" },
    ],
    testKicker: "From stores", testH: "Teams turning catalogs around.",
    tests: [
      { q: "We filled 8 product pages in the first week. A photographer round used to be half our budget.", n: "Lara M.", r: "Aurora Goods, founder", metric: "Shoot cost −92%" },
      { q: "We locked the marble and golden-hour scenes to our kit; now every listing speaks the same language.", n: "Devin K.", r: "Nimbus Home, ecommerce", metric: "Conversion +18%" },
      { q: "We shipped 40 hero variants for Black Friday in one afternoon. Impossible with a studio.", n: "Sena T.", r: "Vela & Co, marketing", metric: "40 variants / 1 day" },
      { q: "My Etsy shop's images finally look like a boutique brand. These started as phone snaps.", n: "Mira A.", r: "Loom & Clay, handmade", metric: "Listing clicks +24%" },
      { q: "As an agency we delivered 6 client catalogs in the same week. Studio calendars are no longer the bottleneck.", n: "Ozan B.", r: "Northlight Studio, agency", metric: "6 clients / 1 week" },
      { q: "The moment a product hits stock, its photos are ready. We don't have empty product pages anymore.", n: "Yasemin K.", r: "Pebble & Co, ecommerce", metric: "Delivery 3 days → 90s" },
    ],
    compareKicker: "Compare", compareH: ["Studio, Photoshop", "and Pixmint."],
    compareCols: ["Studio shoot", "Photoshop", "Pixmint"],
    compareRows: [
      { l: "Cost per set", a: "$300–600 / product", p: "Designer hourly", b: "Included in plan" },
      { l: "Turnaround", a: "2–5 days", p: "Hours", b: "~90 seconds" },
      { l: "Skill required", a: "Photographer + set", p: "Advanced editor", b: "None — just click" },
      { l: "Reshoots / variants", a: "Book again", p: "Redraw by hand", b: "Instant variants" },
      { l: "Lifestyle scenes", a: "Location rental", p: "Manual composite", b: "One-click scene" },
      { l: "Brand consistency", a: "Up to the photographer", p: "Up to the file", b: "Locked to the kit" },
      { l: "White-bg cut-out", a: "Extra work", p: "Manual masking", b: "Automatic & free" },
      { l: "Store sync", a: "Manual upload", p: "Manual export", b: "One click" },
    ],
    promiseKicker: "The honest promise", promiseH: ["Stage the product.", "Never distort it."],
    promiseBody: "Pixmint conditions on the photo you upload — color, shape and labels stay true. The scene and light change, your product doesn't. You review every shot before it touches your store.",
    promiseBullets: [
      "Your product's color, shape and labels are preserved as-is.",
      "Every shot passes your review before it goes live.",
      "Original photos are always kept and downloadable.",
      "Everything generated is yours; rights and usage belong to you.",
    ],
    pricingKicker: "Pricing", pricingH: ["One studio.", "Honest pricing."],
    plans: [
      { name: "Starter", price: "$0", cad: "to start", body: "For your first listings. One brand, a few shots.", bullets: ["1 brand kit", "30 shots / mo", "White-background cut-outs", "PNG & JPG export"], cta: "Start free", featured: false },
      { name: "Store", price: "$39", cad: "/ mo", body: "The full studio for a growing catalog.", bullets: ["3 brand kits", "Unlimited shots", "Lifestyle scenes", "Shopify sync", "4K export"], cta: "Start free trial", featured: true },
      { name: "Studio", price: "$129", cad: "/ mo", body: "Agencies & big catalogs: team, client spaces.", bullets: ["Unlimited brand kits", "Bulk generation", "Client workspaces", "Priority rendering"], cta: "Talk to us", featured: false },
    ],
    faqKicker: "Good to know", faqH: "The short answers.",
    faq: [
      { q: "Do I need API keys to try it?", a: "No. Pixmint boots in demo mode with a sample catalog and generated shots — click around immediately. Add your fal.ai and Shopify keys later to generate and sync for real." },
      { q: "Will the shots actually look like my product?", a: "Yes — Pixmint conditions on your uploaded photo, so colors, shape and labels stay true. You review every shot before it touches your store." },
      { q: "Can it push images to my store?", a: "Connect Shopify in Settings and approved shots sync to the matching product. Or just download the files and upload anywhere." },
      { q: "What formats can I export?", a: "Marketplace squares (1:1), PDP and social ratios (4:5, 9:16, 16:9), white-background cut-outs and 4K exports. The right size for every channel is one click away." },
      { q: "Can I use my own brand kit?", a: "Yes. Set your palette, props and mood once and every shot locks to that kit, so all your listings look like one brand." },
      { q: "How many products and shots can I make?", a: "Depends on the plan: Starter gives 30 shots/mo, Store is unlimited, and Studio adds bulk generation and client workspaces. Upgrade as your catalog grows." },
      { q: "Are my original photos kept?", a: "Always. Your uploaded originals are stored and downloadable, and the rights to every image we generate belong to you." },
      { q: "What's the stack?", a: "Next.js 16, React 19, Tailwind v4. It's a standard app you can deploy anywhere." },
    ],
    finaleKicker: "Try it · 60 seconds", finaleH: ["Shoot your next product", "without a studio."],
    finaleBody: "Take a live studio demo for a spin — pre-loaded, every screen interactive. No card, no signup.",
    footTagline: "Catalog-ready product shots, without the studio.",

    /* Interactive demo */
    tryKicker: "Pick your scene", tryH: ["Pick a product,", "build the scene."],
    tryBody: "Choose a product and a backdrop — the scene redraws instantly. Flip the light and watch the mood change. All in your browser, no fake photos.",
    tryProduct: "Product", tryScene: "Backdrop", tryLight: "Light", tryLightWarm: "Warm", tryLightCool: "Cool",
    tryProducts: [
      { emoji: "👜", name: "Aurora Tote" }, { emoji: "🕯️", name: "Ember Candle" },
      { emoji: "🍷", name: "Vela Glass" }, { emoji: "💨", name: "Nimbus Diffuser" },
    ],
    tryScenes: [
      { label: "Marble", kind: "marble", hue: "250" }, { label: "Studio", kind: "studio", hue: "345" },
      { label: "Nature", kind: "outdoor", hue: "55" }, { label: "Gradient", kind: "gradient", hue: "320" },
    ],
    tryHint: "Every pick renders a fresh variant, locked to your brand.",

    /* Use-cases / personas */
    useKicker: "Who it's for", useH: ["One panel,", "every kind of seller."],
    useCases: [
      { icon: "store", t: "Ecommerce teams", b: "Fill hundreds of listings with consistent, converting product imagery — no fresh shoot each season." },
      { icon: "hand", t: "Handmade sellers", b: "Etsy or your own shop: get a boutique vitrine look from a single phone snap." },
      { icon: "brand", t: "Brands", b: "Lock your palette and mood; imagery that speaks one language across PDP, ads and social." },
      { icon: "agency", t: "Agencies", b: "Turn catalogs around in a day with client workspaces, bulk generation and priority rendering." },
    ],

    /* Backdrops gallery */
    bdKicker: "Scenes & backdrops", bdH: ["A library of scenes,", "ready and waiting."],
    bdBody: "From marble to water, wood to neon — pick at a glance and Pixmint places your product in the scene.",
    backdrops: [
      { label: "Marble Studio", kind: "marble", hue: "250", emoji: "🧴" },
      { label: "White Sweep", kind: "studio", hue: "345", emoji: "👜" },
      { label: "Nature Light", kind: "outdoor", hue: "55", emoji: "🌿" },
      { label: "Neon Gradient", kind: "gradient", hue: "320", emoji: "💨" },
      { label: "Soft Linen", kind: "linen", hue: "75", emoji: "🕯️" },
      { label: "Wood Table", kind: "lifestyle", hue: "30", emoji: "☕" },
      { label: "Pebble & Water", kind: "outdoor", hue: "200", emoji: "🧼" },
      { label: "Pastel Set", kind: "gradient", hue: "20", emoji: "🌸" },
      { label: "Glass Surface", kind: "studio", hue: "220", emoji: "🍷" },
      { label: "Plant Corner", kind: "outdoor", hue: "145", emoji: "🪴" },
    ],

    /* Workflow deep-dive + integrations */
    flowKicker: "The flow", flowH: ["Upload, pick,", "download."],
    flow: [
      { n: "01", t: "Upload a product photo", b: "A single phone snap is enough; Pixmint resolves the product and the background." },
      { n: "02", t: "Pick the scene", b: "Click a backdrop from the library or describe your own — locked to your brand." },
      { n: "03", t: "Get the variants", b: "A set of variants, crops and ratios lands in front of you in seconds." },
      { n: "04", t: "Download or sync", b: "Download the ones you love, or push them straight to your store in one click." },
    ],
    fmtKicker: "Formats & integrations", fmtBody: "Export at the right ratio for every marketplace and social channel.",
    formats: [
      { name: "Shopify", sub: "product sync" }, { name: "Instagram", sub: "1:1 · 4:5 · story" },
      { name: "Amazon", sub: "white-bg cut-out" }, { name: "Etsy", sub: "square listing" },
      { name: "TikTok", sub: "9:16 video frame" }, { name: "Web PDP", sub: "16:9 banner" },
    ],
  },
};

/* ── Hero illustration: a stack of generated shot cards ──────────────────── */
function ShotStack({ lang }: { lang: "tr" | "en" }) {
  const [scene, setScene] = useState(0);
  const looks: { kind: ScenePreset; hue: string; name: string }[] = [
    { kind: "marble", hue: "250", name: "Marble Studio" },
    { kind: "outdoor", hue: "55", name: "Golden Hour" },
    { kind: "gradient", hue: "320", name: "Neon Noir" },
  ];
  const cur = looks[scene];
  const t = {
    tr: { synced: "Senkron", brand: "Markaya kilitli", rendering: "Render", set: "12 çekim · 1 ürün" },
    en: { synced: "Synced", brand: "On-brand", rendering: "Rendering", set: "12 shots · 1 product" },
  }[lang];
  return (
    <div className="relative h-[460px] sm:h-[520px]">
      <div className="absolute right-0 top-6 w-[240px] rotate-6 overflow-hidden rounded-2xl bg-card shadow-pop ring-1 ring-border floaty" style={{ animationDelay: "1.2s" }}>
        <ShotImage scene="studio" hue="345" emoji="👜" className="aspect-[4/3] w-full" />
        <div className="flex items-center justify-between p-3">
          <p className="text-xs font-medium">White Sweep</p>
          <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">{t.synced}</span>
        </div>
      </div>
      <div className="absolute left-0 top-28 w-[230px] -rotate-3 overflow-hidden rounded-2xl bg-card shadow-pop ring-1 ring-border floaty">
        <ShotImage scene="lifestyle" hue="30" emoji="☕" className="aspect-[4/3] w-full" />
        <div className="p-3">
          <p className="text-xs font-medium">Café Lifestyle</p>
          <p className="text-[10px] text-muted-foreground">{t.brand}</p>
        </div>
      </div>
      <div className="absolute bottom-0 right-4 w-[264px] rotate-2 overflow-hidden rounded-2xl bg-card shadow-pop ring-1 ring-border floaty" style={{ animationDelay: "0.6s" }}>
        <div className="relative">
          <ShotImage scene={cur.kind} hue={cur.hue} emoji="🍷" className="aspect-[4/3] w-full" />
          <button onClick={() => setScene((s) => (s + 1) % looks.length)} className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-foreground shadow transition hover:scale-105">
            <ArrowLeftRight className="h-2.5 w-2.5" /> {cur.name}
          </button>
        </div>
        <div className="space-y-2 p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Vela Wine Glasses</p>
            <div className="flex gap-1">
              <span className="grid h-5 w-5 place-items-center rounded text-muted-foreground"><Download className="h-3 w-3" /></span>
              <span className="grid h-5 w-5 place-items-center rounded text-muted-foreground"><RefreshCw className="h-3 w-3" /></span>
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> {t.rendering}</span><span className="tabular-nums">84%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full" style={{ width: "84%", backgroundImage: "linear-gradient(90deg, var(--color-primary), var(--color-serif))" }} /></div>
          </div>
        </div>
      </div>
      <div className="absolute -left-2 top-2 hidden rounded-xl border border-border bg-card px-3 py-2 shadow-pop sm:block floaty" style={{ animationDelay: "0.3s" }}>
        <p className="flex items-center gap-1.5 text-xs font-medium"><span className="grid h-4 w-4 place-items-center rounded-full bg-success text-success-foreground"><Check className="h-3 w-3" /></span> {t.set}</p>
      </div>
    </div>
  );
}

/* ── Interactive "Sahneni seç" — pick product + backdrop + light ─────────── */
function SceneStudio({ lang }: { lang: "tr" | "en" }) {
  const c = content[lang];
  const [product, setProduct] = useState(0);
  const [scene, setScene] = useState(0);
  const [warm, setWarm] = useState(true);

  const prod = c.tryProducts[product];
  const sc = c.tryScenes[scene];
  // Light toggle nudges the hue warm/cool so the same scene reads differently.
  const litHue = warm ? sc.hue : String(Number(sc.hue) + 120);

  return (
    <div className="grid gap-6 rounded-[2rem] bg-card p-5 shadow-pop ring-1 ring-border sm:p-7 lg:grid-cols-[1fr_1.05fr]">
      {/* Controls */}
      <div className="flex flex-col gap-5">
        <div>
          <p className="label-mono mb-2.5 text-muted-foreground">{c.tryProduct}</p>
          <div className="grid grid-cols-4 gap-2">
            {c.tryProducts.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setProduct(i)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-center transition",
                  product === i ? "bg-primary/10 ring-2 ring-primary" : "bg-muted/60 ring-1 ring-border hover:bg-muted",
                )}
              >
                <span className="text-2xl">{p.emoji}</span>
                <span className="truncate text-[10.5px] font-medium leading-tight">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="label-mono mb-2.5 text-muted-foreground">{c.tryScene}</p>
          <div className="grid grid-cols-4 gap-2">
            {c.tryScenes.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setScene(i)}
                className={cn(
                  "overflow-hidden rounded-2xl text-center transition",
                  scene === i ? "ring-2 ring-primary" : "ring-1 ring-border hover:-translate-y-0.5",
                )}
              >
                <span className="block h-10 w-full" style={{ background: `linear-gradient(135deg, oklch(90% 0.07 ${s.hue}), oklch(70% 0.16 ${s.hue}))` }} />
                <span className="block py-1.5 text-[10.5px] font-medium">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="label-mono mb-2.5 text-muted-foreground">{c.tryLight}</p>
          <div className="inline-flex rounded-full bg-muted/70 p-1 ring-1 ring-border">
            <button
              onClick={() => setWarm(true)}
              className={cn("inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition", warm ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              <Sun className="h-3.5 w-3.5" /> {c.tryLightWarm}
            </button>
            <button
              onClick={() => setWarm(false)}
              className={cn("inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition", !warm ? "bg-serif text-white shadow-sm" : "text-muted-foreground hover:text-foreground")}
              style={!warm ? { background: "var(--color-serif)" } : undefined}
            >
              <Snowflake className="h-3.5 w-3.5" /> {c.tryLightCool}
            </button>
          </div>
        </div>
        <p className="mt-auto flex items-center gap-2 text-[12.5px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> {c.tryHint}
        </p>
      </div>

      {/* Live composed scene */}
      <div className="relative overflow-hidden rounded-3xl ring-1 ring-border">
        <ShotImage scene={sc.kind as ScenePreset} hue={litHue} emoji={prod.emoji} className="aspect-[4/3] w-full" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-foreground shadow backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" /> {prod.name} · {sc.label}
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
          {warm ? <Sun className="h-3 w-3" /> : <Snowflake className="h-3 w-3" />} {warm ? c.tryLightWarm : c.tryLightCool}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-foreground shadow backdrop-blur">
          <RefreshCw className="h-3 w-3 text-primary" /> 4:3
        </span>
      </div>
    </div>
  );
}

const useCaseIcons: Record<string, typeof Store> = { store: Store, hand: Hand, brand: BadgeCheck, agency: Briefcase };

export default function PixmintLanding() {
  const { lang } = useLang();
  const c = content[lang];
  const [open, setOpen] = useState<number | null>(0);

  const showcase: { kind: ScenePreset; hue: string; emoji: string; label: string }[] = [
    { kind: "studio", hue: "345", emoji: "👜", label: "White Sweep" },
    { kind: "marble", hue: "250", emoji: "🧴", label: "Marble Studio" },
    { kind: "outdoor", hue: "55", emoji: "🍷", label: "Golden Hour" },
    { kind: "lifestyle", hue: "30", emoji: "☕", label: "Café Lifestyle" },
    { kind: "linen", hue: "75", emoji: "🕯️", label: "Soft Linen" },
    { kind: "gradient", hue: "320", emoji: "💨", label: "Neon Noir" },
  ];

  return (
    <div className="min-h-dvh">
      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2.5"><LogoMark className="h-8 w-8" /><span className="font-display text-lg font-semibold tracking-tight">Pixmint</span></Link>
          <nav className="ml-auto hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#try" className="hover:text-foreground transition-colors">{c.tryKicker}</a>
            <a href="#what" className="hover:text-foreground transition-colors">{c.nav[0]}</a>
            <a href="#how" className="hover:text-foreground transition-colors">{c.nav[1]}</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">{c.nav[2]}</a>
          </nav>
          <div className="ml-auto flex items-center gap-2 md:ml-7">
            <LanguageToggle className="mr-1" />
            <Link href="/login" className="hidden px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground sm:inline-flex">{c.signin}</Link>
            <Link href="/signup" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition hover:opacity-90">{c.demo} <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--grad-hero)", opacity: 0.6 }} />
        <span className="blob -left-24 -top-20 -z-10 h-96 w-96 bg-primary/25 drift" aria-hidden />
        <span className="blob right-1/4 top-32 -z-10 h-72 w-72 drift" aria-hidden style={{ background: "color-mix(in oklch, var(--color-serif) 26%, transparent)", animationDelay: "2s" }} />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-24">
          <div>
            <p className="rise label-mono inline-flex items-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.badge}</p>
            <h1 className="rise mt-6 font-display text-[clamp(40px,6.5vw,76px)] font-semibold leading-[0.98] tracking-tight" style={{ animationDelay: "0.08s" }}>
              {c.h1a} <span className="hl-primary">{c.h1b}</span><br />
              <span className="display-accent font-normal">{c.h1c}</span>
            </h1>
            <p className="rise mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "0.18s" }}>{c.sub}</p>
            <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.28s" }}>
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-medium text-primary-foreground shadow-sm shadow-primary/25 transition hover:opacity-90">{c.cta1} <ArrowRight className="h-4 w-4" /></Link>
              <a href="#showcase" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium text-foreground ring-1 ring-border transition hover:bg-muted">{c.cta2}</a>
              <span className="hidden self-center label-mono text-muted-foreground sm:inline">{c.note}</span>
            </div>
            <div className="rise mt-9 flex items-center gap-3 text-sm text-muted-foreground" style={{ animationDelay: "0.38s" }}>
              <div className="flex -space-x-2">
                {["AG", "NH", "VC", "PB", "TM"].map((i, k) => (
                  <span key={i} className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold text-foreground/70 ring-2 ring-background" style={{ background: `oklch(${84 - k * 5}% 0.08 ${345 - k * 22})` }}>{i}</span>
                ))}
              </div>
              <span>{c.proofAvatars}</span>
            </div>
          </div>
          <div className="rise" style={{ animationDelay: "0.3s" }}><ShotStack lang={lang} /></div>
        </div>
      </section>

      {/* ── Interactive demo: Sahneni seç ───────────────────────────── */}
      <section id="try" className="border-t border-border py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <p className="label-mono inline-flex items-center justify-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.tryKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(28px,4.5vw,48px)] font-semibold leading-[1.04] tracking-tight">{c.tryH[0]} <span className="display-accent font-normal">{c.tryH[1]}</span></h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{c.tryBody}</p>
          </div>
          <SceneStudio lang={lang} />
        </div>
      </section>

      {/* ── Marquee ─────────────────────────────────────────────────── */}
      <section className="overflow-hidden border-y border-border py-7">
        <p className="label-mono mb-4 text-center text-muted-foreground">{c.marqueeTitle}</p>
        <div className="marquee gap-10">
          {[...c.marquee, ...c.marquee].map((it, i) => (
            <span key={i} className="display-accent whitespace-nowrap px-2 text-2xl text-muted-foreground/70">{it}<span className="ml-10 text-primary">·</span></span>
          ))}
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1fr_1.05fr] lg:px-8">
          <div>
            <p className="label-mono inline-flex items-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.problemKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(30px,4.5vw,52px)] font-semibold leading-[1.02] tracking-tight">{c.problemH[0]} <span className="display-accent font-normal">{c.problemH[1]}</span></h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">{c.problemBody}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {c.problemStats.map((s, i) => (
              <div key={s.l} className="rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border" style={{ transform: `rotate(${i % 2 ? 1.2 : -1.2}deg)` }}>
                <p className="font-display text-[40px] font-semibold leading-none tabular-nums text-primary">{s.n}</p>
                <p className="mt-2 text-[13px] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modules ─────────────────────────────────────────────────── */}
      <section id="what" className="border-t border-border bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="label-mono inline-flex items-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.whatKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(30px,4.5vw,52px)] font-semibold leading-[1.02] tracking-tight">{c.whatH[0]} <span className="display-accent font-normal">{c.whatH[1]}</span></h2>
          </div>
          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {c.modules.map((mod, i) => {
              const Icon = moduleIcons[i];
              return (
                <article key={mod.t} className="group rounded-3xl bg-card p-7 shadow-soft ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-pop">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary transition group-hover:scale-110"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{mod.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{mod.b}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Use-cases / personas ────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <p className="label-mono inline-flex items-center justify-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.useKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(28px,4.5vw,48px)] font-semibold leading-[1.04] tracking-tight">{c.useH[0]} <span className="display-accent font-normal">{c.useH[1]}</span></h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.useCases.map((u, i) => {
              const Icon = useCaseIcons[u.icon] ?? Store;
              return (
                <article key={u.t} className="group rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-pop">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl text-primary transition group-hover:scale-110" style={{ background: `oklch(95% 0.05 ${345 - i * 40})` }}><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-base font-semibold tracking-tight">{u.t}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{u.b}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works (3 steps) ──────────────────────────────────── */}
      <section id="how" className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <p className="label-mono inline-flex items-center justify-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.stepsKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(28px,4.5vw,48px)] font-semibold leading-[1.04] tracking-tight">{c.stepsH[0]} <span className="display-accent font-normal">{c.stepsH[1]}</span></h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {c.steps.map((st) => (
              <div key={st.n} className="relative rounded-3xl bg-card p-7 shadow-soft ring-1 ring-border">
                <span className="font-display text-5xl font-semibold tracking-tight text-primary/25">{st.n}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{st.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{st.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow deep-dive + formats strip ──────────────────────── */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <p className="label-mono inline-flex items-center justify-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.flowKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(28px,4.5vw,48px)] font-semibold leading-[1.04] tracking-tight">{c.flowH[0]} <span className="display-accent font-normal">{c.flowH[1]}</span></h2>
          </div>
          <div className="relative grid gap-4 md:grid-cols-4">
            <span className="pointer-events-none absolute left-0 right-0 top-[34px] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" aria-hidden />
            {c.flow.map((st, i) => {
              const StepIcon = [Upload, MousePointerClick, Layers, Download][i] ?? Upload;
              return (
                <div key={st.n} className="relative rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary"><StepIcon className="h-5 w-5" /></span>
                  <p className="mt-4 label-mono text-primary/70">{st.n}</p>
                  <h3 className="mt-1 text-[15px] font-semibold tracking-tight">{st.t}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{st.b}</p>
                </div>
              );
            })}
          </div>
          {/* Formats / integrations strip */}
          <div className="mt-12 rounded-[2rem] bg-muted/50 p-7 ring-1 ring-border lg:p-9">
            <div className="mb-6 text-center">
              <p className="label-mono text-primary">{c.fmtKicker}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.fmtBody}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {c.formats.map((f) => (
                <div key={f.name} className="rounded-2xl bg-card px-4 py-4 text-center shadow-soft ring-1 ring-border">
                  <p className="text-sm font-semibold tracking-tight">{f.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Shot showcase (gallery act) ─────────────────────────────── */}
      <section id="showcase" className="border-y border-border bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <p className="label-mono inline-flex items-center justify-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.showcaseKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(28px,4.5vw,48px)] font-semibold leading-[1.04] tracking-tight">{c.showcaseH[0]} <span className="display-accent font-normal">{c.showcaseH[1]}</span></h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{c.showcaseBody}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {showcase.map((x, i) => (
              <article key={i} className="group relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-border transition hover:-translate-y-1 hover:shadow-pop drift-slow" style={{ animationDelay: `${i * 0.4}s` }}>
                <ShotImage scene={x.kind} hue={x.hue} emoji={x.emoji} className="aspect-[4/5] w-full" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
                  <p className="text-[13px] font-medium text-white">{x.label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scenes & backdrops gallery ──────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <p className="label-mono inline-flex items-center justify-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.bdKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(28px,4.5vw,48px)] font-semibold leading-[1.04] tracking-tight">{c.bdH[0]} <span className="display-accent font-normal">{c.bdH[1]}</span></h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{c.bdBody}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {c.backdrops.map((b, i) => (
              <article key={b.label} className="group relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-border transition hover:-translate-y-1 hover:shadow-pop drift-slow" style={{ animationDelay: `${(i % 5) * 0.45}s` }}>
                <ShotImage scene={b.kind as ScenePreset} hue={b.hue} emoji={b.emoji} className="aspect-square w-full" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-2.5">
                  <p className="text-[12px] font-medium text-white">{b.label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof ───────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-card py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3 lg:px-8">
          {c.proof.map((p) => (
            <div key={p.l}>
              <p className="font-display text-[64px] font-semibold leading-none tracking-tight text-primary">{p.big}</p>
              <p className="mt-2 text-sm font-medium">{p.l}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <p className="label-mono inline-flex items-center justify-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.testKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(26px,4vw,44px)] font-semibold tracking-tight">{c.testH}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {c.tests.map((tst, i) => (
              <figure key={i} className="flex flex-col rounded-3xl bg-card p-7 shadow-soft ring-1 ring-border">
                <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                  <Sparkles className="h-3 w-3" /> {tst.metric}
                </span>
                <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground/90">“{tst.q}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full text-xs font-semibold text-foreground/70" style={{ background: `oklch(${85 - (i % 4) * 4}% 0.08 ${345 - (i % 6) * 30})` }}>{tst.n.split(" ").map((s) => s[0]).join("")}</span>
                  <div><p className="text-sm font-medium">{tst.n}</p><p className="text-xs text-muted-foreground">{tst.r}</p></div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ──────────────────────────────────────────────── */}
      <section className="border-y border-border bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <p className="label-mono inline-flex items-center justify-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.compareKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(26px,4vw,44px)] font-semibold leading-[1.04] tracking-tight">{c.compareH[0]} <span className="display-accent font-normal">{c.compareH[1]}</span></h2>
          </div>
          <div className="overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border">
            <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-2 border-b border-border px-5 py-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-6">
              <span></span>
              <span>{c.compareCols[0]}</span>
              <span>{c.compareCols[1]}</span>
              <span className="text-primary">{c.compareCols[2]}</span>
            </div>
            {c.compareRows.map((row) => (
              <div key={row.l} className="grid grid-cols-[1.2fr_1fr_1fr_1fr] items-center gap-2 border-b border-border px-5 py-4 text-[13px] last:border-0 sm:px-6 sm:text-sm">
                <span className="font-medium">{row.l}</span>
                <span className="text-muted-foreground">{row.a}</span>
                <span className="text-muted-foreground">{row.p}</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground"><Check className="h-4 w-4 shrink-0 text-primary" />{row.b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promise (inverted) ──────────────────────────────────────── */}
      <section className="px-5 py-8 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-sidebar p-10 text-sidebar-foreground lg:p-16">
          <span className="blob -right-20 -top-20 h-72 w-72 bg-primary/40 drift" aria-hidden />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <p className="label-mono inline-flex items-center gap-2 text-sidebar-muted"><span className="h-px w-7 bg-primary" /> {c.promiseKicker}</p>
              <h2 className="mt-4 font-display text-[clamp(28px,4vw,48px)] font-semibold leading-[1.04] tracking-tight">{c.promiseH[0]} <span className="display-accent font-normal" style={{ color: "var(--color-serif)" }}>{c.promiseH[1]}</span></h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-sidebar-muted">{c.promiseBody}</p>
            </div>
            <ul className="space-y-3">
              {c.promiseBullets.map((b) => (
                <li key={b} className="flex gap-3 rounded-2xl bg-white/[0.05] px-4 py-3.5 ring-1 ring-white/10"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><p className="text-[13.5px] leading-relaxed text-sidebar-foreground/85">{b}</p></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <p className="label-mono text-primary">{c.pricingKicker}</p>
            <h2 className="mt-3 font-display text-[clamp(28px,4.5vw,48px)] font-semibold leading-[1.04] tracking-tight">{c.pricingH[0]} <span className="display-accent font-normal">{c.pricingH[1]}</span></h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {c.plans.map((p) => (
              <article key={p.name} className={cn("relative rounded-3xl p-7 lg:p-8", p.featured ? "bg-sidebar text-sidebar-foreground shadow-pop" : "bg-card ring-1 ring-border shadow-soft")}>
                {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">{lang === "tr" ? "Önerilen" : "Recommended"}</span>}
                <p className={cn("label-mono", p.featured ? "text-sidebar-muted" : "text-muted-foreground")}>{p.name}</p>
                <p className="mt-3 flex items-end gap-1"><span className="font-display text-5xl font-semibold leading-none tracking-tight">{p.price}</span><span className={cn("pb-1.5 text-[13px]", p.featured ? "text-sidebar-muted" : "text-muted-foreground")}>{p.cad}</span></p>
                <p className={cn("mt-3 text-[13px] leading-relaxed", p.featured ? "text-sidebar-foreground/75" : "text-muted-foreground")}>{p.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.bullets.map((b) => <li key={b} className="flex items-start gap-2 text-[13px]"><Check className={cn("mt-0.5 h-4 w-4 shrink-0", p.featured ? "text-primary" : "text-success")} />{b}</li>)}
                </ul>
                <Link href="/signup" className={cn("mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-[13px] font-medium transition", p.featured ? "bg-primary text-primary-foreground hover:opacity-90" : "ring-1 ring-border hover:bg-muted")}>{p.cta}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="mb-10 text-center">
            <p className="label-mono text-primary">{c.faqKicker}</p>
            <h2 className="mt-3 font-display text-[clamp(26px,4vw,42px)] font-semibold tracking-tight">{c.faqH}</h2>
          </div>
          <ul className="space-y-2.5">
            {c.faq.map((item, i) => (
              <li key={item.q} className="overflow-hidden rounded-2xl bg-card ring-1 ring-border">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="text-[15px] font-semibold tracking-tight">{item.q}</span>
                  {open === i ? <Minus className="h-4 w-4 shrink-0 text-muted-foreground" /> : <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />}
                </button>
                {open === i && <p className="px-5 pb-4 text-[13.5px] leading-relaxed text-muted-foreground">{item.a}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Finale ──────────────────────────────────────────────────── */}
      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] p-10 text-center text-white lg:p-16" style={{ background: "var(--grad-brand)" }}>
          <span className="blob left-1/4 -top-12 h-64 w-64 bg-white/20 drift" aria-hidden />
          <div className="relative">
            <p className="label-mono inline-flex items-center justify-center gap-2 text-white/70"><Sparkles className="h-3 w-3" /> {c.finaleKicker}</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(32px,5.5vw,68px)] font-semibold leading-[1] tracking-tight">{c.finaleH[0]} <span className="italic" style={{ fontFamily: "var(--font-display)" }}>{c.finaleH[1]}</span></h2>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/85">{c.finaleBody}</p>
            <div className="mt-9"><Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-medium text-foreground transition hover:bg-white/90">{c.cta1} <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 text-sm text-muted-foreground md:grid-cols-5 lg:px-8">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5"><LogoMark className="h-7 w-7" /><span className="font-display text-base font-semibold tracking-tight text-foreground">Pixmint</span></Link>
            <p className="mt-3 max-w-xs text-[12.5px] leading-relaxed text-muted-foreground">{c.footTagline}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {(lang === "tr" ? ["Mermer", "Beyaz Fon", "Altın Saat", "Neon"] : ["Marble", "White Sweep", "Golden Hour", "Neon"]).map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground ring-1 ring-border">{tag}</span>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-muted-foreground/70">pixmint.studio · © 2026</p>
          </div>
          <div>
            <p className="label-mono mb-3 text-muted-foreground">{lang === "tr" ? "Ürün" : "Product"}</p>
            <ul className="space-y-1.5">
              <li><a href="#try" className="hover:text-foreground">{c.tryKicker}</a></li>
              <li><a href="#what" className="hover:text-foreground">{c.nav[0]}</a></li>
              <li><a href="#how" className="hover:text-foreground">{c.nav[1]}</a></li>
              <li><a href="#showcase" className="hover:text-foreground">{c.showcaseKicker}</a></li>
              <li><a href="#pricing" className="hover:text-foreground">{c.nav[2]}</a></li>
            </ul>
          </div>
          <div>
            <p className="label-mono mb-3 text-muted-foreground">{lang === "tr" ? "Sahneler" : "Scenes"}</p>
            <ul className="space-y-1.5">
              {c.backdrops.slice(0, 5).map((b) => (
                <li key={b.label}><a href="#showcase" className="hover:text-foreground">{b.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-mono mb-3 text-muted-foreground">{lang === "tr" ? "Şirket" : "Company"}</p>
            <ul className="space-y-1.5">
              <li>hello@pixmint.studio</li>
              <li><Link href="/login" className="hover:text-foreground">{c.demo}</Link></li>
              <li>{lang === "tr" ? "Hakkında" : "About"}</li>
              <li>{lang === "tr" ? "Gizlilik" : "Privacy"}</li>
              <li>{lang === "tr" ? "Şartlar" : "Terms"}</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
