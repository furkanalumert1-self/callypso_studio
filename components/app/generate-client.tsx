"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Upload, Download, Lock, Check, Info, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShotImage } from "@/components/shot-image";
import { useLang } from "@/components/i18n/language-provider";
import { products as SEED_PRODUCTS, scenes, shotRecipes, type Product, type ExportRatio } from "@/lib/demo/data";
import { listProducts } from "@/lib/products-store";
import { fileToResizedDataUrl } from "@/lib/image-utils";
import { cn } from "@/lib/utils";
import { toast } from "@/components/demo-toast";

const ratioClass: Record<string, string> = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "9:16": "aspect-[9/16]",
};

/** No source photo: best-effort text-to-image description (fal-ai/flux/schnell). */
function buildPrompt(productTitle: string, sceneName: string, sceneSurface: string, sceneMood: string, variationLabel: string): string {
  return [
    `Professional e-commerce product photography of "${productTitle}".`,
    `Scene concept: "${sceneName}." The scene must literally and visibly show: ${sceneSurface}.`,
    `Mood: ${sceneMood}. Shot style: ${variationLabel}.`,
    "Keep the product's logo, text, color, shape and packaging unchanged (Product Lock); only the scene, lighting and composition change.",
    "Studio quality, sharp focus, sales-ready creative.",
  ].join(" ");
}

/** Real source photo: an edit instruction for fal-ai/flux-pro/kontext, which
 * conditions on the actual uploaded pixels instead of a text description.
 * Kontext leans hard toward preserving the input image, so the scene has to
 * be spelled out as concrete, literal elements to render — a vague mood name
 * alone gets ignored and the model just re-crops the original background. */
function buildEditInstruction(sceneName: string, sceneSurface: string, sceneMood: string, variationLabel: string): string {
  return [
    `Replace ONLY the background and environment of this product photo with a new scene: "${sceneName}".`,
    `The new background must literally and visibly contain: ${sceneSurface}. Do not leave a plain, empty or unchanged background — the described elements must be clearly visible around the product.`,
    `Mood: ${sceneMood}. Shot style: ${variationLabel}.`,
    "Keep the product itself completely unchanged — identical logo, text, color, shape, proportions and packaging (Product Lock). Only the background, props, lighting and composition change.",
    "Studio quality, sharp focus, sales-ready e-commerce creative.",
  ].join(" ");
}

export function GenerateClient({ falConnected }: { falConnected: boolean }) {
  const { lang, t } = useLang();
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [productId, setProductId] = useState(SEED_PRODUCTS[0].id);
  const [sceneId, setSceneId] = useState(scenes[1].id);
  const [generated, setGenerated] = useState(true);
  const [busy, setBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [images, setImages] = useState<(string | null)[]>(shotRecipes.map(() => null));
  const [genError, setGenError] = useState<string | null>(null);
  const [sourcePhoto, setSourcePhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const product = products.find((p) => p.id === productId)!;
  const scene = scenes.find((s) => s.id === sceneId)!;

  useEffect(() => {
    Promise.resolve(listProducts()).then(setProducts);
  }, []);

  const dict = {
    tr: {
      title: "Üret", sub: "Bir ürün ve bir sahne şablonu seç — Callypso Studio 4 varyasyon üretsin.",
      step1: "1 · Ürün", step2: "2 · Sahne Şablonu", source: "Kaynak fotoğraf",
      upload: "Fotoğraf yükle", generate: "4 varyasyon üret", regenerate: "Yeniden üret",
      generating: "Üretiliyor…", result: "4 Varyasyon", approveAll: "Tümünü onayla",
      sync: "Dışa aktar", exportingLabel: "Dışa aktarılıyor…",
      demoNote: "Demo modu — gerçekten üretmek için fal.ai anahtarını bağla.",
      liveNote: "fal.ai ile canlı üretim aktif.",
      roadmapNote: "Shopify/ikas/Meta senkronu bu ilk aşamada yok (TODO — yol haritası).",
      genericError: "fal.ai üretimi başarısız oldu, önizleme gösteriliyor.",
      lockedTo: "markaya kilitli", scenePicked: "Seçili sahne",
      productLock: "Ürün Kilidi aktif", productLockHint: "Logo, yazı, renk, şekil ve ambalaj korunur.",
      productLockPhoto: "Gerçek fotoğrafın üzerinde düzenleniyor (fal.ai Kontext).",
      productLockNoPhoto: "Fotoğraf yüklenmedi — yalnızca ürün adına göre metinden üretim yapılır.",
      aiTag: "fal.ai",
    },
    en: {
      title: "Generate", sub: "Pick a product and a scene template — Callypso Studio generates 4 variations.",
      step1: "1 · Product", step2: "2 · Scene Template", source: "Source photo",
      upload: "Upload photo", generate: "Generate 4 variations", regenerate: "Regenerate",
      generating: "Generating…", result: "4 Variations", approveAll: "Approve all",
      sync: "Export", exportingLabel: "Exporting…",
      demoNote: "Demo mode — connect your fal.ai key to generate for real.",
      liveNote: "Generating live with fal.ai.",
      roadmapNote: "Shopify/ikas/Meta sync isn't built in this first phase (TODO — roadmap).",
      genericError: "fal.ai generation failed, showing preview instead.",
      lockedTo: "locked to brand", scenePicked: "Selected scene",
      productLock: "Product Lock active", productLockHint: "Logo, text, color, shape and packaging stay unchanged.",
      productLockPhoto: "Editing your real photo directly (fal.ai Kontext).",
      productLockNoPhoto: "No photo uploaded — generating from the product name as text only.",
      aiTag: "fal.ai",
    },
  } as const;
  const mm = dict[lang];

  function resetResult() {
    setImages(shotRecipes.map(() => null));
    setGenError(null);
  }

  function pickProduct(id: string) {
    setProductId(id);
    setSourcePhoto(products.find((p) => p.id === id)?.photo ?? null);
    resetResult();
  }

  function pickScene(id: string) {
    setSceneId(id);
    resetResult();
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    fileToResizedDataUrl(file).then(setSourcePhoto).catch(() => {
      toast(lang === "tr" ? "Demo: fotoğraf okunamadı." : "Demo: could not read the photo.");
    });
  }

  async function generate() {
    setBusy(true);
    setGenerated(false);
    setGenError(null);

    if (!falConnected) {
      // Demo mode — no FAL_KEY configured, keep the mock placeholder preview.
      setImages(shotRecipes.map(() => null));
      setTimeout(() => { setBusy(false); setGenerated(true); }, 900);
      return;
    }

    const sceneSurface = t(scene.surface);
    const sceneMood = t(scene.mood);
    const results = await Promise.allSettled(
      shotRecipes.map(async (r) => {
        const prompt = sourcePhoto
          ? buildEditInstruction(scene.name, sceneSurface, sceneMood, t(r.label))
          : buildPrompt(product.title, scene.name, sceneSurface, sceneMood, t(r.label));
        const res = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, ratio: r.ratio as ExportRatio, sourceImage: sourcePhoto ?? undefined }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? `HTTP ${res.status}`);
        return data.url as string;
      }),
    );

    const nextImages = results.map((r) => (r.status === "fulfilled" ? r.value : null));
    setImages(nextImages);
    if (nextImages.every((url) => !url)) {
      const firstError = results.find((r) => r.status === "rejected") as PromiseRejectedResult | undefined;
      setGenError(firstError ? String(firstError.reason?.message ?? firstError.reason) : mm.genericError);
    }
    setBusy(false);
    setGenerated(true);
  }

  function approveAll() {
    toast(lang === "tr" ? "Demo: 4 varyasyon onaylandı." : "Demo: 4 variations approved.");
  }

  function downloadUrl(url: string, filename: string) {
    const a = document.createElement("a");
    a.href = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadImage(url: string | null, label: string) {
    if (!url) {
      toast(lang === "tr" ? "Demo: bu varyasyon için indirilecek dosya yok." : "Demo: no file to download for this variation.");
      return;
    }
    downloadUrl(url, `${label.replace(/\s+/g, "-").toLowerCase()}.jpg`);
  }

  async function exportAll() {
    const real = images.filter(Boolean) as string[];
    if (real.length === 0) {
      toast(lang === "tr" ? "Demo: dışa aktarma simüle edildi (gerçek dosya yok)." : "Demo: export simulated (no real files).");
      return;
    }
    if (exporting) return;
    setExporting(true);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      const results = await Promise.allSettled(
        real.map(async (url, i) => {
          const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const blob = await res.blob();
          zip.file(`${product.title}-${i + 1}.jpg`, blob);
        }),
      );
      const okCount = results.filter((r) => r.status === "fulfilled").length;
      if (okCount === 0) throw new Error("all downloads failed");

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = zipUrl;
      a.download = `${product.title.replace(/\s+/g, "-").toLowerCase()}-creatives.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(zipUrl);

      toast(lang === "tr" ? `Demo: ${okCount} kreatif zip olarak indirildi.` : `Demo: exported ${okCount} creatives as a zip.`);
    } catch {
      toast(lang === "tr" ? "Demo: dışa aktarma başarısız oldu." : "Demo: export failed.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight">{mm.title}</h2>
        <p className="text-sm text-muted-foreground">{mm.sub}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
        {/* ── Controls ─────────────────────────────────────────────── */}
        <div className="space-y-5">
          {/* Source photo */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="label-mono text-muted-foreground">{mm.source}</p>
            <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-border">
              {sourcePhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={sourcePhoto} alt={product.title} className="aspect-square w-full object-cover" />
              ) : (
                <ShotImage scene="studio" hue={product.hue} emoji={product.emoji} className="aspect-square w-full" />
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
            <Button variant="outline" className="mt-3 w-full gap-2" onClick={handleUploadClick}>
              <Upload className="h-4 w-4" /> {mm.upload}
            </Button>
            <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-muted px-3 py-2 text-[11px] text-muted-foreground">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span>
                <span className="font-medium text-foreground">{mm.productLock}</span> · {mm.productLockHint}
                <br />
                {sourcePhoto ? mm.productLockPhoto : mm.productLockNoPhoto}
              </span>
            </p>
          </div>

          {/* Product picker */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="label-mono text-muted-foreground">{mm.step1}</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {products.map((p) => (
                <button key={p.id} onClick={() => pickProduct(p.id)}
                  title={p.title}
                  className={cn("grid aspect-square place-items-center overflow-hidden rounded-xl text-2xl ring-1 transition",
                    productId === p.id ? "bg-primary/10 ring-2 ring-primary" : "bg-muted ring-border hover:bg-secondary")}>
                  {p.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.photo} alt={p.title} className="h-full w-full object-cover" />
                  ) : (
                    p.emoji
                  )}
                </button>
              ))}
            </div>
            <p className="mt-3 truncate text-sm font-medium">{product.title}</p>
          </div>

          {/* Scene picker */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="label-mono text-muted-foreground">{mm.step2}</p>
            <div className="mt-3 max-h-[420px] space-y-2 overflow-y-auto pr-1">
              {scenes.map((s) => (
                <button key={s.id} onClick={() => pickScene(s.id)}
                  className={cn("flex w-full items-center gap-3 rounded-xl border p-2 text-left transition",
                    sceneId === s.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted")}>
                  <span className="h-10 w-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-border">
                    {s.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.thumbnail} alt={s.name} className="h-full w-full object-cover" />
                    ) : (
                      <ShotImage scene={s.kind} hue={s.hue} emoji={s.emoji} className="h-full w-full" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{s.name}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">{t(s.mood)}</span>
                  </span>
                  {sceneId === s.id && <Check className="h-4 w-4 shrink-0 text-primary" />}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={generate} disabled={busy} className="w-full gap-2" size="lg">
            <Sparkles className={cn("h-4 w-4", busy && "animate-spin")} /> {busy ? mm.generating : (generated ? mm.regenerate : mm.generate)}
          </Button>
        </div>

        {/* ── Result grid ──────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-semibold tracking-tight">{mm.result}</h3>
              <Badge tone="primary">{scene.name}</Badge>
              <span className="text-xs text-muted-foreground">· {mm.lockedTo}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={approveAll}><Check className="h-3.5 w-3.5" /> {mm.approveAll}</Button>
              {/* TODO(real integration): Shopify/ikas/Meta Ads push — roadmap, not built in phase 1. */}
              <Button size="sm" className="gap-1.5" onClick={exportAll} disabled={exporting}>
                <Download className={cn("h-3.5 w-3.5", exporting && "animate-bounce")} /> {exporting ? mm.exportingLabel : mm.sync}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {shotRecipes.map((r, i) => (
              <article key={r.id} className={cn("group relative overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all", busy ? "animate-pulse" : "hover:-translate-y-1 hover:shadow-pop")}>
                <div className={cn("w-full", ratioClass[r.ratio])}>
                  {!busy && images[i] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={images[i]!} alt={t(r.label)} className="h-full w-full object-cover" />
                  ) : (
                    !busy && <ShotImage scene={scene.kind} hue={`${Number(scene.hue) + i * 4}`} emoji={product.emoji} className="h-full w-full" />
                  )}
                </div>
                {!busy && (
                  <>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent p-3">
                      <p className="text-[12px] font-medium leading-tight text-white">{t(r.label)}</p>
                      <span className="rounded bg-white/85 px-1.5 py-0.5 text-[10px] font-medium text-foreground tabular-nums">{r.ratio}</span>
                    </div>
                    {images[i] && (
                      <span className="absolute left-2 top-2 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-medium text-primary-foreground">{mm.aiTag}</span>
                    )}
                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition group-hover:opacity-100">
                      <button onClick={() => downloadImage(images[i], `${product.title}-${t(r.label)}`)} className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 text-foreground shadow"><Download className="h-3.5 w-3.5" /></button>
                      <button onClick={generate} className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 text-foreground shadow"><RefreshCw className="h-3.5 w-3.5" /></button>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>

          <p className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 text-primary" /> {falConnected ? mm.liveNote : mm.demoNote} {mm.roadmapNote}
          </p>
          {genError && (
            <p className="flex items-center gap-2 rounded-lg bg-warning/10 px-3 py-2.5 text-xs text-warning">
              <AlertTriangle className="h-4 w-4 shrink-0" /> {genError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
