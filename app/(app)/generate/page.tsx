"use client";

import { useState } from "react";
import { Sparkles, Upload, Download, Send, Check, Info, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShotImage } from "@/components/shot-image";
import { useLang } from "@/components/i18n/language-provider";
import { products, scenes, shotRecipes } from "@/lib/demo/data";
import { cn } from "@/lib/utils";

const ratioClass: Record<string, string> = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "16:9": "aspect-video",
};

export default function GeneratePage() {
  const { lang, t } = useLang();
  const [productId, setProductId] = useState(products[0].id);
  const [sceneId, setSceneId] = useState(scenes[1].id);
  const [generated, setGenerated] = useState(true);
  const [busy, setBusy] = useState(false);

  const product = products.find((p) => p.id === productId)!;
  const scene = scenes.find((s) => s.id === sceneId)!;

  function generate() {
    setBusy(true);
    setGenerated(false);
    setTimeout(() => { setBusy(false); setGenerated(true); }, 900);
  }

  const m = {
    tr: {
      title: "Üret", sub: "Bir ürün ve bir sahne seç — Pixmint setini üretsin.",
      step1: "1 · Ürün", step2: "2 · Sahne", source: "Kaynak fotoğraf",
      upload: "Fotoğraf yükle", generate: "Çekim üret", regenerate: "Yeniden üret",
      generating: "Üretiliyor…", result: "Üretilen set", approveAll: "Tümünü onayla",
      sync: "Mağazaya gönder", demo: "Demo modu — gerçekten üretmek için fal.ai anahtarını bağla.",
      lockedTo: "markaya kilitli", scenePicked: "Seçili sahne",
    },
    en: {
      title: "Generate", sub: "Pick a product and a scene — Pixmint generates the set.",
      step1: "1 · Product", step2: "2 · Scene", source: "Source photo",
      upload: "Upload photo", generate: "Generate shots", regenerate: "Regenerate",
      generating: "Generating…", result: "Generated set", approveAll: "Approve all",
      sync: "Push to store", demo: "Demo mode — connect your fal.ai key to generate for real.",
      lockedTo: "locked to brand", scenePicked: "Selected scene",
    },
  }[lang];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight">{m.title}</h2>
        <p className="text-sm text-muted-foreground">{m.sub}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
        {/* ── Controls ─────────────────────────────────────────────── */}
        <div className="space-y-5">
          {/* Source photo */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="label-mono text-muted-foreground">{m.source}</p>
            <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-border">
              <ShotImage scene="studio" hue={product.hue} emoji={product.emoji} className="aspect-square w-full" />
            </div>
            <Button variant="outline" className="mt-3 w-full gap-2"><Upload className="h-4 w-4" /> {m.upload}</Button>
          </div>

          {/* Product picker */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="label-mono text-muted-foreground">{m.step1}</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {products.map((p) => (
                <button key={p.id} onClick={() => setProductId(p.id)}
                  title={p.title}
                  className={cn("grid aspect-square place-items-center rounded-xl text-2xl ring-1 transition",
                    productId === p.id ? "bg-primary/10 ring-2 ring-primary" : "bg-muted ring-border hover:bg-secondary")}>
                  {p.emoji}
                </button>
              ))}
            </div>
            <p className="mt-3 truncate text-sm font-medium">{product.title}</p>
          </div>

          {/* Scene picker */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="label-mono text-muted-foreground">{m.step2}</p>
            <div className="mt-3 space-y-2">
              {scenes.map((s) => (
                <button key={s.id} onClick={() => setSceneId(s.id)}
                  className={cn("flex w-full items-center gap-3 rounded-xl border p-2 text-left transition",
                    sceneId === s.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted")}>
                  <span className="h-10 w-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-border">
                    <ShotImage scene={s.kind} hue={s.hue} emoji={s.emoji} className="h-full w-full" />
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
            <Sparkles className={cn("h-4 w-4", busy && "animate-spin")} /> {busy ? m.generating : (generated ? m.regenerate : m.generate)}
          </Button>
        </div>

        {/* ── Result grid ──────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-semibold tracking-tight">{m.result}</h3>
              <Badge tone="primary">{scene.name}</Badge>
              <span className="text-xs text-muted-foreground">· {m.lockedTo}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5"><Check className="h-3.5 w-3.5" /> {m.approveAll}</Button>
              <Button size="sm" className="gap-1.5"><Send className="h-3.5 w-3.5" /> {m.sync}</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {shotRecipes.map((r, i) => (
              <article key={r.id} className={cn("group relative overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all", busy ? "animate-pulse" : "hover:-translate-y-1 hover:shadow-pop", r.ratio === "16:9" && "col-span-2 sm:col-span-3")}>
                <div className={cn("w-full", ratioClass[r.ratio])}>
                  {!busy && <ShotImage scene={scene.kind} hue={`${Number(scene.hue) + i * 4}`} emoji={product.emoji} className="h-full w-full" />}
                </div>
                {!busy && (
                  <>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent p-3">
                      <p className="text-[12px] font-medium leading-tight text-white">{t(r.label)}</p>
                      <span className="rounded bg-white/85 px-1.5 py-0.5 text-[10px] font-medium text-foreground tabular-nums">{r.ratio}</span>
                    </div>
                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition group-hover:opacity-100">
                      <button className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 text-foreground shadow"><Download className="h-3.5 w-3.5" /></button>
                      <button className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 text-foreground shadow"><RefreshCw className="h-3.5 w-3.5" /></button>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>

          <p className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 text-primary" /> {m.demo}
          </p>
        </div>
      </div>
    </div>
  );
}
