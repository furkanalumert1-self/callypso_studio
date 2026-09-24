"use client";

import { useEffect, useState } from "react";
import { Sparkles, Shuffle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/i18n/language-provider";
import { toast } from "@/components/demo-toast";
import { listTemplates, listGenerations, saveGeneration, type GenerationRecord } from "@/lib/data";
import { hasSupabase } from "@/lib/demo-mode";
import { TEMPLATE_CATEGORIES, type SceneTemplateSeed, type TemplateCategory } from "@/lib/templates-seed";
import {
  LIGHTING, CAMERA_ANGLE, STYLE, MOOD, COLOR_PALETTE, TIME_OF_DAY, ASPECT_RATIO,
  randomVariation, type VariationParams,
} from "@/lib/variations";
import { cn } from "@/lib/utils";

type Slot = { status: "pending" | "done" | "error"; url?: string; error?: string };

export function TemplateGallery() {
  const { lang } = useLang();
  const [templates, setTemplates] = useState<SceneTemplateSeed[]>([]);
  const [category, setCategory] = useState<TemplateCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [variation, setVariation] = useState<VariationParams>(() => randomVariation());
  const [count, setCount] = useState(2);
  const [busy, setBusy] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [history, setHistory] = useState<GenerationRecord[]>([]);

  useEffect(() => {
    listTemplates().then(setTemplates);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    listGenerations(selectedId).then(setHistory);
  }, [selectedId]);

  const m = {
    tr: {
      title: "Şablon Galerisi", sub: `${templates.length} şablon · 12 kategori`, all: "Tüm kategoriler",
      search: "Şablon ara…", randomize: "Rastgele", generate: "Varyasyon üret", generating: "Üretiliyor…",
      count: "Adet", recent: "Bu şablon için son üretimler", noHistory: "Henüz üretim yok.",
      lighting: "Işık", angle: "Açı", style: "Stil", mood: "Hava", palette: "Palet", time: "Zaman", ratio: "Oran",
      failed: "Demo: bazı varyasyonlar üretilemedi.",
    },
    en: {
      title: "Template Gallery", sub: `${templates.length} templates · 12 categories`, all: "All categories",
      search: "Search templates…", randomize: "Randomize", generate: "Generate variations", generating: "Generating…",
      count: "Count", recent: "Recent generations for this template", noHistory: "No generations yet.",
      lighting: "Lighting", angle: "Angle", style: "Style", mood: "Mood", palette: "Palette", time: "Time", ratio: "Ratio",
      failed: "Demo: some variations failed to generate.",
    },
  }[lang];

  const shown = templates.filter((t) => {
    const inCategory = category === "all" || t.category === category;
    const inQuery = `${t.name} ${t.category}`.toLowerCase().includes(query.toLowerCase());
    return inCategory && inQuery;
  });
  const selected = templates.find((t) => t.id === selectedId) ?? null;

  function selectTemplate(t: SceneTemplateSeed) {
    setSelectedId(t.id);
    setVariation(randomVariation());
    setSlots([]);
  }

  async function generate() {
    if (!selected || busy) return;
    setBusy(true);
    setSlots(Array.from({ length: count }, () => ({ status: "pending" })));

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: selected.id, prompt: selected.basePrompt, variations: variation, count }),
      });
      const data = await res.json();

      if (!res.ok) {
        setSlots(Array.from({ length: count }, () => ({ status: "error", error: data?.error ?? `HTTP ${res.status}` })));
        toast(m.failed);
        return;
      }

      const images: { url: string | null; error?: string }[] = data.images ?? [];
      const nextSlots: Slot[] = images.map((img) =>
        img.url ? { status: "done", url: img.url } : { status: "error", error: img.error },
      );
      setSlots(nextSlots);

      if (!hasSupabase()) {
        for (const img of images) {
          if (img.url) {
            await saveGeneration({
              template_id: selected.id,
              prompt: selected.basePrompt,
              variation_params: variation,
              image_url: img.url,
              status: "done",
            });
          }
        }
      }
      if (nextSlots.some((s) => s.status === "error")) toast(m.failed);
      listGenerations(selected.id).then(setHistory);
    } catch (err) {
      setSlots(Array.from({ length: count }, () => ({ status: "error", error: err instanceof Error ? err.message : String(err) })));
      toast(m.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight">{m.title}</h3>
          <p className="text-sm text-muted-foreground">{m.sub}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select value={category} onChange={(e) => setCategory(e.target.value as TemplateCategory | "all")}
            className="h-9 rounded-lg border border-border bg-card px-2.5 text-sm">
            <option value="all">{m.all}</option>
            {TEMPLATE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="flex h-9 w-52 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={m.search}
              className="w-full bg-transparent focus:outline-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {shown.map((t) => (
          <button key={t.id} onClick={() => selectTemplate(t)}
            className={cn("rounded-xl border p-3 text-left text-sm transition-colors",
              selectedId === t.id ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted")}>
            <p className="truncate font-medium">{t.name}</p>
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{t.category}</p>
          </button>
        ))}
      </div>

      {selected && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display font-semibold">{selected.name}</p>
              <p className="text-xs text-muted-foreground">{selected.basePrompt}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setVariation(randomVariation())}>
              <Shuffle className="h-3.5 w-3.5" /> {m.randomize}
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            <Axis label={m.lighting} value={variation.lighting} options={LIGHTING} onChange={(v) => setVariation((p) => ({ ...p, lighting: v }))} />
            <Axis label={m.angle} value={variation.cameraAngle} options={CAMERA_ANGLE} onChange={(v) => setVariation((p) => ({ ...p, cameraAngle: v }))} />
            <Axis label={m.style} value={variation.style} options={STYLE} onChange={(v) => setVariation((p) => ({ ...p, style: v }))} />
            <Axis label={m.mood} value={variation.mood} options={MOOD} onChange={(v) => setVariation((p) => ({ ...p, mood: v }))} />
            <Axis label={m.palette} value={variation.colorPalette} options={COLOR_PALETTE} onChange={(v) => setVariation((p) => ({ ...p, colorPalette: v }))} />
            <Axis label={m.time} value={variation.timeOfDay} options={TIME_OF_DAY} onChange={(v) => setVariation((p) => ({ ...p, timeOfDay: v }))} />
            <Axis label={m.ratio} value={variation.aspectRatio} options={ASPECT_RATIO} onChange={(v) => setVariation((p) => ({ ...p, aspectRatio: v }))} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              {m.count}
              <select value={count} onChange={(e) => setCount(Number(e.target.value))}
                className="h-8 rounded-lg border border-border bg-card px-2 text-sm text-foreground">
                {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <Button onClick={generate} disabled={busy} className="gap-2">
              <Sparkles className={cn("h-4 w-4", busy && "animate-spin")} /> {busy ? m.generating : m.generate}
            </Button>
          </div>

          {slots.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {slots.map((s, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl ring-1 ring-border">
                  {s.status === "pending" && <div className="h-full w-full animate-pulse bg-muted" />}
                  {s.status === "done" && s.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.url} alt={selected.name} className="h-full w-full object-cover" />
                  )}
                  {s.status === "error" && (
                    <div className="grid h-full w-full place-items-center bg-destructive/10 p-2 text-center text-[10px] text-destructive">{s.error}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 border-t border-border pt-4">
            <p className="label-mono text-muted-foreground">{m.recent}</p>
            {history.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">{m.noHistory}</p>
            ) : (
              <div className="mt-2 flex flex-wrap gap-2">
                {history.slice(0, 8).map((g) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={g.id} src={g.image_url} alt="" className="h-16 w-16 rounded-lg object-cover ring-1 ring-border" />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function Axis<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly T[]; onChange: (v: T) => void }) {
  return (
    <label className="block text-xs text-muted-foreground">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value as T)}
        className="mt-1 block h-8 w-full rounded-lg border border-border bg-background px-2 text-xs text-foreground">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
